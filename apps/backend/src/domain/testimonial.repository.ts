import { Testimonial } from './testimonial';

export interface TestimonialRepository {
  findAll(): Promise<Testimonial[]>;
  findById(id: string): Promise<Testimonial | null>;
  save(testimonial: Testimonial): Promise<Testimonial>;
  delete(id: string): Promise<void>;
}

export const TESTIMONIAL_REPOSITORY_TOKEN = Symbol('TestimonialRepository');
