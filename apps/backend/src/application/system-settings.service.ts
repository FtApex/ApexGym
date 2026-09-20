import { Injectable, Inject } from '@nestjs/common';
import { SystemSettings } from '../domain/system-settings';
import type { SystemSettingsRepository } from '../domain/system-settings.repository';
import { SYSTEM_SETTINGS_REPOSITORY_TOKEN } from '../domain/system-settings.repository';

/** Campos que nunca deben viajar al cliente en texto plano. */
const SECRET_FIELDS = ['r2SecretKey', 'mercadoPagoAccessToken'] as const;

const MASK = '••••••••';

@Injectable()
export class SystemSettingsService {
  constructor(
    @Inject(SYSTEM_SETTINGS_REPOSITORY_TOKEN)
    private readonly settingsRepository: SystemSettingsRepository,
  ) {}

  /** Devuelve los ajustes con las credenciales sensibles enmascaradas. */
  async getSettings(): Promise<SystemSettings | null> {
    const settings = await this.settingsRepository.find();
    if (!settings) return null;
    return this.mask(settings);
  }

  /**
   * Guarda los ajustes. Un secreto que llega enmascarado significa
   * "sin cambios", por lo que se conserva el valor almacenado.
   */
  async updateSettings(updatedData: Partial<SystemSettings>): Promise<SystemSettings> {
    const existing = await this.settingsRepository.find();
    const merged = Object.assign(existing ?? new SystemSettings(), updatedData);

    for (const field of SECRET_FIELDS) {
      if (!updatedData[field] || updatedData[field] === MASK) {
        merged[field] = existing?.[field] ?? '';
      }
    }

    const saved = await this.settingsRepository.save(merged);
    return this.mask(saved);
  }

  private mask(settings: SystemSettings): SystemSettings {
    const masked = Object.assign(new SystemSettings(), settings);
    for (const field of SECRET_FIELDS) {
      if (masked[field]) masked[field] = MASK;
    }
    return masked;
  }
}
