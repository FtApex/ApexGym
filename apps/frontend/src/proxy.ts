import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Primera barrera de acceso al backoffice: sin cookie de sesión se redirige
 * al inicio antes de renderizar nada.
 *
 * Solo comprueba la presencia del token; la validación real de la firma la
 * hace el backend en cada petición (y un token inválido provoca un 401 que
 * cierra la sesión desde AuthProvider).
 */
export function proxy(request: NextRequest) {
  const token = request.cookies.get('apex.token')?.value;

  if (!token) {
    const url = new URL('/', request.url);
    url.searchParams.set('auth', 'required');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  /**
   * Solo se intercepta la navegación de documentos.
   *
   * Las peticiones internas del App Router (`?_rsc=…`, prefetch) quedan fuera
   * a propósito: estas rutas son prerenderizadas y se sirven con `Vary` sobre
   * las cabeceras del enrutador, de modo que pasar por el proxy invalidaba la
   * respuesta RSC y Next caía a una recarga completa de la página en cada
   * cambio de pestaña. Excluirlas no abre un hueco de seguridad, porque el
   * documento inicial sí se verifica aquí, el layout exige sesión en cliente
   * y la API rechaza con 401 cualquier petición sin JWT válido.
   */
  matcher: [
    {
      source: '/backoffice/:path*',
      missing: [
        { type: 'header', key: 'rsc' },
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
