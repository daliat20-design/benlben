import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Sun, Trees, Tent, Flower2, ArrowLeft } from 'lucide-react';
import { ButterflyIcon } from './ButterflyIcon';

export interface BrandProgram {
  id: string;
  name: string;
  category: string;
  categoryNode?: React.ReactNode;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  logoUrl?: string;
  logoFallback?: string;
  isWorkingTitle?: boolean;
  link?: string;
}

const MIDLIFE_LOGO_URL = "https://i.postimg.cc/vH9cYBmz/Chat-GPT-Image-Sep-16-2026-09-57-23-AM.png";
const MIDLIFE_LOGO_FALLBACK = "https://i.postimg.cc/vH9cYBmz/Chat-GPT-Image-Sep-16-2026-09-57-23-AM.png";

const UNTIL180_LOGO_URL = "https://i.postimg.cc/X7FcRnSt/Chat-GPT-Image-Sep-16-2026-09-39-24-AM.png";
const UNTIL180_LOGO_FALLBACK = "https://i.postimg.cc/X7FcRnSt/Chat-GPT-Image-Sep-16-2026-09-39-24-AM.png";

const ALCHEMY_LOGO_URL = "https://i.postimg.cc/K80KVWz5/Chat-GPT-Image-Sep-16-2026-10-08-21-AM.png";
const ALCHEMY_LOGO_FALLBACK = "https://i.postimg.cc/K80KVWz5/Chat-GPT-Image-Sep-16-2026-10-08-21-AM.png";

const AHEAD_OF_YOU_LOGO_URL = "https://i.postimg.cc/L53wDLTH/Chat-GPT-Image-Sep-16-2026-10-04-45-AM.png";
const AHEAD_OF_YOU_LOGO_FALLBACK = "https://i.postimg.cc/L53wDLTH/Chat-GPT-Image-Sep-16-2026-10-04-45-AM.png";

const HIGHLIGHTS_LOGO_URL = "https://i.postimg.cc/MTVpW36p/Chat-GPT-Image-Sep-16-2026-09-47-40-AM.png";
const HIGHLIGHTS_LOGO_FALLBACK = "https://i.postimg.cc/MTVpW36p/Chat-GPT-Image-Sep-16-2026-09-47-40-AM.png";

const THE_TENT_LOGO_URL = "https://i.postimg.cc/bwwrQRTN/Chat-GPT-Image-Sep-16-2026-09-50-49-AM.png";
const THE_TENT_LOGO_FALLBACK = "https://i.postimg.cc/bwwrQRTN/Chat-GPT-Image-Sep-16-2026-09-50-49-AM.png";

const getLogoBorderColor = (id: string) => {
  switch (id) {
    case 'midlife': return 'rgba(203,119,69,0.35)';
    case 'up-to-180': return 'rgba(13,110,122,0.4)';
    case 'highlights': return 'rgba(32,76,142,0.35)';
    case 'ahead-of-you': return 'rgba(178,58,95,0.35)';
    case 'alchemy-of-elements': return 'rgba(72,153,107,0.35)';
    case 'the-tent': return 'rgba(184,115,51,0.35)';
    default: return 'rgba(203,119,69,0.3)';
  }
};

export const ALL_BRAND_PROGRAMS: BrandProgram[] = [
  {
    id: 'midlife',
    name: 'אמצע החיים',
    category: 'סדנת הדגל לנשים בגילאי 45-60',
    categoryNode: (
      <span>
        סדנת הדגל לנשים בגילאי{' '}
        <span dir="ltr" className="inline-block font-sans font-black">
          45-60
        </span>
      </span>
    ),
    tagline: 'מעטפת מקצועית של ידע, שיח והתבוננות אישית לתקופת גיל המעבר.',
    icon: Flower2,
    logoUrl: MIDLIFE_LOGO_URL,
    logoFallback: MIDLIFE_LOGO_FALLBACK,
    link: '#/p/midlife'
  },
  {
    id: 'up-to-180',
    name: 'עד 180°',
    category: 'סדנה לתהליכי שינוי',
    tagline: 'לעצור, לשנות זווית ולבחור את הצעד הבא.',
    icon: Compass,
    logoUrl: UNTIL180_LOGO_URL,
    logoFallback: UNTIL180_LOGO_FALLBACK,
    link: '#/p/up-to-180'
  },
  {
    id: 'highlights',
    name: 'היילייטס',
    category: 'תוכנית פיתוח בארגונים',
    tagline: 'מניסיון ונוכחות להובלה והשפעה לנשים באמצע החיים.',
    icon: Sparkles,
    logoUrl: HIGHLIGHTS_LOGO_URL,
    logoFallback: HIGHLIGHTS_LOGO_FALLBACK,
    link: '#/p/highlights'
  },
  {
    id: 'ahead-of-you',
    name: 'עוד לפנייך',
    category: 'תוכנית לנשים 60+',
    tagline: 'להמשיך לגלות, לבחור, להתחדש וליצור משמעות.',
    icon: Sun,
    logoUrl: AHEAD_OF_YOU_LOGO_URL,
    logoFallback: AHEAD_OF_YOU_LOGO_FALLBACK,
    link: '#/p/ahead-of-you'
  },
  {
    id: 'alchemy-of-elements',
    name: 'אלכימיה של יסודות',
    category: 'יום שיא בטבע',
    tagline: 'חוויה שמחברת בין טבע, תנועה, התבוננות וחיבור לעצמנו.',
    icon: Trees,
    logoUrl: ALCHEMY_LOGO_URL,
    logoFallback: ALCHEMY_LOGO_FALLBACK,
    link: '#/p/alchemy'
  },
  {
    id: 'the-tent',
    name: 'האוהל',
    category: 'מנהיגות, יוזמה והשפעה',
    tagline: 'מהכוחות והעוגנים הפנימיים אל יוזמה, הובלה ועשייה בקהילה.',
    icon: Tent,
    logoUrl: THE_TENT_LOGO_URL,
    logoFallback: THE_TENT_LOGO_FALLBACK,
    link: '#/p/the-tent'
  }
];

