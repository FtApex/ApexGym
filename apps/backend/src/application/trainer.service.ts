import { Injectable, Inject } from '@nestjs/common';
import { Trainer } from '../domain/trainer';
import type { TrainerRepository } from '../domain/trainer.repository';
import { TRAINER_REPOSITORY_TOKEN } from '../domain/trainer.repository';

@Injectable()
export class TrainerService {
  constructor(
    @Inject(TRAINER_REPOSITORY_TOKEN)
    private readonly repository: TrainerRepository,
  ) {}

  async getAllTrainers(): Promise<Trainer[]> {
    return this.repository.findAll();
  }

  async getTrainerById(id: string): Promise<Trainer | null> {
    return this.repository.findById(id);
  }

  async createTrainer(trainer: Trainer): Promise<Trainer> {
    return this.repository.save(trainer);
  }

  async updateTrainer(id: string, trainerData: Partial<Trainer>): Promise<Trainer | null> {
    const existing = await this.repository.findById(id);
    if (!existing) return null;
    const merged = Object.assign(existing, trainerData);
    return this.repository.save(merged);
  }

  async deleteTrainer(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
