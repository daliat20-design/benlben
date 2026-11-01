
import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { ProgramStructure } from '../components/ProgramStructure';
import { SpeakersGrid } from '../components/SpeakersGrid';
import { ImportantInfo } from '../components/ImportantInfo';
import { PricingSection } from '../components/PricingSection';
import { TeamSection } from '../components/TeamSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { WorkshopInterestForm } from '../components/WorkshopInterestForm';
import { OtherProgramsSection } from '../components/OtherProgramsSection';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { WhatsAppShare } from '../components/WhatsAppShare';
import { LegalModals } from '../components/LegalModals';

const LandingPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>('באות יחד (1,080 ₪ למשתתפת)');

  useEffect(() => {
    document.title = "סדנת אמצע החיים - סדנת הדגל של בין לבין";
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
    <div className="min-h-screen font-sans selection:bg-[#C56B3E]/20 selection:text-[#93542B] bg-[#FFF9F4] text-gray-800">
      <Navbar hideLinks={true} />
      <main>
        <Hero />
        <AboutSection hideDates={true} />
        <ProgramStructure hideDates={true} />
        <SpeakersGrid />
        <ImportantInfo hideDates={true} />
        <PricingSection onSelectPackage={setSelectedPackage} />
        <TeamSection />
        <TestimonialsSection />
        
        {/* בואי נתחבר - טופס התעניינות מותאם לסדנה */}
        <section id="interest" className="py-16 md:py-24 bg-gradient-to-b from-[#FFF4EB] via-[#FDEDE0] to-[#FFF9F4] px-4 sm:px-6">
          <WorkshopInterestForm
            id="interest-form"
            selectedPackage={selectedPackage}
            onSelectPackage={setSelectedPackage}
          />
        </section>

        {/* התוכניות הנוספות של בין לבין */}
        <OtherProgramsSection currentProgramId="midlife" />
      </main>
      <Footer onOpenTerms={openTerms} onOpenPrivacy={openPrivacy} />
      <WhatsAppShare />
      <LegalModals activeModal={activeModal} closeModal={() => setActiveModal(null)} />
    </div>
  );
};

export default LandingPage;
