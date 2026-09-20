"use client";

import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight, Phone } from 'lucide-react';
import { GymBranch } from '@/shared/types';

interface FloatingWhatsAppProps {
  branches?: GymBranch[];
  company?: any;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ branches = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChat = (phone: string, branchName: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(`¡Hola ApexGym! Quisiera información sobre la ${branchName}.`);
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Expanded Popup Menu */}
      {isOpen && (
        <div className="mb-4 w-80 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="bg-brand-primary p-4 text-brand-primary-contrast flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-md">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Asistencia WhatsApp</h4>
                <p className="text-xs opacity-90">Respuesta rápida en minutos</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
            <p className="text-xs text-neutral-400 px-2 py-1">Selecciona tu sede preferida:</p>
            {branches.map((b) => (
              <button
                key={b.id}
                onClick={() => handleOpenChat(b.whatsapp, b.name)}
                className="w-full text-left p-3 rounded-xl bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700/50 hover:border-brand-primary-alpha transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="font-semibold text-sm text-neutral-100 group-hover:text-brand-primary transition-colors">
                    {b.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                    <Phone className="w-3 h-3 text-brand-primary" />
                    <span>{b.whatsapp}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>

          <div className="p-3 bg-neutral-950/80 border-t border-neutral-800 text-center">
            <span className="text-[11px] text-neutral-500">
              Horario de atención: Lun-Dom 6:00am - 10:00pm
            </span>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center p-4 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast rounded-full shadow-brand-glow hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-primary border-2 border-neutral-900"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-white/20 stroke-[2.2]" />
      </button>
    </div>
  );
};
