import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConversaFlow — Gestão inteligente de WhatsApp",
  description: "Gerencie bots, campanhas, contatos e atendimentos do WhatsApp em uma plataforma simples e completa.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "ConversaFlow",
    description: "Conversas que viram resultados.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 925, alt: "ConversaFlow — Conversas que viram resultados" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={geist.variable}>{children}</body></html>;
}
