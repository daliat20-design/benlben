
import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { ProgramStructure } from '../components/ProgramStructure';
import { SpeakersGrid } from '../components/SpeakersGrid';
import { ImportantInfo } from '../components/ImportantInfo';
import { PricingSection } from '../components/PricingSection';
import { TeamSection } from '../components/TeamSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { WhatsAppShare } from '../components/WhatsAppShare';
import { LegalModals } from '../components/LegalModals';

const LandingPage: React.FC = () => {
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
        <AboutSection />
        <ProgramStructure />
        <SpeakersGrid />
        <ImportantInfo />
        <PricingSection />
        <TeamSection />
        <TestimonialsSection />
      </main>
      <Footer onOpenTerms={openTerms} onOpenPrivacy={openPrivacy} />
      <WhatsAppShare />
      <LegalModals activeModal={activeModal} closeModal={() => setActiveModal(null)} />
    </div>
  );
};

export default LandingPage;
