import { NextRequest, NextResponse } from "next/server";
import z from "zod";

// Simple in-memory rate limiter map: key -> timestamp (ms)
const RATE_LIMIT_TTL_MS = 60 * 1000; // 60 seconds
const rateLimitMap = new Map<string, number>();

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(5).max(5000),
});

function sanitize(input: string, maxLen = 5000) {
  return input
    .replace(/<\/?script[^>]*>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLen);
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  if (request.headers.get("x-real-ip")) return request.headers.get("x-real-ip");
  // Type guard for custom 'ip' property
  if (typeof (request as unknown) === "object" && request && "ip" in request) {
    const ip = (request as { ip?: string }).ip;
    if (ip) return ip;
  }
  return "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // Validate with Zod
    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const raw = parseResult.data;
    const name = sanitize(raw.name, 80);
    const email = sanitize(raw.email, 254).toLowerCase();
    const subject = sanitize(raw.subject, 200);
    const message = sanitize(raw.message, 5000);

    const ip = getClientIp(request);

    const now = Date.now();

    // Rate limit by email or IP
    const emailKey = `email:${email}`;
    const ipKey = `ip:${ip}`;

    const emailLast = rateLimitMap.get(emailKey) || 0;
    const ipLast = rateLimitMap.get(ipKey) || 0;

    if (
      now - emailLast < RATE_LIMIT_TTL_MS ||
      now - ipLast < RATE_LIMIT_TTL_MS
    ) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a moment." },
        { status: 429 }
      );
    }

    // Set rate limit timestamps
    rateLimitMap.set(emailKey, now);
    rateLimitMap.set(ipKey, now);

    // Build WhatsApp message
    const whatsappText = `📩 Nuevo mensaje desde la Landing Page\n\n👤 Nombre: ${name}\n📧 Email: ${email}\n🧩 Tipo de proyecto: ${subject}\n💬 Mensaje:\n${message}\n\nPor favor, responde al cliente lo antes posible.`;

    const encodedMessage = encodeURIComponent(whatsappText);
    const phone = "573115315662";
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;

    return NextResponse.json(
      { success: true, redirectUrl: url },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
