import { LandingCmsConfig } from './landing-cms-config';

export interface LandingCmsConfigRepository {
  find(): Promise<LandingCmsConfig | null>;
  save(config: LandingCmsConfig): Promise<LandingCmsConfig>;
}

export const LANDING_CMS_CONFIG_REPOSITORY_TOKEN = Symbol('LandingCmsConfigRepository');
