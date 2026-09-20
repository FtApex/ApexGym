import { GymCompany } from './shared/types';

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
