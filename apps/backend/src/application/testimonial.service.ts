import { Injectable, Inject } from '@nestjs/common';
import { Testimonial } from '../domain/testimonial';
import type { TestimonialRepository } from '../domain/testimonial.repository';
import { TESTIMONIAL_REPOSITORY_TOKEN } from '../domain/testimonial.repository';

@Injectable()
export class TestimonialService {
  constructor(
    @Inject(TESTIMONIAL_REPOSITORY_TOKEN)
    private readonly testimonialRepository: TestimonialRepository,
  ) {}

  async getAllTestimonials(): Promise<Testimonial[]> {
    return this.testimonialRepository.findAll();
  }

  async getTestimonialById(id: string): Promise<Testimonial | null> {
    return this.testimonialRepository.findById(id);
  }

  async createTestimonial(testimonial: Testimonial): Promise<Testimonial> {
    return this.testimonialRepository.save(testimonial);
  }

  async updateTestimonial(
    id: string,
    updatedData: Partial<Testimonial>,
  ): Promise<Testimonial | null> {
    const existing = await this.testimonialRepository.findById(id);
    if (!existing) return null;
    return this.testimonialRepository.save(Object.assign(existing, updatedData, { id }));
  }

  async deleteTestimonial(id: string): Promise<void> {
    return this.testimonialRepository.delete(id);
  }
}
