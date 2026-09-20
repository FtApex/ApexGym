"use client";

import React from 'react';
import { 
  DollarSign, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Tag, 
  ArrowUpRight, 
  Calendar, 
  Sparkles,
  ArrowDownRight,
  UserCheck
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { SaleInvoice, ClientMember, Promotion } from '@apex/shared';

interface DashboardViewProps {
  invoices?: SaleInvoice[];
  clients?: ClientMember[];
  promotions?: Promotion[];
  selectedBranchId?: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  invoices = [],
  clients = [],
  promotions = [],
  selectedBranchId = 'ALL'
}) => {
  // Filter data by selected branch
  const filteredInvoices = selectedBranchId === 'ALL' 
    ? (invoices || []) 
    : (invoices || []).filter(i => i.branchId === selectedBranchId);

  const filteredClients = selectedBranchId === 'ALL'
    ? (clients || [])
    : (clients || []).filter(c => c.branchId === selectedBranchId);

  const completedInvoices = filteredInvoices.filter((i) => i.status === 'COMPLETED');
  const totalSales = completedInvoices.reduce((acc, curr) => acc + curr.total, 0);
  const activeClientsCount = filteredClients.filter((c) => c.status === 'ACTIVE').length;
  const expiredClientsCount = filteredClients.filter((c) => c.status === 'EXPIRED').length;
  const activePromotions = promotions.filter((p) => p.status === 'ACTIVE');

  // Porcentaje de socios vigentes sobre el padrón de la sede seleccionada.
  const retentionRate = filteredClients.length
    ? (activeClientsCount / filteredClients.length) * 100
    : 0;

  const ticketPromedio = completedInvoices.length ? totalSales / completedInvoices.length : 0;

  /** Ventas agrupadas por día, derivadas de los comprobantes reales. */
  const chartData = Object.entries(
    completedInvoices.reduce<Record<string, number>>((acc, invoice) => {
      const day = invoice.date.split(' ')[0];
      acc[day] = (acc[day] ?? 0) + invoice.total;
      return acc;
    }, {}),
  )
    .map(([day, ventas]) => ({ day, ventas }))
    .sort((a, b) => a.day.localeCompare(b.day));

  /** Las 5 ventas más recientes, para la tabla de actividad. */
  const recentInvoices = [...filteredInvoices]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const currency = (value: number) =>
    value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Dashboard Ejecutivo BackOffice</span>
            <span className="px-2.5 py-0.5 bg-brand-primary-alpha text-brand-primary border border-brand-primary-alpha text-[10px] font-extrabold uppercase rounded-full">
              Real-time
            </span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Resumen consolidado de ventas, socios activos, promociones y rendimiento por sede.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-300 font-bold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-primary" />
            <span>Julio 2026</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Ventas acumuladas */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Ventas Cobradas</p>
          <p className="mt-2 text-3xl font-bold text-white">S/{currency(totalSales)}</p>
          <div className="mt-2 flex items-center text-xs text-zinc-500">
            <span>{completedInvoices.length} comprobantes completados</span>
          </div>
        </div>

        {/* KPI 2: Clientes Activos */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Clientes Activos</p>
          <p className="mt-2 text-3xl font-bold text-white">{activeClientsCount.toLocaleString('es-PE')}</p>
          <div className="mt-2 flex items-center text-xs text-zinc-500">
            <span>de {filteredClients.length} socios registrados</span>
          </div>
        </div>

        {/* KPI 3: Retención */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Retención</p>
          <p className="mt-2 text-3xl font-bold text-white">{retentionRate.toFixed(1)}%</p>
          <div className={`mt-2 flex items-center text-xs ${expiredClientsCount ? 'text-rose-400' : 'text-green-400'}`}>
            {expiredClientsCount ? (
              <ArrowDownRight className="mr-1 h-3.5 w-3.5" />
            ) : (
              <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
            )}
            <span>{expiredClientsCount} membresías vencidas</span>
          </div>
        </div>

        {/* KPI 4: Ticket promedio */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Ticket Promedio</p>
          <p className="mt-2 text-3xl font-bold text-white">S/{currency(ticketPromedio)}</p>
          <div className="mt-2 flex items-center text-xs text-zinc-500">
            <span>{activePromotions.length} promociones activas</span>
          </div>
        </div>

      </div>

      {/* Main Visual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Rendimiento de Ventas (7 días)</h3>
            <div className="flex gap-2">
              <div className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]"></div>
              <div className="h-2 w-2 rounded-full bg-zinc-700"></div>
            </div>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E11D48" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#E11D48" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="day" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="ventas" stroke="#E11D48" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Promotions / Campañas Activas */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col justify-between">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Campañas Activas</h3>
            <div className="space-y-4">
              {activePromotions.length === 0 && (
                <p className="text-xs text-zinc-500 py-4">No hay promociones activas.</p>
              )}
              {activePromotions.slice(0, 4).map((promo) => (
                <div key={promo.id} className="flex items-center gap-3 rounded-xl bg-zinc-950 p-3">
                  <div
                    className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center font-bold text-xs"
                    style={{ backgroundColor: `${promo.color}33`, color: promo.color }}
                  >
                    -{promo.discountPercentage}%
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{promo.title}</p>
                    <p className="text-[10px] text-zinc-500">Vence el {promo.endDate}</p>
                  </div>
                  <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-400">
                    {promo.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Recent Activity Table (Últimas Inscripciones) */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-white">Últimas Ventas</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-zinc-500 border-b border-zinc-800">
              <th className="px-6 py-3 font-medium">Cliente</th>
              <th className="px-6 py-3 font-medium">Plan</th>
              <th className="px-6 py-3 font-medium">Estado</th>
              <th className="px-6 py-3 font-medium">Monto</th>
              <th className="px-6 py-3 font-medium text-right">Fecha</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {recentInvoices.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                  Aún no hay ventas registradas.
                </td>
              </tr>
            )}
            {recentInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                <td className="px-6 py-3 font-medium text-white">{invoice.clientName}</td>
                <td className="px-6 py-3 text-zinc-400">{invoice.membershipName}</td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${
                      invoice.status === 'COMPLETED'
                        ? 'bg-green-500/10 text-green-500'
                        : invoice.status === 'PENDING'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-rose-500/10 text-rose-500'
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-3 font-mono text-zinc-200">S/{currency(invoice.total)}</td>
                <td className="px-6 py-3 text-right text-zinc-500">{invoice.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
