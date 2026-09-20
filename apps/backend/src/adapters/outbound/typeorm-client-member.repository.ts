import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientMemberRepository } from '../../domain/client-member.repository';
import { ClientMember } from '../../domain/client-member';
import { ClientMemberOrmEntity } from './client-member.orm-entity';

@Injectable()
export class TypeOrmClientMemberRepository implements ClientMemberRepository {
  constructor(
    @InjectRepository(ClientMemberOrmEntity)
    private readonly repository: Repository<ClientMemberOrmEntity>,
  ) {}

  async findAll(): Promise<ClientMember[]> {
    const ormEntities = await this.repository.find({ order: { fullName: 'ASC' } });
    return ormEntities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<ClientMember | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async save(client: ClientMember): Promise<ClientMember> {
    const ormEntity = this.toOrm(client);
    const saved = await this.repository.save(ormEntity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(ormEntity: ClientMemberOrmEntity): ClientMember {
    const client = new ClientMember();
    client.id = ormEntity.id;
    client.photoUrl = ormEntity.photoUrl;
    client.fullName = ormEntity.fullName;
    client.documentType = ormEntity.documentType;
    client.documentNumber = ormEntity.documentNumber;
    client.email = ormEntity.email;
    client.phone = ormEntity.phone;
    client.branchId = ormEntity.branchId;
    client.membershipId = ormEntity.membershipId;
    client.membershipName = ormEntity.membershipName;
    client.status = ormEntity.status;
    client.joinDate = ormEntity.joinDate;
    client.expiryDate = ormEntity.expiryDate;
    client.renewalsCount = ormEntity.renewalsCount;
    client.notes = ormEntity.notes ?? undefined;
    return client;
  }

  private toOrm(client: ClientMember): ClientMemberOrmEntity {
    const ormEntity = new ClientMemberOrmEntity();
    ormEntity.id = client.id;
    ormEntity.photoUrl = client.photoUrl;
    ormEntity.fullName = client.fullName;
    ormEntity.documentType = client.documentType;
    ormEntity.documentNumber = client.documentNumber;
    ormEntity.email = client.email;
    ormEntity.phone = client.phone;
    ormEntity.branchId = client.branchId;
    ormEntity.membershipId = client.membershipId;
    ormEntity.membershipName = client.membershipName;
    ormEntity.status = client.status;
    ormEntity.joinDate = client.joinDate;
    ormEntity.expiryDate = client.expiryDate;
    ormEntity.renewalsCount = client.renewalsCount;
    ormEntity.notes = client.notes ?? null;
    return ormEntity;
  }
}
