import { SystemSettings } from './system-settings';

export interface SystemSettingsRepository {
  find(): Promise<SystemSettings | null>;
  save(settings: SystemSettings): Promise<SystemSettings>;
}

export const SYSTEM_SETTINGS_REPOSITORY_TOKEN = Symbol('SystemSettingsRepository');
