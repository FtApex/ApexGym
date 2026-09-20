"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  CarouselBanner,
  ClientMember,
  Coupon,
  FaqItem,
  GymBranch,
  GymCompany,
  GymService,
  LandingCmsConfig,
  MembershipPlan,
  Promotion,
  R2MasterFile,
  RolePermission,
  SaleInvoice,
  SystemSettings,
  Testimonial,
  Trainer,
  User,
} from '@apex/shared';
import { api } from './client';
import { queryKeys } from './queryKeys';
import { createCrudHooks, createSingletonHooks } from './createCrudHooks';
import { useToast } from '../providers/ToastProvider';

// --- Recursos CRUD estándar -------------------------------------------------

const branches = createCrudHooks<GymBranch>('branches', queryKeys.branches, { article: 'la sede', noun: 'Sede', gender: 'f' });
export const useBranches = branches.useList;
export const useCreateBranch = branches.useCreate;
export const useUpdateBranch = branches.useUpdate;
export const useDeleteBranch = branches.useDelete;

const memberships = createCrudHooks<MembershipPlan>('memberships', queryKeys.memberships, { article: 'el plan', noun: 'Plan', gender: 'm' });
export const useMemberships = memberships.useList;
export const useCreateMembership = memberships.useCreate;
export const useUpdateMembership = memberships.useUpdate;
export const useDeleteMembership = memberships.useDelete;

const promotions = createCrudHooks<Promotion>('promotions', queryKeys.promotions, { article: 'la promoción', noun: 'Promoción', gender: 'f' });
export const usePromotions = promotions.useList;
export const useCreatePromotion = promotions.useCreate;
export const useUpdatePromotion = promotions.useUpdate;
export const useDeletePromotion = promotions.useDelete;

const coupons = createCrudHooks<Coupon>('coupons', queryKeys.coupons, { article: 'el cupón', noun: 'Cupón', gender: 'm' });
export const useCoupons = coupons.useList;
export const useCreateCoupon = coupons.useCreate;
export const useUpdateCoupon = coupons.useUpdate;
export const useDeleteCoupon = coupons.useDelete;

const clients = createCrudHooks<ClientMember>('clients', queryKeys.clients, { article: 'el cliente', noun: 'Cliente', gender: 'm' });
export const useClients = clients.useList;
export const useCreateClient = clients.useCreate;
export const useUpdateClient = clients.useUpdate;
export const useDeleteClient = clients.useDelete;

/** Renovación de membresía: el backend recalcula la fecha de expiración. */
export const useRenewClient = () => {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();
  return useMutation<ClientMember, Error, string>({
    mutationFn: (clientId) => api.post<ClientMember>(`/clients/${clientId}/renew`, {}),
    onSuccess: (client) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clients });
      notifySuccess(`Membresía renovada hasta el ${client.expiryDate}.`);
    },
    onError: (error) => notifyError(`No se pudo renovar la membresía: ${error.message}`),
  });
};

const trainers = createCrudHooks<Trainer>('trainers', queryKeys.trainers, { article: 'el entrenador', noun: 'Entrenador', gender: 'm' });
export const useTrainers = trainers.useList;
export const useCreateTrainer = trainers.useCreate;
export const useUpdateTrainer = trainers.useUpdate;
export const useDeleteTrainer = trainers.useDelete;

const banners = createCrudHooks<CarouselBanner>('banners', queryKeys.banners, { article: 'el banner', noun: 'Banner', gender: 'm' });
export const useBanners = banners.useList;
export const useCreateBanner = banners.useCreate;
export const useUpdateBanner = banners.useUpdate;
export const useDeleteBanner = banners.useDelete;

const services = createCrudHooks<GymService>('services', queryKeys.services, { article: 'el servicio', noun: 'Servicio', gender: 'm' });
export const useServices = services.useList;
export const useCreateService = services.useCreate;
export const useUpdateService = services.useUpdate;
export const useDeleteService = services.useDelete;

const testimonials = createCrudHooks<Testimonial>('testimonials', queryKeys.testimonials, { article: 'el testimonio', noun: 'Testimonio', gender: 'm' });
export const useTestimonials = testimonials.useList;
export const useCreateTestimonial = testimonials.useCreate;
export const useUpdateTestimonial = testimonials.useUpdate;
export const useDeleteTestimonial = testimonials.useDelete;

