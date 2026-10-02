"use client";

import React, { useEffect, useState } from "react";

interface FloatingItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  icon: string;
  opacity: number;
}

export const FloatingHearts: React.FC = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const emojis = ["💗", "🌸", "✨", "🐷", "💕", "🤍", "🌷", "🍬"];
    const generated: FloatingItem[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.random() * 16 + 14,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      icon: emojis[Math.floor(Math.random() * emojis.length)],
      opacity: Math.random() * 0.4 + 0.25,
    }));
    setItems(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <span
          key={item.id}
          className="absolute select-none transition-transform"
          style={{
            left: `${item.left}%`,
            bottom: "-30px",
            fontSize: `${item.size}px`,
            opacity: item.opacity,
            animation: `floatUp ${item.duration}s linear ${item.delay}s infinite`,
          }}
        >
          {item.icon}
        </span>
      ))}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
