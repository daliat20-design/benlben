
import React, { useState, useEffect } from 'react';
import { HeroPartTwo } from '../components/HeroPartTwo';
import { AboutSectionPartTwo } from '../components/AboutSectionPartTwo';
import { ProgramStructurePartTwo } from '../components/ProgramStructurePartTwo';
import { SpeakersGridPartTwo } from '../components/SpeakersGridPartTwo';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ImportantInfoPartTwo } from '../components/ImportantInfoPartTwo';
import { PricingSectionPartTwo } from '../components/PricingSectionPartTwo';
import { TeamSection } from '../components/TeamSection';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { WhatsAppShare } from '../components/WhatsAppShare';
import { LegalModals } from '../components/LegalModals';

const PartTwo: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);

  useEffect(() => {
    document.title = "בין לבין - חלק ב'";
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
        <HeroPartTwo />
        <AboutSectionPartTwo />
        <ProgramStructurePartTwo />
        <SpeakersGridPartTwo />
        <ImportantInfoPartTwo />
        <PricingSectionPartTwo />
        <TeamSection />
        <TestimonialsSection />
      </main>
      <Footer onOpenTerms={openTerms} onOpenPrivacy={openPrivacy} />
      <WhatsAppShare />
      <LegalModals activeModal={activeModal} closeModal={() => setActiveModal(null)} />
    </div>
  );
};

export default PartTwo;
