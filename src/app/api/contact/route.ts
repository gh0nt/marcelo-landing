import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Obtener información adicional del request
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "";

    // Intentar guardar en Supabase si está configurado
    let contactData: { id: string } | null = null;

    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        const { data, error: supabaseError } = await supabase
          .from("contacts")
          .insert([
            {
              name,
              email,
              subject: subject || null,
              project_type: subject || null,
              message,
              ip_address: clientIP,
              user_agent: userAgent,
              status: "pending",
            },
          ])
          .select()
          .single();

        if (supabaseError) {
          console.error("Error saving to Supabase:", supabaseError);
          // No retornamos error aquí, continuamos con el email
        } else {
          contactData = data;
        }
      } catch (error) {
        console.error("Error connecting to Supabase:", error);
        // Continuamos sin base de datos
      }
    } else {
      console.log("Supabase not configured, skipping database save");
    }

    // Mapear los valores del subject a texto legible
    const subjectMap: Record<string, string> = {
      "web-design": "Diseño UI/UX",
      "app-design": "Desarrollo Web WordPress o NextJS",
      consultation: "Consultoría UX",
      other: "Otro",
    };

    const projectType = subjectMap[subject] || subject || "No especificado";

    // Generar ID único para tracking si no hay Supabase
    const trackingId =
      contactData?.id?.slice(-8) ||
      Math.random().toString(36).substr(2, 8).toUpperCase();

    // Enviar email usando Resend
    try {
      const { error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || "onboarding@resend.dev",
        to: process.env.EMAIL_TO || "giohanpuentes@gmail.com",
        subject: `Nuevo contacto desde el portfolio - ${projectType} [#${trackingId}]`,
        html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0d001a 0%, #1a0d2e 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
            <h2 style="color: #eeba2b; margin: 0; font-size: 24px; text-align: center;">
              📧 Nuevo Mensaje de Contacto
            </h2>
            <p style="color: #fff; text-align: center; margin: 10px 0 0 0; font-size: 14px;">
              ID: #${trackingId}
            </p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px;">
              <h3 style="color: #0d001a; margin-bottom: 8px; font-size: 16px;">👤 Información del Cliente:</h3>
              <p style="margin: 4px 0; color: #555;"><strong>Nombre:</strong> ${name}</p>
              <p style="margin: 4px 0; color: #555;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 4px 0; color: #555;"><strong>Tipo de Proyecto:</strong> ${projectType}</p>
              <p style="margin: 4px 0; color: #999; font-size: 12px;"><strong>IP:</strong> ${clientIP}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #0d001a; margin-bottom: 8px; font-size: 16px;">💬 Mensaje:</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #eeba2b;">
                <p style="margin: 0; color: #333; line-height: 1.6;">${message.replace(
                  /\n/g,
                  "<br>"
                )}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                Este mensaje fue enviado desde <strong>marcelopuentes.com</strong>
              </p>
              <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
                ${new Date().toLocaleString("es-CO", {
                  timeZone: "America/Bogota",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      `,
      });

      if (error) {
        console.error("Error sending email with Resend:", error);
      } else {
        console.log("Email sent successfully to:", process.env.EMAIL_TO);
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // No devolvemos error aquí porque el contacto ya se guardó en la DB
    }

    return NextResponse.json(
      {
        message: "Mensaje enviado correctamente",
        id: contactData?.id || trackingId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error general:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
