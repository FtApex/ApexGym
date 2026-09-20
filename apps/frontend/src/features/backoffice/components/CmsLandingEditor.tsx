"use client";

import React, { useEffect, useState } from 'react';
import { Layout, Sparkles, Check, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CmsSection, LandingCmsConfig } from '@apex/shared';

interface CmsLandingEditorProps {
  config: LandingCmsConfig;
  onSave: (config: Partial<LandingCmsConfig>) => void;
  isSaving: boolean;
  isSaved: boolean;
}

export const CmsLandingEditor: React.FC<CmsLandingEditorProps> = ({
  config,
  onSave,
  isSaving,
  isSaved,
}) => {
  const [sections, setSections] = useState<CmsSection[]>(config.sections ?? []);

  useEffect(() => setSections(config.sections ?? []), [config.sections]);

  useEffect(() => {
    if (isSaved) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [isSaved]);

  const toggleSection = (id: string) => {
    setSections((current) =>
      current.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  const moveSection = (index: number, direction: 'UP' | 'DOWN') => {
    const targetIndex = direction === 'UP' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const reordered = [...sections];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
    // `order` se renumera para que el backend reciba la posición definitiva.
    setSections(reordered.map((section, i) => ({ ...section, order: i + 1 })));
  };

  const handlePublish = () => {
    onSave({ sections });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Layout className="w-6 h-6 text-brand-primary" />
            <span>Editor CMS de Landing Page</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Gestiona la estructura visual, visibilidad y orden de secciones en la Landing pública.
          </p>
        </div>

        <button
          onClick={handlePublish}
          disabled={isSaving}
          className="px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-60 disabled:cursor-not-allowed text-brand-primary-contrast font-bold text-xs rounded-xl shadow-brand-glow flex items-center gap-2 cursor-pointer transition-all"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{isSaving ? 'Publicando...' : 'Publicar Cambios a Producción'}</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <Check className="w-5 h-5" />
          <span>¡La estructura de la Landing Page ha sido guardada correctamente!</span>
        </div>
      )}

      {/* Sections Control Panel */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white mb-2">Orden y Visibilidad de Secciones</h3>

        <div className="space-y-3">
          {sections.map((sec, idx) => (
            <div
              key={sec.id}
              className={`p-4 rounded-2xl border transition-colors flex items-center justify-between ${
                sec.enabled ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-950/40 border-neutral-900 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={sec.enabled}
                  onChange={() => toggleSection(sec.id)}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 bg-neutral-900 border-neutral-700 cursor-pointer"
                />
                <span className="font-bold text-xs text-white">{sec.name}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveSection(idx, 'UP')}
                  disabled={idx === 0}
                  className="p-1.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-white rounded-lg"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => moveSection(idx, 'DOWN')}
                  disabled={idx === sections.length - 1}
                  className="p-1.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-white rounded-lg"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
