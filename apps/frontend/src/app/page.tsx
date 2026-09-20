"use client";

import React, { Suspense, useEffect, useState } from 'react';
// Common components
import { Header } from '../shared/components/Header';
import { AuthModal } from '../shared/components/AuthModal';
import { InquiryModal } from '../shared/components/InquiryModal';
import { FloatingWhatsApp } from '../shared/components/FloatingWhatsApp';

// Landing components
import { HeroCarousel } from '../features/landing/components/HeroCarousel';
import { ServicesSection } from '../features/landing/components/ServicesSection';
import { PromotionsSection } from '../features/landing/components/PromotionsSection';
import { MembershipsSection } from '../features/landing/components/MembershipsSection';
import { SedesSection } from '../features/landing/components/SedesSection';
import { AboutSection } from '../features/landing/components/AboutSection';
import { TestimonialsSection } from '../features/landing/components/TestimonialsSection';
import { FaqSection } from '../features/landing/components/FaqSection';
import { Footer } from '../features/landing/components/Footer';

import { GymBranch } from '@apex/shared';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../shared/providers/AuthProvider';
import {
  useBanners,
  useBranches,
  useCompany,
  useFaqs,
  useMemberships,
  usePromotions,
  useServices,
  useTestimonials,
  useTrainers,
} from '../shared/api/hooks';

/**
 * Lee `?auth=required` (con el que el proxy redirige aquí) y abre el modal.
 * Vive aparte porque `useSearchParams` exige un límite de Suspense.
 */
function AuthRedirectWatcher({ onAuthRequired }: { onAuthRequired: () => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('auth') === 'required') onAuthRequired();
  }, [searchParams, onAuthRequired]);

  return null;
}

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showInquiryModal, setShowInquiryModal] = useState<boolean>(false);

  // Contenido de la landing servido por la API pública.
  const { data: company } = useCompany();
  const { data: branches = [] } = useBranches();
  const { data: banners = [] } = useBanners();
  const { data: services = [] } = useServices();
  const { data: promotions = [] } = usePromotions();
  const { data: plans = [] } = useMemberships();
  const { data: trainers = [] } = useTrainers();
  const { data: testimonials = [] } = useTestimonials();
  const { data: faqs = [] } = useFaqs();

  const handlePreviewBranchLanding = (branch: GymBranch) => {
    router.push(`/${branch.slug}`);
  };

  if (!company) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-neutral-400 text-sm animate-pulse">Cargando ApexGym...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-rose-600 selection:text-white">
      <div className="flex flex-col min-h-screen">
        <Suspense fallback={null}>
          <AuthRedirectWatcher onAuthRequired={() => setShowAuthModal(true)} />
        </Suspense>

        <Header
          company={company}
          branches={branches}
          onOpenAuth={() => setShowAuthModal(true)}
          onGoToBackoffice={() => router.push('/backoffice')}
          onSelectSedeLanding={handlePreviewBranchLanding}
          activeRole={user?.role ?? null}
          isAuthenticated={isAuthenticated}
          userRole={user?.role ?? 'CLIENT'}
        />

        <main className="flex-1">
          <HeroCarousel banners={banners} onOpenInquiry={() => setShowInquiryModal(true)} />
          <ServicesSection services={services} />
          <PromotionsSection promotions={promotions} branches={branches} onSelectPromoToBuy={() => setShowInquiryModal(true)} />
          {/* Los cupones se validan por código; no se listan en público. */}
          <MembershipsSection plans={plans} coupons={[]} onOpenInquiry={() => setShowInquiryModal(true)} />
          <SedesSection branches={branches} trainers={trainers} onOpenInquiry={() => setShowInquiryModal(true)} onSelectBranch={handlePreviewBranchLanding} />
          <AboutSection trainers={trainers} />
          <TestimonialsSection testimonials={testimonials} />
          <FaqSection faqs={faqs} />
        </main>

        <Footer company={company} branches={branches} />

        <FloatingWhatsApp company={company} branches={branches} />

        {/* Modals */}
        <InquiryModal
          isOpen={showInquiryModal}
          onClose={() => setShowInquiryModal(false)}
          branches={branches}
        />

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={() => router.push('/backoffice')}
        />
      </div>
    </div>
  );
}
