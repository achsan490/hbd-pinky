"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { birthdayData } from "@/config/birthdayData";
import { musicBox } from "@/utils/audioSynthesizer";

interface MusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isSynthesizerFallback: boolean;
  startMusic: () => void;
  togglePlay: () => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  seek: (val: number) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.7);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(120);
  const [isSynthesizerFallback, setIsSynthesizerFallback] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userInteractedRef = useRef<boolean>(false);

  useEffect(() => {
    const audio = new Audio();
    audio.src = birthdayData.music.src;
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = volume;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onError = () => {
      // If MP3 file doesn't exist yet, seamlessly fallback to cute synthesizer
      setIsSynthesizerFallback(true);
      if (userInteractedRef.current && isPlaying) {
        musicBox.play();
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("error", onError);
      audio.pause();
      musicBox.pause();
    };
  }, []);

  // Update volume
  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : clamped;
    }
    musicBox.setVolume(isMuted ? 0 : clamped);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
    musicBox.setVolume(nextMuted ? 0 : volume);
  };

  const startMusic = () => {
    userInteractedRef.current = true;
    if (audioRef.current && !isSynthesizerFallback) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay policy or 404
          setIsSynthesizerFallback(true);
          musicBox.play();
          setIsPlaying(true);
        });
    } else {
      musicBox.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!userInteractedRef.current) {
      startMusic();
      return;
    }

    if (isPlaying) {
      if (audioRef.current && !isSynthesizerFallback) {
        audioRef.current.pause();
      }
      musicBox.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current && !isSynthesizerFallback) {
        audioRef.current.play().catch(() => {
          musicBox.play();
        });
      } else {
        musicBox.play();
      }
      setIsPlaying(true);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current && !isSynthesizerFallback) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        currentTime,
        duration,
        isSynthesizerFallback,
        startMusic,
        togglePlay,
        setVolume,
        toggleMute,
        seek,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return context;
};
