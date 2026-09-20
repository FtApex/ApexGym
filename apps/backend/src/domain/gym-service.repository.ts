import { GymService } from './gym-service';

export interface GymServiceRepository {
  findAll(): Promise<GymService[]>;
  findById(id: string): Promise<GymService | null>;
  save(service: GymService): Promise<GymService>;
  delete(id: string): Promise<void>;
}

export const GYM_SERVICE_REPOSITORY_TOKEN = Symbol('GymServiceRepository');
