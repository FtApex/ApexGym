import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { GymServiceService } from '../../application/gym-service.service';
import { GymService } from '../../domain/gym-service';
import { Public } from '../../infrastructure/auth/public.decorator';

@Controller('services')
export class GymServiceController {
  constructor(private readonly gymServiceService: GymServiceService) {}

  @Public()
  @Get()
  async getAll(): Promise<GymService[]> {
    return this.gymServiceService.getAllServices();
  }

  @Public()
  @Get(':id')
  async getById(@Param('id') id: string): Promise<GymService> {
    const service = await this.gymServiceService.getServiceById(id);
    if (!service) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }
    return service;
  }

  @Post()
  async create(@Body() service: GymService): Promise<GymService> {
    return this.gymServiceService.createService(service);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() serviceData: Partial<GymService>,
  ): Promise<GymService> {
    const service = await this.gymServiceService.updateService(id, serviceData);
    if (!service) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado para actualizar`);
    }
    return service;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.gymServiceService.deleteService(id);
    return { message: `Servicio con ID ${id} eliminado correctamente` };
  }
}
