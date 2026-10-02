"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Smile, RotateCcw } from "lucide-react";
import { playSoundEffect } from "@/utils/soundEffects";

const noButtonTaunts = [
  "Eits, yakin gak sayang sama aku? 🥺",
  "Tombol 'Nggak' lagi ngambek lho! 🐽",
  "Masa babi selucu ini gak disayang sih? 😭💔",
  "Tuh kan tombol YES makin GEDE BANGET! 😆",
  "Udah segede gaban tombol YES-nya, masa gak diklik? 🥰",
  "Tombol ini rusak, coba pencet tombol pink raksasa di atas! 😝",
  "Udah deh mengaku aja kamu sayang banget sama aku 🐷💖",
  "Gak ada opsi 'Nggak' di kamus kita wkwk 😆",
  "Tombol YES udah makin menguasai layar nih! 💖",
  "Duh jarinya lincah banget, tapi hatinya tetep cinta kan? 😜",
];

const getNoButtonLabel = (count: number) => {
  if (count === 0) return "Nggak 😜";
  if (count === 1) return "Yakin? 🥺";
  if (count === 2) return "Masa sih? 😭";
  if (count === 3) return "Bohong kan? 🐽";
  if (count === 4) return "Pikir lagi deh! 💔";
  if (count === 5) return "Gak boleh! 😝";
  if (count === 6) return "Pencet YES dong! 🥺";
  if (count === 7) return "Masih gamau juga? 😭";
  return "Pencet YES aja! 💕";
};

const getYesButtonText = (count: number) => {
  if (count <= 1) return "SAYANG BANGET DONG! 💗";
  if (count <= 3) return "SAYANG BANGEEETTT DONG! 💖";
  if (count <= 5) return "SAYANG BANGET POKOKNYA! 🐷💖";
  return "IYA SAYANG BANGET BANGEEETTT! 🐷💖🎉";
};

// Safe playful offsets for NO button (stationed safely below the YES button)
const safeOffsets = [
  { x: 0, y: 0, rotate: 0 },
  { x: 35, y: 10, rotate: 5 },
  { x: -35, y: 15, rotate: -6 },
  { x: 45, y: -5, rotate: 8 },
  { x: -40, y: 8, rotate: -5 },
  { x: 20, y: 18, rotate: 4 },
  { x: -20, y: 12, rotate: -3 },
];

