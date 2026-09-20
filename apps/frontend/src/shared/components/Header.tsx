"use client";

import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Menu, 
  X, 
  MessageSquare, 
  User, 
  Sun, 
  Moon, 
  ChevronDown, 
  MapPin, 
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { GymBranch, GymCompany, UserRole } from '@/shared/types';

interface HeaderProps {
  company?: GymCompany;
  branches?: GymBranch[];
  onOpenInquiry?: () => void;
  onOpenAuth?: () => void;
  onSelectSedeLanding?: (branch: GymBranch) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  activeRole?: UserRole | null;
  onGoToBackoffice?: () => void;
  isAuthenticated?: boolean;
  userRole?: UserRole;
}

export const Header: React.FC<HeaderProps> = ({
  company,
  branches = [],
  onOpenInquiry,
  onOpenAuth,
  onSelectSedeLanding,
  isDarkMode = true,
  onToggleDarkMode,
  activeRole,
  onGoToBackoffice
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sedesDropdownOpen, setSedesDropdownOpen] = useState(false);
  // Si el logo corporativo no carga, se vuelve al ícono por defecto.
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = Boolean(company?.logo) && !logoFailed;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Promociones', href: '#promociones' },
    { label: 'Membresías', href: '#membresias' },
    { label: 'Sedes', href: '#sedes', isDropdown: true },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 py-3 shadow-xl' 
        : 'bg-gradient-to-b from-neutral-950/90 via-neutral-950/60 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#inicio" className="flex items-center gap-3 group">
            {showLogo ? (
              // eslint-disable-next-line @next/next/no-img-element -- URL externa de R2, sin dominios configurados en next.config.
              <img
                src={company!.logo}
                alt={company?.name ?? 'Logotipo'}
                onError={() => setLogoFailed(true)}
                className="w-10 h-10 rounded-2xl object-contain group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-brand-primary p-2.5 text-brand-primary-contrast flex items-center justify-center shadow-brand-glow group-hover:scale-105 transition-transform">
                <Dumbbell className="w-full h-full stroke-[2.5]" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                APEX<span className="text-brand-primary">GYM</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-widest uppercase -mt-1">
                Fitness & Performance
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div key={link.label} className="relative group/dropdown">
                    <button
                      onClick={() => setSedesDropdownOpen(!sedesDropdownOpen)}
                      className="px-3 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-xl transition-all flex items-center gap-1"
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover/dropdown:rotate-180 transition-transform" />
                    </button>

                    {/* Sedes Mega Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-72 bg-neutral-900 border border-neutral-800 rounded-2xl p-2 shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200">
                      <div className="p-2 border-b border-neutral-800 mb-1">
                        <span className="text-[11px] font-bold text-brand-primary uppercase tracking-wider">
                          Nuestras Sedes
                        </span>
                      </div>
                      {branches.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => {
                            if (onSelectSedeLanding) onSelectSedeLanding(b);
                            setSedesDropdownOpen(false);
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-800 flex items-start gap-3 transition-colors group"
                        >
                          <div className="p-2 bg-neutral-800 group-hover:bg-brand-primary-alpha text-brand-primary rounded-lg transition-colors">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white group-hover:text-brand-primary transition-colors">
                              {b.name}
                            </p>
                            <p className="text-[11px] text-neutral-400 truncate max-w-[170px]">
                              {b.address}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-xl transition-all"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-colors"
              title="Cambiar Tema"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-300" />}
            </button>

            {/* ¡Pregúntanos! Modal Button */}
            <button
              onClick={onOpenInquiry}
              className="px-4 py-2.5 bg-neutral-900 border border-brand-primary-alpha hover:border-brand-primary text-brand-primary hover:text-brand-primary-contrast hover:bg-brand-primary rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>¡Pregúntanos!</span>
            </button>

            {/* Backoffice or Login */}
            {activeRole ? (
              <button
                onClick={onGoToBackoffice}
                className="px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-bold text-xs rounded-xl shadow-brand-glow flex items-center gap-2 transition-all cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Panel BackOffice</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl border border-neutral-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Ingresar</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenInquiry}
              className="px-3 py-1.5 bg-brand-primary text-brand-primary-contrast rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Consulta</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 p-4 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth?.();
              }}
              className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Ingresar a BackOffice</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
