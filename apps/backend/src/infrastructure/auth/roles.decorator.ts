import { SetMetadata } from '@nestjs/common';
import type { UserRole } from '../../domain/shared/types';

export const ROLES_KEY = 'roles';

/** Restringe un endpoint a los roles indicados. */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
