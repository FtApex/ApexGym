"use client";

import React, { useState } from 'react';
import { Shield, Target, Eye, HeartHandshake, Play, X, Sparkles, Award } from 'lucide-react';
import { Trainer } from '@/shared/types';

interface AboutSectionProps {
  trainers?: Trainer[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ trainers = [] }) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const values = [
    { title: 'Excelencia Biomecánica', desc: 'Máquinas de vanguardia diseñadas para prevenir lesiones y maximizar hipertrofia.', icon: <Award className="w-5 h-5 text-brand-primary" /> },
    { title: 'Comunidad Motivadora', desc: 'Ambiente inclusivo y disciplinado donde cada logro individual se celebra en equipo.', icon: <HeartHandshake className="w-5 h-5 text-brand-primary" /> },
    { title: 'Tecnología & Datos', desc: 'Monitoreo inBody, app móvil personalizada y control de acceso biométrico.', icon: <Sparkles className="w-5 h-5 text-brand-primary" /> }
  ];

  return (
    <section id="nosotros" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Story & Video Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-alpha border border-brand-primary-alpha text-brand-primary text-xs font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4 text-brand-primary" />
              <span>Nuestra Historia & Propósito</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Reinventando la Experiencia Fitness en el Perú desde 2018
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              En ApexGym nacimos con la convicción de que el entrenamiento no debe ser un sacrificio monótono, sino una experiencia inspiradora apoyada por tecnología de punta, coaches apasionados e instalaciones premium.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800">
                <Target className="w-6 h-6 text-brand-primary mb-2" />
                <h4 className="font-bold text-sm text-white">Misión</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Empoderar a miles de personas a alcanzar su máxima versión física y mental mediante entrenamiento inteligente.
                </p>
              </div>

              <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800">
                <Eye className="w-6 h-6 text-brand-primary mb-2" />
                <h4 className="font-bold text-sm text-white">Visión</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Ser la red de centros deportivos tecnológicos de mayor prestigio e impacto positivo en Latinoamérica.
                </p>
              </div>
            </div>
          </div>

          {/* Video Placeholder Box */}
          <div className="lg:col-span-6">
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000"
                alt="ApexGym Tour Video"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 transition-colors" />

              {/* Play Button */}
              <button
                onClick={() => setShowVideoModal(true)}
                className="absolute inset-0 m-auto w-20 h-20 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast rounded-full flex items-center justify-center shadow-brand-glow hover:scale-110 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-8 h-8 fill-current translate-x-0.5 stroke-none" />
              </button>

              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-white">
                Ver Video Institucional 2026 (2:15 min)
              </div>
            </div>
          </div>

        </div>

        {/* Core Values */}
        <div>
          <h3 className="text-2xl font-black text-white text-center mb-8">
            Nuestros Valores Fundamentales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-3xl">
                <div className="p-3 bg-neutral-800 w-fit rounded-2xl mb-4">
                  {v.icon}
                </div>
                <h4 className="font-bold text-lg text-white mb-2">{v.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-3xl font-black text-white mb-2">
              Nuestro Equipo de Head Coaches
            </h3>
            <p className="text-xs text-neutral-400">
              Profesionales de alto rendimiento comprometidos con tu progreso diario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(trainers || []).map((t) => (
              <div key={t.id} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex flex-col items-center text-center">
                <img src={t.photoUrl} alt={t.fullName} className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-brand-primary-alpha shadow-lg" />
                <h4 className="font-extrabold text-base text-white">{t.fullName}</h4>
                <span className="text-xs text-brand-primary font-semibold mb-2">{t.specialty}</span>
                <p className="text-xs text-neutral-400 mb-4">{t.bio}</p>
                <div className="text-[11px] text-neutral-500 font-mono bg-neutral-950 px-3 py-1 rounded-xl">
                  {t.schedule}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-4">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white bg-neutral-900 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center text-center p-8">
              <div className="space-y-4">
                <Play className="w-16 h-16 text-brand-primary mx-auto animate-pulse" />
                <h4 className="text-xl font-bold text-white">Video Promocional ApexGym 2026</h4>
                <p className="text-xs text-neutral-400">Simulación de Video Institucional en Alta Definición</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
