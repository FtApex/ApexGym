"use client";

import React, { useState } from 'react';
import { Users, Search, Plus, Filter, RefreshCw, CheckCircle2, Clock, X, Save, FileText } from 'lucide-react';
import { ClientMember, GymBranch, MembershipPlan } from '@apex/shared';
import { ActionButton, SubmitButton } from '../../../shared/components/ActionButton';
import { useSubmitGuard } from '../../../shared/hooks/useSubmitGuard';

interface ClientsCrudViewProps {
  clients: ClientMember[];
  branches: GymBranch[];
  memberships: MembershipPlan[];
  onAddClient: (client: ClientMember) => Promise<unknown>;
  onUpdateClient: (client: ClientMember) => Promise<unknown>;
  onRenewMembership: (clientId: string) => Promise<unknown>;
  /** True mientras una mutación está en curso; bloquea los botones. */
  isSaving?: boolean;
}

export const ClientsCrudView: React.FC<ClientsCrudViewProps> = ({
  clients,
  branches,
  memberships,
  onAddClient,
  onUpdateClient,
  onRenewMembership,
  isSaving = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [editingClient, setEditingClient] = useState<ClientMember | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const emptyClient: ClientMember = {
    id: `cli-${Date.now()}`,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    fullName: '',
    documentType: 'DNI',
    documentNumber: '',
    email: '',
    phone: '',
    branchId: branches[0]?.id || '',
    membershipId: memberships[0]?.id || '',
    membershipName: memberships[0]?.name || '',
    status: 'ACTIVE',
    joinDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    renewalsCount: 0
  };

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.documentNumber.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBranch = branchFilter === 'ALL' || c.branchId === branchFilter;
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;

    return matchesSearch && matchesBranch && matchesStatus;
  });

  const getBranchName = (bId: string) => {
    const found = branches.find(b => b.id === bId);
    return found ? found.name : 'Sede Principal';
  };

  const handleSaveInternal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient || isSaving) return;

    // El modal solo se cierra si la API confirmó el guardado; si falla, el
    // formulario permanece abierto con los datos que el usuario escribió
    // (el error ya se muestra por toast).
    try {
      await (isCreating ? onAddClient(editingClient) : onUpdateClient(editingClient));
      setEditingClient(null);
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
            <Users className="w-6 h-6 text-brand-primary" />
            <span>Gestión de Clientes y Socios</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Registro completo de padrón de socios, estado de membresías, renovaciones y observaciones.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingClient({ ...emptyClient });
            setIsCreating(true);
          }}
          className="px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-bold text-xs rounded-xl shadow-brand-glow flex items-center gap-2 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Inscribir Nuevo Socio</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Buscar por nombre, DNI, correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
          />
        </div>

        <select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          className="bg-neutral-950 border border-neutral-800 text-xs text-white py-2 px-3 rounded-xl focus:outline-none cursor-pointer"
        >
          <option value="ALL">Todas las Sedes</option>
          {branches.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-neutral-950 border border-neutral-800 text-xs text-white py-2 px-3 rounded-xl focus:outline-none cursor-pointer"
        >
          <option value="ALL">Todos los Estados</option>
          <option value="ACTIVE">Activos</option>
          <option value="EXPIRED">Vencidos</option>
          <option value="PENDING">Pendiente Pago</option>
        </select>
      </div>

      {/* DataTable */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
              <th className="pb-3 px-2">Socio</th>
              <th className="pb-3 px-2">Documento / Teléfono</th>
              <th className="pb-3 px-2">Sede</th>
              <th className="pb-3 px-2">Membresía</th>
              <th className="pb-3 px-2">Vencimiento</th>
              <th className="pb-3 px-2">Estado</th>
              <th className="pb-3 px-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {filteredClients.map((c) => (
              <tr key={c.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <img src={c.photoUrl} alt={c.fullName} className="w-9 h-9 rounded-full object-cover border border-neutral-700" />
                    <div>
                      <span className="font-bold text-white block">{c.fullName}</span>
                      <span className="text-[10px] text-neutral-400">{c.email}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className="font-mono text-neutral-300 block">{c.documentType}: {c.documentNumber}</span>
                  <span className="text-[10px] text-neutral-500">{c.phone}</span>
                </td>
                <td className="py-3 px-2 text-neutral-300">{getBranchName(c.branchId)}</td>
                <td className="py-3 px-2 font-bold text-brand-primary">{c.membershipName}</td>
                <td className="py-3 px-2 font-mono text-neutral-400">{c.expiryDate}</td>
                <td className="py-3 px-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    c.status === 'ACTIVE' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : c.status === 'EXPIRED'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-right space-x-1">
                  <ActionButton
                    onAction={() => onRenewMembership(c.id)}
                    isBusy={isSaving}
                    busyLabel="..."
                    icon={<RefreshCw className="w-3 h-3" />}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg inline-flex items-center gap-1 cursor-pointer"
                    title="Renovar Plan"
                  >
                    Renovar
                  </ActionButton>

                  <button
                    onClick={() => { setEditingClient(c); setIsCreating(false); }}
                    className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl text-white">
            <button onClick={() => setEditingClient(null)} className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full"><X className="w-5 h-5" /></button>
            <h3 className="text-2xl font-black text-white mb-4">{isCreating ? 'Inscribir Nuevo Socio' : 'Editar Datos de Socio'}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Nombre Completo</label>
                <input type="text" required value={editingClient.fullName} onChange={(e) => setEditingClient({ ...editingClient, fullName: e.target.value })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Documento N°</label>
                  <input type="text" required value={editingClient.documentNumber} onChange={(e) => setEditingClient({ ...editingClient, documentNumber: e.target.value })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Celular</label>
                  <input type="text" required value={editingClient.phone} onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Correo Electrónico</label>
                <input type="email" required value={editingClient.email} onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })} className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingClient(null)} className="px-4 py-2 bg-neutral-800 text-white rounded-xl text-xs font-bold">Cancelar</button>
                <SubmitButton isBusy={isSaving} icon={<Save className="w-4 h-4" />} className="px-6 py-2 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast rounded-xl text-xs font-bold shadow-brand-glow flex items-center gap-1.5 transition-all">Guardar Socio</SubmitButton>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
