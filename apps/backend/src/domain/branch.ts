import { GymBranch } from '@apex/shared';

export class Branch implements GymBranch {
  id: string;
  companyId: string;
  slug: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  schedule: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  photos: string[];
  logo: string;
  status: 'ACTIVE' | 'INACTIVE';
  services: string[];
  equipmentCount: number;
  trainersCount: number;
}
