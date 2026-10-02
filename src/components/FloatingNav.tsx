"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "hero", label: "Home", icon: "✨" },
  { id: "memories", label: "Kenangan", icon: "📸" },
  { id: "video", label: "Video", icon: "🎬" },
  { id: "letter", label: "Surat", icon: "💌" },
  { id: "cake", label: "Kue", icon: "🎂" },
  { id: "game", label: "Game", icon: "🎮" },
  { id: "love-quiz", label: "Sayang?", icon: "❓" },
  { id: "timeline", label: "Story", icon: "📖" },
  { id: "final-surprise", label: "Love", icon: "💖" },
];

export const FloatingNav: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }

      // Determine active section
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95vw]">
      {/* Container Pill */}
      <div className="relative bg-white/85 backdrop-blur-md border border-pink-200/90 rounded-full px-2.5 py-1.5 shadow-[0_8px_25px_rgba(244,114,182,0.22)] flex items-center gap-1 overflow-x-auto no-scrollbar">
        {/* Scroll Progress line at the bottom of the pill */}
        <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-pink-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                isActive
                  ? "text-pink-600 bg-pink-100/80 shadow-sm"
                  : "text-pink-900/70 hover:text-pink-600 hover:bg-pink-50"
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden sm:inline text-[11px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
