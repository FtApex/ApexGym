import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleInvoiceRepository } from '../../domain/sale-invoice.repository';
import { SaleInvoice } from '../../domain/sale-invoice';
import { SaleInvoiceOrmEntity } from './sale-invoice.orm-entity';

@Injectable()
export class TypeOrmSaleInvoiceRepository implements SaleInvoiceRepository {
  constructor(
    @InjectRepository(SaleInvoiceOrmEntity)
    private readonly repository: Repository<SaleInvoiceOrmEntity>,
  ) {}

  async findAll(): Promise<SaleInvoice[]> {
    const ormEntities = await this.repository.find({ order: { date: 'DESC' } });
    return ormEntities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<SaleInvoice | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async save(invoice: SaleInvoice): Promise<SaleInvoice> {
    const ormEntity = this.toOrm(invoice);
    const saved = await this.repository.save(ormEntity);
    return this.toDomain(saved);
  }

  private toDomain(ormEntity: SaleInvoiceOrmEntity): SaleInvoice {
    const invoice = new SaleInvoice();
    invoice.id = ormEntity.id;
    invoice.invoiceNumber = ormEntity.invoiceNumber;
    invoice.documentType = ormEntity.documentType;
    invoice.clientName = ormEntity.clientName;
    invoice.clientDoc = ormEntity.clientDoc;
    invoice.branchId = ormEntity.branchId;
    invoice.branchName = ormEntity.branchName;
    invoice.membershipName = ormEntity.membershipName;
    invoice.promoName = ormEntity.promoName ?? undefined;
    invoice.couponCode = ormEntity.couponCode ?? undefined;
    invoice.subtotal = Number(ormEntity.subtotal);
    invoice.discount = Number(ormEntity.discount);
    invoice.total = Number(ormEntity.total);
    invoice.paymentMethod = ormEntity.paymentMethod;
    invoice.status = ormEntity.status;
    invoice.date = ormEntity.date;
    return invoice;
  }

  private toOrm(invoice: SaleInvoice): SaleInvoiceOrmEntity {
    const ormEntity = new SaleInvoiceOrmEntity();
    ormEntity.id = invoice.id;
    ormEntity.invoiceNumber = invoice.invoiceNumber;
    ormEntity.documentType = invoice.documentType;
    ormEntity.clientName = invoice.clientName;
    ormEntity.clientDoc = invoice.clientDoc;
    ormEntity.branchId = invoice.branchId;
    ormEntity.branchName = invoice.branchName;
    ormEntity.membershipName = invoice.membershipName;
    ormEntity.promoName = invoice.promoName ?? null;
    ormEntity.couponCode = invoice.couponCode ?? null;
    ormEntity.subtotal = invoice.subtotal;
    ormEntity.discount = invoice.discount;
    ormEntity.total = invoice.total;
    ormEntity.paymentMethod = invoice.paymentMethod;
    ormEntity.status = invoice.status;
    ormEntity.date = invoice.date;
    return ormEntity;
  }
}
