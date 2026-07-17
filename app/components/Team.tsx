"use client";

import { motion } from "framer-motion";
import { PremiumCard } from "./PremiumCard";

const members = [
  {
    name: "Stintik",
    role: "Создатель проекта",
    desc: "Подбор серверов, обновление подписок, развитие проекта",
    img: "https://raw.githubusercontent.com/Stintik-123/StintikVPN/main/images/IMG_20260609_220410_760.jpg",
  },
  {
    name: "SapBotGit",
    role: "Помощник проекта",
    desc: "Техническая поддержка, тестирование, документация",
    img: "https://raw.githubusercontent.com/Stintik-123/StintikVPN/main/images/120243584.jpeg",
  },
];

export function Team() {
  return (
    <section className="py-24 px-4 border-t border-[var(--border-color)]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12"
        >
          Команда проекта
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <PremiumCard className="p-8 rounded-2xl">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-24 h-24 rounded-full mx-auto mb-5 border-2 border-brand-500/30 object-cover shadow-xl shadow-brand-500/20"
                />
                <h3 className="text-xl font-bold">{m.name}</h3>
                <p className="text-sm gradient-text font-bold mb-3">{m.role}</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{m.desc}</p>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
