"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Send, X } from "lucide-react";

export function CopyModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("show-copy-modal", handler);
    return () => window.removeEventListener("show-copy-modal", handler);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-7 max-w-md w-full text-center shadow-2xl"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-[var(--text-secondary)]"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/10 border border-brand-500/30 flex items-center justify-center mb-5 text-brand-400">
              <CheckCircle className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold mb-3">Ссылка скопирована!</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Чтобы всегда быть в курсе новых рабочих подписок и обновлений, подпишитесь на наш Telegram-канал.
            </p>
            
            <div className="flex flex-col gap-3">
              <a
                href="https://t.me/StintikVPN"
                target="_blank"
                className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30"
              >
                <Send className="w-4 h-4" />
                Подписаться на канал
              </a>
              <button
                onClick={() => setOpen(false)}
                className="w-full py-3.5 bg-[var(--bg-primary)] hover:bg-white/5 border border-[var(--border-color)] font-medium rounded-xl transition-all"
              >
                Закрыть
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
