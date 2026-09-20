import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import type { PromoStatus } from '@apex/shared';
import { BranchOrmEntity } from './branch.orm-entity';
import { MembershipPlanOrmEntity } from './membership-plan.orm-entity';

@Entity('promotions')
export class PromotionOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  imageUrl: string;

  @Column({ type: 'varchar', nullable: true })
  bannerUrl: string | null;

  /**
   * Null representa el valor 'ALL' del dominio: la promoción aplica a todas
   * las sedes. El mapper traduce entre null (BD) y 'ALL' (dominio).
   */
  @Column({ type: 'varchar', nullable: true })
  branchId: string | null;

  @ManyToOne(() => BranchOrmEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'branchId' })
  branch: BranchOrmEntity | null;

  @Column({ type: 'varchar', nullable: true })
  membershipId: string | null;

  @ManyToOne(() => MembershipPlanOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'membershipId' })
  membership: MembershipPlanOrmEntity | null;

  @Column('decimal', { precision: 10, scale: 2 })
  normalPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  offerPrice: number;

  @Column()
  discountPercentage: number;

  @Column()
  badge: 'NUEVO' | 'HOT' | 'LIMITADO';

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  priority: number;

  @Column()
  color: string;

  @Column()
  status: PromoStatus;
}
