import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainerRepository } from '../../domain/trainer.repository';
import { Trainer } from '../../domain/trainer';
import { TrainerOrmEntity } from './trainer.orm-entity';

@Injectable()
export class TypeOrmTrainerRepository implements TrainerRepository {
  constructor(
    @InjectRepository(TrainerOrmEntity)
    private readonly repository: Repository<TrainerOrmEntity>,
  ) {}

  async findAll(): Promise<Trainer[]> {
    const ormEntities = await this.repository.find({ order: { fullName: 'ASC' } });
    return ormEntities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<Trainer | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async save(trainer: Trainer): Promise<Trainer> {
    const ormEntity = this.toOrm(trainer);
    const saved = await this.repository.save(ormEntity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(ormEntity: TrainerOrmEntity): Trainer {
    const trainer = new Trainer();
    trainer.id = ormEntity.id;
    trainer.photoUrl = ormEntity.photoUrl;
    trainer.fullName = ormEntity.fullName;
    trainer.specialty = ormEntity.specialty;
    trainer.schedule = ormEntity.schedule;
    trainer.branchId = ormEntity.branchId;
    trainer.bio = ormEntity.bio;
    trainer.socials = ormEntity.socials ?? {};
    trainer.status = ormEntity.status;
    return trainer;
  }

  private toOrm(trainer: Trainer): TrainerOrmEntity {
    const ormEntity = new TrainerOrmEntity();
    ormEntity.id = trainer.id;
    ormEntity.photoUrl = trainer.photoUrl;
    ormEntity.fullName = trainer.fullName;
    ormEntity.specialty = trainer.specialty;
    ormEntity.schedule = trainer.schedule;
    ormEntity.branchId = trainer.branchId;
    ormEntity.bio = trainer.bio;
    ormEntity.socials = trainer.socials ?? {};
    ormEntity.status = trainer.status;
    return ormEntity;
  }
}
