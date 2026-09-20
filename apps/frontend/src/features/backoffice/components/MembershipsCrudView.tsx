"use client";

import React, { useState } from 'react';
import { CreditCard, Plus, Edit2, Copy, Trash2, Check, Sparkles, X, Save } from 'lucide-react';
import { MembershipPlan } from '@apex/shared';
import { ActionButton, SubmitButton } from '../../../shared/components/ActionButton';
import { useSubmitGuard } from '../../../shared/hooks/useSubmitGuard';

interface MembershipsCrudViewProps {
  plans?: MembershipPlan[];
  onAddPlan?: (plan: MembershipPlan) => Promise<unknown>;
  onUpdatePlan?: (plan: MembershipPlan) => Promise<unknown>;
  onDeletePlan?: (id: string) => Promise<unknown>;
  /** True mientras una mutación está en curso; bloquea los botones. */
  isSaving?: boolean;
}

export const MembershipsCrudView: React.FC<MembershipsCrudViewProps> = ({
  plans = [],
  onAddPlan,
  onUpdatePlan,
  onDeletePlan,
  isSaving = false
}) => {
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const safePlans = plans || [];

  const emptyPlan: MembershipPlan = {
    id: `plan-${Date.now()}`,
    name: 'Plan Nuevo',
    durationMonths: 1,
    price: 150,
    originalPrice: 200,
    benefits: ['Acceso ilimitado a 1 Sede', 'Uso de lockers'],
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400',
    color: '#E11D48',
    priority: safePlans.length + 1,
    visible: true,
    status: 'ACTIVE',
    branches: ['ALL']
  };

  const handleDuplicate = (plan: MembershipPlan) => {
    const duplicated: MembershipPlan = {
      ...plan,
      id: `plan-${Date.now()}`,
      name: `${plan.name} (Copia)`,
      priority: safePlans.length + 1
    };
    if (onAddPlan) onAddPlan(duplicated);
  };

  const handleSaveInternal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan || isSaving) return;

    // El modal solo se cierra si la API confirmó el guardado; si falla, el
    // formulario permanece abierto con los datos que el usuario escribió
    // (el error ya se muestra por toast).
    try {
      await (isCreating ? onAddPlan?.(editingPlan) : onUpdatePlan?.(editingPlan));
      setEditingPlan(null);
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
            <CreditCard className="w-6 h-6 text-brand-primary" />
            <span>Gestión de Membresías y Planes</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Administra precios, duración, beneficios en lista, badges promocionales y duplicación rápida.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingPlan({ ...emptyPlan });
            setIsCreating(true);
          }}
          className="px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-bold text-xs rounded-xl shadow-brand-glow flex items-center gap-2 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Membresía</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((p) => (
          <div key={p.id} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between relative group">
            
            {p.badge && (
              <span className="absolute -top-3 left-4 px-3 py-0.5 bg-brand-primary text-brand-primary-contrast text-[10px] font-black uppercase rounded-full shadow-brand-glow">
                {p.badge}
              </span>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-neutral-500">Prioridad: #{p.priority}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-400'}`}>
                  {p.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{p.name}</h3>

              <div className="mb-4 pb-4 border-b border-neutral-800">
                <span className="text-3xl font-black text-white">S/{p.price}</span>
                <span className="text-xs text-neutral-400"> / {p.durationMonths}m</span>
              </div>

              <ul className="space-y-2 mb-6">
                {p.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingPlan({ ...p });
                  setIsCreating(false);
                }}
                className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Editar</span>
              </button>

              <button
                onClick={() => handleDuplicate(p)}
                className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl transition-colors cursor-pointer"
                title="Duplicar Membresía"
              >
                <Copy className="w-4 h-4" />
              </button>

              <ActionButton
                onAction={() => onDeletePlan?.(p.id)}
                isBusy={isSaving}
                busyLabel=""
                icon={<Trash2 className="w-4 h-4" />}
                className="p-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 rounded-xl cursor-pointer"
                title="Eliminar Membresía"
              >
                <span className="sr-only">Eliminar Membresía</span>
              </ActionButton>
            </div>

          </div>
        ))}
      </div>

      {/* Modal Form */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setEditingPlan(null)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-white mb-6">
              {isCreating ? 'Crear Membresía' : `Editar ${editingPlan.name}`}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Nombre del Plan</label>
                <input
                  type="text"
                  required
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Precio Soles (S/)</label>
                  <input
                    type="number"
                    required
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Duración (Meses)</label>
                  <input
                    type="number"
                    required
                    value={editingPlan.durationMonths}
                    onChange={(e) => setEditingPlan({ ...editingPlan, durationMonths: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Badge Etiqueta (Ej. MÁS POPULAR)</label>
                <input
                  type="text"
                  value={editingPlan.badge || ''}
                  onChange={(e) => setEditingPlan({ ...editingPlan, badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Beneficios (1 por línea)</label>
                <textarea
                  rows={4}
                  value={editingPlan.benefits.join('\n')}
                  onChange={(e) => setEditingPlan({ ...editingPlan, benefits: e.target.value.split('\n') })}
                  className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2.5 bg-neutral-800 text-white rounded-xl text-xs font-bold"
                >
                  Cancelar
                </button>
                <SubmitButton
                  isBusy={isSaving}
                  icon={<Save className="w-4 h-4" />}
                  className="px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast rounded-xl text-xs font-bold shadow-brand-glow flex items-center gap-1.5 transition-all"
                >
                  Guardar Membresía
                </SubmitButton>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
