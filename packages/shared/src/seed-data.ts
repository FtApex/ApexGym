/**
 * Datos iniciales de la plataforma (contenido de demostración de ApexGym).
 * Los consume el seeder del backend para poblar MySQL; el frontend puede
 * usarlos como respaldo mientras un módulo no esté conectado a la API.
 */
import { 
  GymCompany, 
  GymBranch, 
  CarouselBanner, 
  GymService, 
  MembershipPlan, 
  Promotion, 
  Coupon, 
  ClientMember, 
  Trainer, 
  SaleInvoice, 
  R2MasterFile, 
  Testimonial, 
  FaqItem, 
  LandingCmsConfig,
  SystemSettings,
  UserRole,
  PermissionModule,
  RolePermission
} from './index';

export const initialCompany: GymCompany = {
  id: 'comp-1',
  name: 'ApexGym Peru',
  ruc: '20601234567',
  razonSocial: 'APEX FITNESS ENTERPRISE S.A.C.',
  logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=300',
  email: 'contacto@apexgym.pe',
  phone: '+51 987 654 321',
  brandColor: '#E11D48',
  status: 'ACTIVE'
};

export const initialBranches: GymBranch[] = [
  {
    id: 'sede-san-miguel',
    companyId: 'comp-1',
    slug: 'san-miguel',
    name: 'Sede San Miguel',
    address: 'Av. La Marina 2100, San Miguel, Lima',
    city: 'Lima',
    lat: -12.0769,
    lng: -77.0872,
    schedule: 'Lunes a Viernes 05:00 - 23:00 | Sábados y Domingos 06:00 - 20:00',
    phone: '+51 (01) 456-7890',
    whatsapp: '+51 912 345 678',
    email: 'sanmiguel@apexgym.pe',
    instagram: '@apexgym.sanmiguel',
    facebook: 'ApexGymSanMiguel',
    tiktok: '@apexgym.sm',
    photos: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200',
    status: 'ACTIVE',
    services: ['Cardio Area', 'Musculación VIP', 'CrossFit Box', 'Sauna Seco', 'Nutrición In-site'],
    equipmentCount: 140,
    trainersCount: 12
  },
  {
    id: 'sede-surco',
    companyId: 'comp-1',
    slug: 'surco',
    name: 'Sede Surco Primavera',
    address: 'Av. Primavera 120, Chacarilla, Surco, Lima',
    city: 'Lima',
    lat: -12.1123,
    lng: -76.9854,
    schedule: 'Lunes a Domingo 24 Horas (Acceso Biométrico)',
    phone: '+51 (01) 456-7891',
    whatsapp: '+51 923 456 789',
    email: 'surco@apexgym.pe',
    instagram: '@apexgym.surco',
    facebook: 'ApexGymSurco',
    tiktok: '@apexgym.surco',
    photos: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200',
    status: 'ACTIVE',
    services: ['Spinning Imersivo', 'Yoga Studio', 'Cafetería Fit', 'Parqueo Privado VIP'],
    equipmentCount: 180,
    trainersCount: 15
  },
  {
    id: 'sede-miraflores',
    companyId: 'comp-1',
    slug: 'miraflores',
    name: 'Sede Miraflores Larco',
    address: 'Av. José Larco 880, Miraflores, Lima',
    city: 'Lima',
    lat: -12.1228,
    lng: -77.0305,
    schedule: 'Lunes a Viernes 05:30 - 23:30 | Sábados y Festivos 06:00 - 21:00',
    phone: '+51 (01) 456-7892',
    whatsapp: '+51 934 567 890',
    email: 'miraflores@apexgym.pe',
    instagram: '@apexgym.miraflores',
    facebook: 'ApexGymMiraflores',
    tiktok: '@apexgym.miraflores',
    photos: [
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200',
    status: 'ACTIVE',
    services: ['Piscina Climatizada', 'Recovery Zone', 'Box de MMA', 'Smart Lockers'],
    equipmentCount: 210,
    trainersCount: 18
  }
];

export const initialBanners: CarouselBanner[] = [
  {
    id: 'banner-1',
    title: 'TRANSFORMA TU VIDA EN APEXGYM',
    subtitle: 'Temporada Verano 2026',
    description: 'Aprovecha hasta 50% de descuento en el Plan Black Anual con acceso a todas las sedes y pase de invitado sin costo.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1600',
    buttonText: 'Ver Membresías',
    buttonUrl: '#membresias',
    darkOverlay: 50,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    order: 1,
    status: 'ACTIVE'
  },
  {
    id: 'banner-2',
    title: 'NUEVA SEDE MIRAFLORES LARCO',
    subtitle: 'Infraestructura de Clase Mundial',
    description: 'Piscina climatizada, zona de recovery cryo y máquinas Hammer Strength de última generación.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1600',
    buttonText: 'Conocer Sede',
    buttonUrl: '#sedes',
    darkOverlay: 45,
    startDate: '2026-02-01',
    endDate: '2026-12-31',
    order: 2,
    status: 'ACTIVE'
  },
  {
    id: 'banner-3',
    title: 'PERSONAL TRAINING & NUTRICIÓN VIP',
    subtitle: 'Resultados Garantizados',
    description: 'Planes a la medida con evaluación inBody mensual y seguimiento nutricional por app.',
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=1600',
    buttonText: 'Agendar Evaluación',
    buttonUrl: '#contacto',
    darkOverlay: 50,
    startDate: '2026-01-15',
    endDate: '2026-11-30',
    order: 3,
    status: 'ACTIVE'
  }
];

export const initialServices: GymService[] = [
  {
    id: 'serv-1',
    title: 'Área de Musculación & Pesas',
    description: 'Equipamiento de fuerza biomecánico Hammer Strength y pesas libres con racks olímpicos.',
    iconName: 'Dumbbell',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
    featured: true,
    order: 1
  },
  {
    id: 'serv-2',
    title: 'Zona Cardio Hi-Tech',
    description: 'Trotadoras, elípticas y caminadoras inclinadas con pantallas interactivas de entretenimiento.',
    iconName: 'Activity',
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=600',
    featured: true,
    order: 2
  },
  {
    id: 'serv-3',
    title: 'CrossFit & High Intensity',
    description: 'Rigs profesionales, kettlebells, barras olímpicas y cajones para entrenamientos funcionales.',
    iconName: 'Flame',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
    featured: true,
    order: 3
  },
  {
    id: 'serv-4',
    title: 'Yoga, Pilates & Mindfulness',
    description: 'Salones acustizados con iluminación tenue para flexibilidad, fuerza de core y relajación.',
    iconName: 'HeartHandshake',
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=600',
    featured: false,
    order: 4
  },
  {
    id: 'serv-5',
    title: 'Spinning Studio Imersivo',
    description: 'Bicicletas de alta precisión con luces audiorítmicas y playlists de DJs exclusivos.',
    iconName: 'Zap',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600',
    featured: false,
    order: 5
  },
  {
    id: 'serv-6',
    title: 'Box & Artes Marciales',
    description: 'Ring profesional, sacos pesados y sesiones tácticas de combate y resistencia física.',
    iconName: 'Shield',
    imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=600',
    featured: false,
    order: 6
  },
  {
    id: 'serv-7',
    title: 'Entrenamiento Personalizado',
    description: 'Coaches certificados focalizados en tu transformación física rápida y libre de lesiones.',
    iconName: 'UserCheck',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600',
    featured: true,
    order: 7
  },
  {
    id: 'serv-8',
    title: 'Asesoría Nutricional & InBody',
    description: 'Bioimpedancia eléctrica para medir grasa visceral, masa muscular y bio-dieta personalizada.',
    iconName: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600',
    featured: false,
    order: 8
  }
];

export const initialMemberships: MembershipPlan[] = [
  {
    id: 'plan-mensual',
    name: 'Plan Mensual Apex',
    durationMonths: 1,
    price: 149,
    originalPrice: 189,
    benefits: [
      'Acceso ilimitado a 1 Sede',
      'Evaluación física inicial',
      'Uso de casilleros diarios',
      'App Apex Fitness Tracker'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400',
    color: '#3B82F6',
    priority: 1,
    visible: true,
    status: 'ACTIVE',
    branches: ['ALL']
  },
  {
    id: 'plan-trimestral',
    name: 'Plan Trimestral Pro',
    durationMonths: 3,
    price: 369,
    originalPrice: 450,
    benefits: [
      'Acceso ilimitado a 1 Sede',
      'Evaluación inBody mensual',
      '1 Pase VIP de invitado mensual',
      'Acceso a Clases Grupales',
      'Casillero prioritario'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=400',
    badge: 'MÁS POPULAR',
    color: '#10B981',
    priority: 2,
    visible: true,
    status: 'ACTIVE',
    branches: ['ALL']
  },
  {
    id: 'plan-semestral',
    name: 'Plan Semestral Power',
    durationMonths: 6,
    price: 649,
    originalPrice: 850,
    benefits: [
      'Acceso Multisede Nacional',
      '2 Pases VIP de invitado al mes',
      '2 Consultas de Nutrición',
      '2 Sesiones de Personal Trainer',
      'Congelamiento de 15 días gratis'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400',
    color: '#F59E0B',
    priority: 3,
    visible: true,
    status: 'ACTIVE',
    branches: ['ALL']
  },
  {
    id: 'plan-anual-black',
    name: 'Plan Anual Black VIP',
    durationMonths: 12,
    price: 999,
    originalPrice: 1590,
    benefits: [
      'Acceso Multisede Nacional e Internacional',
      'Pase de Invitado Ilimitado (1 por día)',
      'Plan Nutricional 100% Personalizado',
      'Acceso exclusivo a Zona Recovery & Sauna',
      'Congelamiento hasta por 60 días',
      'Polo o Bote de Proteína de Bienvenida'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=400',
    badge: 'RECOMENDADO VIP',
    color: '#E11D48',
    priority: 4,
    visible: true,
    status: 'ACTIVE',
    branches: ['ALL']
  }
];

export const initialPromotions: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Black Gym November 2x1',
    description: 'Matricúlate en el Plan Anual Black e inscribe gratis a un familiar o amigo.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
    branchId: 'ALL',
    membershipId: 'plan-anual-black',
    normalPrice: 1998,
    offerPrice: 999,
    discountPercentage: 50,
    badge: 'HOT',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    priority: 1,
    color: '#E11D48',
    status: 'ACTIVE'
  },
  {
    id: 'promo-2',
    title: 'Apertura Sede Miraflores',
    description: '50% de descuento en matrícula + membresía trimestral con suplemento regalo.',
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=600',
    branchId: 'sede-miraflores',
    membershipId: 'plan-trimestral',
    normalPrice: 450,
    offerPrice: 299,
    discountPercentage: 33,
    badge: 'NUEVO',
    startDate: '2026-07-01',
    endDate: '2026-09-30',
    priority: 2,
    color: '#3B82F6',
    status: 'ACTIVE'
  },
  {
    id: 'promo-3',
    title: 'Pase Duo Verano Surco',
    description: 'Inscríbete en pareja en la Sede Surco Primavera y paguen solo S/280/mes.',
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=600',
    branchId: 'sede-surco',
    membershipId: 'plan-mensual',
    normalPrice: 378,
    offerPrice: 280,
    discountPercentage: 25,
    badge: 'LIMITADO',
    startDate: '2026-08-01',
    endDate: '2026-10-31',
    priority: 3,
    color: '#10B981',
    status: 'PROGRAMMED'
  },
  {
    id: 'promo-4',
    title: 'Cyber Fit San Miguel',
    description: 'Últimas 20 vacantes para el Plan Semestral Power con costo cero de matrícula.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
    branchId: 'sede-san-miguel',
    membershipId: 'plan-semestral',
    normalPrice: 850,
    offerPrice: 599,
    discountPercentage: 30,
    badge: 'HOT',
    startDate: '2026-03-01',
    endDate: '2026-05-30',
    priority: 4,
    color: '#6B7280',
    status: 'EXPIRED'
  }
];

export const initialCoupons: Coupon[] = [
  {
    id: 'cup-1',
    code: 'APEXFIT20',
    description: '20% de Descuento adicional en cualquier membresía anual.',
    type: 'PERCENTAGE',
    amount: 20,
    maxUses: 100,
    currentUses: 42,
    userLimit: 1,
    applicableMemberships: ['plan-anual-black', 'plan-semestral'],
    applicableBranches: ['ALL'],
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'ACTIVE'
  },
  {
    id: 'cup-2',
    code: 'MIRAFLORES50',
    description: 'Descuento directo de S/50 soles en Sede Miraflores.',
    type: 'FIXED_AMOUNT',
    amount: 50,
    maxUses: 50,
    currentUses: 18,
    userLimit: 1,
    applicableMemberships: ['ALL'],
    applicableBranches: ['sede-miraflores'],
    startDate: '2026-07-01',
    endDate: '2026-09-30',
    status: 'ACTIVE'
  },
  {
    id: 'cup-3',
    code: 'VERANOFIT',
    description: '15% de descuento en el plan Trimestral.',
    type: 'PERCENTAGE',
    amount: 15,
    maxUses: 200,
    currentUses: 198,
    userLimit: 1,
    applicableMemberships: ['plan-trimestral'],
    applicableBranches: ['ALL'],
    startDate: '2026-01-01',
    endDate: '2026-07-30',
    status: 'EXPIRED'
  }
];

export const initialClients: ClientMember[] = [
  {
    id: 'cli-1',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    fullName: 'Mariana Gómez Sotomayor',
    documentType: 'DNI',
    documentNumber: '72849102',
    email: 'mariana.gomez@gmail.com',
    phone: '+51 981 234 567',
    branchId: 'sede-miraflores',
    membershipId: 'plan-anual-black',
    membershipName: 'Plan Anual Black VIP',
    status: 'ACTIVE',
    joinDate: '2025-08-15',
    expiryDate: '2026-08-15',
    renewalsCount: 2,
    notes: 'Entrena temprano a las 6:30 am. Utiliza servicio de InBody mensual.'
  },
  {
    id: 'cli-2',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    fullName: 'Renzo Alarcón Paredes',
    documentType: 'DNI',
    documentNumber: '45910283',
    email: 'ralarcon@hotmail.com',
    phone: '+51 972 345 678',
    branchId: 'sede-san-miguel',
    membershipId: 'plan-semestral',
    membershipName: 'Plan Semestral Power',
    status: 'ACTIVE',
    joinDate: '2026-02-10',
    expiryDate: '2026-08-10',
    renewalsCount: 1,
    notes: 'Clases de CrossFit los Martes y Jueves.'
  },
  {
    id: 'cli-3',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    fullName: 'Camila Torres Vargas',
    documentType: 'CE',
    documentNumber: '001928374',
    email: 'camila.torres@outlook.com',
    phone: '+51 963 456 789',
    branchId: 'sede-surco',
    membershipId: 'plan-trimestral',
    membershipName: 'Plan Trimestral Pro',
    status: 'EXPIRED',
    joinDate: '2026-01-05',
    expiryDate: '2026-04-05',
    renewalsCount: 0,
    notes: 'Pendiente de llamada de renovación con promoción de Sede Surco.'
  },
  {
    id: 'cli-4',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    fullName: 'Diego Mendoza Rivas',
    documentType: 'DNI',
    documentNumber: '71029384',
    email: 'dmendoza@yahoo.es',
    phone: '+51 954 567 890',
    branchId: 'sede-miraflores',
    membershipId: 'plan-anual-black',
    membershipName: 'Plan Anual Black VIP',
    status: 'ACTIVE',
    joinDate: '2026-03-20',
    expiryDate: '2027-03-20',
    renewalsCount: 3,
    notes: 'Atleta de fisicoculturismo. Asignado a Coach Carlos Mendoza.'
  },
  {
    id: 'cli-5',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    fullName: 'Lucía Fernández Castro',
    documentType: 'DNI',
    documentNumber: '73920194',
    email: 'lfernandez@gmail.com',
    phone: '+51 945 678 901',
    branchId: 'sede-san-miguel',
    membershipId: 'plan-mensual',
    membershipName: 'Plan Mensual Apex',
    status: 'PENDING',
    joinDate: '2026-07-20',
    expiryDate: '2026-08-20',
    renewalsCount: 0,
    notes: 'Pago registrado por transferencia BCP, pendiente validación de baucher.'
  }
];

export const initialTrainers: Trainer[] = [
  {
    id: 'tr-1',
    photoUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=300',
    fullName: 'Carlos Mendoza',
    specialty: 'CrossFit & Powerlifting Specialist',
    schedule: '06:00 AM - 02:00 PM',
    branchId: 'sede-san-miguel',
    bio: 'Ex-atleta de alto rendimiento con 8 años guiando a personas a superar sus límites físicos.',
    socials: {
      instagram: '@carlos.crossfit.pe',
      tiktok: '@coachmendoza'
    },
    status: 'ACTIVE'
  },
  {
    id: 'tr-2',
    photoUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300',
    fullName: 'Sofía Benítez',
    specialty: 'Yoga Vinyasa, Pilates & Core Stability',
    schedule: '07:00 AM - 03:00 PM',
    branchId: 'sede-surco',
    bio: 'Certificada por Yoga Alliance en India. Especialista en corrección postural y biomecánica.',
    socials: {
      instagram: '@sofiayoga.pe',
      linkedin: 'linkedin.com/in/sofiabenitez'
    },
    status: 'ACTIVE'
  },
  {
    id: 'tr-3',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    fullName: 'Mateo Silva',
    specialty: 'Hipertrofia, Musculación & Nutrición',
    schedule: '02:00 PM - 10:00 PM',
    branchId: 'sede-miraflores',
    bio: 'Licenciado en Ciencias del Deporte con más de 500 transformaciones corporales comprobadas.',
    socials: {
      instagram: '@mateosilvafit',
      tiktok: '@mateosilvacoach'
    },
    status: 'ACTIVE'
  }
];

export const initialInvoices: SaleInvoice[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'B001-000482',
    documentType: 'BOLETA',
    clientName: 'Mariana Gómez Sotomayor',
    clientDoc: '72849102',
    branchId: 'sede-miraflores',
    branchName: 'Sede Miraflores Larco',
    membershipName: 'Plan Anual Black VIP',
    promoName: 'Black Gym November 2x1',
    couponCode: 'APEXFIT20',
    subtotal: 999,
    discount: 199.8,
    total: 799.20,
    paymentMethod: 'MERCADOPAGO',
    status: 'COMPLETED',
    date: '2026-07-25 10:30 AM'
  },
  {
    id: 'inv-102',
    invoiceNumber: 'F001-000129',
    documentType: 'FACTURA',
    clientName: 'Renzo Alarcón Paredes',
    clientDoc: '20609876543',
    branchId: 'sede-san-miguel',
    branchName: 'Sede San Miguel',
    membershipName: 'Plan Semestral Power',
    subtotal: 649,
    discount: 0,
    total: 649.00,
    paymentMethod: 'NIUBIZ',
    status: 'COMPLETED',
    date: '2026-07-24 04:15 PM'
  },
  {
    id: 'inv-103',
    invoiceNumber: 'B001-000483',
    documentType: 'BOLETA',
    clientName: 'Camila Torres Vargas',
    clientDoc: '001928374',
    branchId: 'sede-surco',
    branchName: 'Sede Surco Primavera',
    membershipName: 'Plan Trimestral Pro',
    couponCode: 'VERANOFIT',
    subtotal: 369,
    discount: 55.35,
    total: 313.65,
    paymentMethod: 'CULQI',
    status: 'COMPLETED',
    date: '2026-07-23 06:45 PM'
  },
  {
    id: 'inv-104',
    invoiceNumber: 'B001-000484',
    documentType: 'BOLETA',
    clientName: 'Diego Mendoza Rivas',
    clientDoc: '71029384',
    branchId: 'sede-miraflores',
    branchName: 'Sede Miraflores Larco',
    membershipName: 'Plan Anual Black VIP',
    subtotal: 999,
    discount: 0,
    total: 999.00,
    paymentMethod: 'TARJETA',
    status: 'COMPLETED',
    date: '2026-07-22 09:10 AM'
  }
];

export const initialMasterFiles: R2MasterFile[] = [
  {
    id: 'file-1',
    name: 'banner_verano_black_2026.png',
    folder: 'Carousel',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200',
    sizeBytes: 2450000,
    fileType: 'image',
    uploadDate: '2026-07-20'
  },
  {
    id: 'file-2',
    name: 'fachada_miraflores_hq.jpg',
    folder: 'Sedes',
    url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=1200',
    sizeBytes: 1850000,
    fileType: 'image',
    uploadDate: '2026-07-18'
  },
  {
    id: 'file-3',
    name: 'flyer_promo_2x1_black.png',
    folder: 'Promociones',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200',
    sizeBytes: 3100000,
    fileType: 'image',
    uploadDate: '2026-07-15'
  },
  {
    id: 'file-4',
    name: 'logo_apexgym_vector_white.png',
    folder: 'Logos',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=300',
    sizeBytes: 420000,
    fileType: 'image',
    uploadDate: '2026-06-10'
  },
  {
    id: 'file-5',
    name: 'reglamento_interno_apexgym_2026.pdf',
    folder: 'Documentos',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    sizeBytes: 1200000,
    fileType: 'pdf',
    uploadDate: '2026-01-10'
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Valeria Castro',
    role: 'Miembro VIP hace 2 años',
    branch: 'Sede Miraflores',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    comment: 'La mejor decisión de mi vida. Las máquinas Hammer Strength, la piscina climatizada y la asesoría nutricional cambiaron totalmente mi estilo de vida.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Fernando Ruiz',
    role: 'Atleta CrossFit',
    branch: 'Sede San Miguel',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    comment: 'Los entrenadores en la Sede San Miguel están sumamente capacitados. El ambiente es motivador y súper limpio todo el tiempo.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Andrea Morales',
    role: 'Socia Plan Black',
    branch: 'Sede Surco',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    comment: 'El acceso 24 horas en Surco me permite entrenar después de mis turnos de trabajo sin ningún problema. ¡10/10 en tecnología e instalaciones!',
    rating: 5
  }
];

export const initialFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Puedo entrenar en cualquier sede con mi membresía?',
    answer: 'Sí, el Plan Anual Black VIP y el Plan Semestral Power incluyen acceso Multisede ilimitado a todas nuestras ubicaciones (San Miguel, Surco Primavera y Miraflores Larco).',
    category: 'Membresías'
  },
  {
    id: 'faq-2',
    question: '¿Qué incluye la evaluación nutricional InBody?',
    answer: 'Incluye escaneo de bioimpedancia cuántica para analizar porcentaje exacto de grasa corporal, masa muscular esquelética, retención de agua y tasa metabólica basal.',
    category: 'Servicios'
  },
  {
    id: 'faq-3',
    question: '¿Puedo congelar mi membresía si me voy de viaje?',
    answer: 'Por supuesto. El Plan Anual Black permite congelamiento (freeze) gratuito de hasta 60 días acumulables durante la vigencia de tu plan.',
    category: 'Membresías'
  },
  {
    id: 'faq-4',
    question: '¿Cómo funciona el pase de invitado VIP?',
    answer: 'Con el Plan Black puedes traer a un invitado diferente cada día de forma totalmente gratuita para que entrene contigo y disfrute de las instalaciones.',
    category: 'Beneficios'
  }
];

