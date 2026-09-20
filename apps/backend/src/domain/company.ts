import { GymCompany } from '@apex/shared';

export class Company implements GymCompany {
  id: string;
  name: string;
  ruc: string;
  razonSocial: string;
  logo: string;
  email: string;
  phone: string;
  brandColor: string;
  status: 'ACTIVE' | 'INACTIVE';
}
