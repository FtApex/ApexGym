"use client";

import { useCallback, useRef } from 'react';

/**
 * Protege el `onSubmit` de un formulario contra envíos duplicados.
 *
 * Un `<form>` puede emitir varios `submit` antes de que React repinte, así que
 * un `disabled` basado en estado no los frena: en ese instante todavía vale
 * `false`. El cerrojo vive en un `ref`, que sí se actualiza de inmediato.
 */
export function useSubmitGuard(
  handler: (event: React.FormEvent) => Promise<unknown> | unknown,
): (event: React.FormEvent) => void {
  const isRunningRef = useRef(false);
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  return useCallback((event: React.FormEvent) => {
    event.preventDefault();
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    Promise.resolve(handlerRef.current(event)).finally(() => {
      isRunningRef.current = false;
    });
  }, []);
}
