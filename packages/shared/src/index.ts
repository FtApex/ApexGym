export type UserRole =
  | 'SUPER_ADMIN'
  | 'COMPANY_ADMIN'
  | 'SEDE_ADMIN'
  | 'RECEPTION'
  | 'TRAINER'
  | 'CLIENT';

/** Identificadores estables de cada módulo protegible del backoffice. */
export type PermissionModule =
  | 'DASHBOARD'
  | 'COMPANIES'
  | 'BRANCHES'
  | 'CLIENTS'
  | 'MEMBERSHIPS'
  | 'PROMOTIONS'
  | 'COUPONS'
  | 'SALES'
  | 'FILES'
  | 'CMS'
  | 'REPORTS'
  | 'SETTINGS'
  | 'PERMISSIONS';

export interface RolePermission {
  id: string;
  role: UserRole;
  module: PermissionModule;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  photoUrl?: string;
  phone?: string;
  companyId?: string;
  branchId?: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastLoginAt?: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

/** Payload firmado dentro del JWT. */
export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  companyId?: string;
  branchId?: string;
}

export interface GymCompany {
  id: string;
  name: string;
  ruc: string;
  razonSocial: string;
  logo: string;
  email: string;
  phone: string;
  brandColor: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface GymBranch {
  id: string;
  companyId: string;
  slug: string; // e.g. san-miguel
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  schedule: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  photos: string[];
  logo: string;
  status: 'ACTIVE' | 'INACTIVE';
  services: string[];
  equipmentCount: number;
  trainersCount: number;
}

export interface CarouselBanner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
  darkOverlay: number; // percentage e.g. 40
  startDate: string;
  endDate: string;
  order: number;
  status: 'ACTIVE' | 'INACTIVE' | 'SCHEDULED';
}

export interface GymService {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon identifier
  imageUrl: string;
  featured: boolean;
  order: number;
}

export interface MembershipPlan {
  id: string;
  name: string;
  durationMonths: number;
  price: number;
  originalPrice?: number;
  benefits: string[];
  imageUrl: string;
  badge?: string; // e.g. "MÁS POPULAR", "RECOMENDADO"
  color: string;
  priority: number;
  visible: boolean;
  status: 'ACTIVE' | 'INACTIVE';
  branches: string[]; // branch IDs or 'ALL'
}

export type PromoStatus = 'PROGRAMMED' | 'ACTIVE' | 'EXPIRED';

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  bannerUrl?: string;
  branchId: string; // 'ALL' or specific branch ID
  membershipId?: string;
  normalPrice: number;
  offerPrice: number;
  discountPercentage: number;
  badge: 'NUEVO' | 'HOT' | 'LIMITADO';
  startDate: string;
  endDate: string;
  priority: number;
  color: string;
  status: PromoStatus;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  type: 'PERCENTAGE' | 'FIXED_AMOUNT';
  amount: number;
  maxUses: number;
  currentUses: number;
  userLimit: number;
  applicableMemberships: string[]; // 'ALL' or membership IDs
  applicableBranches: string[]; // 'ALL' or branch IDs
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
}

export interface ClientMember {
  id: string;
  photoUrl: string;
  fullName: string;
  documentType: 'DNI' | 'CE' | 'PASSPORT';
  documentNumber: string;
  email: string;
  phone: string;
  branchId: string;
  membershipId: string;
  membershipName: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'FROZEN';
  joinDate: string;
  expiryDate: string;
  renewalsCount: number;
  notes?: string;
}

export interface Trainer {
  id: string;
  photoUrl: string;
  fullName: string;
  specialty: string;
  schedule: string;
  branchId: string;
  bio: string;
  socials: {
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
  };
  status: 'ACTIVE' | 'INACTIVE';
}

export interface SaleInvoice {
  id: string;
  invoiceNumber: string;
  documentType: 'BOLETA' | 'FACTURA';
  clientName: string;
  clientDoc: string;
  branchId: string;
  branchName: string;
  membershipName: string;
  promoName?: string;
  couponCode?: string;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'MERCADOPAGO' | 'CULQI' | 'NIUBIZ' | 'TARJETA' | 'EFECTIVO';
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED' | 'REFUNDED';
  date: string;
}

export interface R2MasterFile {
  id: string;
  name: string;
  folder: 'Carousel' | 'Promociones' | 'Sedes' | 'Entrenadores' | 'Logos' | 'Documentos' | 'Iconos';
  url: string;
  sizeBytes: number;
  fileType: 'image' | 'pdf' | 'video';
  uploadDate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  branch: string;
  photoUrl: string;
  comment: string;
  rating: number; // 1 to 5
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

/** Identificadores de las secciones ordenables de la landing. */
export type CmsSectionId =
  | 'hero'
  | 'services'
  | 'promotions'
  | 'memberships'
  | 'sedes'
  | 'about'
  | 'testimonials'
  | 'faq'
  | 'footer';

export interface CmsSection {
  id: string;
  sectionId: CmsSectionId;
  name: string;
  enabled: boolean;
  order: number;
}

export interface LandingCmsConfig {
  id: string;
  heroCarouselActive: boolean;
  servicesActive: boolean;
  promotionsActive: boolean;
  membershipsActive: boolean;
  sedesActive: boolean;
  aboutActive: boolean;
  testimonialsActive: boolean;
  faqActive: boolean;
  footerActive: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  sections: CmsSection[];
}

export interface SystemSettings {
  id: string;
  appName: string;
  brandColor: string;
  logoUrl: string;
  faviconUrl: string;
  r2Endpoint: string;
  r2BucketName: string;
  r2AccessKey: string;
  r2SecretKey: string;
  selectedGateway: 'MERCADOPAGO' | 'CULQI' | 'NIUBIZ' | 'IZIPAY';
  mercadoPagoPublicKey: string;
  mercadoPagoAccessToken: string;
  culqiPublicKey: string;
  niubizMerchantId: string;
  googleAnalyticsId: string;
  metaPixelId: string;
  whatsappNumber: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
}

export * from './seed-data';
