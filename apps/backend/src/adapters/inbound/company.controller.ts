import { Controller, Get, Put, Body, NotFoundException } from '@nestjs/common';
import { CompanyService } from '../../application/company.service';
import { Company } from '../../domain/company';
import { Public } from '../../infrastructure/auth/public.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Public()
  @Get()
  async get(): Promise<Company> {
    const company = await this.companyService.getCompany();
    if (!company) {
      throw new NotFoundException('Configuración de la empresa no encontrada');
    }
    return company;
  }

  @Put()
  async update(@Body() companyData: Company): Promise<Company> {
    return this.companyService.updateCompany(companyData);
  }
}
