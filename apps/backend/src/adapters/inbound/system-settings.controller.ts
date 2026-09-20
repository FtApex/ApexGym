import { Controller, Get, Put, Body, NotFoundException } from '@nestjs/common';
import { SystemSettingsService } from '../../application/system-settings.service';
import { SystemSettings } from '../../domain/system-settings';

@Controller('settings')
export class SystemSettingsController {
  constructor(private readonly settingsService: SystemSettingsService) {}

  @Get()
  async get(): Promise<SystemSettings> {
    const settings = await this.settingsService.getSettings();
    if (!settings) {
      throw new NotFoundException('Ajustes del sistema no encontrados');
    }
    return settings;
  }

  @Put()
  async update(@Body() settingsData: Partial<SystemSettings>): Promise<SystemSettings> {
    return this.settingsService.updateSettings(settingsData);
  }
}
