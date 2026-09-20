import { randomUUID } from 'node:crypto';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { MasterFile } from '../domain/master-file';
import type { MasterFileRepository } from '../domain/master-file.repository';
import { MASTER_FILE_REPOSITORY_TOKEN } from '../domain/master-file.repository';
import type { StorageRepository, StorageUpload } from '../domain/storage.repository';
import { STORAGE_REPOSITORY_TOKEN } from '../domain/storage.repository';

/** Tipos MIME admitidos para un logotipo corporativo. */
const LOGO_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];

/** Tamaño máximo de un logotipo: 2 MB. */
const LOGO_MAX_BYTES = 2 * 1024 * 1024;

@Injectable()
export class MasterFileService {
  constructor(
    @Inject(MASTER_FILE_REPOSITORY_TOKEN)
    private readonly fileRepository: MasterFileRepository,
    @Inject(STORAGE_REPOSITORY_TOKEN)
    private readonly storageRepository: StorageRepository,
  ) {}

  async getAllFiles(): Promise<MasterFile[]> {
    return this.fileRepository.findAll();
  }

  async getFileById(id: string): Promise<MasterFile | null> {
    return this.fileRepository.findById(id);
  }

  async registerFile(file: MasterFile): Promise<MasterFile> {
    return this.fileRepository.save(file);
  }

  async deleteFile(id: string): Promise<void> {
    return this.fileRepository.delete(id);
  }

  /**
   * Sube un logotipo al bucket y registra sus metadatos en la carpeta `Logos`.
   * Devuelve el archivo persistido, cuya `url` es la que consume el frontend.
   */
  async uploadLogo(file: StorageUpload): Promise<MasterFile> {
    if (!LOGO_MIME_TYPES.includes(file.contentType)) {
      throw new BadRequestException(
        'Formato no admitido. Usa PNG, JPG, WEBP o SVG para el logotipo.',
      );
    }
    if (file.content.length > LOGO_MAX_BYTES) {
      throw new BadRequestException('El logotipo supera el tamaño máximo de 2 MB.');
    }

    const stored = await this.storageRepository.upload('Logos', file);

    const record = new MasterFile();
    record.id = randomUUID();
    record.name = file.fileName;
    record.folder = 'Logos';
    record.url = stored.url;
    record.sizeBytes = file.content.length;
    record.fileType = 'image';
    record.uploadDate = new Date().toISOString();

    return this.fileRepository.save(record);
  }
}
