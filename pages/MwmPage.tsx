import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { MwmHero } from '../components/mwm/MwmHero';
import { MwmAbout } from '../components/mwm/MwmAbout';
import { MwmDates } from '../components/mwm/MwmDates';
import { MwmSessions } from '../components/mwm/MwmSessions';
import { MwmSpeakers } from '../components/mwm/MwmSpeakers';
import { MwmTeam } from '../components/mwm/MwmTeam';
import { MwmTestimonials } from '../components/mwm/MwmTestimonials';
import { MwmFooter } from '../components/mwm/MwmFooter';
import { WhatsAppShare } from '../components/WhatsAppShare';
import { LegalModals } from '../components/LegalModals';

const MwmPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);

  useEffect(() => {
    document.title = 'בין לבין כיצ"י MWM - תוכנית לנשים באמצע החיים';
    window.scrollTo(0, 0);
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
        <MwmHero />
        <MwmAbout />
        <MwmDates />
        <MwmSessions />
        <MwmSpeakers />
        <MwmTeam />
        <MwmTestimonials />
      </main>
      <MwmFooter onOpenTerms={openTerms} onOpenPrivacy={openPrivacy} />
      <WhatsAppShare />
      <LegalModals activeModal={activeModal} closeModal={() => setActiveModal(null)} />
    </div>
  );
};

export default MwmPage;
