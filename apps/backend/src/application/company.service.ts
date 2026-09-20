import { Injectable, Inject } from '@nestjs/common';
import { Company } from '../domain/company';
import type { CompanyRepository } from '../domain/company.repository';
import { COMPANY_REPOSITORY_TOKEN } from '../domain/company.repository';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(COMPANY_REPOSITORY_TOKEN)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async getCompany(): Promise<Company | null> {
    return this.companyRepository.find();
  }

  async updateCompany(companyData: Company): Promise<Company> {
    return this.companyRepository.save(companyData);
  }
}
