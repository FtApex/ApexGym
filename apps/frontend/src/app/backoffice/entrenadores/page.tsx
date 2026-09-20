"use client";

import React from 'react';
import { TrainersCrudView } from '../../../features/backoffice/components/TrainersCrudView';
import { ModuleState } from '../../../features/backoffice/components/ModuleState';
import {
  useBranches,
  useCreateTrainer,
  useDeleteTrainer,
  useTrainers,
  useUpdateTrainer,
} from '../../../shared/api/hooks';
import { useCrudActions } from '../../../shared/api/useCrudActions';

export default function EntrenadoresPage() {
  const { data: trainers = [], isLoading, error } = useTrainers();
  const { data: branches = [] } = useBranches();

  const actions = useCrudActions({
    create: useCreateTrainer(),
    update: useUpdateTrainer(),
    remove: useDeleteTrainer(),
  });

  if (isLoading || error) {
    return <ModuleState isLoading={isLoading} error={error} label="los entrenadores" />;
  }

  return (
    <TrainersCrudView
      trainers={trainers}
      branches={branches}
      onAddTrainer={actions.add}
      onUpdateTrainer={actions.update}
      onDeleteTrainer={actions.remove}
      isSaving={actions.isSaving}
    />
  );
}
