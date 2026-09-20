"use client";

import React, { useState, useEffect } from 'react';
import { Search, X, LayoutDashboard, Users, CreditCard, Tag, Ticket, MapPin, ArrowRight } from 'lucide-react';
import { BackofficeTab } from './BackofficeSidebar';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: BackofficeTab) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'dashboard' as BackofficeTab, label: 'Ver Dashboard Principal', category: 'Navegación', icon: <LayoutDashboard className="w-4 h-4 text-rose-500" /> },
    { id: 'clientes' as BackofficeTab, label: 'Buscar Clientes / Socios', category: 'Operaciones', icon: <Users className="w-4 h-4 text-blue-500" /> },
    { id: 'membresias' as BackofficeTab, label: 'Gestionar Planes de Membresía', category: 'Comercial', icon: <CreditCard className="w-4 h-4 text-emerald-500" /> },
    { id: 'promociones' as BackofficeTab, label: 'Tablero Kanban de Promociones', category: 'Comercial', icon: <Tag className="w-4 h-4 text-amber-500" /> },
    { id: 'sedes' as BackofficeTab, label: 'Configurar Sedes y Ubicaciones', category: 'Operaciones', icon: <MapPin className="w-4 h-4 text-purple-500" /> },
    { id: 'cupones' as BackofficeTab, label: 'Crear Cupones de Descuento', category: 'Comercial', icon: <Ticket className="w-4 h-4 text-cyan-500" /> }
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-white">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Escribe un comando o busca en el BackOffice..."
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-neutral-500"
          />
          <button 
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-white rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-2xl hover:bg-neutral-800/80 flex items-center justify-between transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-950 rounded-xl border border-neutral-800">
                    {item.icon}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white group-hover:text-rose-400 transition-colors block">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-neutral-500 uppercase font-mono">
                      {item.category}
                    </span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-neutral-500">
              No se encontraron comandos para "{query}"
            </div>
          )}
        </div>

        <div className="p-3 bg-neutral-950 border-t border-neutral-800 text-[11px] text-neutral-500 flex justify-between px-4">
          <span>Usa las flechas o click para navegar</span>
          <span>Presiona <kbd className="bg-neutral-800 text-neutral-400 px-1 rounded">ESC</kbd> para salir</span>
        </div>

      </div>
    </div>
  );
};
