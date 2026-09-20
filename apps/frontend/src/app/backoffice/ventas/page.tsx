"use client";

import React from 'react';
import { SalesCrudView } from '../../../features/backoffice/components/SalesCrudView';
import { ModuleState } from '../../../features/backoffice/components/ModuleState';
import { useSales } from '../../../shared/api/hooks';

export default function VentasPage() {
  const { data: invoices = [], isLoading, error } = useSales();

  if (isLoading || error) {
    return <ModuleState isLoading={isLoading} error={error} label="las ventas" />;
  }

  return <SalesCrudView invoices={invoices} />;
}
