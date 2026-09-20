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
import { FaqItemService } from '../../application/faq-item.service';
import { FaqItem } from '../../domain/faq-item';
import { Public } from '../../infrastructure/auth/public.decorator';

@Controller('faqs')
export class FaqItemController {
  constructor(private readonly faqService: FaqItemService) {}

  @Public()
  @Get()
  async getAll(): Promise<FaqItem[]> {
    return this.faqService.getAllFaqs();
  }

  @Public()
  @Get(':id')
  async getById(@Param('id') id: string): Promise<FaqItem> {
    const faq = await this.faqService.getFaqById(id);
    if (!faq) {
      throw new NotFoundException(`Pregunta frecuente con ID ${id} no encontrada`);
    }
    return faq;
  }

  @Post()
  async create(@Body() faq: FaqItem): Promise<FaqItem> {
    return this.faqService.createFaq(faq);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() faqData: Partial<FaqItem>): Promise<FaqItem> {
    const faq = await this.faqService.updateFaq(id, faqData);
    if (!faq) {
      throw new NotFoundException(`Pregunta frecuente con ID ${id} no encontrada para actualizar`);
    }
    return faq;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.faqService.deleteFaq(id);
    return { message: `Pregunta frecuente con ID ${id} eliminada correctamente` };
  }
}
