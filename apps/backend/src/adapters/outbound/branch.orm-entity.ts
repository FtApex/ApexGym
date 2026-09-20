import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CompanyOrmEntity } from './company.orm-entity';

@Entity('branches')
export class BranchOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  companyId: string;

  @ManyToOne(() => CompanyOrmEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'companyId' })
  company: CompanyOrmEntity;

  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column('double')
  lat: number;

  @Column('double')
  lng: number;

  @Column()
  schedule: string;

  @Column()
  phone: string;

  @Column()
  whatsapp: string;

  @Column()
  email: string;

  @Column()
  instagram: string;

  @Column()
  facebook: string;

  @Column()
  tiktok: string;

  @Column('json')
  photos: string[];

  @Column()
  logo: string;

  @Column()
  status: 'ACTIVE' | 'INACTIVE';

  @Column('json')
  services: string[];

  @Column()
  equipmentCount: number;

  @Column()
  trainersCount: number;
}
