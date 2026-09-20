"use client";

import React, { useState } from 'react';
import { Tag, Sparkles, Clock, ArrowRight, X, ShieldCheck, Check } from 'lucide-react';
import { Promotion, GymBranch } from '@/shared/types';

interface PromotionsSectionProps {
  promotions?: Promotion[];
  branches?: GymBranch[];
  onSelectPromoToBuy?: (promo: Promotion) => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({
  promotions = [],
  branches = [],
  onSelectPromoToBuy
}) => {
  const activePromos = (promotions || []).filter(p => p.status === 'ACTIVE' || p.status === 'PROGRAMMED');
  const [selectedPromoModal, setSelectedPromoModal] = useState<Promotion | null>(null);

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'HOT':
        return 'bg-brand-primary text-brand-primary-contrast shadow-brand-glow';
      case 'NUEVO':
        return 'bg-blue-600 text-white shadow-blue-500/30';
      case 'LIMITADO':
        return 'bg-amber-500 text-black shadow-amber-500/30 font-extrabold';
      default:
        return 'bg-brand-primary text-brand-primary-contrast';
    }
  };

  const getBranchName = (branchId: string) => {
    if (branchId === 'ALL') return 'Todas las Sedes';
    const b = branches.find(branch => branch.id === branchId);
    return b ? b.name : 'Sede Exclusiva';
  };

  return (
    <section id="promociones" className="py-24 bg-neutral-900 text-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-brand-primary-alpha rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-alpha border border-brand-primary-alpha text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">
              <Tag className="w-4 h-4 text-brand-primary" />
              <span>Ofertas de Temporada</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Promociones Especiales
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md">
            Descuentos exclusivos por tiempo limitado para nuevos miembros y renovaciones anticipadas.
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activePromos.map((promo) => (
            <div
              key={promo.id}
              className="bg-neutral-950/80 border border-neutral-800 hover:border-brand-primary-alpha rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg ${getBadgeStyle(promo.badge)}`}>
                      {promo.badge}
                    </span>
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                      -{promo.discountPercentage}% OFF
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 text-xs font-bold text-brand-primary flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Válido hasta {promo.endDate}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                    {getBranchName(promo.branchId)}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6 line-clamp-2">
                    {promo.description}
                  </p>

                  {/* Pricing Box */}
                  <div className="bg-neutral-900 border border-neutral-800 p-3.5 rounded-2xl flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs text-neutral-500 line-through block font-medium">
                        S/{promo.normalPrice.toFixed(2)}
                      </span>
                      <span className="text-2xl font-black text-brand-primary">
                        S/{promo.offerPrice.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      Ahorras S/{(promo.normalPrice - promo.offerPrice).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedPromoModal(promo)}
                  className="py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-bold text-xs rounded-xl border border-neutral-800 transition-colors text-center cursor-pointer"
                >
                  Más Info
                </button>

                <button
                  onClick={() => onSelectPromoToBuy?.(promo)}
                  className="py-3 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-extrabold text-xs rounded-xl shadow-brand-glow transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Comprar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Promo Detail Modal */}
      {selectedPromoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-white p-6 sm:p-8">
            <button 
              onClick={() => setSelectedPromoModal(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${getBadgeStyle(selectedPromoModal.badge)}`}>
                {selectedPromoModal.badge}
              </span>
              <span className="text-xs text-brand-primary font-bold">
                {getBranchName(selectedPromoModal.branchId)}
              </span>
            </div>

            <h3 className="text-2xl font-black text-white mb-2">
              {selectedPromoModal.title}
            </h3>

            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              {selectedPromoModal.description}
            </p>

            <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 mb-6 space-y-2">
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Precio Regular:</span>
                <span className="line-through">S/{selectedPromoModal.normalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-white">
                <span>Precio de Oferta Especial:</span>
                <span className="text-brand-primary text-xl">S/{selectedPromoModal.offerPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-emerald-400 pt-2 border-t border-neutral-800">
                <span>Vigencia:</span>
                <span>{selectedPromoModal.startDate} al {selectedPromoModal.endDate}</span>
              </div>
            </div>

            <button
              onClick={() => {
                const promo = selectedPromoModal;
                setSelectedPromoModal(null);
                onSelectPromoToBuy?.(promo);
              }}
              className="w-full py-4 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-extrabold text-sm rounded-xl shadow-brand-glow hover:scale-[1.02] transition-transform cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Aprovechar Promoción Ahora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
