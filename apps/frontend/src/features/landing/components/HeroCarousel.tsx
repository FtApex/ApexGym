"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, Sparkles } from 'lucide-react';
import { CarouselBanner } from '@apex/shared';

interface HeroCarouselProps {
  banners?: CarouselBanner[];
  onOpenInquiry?: () => void;
  onSelectMembership?: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ banners = [], onOpenInquiry, onSelectMembership }) => {
  const activeBanners = (banners || []).filter(b => b.status === 'ACTIVE').sort((a, b) => a.order - b.order);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || activeBanners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, activeBanners.length]);

  if (activeBanners.length === 0) return null;

  const currentBanner = activeBanners[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  return (
    <section id="inicio" className="relative w-full h-[88vh] min-h-[600px] max-h-[850px] bg-neutral-950 overflow-hidden flex items-center">
      {/* Background Banner Image with Custom Darkness Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentBanner.imageUrl}
          alt={currentBanner.title}
          className="w-full h-full object-cover object-center transition-all duration-700 scale-105"
        />
        {/* Overlay Dark Shader */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40"
          style={{ opacity: (currentBanner.darkOverlay || 50) / 100 }}
        />
        {/* Accent Brand Glow */}
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-primary-alpha rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-3xl space-y-6">
          
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-alpha border border-brand-primary-alpha text-brand-primary text-xs font-bold tracking-wider uppercase backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
            <span>{currentBanner.subtitle}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] drop-shadow-md">
            {currentBanner.title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl">
            {currentBanner.description}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={currentBanner.buttonUrl || '#membresias'}
              onClick={onSelectMembership}
              className="px-8 py-4 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-extrabold text-sm sm:text-base rounded-2xl shadow-brand-glow hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-3 cursor-pointer"
            >
              <span>{currentBanner.buttonText || 'Ver Membresías'}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </a>

            <button
              onClick={onOpenInquiry}
              className="px-8 py-4 bg-neutral-900/80 hover:bg-neutral-800/90 text-white font-bold text-sm sm:text-base rounded-2xl border border-neutral-700/80 hover:border-neutral-500 backdrop-blur-md transition-all duration-200 cursor-pointer"
            >
              Consultar Sede
            </button>
          </div>

        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-3 bg-neutral-900/80 border border-neutral-800/80 backdrop-blur-md p-2 rounded-2xl">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
          title={isPlaying ? 'Pausar Autoplay' : 'Reanudar Autoplay'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <div className="w-px h-5 bg-neutral-800" />

        <button
          onClick={handlePrev}
          className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold text-neutral-300 px-2">
          0{currentIndex + 1} / 0{activeBanners.length}
        </span>

        <button
          onClick={handleNext}
          className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination Indicators Bar */}
      <div className="absolute bottom-8 left-8 z-20 flex items-center gap-2">
        {activeBanners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'w-8 bg-brand-primary shadow-brand-glow' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
