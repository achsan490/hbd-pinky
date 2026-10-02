"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Flame } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";
import { playSoundEffect } from "@/utils/soundEffects";

export const BirthdayCake: React.FC = () => {
  const [isCandleBlown, setIsCandleBlown] = useState<boolean>(false);
  const [showHugAnimation, setShowHugAnimation] = useState<boolean>(false);

  const handleBlowCandle = () => {
    if (isCandleBlown) return;
    playSoundEffect("blow");
    setIsCandleBlown(true);

    setTimeout(() => {
      playSoundEffect("celebrate");
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#f43f5e", "#fb7185", "#f472b6", "#ffd700", "#ffffff"],
        });
      } catch {}
    }, 400);
  };

  const handleHug = () => {
    playSoundEffect("hug");
    setShowHugAnimation(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.5 },
        colors: ["#ec4899", "#fda4af"],
      });
    } catch {}
    setTimeout(() => {
      setShowHugAnimation(false);
    }, 2800);
  };

  return (
    <section id="cake" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Dimmed backdrop effect when candle is blown */}
      <AnimatePresence>
        {isCandleBlown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-pink-950 pointer-events-none z-10"
          />
        )}
      </AnimatePresence>

      {/* Giant Hug Screen Overlay Animation */}
      <AnimatePresence>
        {showHugAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ type: "spring", damping: 15 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-pink-950/40 backdrop-blur-sm pointer-events-none p-4"
          >
            <motion.div
              animate={{
                scale: [1, 1.25, 1, 1.2, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-8xl sm:text-9xl filter drop-shadow-[0_10px_30px_rgba(244,63,94,0.6)]"
            >
              💖
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 px-6 py-3 rounded-full bg-white/95 text-pink-700 font-extrabold text-base sm:text-xl shadow-2xl border border-pink-200 text-center"
            >
              {birthdayData.cake.hugCelebrationText}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <div className="text-center mb-12 relative z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 text-pink-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Birthday Ritual</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5c2d38] tracking-tight">
          {birthdayData.cake.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-pink-800/70 max-w-md mx-auto">
          {birthdayData.cake.subtitle}
        </p>
      </div>

      {/* Interactive Birthday Cake Container */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* Candle & Flame */}
          <div
            onClick={handleBlowCandle}
            className={`relative flex flex-col items-center cursor-pointer transition-transform group ${
              !isCandleBlown ? "hover:scale-105" : ""
            }`}
          >
            {/* Animated Candle Flame */}
            <AnimatePresence>
              {!isCandleBlown ? (
                <motion.div
                  exit={{ opacity: 0, y: -15, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex flex-col items-center mb-1"
                >
                  <motion.div
                    animate={{
                      scaleY: [1, 1.25, 0.9, 1.15, 1],
                      scaleX: [1, 0.9, 1.1, 0.95, 1],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-6 h-9 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full blur-[0.5px] shadow-[0_0_20px_rgba(251,191,36,0.9)]"
                  />
                  {/* Subtle Flame Glow Ring */}
                  <div className="absolute inset-0 bg-yellow-300/30 rounded-full blur-md scale-150 animate-pulse" />
                  <span className="text-[11px] font-bold text-amber-600 bg-white/90 px-2 py-0.5 rounded-full shadow-sm mt-1 whitespace-nowrap">
                    Tiup lilin 💨
                  </span>
                </motion.div>
              ) : (
                /* Smoke puff after blown */
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 0.6, 0], y: -25, x: [0, 5, -5] }}
                  transition={{ duration: 1.5 }}
                  className="text-base text-gray-400 font-semibold mb-2 select-none"
                >
                  💨 ✨
                </motion.div>
              )}
            </AnimatePresence>

            {/* Candle Body */}
            <div className="w-4 h-14 bg-gradient-to-b from-rose-200 via-pink-300 to-pink-400 rounded-t-sm shadow-sm relative overflow-hidden border border-pink-200">
              {/* Spiral decorative stripes on candle */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.7)_4px,rgba(255,255,255,0.7)_8px)]" />
            </div>
          </div>

          {/* Layered Pink Birthday Cake Illustration */}
          <div className="relative flex flex-col items-center">
            {/* Top Tier Cake */}
            <div className="relative w-44 sm:w-52 h-14 bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 rounded-t-2xl shadow-sm border-2 border-pink-100 flex items-center justify-around px-4">
              {/* Strawberry toppings */}
              <span className="text-xl -mt-6">🍓</span>
              <span className="text-lg -mt-6">🌸</span>
              <span className="text-xl -mt-6">🍓</span>
              <span className="text-lg -mt-6">🌸</span>
              <span className="text-xl -mt-6">🍓</span>
            </div>

            {/* Middle Cream & Sprinkles Divider */}
            <div className="w-52 sm:w-60 h-3 bg-white/90 rounded-full shadow-sm -my-1 z-10 flex items-center justify-around px-4">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
            </div>

            {/* Bottom Tier Cake */}
            <div className="relative w-60 sm:w-72 h-20 bg-gradient-to-r from-pink-400 via-pink-300 to-pink-400 rounded-t-xl rounded-b-lg shadow-md border-2 border-pink-200 flex flex-col justify-center items-center">
              <div className="flex items-center gap-2 text-white font-extrabold text-xs sm:text-sm drop-shadow-sm tracking-wide">
                <span>🐷</span>
                <span>HBD {birthdayData.recipientName}</span>
                <span>💕</span>
              </div>
              <div className="flex gap-2 mt-1 text-sm">
                <span>✨</span>
                <span>🎂</span>
                <span>✨</span>
              </div>
            </div>

            {/* Cake Plate Stand */}
            <div className="w-72 sm:w-84 h-4 bg-gradient-to-r from-gray-100 via-white to-gray-200 rounded-full shadow-lg border border-pink-100 mt-0.5" />
            <div className="w-36 h-3 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-b-md shadow-md" />
          </div>
        </div>

        {/* Wish Success Message */}
        <AnimatePresence>
          {isCandleBlown && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 max-w-md w-full bg-white/95 rounded-3xl p-6 text-center shadow-[0_15px_35px_rgba(244,114,182,0.25)] border-2 border-pink-200"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-2xl mb-3 shadow-inner">
                ✨
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-pink-950 mb-2">
                Wish Granted! 🎂
              </h3>
              <p className="font-handwriting text-2xl sm:text-3xl text-pink-700 leading-snug">
                &ldquo;{birthdayData.cake.wishSuccessMessage}&rdquo;
              </p>

              {/* One More Hug Button */}
              <div className="mt-6 pt-4 border-t border-pink-100">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleHug}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{birthdayData.cake.hugButtonText}</span>
                  <Heart className="w-4 h-4 fill-white" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
