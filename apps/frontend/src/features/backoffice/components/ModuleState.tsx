"use client";

import React from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';

interface ModuleStateProps {
  isLoading: boolean;
  error: Error | null;
  /** Nombre del recurso, para el mensaje: "No se pudieron cargar las sedes". */
  label: string;
}

/** Estado de carga y error compartido por los módulos del backoffice. */
export const ModuleState: React.FC<ModuleStateProps> = ({ isLoading, error, label }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-neutral-400 text-sm">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Cargando {label}...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 bg-rose-950/30 border border-rose-800/50 rounded-2xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-rose-300">
            No se pudieron cargar {label}
          </h3>
          <p className="text-xs text-rose-400/80 mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  return null;
};
