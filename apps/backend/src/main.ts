import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DatabaseExceptionFilter } from './infrastructure/database-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const configuredOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
    : ['http://localhost:3000', 'https://apexgym-prod.up.railway.app'];

  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin || configuredOrigins.includes('*') || configuredOrigins.includes(origin) || origin.endsWith('.railway.app')) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Sin `whitelist` global: descarta toda propiedad de un body cuyo tipo no
  // declara decoradores de validación, y los CRUD reciben clases de dominio
  // sin decorar — activarlo aquí vaciaría esos payloads. El filtrado estricto
  // se aplica por endpoint (ver ValidatedBody) donde sí existe un DTO.
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Convierte los errores de MySQL (índices únicos, claves foráneas) en
  // respuestas con un mensaje que el backoffice puede mostrar tal cual.
  app.useGlobalFilters(new DatabaseExceptionFilter());

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`Backend is running on http://0.0.0.0:${port}/api`);
}
bootstrap();
