"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  MapPin, 
  CreditCard, 
  Tag, 
  Ticket, 
  Users, 
  UserCheck, 
  Receipt, 
  FolderArchive, 
  Layout, 
  Settings, 
  BarChart3, 
  ShieldAlert, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Dumbbell
} from 'lucide-react';
import { UserRole } from '@apex/shared';

export type BackofficeTab = 
  | 'dashboard'
  | 'empresa'
  | 'sedes'
  | 'membresias'
  | 'promociones'
  | 'cupones'
  | 'clientes'
  | 'entrenadores'
  | 'ventas'
  | 'archivos'
  | 'cms'
  | 'reportes'
  | 'configuracion'
  | 'permisos';

interface BackofficeSidebarProps {
  activeTab: BackofficeTab;
  onSelectTab: (tab: BackofficeTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  userRole: UserRole;
  onLogout: () => void;
  onGoToLanding: () => void;
  /** Nombre comercial de la empresa, desde la API. */
  brandName: string;
  /** URL del logotipo corporativo; si falta, se muestran las iniciales. */
  brandLogo?: string;
  userName: string;
  userEmail: string;
}

export const BackofficeSidebar: React.FC<BackofficeSidebarProps> = ({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  userRole,
  onLogout,
  onGoToLanding,
  brandName,
  brandLogo,
  userName,
  userEmail
}) => {
  // Un logo roto no debe dejar el hueco vacío: se cae a las iniciales.
  const [logoFailed, setLogoFailed] = React.useState(false);
  const showLogo = Boolean(brandLogo) && !logoFailed;

  // Iniciales del nombre comercial para el logotipo compacto.
  const brandInitials = brandName
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');

  const menuGroups = [
    {
      title: 'PRINCIPAL',
      items: [
        { id: 'dashboard' as BackofficeTab, label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'ventas' as BackofficeTab, label: 'Ventas y Facturas', icon: <Receipt className="w-4 h-4" /> }
      ]
    },
    {
      title: 'OPERACIONES',
      items: [
        { id: 'empresa' as BackofficeTab, label: 'Gestión Empresas', icon: <Building2 className="w-4 h-4" /> },
        { id: 'sedes' as BackofficeTab, label: 'Gestión Sedes', icon: <MapPin className="w-4 h-4" /> },
        { id: 'clientes' as BackofficeTab, label: 'Clientes / Socios', icon: <Users className="w-4 h-4" /> },
        { id: 'entrenadores' as BackofficeTab, label: 'Entrenadores', icon: <UserCheck className="w-4 h-4" /> }
      ]
    },
    {
      title: 'COMERCIAL',
      items: [
        { id: 'membresias' as BackofficeTab, label: 'Membresías', icon: <CreditCard className="w-4 h-4" /> },
        { id: 'promociones' as BackofficeTab, label: 'Promociones Kanban', icon: <Tag className="w-4 h-4" /> },
        { id: 'cupones' as BackofficeTab, label: 'Cupones Descuento', icon: <Ticket className="w-4 h-4" /> }
      ]
    },
    {
      title: 'SISTEMA Y CMS',
      items: [
        { id: 'archivos' as BackofficeTab, label: 'Gestor Archivos R2', icon: <FolderArchive className="w-4 h-4" /> },
        { id: 'cms' as BackofficeTab, label: 'Editor CMS Landing', icon: <Layout className="w-4 h-4" /> },
        { id: 'reportes' as BackofficeTab, label: 'Reportes & Export', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'configuracion' as BackofficeTab, label: 'Configuración API', icon: <Settings className="w-4 h-4" /> },
        { id: 'permisos' as BackofficeTab, label: 'Matriz Permisos', icon: <ShieldAlert className="w-4 h-4" /> }
      ]
    }
  ];

  return (
    <aside className={`fixed left-0 top-0 bottom-0 z-30 bg-zinc-950 border-r border-zinc-800 text-zinc-300 transition-all duration-300 flex flex-col justify-between ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      
      {/* Top Brand Header */}
      <div>
        <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            {showLogo ? (
              // eslint-disable-next-line @next/next/no-img-element -- URL externa de R2, sin dominios configurados en next.config.
              <img
                src={brandLogo}
                alt={brandName}
                onError={() => setLogoFailed(true)}
                className="w-8 h-8 rounded-lg object-contain shrink-0 bg-zinc-900"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-brand-primary text-brand-primary-contrast font-bold flex items-center justify-center shrink-0 shadow-brand-glow">
                {brandInitials}
              </div>
            )}
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white truncate">{brandName}</span>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
            title={collapsed ? 'Expandir Sidebar' : 'Colapsar Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="p-3 space-y-6 max-h-[calc(100vh-140px)] overflow-y-auto">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              {!collapsed && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-3 py-1 block">
                  {group.title}
                </span>
              )}
              {group.items.map((item) => {
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-brand-primary text-brand-primary-contrast font-bold shadow-brand-glow'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                    } ${collapsed ? 'justify-center px-0' : ''}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className={isActive ? 'text-brand-primary-contrast' : 'text-zinc-400'}>
                      {item.icon}
                    </span>
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Profile & Landing Trigger */}
      <div className="p-3 border-t border-zinc-800/80 space-y-2 bg-zinc-950">
        <div className="flex items-center gap-3 rounded-xl bg-zinc-900 p-3 mb-2">
          <div className="h-8 w-8 rounded-full bg-zinc-700 shrink-0"></div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="truncate text-xs font-medium text-white">{userName}</p>
              <p className="truncate text-[10px] text-zinc-500">{userEmail}</p>
            </div>
          )}
        </div>

        <button
          onClick={onGoToLanding}
          className={`w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Ver Landing Pública"
        >
          <Layout className="w-4 h-4 text-rose-500" />
          {!collapsed && <span>Ver Landing Pública</span>}
        </button>

        <button
          onClick={onLogout}
          className={`w-full py-2 px-3 bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Cerrar Sesión"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Cerrar Sesión ({userRole})</span>}
        </button>
      </div>

    </aside>
  );
};
