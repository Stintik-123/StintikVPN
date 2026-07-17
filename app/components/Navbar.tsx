"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun, Type } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { FontSizeToggle } from "./FontSizeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  const links = [
    { href: "#subscriptions", label: "Подписки" },
    { href: "#proxies", label: "Прокси" },
    { href: "#bypass", label: "Обход DPI" },
    { href: "#faq", label: "Вопросы" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-[var(--bg-primary)]/90 backdrop-blur-xl shadow-lg shadow-black/20"
            : "border-white/5 bg-[var(--bg-primary)]/70 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <Link href="#" className="flex items-center gap-3 group">
            <img
              src="https://raw.githubusercontent.com/Stintik-123/StintikVPN/main/images/IMG_20260609_220410_760.jpg"
              alt="Logo"
              className="w-9 h-9 rounded-lg object-cover shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-all"
            />
            <span className="text-lg font-bold tracking-tight hidden sm:block">
              Stintik<span className="gradient-text">VPN</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--text-secondary)]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-brand-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <FontSizeToggle />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-[var(--bg-primary)] backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--border-color)]"
          >
            <X className="w-6 h-6" />
          </button>
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-3xl font-bold hover:text-brand-500 transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="https://github.com/Stintik-123/StintikVPN"
            target="_blank"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 flex items-center gap-2 text-[var(--text-secondary)] hover:text-brand-500"
          >
            GitHub
          </motion.a>
        </motion.div>
      )}
    </>
  );
      }
