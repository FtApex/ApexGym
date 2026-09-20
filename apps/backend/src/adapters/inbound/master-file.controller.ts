import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MasterFileService } from '../../application/master-file.service';
import { MasterFile } from '../../domain/master-file';

@Controller('files')
export class MasterFileController {
  constructor(private readonly fileService: MasterFileService) {}

  @Get()
  async getAll(): Promise<MasterFile[]> {
    return this.fileService.getAllFiles();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<MasterFile> {
    const file = await this.fileService.getFileById(id);
    if (!file) {
      throw new NotFoundException(`Archivo con ID ${id} no encontrado`);
    }
    return file;
  }

  /** Registra los metadatos de un archivo ya subido al bucket R2. */
  @Post()
  async register(@Body() file: MasterFile): Promise<MasterFile> {
    return this.fileService.registerFile(file);
  }

  /**
   * Sube el binario del logotipo corporativo a R2 y devuelve el archivo
   * registrado, con la URL pública que se guarda en la empresa.
   */
  @Post('logo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(@UploadedFile() file?: Express.Multer.File): Promise<MasterFile> {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo.');
    }
    return this.fileService.uploadLogo({
      fileName: file.originalname,
      contentType: file.mimetype,
      content: file.buffer,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.fileService.deleteFile(id);
    return { message: `Archivo con ID ${id} eliminado correctamente` };
  }
}
