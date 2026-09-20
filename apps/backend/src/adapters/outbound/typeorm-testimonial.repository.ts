import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestimonialRepository } from '../../domain/testimonial.repository';
import { Testimonial } from '../../domain/testimonial';
import { TestimonialOrmEntity } from './testimonial.orm-entity';

@Injectable()
export class TypeOrmTestimonialRepository implements TestimonialRepository {
  constructor(
    @InjectRepository(TestimonialOrmEntity)
    private readonly repository: Repository<TestimonialOrmEntity>,
  ) {}

  async findAll(): Promise<Testimonial[]> {
    const ormEntities = await this.repository.find({ order: { name: 'ASC' } });
    return ormEntities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<Testimonial | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async save(testimonial: Testimonial): Promise<Testimonial> {
    const saved = await this.repository.save(this.toOrm(testimonial));
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(ormEntity: TestimonialOrmEntity): Testimonial {
    const testimonial = new Testimonial();
    testimonial.id = ormEntity.id;
    testimonial.name = ormEntity.name;
    testimonial.role = ormEntity.role;
    testimonial.branch = ormEntity.branch;
    testimonial.photoUrl = ormEntity.photoUrl;
    testimonial.comment = ormEntity.comment;
    testimonial.rating = ormEntity.rating;
    return testimonial;
  }

  private toOrm(testimonial: Testimonial): TestimonialOrmEntity {
    const ormEntity = new TestimonialOrmEntity();
    ormEntity.id = testimonial.id;
    ormEntity.name = testimonial.name;
    ormEntity.role = testimonial.role;
    ormEntity.branch = testimonial.branch;
    ormEntity.photoUrl = testimonial.photoUrl;
    ormEntity.comment = testimonial.comment;
    ormEntity.rating = testimonial.rating;
    return ormEntity;
  }
}