export const initialLandingCms: LandingCmsConfig = {
  id: 'landing-cms',
  sections: [
    { id: 'sec-hero', sectionId: 'hero', name: 'Carrusel Hero Banners', enabled: true, order: 1 },
    { id: 'sec-services', sectionId: 'services', name: 'Servicios & Clases Pro', enabled: true, order: 2 },
    { id: 'sec-promotions', sectionId: 'promotions', name: 'Promociones & Campañas', enabled: true, order: 3 },
    { id: 'sec-memberships', sectionId: 'memberships', name: 'Planes de Membresía', enabled: true, order: 4 },
    { id: 'sec-sedes', sectionId: 'sedes', name: 'Sedes & Selector Landing', enabled: true, order: 5 },
    { id: 'sec-about', sectionId: 'about', name: 'Nosotros & Team Coaches', enabled: true, order: 6 },
    { id: 'sec-testimonials', sectionId: 'testimonials', name: 'Testimonios & Reviews', enabled: true, order: 7 },
    { id: 'sec-faq', sectionId: 'faq', name: 'Preguntas Frecuentes FAQ', enabled: true, order: 8 },
    { id: 'sec-footer', sectionId: 'footer', name: 'Footer & Contacto', enabled: true, order: 9 }
  ],
  heroCarouselActive: true,
  servicesActive: true,
  promotionsActive: true,
  membershipsActive: true,
  sedesActive: true,
  aboutActive: true,
  testimonialsActive: true,
  faqActive: true,
  footerActive: true,
  seoTitle: 'ApexGym Peru | La Red de Gimnasios Fitness Premium más Moderna',
  seoDescription: 'Únete a ApexGym. Instalaciones Hi-Tech, entrenadores certificados, nutrición InBody y membresías VIP. Sedes en San Miguel, Surco y Miraflores.',
  seoKeywords: 'gimnasio peru, gym miraflores, gym surco, gym san miguel, fitness lima, spinning, crossfit, pesas'
};

