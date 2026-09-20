import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('testimonials')
export class TestimonialOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  role: string;

  /** Nombre visible de la sede; texto libre editorial, no es un FK. */
  @Column()
  branch: string;

  @Column()
  photoUrl: string;

  @Column('text')
  comment: string;

  @Column()
  rating: number;
}
