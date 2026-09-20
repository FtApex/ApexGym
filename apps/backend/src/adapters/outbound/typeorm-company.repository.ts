import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyRepository } from '../../domain/company.repository';
import { Company } from '../../domain/company';
import { CompanyOrmEntity } from './company.orm-entity';

@Injectable()
export class TypeOrmCompanyRepository implements CompanyRepository {
  constructor(
    @InjectRepository(CompanyOrmEntity)
    private readonly repository: Repository<CompanyOrmEntity>,
  ) {}

  async find(): Promise<Company | null> {
    const ormEntity = await this.repository.findOne({ where: {} });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async save(company: Company): Promise<Company> {
    const ormEntity = this.toOrm(company);
    const saved = await this.repository.save(ormEntity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Company | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  private toDomain(ormEntity: CompanyOrmEntity): Company {
    const company = new Company();
    company.id = ormEntity.id;
    company.name = ormEntity.name;
    company.ruc = ormEntity.ruc;
    company.razonSocial = ormEntity.razonSocial;
    company.logo = ormEntity.logo;
    company.email = ormEntity.email;
    company.phone = ormEntity.phone;
    company.brandColor = ormEntity.brandColor;
    company.status = ormEntity.status;
    return company;
  }

  private toOrm(company: Company): CompanyOrmEntity {
    const ormEntity = new CompanyOrmEntity();
    ormEntity.id = company.id;
    ormEntity.name = company.name;
    ormEntity.ruc = company.ruc;
    ormEntity.razonSocial = company.razonSocial;
    ormEntity.logo = company.logo;
    ormEntity.email = company.email;
    ormEntity.phone = company.phone;
    ormEntity.brandColor = company.brandColor;
    ormEntity.status = company.status;
    return ormEntity;
  }
}
