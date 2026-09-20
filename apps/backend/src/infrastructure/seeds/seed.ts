import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  initialCompany,
  initialBranches,
  initialBanners,
  initialServices,
  initialMemberships,
  initialPromotions,
  initialCoupons,
  initialClients,
  initialTrainers,
  initialInvoices,
  initialMasterFiles,
  initialTestimonials,
  initialFaqs,
  initialLandingCms,
  initialSystemSettings,
  initialUsers,
  initialRolePermissions,
} from './seed-data';

import dataSource from '../data-source';
import { CompanyOrmEntity } from '../../adapters/outbound/company.orm-entity';
import { BranchOrmEntity } from '../../adapters/outbound/branch.orm-entity';
import { MembershipPlanOrmEntity } from '../../adapters/outbound/membership-plan.orm-entity';
import { PromotionOrmEntity } from '../../adapters/outbound/promotion.orm-entity';
import { CouponOrmEntity } from '../../adapters/outbound/coupon.orm-entity';
import { ClientMemberOrmEntity } from '../../adapters/outbound/client-member.orm-entity';
import { TrainerOrmEntity } from '../../adapters/outbound/trainer.orm-entity';
import { SaleInvoiceOrmEntity } from '../../adapters/outbound/sale-invoice.orm-entity';
import { CarouselBannerOrmEntity } from '../../adapters/outbound/carousel-banner.orm-entity';
import { GymServiceOrmEntity } from '../../adapters/outbound/gym-service.orm-entity';
import { TestimonialOrmEntity } from '../../adapters/outbound/testimonial.orm-entity';
import { FaqItemOrmEntity } from '../../adapters/outbound/faq-item.orm-entity';
import { MasterFileOrmEntity } from '../../adapters/outbound/master-file.orm-entity';
import { LandingCmsConfigOrmEntity } from '../../adapters/outbound/landing-cms-config.orm-entity';
import { SystemSettingsOrmEntity } from '../../adapters/outbound/system-settings.orm-entity';
import { UserOrmEntity } from '../../adapters/outbound/user.orm-entity';
import { RolePermissionOrmEntity } from '../../adapters/outbound/role-permission.orm-entity';

const ALL = 'ALL';
const BCRYPT_ROUNDS = 12;

/**
 * Carga el contenido inicial de ApexGym en MySQL.
 *
 * Es idempotente: todas las filas llevan IDs estables, de modo que volver a
 * ejecutarlo actualiza los registros existentes en lugar de duplicarlos.
 * Requiere que las migraciones ya se hayan aplicado.
 */
