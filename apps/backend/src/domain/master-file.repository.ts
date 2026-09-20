import { MasterFile } from './master-file';

export interface MasterFileRepository {
  findAll(): Promise<MasterFile[]>;
  findById(id: string): Promise<MasterFile | null>;
  save(file: MasterFile): Promise<MasterFile>;
  delete(id: string): Promise<void>;
}

export const MASTER_FILE_REPOSITORY_TOKEN = Symbol('MasterFileRepository');
