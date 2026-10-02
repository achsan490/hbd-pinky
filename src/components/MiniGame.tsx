"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Trophy, RotateCcw, Sparkles, Gamepad2 } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";
import { playSoundEffect } from "@/utils/soundEffects";

interface HeartItem {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
}

export const MiniGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [hearts, setHearts] = useState<HeartItem[]>([]);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [clickParticles, setClickParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Spawn hearts inside arena
  useEffect(() => {
    if (isWon) return;

    const interval = setInterval(() => {
      setHearts((prev) => {
        if (prev.length >= 5) return prev;
        const emojis = ["💖", "💕", "💗", "💓", "🌸"];
        const newHeart: HeartItem = {
          id: Date.now() + Math.random(),
          x: Math.floor(Math.random() * 75) + 10,
          y: Math.floor(Math.random() * 65) + 15,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          size: Math.floor(Math.random() * 12) + 28,
        };
        return [...prev, newHeart];
      });
    }, 900);

    return () => clearInterval(interval);
  }, [isWon]);

  const handleCatchHeart = (id: number, x: number, y: number) => {
    playSoundEffect("sparkle");
    setHearts((prev) => prev.filter((h) => h.id !== id));

    // Add particle
    setClickParticles((prev) => [...prev, { id: Date.now(), x, y }]);

    const nextScore = score + 1;
    setScore(nextScore);

    if (nextScore >= birthdayData.miniGame.target) {
      setIsWon(true);
      playSoundEffect("celebrate");
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#ec4899", "#f43f5e", "#ffd700", "#ff69b4"],
        });
      } catch {}
    }
  };

  const handleRestart = () => {
    playSoundEffect("pop");
    setScore(0);
    setHearts([]);
    setIsWon(false);
  };

  return (
    <section id="game" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 text-pink-700 text-xs font-semibold mb-3">
          <Gamepad2 className="w-3.5 h-3.5 text-pink-500" />
          <span>Mini Game</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5c2d38] tracking-tight">
          {birthdayData.miniGame.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-pink-800/70 max-w-md mx-auto">
          {birthdayData.miniGame.subtitle}
        </p>
      </div>

      {/* Game Card Arena */}
      <div className="relative bg-white/95 rounded-3xl p-4 sm:p-8 shadow-[0_20px_50px_rgba(244,114,182,0.22)] border-2 border-pink-200 overflow-hidden">
        {/* Top Score Bar */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-pink-100">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
            <span className="text-sm font-extrabold text-pink-900">
              Love Collected: <span className="text-rose-500 text-base">{score}</span> /{" "}
              {birthdayData.miniGame.target}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-[140px] sm:max-w-xs h-3 bg-pink-100 rounded-full overflow-hidden p-0.5 border border-pink-200">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: `${Math.min(100, (score / birthdayData.miniGame.target) * 100)}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <button
            onClick={handleRestart}
            className="p-1.5 rounded-full hover:bg-pink-100 text-pink-400 hover:text-pink-600 transition-colors cursor-pointer"
            title="Reset Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Playfield Area */}
        <div className="relative w-full h-72 sm:h-96 rounded-2xl bg-gradient-to-b from-pink-50/80 via-[#fff5f8] to-pink-100/50 border border-pink-100 overflow-hidden select-none">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none text-9xl">
            🐷
          </div>

          {/* Floating Catchable Hearts */}
          {hearts.map((h) => (
            <motion.button
              key={h.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0.9, 1.15, 1],
                opacity: 1,
                y: [0, -8, 0],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.3 },
              }}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => handleCatchHeart(h.id, h.x, h.y)}
              style={{
                left: `${h.x}%`,
                top: `${h.y}%`,
                fontSize: `${h.size}px`,
              }}
              className="absolute cursor-pointer transition-transform filter drop-shadow-md select-none focus:outline-none"
            >
              {h.emoji}
            </motion.button>
          ))}

          {/* Click Particles "+1 Love" */}
          {clickParticles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -40, scale: 1.2 }}
              transition={{ duration: 0.8 }}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className="absolute pointer-events-none font-bold text-xs sm:text-sm text-pink-600 whitespace-nowrap z-20"
            >
              +1 Love 💖
            </motion.span>
          ))}

          {/* Victory Modal */}
          <AnimatePresence>
            {isWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-pink-300 shadow-xl mb-3 bg-pink-100">
                  <Image
                    src="/pig/pig.png"
                    alt="Celebration Pig"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">
                  <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                  <span>Mission Accomplished</span>
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-pink-900 tracking-tight mb-2">
                  {birthdayData.miniGame.winTitle}
                </h3>

                <p className="font-handwriting text-xl sm:text-2xl text-pink-700 max-w-sm mb-5 leading-snug">
                  &ldquo;{birthdayData.miniGame.winSubtitle}&rdquo;
                </p>

                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Main Lagi 💕</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
