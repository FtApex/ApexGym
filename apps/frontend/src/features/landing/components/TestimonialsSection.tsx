"use client";

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { Testimonial } from '@/shared/types';

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const list = testimonials || [];
  if (list.length === 0) return null;

  const current = list[currentIndex] || list[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % list.length);
  };

  return (
    <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-alpha border border-brand-primary-alpha text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span>Historias de Éxito Real</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Lo que Dicen Nuestros Socios
          </h2>
        </div>

        {/* Testimonial Card Slider */}
        <div className="max-w-4xl mx-auto bg-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
          <Quote className="w-16 h-16 text-brand-primary opacity-20 absolute top-8 left-8" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <img
              src={current.photoUrl}
              alt={current.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-2 border-brand-primary-alpha shadow-xl shrink-0"
            />

            <div className="space-y-4 text-center md:text-left">
              {/* Star Rating */}
              <div className="flex items-center justify-center md:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < current.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-700'}`}
                  />
                ))}
              </div>

              <p className="text-base sm:text-lg text-neutral-200 italic leading-relaxed">
                "{current.comment}"
              </p>

              <div>
                <h4 className="font-extrabold text-white text-lg">{current.name}</h4>
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-neutral-400 mt-0.5">
                  <span className="text-brand-primary font-semibold">{current.role}</span>
                  <span>•</span>
                  <span>{current.branch}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-end gap-3 pt-6 mt-8 border-t border-neutral-800">
            <button
              onClick={handlePrev}
              className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl border border-neutral-800 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-neutral-400">
              0{currentIndex + 1} / 0{list.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl border border-neutral-800 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
