"use client";

import React, { useState } from 'react';
import { Check, Crown, Zap, ShieldCheck, Sparkles, ArrowRight, Tag, X, CreditCard, Lock } from 'lucide-react';
import { MembershipPlan, Coupon, Promotion } from '@/shared/types';

interface MembershipsSectionProps {
  plans?: MembershipPlan[];
  coupons?: Coupon[];
  onOpenInquiry?: () => void;
  selectedPromoFromBanner?: Promotion | null;
}

export const MembershipsSection: React.FC<MembershipsSectionProps> = ({
  plans = [],
  coupons = [],
  onOpenInquiry,
  selectedPromoFromBanner
}) => {
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<MembershipPlan | null>(null);
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'DETAILS' | 'SUCCESS'>('DETAILS');

  const handleApplyCoupon = () => {
    setCouponError('');
    if (!couponCodeInput.trim()) return;
    const cleanCode = couponCodeInput.trim().toUpperCase();
    const found = coupons.find(c => c.code === cleanCode && c.status === 'ACTIVE');

    if (found) {
      setAppliedCoupon(found);
      setCouponError('');
    } else {
      setCouponError('Cupón inválido o expirado.');
      setAppliedCoupon(null);
    }
  };

  const calculateFinalPrice = (plan: MembershipPlan) => {
    let basePrice = plan.price;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'PERCENTAGE') {
        basePrice = basePrice * (1 - appliedCoupon.amount / 100);
      } else {
        basePrice = Math.max(0, basePrice - appliedCoupon.amount);
      }
    }
    return basePrice;
  };

  const handleCompleteCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('SUCCESS');
  };

  const resetCheckout = () => {
    setSelectedPlanForCheckout(null);
    setAppliedCoupon(null);
    setCouponCodeInput('');
    setCouponError('');
    setCheckoutStep('DETAILS');
  };

  return (
    <section id="membresias" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-alpha border border-brand-primary-alpha text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Planes & Membresías</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Elige el Plan que se Adapte a tus Metas
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Sin contratos forzosos. Cancela o congela cuando quieras. Acceso a equipamiento biomecánico de clase mundial.
          </p>
        </div>

        {/* Plans Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {(plans || []).filter(p => p.visible && p.status === 'ACTIVE').map((plan) => {
            const isVip = plan.badge?.includes('VIP') || plan.badge?.includes('RECOMENDADO');

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-2xl ${
                  isVip 
                    ? 'bg-neutral-900 border-2 border-brand-primary shadow-brand-glow' 
                    : 'bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Badge Tag */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-primary text-brand-primary-contrast text-[11px] font-black uppercase tracking-wider rounded-full shadow-brand-glow flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2 pt-2">
                    {plan.name}
                  </h3>
                  
                  <div className="mb-6 pb-6 border-b border-neutral-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        S/{plan.price}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">
                        / {plan.durationMonths === 1 ? 'mes' : `${plan.durationMonths} meses`}
                      </span>
                    </div>
                    {plan.originalPrice && (
                      <span className="text-xs text-neutral-500 line-through font-semibold block mt-1">
                        Precio Regular S/{plan.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Benefits Checklist */}
                  <ul className="space-y-3 mb-8">
                    {plan.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="leading-tight">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedPlanForCheckout(plan)}
                  className={`w-full py-3.5 font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isVip
                      ? 'bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast shadow-brand-glow'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                  }`}
                >
                  <span>Seleccionar Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Checkout Modal */}
      {selectedPlanForCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={resetCheckout}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {checkoutStep === 'DETAILS' ? (
              <div>
                <div className="flex items-center gap-2 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Proceso de Inscripción</span>
                </div>

                <h3 className="text-2xl font-black text-white mb-1">
                  {selectedPlanForCheckout.name}
                </h3>
                <p className="text-xs text-neutral-400 mb-6">
                  Completa tus datos para activar tu cuenta de socio en ApexGym.
                </p>

                <form onSubmit={handleCompleteCheckout} className="space-y-4">
                  
                  {/* Coupon Code Input */}
                  <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl">
                    <label className="block text-xs font-bold text-neutral-300 mb-2 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-brand-primary" />
                      <span>¿Tienes un Cupón de Descuento?</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ej. APEXFIT20"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value)}
                        className="flex-1 px-3.5 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-white uppercase tracking-wider focus:outline-none focus:border-brand-primary"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Aplicar
                      </button>
                    </div>
                    {appliedCoupon && (
                      <p className="text-xs text-emerald-400 mt-2 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Cupón {appliedCoupon.code} aplicado (-{appliedCoupon.amount}{appliedCoupon.type === 'PERCENTAGE' ? '%' : ' S/'})</span>
                      </p>
                    )}
                    {couponError && (
                      <p className="text-xs text-brand-primary mt-2 font-medium">{couponError}</p>
                    )}
                  </div>

                  {/* Summary Pricing */}
                  <div className="p-4 bg-neutral-950/60 rounded-2xl space-y-2 border border-neutral-800">
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>Precio Base del Plan:</span>
                      <span>S/{selectedPlanForCheckout.price.toFixed(2)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-xs text-emerald-400">
                        <span>Descuento Cupón:</span>
                        <span>
                          -{appliedCoupon.type === 'PERCENTAGE' 
                            ? `S/${(selectedPlanForCheckout.price * (appliedCoupon.amount / 100)).toFixed(2)}`
                            : `S/${appliedCoupon.amount.toFixed(2)}`}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-black text-white pt-2 border-t border-neutral-800">
                      <span>Monto Total a Pagar:</span>
                      <span className="text-brand-primary text-xl">
                        S/{calculateFinalPrice(selectedPlanForCheckout).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Customer Details Form */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Nombre Completo</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Mariana Gómez"
                        className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1">DNI / CE</label>
                        <input
                          type="text"
                          required
                          placeholder="72849102"
                          className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1">Celular</label>
                        <input
                          type="tel"
                          required
                          placeholder="+51 981234567"
                          className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Correo Electrónico</label>
                      <input
                        type="email"
                        required
                        placeholder="mariana.gomez@gmail.com"
                        className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-extrabold text-sm rounded-xl shadow-brand-glow flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Pagar S/{calculateFinalPrice(selectedPlanForCheckout).toFixed(2)} con MercadoPago / Niubiz</span>
                  </button>

                  <p className="text-[11px] text-center text-neutral-500 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Transacción 100% Encriptada y Segura</span>
                  </p>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">
                  ¡Inscripción Confirmada!
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                  Hemos generado tu comprobante de pago y tu código QR de acceso a la sede. Revisa tu correo electrónico para descargar la App ApexGym.
                </p>
                <button
                  onClick={resetCheckout}
                  className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Volver al Inicio
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
