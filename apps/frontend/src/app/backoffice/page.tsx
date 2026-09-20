"use client";

import React from 'react';
import { DashboardView } from '../../features/backoffice/components/DashboardView';
import { ModuleState } from '../../features/backoffice/components/ModuleState';
import { useClients, usePromotions, useSales } from '../../shared/api/hooks';

export default function BackofficeDashboardPage() {
  const { data: invoices = [], isLoading, error } = useSales();
  const { data: clients = [] } = useClients();
  const { data: promotions = [] } = usePromotions();

  if (isLoading || error) {
    return <ModuleState isLoading={isLoading} error={error} label="el dashboard" />;
  }

  return (
    <DashboardView
      invoices={invoices}
      clients={clients}
      promotions={promotions}
      selectedBranchId="ALL"
    />
  );
}
