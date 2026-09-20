/** Archivo binario listo para subirse al bucket de objetos. */
export interface StorageUpload {
  /** Nombre original con el que el usuario subió el archivo. */
  fileName: string;
  contentType: string;
  content: Buffer;
}

/** Objeto ya persistido en el bucket. */
export interface StoredObject {
  /** Ruta dentro del bucket, necesaria para borrarlo después. */
  key: string;
  /** URL pública servible desde el navegador. */
  url: string;
}

/**
 * Puerto de almacenamiento de objetos. El dominio no conoce R2 ni S3: solo
 * necesita poder guardar un binario y recuperar su URL pública.
 */
export interface StorageRepository {
  upload(folder: string, file: StorageUpload): Promise<StoredObject>;
  delete(key: string): Promise<void>;
}

export const STORAGE_REPOSITORY_TOKEN = Symbol('StorageRepository');
