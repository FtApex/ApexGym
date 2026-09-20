import { Injectable, Inject } from '@nestjs/common';
import { FaqItem } from '../domain/faq-item';
import type { FaqItemRepository } from '../domain/faq-item.repository';
import { FAQ_ITEM_REPOSITORY_TOKEN } from '../domain/faq-item.repository';

@Injectable()
export class FaqItemService {
  constructor(
    @Inject(FAQ_ITEM_REPOSITORY_TOKEN)
    private readonly faqRepository: FaqItemRepository,
  ) {}

  async getAllFaqs(): Promise<FaqItem[]> {
    return this.faqRepository.findAll();
  }

  async getFaqById(id: string): Promise<FaqItem | null> {
    return this.faqRepository.findById(id);
  }

  async createFaq(faq: FaqItem): Promise<FaqItem> {
    return this.faqRepository.save(faq);
  }

  async updateFaq(id: string, updatedData: Partial<FaqItem>): Promise<FaqItem | null> {
    const existing = await this.faqRepository.findById(id);
    if (!existing) return null;
    return this.faqRepository.save(Object.assign(existing, updatedData, { id }));
  }

  async deleteFaq(id: string): Promise<void> {
    return this.faqRepository.delete(id);
  }
}
