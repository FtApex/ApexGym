"use client";

import React from 'react';
import { CompanyCrudView } from '../../../features/backoffice/components/CompanyCrudView';
import { ModuleState } from '../../../features/backoffice/components/ModuleState';
import { useCompany, useUpdateCompany } from '../../../shared/api/hooks';

export default function EmpresaPage() {
  const { data: company, isLoading, error } = useCompany();
  const updateCompany = useUpdateCompany();

  if (isLoading || error || !company) {
    return <ModuleState isLoading={isLoading} error={error} label="la empresa" />;
  }

  return (
    <CompanyCrudView
      company={company}
      onUpdateCompany={(updated) => updateCompany.mutateAsync(updated)}
      isSaving={updateCompany.isPending}
      isSaved={updateCompany.isSuccess}
    />
  );
}
