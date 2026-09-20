import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasterFileRepository } from '../../domain/master-file.repository';
import { MasterFile } from '../../domain/master-file';
import { MasterFileOrmEntity } from './master-file.orm-entity';

@Injectable()
export class TypeOrmMasterFileRepository implements MasterFileRepository {
  constructor(
    @InjectRepository(MasterFileOrmEntity)
    private readonly repository: Repository<MasterFileOrmEntity>,
  ) {}

  async findAll(): Promise<MasterFile[]> {
    const ormEntities = await this.repository.find({ order: { uploadDate: 'DESC' } });
    return ormEntities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<MasterFile | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async save(file: MasterFile): Promise<MasterFile> {
    const saved = await this.repository.save(this.toOrm(file));
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(ormEntity: MasterFileOrmEntity): MasterFile {
    const file = new MasterFile();
    file.id = ormEntity.id;
    file.name = ormEntity.name;
    file.folder = ormEntity.folder;
    file.url = ormEntity.url;
    // MySQL devuelve BIGINT como string para no perder precisión.
    file.sizeBytes = Number(ormEntity.sizeBytes);
    file.fileType = ormEntity.fileType;
    file.uploadDate = ormEntity.uploadDate;
    return file;
  }

  private toOrm(file: MasterFile): MasterFileOrmEntity {
    const ormEntity = new MasterFileOrmEntity();
    ormEntity.id = file.id;
    ormEntity.name = file.name;
    ormEntity.folder = file.folder;
    ormEntity.url = file.url;
    ormEntity.sizeBytes = file.sizeBytes;
    ormEntity.fileType = file.fileType;
    ormEntity.uploadDate = file.uploadDate;
    return ormEntity;
  }
}
