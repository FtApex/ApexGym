"use client";

import React from 'react';
import { SettingsView } from '../../../features/backoffice/components/SettingsView';
import { ModuleState } from '../../../features/backoffice/components/ModuleState';
import { useSettings, useUpdateSettings } from '../../../shared/api/hooks';

export default function ConfiguracionPage() {
  const { data: settings, isLoading, error } = useSettings();
  const updateSettings = useUpdateSettings();

  if (isLoading || error || !settings) {
    return <ModuleState isLoading={isLoading} error={error} label="los ajustes" />;
  }

  return (
    <SettingsView
      settings={settings}
      onSave={(payload) => updateSettings.mutate(payload)}
      isSaving={updateSettings.isPending}
      isSaved={updateSettings.isSuccess}
    />
  );
}
