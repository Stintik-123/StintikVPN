"use client";

import { motion } from "framer-motion";
import { Zap, ShieldAlert, Send } from "lucide-react";
import { PremiumCard } from "./PremiumCard";
import { CopyButton } from "./CopyButton";

const tools = [
  {
    icon: Zap,
    color: "red",
    title: "ByeByeDPI",
    desc: "Лучшее для Windows. Обходит блокировки Discord, YouTube без смены IP.",
    steps: [
      "1. Скачайте с GitHub",
      "2. Распакуйте архив",
      "3. Запустите bye_bye_dpi.exe от имени администратора",
    ],
    url: "https://github.com/hufrea/byedpi",
    btnLabel: "Скачать",
  },
  {
    icon: ShieldAlert,
    color: "yellow",
    title: "Zapret",
    desc: "Мощный инструмент для Windows и Linux с продвинутыми техниками обхода.",
    steps: [
      "1. Скачайте релиз с GitHub",
      "2. Распакуйте в удобную папку",
      "3. Запустите install_service.bat (Win)",
    ],
    url: "https://github.com/bol-van/zapret",
    btnLabel: "Репозиторий",
  },
  {
    icon: Send,
    color: "blue",
    title: "tgwsproxy",
    desc: "Специально для Telegram. Обходит блокировки мессенджера через WebSocket.",
    steps: [
      "1. Скачайте последнюю версию",
      "2. Запустите tgwsproxy.exe",
      "3. В TG: Настройки → Прокси → SOCKS5 (127.0.0.1:1080)",
    ],
    url: "https://github.com/err0r404/tgwsproxy",
    btnLabel: "Скачать",
  },
];

const colorMap: Record<string, string> = {
  red: "from-red-500/20 to-red-600/10 border-red-500/20 text-red-400",
  yellow: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/20 text-yellow-400",
  blue: "from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400",
};

export function BypassTools() {
  return (
    <section id="bypass" className="py-24 px-4 border-t border-[var(--border-color)]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Обход блокировок без VPN</h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Специализированные утилиты. Работают быстрее и незаметнее.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <PremiumCard className="p-6 rounded-2xl h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br border flex items-center justify-center ${colorMap[tool.color]}`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">{tool.title}</h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">{tool.desc}</p>
                <div className="space-y-2 mb-5 text-xs text-[var(--text-secondary)] bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-color)]">
                  {tool.steps.map((step, j) => (
                    <p key={j}>{step}</p>
                  ))}
                </div>
                <CopyButton url={tool.url} label={tool.btnLabel} />
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
