import { Injectable, Inject } from '@nestjs/common';
import { SaleInvoice } from '../domain/sale-invoice';
import type { SaleInvoiceRepository } from '../domain/sale-invoice.repository';
import { SALE_INVOICE_REPOSITORY_TOKEN } from '../domain/sale-invoice.repository';

@Injectable()
export class SaleInvoiceService {
  constructor(
    @Inject(SALE_INVOICE_REPOSITORY_TOKEN)
    private readonly repository: SaleInvoiceRepository,
  ) {}

  async getAllInvoices(): Promise<SaleInvoice[]> {
    return this.repository.findAll();
  }

  async getInvoiceById(id: string): Promise<SaleInvoice | null> {
    return this.repository.findById(id);
  }

  async createInvoice(invoice: SaleInvoice): Promise<SaleInvoice> {
    return this.repository.save(invoice);
  }
}
