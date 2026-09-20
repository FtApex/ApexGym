import { GymService as GymServiceContract } from './shared/types';

export class GymService implements GymServiceContract {
  id: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl: string;
  featured: boolean;
  order: number;
}
