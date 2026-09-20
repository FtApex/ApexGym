import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('master_files')
export class MasterFileOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  /** Carpeta lógica dentro del bucket R2. */
  @Column()
  folder: 'Carousel' | 'Promociones' | 'Sedes' | 'Entrenadores' | 'Logos' | 'Documentos' | 'Iconos';

  @Column('text')
  url: string;

  @Column('bigint')
  sizeBytes: number;

  @Column()
  fileType: 'image' | 'pdf' | 'video';

  @Column()
  uploadDate: string;
}
