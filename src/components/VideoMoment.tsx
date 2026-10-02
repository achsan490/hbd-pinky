"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Film,
  Sparkles,
  Heart,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
} from "lucide-react";
import { birthdayData } from "@/config/birthdayData";
import { useMusic } from "@/context/MusicContext";

export const VideoMoment: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showMuteNotice, setShowMuteNotice] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null);
  const wasMusicPlayingRef = useRef<boolean>(false);

  const { isPlaying: isBgmPlaying, pauseMusic, resumeMusic } = useMusic();

  // Reset controls hide timer
  const triggerControls = () => {
    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    if (isPlaying) {
      hideControlsTimer.current = setTimeout(() => {
        setShowControls(false);
      }, 3500);
    }
  };

  useEffect(() => {
    return () => {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    };
  }, []);

  const handlePlay = async () => {
    if (!videoRef.current) return;

    try {
      // Pause background music if it was playing
      if (isBgmPlaying) {
        wasMusicPlayingRef.current = true;
        pauseMusic();
      }

      await videoRef.current.play();
      setIsPlaying(true);
      triggerControls();
    } catch (err) {
      console.warn("Standard play failed, attempting muted playback for mobile:", err);
      // Fallback for mobile browsers blocking unmuted play
      try {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          await videoRef.current.play();
          setIsPlaying(true);
          setShowMuteNotice(true);
          triggerControls();
        }
      } catch (err2) {
        console.error("Video playback failed completely:", err2);
      }
    }
  };

  const handlePause = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
    setShowControls(true);
    if (wasMusicPlayingRef.current) {
      resumeMusic();
      wasMusicPlayingRef.current = false;
    }
  };

  const toggleVideo = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      setShowMuteNotice(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleRetry = () => {
    setHasError(false);
    if (videoRef.current) {
      videoRef.current.load();
      handlePlay();
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
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
        className="relative bg-white p-3 sm:p-6 rounded-3xl shadow-[0_20px_45px_rgba(244,114,182,0.22)] border-2 border-pink-200/80"
      >
        {/* Cute decorative ear-like tags on top corners */}
        <div className="absolute -top-3.5 left-6 sm:left-8 px-3 py-0.5 rounded-full bg-pink-500 text-white text-[11px] font-bold shadow-sm flex items-center gap-1">
          <Heart className="w-3 h-3 fill-white" /> Cinema of Us
        </div>
        <div className="absolute -top-3.5 right-6 sm:right-8 text-xl select-none animate-wiggle">
          🐷
        </div>

        {/* Video Frame */}
        <div
          ref={containerRef}
          onClick={triggerControls}
          className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner group select-none flex items-center justify-center"
        >
          {!hasError ? (
            <>
              <video
                ref={videoRef}
                src={birthdayData.video.src}
                poster={birthdayData.video.poster}
                playsInline
                preload="metadata"
                controlsList="nodownload"
                onError={() => setHasError(true)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                  setIsPlaying(false);
                  setShowControls(true);
                  if (wasMusicPlayingRef.current) {
                    resumeMusic();
                    wasMusicPlayingRef.current = false;
                  }
                }}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="w-full h-full object-contain"
              />

              {/* Mute Notice Pill on Mobile */}
              <AnimatePresence>
                {showMuteNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={toggleMute}
                    className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-lg border border-white/20 active:scale-95 transition-transform"
                  >
                    <VolumeX className="w-3.5 h-3.5 text-pink-400" />
                    <span>Suara dimatikan • Ketuk untuk bunyikan 🔊</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Big Center Play/Pause Overlay Button */}
              {(!isPlaying || showControls) && (
                <div
                  onClick={toggleVideo}
                  className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                    isPlaying ? "bg-black/20" : "bg-black/40"
                  }`}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-300 ${
                      isPlaying
                        ? "bg-white/40 text-white hover:bg-white/60"
                        : "bg-pink-500 text-white shadow-pink-500/50 scale-100"
                    }`}
                    aria-label={isPlaying ? "Jeda video" : "Putar video"}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
                    ) : (
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
                    )}
                  </motion.button>
                </div>
              )}

              {/* Sleek Bottom Control Bar */}
              <div
                className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 flex flex-col gap-2 transition-opacity duration-300 z-20 ${
                  showControls || !isPlaying ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Progress Slider Bar */}
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:accent-pink-400 transition-all"
                  aria-label="Video timeline seek"
                />

                {/* Control Actions Row */}
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleVideo}
                      className="p-1 hover:text-pink-300 transition-colors cursor-pointer"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-1 hover:text-pink-300 transition-colors cursor-pointer"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-pink-400" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    <span className="font-mono text-[11px] text-white/80">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleFullscreen}
                      className="p-1 hover:text-pink-300 transition-colors cursor-pointer"
                      aria-label="Fullscreen"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Fallback when video file fails to load */
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
                Video Kenangan Spesial 🎬💕
              </p>
              <p className="text-xs text-white/90 max-w-sm mt-1 mb-4">
                Video belum termuat atau koneksi terputus.
              </p>
              <button
                onClick={handleRetry}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-pink-600 font-bold text-xs shadow-md hover:bg-pink-50 active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Coba Putar Lagi</span>
              </button>
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
