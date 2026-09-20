import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GymServiceRepository } from '../../domain/gym-service.repository';
import { GymService } from '../../domain/gym-service';
import { GymServiceOrmEntity } from './gym-service.orm-entity';

@Injectable()
export class TypeOrmGymServiceRepository implements GymServiceRepository {
  constructor(
    @InjectRepository(GymServiceOrmEntity)
    private readonly repository: Repository<GymServiceOrmEntity>,
  ) {}

  async findAll(): Promise<GymService[]> {
    const ormEntities = await this.repository.find({ order: { order: 'ASC' } });
    return ormEntities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<GymService | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async save(service: GymService): Promise<GymService> {
    const saved = await this.repository.save(this.toOrm(service));
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(ormEntity: GymServiceOrmEntity): GymService {
    const service = new GymService();
    service.id = ormEntity.id;
    service.title = ormEntity.title;
    service.description = ormEntity.description;
    service.iconName = ormEntity.iconName;
    service.imageUrl = ormEntity.imageUrl;
    service.featured = ormEntity.featured;
    service.order = ormEntity.order;
    return service;
  }

  private toOrm(service: GymService): GymServiceOrmEntity {
    const ormEntity = new GymServiceOrmEntity();
    ormEntity.id = service.id;
    ormEntity.title = service.title;
    ormEntity.description = service.description;
    ormEntity.iconName = service.iconName;
    ormEntity.imageUrl = service.imageUrl;
    ormEntity.featured = service.featured;
    ormEntity.order = service.order;
    return ormEntity;
  }
}
