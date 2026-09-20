import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipPlanRepository } from '../../domain/membership-plan.repository';
import { MembershipPlan } from '../../domain/membership-plan';
import { MembershipPlanOrmEntity } from './membership-plan.orm-entity';
import { BranchOrmEntity } from './branch.orm-entity';

/**
 * El dominio expresa "aplica a todas las sedes" con el centinela 'ALL'.
 * En BD eso se materializa como el conjunto completo de sedes en la tabla
 * de join, y se vuelve a colapsar a 'ALL' al leer.
 */
const ALL = 'ALL';

@Injectable()
export class TypeOrmMembershipPlanRepository implements MembershipPlanRepository {
  constructor(
    @InjectRepository(MembershipPlanOrmEntity)
    private readonly repository: Repository<MembershipPlanOrmEntity>,
    @InjectRepository(BranchOrmEntity)
    private readonly branchRepository: Repository<BranchOrmEntity>,
  ) {}

  async findAll(): Promise<MembershipPlan[]> {
    const ormEntities = await this.repository.find({
      relations: { branches: true },
      order: { priority: 'ASC' },
    });
    const totalBranches = await this.branchRepository.count();
    return ormEntities.map((entity) => this.toDomain(entity, totalBranches));
  }

  async findById(id: string): Promise<MembershipPlan | null> {
    const ormEntity = await this.repository.findOne({
      where: { id },
      relations: { branches: true },
    });
    if (!ormEntity) return null;
    const totalBranches = await this.branchRepository.count();
    return this.toDomain(ormEntity, totalBranches);
  }

  async save(plan: MembershipPlan): Promise<MembershipPlan> {
    const ormEntity = await this.toOrm(plan);
    const saved = await this.repository.save(ormEntity);
    const totalBranches = await this.branchRepository.count();
    return this.toDomain(saved, totalBranches);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(ormEntity: MembershipPlanOrmEntity, totalBranches: number): MembershipPlan {
    const plan = new MembershipPlan();
    plan.id = ormEntity.id;
    plan.name = ormEntity.name;
    plan.durationMonths = ormEntity.durationMonths;
    plan.price = Number(ormEntity.price);
    plan.originalPrice =
      ormEntity.originalPrice === null ? undefined : Number(ormEntity.originalPrice);
    plan.benefits = ormEntity.benefits ?? [];
    plan.imageUrl = ormEntity.imageUrl;
    plan.badge = ormEntity.badge ?? undefined;
    plan.color = ormEntity.color;
    plan.priority = ormEntity.priority;
    plan.visible = ormEntity.visible;
    plan.status = ormEntity.status;

    const branchIds = (ormEntity.branches ?? []).map((branch) => branch.id);
    plan.branches =
      totalBranches > 0 && branchIds.length === totalBranches ? [ALL] : branchIds;
    return plan;
  }

  private async toOrm(plan: MembershipPlan): Promise<MembershipPlanOrmEntity> {
    const ormEntity = new MembershipPlanOrmEntity();
    ormEntity.id = plan.id;
    ormEntity.name = plan.name;
    ormEntity.durationMonths = plan.durationMonths;
    ormEntity.price = plan.price;
    ormEntity.originalPrice = plan.originalPrice ?? null;
    ormEntity.benefits = plan.benefits ?? [];
    ormEntity.imageUrl = plan.imageUrl;
    ormEntity.badge = plan.badge ?? null;
    ormEntity.color = plan.color;
    ormEntity.priority = plan.priority;
    ormEntity.visible = plan.visible;
    ormEntity.status = plan.status;
    ormEntity.branches = await this.resolveBranches(plan.branches);
    return ormEntity;
  }

  private async resolveBranches(branchIds: string[]): Promise<BranchOrmEntity[]> {
    if (!branchIds || branchIds.length === 0) return [];
    if (branchIds.includes(ALL)) return this.branchRepository.find();
    return this.branchRepository.findBy(
      branchIds.map((id) => ({ id })),
    );
  }
}
