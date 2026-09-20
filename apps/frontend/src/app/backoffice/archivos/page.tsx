"use client";

import React from 'react';
import { MasterFileManager } from '../../../features/backoffice/components/MasterFileManager';
import { ModuleState } from '../../../features/backoffice/components/ModuleState';
import { useDeleteFile, useMasterFiles } from '../../../shared/api/hooks';

export default function ArchivosPage() {
  const { data: files = [], isLoading, error } = useMasterFiles();
  const deleteFile = useDeleteFile();

  if (isLoading || error) {
    return <ModuleState isLoading={isLoading} error={error} label="los archivos" />;
  }

  return (
    <MasterFileManager
      files={files}
      onDeleteFile={(id) => deleteFile.mutateAsync(id)}
      isSaving={deleteFile.isPending}
    />
  );
}
