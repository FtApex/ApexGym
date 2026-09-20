"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useBusyAction } from '../hooks/useBusyAction';

interface ActionButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   * Acción a ejecutar. Si devuelve una promesa, el botón permanece bloqueado
   * hasta que se resuelve.
   */
  onAction: () => unknown | Promise<unknown>;
  /** Texto mostrado mientras la acción está en curso. */
  busyLabel?: string;
  /** Fuerza el estado de carga desde fuera (p. ej. `mutation.isPending`). */
  isBusy?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Botón que garantiza una sola ejecución por acción.
 *
 * Mientras la acción corre queda deshabilitado y muestra un spinner, y los
 * clics repetidos se ignoran aunque el navegador los entregue antes de que
 * React repinte.
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  onAction,
  busyLabel,
  isBusy: externalBusy = false,
  icon,
  children,
  disabled,
  className = '',
  type = 'button',
  ...rest
}) => {
  const { run, isBusy } = useBusyAction(onAction);
  const busy = isBusy || externalBusy;

  return (
    <button
      {...rest}
      type={type}
      disabled={busy || disabled}
      aria-busy={busy}
      onClick={() => {
        void run();
      }}
      className={`disabled:opacity-60 disabled:cursor-not-allowed transition-opacity ${className}`}
    >
      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      <span>{busy ? (busyLabel ?? 'Procesando...') : children}</span>
    </button>
  );
};

interface SubmitButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  isBusy: boolean;
  busyLabel?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Variante para formularios: el envío lo dispara `<form onSubmit>`, así que
 * aquí solo se refleja el estado de carga y se bloquea el reenvío.
 */
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isBusy,
  busyLabel,
  icon,
  children,
  disabled,
  className = '',
  ...rest
}) => (
  <button
    {...rest}
    type="submit"
    disabled={isBusy || disabled}
    aria-busy={isBusy}
    className={`disabled:opacity-60 disabled:cursor-not-allowed transition-opacity ${className}`}
  >
    {isBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
    <span>{isBusy ? (busyLabel ?? 'Guardando...') : children}</span>
  </button>
);
