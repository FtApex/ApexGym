import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { TrainerService } from '../../application/trainer.service';
import { Trainer } from '../../domain/trainer';
import { Public } from '../../infrastructure/auth/public.decorator';

@Controller('trainers')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Public()
  @Get()
  async getAll(): Promise<Trainer[]> {
    return this.trainerService.getAllTrainers();
  }

  @Public()
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Trainer> {
    const trainer = await this.trainerService.getTrainerById(id);
    if (!trainer) {
      throw new NotFoundException(`Entrenador con ID ${id} no encontrado`);
    }
    return trainer;
  }

  @Post()
  async create(@Body() trainer: Trainer): Promise<Trainer> {
    return this.trainerService.createTrainer(trainer);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() trainerData: Partial<Trainer>): Promise<Trainer> {
    const trainer = await this.trainerService.updateTrainer(id, trainerData);
    if (!trainer) {
      throw new NotFoundException(`Entrenador con ID ${id} no encontrado para actualizar`);
    }
    return trainer;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.trainerService.deleteTrainer(id);
    return { message: `Entrenador con ID ${id} eliminado correctamente` };
  }
}
