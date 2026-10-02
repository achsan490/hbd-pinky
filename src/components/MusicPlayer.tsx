"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music, ChevronUp, ChevronDown } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { birthdayData } from "@/config/birthdayData";

export const MusicPlayer: React.FC = () => {
  const {
    isPlaying,
    isMuted,
    volume,
    currentTime,
    duration,
    isSynthesizerFallback,
    togglePlay,
    setVolume,
    toggleMute,
    seek,
  } = useMusic();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 max-w-[260px] sm:max-w-[340px] w-auto">
      <motion.div
        layout
        className="bg-white/95 backdrop-blur-md border border-pink-200/90 rounded-3xl shadow-[0_10px_30px_rgba(244,114,182,0.28)] p-2.5 sm:p-4 text-pink-900 overflow-hidden"
      >
        {/* Header / Compact Bar */}
        <div className="flex items-center justify-between gap-3">
          {/* Dancing Mini Pig & Info */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Pig Avatar that bobs/wiggles when music plays */}
            <motion.div
              animate={
                isPlaying
                  ? {
                      y: [0, -4, 0],
                      rotate: [-4, 4, -4],
                    }
                  : { y: 0, rotate: 0 }
              }
              transition={{
                duration: 0.6,
                repeat: isPlaying ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 flex items-center justify-center text-xl shadow-inner select-none flex-shrink-0"
            >
              🐷
            </motion.div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs sm:text-sm font-bold text-pink-900 truncate">
                  {birthdayData.music.title}
                </p>
                {isSynthesizerFallback && (
                  <span className="px-1.5 py-0.5 text-[10px] bg-pink-100 text-pink-600 rounded-md font-semibold flex-shrink-0">
                    Chime Box
                  </span>
                )}
              </div>
              <p className="text-[11px] text-pink-500 font-medium truncate">
                {isPlaying ? "Playing with love 💕" : "Paused"}
              </p>
            </div>
          </div>

          {/* Controls: Play Button & Expand Toggle */}
          <div className="flex items-center gap-2">
            {/* Animated Equalizer when playing */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-4 px-1">
                {[0.4, 0.8, 0.5, 0.9, 0.6].map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{ height: ["20%", `${h * 100}%`, "30%"] }}
                    transition={{
                      duration: 0.5 + i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-1 bg-pink-500 rounded-full"
                  />
                ))}
              </div>
            )}

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white translate-x-0.5" />
              )}
            </button>

            {/* Expand / Collapse Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-full hover:bg-pink-100/60 text-pink-400 hover:text-pink-600 transition-colors cursor-pointer"
              aria-label="Toggle details"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded View: Progress bar & Volume control */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 pt-3 border-t border-pink-100 flex flex-col gap-2.5 text-xs"
            >
              {/* Progress Slider */}
              <div>
                <div className="flex justify-between text-[10px] text-pink-400 font-semibold mb-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeekChange}
                  className="w-full h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>

              {/* Volume & Details */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-pink-500 hover:text-pink-700 transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>

                <div className="flex items-center gap-1 text-[11px] text-pink-400">
                  <Music className="w-3 h-3 text-pink-400" />
                  <span>{birthdayData.music.artist}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
