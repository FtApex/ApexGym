"use client";

import React, { useEffect, useState } from 'react';
import { Settings, Save, Check, Loader2 } from 'lucide-react';
import { SystemSettings } from '@/shared/types';

interface SettingsViewProps {
  settings: SystemSettings;
  onSave: (settings: Partial<SystemSettings>) => void;
  isSaving: boolean;
  isSaved: boolean;
}

type Tab = 'GATEWAYS' | 'R2' | 'PIXELS';

const TABS: { id: Tab; label: string }[] = [
  { id: 'GATEWAYS', label: 'Pasarelas de Pago' },
  { id: 'R2', label: 'Cloudflare R2 Storage' },
  { id: 'PIXELS', label: 'Meta Pixel & Analytics' },
];

const inputClass =
  'w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-mono';

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSave,
  isSaving,
  isSaved,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('GATEWAYS');
  const [form, setForm] = useState<SystemSettings>(settings);

  useEffect(() => setForm(settings), [settings]);

  const set = <K extends keyof SystemSettings>(key: K, value: SystemSettings[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">

      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-brand-primary" />
          <span>Configuración Global del Sistema API & Pasarelas</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Credenciales de pasarelas de pago, bucket Cloudflare R2 y pixeles de conversión.
        </p>
      </div>

      <div className="flex gap-2 border-b border-neutral-800 pb-3">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-brand-primary text-brand-primary-contrast shadow-brand-glow'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">

        {isSaved && (
          <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Configuración guardada en base de datos.</span>
          </div>
        )}

        {activeTab === 'GATEWAYS' && (
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base mb-4">Credenciales de Pasarelas Perú</h3>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Pasarela Activa</label>
              <select
                value={form.selectedGateway}
                onChange={(e) => set('selectedGateway', e.target.value as SystemSettings['selectedGateway'])}
                className={inputClass}
              >
                <option value="MERCADOPAGO">MercadoPago</option>
                <option value="CULQI">Culqi</option>
                <option value="NIUBIZ">Niubiz</option>
                <option value="IZIPAY">Izipay</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">MercadoPago Public Key</label>
              <input type="text" value={form.mercadoPagoPublicKey} onChange={(e) => set('mercadoPagoPublicKey', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                MercadoPago Access Token
                <span className="ml-2 font-normal text-neutral-500">(déjalo enmascarado para no cambiarlo)</span>
              </label>
              <input type="password" value={form.mercadoPagoAccessToken} onChange={(e) => set('mercadoPagoAccessToken', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Culqi Public Key</label>
              <input type="text" value={form.culqiPublicKey} onChange={(e) => set('culqiPublicKey', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Niubiz Merchant ID</label>
              <input type="text" value={form.niubizMerchantId} onChange={(e) => set('niubizMerchantId', e.target.value)} className={inputClass} />
            </div>
          </div>
        )}

        {activeTab === 'R2' && (
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base mb-4">Cloudflare R2 Bucket Specs</h3>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Endpoint</label>
              <input type="text" value={form.r2Endpoint} onChange={(e) => set('r2Endpoint', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Bucket Name</label>
              <input type="text" value={form.r2BucketName} onChange={(e) => set('r2BucketName', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Access Key ID</label>
              <input type="text" value={form.r2AccessKey} onChange={(e) => set('r2AccessKey', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                Secret Access Key
                <span className="ml-2 font-normal text-neutral-500">(déjalo enmascarado para no cambiarlo)</span>
              </label>
              <input type="password" value={form.r2SecretKey} onChange={(e) => set('r2SecretKey', e.target.value)} className={inputClass} />
            </div>
          </div>
        )}

        {activeTab === 'PIXELS' && (
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base mb-4">Métricas & Pixeles</h3>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Meta Pixel ID (Facebook Ads)</label>
              <input type="text" value={form.metaPixelId} onChange={(e) => set('metaPixelId', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Google Analytics GA4 Measurement ID</label>
              <input type="text" value={form.googleAnalyticsId} onChange={(e) => set('googleAnalyticsId', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">WhatsApp de Contacto</label>
              <input type="text" value={form.whatsappNumber} onChange={(e) => set('whatsappNumber', e.target.value)} className={inputClass} />
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-60 disabled:cursor-not-allowed text-brand-primary-contrast font-bold text-xs rounded-xl shadow-brand-glow flex items-center gap-1.5 cursor-pointer transition-all"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Guardando...' : 'Guardar Configuración'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
