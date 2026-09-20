import { Testimonial as TestimonialContract } from './shared/types';

export class Testimonial implements TestimonialContract {
  id: string;
  name: string;
  role: string;
  branch: string;
  photoUrl: string;
  comment: string;
  rating: number;
}
