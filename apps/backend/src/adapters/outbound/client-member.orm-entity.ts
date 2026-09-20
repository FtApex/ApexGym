import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BranchOrmEntity } from './branch.orm-entity';
import { MembershipPlanOrmEntity } from './membership-plan.orm-entity';

@Entity('client_members')
export class ClientMemberOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  photoUrl: string;

  @Column()
  fullName: string;

  @Column()
  documentType: 'DNI' | 'CE' | 'PASSPORT';

  @Column({ unique: true })
  documentNumber: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  branchId: string;

  @ManyToOne(() => BranchOrmEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'branchId' })
  branch: BranchOrmEntity;

  @Column()
  membershipId: string;

  @ManyToOne(() => MembershipPlanOrmEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'membershipId' })
  membership: MembershipPlanOrmEntity;

  @Column()
  membershipName: string;

  @Column()
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'FROZEN';

  @Column()
  joinDate: string;

  @Column()
  expiryDate: string;

  @Column()
  renewalsCount: number;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
