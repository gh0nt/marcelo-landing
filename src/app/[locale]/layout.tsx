import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Marcelo Puentes | Growth Marketer, Developer, and Marketing Engineer",
    description:
      "Marcelo Puentes is a growth-focused marketer, developer, and marketing engineer building websites, funnels, and digital systems that turn traffic into measurable business growth.",
    keywords: [
      "Marcelo Puentes",
      "growth marketer",
      "marketer",
      "developer",
      "marketing engineer",
      "growth marketing",
      "web developer",
      "full stack developer",
      "digital marketer",
      "conversion optimization",
      "marketing systems",
      "lead generation",
      "business growth",
      "website development",
      "marketing automation",
    ],
    authors: [{ name: "Marcelo Puentes" }],
    creator: "Marcelo Puentes",
    publisher: "Marcelo Puentes",
    metadataBase: new URL("https://marcelopuentes.com"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title:
        "Marcelo Puentes | Growth Marketer, Developer, and Marketing Engineer",
      description:
        "Growth-focused marketing and development for brands that need better websites, smarter funnels, and measurable results.",
      url: "https://marcelopuentes.com",
      siteName: "Marcelo Puentes",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Marcelo Puentes | Growth Marketer, Developer, and Marketing Engineer",
      description:
        "Web development, growth marketing, and marketing engineering focused on conversion, lead generation, and scalable systems.",
      creator: "@marcelopuentes",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
