"use client";

import React, { useEffect, useState } from 'react';
import { ShieldAlert, Save, Check, Loader2 } from 'lucide-react';
import { PermissionModule, RolePermission, UserRole } from '@/shared/types';

interface PermissionsViewProps {
  permissions: RolePermission[];
  onSave: (matrix: RolePermission[]) => void;
  isSaving: boolean;
  isSaved: boolean;
}

const ROLES: { role: UserRole; name: string }[] = [
  { role: 'SUPER_ADMIN', name: 'Super Admin SaaS' },
  { role: 'COMPANY_ADMIN', name: 'Admin Empresa' },
  { role: 'SEDE_ADMIN', name: 'Admin Sede' },
  { role: 'RECEPTION', name: 'Recepción' },
  { role: 'TRAINER', name: 'Entrenador / Coach' },
  { role: 'CLIENT', name: 'Socio / Cliente' },
];

const MODULE_LABELS: Record<PermissionModule, string> = {
  DASHBOARD: 'Dashboard Ejecutivo',
  COMPANIES: 'Gestión de Empresas & RUC',
  BRANCHES: 'Gestión de Sedes & Slugs',
  CLIENTS: 'Padrón de Clientes',
  MEMBERSHIPS: 'Crear / Editar Membresías',
  PROMOTIONS: 'Promociones Kanban',
  COUPONS: 'Cupones de Descuento',
  SALES: 'Ventas & Boletas SUNAT',
  FILES: 'Gestor de Archivos R2',
  CMS: 'Editor CMS Landing',
  REPORTS: 'Reportes Excel & PDF',
  SETTINGS: 'Configuración del Sistema',
  PERMISSIONS: 'Matriz de Permisos',
};

export const PermissionsView: React.FC<PermissionsViewProps> = ({
  permissions,
  onSave,
  isSaving,
  isSaved,
}) => {
  // Copia editable local; se reinicia cuando llegan datos nuevos del servidor.
  const [matrix, setMatrix] = useState<RolePermission[]>(permissions);

  useEffect(() => setMatrix(permissions), [permissions]);

  // Los módulos se derivan de lo que envía el backend, en orden estable.
  const modules = Array.from(new Set(matrix.map((p) => p.module)));

  const findRule = (role: UserRole, module: PermissionModule) =>
    matrix.find((p) => p.role === role && p.module === module);

  const toggleView = (role: UserRole, module: PermissionModule) => {
    setMatrix((current) =>
      current.map((rule) =>
        rule.role === role && rule.module === module
          ? { ...rule, canView: !rule.canView }
          : rule,
      ),
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-brand-primary" />
            <span>Matriz de Permisos & Control de Acceso (RBAC)</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Configuración fina de visibilidad y edición por rol de usuario en la plataforma.
          </p>
        </div>

        <button
          onClick={() => onSave(matrix)}
          disabled={isSaving}
          className="px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-60 disabled:cursor-not-allowed text-brand-primary-contrast font-bold text-xs rounded-xl shadow-brand-glow flex items-center gap-2 cursor-pointer transition-all"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Guardando...' : 'Guardar Matriz de Permisos'}</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Matriz de seguridad RBAC actualizada en base de datos.</span>
        </div>
      )}

      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
              <th className="pb-3 px-2">Módulo / Capacidad</th>
              {ROLES.map((r) => (
                <th key={r.role} className="pb-3 px-2 text-center">{r.name}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {modules.map((module) => (
              <tr key={module} className="hover:bg-neutral-800/50">
                <td className="py-3 px-2 font-bold text-white">
                  {MODULE_LABELS[module] ?? module}
                </td>
                {ROLES.map((r) => {
                  const rule = findRule(r.role, module);
                  return (
                    <td key={r.role} className="py-3 px-2 text-center">
                      <input
                        type="checkbox"
                        checked={rule?.canView ?? false}
                        disabled={!rule}
                        onChange={() => toggleView(r.role, module)}
                        className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary bg-neutral-950 border-neutral-700 cursor-pointer disabled:opacity-30"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
