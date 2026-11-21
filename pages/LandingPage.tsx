import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { MidlifeHero } from '../components/MidlifeHero';
import {
  MidlifeGallerySection,
  MidlifeHowItWorksAndBenefits,
  MidlifeSpecialApproachSection,
  MidlifePreFormCTA,
} from '../components/MidlifeStorySections';
import { MidlifeTopicsPool } from '../components/MidlifeTopicsPool';
import { SpeakersGrid } from '../components/SpeakersGrid';
import { ImportantInfo } from '../components/ImportantInfo';
import { PricingSection } from '../components/PricingSection';
import { TeamSection } from '../components/TeamSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { WorkshopInterestForm } from '../components/WorkshopInterestForm';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { WhatsAppShare } from '../components/WhatsAppShare';
import { LegalModals } from '../components/LegalModals';

const LandingPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>('באות יחד (₪810 למשתתפת)');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
    setTimeout(() => {
      const el = document.getElementById('interest-form');
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 80);
  };

  useEffect(() => {
    document.title = 'סדנת אמצע החיים - סדנה לנשים בגיל המעבר | בין לבין';
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
    <div
      className="min-h-screen font-sans selection:bg-[#C56B3E]/20 selection:text-[#93542B] bg-[#FFF9F4] text-gray-800 overflow-x-clip"
      dir="rtl"
    >
      <Navbar hideLinks={true} />
      <main>
        {/* 2. פתיח הדף המעודכן עם נתוני המחקר של אוניברסיטת UCL ותמונת הקבוצה */}
        <MidlifeHero />

        {/* 3 & 4. איך נראים המפגשים? + מה את מקבלת ? (4 כרטיסיות) */}
        <MidlifeHowItWorksAndBenefits />

        {/* 5. גלריית התמונות מסדנאות קודמות (לאחר מה את מקבלת) */}
        <MidlifeGallerySection />

        {/* 6. על מה נדבר? - מאגר 7 הנושאים האפשריים */}
        <MidlifeTopicsPool />

        {/* 7. מה מיוחד בדרך שלנו? */}
        <MidlifeSpecialApproachSection />

        {/* 8. נבחרת מרצות הבית (מאגר המרצות - רקע חול-פשתן חם ועשיר) */}
        <SpeakersGrid
          bgClassName="bg-[#EDE0C6] border-b-2 border-[#2D5043]/20"
          customSubtitle="מרצות הבית של בין לבין מביאות איתן ידע, ניסיון וכלים מעשיים. הרכב המרצות משתנה ממחזור למחזור בהתאם לנושאים ולצרכי הקבוצה."
        />

        {/* 9א. פרטים טכניים ומועדי מחזור החורף (רקע ירוק מרווה עדין) */}
        <ImportantInfo hideDates={true} />

        {/* 9ב. מסלולי הרשמה ומחירים + מה עוד את מקבלת (רקע לבן נקי) */}
        <PricingSection
          onSelectPackage={setSelectedPackage}
          includedTitle="מה עוד את מקבלת"
        />

        {/* 10. נעים להכיר - דלית כורה ואלסי זיסלמן (רקע ירוק מרווה רך ועשיר) */}
        <TeamSection
          customTitle="נעים להכיר"
          bgClassName="bg-[#D5E5DC] border-b-2 border-[#2D5043]/25"
        />

        {/* 11. המלצות מקוריות (רקע לבן נקי) */}
        <TestimonialsSection bgClassName="bg-white border-b-2 border-[#2D5043]/15" />

        {/* 12. מקטע סיום לפני טופס ההרשמה (רקע ירוק מרווה עמוק) */}
        <MidlifePreFormCTA onOpenForm={handleOpenForm} isFormOpen={isFormOpen} />

        {/* 13. טופס התעניינות והרשמה - נפתח רק לאחר לחיצה על הכפתור 'אשמח לפרטים נוספים' */}
        {isFormOpen && (
          <section
            id="interest-form-wrapper"
            className="py-12 sm:py-16 md:py-20 bg-[#EDE0C6] border-b-2 border-[#2D5043]/25 px-4 sm:px-6 animate-fade-in"
          >
            <WorkshopInterestForm
              id="interest-form"
              selectedPackage={selectedPackage}
              onSelectPackage={setSelectedPackage}
            />
          </section>
        )}

        {/* קישור ברור ועדין לכל התוכניות והמרחבים באתר הבית (רקע לבן נקי) */}
        <section className="py-8 sm:py-10 bg-white border-t border-[#2D5043]/20 px-4 text-center" dir="rtl">
          <Link
            to="/?section=programs"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#DCECE3] hover:bg-[#2D5043] text-[#2D5043] hover:text-white border-2 border-[#2D5043]/30 text-sm sm:text-base font-bold shadow-xs transition-all"
          >
            <span>לכל התוכניות והמרחבים באתר הבית</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </section>
      </main>
      <Footer
        onOpenTerms={openTerms}
        onOpenPrivacy={openPrivacy}
        hideCtaBox={true}
        bgClassName="bg-[#D8E5DD] border-t-2 border-[#2D5043]/25"
      />
      <WhatsAppShare />
      <LegalModals activeModal={activeModal} closeModal={() => setActiveModal(null)} />
    </div>
  );
};

export default LandingPage;
