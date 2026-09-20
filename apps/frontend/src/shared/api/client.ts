/**
 * Cliente HTTP de la API de APEX.
 *
 * Inyecta el JWT en cada petición y centraliza el manejo de errores para que
 * los hooks de TanStack Query solo se ocupen de los datos.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

const TOKEN_STORAGE_KEY = 'apex.token';

/** Error de la API con el código HTTP, para distinguir 401 de un fallo real. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const tokenStorage = {
  get(): string | null {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(TOKEN_STORAGE_KEY);
  },
  set(token: string): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    // La cookie permite que el middleware de Next proteja /backoffice/*
    // antes de que se monte React. No es HttpOnly a propósito: el mismo
    // token debe viajar en el header Authorization desde el cliente.
    document.cookie = `${TOKEN_STORAGE_KEY}=${token}; path=/; SameSite=Lax; max-age=28800`;
  },
  clear(): void {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    document.cookie = `${TOKEN_STORAGE_KEY}=; path=/; SameSite=Lax; max-age=0`;
  },
};

/** Se dispara al recibir un 401, para que AuthProvider cierre la sesión. */
type UnauthorizedHandler = () => void;
let onUnauthorized: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null): void {
  onUnauthorized = handler;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = tokenStorage.get();
  // FormData define su propio Content-Type con el boundary de multipart:
  // fijarlo a JSON aquí rompería la subida de archivos.
  const isFormData = init.body instanceof FormData;

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (response.status === 401) {
    const message = await extractErrorMessage(response);
    const hadSession = tokenStorage.get() !== null;
    tokenStorage.clear();
    // Solo se cierra la sesión si de verdad había una: un 401 al intentar
    // iniciar sesión es una credencial errónea, no una sesión caducada.
    if (hadSession) onUnauthorized?.();
    throw new ApiError(hadSession ? 'Tu sesión expiró. Vuelve a iniciar sesión.' : message, 401);
  }

  if (!response.ok) {
    throw new ApiError(await extractErrorMessage(response), response.status);
  }

  // 204 y otras respuestas sin cuerpo.
  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json();
    // Nest devuelve `message` como string o como array de errores de validación.
    if (Array.isArray(body.message)) return body.message.join('. ');
    if (typeof body.message === 'string') return body.message;
  } catch {
    // Cuerpo vacío o no-JSON: se usa el texto de estado.
  }
  return `Error ${response.status}: ${response.statusText}`;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  /** Sube un binario como multipart/form-data bajo el campo `file`. */
  upload: <T>(path: string, file: File) => {
    const body = new FormData();
    body.append('file', file);
    return request<T>(path, { method: 'POST', body });
  },
};
