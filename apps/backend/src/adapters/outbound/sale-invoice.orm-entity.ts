import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BranchOrmEntity } from './branch.orm-entity';

@Entity('sale_invoices')
export class SaleInvoiceOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  invoiceNumber: string;

  @Column()
  documentType: 'BOLETA' | 'FACTURA';

  @Column()
  clientName: string;

  @Column()
  clientDoc: string;

  @Column()
  branchId: string;

  @ManyToOne(() => BranchOrmEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'branchId' })
  branch: BranchOrmEntity;

  @Column()
  branchName: string;

  @Column()
  membershipName: string;

  @Column({ type: 'varchar', nullable: true })
  promoName: string | null;

  @Column({ type: 'varchar', nullable: true })
  couponCode: string | null;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2 })
  discount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column()
  paymentMethod: 'MERCADOPAGO' | 'CULQI' | 'NIUBIZ' | 'TARJETA' | 'EFECTIVO';

  @Column()
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED' | 'REFUNDED';

  @Column()
  date: string;
}
