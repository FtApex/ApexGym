import { RolePermission as RolePermissionContract, UserRole, PermissionModule } from '@apex/shared';

/** Una fila de la matriz RBAC: qué puede hacer un rol sobre un módulo. */
export class RolePermission implements RolePermissionContract {
  id: string;
  role: UserRole;
  module: PermissionModule;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}
