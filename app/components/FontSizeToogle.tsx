"use client";

import { useState } from "react";
import { Type } from "lucide-react";

export function FontSizeToggle() {
  const [level, setLevel] = useState(0);

  const toggle = () => {
    const next = (level + 1) % 3;
    setLevel(next);
    document.body.classList.remove("font-level-1", "font-level-2");
    if (next === 1) document.body.classList.add("font-level-1");
    if (next === 2) document.body.classList.add("font-level-2");
  };

  return (
    <button
      onClick={toggle}
      className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-brand-500 hover:border-brand-500/50 transition-all"
      title="Размер шрифта"
    >
      <span className="font-bold text-sm">Aa</span>
    </button>
  );
}
