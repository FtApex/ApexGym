"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Building2, 
  ChevronDown, 
  UserCheck, 
  Sparkles,
  Command,
  CheckCircle2,
  X
} from 'lucide-react';
import { GymBranch, UserRole } from '@/shared/types';

interface BackofficeTopbarProps {
  branches: GymBranch[];
  selectedBranchId: string;
  onSelectBranch: (branchId: string) => void;
  userRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenCommandPalette: () => void;
}

export const BackofficeTopbar: React.FC<BackofficeTopbarProps> = ({
  branches,
  selectedBranchId,
  onSelectBranch,
  userRole,
  onChangeRole,
  isDarkMode,
  onToggleDarkMode,
  onOpenCommandPalette
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Nueva Venta Plan Anual Black', time: 'Hace 5 min', client: 'Mariana Gómez', amount: 'S/799.20', unread: true },
    { id: 2, title: 'Renovación de Membresía', time: 'Hace 22 min', client: 'Diego Mendoza', amount: 'S/999.00', unread: true },
    { id: 3, title: 'Alerta de Inbody Sede Miraflores', time: 'Hace 1 hora', client: 'Mantenimiento preventivo', amount: null, unread: false }
  ];

  return (
    <header className="sticky top-0 z-20 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-8 h-16 flex items-center justify-between">
      
      {/* Search Bar / Cmd+K Trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenCommandPalette}
          className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-zinc-400 flex items-center justify-between transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-zinc-500 group-hover:text-brand-primary transition-colors" />
            <span>Buscar socios, membresías, promociones...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-1 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 rounded">
            <Command className="w-3 h-3" /> K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Branch Selector Pill */}
        <div className="relative flex items-center">
          <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200">
            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
            <select
              value={selectedBranchId}
              onChange={(e) => onSelectBranch(e.target.value)}
              className="bg-transparent border-none text-xs text-zinc-200 font-semibold focus:outline-none cursor-pointer appearance-none pr-4"
            >
              <option value="ALL" className="bg-zinc-900 text-white">Todas las Sedes</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id} className="bg-zinc-900 text-white">
                  {b.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 pointer-events-none -ml-3" />
          </div>
        </div>

        {/* Publicar Cambios / CTA Button from Sleek Interface Theme */}
        <button 
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-1.5 text-xs font-semibold text-zinc-950 transition-colors hover:bg-white cursor-pointer shadow-sm"
        >
          Acciones Rápidas
        </button>

        <div className="h-8 w-[1px] bg-zinc-800"></div>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-xl transition-colors cursor-pointer"
          title="Cambiar Tema"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-300" />}
        </button>

        {/* Notifications Popup Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                  Notificaciones Recientes
                </span>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="p-1 text-zinc-500 hover:text-white rounded"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2.5 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 bg-zinc-950/60 rounded-xl border border-zinc-800/80 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{n.title}</span>
                      <span className="text-[10px] text-zinc-500">{n.time}</span>
                    </div>
                    <p className="text-zinc-400 text-[11px]">{n.client}</p>
                    {n.amount && <span className="text-emerald-400 font-bold text-[11px] block">{n.amount}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