/**
 * Las credenciales de integraciones se dejan vacías a propósito: se cargan
 * desde el backoffice o por variables de entorno, nunca desde el repositorio.
 */
export const initialSystemSettings: SystemSettings = {
  id: 'system',
  appName: 'ApexGym SaaS',
  brandColor: '#E11D48',
  logoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200',
  faviconUrl: '/favicon.ico',
  r2Endpoint: '',
  r2BucketName: '',
  r2AccessKey: '',
  r2SecretKey: '',
  selectedGateway: 'MERCADOPAGO',
  mercadoPagoPublicKey: '',
  mercadoPagoAccessToken: '',
  culqiPublicKey: '',
  niubizMerchantId: '',
  googleAnalyticsId: '',
  metaPixelId: '',
  whatsappNumber: '+51912345678',
  smtpHost: '',
  smtpPort: 587,
  smtpUser: ''
};

/** Usuario semilla: la contraseña real se define por entorno en el seeder. */
export interface SeedUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  photoUrl?: string;
  phone?: string;
  companyId?: string;
  branchId?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export const initialUsers: SeedUser[] = [
  {
    id: 'usr-superadmin',
    fullName: 'Aaron Palomino',
    email: 'superadmin@apexgym.pe',
    role: 'SUPER_ADMIN',
    companyId: 'comp-1',
    status: 'ACTIVE',
    createdAt: '2025-01-01'
  },
  {
    id: 'usr-admin-sanmiguel',
    fullName: 'Patricia Ramos',
    email: 'admin.sanmiguel@apexgym.pe',
    role: 'SEDE_ADMIN',
    companyId: 'comp-1',
    branchId: 'sede-san-miguel',
    status: 'ACTIVE',
    createdAt: '2025-02-01'
  },
  {
    id: 'usr-recepcion-surco',
    fullName: 'Jorge Salas',
    email: 'recepcion.surco@apexgym.pe',
    role: 'RECEPTION',
    companyId: 'comp-1',
    branchId: 'sede-surco',
    status: 'ACTIVE',
    createdAt: '2025-03-01'
  },
  {
    id: 'usr-trainer-carlos',
    fullName: 'Carlos Mendoza',
    email: 'carlos.trainer@apexgym.pe',
    role: 'TRAINER',
    companyId: 'comp-1',
    branchId: 'sede-san-miguel',
    status: 'ACTIVE',
    createdAt: '2025-03-15'
  },
  {
    id: 'usr-cliente-mariana',
    fullName: 'Mariana Gómez Sotomayor',
    email: 'mariana.gomez@gmail.com',
    role: 'CLIENT',
    companyId: 'comp-1',
    branchId: 'sede-miraflores',
    status: 'ACTIVE',
    createdAt: '2025-08-15'
  }
];

