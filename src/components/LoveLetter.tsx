"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart, Sparkles, X } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";
import { playSoundEffect } from "@/utils/soundEffects";

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => {
    playSoundEffect(isOpen ? "pop" : "chime");
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Decorative header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 text-pink-700 text-xs font-semibold mb-3">
          <Mail className="w-3.5 h-3.5 text-pink-500" />
          <span>From My Heart to Yours</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5c2d38] tracking-tight">
          {birthdayData.letter.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-pink-800/70">
          Klik amplop di bawah ini untuk membuka surat rahasia buat kamu 💌
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        {/* The Envelope */}
        <motion.div
          whileHover={!isOpen ? { scale: 1.03 } : {}}
          onClick={!isOpen ? toggleEnvelope : undefined}
          className={`relative w-full max-w-md transition-all duration-500 ${
            !isOpen ? "cursor-pointer" : ""
          }`}
        >
          {/* Closed Envelope Presentation */}
          {!isOpen ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[7/5] w-full bg-gradient-to-br from-pink-300 via-pink-400 to-rose-400 rounded-3xl shadow-[0_20px_50px_rgba(244,114,182,0.35)] p-2 sm:p-3 overflow-hidden flex items-center justify-center border-4 border-white/60"
            >
              {/* Envelope flap folds effect */}
              <div className="absolute inset-0 border-t-[80px] sm:border-t-[110px] border-t-pink-200/90 border-l-[170px] sm:border-l-[220px] border-l-transparent border-r-[170px] sm:border-r-[220px] border-r-transparent top-0" />
              <div className="absolute inset-0 border-b-[90px] sm:border-b-[120px] border-b-pink-400/95 border-l-[170px] sm:border-l-[220px] border-l-transparent border-r-[170px] sm:border-r-[220px] border-r-transparent bottom-0" />

              {/* Heart Wax Seal */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-xl flex flex-col items-center justify-center border-2 border-white/80 group"
              >
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-white group-hover:scale-110 transition-transform" />
                <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider mt-0.5 uppercase">
                  Open
                </span>
              </motion.div>

              {/* Cute prompt */}
              <div className="absolute bottom-4 z-20 text-center">
                <span className="px-3 py-1 rounded-full bg-white/90 text-pink-700 text-xs font-bold shadow-sm">
                  Ketuk untuk membuka 💕
                </span>
              </div>
            </motion.div>
          ) : (
            /* Open Letter View */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full bg-[#fffcf7] rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(244,114,182,0.25)] border-2 border-pink-200/70"
              >
                {/* Decorative vintage paper texture elements */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={toggleEnvelope}
                    className="p-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition-colors cursor-pointer"
                    aria-label="Tutup surat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="polaroid-tape" />

                {/* Cute stamp */}
                <div className="flex items-center justify-between border-b border-pink-100 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🐷</span>
                    <div>
                      <p className="text-xs font-bold text-pink-800 uppercase tracking-widest">
                        Special Delivery
                      </p>
                      <p className="text-[11px] text-pink-500">To the sweetest girl</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 border-2 border-dashed border-pink-300 rounded-lg flex items-center justify-center text-pink-400 text-xs font-bold rotate-6">
                    💌
                  </div>
                </div>

                {/* Letter Body */}
                <div className="space-y-4 text-pink-950 font-normal leading-relaxed">
                  <p className="font-handwriting text-2xl sm:text-3xl text-pink-900 font-bold">
                    {birthdayData.letter.salutation}
                  </p>

                  {birthdayData.letter.paragraphs.map((p, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 * idx + 0.2 }}
                      className="text-sm sm:text-base text-pink-900/90 leading-relaxed"
                    >
                      {p}
                    </motion.p>
                  ))}

                  <div className="pt-6 border-t border-pink-100/80 flex flex-col items-end">
                    <p className="font-handwriting text-2xl sm:text-3xl text-pink-800 whitespace-pre-line text-right">
                      {birthdayData.letter.closing}
                    </p>
                  </div>
                </div>

                {/* Re-fold hint */}
                <div className="mt-8 text-center">
                  <button
                    onClick={toggleEnvelope}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/80 hover:bg-pink-200/80 text-pink-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Lipat kembali surat</span>
                    <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
};
