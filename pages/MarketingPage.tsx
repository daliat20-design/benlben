
import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { MarketingSessions } from '../components/MarketingSessions';
import { MarketingSpeakers } from '../components/MarketingSpeakers';
import { TeamSection } from '../components/TeamSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { WhatsAppShare } from '../components/WhatsAppShare';
import { LegalModals } from '../components/LegalModals';

const MarketingPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);

  useEffect(() => {
    document.title = "בין לבין - תוכנית לנשים באמצע החיים";
  }, []);

  const openTerms = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveModal('terms');
  };

  const openPrivacy = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveModal('privacy');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-beige selection:text-brand-green">
      <Navbar />
      <main>
        <Hero />
        <AboutSection hideDates={true} />
        <MarketingSessions />
        <MarketingSpeakers />
        <TeamSection />
        <TestimonialsSection />
      </main>
      <Footer onOpenTerms={openTerms} onOpenPrivacy={openPrivacy} />
      <WhatsAppShare />
      <LegalModals activeModal={activeModal} closeModal={() => setActiveModal(null)} />
    </div>
  );
};

export default MarketingPage;
