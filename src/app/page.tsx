"use client";

import React, { useState } from "react";
import { BirthdayOpening } from "@/components/BirthdayOpening";
import { Hero } from "@/components/Hero";
import { FloatingHearts } from "@/components/FloatingHearts";
import { FloatingNav } from "@/components/FloatingNav";
import { Memories } from "@/components/Memories";
import { VideoMoment } from "@/components/VideoMoment";
import { LoveLetter } from "@/components/LoveLetter";
import { BirthdayCake } from "@/components/BirthdayCake";
import { MiniGame } from "@/components/MiniGame";
import { RunawayGame } from "@/components/RunawayGame";
import { Timeline } from "@/components/Timeline";
import { FinalSurprise } from "@/components/FinalSurprise";
import { InteractivePig } from "@/components/InteractivePig";
import { MusicPlayer } from "@/components/MusicPlayer";
import { birthdayData } from "@/config/birthdayData";
import { Heart } from "lucide-react";

export default function Home() {
  const [isSurpriseOpened, setIsSurpriseOpened] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#fff5f7] overflow-x-hidden">
      {/* Background Floating Hearts & sparkles */}
      <FloatingHearts />

      {/* Opening Surprise Card (full screen until opened) */}
      {!isSurpriseOpened ? (
        <BirthdayOpening onOpen={() => setIsSurpriseOpened(true)} />
      ) : (
        <div className="relative z-10 animate-fade-in">
          {/* Floating Navigation & Scroll Progress */}
          <FloatingNav />

          {/* Persistent Floating Controls */}
          <MusicPlayer />
          <InteractivePig />

          {/* Content Sections */}
          <Hero />
          <Memories />
          <VideoMoment />
          <LoveLetter />
          <BirthdayCake />
          <MiniGame />
          <RunawayGame />
          <Timeline />
          <FinalSurprise />

          {/* Footer */}
          <footer className="relative py-12 text-center text-xs text-pink-500 font-semibold border-t border-pink-100/80 bg-white/40 backdrop-blur-sm mt-10">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span>Made with all my love for</span>
              <span className="font-bold text-pink-700">{birthdayData.recipientName}</span>
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            </div>
            <p className="text-pink-400">
              🐷 Selamanya &amp; Selalu Bersamamu 💕
            </p>
          </footer>
        </div>
      )}
    </main>
  );
}
