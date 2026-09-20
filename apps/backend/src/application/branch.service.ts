import { Injectable, Inject } from '@nestjs/common';
import { Branch } from '../domain/branch';
import type { BranchRepository } from '../domain/branch.repository';
import { BRANCH_REPOSITORY_TOKEN } from '../domain/branch.repository';

@Injectable()
export class BranchService {
  constructor(
    @Inject(BRANCH_REPOSITORY_TOKEN)
    private readonly branchRepository: BranchRepository,
  ) {}

  async getAllBranches(): Promise<Branch[]> {
    return this.branchRepository.findAll();
  }

  async getBranchById(id: string): Promise<Branch | null> {
    return this.branchRepository.findById(id);
  }

  async getBranchBySlug(slug: string): Promise<Branch | null> {
    return this.branchRepository.findBySlug(slug);
  }

  async createBranch(branch: Branch): Promise<Branch> {
    return this.branchRepository.save(branch);
  }

  async updateBranch(id: string, updatedData: Partial<Branch>): Promise<Branch | null> {
    const existing = await this.branchRepository.findById(id);
    if (!existing) return null;
    const merged = Object.assign(existing, updatedData);
    return this.branchRepository.save(merged);
  }

  async deleteBranch(id: string): Promise<void> {
    return this.branchRepository.delete(id);
  }
}
