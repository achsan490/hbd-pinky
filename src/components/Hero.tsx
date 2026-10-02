"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Soft gradient lighting behind hero */}
      <div className="absolute top-1/4 w-80 h-80 sm:w-[480px] sm:h-[480px] bg-pink-200/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Cute top pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200/80 text-pink-600 text-xs sm:text-sm font-semibold shadow-sm mb-5 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: "6s" }} />
          <span>{birthdayData.hero.badge}</span>
          <span className="text-pink-400">•</span>
          <span className="font-bold">{birthdayData.nickname}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black text-[#5c2d38] tracking-tight leading-tight mb-3"
        >
          {birthdayData.hero.greeting}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600">
            {birthdayData.recipientName}
          </span>{" "}
          <span className="inline-block animate-pig-wiggle">🐷💕</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-pink-900/80 font-medium max-w-lg mb-8"
        >
          {birthdayData.hero.subtext}
        </motion.p>

        {/* Polaroid Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative group cursor-pointer"
        >
          {/* Decorative washi tape */}
          <div className="polaroid-tape" />

          {/* Polaroid container */}
          <div className="bg-white p-3 sm:p-4 pb-8 sm:pb-10 rounded-2xl shadow-[0_15px_35px_rgba(244,114,182,0.22)] border border-pink-100 transition-all duration-300 w-[270px] sm:w-[320px]">
            {/* Photo frame */}
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-pink-50 border border-pink-100/80">
              <Image
                src={birthdayData.hero.photo}
                alt="Birthday Girl"
                fill
                sizes="(max-width: 768px) 270px, 320px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />

              {/* Little corner shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-white/20 pointer-events-none" />
            </div>

            {/* Polaroid handwritten caption */}
            <div className="mt-4 flex flex-col items-center">
              <p className="font-handwriting text-2xl text-pink-900 leading-none">
                {birthdayData.hero.photoCaption}
              </p>
              <div className="flex items-center gap-1 text-xs text-pink-400 mt-1 font-semibold">
                <Heart className="w-3 h-3 fill-pink-400" />
                <span>Our Special Day</span>
                <Heart className="w-3 h-3 fill-pink-400" />
              </div>
            </div>
          </div>

          {/* Decorative Stickers on the Polaroid */}
          {/* Sticker Babi Kecil */}
          <motion.div
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-4 w-12 h-12 bg-white/95 rounded-full p-1 shadow-md border-2 border-pink-200 flex items-center justify-center text-xl select-none"
          >
            🐷
          </motion.div>

          {/* Heart Sticker */}
          <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white select-none">
            <Heart className="w-5 h-5 fill-white" />
          </div>

          {/* Sparkle sticker */}
          <div className="absolute top-1/2 -left-4 text-xl animate-bounce">
            ✨
          </div>
        </motion.div>

        {/* Scroll down prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 flex flex-col items-center text-xs font-semibold text-pink-500/80 gap-1.5"
        >
          <span>Scroll untuk melihat kejutan berikutnya</span>
          <span className="text-sm animate-bounce">👇</span>
        </motion.div>
      </div>
    </section>
  );
};
