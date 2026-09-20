"use client";

import React, { useState } from 'react';
import { Footer } from '@/features/landing/components/Footer';
import { MembershipsSection } from '@/features/landing/components/MembershipsSection';
import { InquiryModal } from '@/shared/components/InquiryModal';
import { ArrowLeft, MapPin, Dumbbell, Clock, MessageCircle } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import {
  useBranchBySlug,
  useBranches,
  useCompany,
  useMemberships,
} from '@/shared/api/hooks';

export default function BranchLandingPage() {
  const router = useRouter();
  const params = useParams();
  const branchSlug = params.branchSlug as string;

  const { data: branch, isLoading, isError } = useBranchBySlug(branchSlug);
  const { data: company } = useCompany();
  const { data: branches = [] } = useBranches();
  const { data: plans = [] } = useMemberships();
  const [showInquiryModal, setShowInquiryModal] = useState<boolean>(false);

  if (isLoading || !company) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-400 text-sm animate-pulse">Cargando sede...</p>
      </div>
    );
  }

  if (isError || !branch) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-black text-white">Sede no encontrada</h1>
        <p className="text-sm text-neutral-400">
          No existe ninguna sede con la dirección <span className="font-mono text-rose-400">/{branchSlug}</span>.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white rounded-xl"
        >
          Volver a la Web Principal
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between">
      
      {/* Top Return Header */}
      <header className="sticky top-0 z-30 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 p-4 flex items-center justify-between">
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-white rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Web Principal</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-rose-400 font-mono font-bold">gym.pe/{branch.slug}</span>
          <button
            onClick={() => router.push('/backoffice')}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white rounded-xl shadow-md"
          >
            Panel BackOffice
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 w-full">
        
        {/* Hero Sede */}
        <div className="relative rounded-3xl overflow-hidden border border-neutral-800 h-96">
          <img src={branch.photos[0]} alt={branch.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8 space-y-2">
            <span className="px-3 py-1 bg-rose-600 text-white text-[10px] font-black uppercase rounded-full">
              SEDE OFICIAL APEXGYM
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white">{branch.name}</h1>
            <p className="text-neutral-300 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>{branch.address}</span>
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-3xl space-y-2">
            <Clock className="w-6 h-6 text-rose-500" />
            <h3 className="font-bold text-white">Horario de Atención</h3>
            <p className="text-xs text-neutral-400">{branch.schedule}</p>
          </div>

          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-3xl space-y-2">
            <MessageCircle className="w-6 h-6 text-emerald-400" />
            <h3 className="font-bold text-white">Atención WhatsApp Sede</h3>
            <p className="text-xs text-neutral-400">{branch.whatsapp}</p>
          </div>

          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-3xl space-y-2">
            <Dumbbell className="w-6 h-6 text-rose-500" />
            <h3 className="font-bold text-white">Equipamiento & Staff</h3>
            <p className="text-xs text-neutral-400">{branch.equipmentCount}+ Máquinas Biomecánicas • {branch.trainersCount} Coaches Certificados</p>
          </div>
        </div>

        {/* Sede Plans */}
        <div>
          <h2 className="text-2xl font-black text-white mb-6">Planes Disponibles en {branch.name}</h2>
          <MembershipsSection plans={plans} coupons={[]} onOpenInquiry={() => setShowInquiryModal(true)} />
        </div>

      </main>

      <Footer company={company} branches={branches} />

      <InquiryModal
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        branches={branches}
      />
    </div>
  );
}
