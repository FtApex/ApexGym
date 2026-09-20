"use client";

import React, { useState } from 'react';
import { BackofficeSidebar, BackofficeTab } from '../../features/backoffice/components/BackofficeSidebar';
import { BackofficeTopbar } from '../../features/backoffice/components/BackofficeTopbar';
import { CommandPalette } from '../../features/backoffice/components/CommandPalette';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../shared/providers/AuthProvider';
import { useBranches, useCompany } from '../../shared/api/hooks';

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('ALL');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [showCommandPalette, setShowCommandPalette] = useState<boolean>(false);

  const { user, isLoading, logout } = useAuth();
  const { data: branches = [] } = useBranches();
  const { data: company } = useCompany();

  const pathname = usePathname();
  const router = useRouter();

  /** Pestañas cuyo id coincide con su segmento de ruta (`/backoffice/<id>`). */
  const TABS: BackofficeTab[] = [
    'empresa',
    'sedes',
    'membresias',
    'promociones',
    'cupones',
    'clientes',
    'entrenadores',
    'ventas',
    'archivos',
    'cms',
    'reportes',
    'configuracion',
    'permisos',
  ];

  /**
   * Deriva la pestaña activa del primer segmento tras `/backoffice`, en lugar
   * de encadenar comparaciones: así una ruta nueva nunca se queda sin resaltar
   * por olvido.
   */
  const getActiveTab = (): BackofficeTab => {
    const segment = pathname.split('/')[2];
    return TABS.find((tab) => tab === segment) ?? 'dashboard';
  };

  const handleTabSelect = (tab: BackofficeTab) => {
    if (tab === 'dashboard') router.push('/backoffice');
    else router.push(`/backoffice/${tab}`);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // El proxy ya bloquea el acceso sin cookie; esto cubre el instante en que
  // la sesión se está restaurando desde el token guardado.
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-400 text-sm animate-pulse">Verificando sesión...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      {/* Sidebar */}
      <BackofficeSidebar
        activeTab={getActiveTab()}
        onSelectTab={handleTabSelect}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole={user.role}
        onLogout={handleLogout}
        onGoToLanding={() => router.push('/')}
        brandName={company?.name ?? 'ApexGym'}
        brandLogo={company?.logo}
        userName={user.fullName}
        userEmail={user.email}
      />

      {/* Main Body */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        {/* Topbar */}
        <BackofficeTopbar
          branches={branches}
          selectedBranchId={selectedBranchId}
          onSelectBranch={setSelectedBranchId}
          userRole={user.role}
          onChangeRole={() => undefined}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onOpenCommandPalette={() => setShowCommandPalette(true)}
        />

        {/* Page Content */}
        <main className="p-6 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onNavigate={handleTabSelect}
      />
    </div>
  );
}