export const RunawayGame: React.FC = () => {
  const [noCount, setNoCount] = useState<number>(0);
  const [offsetIndex, setOffsetIndex] = useState<number>(0);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [taunt, setTaunt] = useState<string>("");

  // Handle clicking or tapping the NO button safely
  const handleNoClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    playSoundEffect("pop");
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    const nextIndex = (offsetIndex + 1) % safeOffsets.length;
    setOffsetIndex(nextIndex);

    const randomTaunt = noButtonTaunts[(nextCount - 1) % noButtonTaunts.length];
    setTaunt(randomTaunt);
  };

  const handleYesClick = () => {
    playSoundEffect("celebrate");
    setIsAccepted(true);

    try {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#ec4899", "#f43f5e", "#fda4af", "#ffd700", "#ff69b4"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 300);
    } catch {}
  };

  const handleReset = () => {
    playSoundEffect("pop");
    setNoCount(0);
    setOffsetIndex(0);
    setIsAccepted(false);
    setTaunt("");
  };

  // Grow "Yes" button aggressively with every NO click!
  // Grows up to 2.5x with generous dynamic spacing
  const yesScale = 1 + Math.min(noCount, 10) * 0.15;
  const noScale = Math.max(0.78, 1 - noCount * 0.03);
  const currentOffset = safeOffsets[offsetIndex];

  return (
    <section id="love-quiz" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 text-pink-700 text-xs font-semibold mb-3">
          <Smile className="w-3.5 h-3.5 text-pink-500" />
          <span>Interactive Love Quiz</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5c2d38] tracking-tight">
          Pertanyaan Penting... 🐷❓
        </h2>
        <p className="mt-2 text-sm sm:text-base text-pink-800/70 max-w-md mx-auto">
          Jawab dengan jujur dari lubuk hatimu yang paling dalam yaa!
        </p>
      </div>

      {/* Main Interactive Box */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(244,114,182,0.22)] border-2 border-pink-200 text-center min-h-[440px] sm:min-h-[500px] flex flex-col items-center justify-center transition-all duration-300">
        <AnimatePresence mode="wait">
          {!isAccepted ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col items-center"
            >
              {/* Cute Pig Avatar with Expression */}
              <motion.div
                animate={
                  noCount > 0
                    ? { rotate: [-10, 10, -10] }
                    : { y: [0, -6, 0] }
                }
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg mb-5 bg-pink-100"
              >
                <Image
                  src="/pig/pig.png"
                  alt="Curious Pig"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Question */}
              <h3 className="text-xl sm:text-3xl font-black text-pink-950 max-w-lg mb-3 leading-snug">
                Kamu sayang banget sama aku nggak? 🥺💕
              </h3>

              {/* Dynamic Taunt Bubble */}
              <div className="min-h-9 mb-6 flex items-center justify-center px-2">
                {taunt ? (
                  <motion.div
                    key={taunt}
                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs sm:text-sm font-bold shadow-sm"
                  >
                    <span>{taunt}</span>
                  </motion.div>
                ) : (
                  <p className="text-xs sm:text-sm text-pink-500 font-medium">
                    Pilih salah satu tombol di bawah 👇
                  </p>
                )}
              </div>

              {/* Buttons Area with dynamic expansion */}
              <div className="w-full max-w-lg flex flex-col items-center justify-center py-2">
                {/* YES Button Container (adds vertical and horizontal clearance as it grows giant) */}
                <div
                  className="transition-all duration-300 flex items-center justify-center"
                  style={{
                    paddingTop: `${Math.min(noCount * 14, 90)}px`,
                    paddingBottom: `${Math.min(noCount * 14, 90)}px`,
                  }}
                >
                  <motion.button
                    animate={{
                      scale: yesScale,
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    whileHover={{ scale: yesScale * 1.05 }}
                    whileTap={{ scale: yesScale * 0.95 }}
                    onClick={handleYesClick}
                    className="px-6 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-black text-xs sm:text-base cursor-pointer flex items-center gap-2 z-10 whitespace-nowrap active:scale-95 transition-shadow duration-300"
                    style={{
                      boxShadow: `0 ${12 + noCount * 4}px ${28 + noCount * 6}px rgba(244, 63, 94, ${Math.min(
                        0.4 + noCount * 0.05,
                        0.85
                      )})`,
                    }}
                  >
                    <Heart
                      className={`fill-white shrink-0 ${
                        noCount > 1 ? "animate-bounce" : ""
                      }`}
                      style={{
                        width: `${18 + Math.min(noCount * 1.5, 12)}px`,
                        height: `${18 + Math.min(noCount * 1.5, 12)}px`,
                      }}
                    />
                    <span>{getYesButtonText(noCount)}</span>
                  </motion.button>
                </div>

                {/* NO Button Row (stays comfortably below the giant YES so it never overlaps or gets misclicked) */}
                <div className="relative w-full flex items-center justify-center min-h-[56px] mt-2">
                  <motion.button
                    animate={{
                      x: currentOffset.x,
                      y: currentOffset.y,
                      rotate: currentOffset.rotate,
                      scale: noScale,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    whileHover={{ scale: noScale * 1.08 }}
                    whileTap={{ scale: noScale * 0.92 }}
                    onClick={handleNoClick}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600 font-bold text-xs sm:text-sm shadow-md border border-gray-300/80 cursor-pointer whitespace-nowrap z-20 select-none transition-colors"
                  >
                    {getNoButtonLabel(noCount)}
                  </motion.button>
                </div>
              </div>

              {/* Counter note */}
              {noCount > 0 && (
                <p className="mt-4 text-[11px] sm:text-xs text-pink-500 font-semibold animate-pulse">
                  Usaha pencet tombol &lsquo;Nggak&rsquo;: {noCount}x (Tuh tombol YES makin raksasa! Tinggal pencet aja 🥰)
                </p>
              )}
            </motion.div>
          ) : (
            /* Victory / Love Accepted Screen */
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl mb-4 bg-pink-100">
                <Image
                  src="/pig/pig.png"
                  alt="Happy Pig"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>Confirmed Forever</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-pink-950 tracking-tight mb-3">
                AKU JUGA SAYANG BANGEEETTT SAMA KAMU! 🐷💖🎉
              </h3>

              <p className="font-handwriting text-2xl sm:text-3xl text-pink-700 max-w-lg mb-6 leading-snug">
                &ldquo;Tuh kan bener, emang gak ada pilihan lain selain kita saling sayang selamanya! 🥰&rdquo;
              </p>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs sm:text-sm border border-pink-200 transition-colors cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Main Ulang 😜</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
