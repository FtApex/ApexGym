import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './infrastructure/database.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { JwtAuthGuard } from './infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from './infrastructure/auth/roles.guard';

// ORM Entities
import { BranchOrmEntity } from './adapters/outbound/branch.orm-entity';
import { CompanyOrmEntity } from './adapters/outbound/company.orm-entity';
import { MembershipPlanOrmEntity } from './adapters/outbound/membership-plan.orm-entity';
import { PromotionOrmEntity } from './adapters/outbound/promotion.orm-entity';
import { CouponOrmEntity } from './adapters/outbound/coupon.orm-entity';
import { ClientMemberOrmEntity } from './adapters/outbound/client-member.orm-entity';
import { TrainerOrmEntity } from './adapters/outbound/trainer.orm-entity';
import { SaleInvoiceOrmEntity } from './adapters/outbound/sale-invoice.orm-entity';
import { CarouselBannerOrmEntity } from './adapters/outbound/carousel-banner.orm-entity';
import { GymServiceOrmEntity } from './adapters/outbound/gym-service.orm-entity';
import { TestimonialOrmEntity } from './adapters/outbound/testimonial.orm-entity';
import { FaqItemOrmEntity } from './adapters/outbound/faq-item.orm-entity';
import { MasterFileOrmEntity } from './adapters/outbound/master-file.orm-entity';
import { LandingCmsConfigOrmEntity } from './adapters/outbound/landing-cms-config.orm-entity';
import { SystemSettingsOrmEntity } from './adapters/outbound/system-settings.orm-entity';
import { RolePermissionOrmEntity } from './adapters/outbound/role-permission.orm-entity';

// Repository implementations
import { TypeOrmBranchRepository } from './adapters/outbound/typeorm-branch.repository';
import { TypeOrmCompanyRepository } from './adapters/outbound/typeorm-company.repository';
import { TypeOrmMembershipPlanRepository } from './adapters/outbound/typeorm-membership-plan.repository';
import { TypeOrmPromotionRepository } from './adapters/outbound/typeorm-promotion.repository';
import { TypeOrmCouponRepository } from './adapters/outbound/typeorm-coupon.repository';
import { TypeOrmClientMemberRepository } from './adapters/outbound/typeorm-client-member.repository';
import { TypeOrmTrainerRepository } from './adapters/outbound/typeorm-trainer.repository';
import { TypeOrmSaleInvoiceRepository } from './adapters/outbound/typeorm-sale-invoice.repository';
import { TypeOrmCarouselBannerRepository } from './adapters/outbound/typeorm-carousel-banner.repository';
import { TypeOrmGymServiceRepository } from './adapters/outbound/typeorm-gym-service.repository';
import { TypeOrmTestimonialRepository } from './adapters/outbound/typeorm-testimonial.repository';
import { TypeOrmFaqItemRepository } from './adapters/outbound/typeorm-faq-item.repository';
import { TypeOrmMasterFileRepository } from './adapters/outbound/typeorm-master-file.repository';
import { TypeOrmLandingCmsConfigRepository } from './adapters/outbound/typeorm-landing-cms-config.repository';
import { TypeOrmSystemSettingsRepository } from './adapters/outbound/typeorm-system-settings.repository';
import { TypeOrmRolePermissionRepository } from './adapters/outbound/typeorm-role-permission.repository';
import { R2StorageRepository } from './adapters/outbound/r2-storage.repository';

// Domain Tokens
import { BRANCH_REPOSITORY_TOKEN } from './domain/branch.repository';
import { COMPANY_REPOSITORY_TOKEN } from './domain/company.repository';
import { MEMBERSHIP_PLAN_REPOSITORY_TOKEN } from './domain/membership-plan.repository';
import { PROMOTION_REPOSITORY_TOKEN } from './domain/promotion.repository';
import { COUPON_REPOSITORY_TOKEN } from './domain/coupon.repository';
import { CLIENT_MEMBER_REPOSITORY_TOKEN } from './domain/client-member.repository';
import { TRAINER_REPOSITORY_TOKEN } from './domain/trainer.repository';
import { SALE_INVOICE_REPOSITORY_TOKEN } from './domain/sale-invoice.repository';
import { CAROUSEL_BANNER_REPOSITORY_TOKEN } from './domain/carousel-banner.repository';
import { GYM_SERVICE_REPOSITORY_TOKEN } from './domain/gym-service.repository';
import { TESTIMONIAL_REPOSITORY_TOKEN } from './domain/testimonial.repository';
import { FAQ_ITEM_REPOSITORY_TOKEN } from './domain/faq-item.repository';
import { MASTER_FILE_REPOSITORY_TOKEN } from './domain/master-file.repository';
import { LANDING_CMS_CONFIG_REPOSITORY_TOKEN } from './domain/landing-cms-config.repository';
import { SYSTEM_SETTINGS_REPOSITORY_TOKEN } from './domain/system-settings.repository';
import { ROLE_PERMISSION_REPOSITORY_TOKEN } from './domain/role-permission.repository';
import { STORAGE_REPOSITORY_TOKEN } from './domain/storage.repository';

// Application Services
import { BranchService } from './application/branch.service';
import { CompanyService } from './application/company.service';
import { MembershipPlanService } from './application/membership-plan.service';
import { PromotionService } from './application/promotion.service';
import { CouponService } from './application/coupon.service';
import { ClientMemberService } from './application/client-member.service';
import { TrainerService } from './application/trainer.service';
import { SaleInvoiceService } from './application/sale-invoice.service';
import { CarouselBannerService } from './application/carousel-banner.service';
import { GymServiceService } from './application/gym-service.service';
import { TestimonialService } from './application/testimonial.service';
import { FaqItemService } from './application/faq-item.service';
import { MasterFileService } from './application/master-file.service';
import { LandingCmsConfigService } from './application/landing-cms-config.service';
import { SystemSettingsService } from './application/system-settings.service';
import { RolePermissionService } from './application/role-permission.service';

