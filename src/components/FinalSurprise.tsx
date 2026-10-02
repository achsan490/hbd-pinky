"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Eye } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";
import { playSoundEffect } from "@/utils/soundEffects";

export const FinalSurprise: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [answeredForever, setAnsweredForever] = useState(false);

  const handleClickMe = () => {
    playSoundEffect("chime");
    setIsOpen(true);

    try {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ec4899", "#f43f5e", "#fda4af", "#ffd700", "#ffffff"],
      });
    } catch {}
  };

  const handleForeverChoice = (choice: string) => {
    playSoundEffect("celebrate");
    setAnsweredForever(true);

    // Multi-angle grand confetti explosion
    try {
      const end = Date.now() + 2.5 * 1000;
      const colors = ["#ec4899", "#fb7185", "#ff69b4", "#f43f5e", "#ffd700"];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {}
  };

  return (
    <section id="final-surprise" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Background Dark Pink Romantic Transition */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 bg-gradient-to-b from-pink-900 via-[#451423] to-[#2d0915] pointer-events-none z-30"
          />
        )}
      </AnimatePresence>

      <div className="relative z-40 text-center">
        {!isOpen ? (
          /* Teaser View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-3">
              <Eye className="w-3.5 h-3.5 text-pink-500" />
              <span>One Last Thing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5c2d38] tracking-tight mb-2">
              {birthdayData.finalSurprise.teaserTitle}
            </h2>
            <p className="text-sm sm:text-base text-pink-800/80 mb-8 max-w-md">
              Ada satu pertanyaan dan pesan terakhir yang mau aku sampaikan buat kamu...
            </p>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClickMe}
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-black text-lg tracking-wider shadow-[0_15px_35px_rgba(244,63,94,0.4)] hover:shadow-[0_20px_45px_rgba(244,63,94,0.55)] transition-all cursor-pointer flex items-center gap-2 group overflow-hidden"
            >
              <Sparkles className="w-5 h-5 text-yellow-200 group-hover:rotate-45 transition-transform" />
              <span>{birthdayData.finalSurprise.buttonText}</span>
              <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
            </motion.button>
          </motion.div>
        ) : (
          /* Romantic Grand Reveal */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-pink-400/30 text-white shadow-2xl flex flex-col items-center"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-pink-300 shadow-xl mb-6 bg-pink-200">
              <Image
                src="/pig/pig.png"
                alt="Love Pig"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-pink-200 tracking-tight mb-3">
              Happy Birthday, {birthdayData.recipientName} 💗
            </h3>

            <p className="text-base sm:text-xl text-pink-100 font-medium leading-relaxed mb-1">
              {birthdayData.finalSurprise.subheadline1}
            </p>
            <p className="text-base sm:text-xl text-pink-200 font-medium leading-relaxed mb-8">
              {birthdayData.finalSurprise.subheadline2}
            </p>

            {/* Question & Choices */}
            {!answeredForever ? (
              <div className="w-full pt-6 border-t border-pink-400/30 flex flex-col items-center">
                <p className="font-handwriting text-3xl sm:text-4xl text-pink-300 font-bold mb-6">
                  🐷 &ldquo;{birthdayData.finalSurprise.question}&rdquo;
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleForeverChoice("YES")}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-pink-500/50 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>{birthdayData.finalSurprise.option1}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleForeverChoice("OF COURSE")}
                    className="px-7 py-3 rounded-full bg-white text-pink-700 font-extrabold text-sm sm:text-base shadow-lg hover:bg-pink-50 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>{birthdayData.finalSurprise.option2}</span>
                  </motion.button>
                </div>
              </div>
            ) : (
              /* Grand Yay Celebration */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full pt-6 border-t border-pink-400/30 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-pink-100 mb-3"
                >
                  {birthdayData.finalSurprise.celebrationText}
                </motion.div>
                <p className="font-handwriting text-2xl sm:text-3xl text-pink-200 mt-2">
                  Janji kita bakal selalu saling jaga dan bahagia sama-sama yaa! 🐷❤️
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
