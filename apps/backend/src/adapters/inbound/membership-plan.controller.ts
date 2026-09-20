import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { MembershipPlanService } from '../../application/membership-plan.service';
import { MembershipPlan } from '../../domain/membership-plan';
import { Public } from '../../infrastructure/auth/public.decorator';

@Controller('memberships')
export class MembershipPlanController {
  constructor(private readonly planService: MembershipPlanService) {}

  @Public()
  @Get()
  async getAll(): Promise<MembershipPlan[]> {
    return this.planService.getAllPlans();
  }

  @Public()
  @Get(':id')
  async getById(@Param('id') id: string): Promise<MembershipPlan> {
    const plan = await this.planService.getPlanById(id);
    if (!plan) {
      throw new NotFoundException(`Plan con ID ${id} no encontrado`);
    }
    return plan;
  }

  @Post()
  async create(@Body() plan: MembershipPlan): Promise<MembershipPlan> {
    return this.planService.createPlan(plan);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() planData: Partial<MembershipPlan>): Promise<MembershipPlan> {
    const plan = await this.planService.updatePlan(id, planData);
    if (!plan) {
      throw new NotFoundException(`Plan con ID ${id} no encontrado para actualizar`);
    }
    return plan;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.planService.deletePlan(id);
    return { message: `Plan con ID ${id} eliminado correctamente` };
  }
}
