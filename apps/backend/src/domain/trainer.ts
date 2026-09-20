import { Trainer as SharedTrainer } from '@apex/shared';

export class Trainer implements SharedTrainer {
  id: string;
  photoUrl: string;
  fullName: string;
  specialty: string;
  schedule: string;
  branchId: string;
  bio: string;
  socials: {
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
  };
  status: 'ACTIVE' | 'INACTIVE';
}
