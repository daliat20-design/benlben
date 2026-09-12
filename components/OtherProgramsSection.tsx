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
  isWorkingTitle?: boolean;
  link?: string;
}

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
    link: '#/p/midlife'
  },
  {
    id: 'up-to-180',
    name: 'עד 180°',
    category: 'סדנה לתהליכי שינוי',
    tagline: 'לעצור, לשנות זווית ולבחור את הצעד הבא.',
    icon: Compass,
    link: '#/p/up-to-180'
  },
  {
    id: 'highlights',
    name: 'היילייטס',
    category: 'תוכנית פיתוח בארגונים',
    tagline: 'מניסיון ונוכחות להובלה והשפעה לנשים באמצע החיים.',
    icon: Sparkles,
    link: '#/p/highlights'
  },
  {
    id: 'ahead-of-you',
    name: 'עוד לפנייך',
    category: 'תוכנית לנשים 60+',
    tagline: 'להמשיך לגלות, לבחור, להתחדש וליצור משמעות.',
    icon: Sun,
    link: '#/p/ahead-of-you'
  },
  {
    id: 'alchemy-of-elements',
    name: 'אלכימיה של יסודות',
    category: 'יום שיא בטבע',
    tagline: 'חוויה שמחברת בין טבע, תנועה, התבוננות וחיבור לעצמנו.',
    icon: Trees,
    link: '#/p/alchemy'
  },
  {
    id: 'the-tent',
    name: 'האוהל',
    category: 'מנהיגות, יוזמה והשפעה',
    tagline: 'מהכוחות והעוגנים הפנימיים אל יוזמה, הובלה ועשייה בקהילה.',
    icon: Tent,
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
                {/* Top Row: Delicate Icon & Category Badge */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-brand-cream group-hover:bg-brand-orange/10 border border-brand-beige group-hover:border-brand-orange/30 flex items-center justify-center text-brand-orange transition-colors shrink-0 shadow-xs">
                    <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  
                  <span className="inline-block px-3 py-1 bg-brand-green/5 group-hover:bg-brand-green/10 text-brand-green rounded-full text-xs font-black tracking-tight border border-brand-green/10">
                    {prog.categoryNode || prog.category}
                  </span>
                </div>

                {/* Program Name - Most Prominent */}
                <h3 className="text-2xl sm:text-3xl font-black text-brand-green group-hover:text-brand-orange transition-colors tracking-tight mb-3">
                  {prog.name}
                </h3>

                {/* Single Short Sentence */}
                <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed mt-auto">
                  {prog.tagline}
                </p>

                {prog.link && (
                  <div className="pt-5 mt-5 border-t border-brand-beige/80">
                    <Link
                      to={prog.link.replace('#', '')}
                      className="w-full inline-flex items-center justify-between bg-brand-green/10 hover:bg-brand-green text-brand-green hover:text-white px-5 py-3 rounded-2xl text-sm font-black transition-all duration-300 shadow-2xs hover:shadow-md group/btn"
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
