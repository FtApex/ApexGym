"use client";

import React from 'react';
import { PromotionsCrudView } from '../../../features/backoffice/components/PromotionsCrudView';
import { ModuleState } from '../../../features/backoffice/components/ModuleState';
import {
  useBranches,
  useCreatePromotion,
  useDeletePromotion,
  usePromotions,
  useUpdatePromotion,
} from '../../../shared/api/hooks';
import { useCrudActions } from '../../../shared/api/useCrudActions';

export default function PromocionesPage() {
  const { data: promotions = [], isLoading, error } = usePromotions();
  const { data: branches = [] } = useBranches();

  const actions = useCrudActions({
    create: useCreatePromotion(),
    update: useUpdatePromotion(),
    remove: useDeletePromotion(),
  });

  if (isLoading || error) {
    return <ModuleState isLoading={isLoading} error={error} label="las promociones" />;
  }

  return (
    <PromotionsCrudView
      promotions={promotions}
      branches={branches}
      onAddPromo={actions.add}
      onUpdatePromo={actions.update}
      onDeletePromo={actions.remove}
      isSaving={actions.isSaving}
    />
  );
}
