"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, ZoomIn } from "lucide-react";
import { birthdayData, MemoryPhoto } from "@/config/birthdayData";
import { playSoundEffect } from "@/utils/soundEffects";

export const Memories: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    playSoundEffect("pop");
    setSelectedPhotoIndex(index);
  };

  const closeModal = () => {
    setSelectedPhotoIndex(null);
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    playSoundEffect("pop");
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % birthdayData.memories.length);
  };

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    playSoundEffect("pop");
    setSelectedPhotoIndex(
      (selectedPhotoIndex - 1 + birthdayData.memories.length) % birthdayData.memories.length
    );
  };

  const activePhoto = selectedPhotoIndex !== null ? birthdayData.memories[selectedPhotoIndex] : null;

  return (
    <section id="memories" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 text-pink-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3 h-3 text-pink-500" />
          <span>Our Journey in Pictures</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5c2d38] tracking-tight">
          Little Memories 💗
        </h2>
        <p className="mt-2 text-sm sm:text-base text-pink-800/70 max-w-md mx-auto">
          Setiap senyuman, setiap tawa, dan setiap cerita berharga yang kita ukir berdua.
        </p>
      </div>

      {/* Scrapbook / Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-center justify-items-center">
        {birthdayData.memories.map((photo: MemoryPhoto, index: number) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
            onClick={() => openModal(index)}
            className={`relative group cursor-pointer bg-white p-3.5 pb-6 rounded-2xl shadow-[0_10px_25px_rgba(244,114,182,0.18)] border border-pink-100 w-full max-w-[310px] transition-all duration-300 ${
              photo.rotation || "rotate-0"
            }`}
          >
            {/* Cute taped corner */}
            <div className="polaroid-tape" />

            {/* Photo Container */}
            <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-pink-50 border border-pink-50">
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-full bg-white/90 text-pink-600 font-bold text-xs shadow-md flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5" /> Lihat Cerita
                </span>
              </div>

              {/* Badge */}
              {photo.tag && (
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 text-[10px] font-bold text-pink-600 shadow-sm border border-pink-100">
                  {photo.tag}
                </div>
              )}
            </div>

            {/* Polaroid note underneath */}
            <div className="mt-3.5 px-1 text-center">
              <h3 className="font-bold text-pink-900 text-sm group-hover:text-pink-600 transition-colors">
                {photo.title}
              </h3>
              <p className="font-handwriting text-lg text-pink-700/90 mt-0.5 line-clamp-1">
                {photo.caption}
              </p>
              <div className="flex items-center justify-center gap-1 text-[11px] text-pink-400 font-medium mt-1">
                <span>{photo.date}</span>
                <span>•</span>
                <Heart className="w-2.5 h-2.5 fill-pink-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Interactive Modal */}
      <AnimatePresence>
        {activePhoto && selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-pink-100 p-4 sm:p-6"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 rounded-full bg-pink-50 border border-pink-200 text-pink-600 flex items-center justify-center hover:bg-pink-100 transition-colors cursor-pointer"
                aria-label="Tutup foto"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image Frame */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-pink-50 border border-pink-100 shadow-inner">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Caption and story */}
              <div className="mt-4 text-center px-2">
                <span className="inline-block px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-bold mb-1.5 border border-pink-100">
                  {activePhoto.date}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-pink-950">
                  {activePhoto.title}
                </h3>
                <p className="font-handwriting text-xl sm:text-2xl text-pink-800 mt-2 max-w-md mx-auto leading-relaxed">
                  &ldquo;{activePhoto.caption}&rdquo;
                </p>
              </div>

              {/* Next and Prev Navigation */}
              <div className="mt-5 flex items-center justify-between pt-2 border-t border-pink-100">
                <button
                  onClick={handlePrev}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Foto Sebelumnya</span>
                </button>

                <span className="text-xs font-bold text-pink-400">
                  {selectedPhotoIndex + 1} / {birthdayData.memories.length}
                </span>

                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>Foto Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
