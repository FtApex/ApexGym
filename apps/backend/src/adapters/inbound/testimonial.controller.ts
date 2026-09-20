import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { TestimonialService } from '../../application/testimonial.service';
import { Testimonial } from '../../domain/testimonial';
import { Public } from '../../infrastructure/auth/public.decorator';

@Controller('testimonials')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Public()
  @Get()
  async getAll(): Promise<Testimonial[]> {
    return this.testimonialService.getAllTestimonials();
  }

  @Public()
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialService.getTestimonialById(id);
    if (!testimonial) {
      throw new NotFoundException(`Testimonio con ID ${id} no encontrado`);
    }
    return testimonial;
  }

  @Post()
  async create(@Body() testimonial: Testimonial): Promise<Testimonial> {
    return this.testimonialService.createTestimonial(testimonial);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() testimonialData: Partial<Testimonial>,
  ): Promise<Testimonial> {
    const testimonial = await this.testimonialService.updateTestimonial(id, testimonialData);
    if (!testimonial) {
      throw new NotFoundException(`Testimonio con ID ${id} no encontrado para actualizar`);
    }
    return testimonial;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.testimonialService.deleteTestimonial(id);
    return { message: `Testimonio con ID ${id} eliminado correctamente` };
  }
}
