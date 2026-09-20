import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermissionRepository } from '../../domain/role-permission.repository';
import { RolePermission } from '../../domain/role-permission';
import { RolePermissionOrmEntity } from './role-permission.orm-entity';

@Injectable()
export class TypeOrmRolePermissionRepository implements RolePermissionRepository {
  constructor(
    @InjectRepository(RolePermissionOrmEntity)
    private readonly repository: Repository<RolePermissionOrmEntity>,
  ) {}

  async findAll(): Promise<RolePermission[]> {
    const ormEntities = await this.repository.find({
      order: { role: 'ASC', module: 'ASC' },
    });
    return ormEntities.map((entity) => this.toDomain(entity));
  }

  async saveMany(permissions: RolePermission[]): Promise<RolePermission[]> {
    const ormEntities = permissions.map((permission) => this.toOrm(permission));
    const saved = await this.repository.save(ormEntities);
    return saved.map((entity) => this.toDomain(entity));
  }

  private toDomain(ormEntity: RolePermissionOrmEntity): RolePermission {
    const permission = new RolePermission();
    permission.id = ormEntity.id;
    permission.role = ormEntity.role;
    permission.module = ormEntity.module;
    permission.canView = ormEntity.canView;
    permission.canCreate = ormEntity.canCreate;
    permission.canEdit = ormEntity.canEdit;
    permission.canDelete = ormEntity.canDelete;
    return permission;
  }

  private toOrm(permission: RolePermission): RolePermissionOrmEntity {
    const ormEntity = new RolePermissionOrmEntity();
    ormEntity.id = permission.id;
    ormEntity.role = permission.role;
    ormEntity.module = permission.module;
    ormEntity.canView = permission.canView;
    ormEntity.canCreate = permission.canCreate;
    ormEntity.canEdit = permission.canEdit;
    ormEntity.canDelete = permission.canDelete;
    return ormEntity;
  }
}
