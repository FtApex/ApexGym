import { Company } from './company';

export interface CompanyRepository {
  find(): Promise<Company | null>;
  findById(id: string): Promise<Company | null>;
  save(company: Company): Promise<Company>;
}

export const COMPANY_REPOSITORY_TOKEN = Symbol('CompanyRepository');
