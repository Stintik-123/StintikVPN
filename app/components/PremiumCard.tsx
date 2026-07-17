"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function PremiumCard({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    ref.current!.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      className={cn(
        "premium-card relative overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40",
        className
      )}
      style={{
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      }}
      {...props}
    >
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249, 115, 22, 0.12), transparent 40%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
                            }
