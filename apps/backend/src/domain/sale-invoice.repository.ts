import { SaleInvoice } from './sale-invoice';

export interface SaleInvoiceRepository {
  findAll(): Promise<SaleInvoice[]>;
  findById(id: string): Promise<SaleInvoice | null>;
  save(invoice: SaleInvoice): Promise<SaleInvoice>;
}

export const SALE_INVOICE_REPOSITORY_TOKEN = Symbol('SaleInvoiceRepository');
