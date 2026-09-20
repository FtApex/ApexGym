import { SaleInvoice as SharedSaleInvoice } from './shared/types';

export class SaleInvoice implements SharedSaleInvoice {
  id: string;
  invoiceNumber: string;
  documentType: 'BOLETA' | 'FACTURA';
  clientName: string;
  clientDoc: string;
  branchId: string;
  branchName: string;
  membershipName: string;
  promoName?: string;
  couponCode?: string;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'MERCADOPAGO' | 'CULQI' | 'NIUBIZ' | 'TARJETA' | 'EFECTIVO';
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED' | 'REFUNDED';
  date: string;
}
