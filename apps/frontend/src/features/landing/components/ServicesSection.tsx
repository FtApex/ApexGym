"use client";

import React, { useState } from 'react';
import { 
  Dumbbell, 
  Activity, 
  Flame, 
  HeartHandshake, 
  Zap, 
  Shield, 
  UserCheck, 
  Apple, 
  Sparkles,
  ArrowRight,
  X,
  CheckCircle
} from 'lucide-react';
import { GymService } from '@apex/shared';

interface ServicesSectionProps {
  services?: GymService[];
  onOpenInquiry?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services = [], onOpenInquiry }) => {
  const [selectedService, setSelectedService] = useState<GymService | null>(null);

  // Map icon strings to Lucide components
  const getIconComponent = (name: string) => {
    switch (name) {
      case 'Dumbbell': return <Dumbbell className="w-6 h-6" />;
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'Flame': return <Flame className="w-6 h-6" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Shield': return <Shield className="w-6 h-6" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6" />;
      case 'Apple': return <Apple className="w-6 h-6" />;
      default: return <Dumbbell className="w-6 h-6" />;
    }
  };

  return (
    <section id="servicios" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-alpha border border-brand-primary-alpha text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span>Infraestructura & Disciplinas</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Servicios Diseñados para Elevar tu Rendimiento
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Desde zonas de musculación biomecánica hasta estudios inmersivos de spinning y nutrición personalizada InBody.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group relative bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-brand-primary-alpha rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Image Preview Overlay on Hover */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 bg-neutral-800 group-hover:bg-brand-primary text-brand-primary group-hover:text-brand-primary-contrast rounded-2xl transition-colors shadow-md">
                    {getIconComponent(service.iconName)}
                  </div>
                  {service.featured && (
                    <span className="px-2.5 py-1 bg-brand-primary-alpha border border-brand-primary-alpha text-brand-primary text-[10px] font-extrabold uppercase rounded-full">
                      Destacado
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-brand-primary pt-4 border-t border-neutral-800/80">
                <span>Ver detalles y horarios</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-white">
            
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white bg-black/50 hover:bg-black rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-56 relative">
              <img src={selectedService.imageUrl} alt={selectedService.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <div className="p-3 bg-brand-primary text-brand-primary-contrast rounded-2xl shadow-brand-glow">
                  {getIconComponent(selectedService.iconName)}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{selectedService.title}</h3>
                  <span className="text-xs text-brand-primary font-semibold">Incluido en Membresías Apex</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <p className="text-sm text-neutral-300 leading-relaxed">
                {selectedService.description} Nuestras instalaciones cuentan con supervisión constante de entrenadores certificados, aire climatizado y mantenimiento preventivo diario.
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Beneficios Clave del Servicio
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2 text-xs text-neutral-200 bg-neutral-800/50 p-2.5 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Equipamiento Biomecánico Hammer Strength</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-200 bg-neutral-800/50 p-2.5 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Monitoreo de Frecuencia Cardíaca</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-200 bg-neutral-800/50 p-2.5 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instructores Especializados en Sala</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-200 bg-neutral-800/50 p-2.5 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Acceso con app móvil</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onOpenInquiry?.();
                  }}
                  className="w-full py-3 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-bold text-sm rounded-xl shadow-brand-glow transition-all text-center cursor-pointer"
                >
                  Consultar Disponibilidad
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
