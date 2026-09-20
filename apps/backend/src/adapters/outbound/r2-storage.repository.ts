import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  StorageRepository,
  StorageUpload,
  StoredObject,
} from '../../domain/storage.repository';

/**
 * Implementación del puerto de storage sobre Cloudflare R2, que expone una API
 * compatible con S3. Las credenciales viven en el .env; si faltan, el servicio
 * falla al usarse (no al arrancar) para no bloquear el resto de la aplicación
 * en entornos donde todavía no hay bucket configurado.
 */
@Injectable()
export class R2StorageRepository implements StorageRepository {
  private readonly logger = new Logger(R2StorageRepository.name);
  private readonly bucket: string;
  private readonly publicUrl: string;
  private readonly client: S3Client | null;

  constructor(private readonly config: ConfigService) {
    const accountId = this.config.get<string>('R2_ACCOUNT_ID');
    const accessKeyId = this.config.get<string>('R2_ACCESS_KEY_ID');
    const secretAccessKey = this.config.get<string>('R2_SECRET_ACCESS_KEY');
    this.bucket = this.config.get<string>('R2_BUCKET') ?? '';
    // Sin barra final, para componer las URLs sin dobles separadores.
    this.publicUrl = (this.config.get<string>('R2_PUBLIC_URL') ?? '').replace(/\/+$/, '');

    if (!accountId || !accessKeyId || !secretAccessKey || !this.bucket || !this.publicUrl) {
      this.logger.warn(
        'Credenciales de R2 incompletas: la subida de archivos estará deshabilitada.',
      );
      this.client = null;
      return;
    }

    this.client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
    });
  }

  async upload(folder: string, file: StorageUpload): Promise<StoredObject> {
    const client = this.requireClient();
    // El nombre original puede repetirse o traer caracteres problemáticos: se
    // conserva solo la extensión y se antepone un UUID como clave única.
    const key = `${folder}/${randomUUID()}${extname(file.fileName).toLowerCase()}`;

    try {
      await client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file.content,
          ContentType: file.contentType,
        }),
      );
    } catch (error) {
      this.logger.error(`Fallo al subir "${key}" a R2`, error as Error);
      throw new InternalServerErrorException('No se pudo subir el archivo al almacenamiento.');
    }

    return { key, url: `${this.publicUrl}/${key}` };
  }

  async delete(key: string): Promise<void> {
    const client = this.requireClient();
    try {
      await client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
    } catch (error) {
      this.logger.error(`Fallo al eliminar "${key}" de R2`, error as Error);
      throw new InternalServerErrorException('No se pudo eliminar el archivo del almacenamiento.');
    }
  }

  private requireClient(): S3Client {
    if (!this.client) {
      throw new InternalServerErrorException(
        'El almacenamiento R2 no está configurado. Revisa las variables R2_* del entorno.',
      );
    }
    return this.client;
  }
}