async function seed(ds: DataSource): Promise<void> {
  // 1. Empresa y sedes: son la raíz de casi todas las relaciones.
  await ds.getRepository(CompanyOrmEntity).save(initialCompany);
  console.log('  ✓ Empresa');

  await ds.getRepository(BranchOrmEntity).save(initialBranches);
  console.log(`  ✓ Sedes (${initialBranches.length})`);

  const allBranches = await ds.getRepository(BranchOrmEntity).find();

  // 2. Planes de membresía, con la relación ManyToMany hacia sedes.
  const planRepository = ds.getRepository(MembershipPlanOrmEntity);
  for (const plan of initialMemberships) {
    const entity = planRepository.create({
      ...plan,
      originalPrice: plan.originalPrice ?? null,
      badge: plan.badge ?? null,
      branches: plan.branches.includes(ALL)
        ? allBranches
        : allBranches.filter((branch) => plan.branches.includes(branch.id)),
    });
    await planRepository.save(entity);
  }
  console.log(`  ✓ Planes de membresía (${initialMemberships.length})`);

  const allPlans = await planRepository.find();

  // 3. Promociones: 'ALL' se guarda como NULL en la FK de sede.
  const promotionRepository = ds.getRepository(PromotionOrmEntity);
  for (const promo of initialPromotions) {
    await promotionRepository.save(
      promotionRepository.create({
        ...promo,
        bannerUrl: promo.bannerUrl ?? null,
        branchId: promo.branchId === ALL ? null : promo.branchId,
        membershipId: promo.membershipId ?? null,
      }),
    );
  }
  console.log(`  ✓ Promociones (${initialPromotions.length})`);

  // 4. Cupones, con sus dos relaciones ManyToMany.
  const couponRepository = ds.getRepository(CouponOrmEntity);
  for (const coupon of initialCoupons) {
    await couponRepository.save(
      couponRepository.create({
        ...coupon,
        applicableBranches: coupon.applicableBranches.includes(ALL)
          ? allBranches
          : allBranches.filter((branch) => coupon.applicableBranches.includes(branch.id)),
        applicableMemberships: coupon.applicableMemberships.includes(ALL)
          ? allPlans
          : allPlans.filter((plan) => coupon.applicableMemberships.includes(plan.id)),
      }),
    );
  }
  console.log(`  ✓ Cupones (${initialCoupons.length})`);

  // 5. Entrenadores y clientes.
  await ds.getRepository(TrainerOrmEntity).save(initialTrainers);
  console.log(`  ✓ Entrenadores (${initialTrainers.length})`);

  await ds.getRepository(ClientMemberOrmEntity).save(
    initialClients.map((client) => ({ ...client, notes: client.notes ?? null })),
  );
  console.log(`  ✓ Clientes (${initialClients.length})`);

  // 6. Comprobantes de venta.
  await ds.getRepository(SaleInvoiceOrmEntity).save(
    initialInvoices.map((invoice) => ({
      ...invoice,
      promoName: invoice.promoName ?? null,
      couponCode: invoice.couponCode ?? null,
    })),
  );
  console.log(`  ✓ Comprobantes de venta (${initialInvoices.length})`);

  // 7. Contenido del CMS de la landing.
  await ds.getRepository(CarouselBannerOrmEntity).save(initialBanners);
  console.log(`  ✓ Banners del carrusel (${initialBanners.length})`);

  await ds.getRepository(GymServiceOrmEntity).save(initialServices);
  console.log(`  ✓ Servicios (${initialServices.length})`);

  await ds.getRepository(TestimonialOrmEntity).save(initialTestimonials);
  console.log(`  ✓ Testimonios (${initialTestimonials.length})`);

  await ds.getRepository(FaqItemOrmEntity).save(initialFaqs);
  console.log(`  ✓ Preguntas frecuentes (${initialFaqs.length})`);

  await ds.getRepository(MasterFileOrmEntity).save(initialMasterFiles);
  console.log(`  ✓ Archivos maestros (${initialMasterFiles.length})`);

  await ds.getRepository(LandingCmsConfigOrmEntity).save(initialLandingCms);
  console.log('  ✓ Configuración del CMS');

  await ds.getRepository(SystemSettingsOrmEntity).save(initialSystemSettings);
  console.log('  ✓ Ajustes del sistema');

  // 8. Usuarios y matriz de permisos.
  const password = process.env.SEED_DEFAULT_PASSWORD;
  if (!password) {
    throw new Error(
      'Falta SEED_DEFAULT_PASSWORD en el entorno: define la contraseña inicial de los usuarios semilla.',
    );
  }
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const userRepository = ds.getRepository(UserOrmEntity);
  for (const user of initialUsers) {
    // No sobreescribe la contraseña de un usuario que ya existe.
    const existing = await userRepository.findOne({ where: { id: user.id } });
    await userRepository.save(
      userRepository.create({
        ...user,
        photoUrl: user.photoUrl ?? null,
        phone: user.phone ?? null,
        companyId: user.companyId ?? null,
        branchId: user.branchId ?? null,
        passwordHash: existing ? undefined : passwordHash,
      }),
    );
  }
  console.log(`  ✓ Usuarios (${initialUsers.length})`);

  await ds.getRepository(RolePermissionOrmEntity).save(initialRolePermissions);
  console.log(`  ✓ Matriz de permisos (${initialRolePermissions.length} reglas)`);
}

async function main(): Promise<void> {
  console.log('Iniciando carga de datos iniciales en MySQL...\n');
  const ds = await dataSource.initialize();
  try {
    await seed(ds);
    console.log('\nCarga de datos completada correctamente.');
  } finally {
    await ds.destroy();
  }
}

main().catch((error) => {
  console.error('\nLa carga de datos falló:', error);
  process.exit(1);
});
