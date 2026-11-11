import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Share2, Sparkles } from 'lucide-react';
import {
  CANONICAL_PROGRAMS,
  CanonicalProgram,
  FLOWTRIPS_LOGO_URL,
  ProgramCardsGrid,
} from '../utils/brandPrograms';

export type MiniProgramMeta = CanonicalProgram;
export { FLOWTRIPS_LOGO_URL };
export const ALL_MINI_PROGRAMS = CANONICAL_PROGRAMS;

interface MiniPageTopNavProps {
  currentTitle?: string;
  themeColor?: string;
  onShare?: () => void;
}

export const MiniPageTopNav: React.FC<MiniPageTopNavProps> = ({
  currentTitle,
  onShare,
}) => {
  const handleDefaultShare = async () => {
    if (onShare) {
      onShare();
      return;
    }
    const url = window.location.href;
    const shareText = "תראי מה מצאתי !! סדנאות, מרחבים וריטרטים לנשים";
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentTitle ? `${currentTitle} | בין לבין` : "בין לבין | מרחבים לנשים",
          text: shareText,
          url,
        });
      } catch {
        // cancelled
      }
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${url}`)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <header className="pt-5 sm:pt-6 pb-4 px-4 sm:px-6 relative z-30">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
        {/* Prominent Back Button to Main Page */}
        <Link
          to="/women-programs"
          className="inline-flex items-center gap-2 bg-white/95 hover:bg-brand-green hover:text-white text-brand-green px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-black border border-brand-green/20 shadow-xs hover:shadow-md transition-all active:scale-95 group"
          title="חזרה לעמוד הראשי של בין לבין"
        >
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-brand-orange group-hover:text-white shrink-0" />
          <span>לעמוד הראשי של בין לבין</span>
        </Link>

        {/* Brand identity & Share Button */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Link
            to="/women-programs"
            className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 bg-brand-green/10 text-brand-green px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide border border-brand-green/15 hover:bg-brand-green/15 transition-colors"
          >
            <span>בין לבין</span>
            <span className="text-brand-orange font-light">|</span>
            <span>מרחבים לנשים</span>
          </Link>

          <button
            type="button"
            onClick={handleDefaultShare}
            aria-label="הזמיני חברה"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-brand-orange transition-colors px-3 py-1.5 rounded-full bg-white/90 hover:bg-white border border-brand-beige shadow-2xs active:scale-95 cursor-pointer"
            title="הזמיני חברה"
          >
            <Share2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span className="font-bold">הזמיני חברה</span>
          </button>
        </div>
      </div>
    </header>
  );
};

interface OtherProgramsNavProps {
  currentProgramId: string;
}

export const OtherProgramsNav: React.FC<OtherProgramsNavProps> = ({ currentProgramId }) => {
  return (
    <section className="mt-8 sm:mt-10 pt-6 sm:pt-8 pb-8 border-t border-brand-beige/80" dir="rtl">
      <div className="text-center mb-5 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-black mb-2 border border-brand-green/15">
          <Sparkles className="w-3 h-3 text-brand-orange" />
          <span>עוד מבית בין לבין</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-brand-green tracking-tight mb-1 text-center">
          המרחבים והתוכניות שלנו
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-xl mx-auto text-center">
          סדנאות עומק, חוויות דרך ומרחבים לנשים בתקופות חיים שונות
        </p>
      </div>

      {/* Unified Compact Program Tabs */}
      <div className="mb-6 max-w-4xl mx-auto px-1">
        <ProgramCardsGrid
          programs={CANONICAL_PROGRAMS}
          currentProgramId={currentProgramId}
          linkMode="mini"
          variant="compact-tabs"
        />
      </div>

      {/* Return Button to Master Landing Page */}
      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-orange text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs hover:shadow-md active:scale-98"
        >
          <ArrowRight className="w-4 h-4" />
          <span>לאתר הבית של בין לבין</span>
        </Link>
      </div>
    </section>
  );
};
