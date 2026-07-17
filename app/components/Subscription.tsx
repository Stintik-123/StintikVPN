"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone } from "lucide-react";
import { PremiumCard } from "./PremiumCard";
import { CopyButton } from "./CopyButton";

type Category = "all" | "black" | "white" | "protocol";

const subscriptions = [
  {
    id: 1,
    category: "black",
    title: "AetrisVPN Black",
    desc: "Основная. Максимальная стабильность.",
    badge: "Рекомендуем",
    url: "https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt",
    variant: "primary" as const,
  },
  {
    id: 2,
    category: "black",
    title: "Akres VPN",
    desc: "Запасной источник.",
    url: "https://vpn.akres.fun/all",
  },
  {
    id: 3,
    category: "black",
    title: "Black Mobile",
    desc: "Оптимизировано для смартфонов.",
    icon: Smartphone,
    url: "https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt",
    variant: "primary" as const,
    highlight: true,
  },
  {
    id: 4,
    category: "white",
    title: "AetrisVPN White",
    desc: "Только российские ресурсы.",
    url: "https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt",
  },
  {
    id: 5,
    category: "white",
    title: "WHITE-CIDR-RU",
    desc: "IP-адреса РФ.",
    url: "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt",
  },
  {
    id: 6,
    category: "white",
    title: "WHITE-SNI-RU",
    desc: "SNI домены РФ.",
    url: "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt",
  },
  {
    id: 7,
    category: "protocol",
    title: "VLESS (Mifa)",
    desc: "Быстрый и современный",
    iconColor: "blue",
    url: "https://mifa.world/vless",
  },
  {
    id: 8,
    category: "protocol",
    title: "VMess (Mifa)",
    desc: "Надёжный и стабильный",
    iconColor: "green",
    url: "https://mifa.world/vmess",
  },
  {
    id: 9,
    category: "protocol",
    title: "Trojan (Mifa)",
    desc: "Хорошая маскировка",
    iconColor: "purple",
    url: "https://mifa.world/trojan",
  },
  {
    id: 10,
    category: "protocol",
    title: "Shadowsocks (Mifa)",
    desc: "Для игр (низкий пинг)",
    iconColor: "orange",
    url: "https://mifa.world/ss",
  },
];

const tabs: { id: Category; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "black", label: "Чёрные списки" },
  { id: "white", label: "Белые списки" },
  { id: "protocol", label: "Протоколы" },
];

export function Subscriptions() {
  const [filter, setFilter] = useState<Category>("all");
  const filtered = filter === "all" ? subscriptions : subscriptions.filter(s => s.category === filter);

  return (
    <section id="subscriptions" className="py-24 px-4 border-t border-[var(--border-color)]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Центр подключений</h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Выберите подходящую конфигурацию. Мы рекомендуем начинать с чёрных списков.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                filter === tab.id
                  ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white border-transparent shadow-lg shadow-brand-600/30"
                  : "bg-transparent text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--text-primary)] hover:border-brand-500/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((sub) => (
              <motion.div
                key={sub.id}
                layout
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
              >
                <PremiumCard className={`p-6 rounded-2xl ${sub.highlight ? "border-brand-500/30" : ""}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg flex items-center gap-2">
                        {sub.icon && <sub.icon className="w-5 h-5 text-brand-400" />}
                        {sub.title}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">{sub.desc}</p>
                    </div>
                    {sub.badge && (
                      <span className="px-2 py-1 bg-brand-500/20 text-brand-400 text-[10px] font-bold rounded uppercase border border-brand-500/20">
                        {sub.badge}
                      </span>
                    )}
                  </div>
                  <CopyButton url={sub.url} variant={sub.variant} />
                </PremiumCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
                          }
