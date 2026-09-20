import { Injectable, Inject } from '@nestjs/common';
import { GymService } from '../domain/gym-service';
import type { GymServiceRepository } from '../domain/gym-service.repository';
import { GYM_SERVICE_REPOSITORY_TOKEN } from '../domain/gym-service.repository';

@Injectable()
export class GymServiceService {
  constructor(
    @Inject(GYM_SERVICE_REPOSITORY_TOKEN)
    private readonly serviceRepository: GymServiceRepository,
  ) {}

  async getAllServices(): Promise<GymService[]> {
    return this.serviceRepository.findAll();
  }

  async getServiceById(id: string): Promise<GymService | null> {
    return this.serviceRepository.findById(id);
  }

  async createService(service: GymService): Promise<GymService> {
    return this.serviceRepository.save(service);
  }

  async updateService(id: string, updatedData: Partial<GymService>): Promise<GymService | null> {
    const existing = await this.serviceRepository.findById(id);
    if (!existing) return null;
    return this.serviceRepository.save(Object.assign(existing, updatedData, { id }));
  }

  async deleteService(id: string): Promise<void> {
    return this.serviceRepository.delete(id);
  }
}
