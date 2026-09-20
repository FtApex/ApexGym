import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { SaleInvoiceService } from '../../application/sale-invoice.service';
import { SaleInvoice } from '../../domain/sale-invoice';

@Controller('sales')
export class SaleInvoiceController {
  constructor(private readonly saleInvoiceService: SaleInvoiceService) {}

  @Get()
  async getAll(): Promise<SaleInvoice[]> {
    return this.saleInvoiceService.getAllInvoices();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<SaleInvoice> {
    const invoice = await this.saleInvoiceService.getInvoiceById(id);
    if (!invoice) {
      throw new NotFoundException(`Comprobante de venta con ID ${id} no encontrado`);
    }
    return invoice;
  }

  @Post()
  async create(@Body() invoice: SaleInvoice): Promise<SaleInvoice> {
    return this.saleInvoiceService.createInvoice(invoice);
  }
}
