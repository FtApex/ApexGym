"use client";

import React, { useState } from 'react';
import { Receipt, FileText, Download, Printer, Search, X, CheckCircle2, Building2 } from 'lucide-react';
import { SaleInvoice } from '@/shared/types';

interface SalesCrudViewProps {
  invoices: SaleInvoice[];
}

export const SalesCrudView: React.FC<SalesCrudViewProps> = ({ invoices }) => {
  const [selectedInvoice, setSelectedInvoice] = useState<SaleInvoice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.clientDoc.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Receipt className="w-6 h-6 text-brand-primary" />
            <span>Gestión de Ventas y Comprobantes SUNAT</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Registro detallado de Boletas y Facturas electrónicas emitidas con visor imprimible.
          </p>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Buscar por N° comprobante (ej. B001-000482), cliente o RUC/DNI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
              <th className="pb-3 px-2">N° Comprobante</th>
              <th className="pb-3 px-2">Tipo</th>
              <th className="pb-3 px-2">Cliente / RUC</th>
              <th className="pb-3 px-2">Sede</th>
              <th className="pb-3 px-2">Membresía</th>
              <th className="pb-3 px-2">Pasarela</th>
              <th className="pb-3 px-2">Monto Total</th>
              <th className="pb-3 px-2 text-right">Comprobante</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="py-3 px-2 font-mono font-bold text-brand-primary">{inv.invoiceNumber}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${inv.documentType === 'FACTURA' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {inv.documentType}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="font-bold text-white block">{inv.clientName}</span>
                  <span className="text-[10px] text-neutral-500 font-mono">Doc: {inv.clientDoc}</span>
                </td>
                <td className="py-3 px-2 text-neutral-300">{inv.branchName}</td>
                <td className="py-3 px-2 font-semibold text-brand-primary">{inv.membershipName}</td>
                <td className="py-3 px-2 font-mono text-neutral-400">{inv.paymentMethod}</td>
                <td className="py-3 px-2 font-black text-emerald-400 text-sm">S/{inv.total.toFixed(2)}</td>
                <td className="py-3 px-2 text-right">
                  <button
                    onClick={() => setSelectedInvoice(inv)}
                    className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-[11px] rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Ver Boleta</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Printable Receipt Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white text-neutral-900 rounded-3xl p-6 sm:p-8 shadow-2xl font-mono text-xs">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-black rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1 pb-4 border-b border-dashed border-neutral-300">
              <h3 className="font-black text-lg tracking-tight">APEXGYM PERU S.A.C.</h3>
              <p className="text-[11px] text-neutral-600">RUC: 20601234567</p>
              <p className="text-[10px] text-neutral-500">{selectedInvoice.branchName}</p>
              <div className="pt-2">
                <span className="font-black text-rose-600 text-sm">{selectedInvoice.documentType} ELECTRÓNICA</span>
                <p className="font-bold text-neutral-800">{selectedInvoice.invoiceNumber}</p>
              </div>
            </div>

            <div className="py-3 space-y-1 border-b border-dashed border-neutral-300">
              <p><strong>Cliente:</strong> {selectedInvoice.clientName}</p>
              <p><strong>DNI/RUC:</strong> {selectedInvoice.clientDoc}</p>
              <p><strong>Fecha Emisión:</strong> {selectedInvoice.date}</p>
              <p><strong>Medio de Pago:</strong> {selectedInvoice.paymentMethod}</p>
            </div>

            <div className="py-3 space-y-2 border-b border-dashed border-neutral-300">
              <div className="flex justify-between font-bold">
                <span>DESCRIPCIÓN</span>
                <span>IMPORTE</span>
              </div>
              <div className="flex justify-between">
                <span>{selectedInvoice.membershipName}</span>
                <span>S/{selectedInvoice.subtotal.toFixed(2)}</span>
              </div>
              {selectedInvoice.discount > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>Descuento Aplicado</span>
                  <span>-S/{selectedInvoice.discount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="pt-3 space-y-1 text-right">
              <div className="flex justify-between font-black text-sm">
                <span>TOTAL A PAGAR:</span>
                <span>S/{selectedInvoice.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-6 flex justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 bg-neutral-900 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Ticket</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
