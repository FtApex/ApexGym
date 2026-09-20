"use client";

import React, { useState } from 'react';
import { UserCheck, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { Trainer, GymBranch } from '@apex/shared';
import { ActionButton, SubmitButton } from '../../../shared/components/ActionButton';
import { useSubmitGuard } from '../../../shared/hooks/useSubmitGuard';

interface TrainersCrudViewProps {
  trainers: Trainer[];
  branches: GymBranch[];
  onAddTrainer: (trainer: Trainer) => Promise<unknown>;
  onUpdateTrainer: (trainer: Trainer) => Promise<unknown>;
  onDeleteTrainer: (id: string) => Promise<unknown>;
  /** True mientras una mutación está en curso; bloquea los botones. */
  isSaving?: boolean;
}

export const TrainersCrudView: React.FC<TrainersCrudViewProps> = ({
  trainers,
  branches,
  onAddTrainer,
  onUpdateTrainer,
  onDeleteTrainer,
  isSaving = false
}) => {
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const emptyTrainer: Trainer = {
    id: `tr-${Date.now()}`,
    photoUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=300',
    fullName: '',
    specialty: 'CrossFit & Musculación',
    schedule: '06:00 AM - 02:00 PM',
    branchId: branches[0]?.id || '',
    bio: 'Entrenador certificado apasionado por los resultados.',
    socials: { instagram: '@coach' },
    status: 'ACTIVE'
  };

  const handleSaveInternal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrainer || isSaving) return;

    // El modal solo se cierra si la API confirmó el guardado; si falla, el
    // formulario permanece abierto con los datos que el usuario escribió
    // (el error ya se muestra por toast).
    try {
      await (isCreating ? onAddTrainer(editingTrainer) : onUpdateTrainer(editingTrainer));
      setEditingTrainer(null);
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
            <UserCheck className="w-6 h-6 text-brand-primary" />
            <span>Gestión de Entrenadores y Staff Técnico</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Administra biografías, especialidades, horarios de sala y sede asignada para cada coach.
          </p>
        </div>

        <button
          onClick={() => { setEditingTrainer({ ...emptyTrainer }); setIsCreating(true); }}
          className="px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-bold text-xs rounded-xl shadow-brand-glow flex items-center gap-2 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Coach</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainers.map((t) => (
          <div key={t.id} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
            <div className="flex flex-col items-center text-center">
              <img src={t.photoUrl} alt={t.fullName} className="w-20 h-20 rounded-2xl object-cover mb-3 border-2 border-brand-primary" />
              <h3 className="font-extrabold text-base text-white">{t.fullName}</h3>
              <span className="text-xs text-brand-primary font-semibold mb-2">{t.specialty}</span>
              <p className="text-xs text-neutral-400 mb-4">{t.bio}</p>
              <div className="text-[11px] font-mono text-neutral-400 bg-neutral-950 px-3 py-1 rounded-xl mb-4">
                Horario: {t.schedule}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex justify-between gap-2">
              <button onClick={() => { setEditingTrainer(t); setIsCreating(false); }} className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"><Edit2 className="w-3.5 h-3.5" /><span>Editar</span></button>
              <ActionButton onAction={() => onDeleteTrainer(t.id)} isBusy={isSaving} busyLabel="" icon={<Trash2 className="w-4 h-4" />} className="p-2 bg-rose-950/40 text-rose-400 rounded-xl cursor-pointer" title="Eliminar"><span className="sr-only">Eliminar</span></ActionButton>
            </div>
          </div>
        ))}
      </div>

      {editingTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl text-white">
            <button onClick={() => setEditingTrainer(null)} className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full"><X className="w-5 h-5" /></button>
            <h3 className="text-2xl font-black text-white mb-4">{isCreating ? 'Agregar Coach' : 'Editar Coach'}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Nombre Completo</label>
                <input type="text" required value={editingTrainer.fullName} onChange={(e) => setEditingTrainer({ ...editingTrainer, fullName: e.target.value })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Especialidad</label>
                <input type="text" required value={editingTrainer.specialty} onChange={(e) => setEditingTrainer({ ...editingTrainer, specialty: e.target.value })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Horario de Sala</label>
                <input type="text" required value={editingTrainer.schedule} onChange={(e) => setEditingTrainer({ ...editingTrainer, schedule: e.target.value })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingTrainer(null)} className="px-4 py-2 bg-neutral-800 text-white rounded-xl text-xs font-bold">Cancelar</button>
                <SubmitButton isBusy={isSaving} icon={<Save className="w-4 h-4" />} className="px-6 py-2 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast rounded-xl text-xs font-bold shadow-brand-glow flex items-center gap-1.5 transition-all">Guardar</SubmitButton>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
