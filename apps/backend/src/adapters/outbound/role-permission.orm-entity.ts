import { Entity, PrimaryColumn, Column, Unique } from 'typeorm';
import type { UserRole, PermissionModule } from '@apex/shared';

/** Matriz RBAC: una fila por combinación rol × módulo. */
@Entity('role_permissions')
@Unique('UQ_role_permissions_role_module', ['role', 'module'])
export class RolePermissionOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  role: UserRole;

  @Column()
  module: PermissionModule;

  @Column({ default: false })
  canView: boolean;

  @Column({ default: false })
  canCreate: boolean;

  @Column({ default: false })
  canEdit: boolean;

  @Column({ default: false })
  canDelete: boolean;
}
