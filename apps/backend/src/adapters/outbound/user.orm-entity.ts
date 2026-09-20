import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import type { UserRole } from '@apex/shared';
import { CompanyOrmEntity } from './company.orm-entity';
import { BranchOrmEntity } from './branch.orm-entity';

@Entity('users')
export class UserOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  fullName: string;

  @Index({ unique: true })
  @Column()
  email: string;

  /** Hash bcrypt. Excluido de las respuestas HTTP por el mapper del repositorio. */
  @Column({ select: false })
  passwordHash: string;

  @Column()
  role: UserRole;

  @Column({ type: 'varchar', nullable: true })
  photoUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', nullable: true })
  companyId: string | null;

  @ManyToOne(() => CompanyOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'companyId' })
  company: CompanyOrmEntity | null;

  /** Null para roles globales (SUPER_ADMIN, COMPANY_ADMIN). */
  @Column({ type: 'varchar', nullable: true })
  branchId: string | null;

  @ManyToOne(() => BranchOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'branchId' })
  branch: BranchOrmEntity | null;

  @Column()
  status: 'ACTIVE' | 'INACTIVE';

  @Column({ type: 'varchar', nullable: true })
  lastLoginAt: string | null;

  @Column()
  createdAt: string;
}
