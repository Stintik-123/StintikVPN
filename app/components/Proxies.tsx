"use client";

import { motion } from "framer-motion";
import { Send, ExternalLink } from "lucide-react";
import { PremiumCard } from "./PremiumCard";
import { MagneticButton } from "./MagneticButton";

const proxies = [
  { id: 1, server: "213.219.212.4", url: "https://t.me/proxy?server=213.219.212.4&port=443&secret=dd9e1dde0de02a2e7c22d10e2fff841013" },
  { id: 2, server: "159.194.204.176", url: "https://t.me/proxy?server=159.194.204.176&port=443&secret=ee0dbf98440246f4b9228dd2b704256cad6f7a6f6e2e7275" },
  { id: 3, server: "176.124.198.158", url: "tg://proxy?server=176.124.198.158&port=8443&secret=49ca22e2d077918b01b5ac05cb48ba75" },
  { id: 4, server: "185.16.38.157", url: "tg://proxy?server=185.16.38.157&port=443&secret=2d4df2434a8d6450d65141fbb73799d5" },
  { id: 5, server: "144.31.158.95", url: "tg://proxy?server=144.31.158.95&port=443&secret=26f0791e5f4e4ccef46320ae749a6f06" },
  { id: 6, server: "31.76.9.140", url: "tg://proxy?server=31.76.9.140&port=8444&secret=b5bfb3434865a30eaceb9022238e4448" },
];

export function Proxies() {
  return (
    <section id="proxies" className="py-24 px-4 border-t border-[var(--border-color)]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Telegram Прокси</h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Нажмите на любой прокси, чтобы автоматически добавить его в Telegram.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {proxies.map((proxy, i) => (
            <motion.a
              key={proxy.id}
              href={proxy.url}
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <MagneticButton>
                <PremiumCard className="p-5 rounded-2xl flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold">Прокси #{proxy.id}</div>
                      <div className="text-xs text-[var(--text-secondary)] font-mono">{proxy.server}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-brand-500 transition-colors" />
                </PremiumCard>
              </MagneticButton>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
