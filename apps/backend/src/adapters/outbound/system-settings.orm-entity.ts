import { Entity, PrimaryColumn, Column } from 'typeorm';

/** Fila única (id fijo) con los ajustes globales de la plataforma. */
@Entity('system_settings')
export class SystemSettingsOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  appName: string;

  @Column()
  brandColor: string;

  @Column('text')
  logoUrl: string;

  @Column()
  faviconUrl: string;

  @Column({ default: '' })
  r2Endpoint: string;

  @Column({ default: '' })
  r2BucketName: string;

  @Column({ default: '' })
  r2AccessKey: string;

  @Column({ default: '' })
  r2SecretKey: string;

  @Column()
  selectedGateway: 'MERCADOPAGO' | 'CULQI' | 'NIUBIZ' | 'IZIPAY';

  @Column({ default: '' })
  mercadoPagoPublicKey: string;

  @Column({ default: '' })
  mercadoPagoAccessToken: string;

  @Column({ default: '' })
  culqiPublicKey: string;

  @Column({ default: '' })
  niubizMerchantId: string;

  @Column({ default: '' })
  googleAnalyticsId: string;

  @Column({ default: '' })
  metaPixelId: string;

  @Column({ default: '' })
  whatsappNumber: string;

  @Column({ default: '' })
  smtpHost: string;

  @Column({ default: 587 })
  smtpPort: number;

  @Column({ default: '' })
  smtpUser: string;
}
