import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { MembershipPlanOrmEntity } from './membership-plan.orm-entity';
import { BranchOrmEntity } from './branch.orm-entity';

@Entity('coupons')
export class CouponOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @Column()
  type: 'PERCENTAGE' | 'FIXED_AMOUNT';

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  maxUses: number;

  @Column()
  currentUses: number;

  @Column()
  userLimit: number;

  @ManyToMany(() => MembershipPlanOrmEntity)
  @JoinTable({
    name: 'coupons_membership_plans',
    joinColumn: { name: 'couponId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'membershipPlanId', referencedColumnName: 'id' },
  })
  applicableMemberships: MembershipPlanOrmEntity[];

  @ManyToMany(() => BranchOrmEntity)
  @JoinTable({
    name: 'coupons_branches',
    joinColumn: { name: 'couponId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'branchId', referencedColumnName: 'id' },
  })
  applicableBranches: BranchOrmEntity[];

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
}
