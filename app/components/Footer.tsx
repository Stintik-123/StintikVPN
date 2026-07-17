"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] py-12 px-4 bg-[var(--bg-primary)] relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <img
            src="https://raw.githubusercontent.com/Stintik-123/StintikVPN/main/images/IMG_20260609_220410_760.jpg"
            alt="Logo"
            className="w-9 h-9 rounded-lg object-cover"
          />
          <span className="font-bold text-lg">
            Stintik<span className="gradient-text">VPN</span>
          </span>
        </div>
        <div className="text-[var(--text-secondary)] text-sm text-center md:text-right">
          <p>© 2026 StintikVPN. Проект с открытым исходным кодом.</p>
          <p className="mt-1">Мы агрегируем бесплатные подписки из открытых источников.</p>
        </div>
        <MagneticButton>
          <a
            href="https://t.me/StintikVPN"
            target="_blank"
            className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-brand-500 transition-colors"
          >
            <Send className="w-5 h-5" />
            <span className="text-sm font-medium">@StintikVPN</span>
          </a>
        </MagneticButton>
      </div>
    </footer>
  );
}
