import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { BranchOrmEntity } from './branch.orm-entity';

@Entity('membership_plans')
export class MembershipPlanOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  durationMonths: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  originalPrice: number | null;

  @Column('json')
  benefits: string[];

  @Column()
  imageUrl: string;

  @Column({ type: 'varchar', nullable: true })
  badge: string | null;

  @Column()
  color: string;

  @Column()
  priority: number;

  @Column()
  visible: boolean;

  @Column()
  status: 'ACTIVE' | 'INACTIVE';

  @ManyToMany(() => BranchOrmEntity)
  @JoinTable({
    name: 'branches_membership_plans',
    joinColumn: { name: 'membershipPlanId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'branchId', referencedColumnName: 'id' },
  })
  branches: BranchOrmEntity[];
}
