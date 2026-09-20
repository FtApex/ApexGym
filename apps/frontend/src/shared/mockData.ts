/**
 * Los datos iniciales ahora viven en `@/shared/types/seed-data`, que es la
 * misma fuente que el seeder del backend carga en MySQL. Este módulo se
 * conserva como reexportación para no romper los imports existentes y
 * desaparecerá cuando todas las vistas consuman la API.
 */
export * from '@/shared/types';
