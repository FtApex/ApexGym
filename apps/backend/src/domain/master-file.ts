import { R2MasterFile } from '@apex/shared';

export class MasterFile implements R2MasterFile {
  id: string;
  name: string;
  folder: 'Carousel' | 'Promociones' | 'Sedes' | 'Entrenadores' | 'Logos' | 'Documentos' | 'Iconos';
  url: string;
  sizeBytes: number;
  fileType: 'image' | 'pdf' | 'video';
  uploadDate: string;
}
