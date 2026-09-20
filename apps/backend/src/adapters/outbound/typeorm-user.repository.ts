import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user';
import { UserOrmEntity } from './user.orm-entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    const ormEntities = await this.repository.find({ order: { fullName: 'ASC' } });
    return ormEntities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<User | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  /**
   * Incluye `passwordHash` explícitamente porque la columna es `select: false`.
   * Solo el flujo de login debe usar este método.
   */
  async findByEmail(email: string): Promise<User | null> {
    const ormEntity = await this.repository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email })
      .getOne();
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async save(user: User): Promise<User> {
    const saved = await this.repository.save(this.toOrm(user));
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(ormEntity: UserOrmEntity): User {
    const user = new User();
    user.id = ormEntity.id;
    user.fullName = ormEntity.fullName;
    user.email = ormEntity.email;
    user.role = ormEntity.role;
    user.photoUrl = ormEntity.photoUrl ?? undefined;
    user.phone = ormEntity.phone ?? undefined;
    user.companyId = ormEntity.companyId ?? undefined;
    user.branchId = ormEntity.branchId ?? undefined;
    user.status = ormEntity.status;
    user.lastLoginAt = ormEntity.lastLoginAt ?? undefined;
    user.createdAt = ormEntity.createdAt;
    user.passwordHash = ormEntity.passwordHash;
    return user;
  }

  private toOrm(user: User): UserOrmEntity {
    const ormEntity = new UserOrmEntity();
    ormEntity.id = user.id;
    ormEntity.fullName = user.fullName;
    ormEntity.email = user.email;
    ormEntity.role = user.role;
    ormEntity.photoUrl = user.photoUrl ?? null;
    ormEntity.phone = user.phone ?? null;
    ormEntity.companyId = user.companyId ?? null;
    ormEntity.branchId = user.branchId ?? null;
    ormEntity.status = user.status;
    ormEntity.lastLoginAt = user.lastLoginAt ?? null;
    ormEntity.createdAt = user.createdAt;
    // Solo se asigna si viene poblado: un save parcial (p. ej. lastLoginAt)
    // no debe borrar el hash existente.
    if (user.passwordHash) {
      ormEntity.passwordHash = user.passwordHash;
    }
    return ormEntity;
  }
}
