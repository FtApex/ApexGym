"use client";

import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, ExternalLink, Save, X } from 'lucide-react';
import { GymBranch } from '@/shared/types';
import { ActionButton, SubmitButton } from '../../../shared/components/ActionButton';
import { useSubmitGuard } from '../../../shared/hooks/useSubmitGuard';

interface SedesCrudViewProps {
  branches: GymBranch[];
  /** Devuelven una promesa para que el modal espere la confirmación del servidor. */
  onAddBranch: (branch: GymBranch) => Promise<unknown>;
  onUpdateBranch: (branch: GymBranch) => Promise<unknown>;
  onDeleteBranch: (id: string) => Promise<unknown>;
  onPreviewBranchLanding: (branch: GymBranch) => void;
  /** True mientras una mutación está en curso; bloquea los botones. */
  isSaving?: boolean;
}

export const SedesCrudView: React.FC<SedesCrudViewProps> = ({
  branches,
  onAddBranch,
  onUpdateBranch,
  onDeleteBranch,
  onPreviewBranchLanding,
  isSaving = false
}) => {
  const [editingBranch, setEditingBranch] = useState<GymBranch | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const emptyBranch: GymBranch = {
    id: `sede-${Date.now()}`,
    companyId: 'comp-1',
    slug: 'nueva-sede',
    name: '',
    address: '',
    city: 'Lima',
    lat: -12.1000,
    lng: -77.0000,
    schedule: 'Lunes a Viernes 06:00 - 22:00',
    phone: '+51 (01) 400-0000',
    whatsapp: '+51 900 000 000',
    email: 'contacto@apexgym.pe',
    instagram: '@apexgym.oficial',
    facebook: 'ApexGymPeru',
    tiktok: '@apexgym.pe',
    photos: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'],
    logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200',
    status: 'ACTIVE',
    services: ['Musculación', 'Cardio', 'Spinning'],
    equipmentCount: 100,
    trainersCount: 8
  };

  const handleSaveInternal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBranch || isSaving) return;

    // El modal solo se cierra si la API confirmó el guardado; si falla, el
    // formulario permanece abierto con los datos que el usuario escribió
    // (el error ya se muestra por toast).
    try {
      await (isCreating ? onAddBranch(editingBranch) : onUpdateBranch(editingBranch));
      setEditingBranch(null);
      setIsCreating(false);
    } catch {
      // Se mantiene el modal abierto para reintentar.
    }
  };

  /** Envío protegido contra clics repetidos en el mismo tick. */
  const handleSave = useSubmitGuard(handleSaveInternal);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-brand-primary" />
            <span>Gestión de Sedes y Ubicaciones</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Cada empresa posee múltiples sedes independientes con sus propias métricas, entrenadores y Landing personalizada.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingBranch({ ...emptyBranch });
            setIsCreating(true);
          }}
          className="px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-bold text-xs rounded-xl shadow-brand-glow flex items-center gap-2 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Nueva Sede</span>
        </button>
      </div>

      {/* Branch Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((b) => (
          <div key={b.id} className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group">
            
            <div className="relative h-48">
              <img src={b.photos[0]} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-emerald-400 text-[10px] font-extrabold uppercase rounded-full border border-white/10">
                {b.status}
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">{b.name}</h3>
                <p className="text-xs text-neutral-400 mt-0.5">{b.address}</p>
              </div>

              <div className="text-xs space-y-1 text-neutral-300">
                <p><span className="text-neutral-500 font-medium">Horario:</span> {b.schedule}</p>
                <p><span className="text-neutral-500 font-medium">WhatsApp:</span> {b.whatsapp}</p>
                <p><span className="text-neutral-500 font-medium">Slug URL:</span> <span className="font-mono text-brand-primary">gym.pe/{b.slug}</span></p>
              </div>

              <button
                onClick={() => onPreviewBranchLanding(b)}
                className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold text-brand-primary rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Ver Landing Exclusiva Sede</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 bg-neutral-950/80 border-t border-neutral-800 flex justify-between gap-2">
              <button
                onClick={() => {
                  setEditingBranch({ ...b });
                  setIsCreating(false);
                }}
                className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Editar</span>
              </button>

              <ActionButton
                onAction={() => onDeleteBranch(b.id)}
                isBusy={isSaving}
                busyLabel=""
                icon={<Trash2 className="w-4 h-4" />}
                className="p-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 rounded-xl border border-rose-800/40 cursor-pointer"
                title="Eliminar Sede"
              >
                <span className="sr-only">Eliminar Sede</span>
              </ActionButton>
            </div>

          </div>
        ))}
      </div>

      {/* Edit/Create Modal */}
      {editingBranch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setEditingBranch(null)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-white mb-6">
              {isCreating ? 'Agregar Nueva Sede' : `Editar ${editingBranch.name}`}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Nombre de la Sede</label>
                  <input
                    type="text"
                    required
                    value={editingBranch.name}
                    onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Slug URL (ej. san-miguel)</label>
                  <input
                    type="text"
                    required
                    value={editingBranch.slug}
                    onChange={(e) => setEditingBranch({ ...editingBranch, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-rose-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Dirección Física</label>
                <input
                  type="text"
                  required
                  value={editingBranch.address}
                  onChange={(e) => setEditingBranch({ ...editingBranch, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Latitud Mapa</label>
                  <input
                    type="number"
                    step="any"
                    value={editingBranch.lat}
                    onChange={(e) => setEditingBranch({ ...editingBranch, lat: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Longitud Mapa</label>
                  <input
                    type="number"
                    step="any"
                    value={editingBranch.lng}
                    onChange={(e) => setEditingBranch({ ...editingBranch, lng: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">WhatsApp Sede</label>
                  <input
                    type="text"
                    value={editingBranch.whatsapp}
                    onChange={(e) => setEditingBranch({ ...editingBranch, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Horarios</label>
                  <input
                    type="text"
                    value={editingBranch.schedule}
                    onChange={(e) => setEditingBranch({ ...editingBranch, schedule: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">URL Foto Principal</label>
                <input
                  type="text"
                  value={editingBranch.photos[0] || ''}
                  onChange={(e) => setEditingBranch({ ...editingBranch, photos: [e.target.value] })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBranch(null)}
                  className="px-4 py-2.5 bg-neutral-800 text-white rounded-xl text-xs font-bold"
                >
                  Cancelar
                </button>
                <SubmitButton
                  isBusy={isSaving}
                  icon={<Save className="w-4 h-4" />}
                  className="px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast rounded-xl text-xs font-bold shadow-brand-glow flex items-center gap-1.5 transition-all"
                >
                  Guardar Sede
                </SubmitButton>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
