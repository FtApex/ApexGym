"use client";

import { useMemo } from 'react';
import type { UseMutationResult } from '@tanstack/react-query';

interface CrudMutations<T> {
  create: UseMutationResult<T, Error, T>;
  update: UseMutationResult<T, Error, T>;
  remove?: UseMutationResult<{ message: string }, Error, string>;
}

interface CrudActions<T> {
  add: (entity: T) => Promise<unknown>;
  update: (entity: T) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
  /** True mientras cualquiera de las tres mutaciones está en vuelo. */
  isSaving: boolean;
}

/**
 * Adapta las mutaciones de TanStack Query a la forma que esperan los CRUD:
 * callbacks que devuelven una promesa y un único indicador de ocupado.
 *
 * El rechazo se propaga a propósito: así el formulario no cierra su modal
 * cuando la API falla. El mensaje ya lo muestra el toast del hook, de modo
 * que quien llama solo necesita saber que no debe continuar.
 */
export function useCrudActions<T>(mutations: CrudMutations<T>): CrudActions<T> {
  const { create, update, remove } = mutations;

  return useMemo(
    () => ({
      add: (entity: T) => create.mutateAsync(entity),
      update: (entity: T) => update.mutateAsync(entity),
      remove: (id: string) => (remove ? remove.mutateAsync(id) : Promise.resolve()),
      isSaving: create.isPending || update.isPending || (remove?.isPending ?? false),
    }),
    [create, update, remove],
  );
}
