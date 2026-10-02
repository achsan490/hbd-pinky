"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Gift } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";
import { useMusic } from "@/context/MusicContext";
import { playSoundEffect } from "@/utils/soundEffects";

interface BirthdayOpeningProps {
  onOpen: () => void;
}

export const BirthdayOpening: React.FC<BirthdayOpeningProps> = ({ onOpen }) => {
  const { startMusic } = useMusic();
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenSurprise = () => {
    if (isOpening) return;
    setIsOpening(true);

    playSoundEffect("chime");
    startMusic();

    // Fire cute pink/rose/gold confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f472b6", "#ec4899", "#fda4af", "#fef08a", "#ffffff"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#f472b6", "#fb7185", "#ffedd5"],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#f472b6", "#fb7185", "#ffedd5"],
        });
      }, 250);
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#fff0f4] via-[#fde2ea] to-[#ffd7e3] p-4 sm:p-6 overflow-hidden"
        >
          {/* Decorative soft glow background circles */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-pink-200/50 blur-3xl -top-10 -left-10 pointer-events-none" />
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-rose-200/40 blur-3xl -bottom-10 -right-10 pointer-events-none" />

          {/* Card Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-center shadow-[0_20px_50px_rgba(244,114,182,0.25)] border border-pink-100 flex flex-col items-center"
          >
            {/* Cute mini ribbon tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-pink-600 text-xs font-semibold tracking-wide mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>A Special Gift For You</span>
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            </div>

            {/* Pig Character Container */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, -1.5, 1.5, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-40 h-40 sm:w-48 sm:h-48 mb-5 select-none"
            >
              <div className="absolute inset-0 bg-pink-200/40 rounded-full blur-xl scale-95" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg bg-pink-50">
                <Image
                  src="/images/photo-2.jpg"
                  alt="Anggi Cantik"
                  fill
                  sizes="(max-width: 768px) 160px, 192px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Cute pig sticker on the photo */}
              <div className="absolute -bottom-2 -right-1 w-11 h-11 bg-white rounded-full p-1 shadow-md border-2 border-pink-200 flex items-center justify-center text-xl select-none">
                🐷
              </div>

              {/* Floating micro hearts around pig */}
              <motion.span
                animate={{ y: [-4, 4, -4], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 text-2xl"
              >
                💕
              </motion.span>
              <motion.span
                animate={{ y: [4, -4, 4], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-1 -left-1 text-xl"
              >
                🌸
              </motion.span>
            </motion.div>

            {/* Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl sm:text-3xl font-extrabold text-pink-900 tracking-tight mb-2"
            >
              {birthdayData.opening.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="text-sm sm:text-base text-pink-700/80 mb-6 font-medium"
            >
              {birthdayData.opening.subtitle}
            </motion.p>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenSurprise}
              className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white font-bold text-sm sm:text-base shadow-[0_10px_25px_rgba(236,72,153,0.38)] hover:shadow-[0_14px_30px_rgba(236,72,153,0.5)] transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Subtle sheen highlight animation */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <Gift className="w-5 h-5 text-white/90 group-hover:rotate-12 transition-transform duration-300" />
              <span>{birthdayData.opening.buttonText}</span>
              <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform duration-300" />
            </motion.button>

            <p className="mt-4 text-xs text-pink-500/70 font-medium">
              🎧 Pakai earphone / nyalakan suara untuk pengalaman terbaik yaa
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
