"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
  type UseQueryResult,
} from '@tanstack/react-query';
import { api } from './client';
import { useToast } from '../providers/ToastProvider';

/** Entidad con identificador, que es lo que necesitan update y delete. */
interface WithId {
  id: string;
}

/** Nombres para los mensajes: "Sede creada", "No se pudo crear la sede". */
export interface ResourceLabels {
  /** Singular con artículo, en femenino o masculino: "la sede", "el cliente". */
  article: string;
  /** Sustantivo solo, para el mensaje de éxito: "Sede", "Cliente". */
  noun: string;
  /** Género gramatical, para concordar el participio. */
  gender: 'f' | 'm';
}

interface CrudHooks<T extends WithId> {
  useList: (options?: { enabled?: boolean }) => UseQueryResult<T[], Error>;
  useCreate: () => ReturnType<typeof useMutation<T, Error, T>>;
  useUpdate: () => ReturnType<typeof useMutation<T, Error, T>>;
  useDelete: () => ReturnType<typeof useMutation<{ message: string }, Error, string>>;
}

/**
 * Genera los hooks CRUD de una entidad REST estándar
 * (`GET /x`, `POST /x`, `PUT /x/:id`, `DELETE /x/:id`).
 *
 * Cada mutación invalida `queryKey` al terminar —para que las vistas reflejen
 * lo que realmente quedó en MySQL— y notifica el resultado por toast, de modo
 * que ningún módulo falle en silencio.
 */
export function createCrudHooks<T extends WithId>(
  resource: string,
  queryKey: QueryKey,
  labels: ResourceLabels,
): CrudHooks<T> {
  const PARTICIPLES = {
    create: { f: 'creada', m: 'creado' },
    update: { f: 'actualizada', m: 'actualizado' },
    delete: { f: 'eliminada', m: 'eliminado' },
  } as const;

  const done = (action: keyof typeof PARTICIPLES) =>
    `${labels.noun} ${PARTICIPLES[action][labels.gender]} correctamente.`;

  const useList = (options?: { enabled?: boolean }) =>
    useQuery<T[], Error>({
      queryKey,
      queryFn: () => api.get<T[]>(`/${resource}`),
      enabled: options?.enabled,
    });

  const useCreate = () => {
    const queryClient = useQueryClient();
    const { notifySuccess, notifyError } = useToast();
    return useMutation<T, Error, T>({
      mutationFn: (entity) => api.post<T>(`/${resource}`, entity),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        notifySuccess(done('create'));
      },
      onError: (error) =>
        notifyError(`No se pudo crear ${labels.article}: ${error.message}`),
    });
  };

  const useUpdate = () => {
    const queryClient = useQueryClient();
    const { notifySuccess, notifyError } = useToast();
    return useMutation<T, Error, T>({
      mutationFn: (entity) => api.put<T>(`/${resource}/${entity.id}`, entity),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        notifySuccess(done('update'));
      },
      onError: (error) =>
        notifyError(`No se pudo actualizar ${labels.article}: ${error.message}`),
    });
  };

  const useDelete = () => {
    const queryClient = useQueryClient();
    const { notifySuccess, notifyError } = useToast();
    return useMutation<{ message: string }, Error, string>({
      mutationFn: (id) => api.delete<{ message: string }>(`/${resource}/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        notifySuccess(done('delete'));
      },
      onError: (error) =>
        notifyError(`No se pudo eliminar ${labels.article}: ${error.message}`),
    });
  };

  return { useList, useCreate, useUpdate, useDelete };
}

/**
 * Hooks para los recursos singleton (`GET /x`, `PUT /x`), como la
 * configuración del CMS o los ajustes del sistema.
 */
export function createSingletonHooks<T>(
  resource: string,
  queryKey: QueryKey,
  labels: Pick<ResourceLabels, 'noun' | 'article'>,
) {
  const useDetail = () =>
    useQuery<T, Error>({
      queryKey,
      queryFn: () => api.get<T>(`/${resource}`),
    });

  const useUpdate = () => {
    const queryClient = useQueryClient();
    const { notifySuccess, notifyError } = useToast();
    return useMutation<T, Error, Partial<T>>({
      mutationFn: (payload) => api.put<T>(`/${resource}`, payload),
      onSuccess: (updated) => {
        queryClient.setQueryData(queryKey, updated);
        queryClient.invalidateQueries({ queryKey });
        notifySuccess(`${labels.noun} guardada correctamente.`);
      },
      onError: (error) =>
        notifyError(`No se pudo guardar ${labels.article}: ${error.message}`),
    });
  };

  return { useDetail, useUpdate };
}
