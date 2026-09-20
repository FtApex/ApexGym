import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('companies')
export class CompanyOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  ruc: string;

  @Column()
  razonSocial: string;

  @Column()
  logo: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  brandColor: string;

  @Column()
  status: 'ACTIVE' | 'INACTIVE';
}
