"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectSliderProps {
  images: string[];
  title: string;
  aspectRatio?: "video" | "square" | "cover";
}

export default function ProjectSlider({ 
  images, 
  title, 
  aspectRatio = "video" 
}: ProjectSliderProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  if (images.length === 0) return null;

  const ratioClass = {
    video: "aspect-video",
    square: "aspect-square",
    cover: "h-64 md:h-96",
  }[aspectRatio];

  return (
    <div className={`relative w-full ${ratioClass} group/slider overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-inner bg-[#0F172A]`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={`${title} highlight ${index + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1200px) 100vw, 80vw"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/40 via-transparent to-transparent opacity-60 pointer-events-none" />

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); paginate(-1); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0F172A]/70 text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-[#22C55E] hover:text-[#0F172A] z-20 backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); paginate(1); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0F172A]/70 text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-[#22C55E] hover:text-[#0F172A] z-20 backdrop-blur-sm"
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIndex(i); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? "bg-[#22C55E] w-6" : "bg-white/30 hover:bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
