"use client";

import React, { useState } from 'react';
import { BarChart3, Download, FileSpreadsheet, FileText, Calendar, Sparkles } from 'lucide-react';
import { SaleInvoice } from '@apex/shared';

interface ReportsViewProps {
  invoices: SaleInvoice[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ invoices }) => {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleExport = (type: 'EXCEL' | 'PDF') => {
    setDownloading(type);
    setTimeout(() => {
      setDownloading(null);
      alert(`Reporte generado en formato ${type}. La descarga ha comenzado.`);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-brand-primary" />
            <span>Reportes & Exportación Contable</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Genera reportes financieros, auditorías de inventario de membresías y cierres de caja en Excel y PDF.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleExport('EXCEL')}
            disabled={downloading !== null}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{downloading === 'EXCEL' ? 'Generando Excel...' : 'Exportar a Excel'}</span>
          </button>

          <button
            onClick={() => handleExport('PDF')}
            disabled={downloading !== null}
            className="px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-bold text-xs rounded-xl shadow-brand-glow flex items-center gap-2 cursor-pointer transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>{downloading === 'PDF' ? 'Generando PDF...' : 'Exportar a PDF'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-3">
          <h3 className="font-bold text-white text-base">Cierre Mensual de Facturación</h3>
          <p className="text-xs text-neutral-400">Consolidado de boletas y facturas para el estudio contable.</p>
          <button onClick={() => handleExport('EXCEL')} className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white rounded-xl">Descargar Cierre (XLSX)</button>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-3">
          <h3 className="font-bold text-white text-base">Padrón Activo de Socios</h3>
          <p className="text-xs text-neutral-400">Listado de clientes con vigencias y datos de contacto.</p>
          <button onClick={() => handleExport('PDF')} className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white rounded-xl">Descargar Padrón (PDF)</button>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-3">
          <h3 className="font-bold text-white text-base">Efectividad de Promociones</h3>
          <p className="text-xs text-neutral-400">Rendimiento por cupones y conversión de campañas.</p>
          <button onClick={() => handleExport('EXCEL')} className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white rounded-xl">Descargar Reporte (XLSX)</button>
        </div>
      </div>

    </div>
  );
};
