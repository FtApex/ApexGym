"use client";

import React from 'react';
import { PermissionsView } from '../../../features/backoffice/components/PermissionsView';
import { ModuleState } from '../../../features/backoffice/components/ModuleState';
import { usePermissions, useSavePermissions } from '../../../shared/api/hooks';

export default function PermisosPage() {
  const { data: permissions = [], isLoading, error } = usePermissions();
  const savePermissions = useSavePermissions();

  if (isLoading || error) {
    return <ModuleState isLoading={isLoading} error={error} label="los permisos" />;
  }

  return (
    <PermissionsView
      permissions={permissions}
      onSave={(matrix) => savePermissions.mutate(matrix)}
      isSaving={savePermissions.isPending}
      isSaved={savePermissions.isSuccess}
    />
  );
}
