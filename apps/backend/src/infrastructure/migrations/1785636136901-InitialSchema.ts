import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1785636136901 implements MigrationInterface {
    name = 'InitialSchema1785636136901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`companies\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`ruc\` varchar(255) NOT NULL, \`razonSocial\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`brandColor\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_1fe1a1fe5eaf15ada69b1b2e99\` (\`ruc\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`branches\` (\`id\` varchar(255) NOT NULL, \`companyId\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`lat\` double NOT NULL, \`lng\` double NOT NULL, \`schedule\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`whatsapp\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`instagram\` varchar(255) NOT NULL, \`facebook\` varchar(255) NOT NULL, \`tiktok\` varchar(255) NOT NULL, \`photos\` json NOT NULL, \`logo\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`services\` json NOT NULL, \`equipmentCount\` int NOT NULL, \`trainersCount\` int NOT NULL, UNIQUE INDEX \`IDX_c2c16397fa98d34f8db37684c4\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`photoUrl\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`companyId\` varchar(255) NULL, \`branchId\` varchar(255) NULL, \`status\` varchar(255) NOT NULL, \`lastLoginAt\` varchar(255) NULL, \`createdAt\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`trainers\` (\`id\` varchar(255) NOT NULL, \`photoUrl\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`specialty\` varchar(255) NOT NULL, \`schedule\` varchar(255) NOT NULL, \`branchId\` varchar(255) NOT NULL, \`bio\` text NOT NULL, \`socials\` json NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`testimonials\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`branch\` varchar(255) NOT NULL, \`photoUrl\` varchar(255) NOT NULL, \`comment\` text NOT NULL, \`rating\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sale_invoices\` (\`id\` varchar(255) NOT NULL, \`invoiceNumber\` varchar(255) NOT NULL, \`documentType\` varchar(255) NOT NULL, \`clientName\` varchar(255) NOT NULL, \`clientDoc\` varchar(255) NOT NULL, \`branchId\` varchar(255) NOT NULL, \`branchName\` varchar(255) NOT NULL, \`membershipName\` varchar(255) NOT NULL, \`promoName\` varchar(255) NULL, \`couponCode\` varchar(255) NULL, \`subtotal\` decimal(10,2) NOT NULL, \`discount\` decimal(10,2) NOT NULL, \`total\` decimal(10,2) NOT NULL, \`paymentMethod\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`date\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_7a3652e2f358b60498ad7c71c1\` (\`invoiceNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`system_settings\` (\`id\` varchar(255) NOT NULL, \`appName\` varchar(255) NOT NULL, \`brandColor\` varchar(255) NOT NULL, \`logoUrl\` text NOT NULL, \`faviconUrl\` varchar(255) NOT NULL, \`r2Endpoint\` varchar(255) NOT NULL DEFAULT '', \`r2BucketName\` varchar(255) NOT NULL DEFAULT '', \`r2AccessKey\` varchar(255) NOT NULL DEFAULT '', \`r2SecretKey\` varchar(255) NOT NULL DEFAULT '', \`selectedGateway\` varchar(255) NOT NULL, \`mercadoPagoPublicKey\` varchar(255) NOT NULL DEFAULT '', \`mercadoPagoAccessToken\` varchar(255) NOT NULL DEFAULT '', \`culqiPublicKey\` varchar(255) NOT NULL DEFAULT '', \`niubizMerchantId\` varchar(255) NOT NULL DEFAULT '', \`googleAnalyticsId\` varchar(255) NOT NULL DEFAULT '', \`metaPixelId\` varchar(255) NOT NULL DEFAULT '', \`whatsappNumber\` varchar(255) NOT NULL DEFAULT '', \`smtpHost\` varchar(255) NOT NULL DEFAULT '', \`smtpPort\` int NOT NULL DEFAULT '587', \`smtpUser\` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permissions\` (\`id\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`module\` varchar(255) NOT NULL, \`canView\` tinyint NOT NULL DEFAULT 0, \`canCreate\` tinyint NOT NULL DEFAULT 0, \`canEdit\` tinyint NOT NULL DEFAULT 0, \`canDelete\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`UQ_role_permissions_role_module\` (\`role\`, \`module\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`membership_plans\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`durationMonths\` int NOT NULL, \`price\` decimal(10,2) NOT NULL, \`originalPrice\` decimal(10,2) NULL, \`benefits\` json NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`badge\` varchar(255) NULL, \`color\` varchar(255) NOT NULL, \`priority\` int NOT NULL, \`visible\` tinyint NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`promotions\` (\`id\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`bannerUrl\` varchar(255) NULL, \`branchId\` varchar(255) NULL, \`membershipId\` varchar(255) NULL, \`normalPrice\` decimal(10,2) NOT NULL, \`offerPrice\` decimal(10,2) NOT NULL, \`discountPercentage\` int NOT NULL, \`badge\` varchar(255) NOT NULL, \`startDate\` varchar(255) NOT NULL, \`endDate\` varchar(255) NOT NULL, \`priority\` int NOT NULL, \`color\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`master_files\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`folder\` varchar(255) NOT NULL, \`url\` text NOT NULL, \`sizeBytes\` bigint NOT NULL, \`fileType\` varchar(255) NOT NULL, \`uploadDate\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`landing_cms_config\` (\`id\` varchar(255) NOT NULL, \`heroCarouselActive\` tinyint NOT NULL, \`servicesActive\` tinyint NOT NULL, \`promotionsActive\` tinyint NOT NULL, \`membershipsActive\` tinyint NOT NULL, \`sedesActive\` tinyint NOT NULL, \`aboutActive\` tinyint NOT NULL, \`testimonialsActive\` tinyint NOT NULL, \`faqActive\` tinyint NOT NULL, \`footerActive\` tinyint NOT NULL, \`seoTitle\` varchar(255) NOT NULL, \`seoDescription\` text NOT NULL, \`seoKeywords\` text NOT NULL, \`sections\` json NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`gym_services\` (\`id\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`iconName\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`featured\` tinyint NOT NULL, \`display_order\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`coupons\` (\`id\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`amount\` decimal(10,2) NOT NULL, \`maxUses\` int NOT NULL, \`currentUses\` int NOT NULL, \`userLimit\` int NOT NULL, \`startDate\` varchar(255) NOT NULL, \`endDate\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e025109230e82925843f2a14c4\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`faq_items\` (\`id\` varchar(255) NOT NULL, \`question\` text NOT NULL, \`answer\` text NOT NULL, \`category\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client_members\` (\`id\` varchar(255) NOT NULL, \`photoUrl\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`documentType\` varchar(255) NOT NULL, \`documentNumber\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`branchId\` varchar(255) NOT NULL, \`membershipId\` varchar(255) NOT NULL, \`membershipName\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`joinDate\` varchar(255) NOT NULL, \`expiryDate\` varchar(255) NOT NULL, \`renewalsCount\` int NOT NULL, \`notes\` text NULL, UNIQUE INDEX \`IDX_303113fb2b595d92ceb8f32bc5\` (\`documentNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`carousel_banners\` (\`id\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`subtitle\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`buttonText\` varchar(255) NOT NULL, \`buttonUrl\` varchar(255) NOT NULL, \`darkOverlay\` int NOT NULL, \`startDate\` varchar(255) NOT NULL, \`endDate\` varchar(255) NOT NULL, \`display_order\` int NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`branches_membership_plans\` (\`membershipPlanId\` varchar(255) NOT NULL, \`branchId\` varchar(255) NOT NULL, INDEX \`IDX_7fa8e629436fa7dc32d83cc0f3\` (\`membershipPlanId\`), INDEX \`IDX_1d4b07774d42db016f3c1a5846\` (\`branchId\`), PRIMARY KEY (\`membershipPlanId\`, \`branchId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`coupons_membership_plans\` (\`couponId\` varchar(255) NOT NULL, \`membershipPlanId\` varchar(255) NOT NULL, INDEX \`IDX_cd0abacbcf68def16b433adc42\` (\`couponId\`), INDEX \`IDX_efdb77500d4cc928e0799038d0\` (\`membershipPlanId\`), PRIMARY KEY (\`couponId\`, \`membershipPlanId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`coupons_branches\` (\`couponId\` varchar(255) NOT NULL, \`branchId\` varchar(255) NOT NULL, INDEX \`IDX_8165b84eb039e55f03a64f027c\` (\`couponId\`), INDEX \`IDX_8acfd90c4c3778bc633b2b9975\` (\`branchId\`), PRIMARY KEY (\`couponId\`, \`branchId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`branches\` ADD CONSTRAINT \`FK_a35729a94e7280cbebaaa541a20\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_6f9395c9037632a31107c8a9e58\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_246426dfd001466a1d5e47322f4\` FOREIGN KEY (\`branchId\`) REFERENCES \`branches\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trainers\` ADD CONSTRAINT \`FK_1a383355fb2eb3ba8d8ecc6e8fa\` FOREIGN KEY (\`branchId\`) REFERENCES \`branches\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_invoices\` ADD CONSTRAINT \`FK_ffbaa1eba2e467e8dee02aa46ad\` FOREIGN KEY (\`branchId\`) REFERENCES \`branches\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promotions\` ADD CONSTRAINT \`FK_f0c22277696f66bfefe47f6c84c\` FOREIGN KEY (\`branchId\`) REFERENCES \`branches\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promotions\` ADD CONSTRAINT \`FK_934b03e38d99ba18a60ea11c214\` FOREIGN KEY (\`membershipId\`) REFERENCES \`membership_plans\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`client_members\` ADD CONSTRAINT \`FK_6223f29f33ceb032525146526fc\` FOREIGN KEY (\`branchId\`) REFERENCES \`branches\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`client_members\` ADD CONSTRAINT \`FK_3f77d033ee98e8404f60f53bfbf\` FOREIGN KEY (\`membershipId\`) REFERENCES \`membership_plans\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`branches_membership_plans\` ADD CONSTRAINT \`FK_7fa8e629436fa7dc32d83cc0f30\` FOREIGN KEY (\`membershipPlanId\`) REFERENCES \`membership_plans\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`branches_membership_plans\` ADD CONSTRAINT \`FK_1d4b07774d42db016f3c1a58466\` FOREIGN KEY (\`branchId\`) REFERENCES \`branches\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`coupons_membership_plans\` ADD CONSTRAINT \`FK_cd0abacbcf68def16b433adc42d\` FOREIGN KEY (\`couponId\`) REFERENCES \`coupons\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`coupons_membership_plans\` ADD CONSTRAINT \`FK_efdb77500d4cc928e0799038d00\` FOREIGN KEY (\`membershipPlanId\`) REFERENCES \`membership_plans\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`coupons_branches\` ADD CONSTRAINT \`FK_8165b84eb039e55f03a64f027c8\` FOREIGN KEY (\`couponId\`) REFERENCES \`coupons\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`coupons_branches\` ADD CONSTRAINT \`FK_8acfd90c4c3778bc633b2b9975b\` FOREIGN KEY (\`branchId\`) REFERENCES \`branches\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupons_branches\` DROP FOREIGN KEY \`FK_8acfd90c4c3778bc633b2b9975b\``);
        await queryRunner.query(`ALTER TABLE \`coupons_branches\` DROP FOREIGN KEY \`FK_8165b84eb039e55f03a64f027c8\``);
        await queryRunner.query(`ALTER TABLE \`coupons_membership_plans\` DROP FOREIGN KEY \`FK_efdb77500d4cc928e0799038d00\``);
        await queryRunner.query(`ALTER TABLE \`coupons_membership_plans\` DROP FOREIGN KEY \`FK_cd0abacbcf68def16b433adc42d\``);
        await queryRunner.query(`ALTER TABLE \`branches_membership_plans\` DROP FOREIGN KEY \`FK_1d4b07774d42db016f3c1a58466\``);
        await queryRunner.query(`ALTER TABLE \`branches_membership_plans\` DROP FOREIGN KEY \`FK_7fa8e629436fa7dc32d83cc0f30\``);
        await queryRunner.query(`ALTER TABLE \`client_members\` DROP FOREIGN KEY \`FK_3f77d033ee98e8404f60f53bfbf\``);
        await queryRunner.query(`ALTER TABLE \`client_members\` DROP FOREIGN KEY \`FK_6223f29f33ceb032525146526fc\``);
        await queryRunner.query(`ALTER TABLE \`promotions\` DROP FOREIGN KEY \`FK_934b03e38d99ba18a60ea11c214\``);
        await queryRunner.query(`ALTER TABLE \`promotions\` DROP FOREIGN KEY \`FK_f0c22277696f66bfefe47f6c84c\``);
        await queryRunner.query(`ALTER TABLE \`sale_invoices\` DROP FOREIGN KEY \`FK_ffbaa1eba2e467e8dee02aa46ad\``);
        await queryRunner.query(`ALTER TABLE \`trainers\` DROP FOREIGN KEY \`FK_1a383355fb2eb3ba8d8ecc6e8fa\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_246426dfd001466a1d5e47322f4\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_6f9395c9037632a31107c8a9e58\``);
        await queryRunner.query(`ALTER TABLE \`branches\` DROP FOREIGN KEY \`FK_a35729a94e7280cbebaaa541a20\``);
        await queryRunner.query(`DROP INDEX \`IDX_8acfd90c4c3778bc633b2b9975\` ON \`coupons_branches\``);
        await queryRunner.query(`DROP INDEX \`IDX_8165b84eb039e55f03a64f027c\` ON \`coupons_branches\``);
        await queryRunner.query(`DROP TABLE \`coupons_branches\``);
        await queryRunner.query(`DROP INDEX \`IDX_efdb77500d4cc928e0799038d0\` ON \`coupons_membership_plans\``);
        await queryRunner.query(`DROP INDEX \`IDX_cd0abacbcf68def16b433adc42\` ON \`coupons_membership_plans\``);
        await queryRunner.query(`DROP TABLE \`coupons_membership_plans\``);
        await queryRunner.query(`DROP INDEX \`IDX_1d4b07774d42db016f3c1a5846\` ON \`branches_membership_plans\``);
        await queryRunner.query(`DROP INDEX \`IDX_7fa8e629436fa7dc32d83cc0f3\` ON \`branches_membership_plans\``);
        await queryRunner.query(`DROP TABLE \`branches_membership_plans\``);
        await queryRunner.query(`DROP TABLE \`carousel_banners\``);
        await queryRunner.query(`DROP INDEX \`IDX_303113fb2b595d92ceb8f32bc5\` ON \`client_members\``);
        await queryRunner.query(`DROP TABLE \`client_members\``);
        await queryRunner.query(`DROP TABLE \`faq_items\``);
        await queryRunner.query(`DROP INDEX \`IDX_e025109230e82925843f2a14c4\` ON \`coupons\``);
        await queryRunner.query(`DROP TABLE \`coupons\``);
        await queryRunner.query(`DROP TABLE \`gym_services\``);
        await queryRunner.query(`DROP TABLE \`landing_cms_config\``);
        await queryRunner.query(`DROP TABLE \`master_files\``);
        await queryRunner.query(`DROP TABLE \`promotions\``);
        await queryRunner.query(`DROP TABLE \`membership_plans\``);
        await queryRunner.query(`DROP INDEX \`UQ_role_permissions_role_module\` ON \`role_permissions\``);
        await queryRunner.query(`DROP TABLE \`role_permissions\``);
        await queryRunner.query(`DROP TABLE \`system_settings\``);
        await queryRunner.query(`DROP INDEX \`IDX_7a3652e2f358b60498ad7c71c1\` ON \`sale_invoices\``);
        await queryRunner.query(`DROP TABLE \`sale_invoices\``);
        await queryRunner.query(`DROP TABLE \`testimonials\``);
        await queryRunner.query(`DROP TABLE \`trainers\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_c2c16397fa98d34f8db37684c4\` ON \`branches\``);
        await queryRunner.query(`DROP TABLE \`branches\``);
        await queryRunner.query(`DROP INDEX \`IDX_1fe1a1fe5eaf15ada69b1b2e99\` ON \`companies\``);
        await queryRunner.query(`DROP TABLE \`companies\``);
    }

}
