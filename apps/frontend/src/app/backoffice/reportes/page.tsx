"use client";

import React from 'react';
import { ReportsView } from '../../../features/backoffice/components/ReportsView';
import { ModuleState } from '../../../features/backoffice/components/ModuleState';
import { useSales } from '../../../shared/api/hooks';

export default function ReportesPage() {
  const { data: invoices = [], isLoading, error } = useSales();

  if (isLoading || error) {
    return <ModuleState isLoading={isLoading} error={error} label="los reportes" />;
  }

  return <ReportsView invoices={invoices} />;
}
