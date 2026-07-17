import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Background } from "./components/Background";
import { ScrollProgress } from "./components/ScrollProgress";
import { CopyModal } from "./components/CopyModal";

export const metadata: Metadata = {
  title: "StintikVPN — Интернет-свобода ближе, чем кажется",
  description: "Бесплатные VPN-подписки, Telegram-прокси и инструменты обхода блокировок. Сделано людьми для людей.",
  icons: {
    icon: "https://raw.githubusercontent.com/Stintik-123/StintikVPN/main/images/IMG_20260609_220410_760.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="antialiased relative">
        <Background />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
        <CopyModal />
      </body>
    </html>
  );
}
