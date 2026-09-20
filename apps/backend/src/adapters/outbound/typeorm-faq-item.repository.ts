import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FaqItemRepository } from '../../domain/faq-item.repository';
import { FaqItem } from '../../domain/faq-item';
import { FaqItemOrmEntity } from './faq-item.orm-entity';

@Injectable()
export class TypeOrmFaqItemRepository implements FaqItemRepository {
  constructor(
    @InjectRepository(FaqItemOrmEntity)
    private readonly repository: Repository<FaqItemOrmEntity>,
  ) {}

  async findAll(): Promise<FaqItem[]> {
    const ormEntities = await this.repository.find({ order: { category: 'ASC' } });
    return ormEntities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<FaqItem | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async save(faq: FaqItem): Promise<FaqItem> {
    const saved = await this.repository.save(this.toOrm(faq));
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(ormEntity: FaqItemOrmEntity): FaqItem {
    const faq = new FaqItem();
    faq.id = ormEntity.id;
    faq.question = ormEntity.question;
    faq.answer = ormEntity.answer;
    faq.category = ormEntity.category;
    return faq;
  }

  private toOrm(faq: FaqItem): FaqItemOrmEntity {
    const ormEntity = new FaqItemOrmEntity();
    ormEntity.id = faq.id;
    ormEntity.question = faq.question;
    ormEntity.answer = faq.answer;
    ormEntity.category = faq.category;
    return ormEntity;
  }
}
