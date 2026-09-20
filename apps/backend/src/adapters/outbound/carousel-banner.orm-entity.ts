import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('carousel_banners')
export class CarouselBannerOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column('text')
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  buttonText: string;

  @Column()
  buttonUrl: string;

  /** Porcentaje de oscurecimiento del overlay sobre la imagen (0-100). */
  @Column()
  darkOverlay: number;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({ name: 'display_order' })
  order: number;

  @Column()
  status: 'ACTIVE' | 'INACTIVE' | 'SCHEDULED';
}
