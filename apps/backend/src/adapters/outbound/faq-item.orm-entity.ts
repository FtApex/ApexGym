import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('faq_items')
export class FaqItemOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column('text')
  question: string;

  @Column('text')
  answer: string;

  @Column()
  category: string;
}
