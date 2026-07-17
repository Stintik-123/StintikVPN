"use client";

import { motion } from "framer-motion";
import { Copy, HelpCircle } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-semibold mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
          </span>
          Обновлено: Июль 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
        >
          Интернет-свобода
          <br />
          <span className="gradient-text">ближе, чем кажется</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Актуальные бесплатные VPN-подписки, Telegram-прокси и инструменты обхода блокировок. Просто скопируйте и используйте.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton>
            <Link
              href="#subscriptions"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-600/30"
            >
              <Copy className="w-5 h-5" />
              Получить подписку
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium rounded-xl border border-[var(--border-color)] hover:border-brand-500/50 transition-all flex items-center justify-center gap-2"
            >
              <HelpCircle className="w-5 h-5" />
              Как использовать
            </Link>
          </MagneticButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 text-sm text-[var(--text-secondary)] font-medium tracking-[0.2em] uppercase"
        >
          Сделано людьми для людей
        </motion.p>
      </div>
    </section>
  );
}
