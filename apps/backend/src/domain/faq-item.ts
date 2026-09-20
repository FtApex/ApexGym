import { FaqItem as FaqItemContract } from '@apex/shared';

export class FaqItem implements FaqItemContract {
  id: string;
  question: string;
  answer: string;
  category: string;
}
