"use client";

import React, { useRef, useState } from 'react';
import { Building2, Save, Check, RefreshCw, Upload, Image as ImageIcon } from 'lucide-react';
import { GymCompany } from '@/shared/types';
import { SubmitButton } from '../../../shared/components/ActionButton';
import { useSubmitGuard } from '../../../shared/hooks/useSubmitGuard';
import { useUploadLogo } from '../../../shared/api/hooks';
import { useBrandTheme } from '../../../shared/providers/BrandThemeProvider';
import styles from './CompanyCrudView.module.css';

interface CompanyCrudViewProps {
  company: GymCompany;
  onUpdateCompany: (company: GymCompany) => Promise<unknown>;
  /** True mientras el guardado está en curso; bloquea el botón. */
  isSaving?: boolean;
  /** True cuando la API confirmó el último guardado. */
  isSaved?: boolean;
}

export const CompanyCrudView: React.FC<CompanyCrudViewProps> = ({
  company,
  onUpdateCompany,
  isSaving = false,
  isSaved = false,
}) => {
  const [formData, setFormData] = useState<GymCompany>({ ...company });
  const { setPreviewBrandColor } = useBrandTheme();

  const handleColorChange = (newColor: string) => {
    setFormData((current) => ({ ...current, brandColor: newColor }));
    setPreviewBrandColor(newColor);
  };
  /** La URL del logo puede apuntar a una imagen rota; se avisa sin romper el form. */
  const [previewFailed, setPreviewFailed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadLogo = useUploadLogo();
  const isUploading = uploadLogo.isPending;

  /**
   * Sube el archivo elegido a R2 y deja su URL en el formulario. El cambio aún
   * debe confirmarse con "Guardar Datos de Empresa".
   */
  const handleSelectLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Se limpia el input para poder volver a elegir el mismo archivo tras un error.
    e.target.value = '';
    if (!file) return;

    try {
      const uploaded = await uploadLogo.mutateAsync(file);
      setPreviewFailed(false);
      setFormData((current) => ({ ...current, logo: uploaded.url }));
    } catch {
      // El error ya se informa por toast.
    }
  };

  const handleSubmitInternal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    try {
      await onUpdateCompany(formData);
      setPreviewBrandColor(null);
    } catch {
      // El error ya se informa por toast.
    }
  };

  /** Envío protegido contra clics repetidos en el mismo tick. */
  const handleSubmit = useSubmitGuard(handleSubmitInternal);

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Building2 className="w-6 h-6 text-brand-primary" />
          <span>Gestión de Empresa Corporativa</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Configuración legal, datos fiscales de RUC, logotipo oficial y color corporativo primario.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {isSaved && (
          <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Los cambios de la empresa han sido guardados exitosamente.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1.5">Nombre Comercial</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1.5">Razón Social Legal</label>
            <input
              type="text"
              required
              value={formData.razonSocial}
              onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
              className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1.5">RUC (SUNAT Peru)</label>
            <input
              type="text"
              required
              value={formData.ruc}
              onChange={(e) => setFormData({ ...formData, ruc: e.target.value })}
              className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-primary font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1.5">Correo Corporativo</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1.5">Teléfono Central</label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1.5">Color Corporativo Primario</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={formData.brandColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-12 h-10 bg-neutral-950 border border-neutral-800 rounded-xl cursor-pointer p-1"
              />
              <input
                type="text"
                value={formData.brandColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-mono uppercase focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-300 mb-1.5">Logotipo Corporativo</label>
          <p className="text-[11px] text-neutral-500 mb-3">
            Reemplaza las iniciales del panel y el ícono de la landing. PNG, JPG, WEBP o SVG, máximo 2 MB.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
            {/* Vista previa sobre cuadrícula, para juzgar logos con transparencia. */}
            <div className={`w-24 h-24 shrink-0 rounded-2xl border border-neutral-800 bg-neutral-950 flex items-center justify-center overflow-hidden ${styles.transparentGrid}`}>
              {formData.logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- URL externa de R2, sin dominios configurados en next.config.
                <img
                  src={formData.logo}
                  alt="Logotipo corporativo"
                  className="w-full h-full object-contain p-2"
                  onError={() => setPreviewFailed(true)}
                  onLoad={() => setPreviewFailed(false)}
                />
              ) : (
                <ImageIcon className="w-7 h-7 text-neutral-700" />
              )}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl border border-neutral-700 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {isUploading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  <span>{isUploading ? 'Subiendo…' : 'Subir logotipo'}</span>
                </button>

                {formData.logo && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, logo: '' });
                      setPreviewFailed(false);
                    }}
                    className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white font-bold text-xs rounded-xl border border-neutral-800 transition-colors cursor-pointer"
                  >
                    Quitar
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleSelectLogo}
                className="hidden"
              />

              {/* La URL sigue siendo editable a mano si el logo ya vive en otro sitio. */}
              <input
                type="text"
                value={formData.logo}
                onChange={(e) => {
                  setFormData({ ...formData, logo: e.target.value });
                  setPreviewFailed(false);
                }}
                placeholder="https://… o sube un archivo"
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-primary"
              />

              {previewFailed && formData.logo && (
                <p className="text-[11px] text-amber-400">
                  No se pudo cargar la imagen desde esa URL. Verifica que el enlace sea público.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <SubmitButton
            isBusy={isSaving}
            icon={<Save className="w-4 h-4" />}
            className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-bold text-xs rounded-xl shadow-brand-glow flex items-center gap-2 cursor-pointer transition-all"
          >
            Guardar Datos de Empresa
          </SubmitButton>
        </div>

      </form>

    </div>
  );
};
