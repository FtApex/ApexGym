import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('gym_services')
export class GymServiceOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  /** Identificador del icono de Lucide usado en la landing. */
  @Column()
  iconName: string;

  @Column()
  imageUrl: string;

  @Column()
  featured: boolean;

  @Column({ name: 'display_order' })
  order: number;
}
