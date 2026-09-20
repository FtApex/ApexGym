import { SystemSettings as SystemSettingsContract } from '@apex/shared';

/** Ajustes globales singleton: marca, storage R2, pasarelas, analytics y SMTP. */
export class SystemSettings implements SystemSettingsContract {
  id: string;
  appName: string;
  brandColor: string;
  logoUrl: string;
  faviconUrl: string;
  r2Endpoint: string;
  r2BucketName: string;
  r2AccessKey: string;
  r2SecretKey: string;
  selectedGateway: 'MERCADOPAGO' | 'CULQI' | 'NIUBIZ' | 'IZIPAY';
  mercadoPagoPublicKey: string;
  mercadoPagoAccessToken: string;
  culqiPublicKey: string;
  niubizMerchantId: string;
  googleAnalyticsId: string;
  metaPixelId: string;
  whatsappNumber: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
}
