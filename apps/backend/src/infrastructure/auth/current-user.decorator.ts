import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { JwtPayload } from '../../domain/shared/types';

/** Inyecta el payload del JWT verificado en un parámetro del handler. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtPayload => {
    return context.switchToHttp().getRequest<{ user: JwtPayload }>().user;
  },
);
