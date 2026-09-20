import { ClientMember as SharedClientMember } from './shared/types';

export class ClientMember implements SharedClientMember {
  id: string;
  photoUrl: string;
  fullName: string;
  documentType: 'DNI' | 'CE' | 'PASSPORT';
  documentNumber: string;
  email: string;
  phone: string;
  branchId: string;
  membershipId: string;
  membershipName: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'FROZEN';
  joinDate: string;
  expiryDate: string;
  renewalsCount: number;
  notes?: string;
}
