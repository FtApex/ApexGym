import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import type { Response } from 'express';

/** Códigos de error de MySQL que corresponden a un conflicto de datos. */
const MYSQL_DUPLICATE_ENTRY = 'ER_DUP_ENTRY';
const MYSQL_FK_CONSTRAINT = 'ER_ROW_IS_REFERENCED_2';
const MYSQL_FK_MISSING = 'ER_NO_REFERENCED_ROW_2';

interface DriverError {
  code?: string;
  sqlMessage?: string;
}

/**
 * Traduce los errores del driver de MySQL a respuestas HTTP con un mensaje
 * accionable. Sin esto, una violación de índice único llega al cliente como
 * un 500 «Internal server error» que no dice nada.
 */
@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DatabaseExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const driverError = (exception as unknown as { driverError?: DriverError }).driverError ?? {};

    const translated = this.translate(driverError);
    if (translated) {
      response.status(translated.getStatus()).json(translated.getResponse());
      return;
    }

    // Error de base de datos no contemplado: se registra completo en el
    // servidor y al cliente solo le llega un mensaje genérico.
    this.logger.error(exception.message, exception.stack);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Ocurrió un error al guardar en la base de datos.',
    });
  }

  private translate(driverError: DriverError): HttpException | null {
    switch (driverError.code) {
      case MYSQL_DUPLICATE_ENTRY:
        return new ConflictException(this.describeDuplicate(driverError.sqlMessage));
      case MYSQL_FK_CONSTRAINT:
        return new ConflictException(
          'No se puede eliminar el registro porque otros datos dependen de él.',
        );
      case MYSQL_FK_MISSING:
        return new ConflictException(
          'La referencia indicada no existe (sede, plan o empresa inválida).',
        );
      default:
        return null;
    }
  }

  /** Extrae el valor repetido para nombrarlo en el mensaje. */
  private describeDuplicate(sqlMessage?: string): string {
    const value = sqlMessage?.match(/Duplicate entry '([^']+)'/)?.[1];
    return value
      ? `El valor "${value}" ya está registrado. Debe ser único.`
      : 'Ya existe un registro con esos datos. Revisa los campos únicos.';
  }
}
