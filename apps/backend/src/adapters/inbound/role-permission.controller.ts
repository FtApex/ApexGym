import { Controller, Get, Put, Body } from '@nestjs/common';
import { RolePermissionService } from '../../application/role-permission.service';
import { RolePermission } from '../../domain/role-permission';
import { Roles } from '../../infrastructure/auth/roles.decorator';

@Controller('permissions')
export class RolePermissionController {
  constructor(private readonly permissionService: RolePermissionService) {}

  @Get()
  async getMatrix(): Promise<RolePermission[]> {
    return this.permissionService.getMatrix();
  }

  @Put()
  @Roles('SUPER_ADMIN')
  async saveMatrix(@Body() permissions: RolePermission[]): Promise<RolePermission[]> {
    return this.permissionService.saveMatrix(permissions);
  }
}
