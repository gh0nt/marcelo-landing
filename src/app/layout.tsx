import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marcelo Puentes | Full Stack Developer & Digital Marketing Expert",
  description:
    "Professional developer & marketer specializing in Next.js, WordPress, e-commerce solutions, databases & low-code applications. Transform your business with custom web development and data-driven marketing strategies.",
  keywords:
    "Marcelo Puentes, Full Stack Developer, Digital Marketing, Next.js Developer, WordPress Expert, E-commerce Development, Database Design, Low Code Applications, Web Development, Marketing Automation",
  authors: [{ name: "Marcelo Puentes" }],
  creator: "Marcelo Puentes",
  publisher: "Marcelo Puentes",
  icons: {
    icon: [
      { url: "/marcelologo.svg", sizes: "any", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
    ],
    shortcut: "/marcelologo.svg",
    apple: "/marcelologo.svg",
  },
  openGraph: {
    title: "Marcelo Puentes | Full Stack Developer & Digital Marketing Expert",
    description:
      "Professional developer & marketer specializing in Next.js, WordPress, e-commerce solutions, databases & low-code applications.",
    url: "https://marcelopuentes.com",
    siteName: "Marcelo Puentes Portfolio",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcelo Puentes | Full Stack Developer & Digital Marketing Expert",
    description:
      "Professional developer & marketer specializing in Next.js, WordPress, e-commerce solutions, databases & low-code applications.",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/marcelologo.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/marcelologo.svg" />
        <link rel="apple-touch-icon" href="/marcelologo.svg" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>
      <body className={`${poppins.variable} antialiased font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
