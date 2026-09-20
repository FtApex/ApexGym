import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { BranchService } from '../../application/branch.service';
import { Branch } from '../../domain/branch';
import { Public } from '../../infrastructure/auth/public.decorator';

@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Public()
  @Get()
  async getAll(): Promise<Branch[]> {
    return this.branchService.getAllBranches();
  }

  @Public()
  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string): Promise<Branch> {
    const branch = await this.branchService.getBranchBySlug(slug);
    if (!branch) {
      throw new NotFoundException(`Sede con slug ${slug} no encontrada`);
    }
    return branch;
  }

  @Public()
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Branch> {
    const branch = await this.branchService.getBranchById(id);
    if (!branch) {
      throw new NotFoundException(`Sede con ID ${id} no encontrada`);
    }
    return branch;
  }

  @Post()
  async create(@Body() branch: Branch): Promise<Branch> {
    return this.branchService.createBranch(branch);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() branchData: Partial<Branch>): Promise<Branch> {
    const branch = await this.branchService.updateBranch(id, branchData);
    if (!branch) {
      throw new NotFoundException(`Sede con ID ${id} no encontrada para actualizar`);
    }
    return branch;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.branchService.deleteBranch(id);
    return { message: `Sede con ID ${id} eliminada correctamente` };
  }
}
