"use client";

import React, { useState } from 'react';
import { Tag, LayoutGrid, Table, Plus, Edit2, Copy, Trash2, Calendar, Clock, Eye, Sparkles, X, Save } from 'lucide-react';
import { Promotion, GymBranch } from '@apex/shared';
import { ActionButton, SubmitButton } from '../../../shared/components/ActionButton';
import { useSubmitGuard } from '../../../shared/hooks/useSubmitGuard';

interface PromotionsCrudViewProps {
  promotions?: Promotion[];
  branches?: GymBranch[];
  onAddPromo?: (promo: Promotion) => Promise<unknown>;
  onUpdatePromo?: (promo: Promotion) => Promise<unknown>;
  onDeletePromo?: (id: string) => Promise<unknown>;
  /** True mientras una mutación está en curso; bloquea los botones. */
  isSaving?: boolean;
}

export const PromotionsCrudView: React.FC<PromotionsCrudViewProps> = ({
  promotions = [],
  branches = [],
  onAddPromo,
  onUpdatePromo,
  onDeletePromo,
  isSaving = false
}) => {
  const [viewMode, setViewMode] = useState<'KANBAN' | 'TABLE'>('KANBAN');
  const [activeTabFilter, setActiveTabFilter] = useState<'ALL' | 'PROGRAMMED' | 'ACTIVE' | 'EXPIRED'>('ALL');
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewPromo, setPreviewPromo] = useState<Promotion | null>(null);

  const emptyPromo: Promotion = {
    id: `promo-${Date.now()}`,
    title: 'Nueva Promoción Cyber',
    description: 'Descuento especial por tiempo limitado en la sede seleccionada.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
    branchId: 'ALL',
    normalPrice: 500,
    offerPrice: 299,
    discountPercentage: 40,
    badge: 'HOT',
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    priority: 1,
    color: '#E11D48',
    status: 'ACTIVE'
  };

  const handleDuplicate = (p: Promotion) => {
    const duplicated: Promotion = {
      ...p,
      id: `promo-${Date.now()}`,
      title: `${p.title} (Copia)`
    };
    onAddPromo?.(duplicated);
  };

  const handleSaveInternal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPromo || isSaving) return;

    // El modal solo se cierra si la API confirmó el guardado; si falla, el
    // formulario permanece abierto con los datos que el usuario escribió
    // (el error ya se muestra por toast).
    try {
      await (isCreating ? onAddPromo?.(editingPromo) : onUpdatePromo?.(editingPromo));
      setEditingPromo(null);
      setIsCreating(false);
    } catch {
      // Se mantiene el modal abierto para reintentar.
    }
  };

  /** Envío protegido contra clics repetidos en el mismo tick. */
  const handleSave = useSubmitGuard(handleSaveInternal);

  const filteredPromos = promotions.filter(p => {
    if (activeTabFilter === 'ALL') return true;
    return p.status === activeTabFilter;
  });

  const columns = [
    { status: 'PROGRAMMED' as const, title: 'Programadas', bg: 'bg-blue-950/20 border-blue-800/40' },
    { status: 'ACTIVE' as const, title: 'Activas en Curso', bg: 'bg-emerald-950/20 border-emerald-800/40' },
    { status: 'EXPIRED' as const, title: 'Finalizadas / Archivadas', bg: 'bg-neutral-950 border-neutral-800' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Tag className="w-6 h-6 text-brand-primary" />
            <span>Gestión de Promociones (Kanban & Tabla)</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Organiza campañas comerciales mediante vista tipo Kanban, programación de fechas y asignación por sede.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="bg-neutral-900 border border-neutral-800 p-1 rounded-2xl flex items-center gap-1">
            <button
              onClick={() => setViewMode('KANBAN')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'KANBAN' ? 'bg-brand-primary text-brand-primary-contrast shadow-brand-glow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('TABLE')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'TABLE' ? 'bg-brand-primary text-brand-primary-contrast shadow-brand-glow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Tabla</span>
            </button>
          </div>

          <button
            onClick={() => {
              setEditingPromo({ ...emptyPromo });
              setIsCreating(true);
            }}
            className="px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-bold text-xs rounded-xl shadow-brand-glow flex items-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Promoción</span>
          </button>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex gap-2 border-b border-neutral-800 pb-3">
        {(['ALL', 'ACTIVE', 'PROGRAMMED', 'EXPIRED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTabFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTabFilter === tab
                ? 'bg-neutral-800 text-rose-400 border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab === 'ALL' ? 'Todas las Promociones' : tab === 'ACTIVE' ? 'Activas' : tab === 'PROGRAMMED' ? 'Programadas' : 'Finalizadas'}
          </button>
        ))}
      </div>

      {/* Kanban View */}
      {viewMode === 'KANBAN' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col) => {
            const columnPromos = filteredPromos.filter(p => p.status === col.status);

            return (
              <div key={col.status} className={`p-4 rounded-3xl border ${col.bg} space-y-4`}>
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="font-extrabold text-xs text-white uppercase tracking-wider">{col.title}</span>
                  <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded-full text-[10px] font-mono text-neutral-400">
                    {columnPromos.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {columnPromos.map((p) => (
                    <div key={p.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-xl space-y-3 group hover:border-brand-primary-alpha transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-brand-primary-alpha text-brand-primary border border-brand-primary-alpha text-[10px] font-black uppercase rounded-full">
                          {p.badge}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">-{p.discountPercentage}%</span>
                      </div>

                      <h4 className="font-bold text-sm text-white group-hover:text-brand-primary transition-colors">{p.title}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-2">{p.description}</p>

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-800">
                        <div>
                          <span className="text-neutral-500 line-through text-[10px] block">S/{p.normalPrice}</span>
                          <span className="font-black text-brand-primary text-sm">S/{p.offerPrice}</span>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => setPreviewPromo(p)} className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                          <button onClick={() => { setEditingPromo(p); setIsCreating(false); }} className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg"><Edit2 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDuplicate(p)} className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg"><Copy className="w-3.5 h-3.5" /></button>
                          <ActionButton onAction={() => onDeletePromo?.(p.id)} isBusy={isSaving} busyLabel="" icon={<Trash2 className="w-3.5 h-3.5" />} className="p-1.5 bg-neutral-800 text-neutral-400 hover:text-red-400 rounded-lg cursor-pointer" title="Eliminar"><span className="sr-only">Eliminar</span></ActionButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
                <th className="pb-3 px-2">Promoción</th>
                <th className="pb-3 px-2">Badge</th>
                <th className="pb-3 px-2">Precio Normal / Oferta</th>
                <th className="pb-3 px-2">Vigencia</th>
                <th className="pb-3 px-2">Estado</th>
                <th className="pb-3 px-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredPromos.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-800/50">
                  <td className="py-3 px-2 font-bold text-white">{p.title}</td>
                  <td className="py-3 px-2"><span className="px-2 py-0.5 bg-brand-primary-alpha text-brand-primary text-[10px] font-bold rounded-full">{p.badge}</span></td>
                  <td className="py-3 px-2"><span className="line-through text-neutral-500">S/{p.normalPrice}</span> → <span className="text-brand-primary font-bold">S/{p.offerPrice}</span></td>
                  <td className="py-3 px-2 text-neutral-400">{p.startDate} al {p.endDate}</td>
                  <td className="py-3 px-2"><span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded-full font-mono text-[10px]">{p.status}</span></td>
                  <td className="py-3 px-2 text-right space-x-1">
                    <button onClick={() => { setEditingPromo(p); setIsCreating(false); }} className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg"><Edit2 className="w-3.5 h-3.5" /></button>
                    <ActionButton onAction={() => onDeletePromo?.(p.id)} isBusy={isSaving} busyLabel="" icon={<Trash2 className="w-3.5 h-3.5" />} className="p-1.5 bg-neutral-800 text-neutral-400 hover:text-red-400 rounded-lg cursor-pointer" title="Eliminar"><span className="sr-only">Eliminar</span></ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingPromo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            <button onClick={() => setEditingPromo(null)} className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full"><X className="w-5 h-5" /></button>

            <h3 className="text-2xl font-black text-white mb-6">{isCreating ? 'Crear Promoción' : 'Editar Promoción'}</h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Título de la Promoción</label>
                <input type="text" required value={editingPromo.title} onChange={(e) => setEditingPromo({ ...editingPromo, title: e.target.value })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white" />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Descripción Corta</label>
                <textarea rows={2} required value={editingPromo.description} onChange={(e) => setEditingPromo({ ...editingPromo, description: e.target.value })} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Precio Normal (S/)</label>
                  <input type="number" required value={editingPromo.normalPrice} onChange={(e) => setEditingPromo({ ...editingPromo, normalPrice: parseFloat(e.target.value) || 0 })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Precio Oferta (S/)</label>
                  <input type="number" required value={editingPromo.offerPrice} onChange={(e) => setEditingPromo({ ...editingPromo, offerPrice: parseFloat(e.target.value) || 0 })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Badge (HOT / NUEVO / LIMITADO)</label>
                  <select value={editingPromo.badge} onChange={(e) => setEditingPromo({ ...editingPromo, badge: e.target.value as any })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white">
                    <option value="HOT">HOT</option>
                    <option value="NUEVO">NUEVO</option>
                    <option value="LIMITADO">LIMITADO</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Estado Kanban</label>
                  <select value={editingPromo.status} onChange={(e) => setEditingPromo({ ...editingPromo, status: e.target.value as any })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white">
                    <option value="PROGRAMMED">Programadas</option>
                    <option value="ACTIVE">Activas</option>
                    <option value="EXPIRED">Finalizadas</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingPromo(null)} className="px-4 py-2.5 bg-neutral-800 text-white rounded-xl text-xs font-bold">Cancelar</button>
                <SubmitButton isBusy={isSaving} icon={<Save className="w-4 h-4" />} className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5">Guardar</SubmitButton>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
