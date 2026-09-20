import { Body, ValidationPipe } from '@nestjs/common';

/**
 * `@Body()` con validación estricta: descarta las propiedades que el DTO no
 * declara y rechaza la petición si llega alguna de más.
 *
 * Se aplica por endpoint en lugar de globalmente porque `whitelist` vacía
 * cualquier body cuyo tipo no tenga decoradores de class-validator, y los
 * CRUD del backoffice aún reciben clases de dominio sin decorar.
 */
export const ValidatedBody = () =>
  Body(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
