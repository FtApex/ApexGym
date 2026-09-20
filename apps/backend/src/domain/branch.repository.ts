import { Branch } from './branch';

export interface BranchRepository {
  findAll(): Promise<Branch[]>;
  findById(id: string): Promise<Branch | null>;
  findBySlug(slug: string): Promise<Branch | null>;
  save(branch: Branch): Promise<Branch>;
  delete(id: string): Promise<void>;
}

export const BRANCH_REPOSITORY_TOKEN = Symbol('BranchRepository');
