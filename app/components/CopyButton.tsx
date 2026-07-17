"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

export function CopyButton({
  url,
  label = "Копировать",
  variant = "default",
}: {
  url: string;
  label?: string;
  variant?: "default" | "primary";
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      
      // Показать модалку при первом копировании
      if (!localStorage.getItem("copyModalShown")) {
        localStorage.setItem("copyModalShown", "true");
        window.dispatchEvent(new CustomEvent("show-copy-modal"));
      }
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      if (!localStorage.getItem("copyModalShown")) {
        localStorage.setItem("copyModalShown", "true");
        window.dispatchEvent(new CustomEvent("show-copy-modal"));
      }
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const baseClass =
    variant === "primary"
      ? "bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white shadow-lg shadow-brand-600/20"
      : "bg-[var(--bg-primary)] hover:bg-white/5 border border-[var(--border-color)] hover:border-brand-500/50 text-[var(--text-primary)]";

  return (
    <MagneticButton>
      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.96 }}
        className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${baseClass} ${
          copied ? "!bg-green-500 !border-green-500 !text-white" : ""
        }`}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Скопировано
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            {label}
          </>
        )}
      </motion.button>
    </MagneticButton>
  );
}
