import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchRepository } from '../../domain/branch.repository';
import { Branch } from '../../domain/branch';
import { BranchOrmEntity } from './branch.orm-entity';

@Injectable()
export class TypeOrmBranchRepository implements BranchRepository {
  constructor(
    @InjectRepository(BranchOrmEntity)
    private readonly repository: Repository<BranchOrmEntity>,
  ) {}

  async findAll(): Promise<Branch[]> {
    const ormEntities = await this.repository.find({ order: { name: 'ASC' } });
    return ormEntities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<Branch | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findBySlug(slug: string): Promise<Branch | null> {
    const ormEntity = await this.repository.findOne({ where: { slug } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async save(branch: Branch): Promise<Branch> {
    const saved = await this.repository.save(this.toOrm(branch));
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(ormEntity: BranchOrmEntity): Branch {
    const branch = new Branch();
    branch.id = ormEntity.id;
    branch.companyId = ormEntity.companyId;
    branch.slug = ormEntity.slug;
    branch.name = ormEntity.name;
    branch.address = ormEntity.address;
    branch.city = ormEntity.city;
    branch.lat = Number(ormEntity.lat);
    branch.lng = Number(ormEntity.lng);
    branch.schedule = ormEntity.schedule;
    branch.phone = ormEntity.phone;
    branch.whatsapp = ormEntity.whatsapp;
    branch.email = ormEntity.email;
    branch.instagram = ormEntity.instagram;
    branch.facebook = ormEntity.facebook;
    branch.tiktok = ormEntity.tiktok;
    branch.photos = ormEntity.photos ?? [];
    branch.logo = ormEntity.logo;
    branch.status = ormEntity.status;
    branch.services = ormEntity.services ?? [];
    branch.equipmentCount = ormEntity.equipmentCount;
    branch.trainersCount = ormEntity.trainersCount;
    return branch;
  }

  private toOrm(branch: Branch): BranchOrmEntity {
    const ormEntity = new BranchOrmEntity();
    ormEntity.id = branch.id;
    ormEntity.companyId = branch.companyId;
    ormEntity.slug = branch.slug;
    ormEntity.name = branch.name;
    ormEntity.address = branch.address;
    ormEntity.city = branch.city;
    ormEntity.lat = branch.lat;
    ormEntity.lng = branch.lng;
    ormEntity.schedule = branch.schedule;
    ormEntity.phone = branch.phone;
    ormEntity.whatsapp = branch.whatsapp;
    ormEntity.email = branch.email;
    ormEntity.instagram = branch.instagram;
    ormEntity.facebook = branch.facebook;
    ormEntity.tiktok = branch.tiktok;
    ormEntity.photos = branch.photos ?? [];
    ormEntity.logo = branch.logo;
    ormEntity.status = branch.status;
    ormEntity.services = branch.services ?? [];
    ormEntity.equipmentCount = branch.equipmentCount;
    ormEntity.trainersCount = branch.trainersCount;
    return ormEntity;
  }
}
