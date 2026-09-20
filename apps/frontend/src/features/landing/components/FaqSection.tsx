"use client";

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import { FaqItem } from '@/shared/types';

interface FaqSectionProps {
  faqs?: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs = [] }) => {
  const [openId, setOpenId] = useState<string | null>((faqs && faqs[0])?.id || null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = (faqs || []).filter(f => 
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Resolvemos tus Dudas</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Preguntas Frecuentes
          </h2>
          
          {/* Search bar */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Buscar en preguntas frecuentes (ej. congelamiento, pases, inbody)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-800 focus:border-rose-500 rounded-2xl text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-white hover:text-rose-400 flex items-center justify-between gap-4 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 text-rose-400 text-[10px] uppercase font-bold">
                      {faq.category}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-rose-400' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
