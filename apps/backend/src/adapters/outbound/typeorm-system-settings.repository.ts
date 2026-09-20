import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSettingsRepository } from '../../domain/system-settings.repository';
import { SystemSettings } from '../../domain/system-settings';
import { SystemSettingsOrmEntity } from './system-settings.orm-entity';

/** Id fijo de la fila singleton de ajustes. */
export const SYSTEM_SETTINGS_ID = 'system';

@Injectable()
export class TypeOrmSystemSettingsRepository implements SystemSettingsRepository {
  constructor(
    @InjectRepository(SystemSettingsOrmEntity)
    private readonly repository: Repository<SystemSettingsOrmEntity>,
  ) {}

  async find(): Promise<SystemSettings | null> {
    const ormEntity = await this.repository.findOne({ where: { id: SYSTEM_SETTINGS_ID } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async save(settings: SystemSettings): Promise<SystemSettings> {
    const ormEntity = this.toOrm(settings);
    ormEntity.id = SYSTEM_SETTINGS_ID;
    const saved = await this.repository.save(ormEntity);
    return this.toDomain(saved);
  }

  private toDomain(ormEntity: SystemSettingsOrmEntity): SystemSettings {
    const settings = new SystemSettings();
    settings.id = ormEntity.id;
    settings.appName = ormEntity.appName;
    settings.brandColor = ormEntity.brandColor;
    settings.logoUrl = ormEntity.logoUrl;
    settings.faviconUrl = ormEntity.faviconUrl;
    settings.r2Endpoint = ormEntity.r2Endpoint;
    settings.r2BucketName = ormEntity.r2BucketName;
    settings.r2AccessKey = ormEntity.r2AccessKey;
    settings.r2SecretKey = ormEntity.r2SecretKey;
    settings.selectedGateway = ormEntity.selectedGateway;
    settings.mercadoPagoPublicKey = ormEntity.mercadoPagoPublicKey;
    settings.mercadoPagoAccessToken = ormEntity.mercadoPagoAccessToken;
    settings.culqiPublicKey = ormEntity.culqiPublicKey;
    settings.niubizMerchantId = ormEntity.niubizMerchantId;
    settings.googleAnalyticsId = ormEntity.googleAnalyticsId;
    settings.metaPixelId = ormEntity.metaPixelId;
    settings.whatsappNumber = ormEntity.whatsappNumber;
    settings.smtpHost = ormEntity.smtpHost;
    settings.smtpPort = ormEntity.smtpPort;
    settings.smtpUser = ormEntity.smtpUser;
    return settings;
  }

  private toOrm(settings: SystemSettings): SystemSettingsOrmEntity {
    const ormEntity = new SystemSettingsOrmEntity();
    ormEntity.id = settings.id;
    ormEntity.appName = settings.appName;
    ormEntity.brandColor = settings.brandColor;
    ormEntity.logoUrl = settings.logoUrl;
    ormEntity.faviconUrl = settings.faviconUrl;
    ormEntity.r2Endpoint = settings.r2Endpoint;
    ormEntity.r2BucketName = settings.r2BucketName;
    ormEntity.r2AccessKey = settings.r2AccessKey;
    ormEntity.r2SecretKey = settings.r2SecretKey;
    ormEntity.selectedGateway = settings.selectedGateway;
    ormEntity.mercadoPagoPublicKey = settings.mercadoPagoPublicKey;
    ormEntity.mercadoPagoAccessToken = settings.mercadoPagoAccessToken;
    ormEntity.culqiPublicKey = settings.culqiPublicKey;
    ormEntity.niubizMerchantId = settings.niubizMerchantId;
    ormEntity.googleAnalyticsId = settings.googleAnalyticsId;
    ormEntity.metaPixelId = settings.metaPixelId;
    ormEntity.whatsappNumber = settings.whatsappNumber;
    ormEntity.smtpHost = settings.smtpHost;
    ormEntity.smtpPort = settings.smtpPort;
    ormEntity.smtpUser = settings.smtpUser;
    return ormEntity;
  }
}
