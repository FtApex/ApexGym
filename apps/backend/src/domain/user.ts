import { User as UserContract, UserRole } from '@apex/shared';

/**
 * Usuario del sistema. `passwordHash` vive solo en el dominio y nunca se
 * expone por la API: los controllers devuelven el contrato `User` de
 * @apex/shared, que no lo incluye.
 */
export class User implements UserContract {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  photoUrl?: string;
  phone?: string;
  companyId?: string;
  branchId?: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastLoginAt?: string;
  createdAt: string;
  passwordHash: string;
}
