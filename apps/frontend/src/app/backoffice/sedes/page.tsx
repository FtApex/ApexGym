"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { SedesCrudView } from '../../../features/backoffice/components/SedesCrudView';
import {
  useBranches,
  useCreateBranch,
  useDeleteBranch,
  useUpdateBranch,
} from '../../../shared/api/hooks';
import { useCrudActions } from '../../../shared/api/useCrudActions';
import { ModuleState } from '../../../features/backoffice/components/ModuleState';

export default function SedesPage() {
  const router = useRouter();
  const { data: branches = [], isLoading, error } = useBranches();

  const actions = useCrudActions({
    create: useCreateBranch(),
    update: useUpdateBranch(),
    remove: useDeleteBranch(),
  });

  if (isLoading || error) {
    return <ModuleState isLoading={isLoading} error={error} label="las sedes" />;
  }

  return (
    <SedesCrudView
      branches={branches}
      onAddBranch={actions.add}
      onUpdateBranch={actions.update}
      onDeleteBranch={actions.remove}
      isSaving={actions.isSaving}
      onPreviewBranchLanding={(branch) => router.push(`/${branch.slug}`)}
    />
  );
}
