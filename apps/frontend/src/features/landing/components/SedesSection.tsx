"use client";

import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Mail, 
  Dumbbell, 
  UserCheck, 
  ExternalLink, 
  ChevronRight, 
  X, 
  Sparkles,
  Instagram,
  Facebook
} from 'lucide-react';
import { GymBranch, Trainer } from '@apex/shared';

interface SedesSectionProps {
  branches?: GymBranch[];
  trainers?: Trainer[];
  onOpenInquiry?: () => void;
  onSelectBranch?: (branch: GymBranch) => void;
  selectedSedeForLandingModal?: GymBranch | null;
  onClearSedeLandingModal?: () => void;
}

export const SedesSection: React.FC<SedesSectionProps> = ({
  branches = [],
  trainers = [],
  onOpenInquiry,
  onSelectBranch,
  selectedSedeForLandingModal,
  onClearSedeLandingModal
}) => {
  const [activeBranchId, setActiveBranchId] = useState<string>(branches[0]?.id || '');
  const [inspectBranchLanding, setInspectBranchLanding] = useState<GymBranch | null>(selectedSedeForLandingModal || null);

  const activeBranch = branches.find(b => b.id === activeBranchId) || branches[0];
  const branchTrainers = (trainers || []).filter(t => t.branchId === activeBranch?.id);

  const handleOpenLandingModal = (b: GymBranch) => {
    setInspectBranchLanding(b);
  };

  const handleCloseLandingModal = () => {
    setInspectBranchLanding(null);
    if (onClearSedeLandingModal) onClearSedeLandingModal();
  };

  return (
    <section id="sedes" className="py-24 bg-neutral-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-alpha border border-brand-primary-alpha text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-4 h-4 text-brand-primary" />
            <span>Red de Sedes Premium</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Ubicaciones Estratégicas en Lima
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Cada sede cuenta con áreas de cardio, musculación biomecánica, saunas y entrenadores certificados.
          </p>
        </div>

        {/* Branch Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {branches.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBranchId(b.id)}
              className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeBranchId === b.id
                  ? 'bg-brand-primary text-brand-primary-contrast shadow-brand-glow scale-105'
                  : 'bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-700/80'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{b.name}</span>
            </button>
          ))}
        </div>

        {/* Active Branch Display */}
        {activeBranch && (
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Gallery & Interactive Map Mock */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden group">
                <img
                  src={activeBranch.photos[0] || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'}
                  alt={activeBranch.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                {/* Map Link Badge */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs text-white font-bold flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Lat: {activeBranch.lat.toFixed(4)}, Lng: {activeBranch.lng.toFixed(4)}</span>
                </div>

                <button
                  onClick={() => handleOpenLandingModal(activeBranch)}
                  className="absolute bottom-4 right-4 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast px-4 py-2.5 rounded-xl text-xs font-bold shadow-brand-glow flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Ver Landing Exclusiva de Sede</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Photo Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                {activeBranch.photos.map((p, idx) => (
                  <div key={idx} className="h-24 rounded-xl overflow-hidden border border-neutral-800">
                    <img src={p} alt="Sede Foto" className="w-full h-full object-cover hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>
            </div>

            {/* Branch Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block mb-1">
                  ApexGym {activeBranch.city}
                </span>
                <h3 className="text-3xl font-black text-white mb-2">
                  {activeBranch.name}
                </h3>
                <p className="text-xs text-neutral-400 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  <span>{activeBranch.address}</span>
                </p>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-3 py-4 border-y border-neutral-800">
                <div className="bg-neutral-900 p-3 rounded-2xl border border-neutral-800/80">
                  <span className="text-[11px] text-neutral-400 block font-medium">Equipamiento</span>
                  <span className="text-lg font-black text-white">{activeBranch.equipmentCount}+ Máquinas</span>
                </div>
                <div className="bg-neutral-900 p-3 rounded-2xl border border-neutral-800/80">
                  <span className="text-[11px] text-neutral-400 block font-medium">Staff Técnico</span>
                  <span className="text-lg font-black text-white">{activeBranch.trainersCount} Coaches</span>
                </div>
              </div>

              {/* Schedule & Contacts */}
              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-900 rounded-lg text-amber-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Horarios de Atención:</span>
                    <span className="text-neutral-400">{activeBranch.schedule}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-900 rounded-lg text-emerald-400">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">WhatsApp Directo Sede:</span>
                    <span className="text-neutral-400">{activeBranch.whatsapp}</span>
                  </div>
                </div>
              </div>

              {/* Services List Tag Pills */}
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                  Servicios Disponibles en Sede
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeBranch.services.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-xl text-[11px] font-semibold text-neutral-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={onOpenInquiry}
                  className="flex-1 py-3.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-bold text-xs rounded-xl shadow-brand-glow transition-all text-center cursor-pointer"
                >
                  Agendar Visita Guiada
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Dedicated Branch Landing Page Modal (e.g. gym.com/san-miguel) */}
      {(inspectBranchLanding || selectedSedeForLandingModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-white max-h-[92vh] flex flex-col">
            
            {/* Header bar */}
            <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-brand-primary-alpha text-brand-primary border border-brand-primary-alpha rounded-full text-xs font-mono">
                  gym.pe/{inspectBranchLanding?.slug || selectedSedeForLandingModal?.slug}
                </div>
                <h4 className="font-bold text-sm text-white hidden sm:block">
                  Landing Oficial de {inspectBranchLanding?.name || selectedSedeForLandingModal?.name}
                </h4>
              </div>

              <button
                onClick={handleCloseLandingModal}
                className="p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Landing Body */}
            <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">
              {/* Hero Banner for Sede */}
              <div className="relative h-64 rounded-3xl overflow-hidden flex items-end p-6">
                <img 
                  src={(inspectBranchLanding || selectedSedeForLandingModal)?.photos[0]} 
                  alt="Sede Banner" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
                <div className="relative z-10">
                  <span className="px-3 py-1 bg-brand-primary text-brand-primary-contrast text-[10px] font-black uppercase rounded-full tracking-widest mb-2 inline-block">
                    Sede Exclusiva
                  </span>
                  <h2 className="text-3xl font-black text-white">
                    {(inspectBranchLanding || selectedSedeForLandingModal)?.name}
                  </h2>
                  <p className="text-xs text-neutral-300">
                    {(inspectBranchLanding || selectedSedeForLandingModal)?.address}
                  </p>
                </div>
              </div>

              {/* Sede Schedule & Contacts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800">
                  <Clock className="w-5 h-5 text-amber-400 mb-2" />
                  <h5 className="font-bold text-xs text-white">Horario Extendido</h5>
                  <p className="text-[11px] text-neutral-400 mt-1">{(inspectBranchLanding || selectedSedeForLandingModal)?.schedule}</p>
                </div>

                <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800">
                  <MessageCircle className="w-5 h-5 text-emerald-400 mb-2" />
                  <h5 className="font-bold text-xs text-white">Atención WhatsApp</h5>
                  <p className="text-[11px] text-neutral-400 mt-1">{(inspectBranchLanding || selectedSedeForLandingModal)?.whatsapp}</p>
                </div>

                <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800">
                  <Mail className="w-5 h-5 text-brand-primary mb-2" />
                  <h5 className="font-bold text-xs text-white">Correo Sede</h5>
                  <p className="text-[11px] text-neutral-400 mt-1">{(inspectBranchLanding || selectedSedeForLandingModal)?.email}</p>
                </div>
              </div>

              {/* Trainers assigned to this Sede */}
              <div>
                <h4 className="text-lg font-extrabold text-white mb-4">
                  Entrenadores Principales en esta Sede
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(trainers || [])
                    .filter(t => t.branchId === (inspectBranchLanding || selectedSedeForLandingModal)?.id)
                    .map((t) => (
                      <div key={t.id} className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center gap-4">
                        <img src={t.photoUrl} alt={t.fullName} className="w-14 h-14 rounded-2xl object-cover" />
                        <div>
                          <h5 className="font-bold text-sm text-white">{t.fullName}</h5>
                          <p className="text-xs text-brand-primary">{t.specialty}</p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">{t.schedule}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
