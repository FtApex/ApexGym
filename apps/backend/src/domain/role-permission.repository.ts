import { RolePermission } from './role-permission';

export interface RolePermissionRepository {
  findAll(): Promise<RolePermission[]>;
  saveMany(permissions: RolePermission[]): Promise<RolePermission[]>;
}

export const ROLE_PERMISSION_REPOSITORY_TOKEN = Symbol('RolePermissionRepository');
