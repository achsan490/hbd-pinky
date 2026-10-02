"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Heart } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";
import { playSoundEffect } from "@/utils/soundEffects";

export const InteractivePig: React.FC = () => {
  const [clickCount, setClickCount] = useState<number>(0);
  const [currentQuote, setCurrentQuote] = useState<string>("Halo sayang! Klik aku dong 🐷💕");
  const [showSpeechBubble, setShowSpeechBubble] = useState<boolean>(true);
  const [isWiggling, setIsWiggling] = useState<boolean>(false);
  const [secretUnlocked, setSecretUnlocked] = useState<boolean>(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Subtle cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handlePigClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setIsWiggling(true);
    setShowSpeechBubble(true);

    if (newCount === birthdayData.pigEasterEggThreshold) {
      // Secret Easter Egg Triggered!
      playSoundEffect("celebrate");
      setSecretUnlocked(true);
      setCurrentQuote(birthdayData.pigEasterEggText);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.7, x: 0.2 },
          colors: ["#ec4899", "#f43f5e", "#fb7185", "#ffd700", "#ff69b4"],
        });
      } catch {}
    } else {
      playSoundEffect("pop");
      const randomIdx = Math.floor(Math.random() * birthdayData.pigQuotes.length);
      setCurrentQuote(birthdayData.pigQuotes[randomIdx]);
    }

    setTimeout(() => {
      setIsWiggling(false);
    }, 500);
  };

  return (
    <div className="fixed bottom-3 left-3 sm:bottom-6 sm:left-6 z-40 select-none">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={`relative mb-2 max-w-[190px] sm:max-w-[260px] p-2.5 sm:p-3 rounded-2xl shadow-[0_8px_25px_rgba(244,114,182,0.3)] border text-xs sm:text-sm font-semibold backdrop-blur-md ${
              secretUnlocked
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-300"
                : "bg-white/95 text-pink-900 border-pink-200"
            }`}
          >
            {/* Bubble Tail */}
            <div
              className={`absolute -bottom-2 left-6 sm:left-8 w-3 h-3 rotate-45 border-r border-b ${
                secretUnlocked
                  ? "bg-rose-500 border-pink-300"
                  : "bg-white border-pink-200"
              }`}
            />

            <div className="flex items-start gap-2">
              {secretUnlocked ? (
                <Sparkles className="w-4 h-4 text-yellow-200 flex-shrink-0 mt-0.5 animate-spin" />
              ) : (
                <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 flex-shrink-0 mt-0.5" />
              )}
              <span className="leading-snug text-[11px] sm:text-xs">{currentQuote}</span>
            </div>

            {/* Tap counter hint */}
            <div className="mt-1.5 pt-1 border-t border-pink-100/50 flex justify-between items-center text-[9px] sm:text-[10px] text-pink-400">
              <span>{clickCount} / {birthdayData.pigEasterEggThreshold} klik</span>
              <span>Tap me! 🐽</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pig Character Container */}
      <motion.div
        animate={{
          x: mouseOffset.x * 0.4,
          y: mouseOffset.y * 0.4,
          scale: isWiggling ? [1, 1.15, 0.95, 1.05, 1] : 1,
          rotate: isWiggling ? [-6, 6, -4, 4, 0] : 0,
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handlePigClick}
        className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full cursor-pointer group"
      >
        {/* Soft pulsing aura behind pig */}
        <div className="absolute inset-0 bg-pink-300/40 rounded-full blur-md group-hover:bg-pink-400/50 transition-colors" />

        {/* Pig image avatar */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-white shadow-[0_8px_20px_rgba(244,114,182,0.35)] bg-pink-100">
          <Image
            src="/pig/pig.png"
            alt="Interactive Pig Companion"
            fill
            className="object-cover"
          />
        </div>

        {/* Floating Heart over head */}
        <motion.div
          animate={{ y: [-2, 3, -2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-2 -right-1 text-sm bg-white rounded-full p-0.5 shadow-sm border border-pink-100"
        >
          💖
        </motion.div>
      </motion.div>
    </div>
  );
};
