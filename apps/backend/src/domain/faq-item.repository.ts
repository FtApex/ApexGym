import { FaqItem } from './faq-item';

export interface FaqItemRepository {
  findAll(): Promise<FaqItem[]>;
  findById(id: string): Promise<FaqItem | null>;
  save(faq: FaqItem): Promise<FaqItem>;
  delete(id: string): Promise<void>;
}

export const FAQ_ITEM_REPOSITORY_TOKEN = Symbol('FaqItemRepository');
