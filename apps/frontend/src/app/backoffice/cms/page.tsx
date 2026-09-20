"use client";

import React from 'react';
import { CmsLandingEditor } from '../../../features/backoffice/components/CmsLandingEditor';
import { ModuleState } from '../../../features/backoffice/components/ModuleState';
import { useCmsLanding, useUpdateCmsLanding } from '../../../shared/api/hooks';

export default function CmsPage() {
  const { data: config, isLoading, error } = useCmsLanding();
  const updateConfig = useUpdateCmsLanding();

  if (isLoading || error || !config) {
    return <ModuleState isLoading={isLoading} error={error} label="la configuración del CMS" />;
  }

  return (
    <CmsLandingEditor
      config={config}
      onSave={(payload) => updateConfig.mutate(payload)}
      isSaving={updateConfig.isPending}
      isSaved={updateConfig.isSuccess}
    />
  );
}
