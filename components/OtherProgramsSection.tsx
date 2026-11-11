import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { ButterflyIcon } from './ButterflyIcon';
import {
  CANONICAL_PROGRAMS,
  CanonicalProgram,
  ProgramCardsGrid,
} from '../utils/brandPrograms';

export type BrandProgram = CanonicalProgram;
export const ALL_BRAND_PROGRAMS = CANONICAL_PROGRAMS;

interface OtherProgramsSectionProps {
  currentProgramId?: string;
  className?: string;
}

export const OtherProgramsSection: React.FC<OtherProgramsSectionProps> = ({
  currentProgramId = 'midlife',
  className = '',
}) => {
  return (
    <section
      id="other-programs"
      className={`py-10 sm:py-14 bg-brand-cream/40 border-t border-brand-beige/70 relative overflow-hidden px-4 sm:px-6 ${className}`}
      dir="rtl"
    >
      {/* Subtle decorative background accents */}
      <ButterflyIcon size={180} className="absolute -top-12 -right-12 opacity-[0.03] animate-drift pointer-events-none hidden md:block" />
      <ButterflyIcon size={160} className="absolute -bottom-12 -left-12 opacity-[0.03] animate-float pointer-events-none hidden md:block" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header - עדין וקומפקטי */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block px-3.5 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-black mb-2 tracking-tight border border-brand-green/15">
            עוד מבית בין לבין
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-brand-green tracking-tight mb-1.5">
            המרחבים והתוכניות שלנו
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium max-w-xl mx-auto">
            סדנאות, תוכניות עומק וחוויות דרך לנשים בתקופות חיים שונות
          </p>
        </div>

        {/* Unified Compact Program Tabs */}
        <ProgramCardsGrid
          programs={CANONICAL_PROGRAMS}
          currentProgramId={currentProgramId}
          linkMode="landing"
          variant="compact-tabs"
        />

        {/* Back Link to Main Homepage */}
        <div className="text-center pt-6">
          <a
            href="/#programs"
            className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-brand-orange hover:text-brand-green transition-colors cursor-pointer"
          >
            <span>לכל התוכניות והמרחבים באתר הבית</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
