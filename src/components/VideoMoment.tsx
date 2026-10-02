"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, Film, Sparkles, Heart } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";
import { playSoundEffect } from "@/utils/soundEffects";

export const VideoMoment: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideo = () => {
    playSoundEffect("pop");
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setHasError(true);
      });
    }
  };

  return (
    <section id="video" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Decorative background blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 text-pink-700 text-xs font-semibold mb-3">
          <Film className="w-3.5 h-3.5 text-pink-500" />
          <span>Special Video Clip</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5c2d38] tracking-tight">
          {birthdayData.video.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-pink-800/70 max-w-md mx-auto">
          {birthdayData.video.subtitle}
        </p>
      </div>

      {/* Video Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-white p-4 sm:p-6 rounded-3xl shadow-[0_20px_45px_rgba(244,114,182,0.22)] border-2 border-pink-200/80"
      >
        {/* Cute decorative ear-like tags on top corners */}
        <div className="absolute -top-3.5 left-8 px-3 py-0.5 rounded-full bg-pink-500 text-white text-[11px] font-bold shadow-sm flex items-center gap-1">
          <Heart className="w-3 h-3 fill-white" /> Cinema of Us
        </div>
        <div className="absolute -top-3.5 right-8 text-xl select-none animate-wiggle">
          🐷
        </div>

        {/* Video Frame */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-pink-950 via-rose-900 to-pink-900 shadow-inner group">
          {!hasError ? (
            <video
              ref={videoRef}
              src={birthdayData.video.src}
              poster={birthdayData.video.poster}
              playsInline
              onError={() => setHasError(true)}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />
          ) : (
            /* Fallback when video file is not yet placed in /public/videos/moment.mp4 */
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500">
              <div className="relative w-20 h-20 mb-3 rounded-full overflow-hidden border-2 border-white/60 shadow-lg">
                <Image
                  src="/pig/pig.png"
                  alt="Cute Pig"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-bold text-base sm:text-lg">
                Tempat Video Spesial Kamu 🎬💕
              </p>
              <p className="text-xs text-white/90 max-w-sm mt-1">
                Ganti file video kenanganmu di: <br />
                <code className="bg-white/20 px-2 py-0.5 rounded mt-1 inline-block text-[11px] font-mono">
                  /public/videos/moment.mp4
                </code>
              </p>
            </div>
          )}

          {/* Custom Play/Pause Overlay Button */}
          {!hasError && (
            <div
              onClick={toggleVideo}
              className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                isPlaying ? "bg-black/10 hover:bg-black/30" : "bg-black/35"
              }`}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                  isPlaying
                    ? "bg-white/40 text-white opacity-0 group-hover:opacity-100"
                    : "bg-pink-500 text-white shadow-xl opacity-100 scale-100"
                }`}
                aria-label={isPlaying ? "Jeda video" : "Putar video"}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-white" />
                ) : (
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                )}
              </motion.button>
            </div>
          )}
        </div>

        {/* Video Caption Note */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
          <p className="font-handwriting text-xl sm:text-2xl text-pink-900 text-center sm:text-left">
            &ldquo;{birthdayData.video.caption}&rdquo;
          </p>
          <div className="flex items-center gap-1.5 text-xs text-pink-500 font-semibold flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Forever Memory</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
