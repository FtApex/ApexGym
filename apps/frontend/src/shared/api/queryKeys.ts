/**
 * Claves de caché de TanStack Query, centralizadas para que las mutaciones
 * invaliden exactamente lo mismo que consultan las queries.
 */
export const queryKeys = {
  branches: ['branches'] as const,
  branchBySlug: (slug: string) => ['branches', 'slug', slug] as const,
  company: ['company'] as const,
  memberships: ['memberships'] as const,
  promotions: ['promotions'] as const,
  coupons: ['coupons'] as const,
  clients: ['clients'] as const,
  trainers: ['trainers'] as const,
  sales: ['sales'] as const,
  banners: ['banners'] as const,
  services: ['services'] as const,
  testimonials: ['testimonials'] as const,
  faqs: ['faqs'] as const,
  files: ['files'] as const,
  cmsLanding: ['cms', 'landing'] as const,
  settings: ['settings'] as const,
  permissions: ['permissions'] as const,
  users: ['users'] as const,
  profile: ['auth', 'profile'] as const,
};
