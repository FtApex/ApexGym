import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BranchOrmEntity } from './branch.orm-entity';

@Entity('trainers')
export class TrainerOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  photoUrl: string;

  @Column()
  fullName: string;

  @Column()
  specialty: string;

  @Column()
  schedule: string;

  @Column()
  branchId: string;

  @ManyToOne(() => BranchOrmEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'branchId' })
  branch: BranchOrmEntity;

  @Column('text')
  bio: string;

  @Column('json')
  socials: {
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
  };

  @Column()
  status: 'ACTIVE' | 'INACTIVE';
}
