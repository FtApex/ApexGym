"use client";

import React from 'react';
import { MembershipsCrudView } from '../../../features/backoffice/components/MembershipsCrudView';
import { ModuleState } from '../../../features/backoffice/components/ModuleState';
import {
  useCreateMembership,
  useDeleteMembership,
  useMemberships,
  useUpdateMembership,
} from '../../../shared/api/hooks';
import { useCrudActions } from '../../../shared/api/useCrudActions';

export default function MembresiasPage() {
  const { data: plans = [], isLoading, error } = useMemberships();

  const actions = useCrudActions({
    create: useCreateMembership(),
    update: useUpdateMembership(),
    remove: useDeleteMembership(),
  });

  if (isLoading || error) {
    return <ModuleState isLoading={isLoading} error={error} label="los planes" />;
  }

  return (
    <MembershipsCrudView
      plans={plans}
      onAddPlan={actions.add}
      onUpdatePlan={actions.update}
      onDeletePlan={actions.remove}
      isSaving={actions.isSaving}
    />
  );
}
