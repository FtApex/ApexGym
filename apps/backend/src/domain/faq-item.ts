import { FaqItem as FaqItemContract } from './shared/types';

export class FaqItem implements FaqItemContract {
  id: string;
  question: string;
  answer: string;
  category: string;
}
