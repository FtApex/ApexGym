"use client";

import { useCallback, useEffect, useRef, useState } from 'react';

interface BusyAction<TArgs extends unknown[]> {
  /** Ejecuta la acción, ignorando llamadas mientras la anterior sigue en curso. */
  run: (...args: TArgs) => Promise<void>;
  isBusy: boolean;
  /** Mensaje del último fallo, o null si la acción terminó bien. */
  error: string | null;
}

/**
 * Envuelve una acción asíncrona para que no pueda ejecutarse dos veces a la vez.
 *
 * El cerrojo vive en un `ref` y no en el estado: `setState` es asíncrono, así
 * que dos clics en el mismo tick verían ambos `isBusy === false` y dispararían
 * la petición por duplicado. El `ref` se actualiza de inmediato y sí los frena.
 */
export function useBusyAction<TArgs extends unknown[]>(
  action: (...args: TArgs) => unknown | Promise<unknown>,
  options?: { onError?: (error: Error) => void },
): BusyAction<TArgs> {
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isRunningRef = useRef(false);
  // Evita actualizar el estado si el componente se desmonta durante la acción
  // (frecuente: guardar cierra el modal que contiene el botón).
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // La acción se guarda en un ref para que `run` mantenga una identidad estable
  // aunque el componente vuelva a renderizar con un closure nuevo.
  const actionRef = useRef(action);
  actionRef.current = action;

  const onErrorRef = useRef(options?.onError);
  onErrorRef.current = options?.onError;

  const run = useCallback(async (...args: TArgs) => {
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    setIsBusy(true);
    setError(null);

    try {
      await actionRef.current(...args);
    } catch (err) {
      const failure = err instanceof Error ? err : new Error(String(err));
      if (isMountedRef.current) setError(failure.message);
      onErrorRef.current?.(failure);
    } finally {
      isRunningRef.current = false;
      if (isMountedRef.current) setIsBusy(false);
    }
  }, []);

  return { run, isBusy, error };
}