// Inbound Controllers
import { BranchController } from './adapters/inbound/branch.controller';
import { CompanyController } from './adapters/inbound/company.controller';
import { MembershipPlanController } from './adapters/inbound/membership-plan.controller';
import { PromotionController } from './adapters/inbound/promotion.controller';
import { CouponController } from './adapters/inbound/coupon.controller';
import { ClientMemberController } from './adapters/inbound/client-member.controller';
import { TrainerController } from './adapters/inbound/trainer.controller';
import { SaleInvoiceController } from './adapters/inbound/sale-invoice.controller';
import { CarouselBannerController } from './adapters/inbound/carousel-banner.controller';
import { GymServiceController } from './adapters/inbound/gym-service.controller';
import { TestimonialController } from './adapters/inbound/testimonial.controller';
import { FaqItemController } from './adapters/inbound/faq-item.controller';
import { MasterFileController } from './adapters/inbound/master-file.controller';
import { LandingCmsConfigController } from './adapters/inbound/landing-cms-config.controller';
import { SystemSettingsController } from './adapters/inbound/system-settings.controller';
import { RolePermissionController } from './adapters/inbound/role-permission.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    TypeOrmModule.forFeature([
      BranchOrmEntity,
      CompanyOrmEntity,
      MembershipPlanOrmEntity,
      PromotionOrmEntity,
      CouponOrmEntity,
      ClientMemberOrmEntity,
      TrainerOrmEntity,
      SaleInvoiceOrmEntity,
      CarouselBannerOrmEntity,
      GymServiceOrmEntity,
      TestimonialOrmEntity,
      FaqItemOrmEntity,
      MasterFileOrmEntity,
      LandingCmsConfigOrmEntity,
      SystemSettingsOrmEntity,
      RolePermissionOrmEntity,
    ]),
  ],
  controllers: [
    BranchController,
    CompanyController,
    MembershipPlanController,
    PromotionController,
    CouponController,
    ClientMemberController,
    TrainerController,
    SaleInvoiceController,
    CarouselBannerController,
    GymServiceController,
    TestimonialController,
    FaqItemController,
    MasterFileController,
    LandingCmsConfigController,
    SystemSettingsController,
    RolePermissionController,
  ],
  providers: [
    // Autenticación obligatoria por defecto; los endpoints públicos se
    // marcan explícitamente con @Public().
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },

    BranchService,
    CompanyService,
    MembershipPlanService,
    PromotionService,
    CouponService,
    ClientMemberService,
    TrainerService,
    SaleInvoiceService,
    CarouselBannerService,
    GymServiceService,
    TestimonialService,
    FaqItemService,
    MasterFileService,
    LandingCmsConfigService,
    SystemSettingsService,
    RolePermissionService,
    {
      provide: BRANCH_REPOSITORY_TOKEN,
      useClass: TypeOrmBranchRepository,
    },
    {
      provide: COMPANY_REPOSITORY_TOKEN,
      useClass: TypeOrmCompanyRepository,
    },
    {
      provide: MEMBERSHIP_PLAN_REPOSITORY_TOKEN,
      useClass: TypeOrmMembershipPlanRepository,
    },
    {
      provide: PROMOTION_REPOSITORY_TOKEN,
      useClass: TypeOrmPromotionRepository,
    },
    {
      provide: COUPON_REPOSITORY_TOKEN,
      useClass: TypeOrmCouponRepository,
    },
    {
      provide: CLIENT_MEMBER_REPOSITORY_TOKEN,
      useClass: TypeOrmClientMemberRepository,
    },
    {
      provide: TRAINER_REPOSITORY_TOKEN,
      useClass: TypeOrmTrainerRepository,
    },
    {
      provide: SALE_INVOICE_REPOSITORY_TOKEN,
      useClass: TypeOrmSaleInvoiceRepository,
    },
    {
      provide: CAROUSEL_BANNER_REPOSITORY_TOKEN,
      useClass: TypeOrmCarouselBannerRepository,
    },
    {
      provide: GYM_SERVICE_REPOSITORY_TOKEN,
      useClass: TypeOrmGymServiceRepository,
    },
    {
      provide: TESTIMONIAL_REPOSITORY_TOKEN,
      useClass: TypeOrmTestimonialRepository,
    },
    {
      provide: FAQ_ITEM_REPOSITORY_TOKEN,
      useClass: TypeOrmFaqItemRepository,
    },
    {
      provide: MASTER_FILE_REPOSITORY_TOKEN,
      useClass: TypeOrmMasterFileRepository,
    },
    {
      provide: LANDING_CMS_CONFIG_REPOSITORY_TOKEN,
      useClass: TypeOrmLandingCmsConfigRepository,
    },
    {
      provide: SYSTEM_SETTINGS_REPOSITORY_TOKEN,
      useClass: TypeOrmSystemSettingsRepository,
    },
    {
      provide: ROLE_PERMISSION_REPOSITORY_TOKEN,
      useClass: TypeOrmRolePermissionRepository,
    },
    {
      provide: STORAGE_REPOSITORY_TOKEN,
      useClass: R2StorageRepository,
    },
  ],
})
export class AppModule {}
