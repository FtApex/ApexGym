"use client";

import React, { useState } from 'react';
import { Dumbbell, BookOpen, FileText, ShieldCheck, MapPin, Phone, Mail, X, Send, CheckCircle2 } from 'lucide-react';
import { GymCompany, GymBranch } from '@apex/shared';

interface FooterProps {
  company?: GymCompany;
  branches?: GymBranch[];
}

export const Footer: React.FC<FooterProps> = ({ company, branches = [] }) => {
  const [showReclamacionesModal, setShowReclamacionesModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [reclamoSubmitted, setReclamoSubmitted] = useState(false);

  const handleReclamoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReclamoSubmitted(true);
  };

  return (
    <footer id="contacto" className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-primary p-2 text-brand-primary-contrast flex items-center justify-center shadow-brand-glow">
                <Dumbbell className="w-full h-full" />
              </div>
              <span className="text-xl font-black text-white">APEX<span className="text-brand-primary">GYM</span></span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {company?.razonSocial} • RUC: {company?.ruc}. Red de centros deportivos premium con tecnología biomecánica y atención personalizada.
            </p>

            {/* Libro de Reclamaciones Banner Link */}
            <button
              onClick={() => {
                setReclamoSubmitted(false);
                setShowReclamacionesModal(true);
              }}
              className="p-3 bg-neutral-900 border border-amber-500/30 hover:border-amber-500 rounded-2xl flex items-center gap-3 text-xs font-bold text-amber-300 transition-colors group cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <span className="block">Libro de Reclamaciones Virtual</span>
                <span className="text-[10px] text-neutral-400 font-normal">Conforme a Ley N° 29571 Código de Protección al Consumidor</span>
              </div>
            </button>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">Navegación</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#inicio" className="hover:text-brand-primary transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-brand-primary transition-colors">Servicios & Clases</a></li>
              <li><a href="#promociones" className="hover:text-brand-primary transition-colors">Promociones</a></li>
              <li><a href="#membresias" className="hover:text-brand-primary transition-colors">Planes VIP</a></li>
              <li><a href="#nosotros" className="hover:text-brand-primary transition-colors">Nosotros</a></li>
            </ul>
          </div>

          {/* Sedes */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">Nuestras Sedes</h4>
            <ul className="space-y-2 text-xs">
              {branches.map((b) => (
                <li key={b.id} className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                  <span className="text-neutral-300 font-medium">{b.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">Legales</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setShowTermsModal(true)} className="hover:text-brand-primary transition-colors">
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <button onClick={() => setShowTermsModal(true)} className="hover:text-brand-primary transition-colors">
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button onClick={() => setShowTermsModal(true)} className="hover:text-brand-primary transition-colors">
                  Reglamento Interno de Sala
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} {company?.razonSocial}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Powered by ApexGym SaaS Platform</span>
          </div>
        </div>

      </div>

      {/* Libro de Reclamaciones Modal */}
      {showReclamacionesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowReclamacionesModal(false)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!reclamoSubmitted ? (
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Hoja de Reclamación Virtual</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">
                  Libro de Reclamaciones
                </h3>
                <p className="text-xs text-neutral-400 mb-6">
                  {company?.razonSocial} | RUC: {company?.ruc}
                </p>

                <form onSubmit={handleReclamoSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">Nombre Completo</label>
                      <input type="text" required placeholder="Ej. Juan Pérez" className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">DNI / CE</label>
                      <input type="text" required placeholder="12345678" className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">Correo Electrónico</label>
                      <input type="email" required placeholder="juan@gmail.com" className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">Teléfono</label>
                      <input type="tel" required placeholder="+51 987654321" className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 mb-1">Tipo de Incidencia</label>
                    <select className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white">
                      <option value="RECLAMO">Reclamo (Disconformidad relacionada a productos/servicios)</option>
                      <option value="QUEJA">Queja (Disconformidad no relacionada a servicios)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 mb-1">Detalle del Reclamo o Queja</label>
                    <textarea required rows={3} placeholder="Describe detalladamente los hechos..." className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white" />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
                  >
                    Enviar Hoja de Reclamación
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-white mb-2">Reclamo Registrado</h4>
                <p className="text-xs text-neutral-400 mb-6">Se ha generado la constancia con código #REC-2026-0042. Enviaremos la copia firmada a tu correo.</p>
                <button onClick={() => setShowReclamacionesModal(false)} className="px-6 py-2 bg-neutral-800 text-white rounded-xl text-xs font-bold">Cerrar</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Terms & Privacy Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setShowTermsModal(false)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black text-white mb-4">Términos, Condiciones y Políticas</h3>
            <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
              <p>1. <strong>Uso de Instalaciones:</strong> Todos los miembros deben portar toalla personal y calzado adecuado para sala de musculación.</p>
              <p>2. <strong>Congelamiento:</strong> Los pases de congelamiento se activan enviando solicitud con 48 horas de anticipación.</p>
              <p>3. <strong>Protección de Datos:</strong> De acuerdo a Ley N° 29733, tus datos personales no serán comercializados con terceros.</p>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
