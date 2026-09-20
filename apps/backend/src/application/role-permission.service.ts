import { Injectable, Inject } from '@nestjs/common';
import { RolePermission } from '../domain/role-permission';
import type { RolePermissionRepository } from '../domain/role-permission.repository';
import { ROLE_PERMISSION_REPOSITORY_TOKEN } from '../domain/role-permission.repository';

@Injectable()
export class RolePermissionService {
  constructor(
    @Inject(ROLE_PERMISSION_REPOSITORY_TOKEN)
    private readonly permissionRepository: RolePermissionRepository,
  ) {}

  async getMatrix(): Promise<RolePermission[]> {
    return this.permissionRepository.findAll();
  }

  /** Guarda la matriz completa tal como la envía el backoffice. */
  async saveMatrix(permissions: RolePermission[]): Promise<RolePermission[]> {
    return this.permissionRepository.saveMany(permissions);
  }
}
