"use client";

import { motion } from "framer-motion";
import { Download, Copy, CheckCircle } from "lucide-react";

const steps = [
  { icon: Download, title: "1. Установите приложение", desc: "Скачайте Hiddify, NekoBox или Shadowrocket из официального магазина." },
  { icon: Copy, title: "2. Скопируйте ссылку", desc: "Нажмите кнопку «Копировать» на любой подписке ниже на этой странице." },
  { icon: CheckCircle, title: "3. Вставьте и подключитесь", desc: "Откройте приложение → «Добавить из буфера» → Подключиться." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 border-t border-[var(--border-color)]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="premium-card p-8 rounded-2xl text-center group"
          >
            <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-600/10 flex items-center justify-center mb-5 text-brand-400 border border-brand-500/20 group-hover:scale-110 transition-transform">
              <step.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
