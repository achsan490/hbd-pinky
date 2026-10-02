"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Smile, RotateCcw } from "lucide-react";
import { playSoundEffect } from "@/utils/soundEffects";

const noButtonTaunts = [
  "Eits gak kena! 😜",
  "Yakin gamau klik YES? 🥺",
  "Tombol ini cuma pajangan lohh 😝",
  "Tombol 'Nggak' lagi istirahat sayang 🐽",
  "Udah deh mengaku aja kamu sayang banget sama aku 🐷💖",
  "Coba terus sampai lebaran monyet juga gabisa wkwk 😆",
  "Tombol YES makin gede tuh, tinggal diklik aja! 🥰",
  "Duh jarinya lincah banget, tapi tetep gabisa klik 'No' 😜",
];

export const RunawayGame: React.FC = () => {
  const [noCount, setNoCount] = useState<number>(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [taunt, setTaunt] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Dodge "No" button smoothly inside container
  const dodgeNoButton = () => {
    playSoundEffect("pop");
    const nextCount = noCount + 1;
    setNoCount(nextCount);
    setHasMoved(true);

    const randomTaunt = noButtonTaunts[(nextCount - 1) % noButtonTaunts.length];
    setTaunt(randomTaunt);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const padding = 50;
      const width = Math.max(160, rect.width - padding * 2);
      const height = Math.max(120, rect.height - padding * 2);

      // Random position relative to center
      const randomX = (Math.random() - 0.5) * (width * 0.75);
      const randomY = (Math.random() - 0.5) * (height * 0.65);

      setNoPosition({ x: randomX, y: randomY });
    } else {
      setNoPosition({
        x: (Math.random() - 0.5) * 180,
        y: (Math.random() - 0.5) * 120,
      });
    }
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
    setNoPosition({ x: 0, y: 0 });
    setHasMoved(false);
    setIsAccepted(false);
    setTaunt("");
  };

  // Grow "Yes" button progressively
  const yesScale = Math.min(1.6, 1 + noCount * 0.08);

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
      <div
        ref={containerRef}
        className="relative bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(244,114,182,0.22)] border-2 border-pink-200 text-center min-h-[380px] sm:min-h-[420px] flex flex-col items-center justify-center overflow-hidden"
      >
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
                    ? { rotate: [-5, 5, -5] }
                    : { y: [0, -6, 0] }
                }
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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
              <div className="h-8 mb-6 flex items-center justify-center">
                {taunt ? (
                  <motion.div
                    key={taunt}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs sm:text-sm font-bold shadow-sm"
                  >
                    <span>{taunt}</span>
                  </motion.div>
                ) : (
                  <p className="text-xs sm:text-sm text-pink-500 font-medium">
                    Pilih salah satu tombol di bawah 👇
                  </p>
                )}
              </div>

              {/* Buttons Area */}
              <div className="relative w-full max-w-md min-h-[90px] flex items-center justify-center gap-4 sm:gap-6">
                {/* YES Button (Grows Bigger) */}
                <motion.button
                  whileHover={{ scale: yesScale * 1.05 }}
                  whileTap={{ scale: yesScale * 0.95 }}
                  animate={{ scale: yesScale }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={handleYesClick}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-black text-sm sm:text-base shadow-[0_10px_25px_rgba(244,63,94,0.35)] hover:shadow-[0_15px_30px_rgba(244,63,94,0.5)] transition-shadow duration-300 cursor-pointer flex items-center gap-2 z-10 whitespace-nowrap"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>SAYANG BANGET DONG! 💗</span>
                </motion.button>

                {/* Runaway NO Button */}
                <motion.button
                  animate={
                    hasMoved
                      ? {
                          x: noPosition.x,
                          y: noPosition.y,
                        }
                      : { x: 0, y: 0 }
                  }
                  transition={{ type: "spring", stiffness: 450, damping: 22 }}
                  onMouseEnter={dodgeNoButton}
                  onTouchStart={dodgeNoButton}
                  onClick={dodgeNoButton}
                  className="px-5 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold text-xs sm:text-sm shadow border border-gray-200 cursor-pointer whitespace-nowrap z-20 select-none"
                  style={{
                    position: hasMoved ? "absolute" : "relative",
                  }}
                >
                  Nggak 😜
                </motion.button>
              </div>

              {/* Subtle hint */}
              {noCount > 0 && (
                <p className="mt-6 text-[11px] text-pink-400 font-medium">
                  Usaha klik tombol &lsquo;Nggak&rsquo;: {noCount}x (tetep gabisa wkwk)
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs sm:text-sm border border-pink-200 transition-colors cursor-pointer"
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
