import { Trainer } from './trainer';

export interface TrainerRepository {
  findAll(): Promise<Trainer[]>;
  findById(id: string): Promise<Trainer | null>;
  save(trainer: Trainer): Promise<Trainer>;
  delete(id: string): Promise<void>;
}

export const TRAINER_REPOSITORY_TOKEN = Symbol('TrainerRepository');
