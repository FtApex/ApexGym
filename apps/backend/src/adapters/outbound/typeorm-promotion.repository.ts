import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromotionRepository } from '../../domain/promotion.repository';
import { Promotion } from '../../domain/promotion';
import { PromotionOrmEntity } from './promotion.orm-entity';

@Injectable()
export class TypeOrmPromotionRepository implements PromotionRepository {
  constructor(
    @InjectRepository(PromotionOrmEntity)
    private readonly repository: Repository<PromotionOrmEntity>,
  ) {}

  async findAll(): Promise<Promotion[]> {
    const ormEntities = await this.repository.find({ order: { priority: 'ASC' } });
    return ormEntities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<Promotion | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async save(promo: Promotion): Promise<Promotion> {
    const ormEntity = this.toOrm(promo);
    const saved = await this.repository.save(ormEntity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(ormEntity: PromotionOrmEntity): Promotion {
    const promo = new Promotion();
    promo.id = ormEntity.id;
    promo.title = ormEntity.title;
    promo.description = ormEntity.description;
    promo.imageUrl = ormEntity.imageUrl;
    promo.bannerUrl = ormEntity.bannerUrl ?? undefined;
    // En BD, null significa "todas las sedes"; el dominio lo expresa como 'ALL'.
    promo.branchId = ormEntity.branchId ?? 'ALL';
    promo.membershipId = ormEntity.membershipId ?? undefined;
    promo.normalPrice = Number(ormEntity.normalPrice);
    promo.offerPrice = Number(ormEntity.offerPrice);
    promo.discountPercentage = ormEntity.discountPercentage;
    promo.badge = ormEntity.badge;
    promo.startDate = ormEntity.startDate;
    promo.endDate = ormEntity.endDate;
    promo.priority = ormEntity.priority;
    promo.color = ormEntity.color;
    promo.status = ormEntity.status;
    return promo;
  }

  private toOrm(promo: Promotion): PromotionOrmEntity {
    const ormEntity = new PromotionOrmEntity();
    ormEntity.id = promo.id;
    ormEntity.title = promo.title;
    ormEntity.description = promo.description;
    ormEntity.imageUrl = promo.imageUrl;
    ormEntity.bannerUrl = promo.bannerUrl ?? null;
    ormEntity.branchId = !promo.branchId || promo.branchId === 'ALL' ? null : promo.branchId;
    ormEntity.membershipId = promo.membershipId ?? null;
    ormEntity.normalPrice = promo.normalPrice;
    ormEntity.offerPrice = promo.offerPrice;
    ormEntity.discountPercentage = promo.discountPercentage;
    ormEntity.badge = promo.badge;
    ormEntity.startDate = promo.startDate;
    ormEntity.endDate = promo.endDate;
    ormEntity.priority = promo.priority;
    ormEntity.color = promo.color;
    ormEntity.status = promo.status;
    return ormEntity;
  }
}
