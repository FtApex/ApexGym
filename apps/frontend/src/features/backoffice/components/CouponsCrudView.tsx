"use client";

import React, { useState } from 'react';
import { Ticket, Plus, Edit2, Trash2, Save, X, Tag } from 'lucide-react';
import { Coupon, GymBranch, MembershipPlan } from '@apex/shared';
import { ActionButton, SubmitButton } from '../../../shared/components/ActionButton';
import { useSubmitGuard } from '../../../shared/hooks/useSubmitGuard';

interface CouponsCrudViewProps {
  coupons: Coupon[];
  branches: GymBranch[];
  memberships: MembershipPlan[];
  onAddCoupon: (coupon: Coupon) => Promise<unknown>;
  onUpdateCoupon: (coupon: Coupon) => Promise<unknown>;
  onDeleteCoupon: (id: string) => Promise<unknown>;
  /** True mientras una mutación está en curso; bloquea los botones. */
  isSaving?: boolean;
}

export const CouponsCrudView: React.FC<CouponsCrudViewProps> = ({
  coupons,
  branches,
  memberships,
  onAddCoupon,
  onUpdateCoupon,
  onDeleteCoupon,
  isSaving = false
}) => {
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const emptyCoupon: Coupon = {
    id: `cup-${Date.now()}`,
    code: 'DESCUENTO10',
    description: '10% de descuento en el plan seleccionado.',
    type: 'PERCENTAGE',
    amount: 10,
    maxUses: 50,
    currentUses: 0,
    userLimit: 1,
    applicableMemberships: ['ALL'],
    applicableBranches: ['ALL'],
    startDate: '2026-07-01',
    endDate: '2026-12-31',
    status: 'ACTIVE'
  };

  const handleSaveInternal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoupon || isSaving) return;

    // El modal solo se cierra si la API confirmó el guardado; si falla, el
    // formulario permanece abierto con los datos que el usuario escribió
    // (el error ya se muestra por toast).
    try {
      await (isCreating ? onAddCoupon(editingCoupon) : onUpdateCoupon(editingCoupon));
      setEditingCoupon(null);
      setIsCreating(false);
    } catch {
      // Se mantiene el modal abierto para reintentar.
    }
  };

  /** Envío protegido contra clics repetidos en el mismo tick. */
  const handleSave = useSubmitGuard(handleSaveInternal);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Ticket className="w-6 h-6 text-brand-primary" />
            <span>Gestión de Cupones de Descuento</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Crea códigos promocionales por porcentaje o monto fijo, con restricciones por sede y membrecía.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCoupon({ ...emptyCoupon });
            setIsCreating(true);
          }}
          className="px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-bold text-xs rounded-xl shadow-brand-glow flex items-center gap-2 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Cupón</span>
        </button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
              <th className="pb-3 px-2">Código</th>
              <th className="pb-3 px-2">Descripción</th>
              <th className="pb-3 px-2">Descuento</th>
              <th className="pb-3 px-2">Usos (Actual / Máx)</th>
              <th className="pb-3 px-2">Vigencia</th>
              <th className="pb-3 px-2">Estado</th>
              <th className="pb-3 px-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-neutral-800/50">
                <td className="py-3 px-2 font-mono font-bold text-brand-primary">{c.code}</td>
                <td className="py-3 px-2 text-neutral-300">{c.description}</td>
                <td className="py-3 px-2 font-black text-white">{c.amount}{c.type === 'PERCENTAGE' ? '%' : ' S/'}</td>
                <td className="py-3 px-2 font-mono text-neutral-400">{c.currentUses} / {c.maxUses}</td>
                <td className="py-3 px-2 text-neutral-400">{c.startDate} al {c.endDate}</td>
                <td className="py-3 px-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${c.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-500'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-right space-x-1">
                  <button onClick={() => { setEditingCoupon(c); setIsCreating(false); }} className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg"><Edit2 className="w-3.5 h-3.5" /></button>
                  <ActionButton onAction={() => onDeleteCoupon(c.id)} isBusy={isSaving} busyLabel="" icon={<Trash2 className="w-3.5 h-3.5" />} className="p-1.5 bg-neutral-800 text-neutral-400 hover:text-red-400 rounded-lg cursor-pointer" title="Eliminar"><span className="sr-only">Eliminar</span></ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl text-white">
            <button onClick={() => setEditingCoupon(null)} className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full"><X className="w-5 h-5" /></button>
            <h3 className="text-2xl font-black text-white mb-4">{isCreating ? 'Crear Cupón' : 'Editar Cupón'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Código del Cupón</label>
                <input type="text" required value={editingCoupon.code} onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value.toUpperCase() })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-brand-primary font-mono uppercase focus:outline-none focus:border-brand-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Tipo</label>
                  <select value={editingCoupon.type} onChange={(e) => setEditingCoupon({ ...editingCoupon, type: e.target.value as any })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white">
                    <option value="PERCENTAGE">Porcentaje (%)</option>
                    <option value="FIXED_AMOUNT">Monto Fijo (S/)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Monto / Porcentaje</label>
                  <input type="number" required value={editingCoupon.amount} onChange={(e) => setEditingCoupon({ ...editingCoupon, amount: parseFloat(e.target.value) || 0 })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-mono" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingCoupon(null)} className="px-4 py-2 bg-neutral-800 text-white rounded-xl text-xs font-bold">Cancelar</button>
                <SubmitButton isBusy={isSaving} icon={<Save className="w-4 h-4" />} className="px-6 py-2 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast rounded-xl text-xs font-bold shadow-brand-glow flex items-center gap-1.5 transition-all">Guardar</SubmitButton>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
