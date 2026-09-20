"use client";

import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, Building2, Phone, Mail, User } from 'lucide-react';
import { GymBranch } from '@apex/shared';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  branches: GymBranch[];
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, branches }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branchId: branches[0]?.id || '',
    question: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      branchId: branches[0]?.id || '',
      question: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl text-neutral-100 overflow-hidden">
        
        {/* Background Subtle Gradient */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-primary-alpha rounded-full blur-3xl pointer-events-none" />

        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-800/50 hover:bg-neutral-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Atención Inmediata</span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight mb-1">
              ¡Pregúntanos lo que quieras!
            </h3>
            <p className="text-sm text-neutral-400 mb-6">
              Déjanos tus datos e inquietud y un asesor comercial especializado te contactará en menos de 10 minutos.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Valeria Castro"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700/80 focus:border-brand-primary rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Teléfono / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+51 987 654 321"
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700/80 focus:border-brand-primary rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="valeria@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700/80 focus:border-brand-primary rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Sede de Interés
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500 pointer-events-none" />
                  <select
                    value={formData.branchId}
                    onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700/80 focus:border-brand-primary rounded-xl text-sm text-white focus:outline-none transition-colors appearance-none"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id} className="bg-neutral-900 text-white">
                        {b.name} ({b.city})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  ¿En qué te podemos ayudar?
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Ej. Quisiera saber si el pase VIP de invitado aplica para entrenar juntos el fin de semana..."
                  className="w-full p-3.5 bg-neutral-800/80 border border-neutral-700/80 focus:border-brand-primary rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-bold text-sm rounded-xl shadow-brand-glow flex items-center justify-center gap-2 transition-all duration-200 mt-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Pregunta</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-2">
              ¡Consulta Recibida con Éxito!
            </h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Gracias <span className="text-brand-primary font-semibold">{formData.name}</span>. Hemos enviado una confirmación a tu correo y nuestro equipo comercial te contactará vía WhatsApp al <span className="text-white font-semibold">{formData.phone}</span>.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-sm rounded-xl transition-colors"
            >
              Cerrar Ventana
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