interface OtherProgramsSectionProps {
  currentProgramId?: string;
  className?: string;
}

export const OtherProgramsSection: React.FC<OtherProgramsSectionProps> = ({
  currentProgramId = 'midlife',
  className = ''
}) => {
  // Filter out the current landing page program so only other brand programs are shown
  const otherPrograms = ALL_BRAND_PROGRAMS.filter(p => p.id !== currentProgramId);

  return (
    <section id="other-programs" className={`py-20 md:py-28 bg-brand-cream/60 relative overflow-hidden px-4 sm:px-6 ${className}`}>
      {/* Subtle decorative background accents */}
      <ButterflyIcon size={240} className="absolute -top-16 -right-16 opacity-[0.03] animate-drift pointer-events-none hidden md:block" />
      <ButterflyIcon size={200} className="absolute -bottom-16 -left-16 opacity-[0.03] animate-float pointer-events-none hidden md:block" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-18">
          <div className="inline-block px-5 py-1.5 bg-brand-green/10 text-brand-green rounded-full text-xs md:text-sm font-black mb-4 tracking-tight border border-brand-green/15">
            הבית של בין לבין
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-brand-green tracking-tight mb-4">
            עוד מבין לבין
          </h2>
          <p className="text-base sm:text-lg md:text-2xl text-gray-700 font-bold max-w-2xl mx-auto leading-relaxed">
            תוכניות לנשים. לרגעים שונים בחיים, של שינוי, צמיחה וחיבור.
          </p>
          <div className="h-1.5 w-20 bg-brand-orange mx-auto mt-6 rounded-full opacity-60"></div>
        </div>

        {/* Balanced Cards Layout */}
        <div className="flex flex-wrap justify-center gap-6">
          {otherPrograms.map((prog) => {
            const IconComponent = prog.icon;
            return (
              <div
                key={prog.id}
                id={`program-card-${prog.id}`}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-3xl p-7 md:p-8 border border-brand-beige shadow-[0_10px_35px_rgba(84,99,79,0.05)] hover:shadow-xl hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-300 flex flex-col text-right group relative overflow-hidden"
              >
                {/* Top Row: Delicate Icon / Logo & Category Badge */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  {prog.logoUrl ? (
                    <div 
                      className="w-22 h-22 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white p-1.5 border-2 shadow-md flex items-center justify-center shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105"
                      style={{
                        borderColor: getLogoBorderColor(prog.id)
                      }}
                    >
                      <img 
                        src={prog.logoUrl} 
                        alt={`לוגו ${prog.name}`} 
                        className="w-full h-full object-contain rounded-full"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          const fallback = prog.logoFallback || MIDLIFE_LOGO_FALLBACK;
                          if (target.src !== fallback) {
                            target.src = fallback;
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-brand-cream group-hover:bg-brand-orange/10 border border-brand-beige group-hover:border-brand-orange/30 flex items-center justify-center text-brand-orange transition-colors shrink-0 shadow-xs">
                      <IconComponent className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  )}
                  
                  <span className="inline-block px-3.5 py-1 bg-brand-green/5 group-hover:bg-brand-green/10 text-brand-green rounded-full text-xs sm:text-sm font-black tracking-tight border border-brand-green/10">
                    {prog.categoryNode || prog.category}
                  </span>
                </div>

                {/* Program Name - Most Prominent */}
                <h3 className="text-2xl sm:text-3xl font-black text-brand-green group-hover:text-brand-orange transition-colors tracking-tight mb-3">
                  {prog.name}
                </h3>

                {/* Single Short Sentence */}
                <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed mt-auto">
                  {prog.tagline}
                </p>

                {prog.link && (
                  <div className="pt-5 mt-5 border-t border-brand-beige/80">
                    <Link
                      to={prog.link.replace('#', '')}
                      className="w-full inline-flex items-center justify-between bg-brand-green/10 hover:bg-brand-green text-brand-green hover:text-white px-5 py-3.5 rounded-2xl text-base font-black transition-all duration-300 shadow-2xs hover:shadow-md group/btn"
                    >
                      <span>לפרטים על התוכנית</span>
                      <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover/btn:-translate-x-1" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