const faqs = createCrudHooks<FaqItem>('faqs', queryKeys.faqs, { article: 'la pregunta', noun: 'Pregunta frecuente', gender: 'f' });
export const useFaqs = faqs.useList;
export const useCreateFaq = faqs.useCreate;
export const useUpdateFaq = faqs.useUpdate;
export const useDeleteFaq = faqs.useDelete;

const users = createCrudHooks<User>('users', queryKeys.users, { article: 'el usuario', noun: 'Usuario', gender: 'm' });
export const useUsers = users.useList;
export const useDeleteUser = users.useDelete;

// --- Recursos singleton -----------------------------------------------------

const company = createSingletonHooks<GymCompany>('company', queryKeys.company, { article: 'la empresa', noun: 'Empresa' });
export const useCompany = company.useDetail;
export const useUpdateCompany = company.useUpdate;

const cmsLanding = createSingletonHooks<LandingCmsConfig>('cms/landing', queryKeys.cmsLanding, { article: 'la configuración', noun: 'Configuración del CMS' });
export const useCmsLanding = cmsLanding.useDetail;
export const useUpdateCmsLanding = cmsLanding.useUpdate;

const settings = createSingletonHooks<SystemSettings>('settings', queryKeys.settings, { article: 'los ajustes', noun: 'Configuración' });
export const useSettings = settings.useDetail;
export const useUpdateSettings = settings.useUpdate;

// --- Recursos con forma propia ---------------------------------------------

/** Comprobantes de venta: solo lectura y alta (no admiten edición ni borrado). */
export const useSales = () =>
  useQuery<SaleInvoice[], Error>({
    queryKey: queryKeys.sales,
    queryFn: () => api.get<SaleInvoice[]>('/sales'),
  });

export const useCreateSale = () => {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();
  return useMutation<SaleInvoice, Error, SaleInvoice>({
    mutationFn: (invoice) => api.post<SaleInvoice>('/sales', invoice),
    onSuccess: (invoice) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sales });
      notifySuccess(`Comprobante ${invoice.invoiceNumber} emitido.`);
    },
    onError: (error) => notifyError(`No se pudo emitir el comprobante: ${error.message}`),
  });
};

/** Archivos R2: se listan, se registran y se eliminan, pero no se editan. */
export const useMasterFiles = () =>
  useQuery<R2MasterFile[], Error>({
    queryKey: queryKeys.files,
    queryFn: () => api.get<R2MasterFile[]>('/files'),
  });

export const useRegisterFile = () => {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();
  return useMutation<R2MasterFile, Error, R2MasterFile>({
    mutationFn: (file) => api.post<R2MasterFile>('/files', file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.files });
      notifySuccess('Archivo registrado correctamente.');
    },
    onError: (error) => notifyError(`No se pudo registrar el archivo: ${error.message}`),
  });
};

/** Sube el binario del logotipo a R2 y devuelve el archivo con su URL pública. */
export const useUploadLogo = () => {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();
  return useMutation<R2MasterFile, Error, File>({
    mutationFn: (file) => api.upload<R2MasterFile>('/files/logo', file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.files });
      notifySuccess('Logotipo subido correctamente.');
    },
    onError: (error) => notifyError(`No se pudo subir el logotipo: ${error.message}`),
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => api.delete<{ message: string }>(`/files/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.files });
      notifySuccess('Archivo eliminado correctamente.');
    },
    onError: (error) => notifyError(`No se pudo eliminar el archivo: ${error.message}`),
  });
};

/** Matriz RBAC: se lee completa y se guarda completa. */
export const usePermissions = () =>
  useQuery<RolePermission[], Error>({
    queryKey: queryKeys.permissions,
    queryFn: () => api.get<RolePermission[]>('/permissions'),
  });

export const useSavePermissions = () => {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();
  return useMutation<RolePermission[], Error, RolePermission[]>({
    mutationFn: (matrix) => api.put<RolePermission[]>('/permissions', matrix),
    onSuccess: (saved) => {
      queryClient.setQueryData(queryKeys.permissions, saved);
      queryClient.invalidateQueries({ queryKey: queryKeys.permissions });
      notifySuccess('Matriz de permisos actualizada.');
    },
    onError: (error) => notifyError(`No se pudo guardar la matriz: ${error.message}`),
  });
};

/** Sede por slug: alimenta la landing pública `/[branchSlug]`. */
export const useBranchBySlug = (slug: string) =>
  useQuery<GymBranch, Error>({
    queryKey: queryKeys.branchBySlug(slug),
    queryFn: () => api.get<GymBranch>(`/branches/slug/${slug}`),
    enabled: Boolean(slug),
  });
