"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Heart } from "lucide-react";
import { birthdayData, TimelineItem } from "@/config/birthdayData";

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 text-pink-700 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5 text-pink-500" />
          <span>Our Love Journey</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5c2d38] tracking-tight">
          Our Little Story 📖
        </h2>
        <p className="mt-2 text-sm sm:text-base text-pink-800/70 max-w-md mx-auto">
          Setiap babak cerita kita yang manis, tawa, dan kenangan yang selalu kuingat.
        </p>
      </div>

      {/* Scrapbook Timeline Line */}
      <div className="relative">
        {/* Central Connecting Ribbon */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-1 bg-gradient-to-b from-pink-300 via-rose-300 to-pink-400 rounded-full dashed opacity-70" />

        <div className="space-y-12 sm:space-y-14">
          {birthdayData.timeline.map((item: TimelineItem, index: number) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? "sm:flex-row-reverse" : ""
                } gap-6 sm:gap-10 pl-14 sm:pl-0`}
              >
                {/* Center Badge / Emoji Node */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white border-2 border-pink-300 shadow-md flex items-center justify-center text-xl z-10">
                  <span>{item.emoji}</span>
                </div>

                {/* Content Card (Scrapbook Diary Entry) */}
                <div
                  className={`w-full sm:w-1/2 ${
                    isEven ? "sm:text-right" : "sm:text-left"
                  }`}
                >
                  <div
                    className={`inline-block w-full bg-white p-5 sm:p-6 rounded-3xl shadow-[0_10px_30px_rgba(244,114,182,0.16)] border border-pink-100 hover:shadow-lg transition-all duration-300 relative group`}
                  >
                    {/* Washi tape sticker */}
                    <div
                      className={`absolute -top-3 ${
                        isEven ? "sm:right-8 left-8" : "left-8"
                      } w-20 h-5 bg-pink-100/90 border-l border-r border-pink-300/40 shadow-sm rotate-1`}
                    />

                    {/* Tag & Date */}
                    <div
                      className={`flex items-center gap-2 mb-2 ${
                        isEven ? "sm:justify-end" : "justify-start"
                      }`}
                    >
                      <span className="px-2.5 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-pink-600 text-[11px] font-bold">
                        {item.badge}
                      </span>
                      <span className="text-xs text-pink-400 font-semibold">
                        {item.date}
                      </span>
                    </div>

                    {/* Milestone Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-pink-900 group-hover:text-pink-600 transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="font-handwriting text-xl sm:text-2xl text-pink-800/90 mt-2 leading-snug">
                      &ldquo;{item.description}&rdquo;
                    </p>

                    <div
                      className={`mt-3 pt-2 border-t border-pink-50 flex items-center gap-1 text-[11px] text-pink-400 ${
                        isEven ? "sm:justify-end" : "justify-start"
                      }`}
                    >
                      <Heart className="w-3 h-3 fill-pink-300 text-pink-300" />
                      <span>Sweet Chapter {item.phase}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
