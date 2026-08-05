import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Conectaí — Gestão inteligente de WhatsApp",
  description: "Gerencie bots, campanhas, contatos e atendimentos do WhatsApp em uma plataforma simples e completa.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Conectaí",
    description: "Conecte. Automatize. Atenda.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 925, alt: "Conectaí — Conecte. Automatize. Atenda." }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={jakarta.variable}>{children}</body></html>;
}