/**
 * Matriz RBAC por defecto. Refleja lo que el backoffice mostraba de forma
 * fija en PermissionsView antes de tener persistencia.
 */
const MODULES: PermissionModule[] = [
  'DASHBOARD',
  'COMPANIES',
  'BRANCHES',
  'CLIENTS',
  'MEMBERSHIPS',
  'PROMOTIONS',
  'COUPONS',
  'SALES',
  'FILES',
  'CMS',
  'REPORTS',
  'SETTINGS',
  'PERMISSIONS'
];

const ROLE_MODULE_ACCESS: Record<UserRole, PermissionModule[] | 'ALL'> = {
  SUPER_ADMIN: 'ALL',
  COMPANY_ADMIN: [
    'DASHBOARD', 'COMPANIES', 'BRANCHES', 'CLIENTS', 'MEMBERSHIPS',
    'PROMOTIONS', 'COUPONS', 'SALES', 'FILES', 'CMS', 'REPORTS'
  ],
  SEDE_ADMIN: ['DASHBOARD', 'CLIENTS', 'PROMOTIONS', 'SALES', 'REPORTS'],
  RECEPTION: ['CLIENTS', 'SALES'],
  TRAINER: ['DASHBOARD', 'CLIENTS'],
  CLIENT: []
};

/** Solo estos roles pueden modificar datos; el resto queda en solo lectura. */
const WRITE_ROLES: UserRole[] = ['SUPER_ADMIN', 'COMPANY_ADMIN', 'SEDE_ADMIN'];

export const initialRolePermissions: RolePermission[] = (
  Object.keys(ROLE_MODULE_ACCESS) as UserRole[]
).flatMap((role) =>
  MODULES.map((module) => {
    const access = ROLE_MODULE_ACCESS[role];
    const canView = access === 'ALL' || access.includes(module);
    const canWrite = canView && WRITE_ROLES.includes(role);
    return {
      id: `perm-${role.toLowerCase()}-${module.toLowerCase()}`,
      role,
      module,
      canView,
      canCreate: canWrite,
      canEdit: canWrite,
      canDelete: canWrite && role === 'SUPER_ADMIN'
    };
  })
);
