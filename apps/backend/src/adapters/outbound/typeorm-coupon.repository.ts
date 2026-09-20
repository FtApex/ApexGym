import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CouponRepository } from '../../domain/coupon.repository';
import { Coupon } from '../../domain/coupon';
import { CouponOrmEntity } from './coupon.orm-entity';
import { BranchOrmEntity } from './branch.orm-entity';
import { MembershipPlanOrmEntity } from './membership-plan.orm-entity';

/** Centinela del dominio para "aplica a todos"; ver typeorm-membership-plan.repository.ts */
const ALL = 'ALL';

@Injectable()
export class TypeOrmCouponRepository implements CouponRepository {
  constructor(
    @InjectRepository(CouponOrmEntity)
    private readonly repository: Repository<CouponOrmEntity>,
    @InjectRepository(BranchOrmEntity)
    private readonly branchRepository: Repository<BranchOrmEntity>,
    @InjectRepository(MembershipPlanOrmEntity)
    private readonly membershipRepository: Repository<MembershipPlanOrmEntity>,
  ) {}

  async findAll(): Promise<Coupon[]> {
    const ormEntities = await this.repository.find({
      relations: { applicableBranches: true, applicableMemberships: true },
      order: { code: 'ASC' },
    });
    const totals = await this.loadTotals();
    return ormEntities.map((entity) => this.toDomain(entity, totals));
  }

  async findById(id: string): Promise<Coupon | null> {
    const ormEntity = await this.repository.findOne({
      where: { id },
      relations: { applicableBranches: true, applicableMemberships: true },
    });
    if (!ormEntity) return null;
    return this.toDomain(ormEntity, await this.loadTotals());
  }

  async findByCode(code: string): Promise<Coupon | null> {
    const ormEntity = await this.repository.findOne({
      where: { code },
      relations: { applicableBranches: true, applicableMemberships: true },
    });
    if (!ormEntity) return null;
    return this.toDomain(ormEntity, await this.loadTotals());
  }

  async save(coupon: Coupon): Promise<Coupon> {
    const ormEntity = await this.toOrm(coupon);
    const saved = await this.repository.save(ormEntity);
    return this.toDomain(saved, await this.loadTotals());
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private async loadTotals(): Promise<{ branches: number; memberships: number }> {
    const [branches, memberships] = await Promise.all([
      this.branchRepository.count(),
      this.membershipRepository.count(),
    ]);
    return { branches, memberships };
  }

  private toDomain(
    ormEntity: CouponOrmEntity,
    totals: { branches: number; memberships: number },
  ): Coupon {
    const coupon = new Coupon();
    coupon.id = ormEntity.id;
    coupon.code = ormEntity.code;
    coupon.description = ormEntity.description;
    coupon.type = ormEntity.type;
    coupon.amount = Number(ormEntity.amount);
    coupon.maxUses = ormEntity.maxUses;
    coupon.currentUses = ormEntity.currentUses;
    coupon.userLimit = ormEntity.userLimit;
    coupon.startDate = ormEntity.startDate;
    coupon.endDate = ormEntity.endDate;
    coupon.status = ormEntity.status;

    coupon.applicableBranches = this.collapse(
      (ormEntity.applicableBranches ?? []).map((branch) => branch.id),
      totals.branches,
    );
    coupon.applicableMemberships = this.collapse(
      (ormEntity.applicableMemberships ?? []).map((plan) => plan.id),
      totals.memberships,
    );
    return coupon;
  }

  /** Si la relación cubre el universo completo, el dominio lo ve como ['ALL']. */
  private collapse(ids: string[], total: number): string[] {
    return total > 0 && ids.length === total ? [ALL] : ids;
  }

  private async toOrm(coupon: Coupon): Promise<CouponOrmEntity> {
    const ormEntity = new CouponOrmEntity();
    ormEntity.id = coupon.id;
    ormEntity.code = coupon.code;
    ormEntity.description = coupon.description;
    ormEntity.type = coupon.type;
    ormEntity.amount = coupon.amount;
    ormEntity.maxUses = coupon.maxUses;
    ormEntity.currentUses = coupon.currentUses;
    ormEntity.userLimit = coupon.userLimit;
    ormEntity.startDate = coupon.startDate;
    ormEntity.endDate = coupon.endDate;
    ormEntity.status = coupon.status;

    ormEntity.applicableBranches = await this.expand(
      coupon.applicableBranches,
      this.branchRepository,
    );
    ormEntity.applicableMemberships = await this.expand(
      coupon.applicableMemberships,
      this.membershipRepository,
    );
    return ormEntity;
  }

  private async expand<T extends { id: string }>(
    ids: string[],
    repository: Repository<T>,
  ): Promise<T[]> {
    if (!ids || ids.length === 0) return [];
    if (ids.includes(ALL)) return repository.find();
    return repository.findBy(ids.map((id) => ({ id })) as never);
  }
}
