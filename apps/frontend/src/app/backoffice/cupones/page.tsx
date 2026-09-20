"use client";

import React from 'react';
import { CouponsCrudView } from '../../../features/backoffice/components/CouponsCrudView';
import { ModuleState } from '../../../features/backoffice/components/ModuleState';
import {
  useBranches,
  useCoupons,
  useCreateCoupon,
  useDeleteCoupon,
  useMemberships,
  useUpdateCoupon,
} from '../../../shared/api/hooks';
import { useCrudActions } from '../../../shared/api/useCrudActions';

export default function CuponesPage() {
  const { data: coupons = [], isLoading, error } = useCoupons();
  const { data: branches = [] } = useBranches();
  const { data: plans = [] } = useMemberships();

  const actions = useCrudActions({
    create: useCreateCoupon(),
    update: useUpdateCoupon(),
    remove: useDeleteCoupon(),
  });

  if (isLoading || error) {
    return <ModuleState isLoading={isLoading} error={error} label="los cupones" />;
  }

  return (
    <CouponsCrudView
      coupons={coupons}
      branches={branches}
      memberships={plans}
      onAddCoupon={actions.add}
      onUpdateCoupon={actions.update}
      onDeleteCoupon={actions.remove}
      isSaving={actions.isSaving}
    />
  );
}
