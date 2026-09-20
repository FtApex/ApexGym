import { Testimonial as TestimonialContract } from '@apex/shared';

export class Testimonial implements TestimonialContract {
  id: string;
  name: string;
  role: string;
  branch: string;
  photoUrl: string;
  comment: string;
  rating: number;
}
