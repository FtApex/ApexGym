"use client";

import React from 'react';
import { ClientsCrudView } from '../../../features/backoffice/components/ClientsCrudView';
import { ModuleState } from '../../../features/backoffice/components/ModuleState';
import {
  useBranches,
  useClients,
  useCreateClient,
  useMemberships,
  useRenewClient,
  useUpdateClient,
} from '../../../shared/api/hooks';
import { useCrudActions } from '../../../shared/api/useCrudActions';

export default function ClientesPage() {
  const { data: clients = [], isLoading, error } = useClients();
  const { data: branches = [] } = useBranches();
  const { data: plans = [] } = useMemberships();

  const actions = useCrudActions({
    create: useCreateClient(),
    update: useUpdateClient(),
  });
  const renewClient = useRenewClient();

  if (isLoading || error) {
    return <ModuleState isLoading={isLoading} error={error} label="los clientes" />;
  }

  return (
    <ClientsCrudView
      clients={clients}
      branches={branches}
      memberships={plans}
      onAddClient={actions.add}
      onUpdateClient={actions.update}
      onRenewMembership={(clientId) => renewClient.mutateAsync(clientId)}
      isSaving={actions.isSaving || renewClient.isPending}
    />
  );
}
