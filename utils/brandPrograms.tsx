import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Sun, Tent, Flower2, Crown, ArrowLeft, ChevronLeft } from 'lucide-react';

export const MIDLIFE_LOGO_URL = "/logos/midlife.webp";
export const MIDLIFE_LOGO_FALLBACK = "/logos/midlife.png";

export const UNTIL180_LOGO_URL = "/logos/up-to-180.webp";
export const UNTIL180_LOGO_FALLBACK = "/logos/up-to-180.png";

export const AHEAD_OF_YOU_LOGO_URL = "/logos/ahead-of-you.webp";
export const AHEAD_OF_YOU_LOGO_FALLBACK = "/logos/ahead-of-you.png";

export const HIGHLIGHTS_LOGO_URL = "/logos/highlights.webp";
export const HIGHLIGHTS_LOGO_FALLBACK = "/logos/highlights.png";

export const THE_TENT_LOGO_URL = "/logos/the-tent.webp";
export const THE_TENT_LOGO_FALLBACK = "/logos/the-tent.png";

export const FLOWTRIPS_LOGO_URL = "https://i.postimg.cc/D0CqwDT0/ms'-nsy-bsqy'h-tht-flow-Trip.png";

/**
 * Renders "FLOWTRIPS וריטריטים" strictly right-to-left (FLOWTRIPS on the right, וריטריטים on the left)
 * with explicit BiDi isolation so English characters never reverse or reorder in any browser/context.
 */
export const FlowTripsTitle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    dir="rtl"
    className={`inline-flex items-center gap-1.5 ${className}`}
    style={{ unicodeBidi: 'isolate' }}
  >
    <span dir="ltr" className="inline-block">FLOWTRIPS</span>
    <span>וריטריטים</span>
  </span>
);

export interface CanonicalProgram {
  id: string;
  name: string;
  nameNode?: React.ReactNode;
  category: string;
  categoryNode: React.ReactNode;
  navSubtitle: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  logoUrl: string;
  logoFallback: string;
  logoBorderColor: string;
  landingLink: string;
  miniLink: string;
  isFlagship?: boolean;
  winterBadge?: boolean;
  winterBadgeText?: string;
  themeColor: string;
  cardBg: string;
  borderStyle: string;
  iconBoxStyle: string;
  badgeStyle: string;
  buttonStyle: string;
  accentBar: string;
  navCardClass: string;
  navIconClass: string;
  navTitleHoverClass: string;
}

export const CANONICAL_PROGRAMS: CanonicalProgram[] = [
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
    navSubtitle: 'סדנת הדגל לנשים 45-60',
    tagline: 'מעטפת מקצועית של ידע, שיח והתבוננות אישית לתקופת גיל המעבר.',
    icon: Flower2,
    logoUrl: MIDLIFE_LOGO_URL,
    logoFallback: MIDLIFE_LOGO_FALLBACK,
    logoBorderColor: 'rgba(203,119,69,0.4)',
    landingLink: '/midlife-workshop',
    miniLink: '/p/midlife',
    isFlagship: true,
    winterBadge: true,
    winterBadgeText: 'מחזור חורף נפתח בקרוב',
    themeColor: '#C56B3E',
    cardBg: 'bg-gradient-to-b from-[#fffbf7] via-[#fff7ef] to-[#ffeedd]',
    borderStyle: 'border-2 border-brand-orange/60 ring-2 ring-brand-orange/20 shadow-[0_12px_40px_rgba(203,119,69,0.15)] hover:border-brand-orange hover:shadow-2xl',
    iconBoxStyle: 'bg-brand-orange/20 text-brand-orange border border-brand-orange/40 shadow-xs',
    badgeStyle: 'bg-brand-orange/10 text-brand-orange border border-brand-orange/30 font-black',
    buttonStyle: 'bg-brand-orange hover:bg-brand-green text-white shadow-sm hover:shadow-md',
    accentBar: 'bg-brand-orange',
    navCardClass: 'bg-brand-cream/70 hover:bg-brand-orange/10 border-brand-orange/30 hover:border-brand-orange',
    navIconClass: 'bg-brand-orange/15 text-brand-orange',
    navTitleHoverClass: 'group-hover:text-brand-orange',
  },
  {
    id: 'ahead-of-you',
    name: 'עוֹד לְפָנַיִךְ',
    category: 'תוכנית לנשים 60+',
    categoryNode: (
      <span>
        תוכנית לנשים{' '}
        <span dir="ltr" className="inline-block font-sans font-black">
          60+
        </span>
      </span>
    ),
    navSubtitle: 'תוכנית לנשים 60+',
    tagline: 'להמשיך לגלות, לבחור, להתחדש וליצור משמעות.',
    icon: Sun,
    logoUrl: AHEAD_OF_YOU_LOGO_URL,
    logoFallback: AHEAD_OF_YOU_LOGO_FALLBACK,
    logoBorderColor: 'rgba(178,58,95,0.4)',
    landingLink: '/p/ahead-of-you',
    miniLink: '/p/ahead-of-you',
    winterBadge: true,
    winterBadgeText: 'מחזור חורף נפתח בקרוב',
    themeColor: '#b23a5f',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#fffbfc] to-[#fcedf0]',
    borderStyle: 'border-2 border-[#b23a5f]/40 hover:border-[#b23a5f] hover:shadow-xl shadow-[0_8px_30px_rgba(178,58,95,0.08)]',
    iconBoxStyle: 'bg-[#b23a5f]/15 text-[#b23a5f] border border-[#b23a5f]/30',
    badgeStyle: 'bg-[#b23a5f]/10 text-[#b23a5f] border border-[#b23a5f]/30 font-black',
    buttonStyle: 'bg-[#b23a5f] hover:bg-[#8f2847] text-white shadow-sm hover:shadow-md',
    accentBar: 'bg-[#b23a5f]',
    navCardClass: 'bg-rose-50/70 hover:bg-rose-100/80 border-rose-200 hover:border-rose-400',
    navIconClass: 'bg-rose-100 text-rose-700',
    navTitleHoverClass: 'group-hover:text-rose-700',
  },
  {
    id: 'up-to-180',
    name: 'עד 180°',
    category: 'סדנה לתהליכי שינוי',
    categoryNode: <span>סדנה לתהליכי שינוי</span>,
    navSubtitle: 'סדנה לתהליכי שינוי',
    tagline: 'לעצור, לשנות זווית ולבחור את הצעד הבא.',
    icon: Compass,
    logoUrl: UNTIL180_LOGO_URL,
    logoFallback: UNTIL180_LOGO_FALLBACK,
    logoBorderColor: 'rgba(13,110,122,0.4)',
    landingLink: '/p/up-to-180',
    miniLink: '/p/up-to-180',
    themeColor: '#0d6e7a',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#f7fbfb] to-[#edf6f6]',
    borderStyle: 'border-2 border-[#0d6e7a]/40 hover:border-[#0d6e7a] hover:shadow-xl shadow-[0_8px_30px_rgba(13,110,122,0.08)]',
    iconBoxStyle: 'bg-[#0d6e7a]/15 text-[#0d6e7a] border border-[#0d6e7a]/30',
    badgeStyle: 'bg-[#0d6e7a]/10 text-[#0d6e7a] border border-[#0d6e7a]/30 font-black',
    buttonStyle: 'bg-[#0d6e7a] hover:bg-[#08545e] text-white shadow-sm hover:shadow-md',
    accentBar: 'bg-[#0d6e7a]',
    navCardClass: 'bg-sky-50/70 hover:bg-sky-100/80 border-sky-200 hover:border-sky-400',
    navIconClass: 'bg-sky-100 text-sky-700',
    navTitleHoverClass: 'group-hover:text-sky-700',
  },
  {
    id: 'flowtrips',
    name: 'FLOWTRIPS וריטריטים',
    nameNode: <FlowTripsTitle />,
    category: 'חוויות דרך וריטריטים לנשים',
    categoryNode: <span>חוויות דרך וריטריטים לנשים</span>,
    navSubtitle: 'חוויות דרך וריטריטים לנשים',
    tagline: 'חווית דרך וריטריט לנשים – חוויה שבונה את הדרך שלך.',
    icon: Compass,
    logoUrl: FLOWTRIPS_LOGO_URL,
    logoFallback: FLOWTRIPS_LOGO_URL,
    logoBorderColor: 'rgba(217,119,6,0.4)',
    landingLink: '/p/flowtrips',
    miniLink: '/p/flowtrips',
    themeColor: '#d97706',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#fffcf7] to-[#feede0]',
    borderStyle: 'border-2 border-amber-600/40 hover:border-amber-600 hover:shadow-xl shadow-[0_8px_30px_rgba(217,119,6,0.08)]',
    iconBoxStyle: 'bg-amber-500/15 text-amber-900 border border-amber-500/30',
    badgeStyle: 'bg-amber-100 text-amber-900 border border-amber-300 font-black',
    buttonStyle: 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm hover:shadow-md',
    accentBar: 'bg-amber-600',
    navCardClass: 'bg-amber-50/70 hover:bg-amber-100/80 border-amber-300 hover:border-amber-600',
    navIconClass: 'bg-amber-500/15 text-amber-900',
    navTitleHoverClass: 'group-hover:text-amber-800',
  },
  {
    id: 'the-tent',
    name: 'האוהל',
    category: 'מנהיגות, יוזמה והשפעה',
    categoryNode: <span>מנהיגות, יוזמה והשפעה</span>,
    navSubtitle: 'מנהיגות והשפעה נשית',
    tagline: 'מהכוחות והעוגנים הפנימיים אל יוזמה, הובלה ועשייה בקהילה.',
    icon: Tent,
    logoUrl: THE_TENT_LOGO_URL,
    logoFallback: THE_TENT_LOGO_FALLBACK,
    logoBorderColor: 'rgba(168,103,42,0.4)',
    landingLink: '/p/the-tent',
    miniLink: '/p/the-tent',
    themeColor: '#914e13',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#fdfbf7] to-[#f7efe3]',
    borderStyle: 'border-2 border-[#b87333]/40 hover:border-[#a05a20] hover:shadow-xl shadow-[0_8px_30px_rgba(184,115,51,0.08)]',
    iconBoxStyle: 'bg-[#b87333]/15 text-[#914e13] border border-[#b87333]/30',
    badgeStyle: 'bg-[#b87333]/10 text-[#914e13] border border-[#b87333]/30 font-black',
    buttonStyle: 'bg-[#914e13] hover:bg-[#723b0b] text-white shadow-sm hover:shadow-md',
    accentBar: 'bg-[#b87333]',
    navCardClass: 'bg-amber-50/70 hover:bg-amber-100/80 border-amber-200/90 hover:border-amber-400',
    navIconClass: 'bg-amber-100/80 text-[#914e13]',
    navTitleHoverClass: 'group-hover:text-[#914e13]',
  },
  {
    id: 'highlights',
    name: 'היילייטס',
    category: 'תוכנית פיתוח בארגונים',
    categoryNode: <span>תוכנית פיתוח בארגונים</span>,
    navSubtitle: 'לארגונים וחברות',
    tagline: 'מניסיון ונוכחות להובלה והשפעה לנשים באמצע החיים.',
    icon: Sparkles,
    logoUrl: HIGHLIGHTS_LOGO_URL,
    logoFallback: HIGHLIGHTS_LOGO_FALLBACK,
    logoBorderColor: 'rgba(32,76,142,0.4)',
    landingLink: '/p/highlights',
    miniLink: '/p/highlights',
    themeColor: '#204C8E',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#f8fbff] to-[#edf4fc]',
    borderStyle: 'border-2 border-[#204C8E]/40 hover:border-[#204C8E] hover:shadow-xl shadow-[0_8px_30px_rgba(32,76,142,0.08)]',
    iconBoxStyle: 'bg-[#204C8E]/15 text-[#204C8E] border border-[#204C8E]/30',
    badgeStyle: 'bg-[#204C8E]/10 text-[#204C8E] border border-[#204C8E]/30 font-black',
    buttonStyle: 'bg-[#204C8E] hover:bg-[#183a6d] text-white shadow-sm hover:shadow-md',
    accentBar: 'bg-[#204C8E]',
    navCardClass: 'bg-blue-50/70 hover:bg-blue-100/80 border-blue-200 hover:border-blue-400',
    navIconClass: 'bg-blue-100 text-blue-700',
    navTitleHoverClass: 'group-hover:text-blue-700',
  },
];

export interface ProgramCardsGridProps {
  programs?: CanonicalProgram[];
  currentProgramId?: string;
  excludeProgramId?: string;
  linkMode?: 'landing' | 'mini';
  variant?: 'cards' | 'compact-tabs';
}

/**
 * Compact, elegant tabs with small logo and subtle border for other programs navigation in landing & mini pages.
 */
export const CompactProgramTabs: React.FC<ProgramCardsGridProps> = ({
  programs = CANONICAL_PROGRAMS,
  currentProgramId,
  excludeProgramId,
  linkMode = 'landing',
}) => {
  const effectiveExclude = excludeProgramId || currentProgramId;
  const visiblePrograms = effectiveExclude
    ? programs.filter((p) => p.id !== effectiveExclude)
    : programs;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 max-w-4xl mx-auto" dir="rtl">
      {visiblePrograms.map((prog) => {
        const IconComponent = prog.icon;
        const targetLink = linkMode === 'mini' ? prog.miniLink : prog.landingLink;

        return (
          <Link
            key={prog.id}
            to={targetLink}
            id={`tab-program-${prog.id}`}
            className="group relative bg-white/95 hover:bg-white rounded-2xl p-2.5 sm:p-3 border border-gray-200/90 hover:border-brand-orange/50 shadow-2xs hover:shadow-md transition-all duration-200 flex items-center justify-between gap-2.5 text-right cursor-pointer overflow-hidden active:scale-[0.99]"
          >
            {/* Soft vertical colored accent stripe on right */}
            <div
              className="absolute top-0 bottom-0 right-0 w-1 transition-all group-hover:w-1.5"
              style={{ backgroundColor: prog.themeColor }}
            />

            {/* Right side: Logo + Program Info */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-1">
              {/* Compact Logo */}
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white p-0.5 border shadow-2xs flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform"
                style={{ borderColor: prog.logoBorderColor }}
              >
                {prog.logoUrl ? (
                  <img
                    src={prog.logoUrl}
                    alt={`לוגו ${prog.name}`}
                    className="w-full h-full object-contain rounded-full"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== prog.logoFallback) {
                        target.src = prog.logoFallback;
                      }
                    }}
                  />
                ) : (
                  <span style={{ color: prog.themeColor }} className="inline-flex">
                    <IconComponent className="w-5 h-5" />
                  </span>
                )}
              </div>

              {/* Title & Category */}
              <div className="min-w-0 flex flex-col justify-center">
                <span className="text-xs sm:text-sm md:text-base font-black text-gray-900 group-hover:text-brand-orange transition-colors truncate tracking-tight">
                  {prog.nameNode || prog.name}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 font-medium truncate">
                  {prog.navSubtitle || prog.category}
                </span>
              </div>
            </div>

            {/* Left side: Chevron */}
            <div className="flex items-center gap-1 shrink-0 pl-1">
              <span className="hidden sm:inline-block text-[11px] font-bold text-gray-400 group-hover:text-brand-orange transition-colors">
                לפרטים
              </span>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-50 group-hover:bg-brand-orange/10 flex items-center justify-center transition-colors">
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 group-hover:text-brand-orange group-hover:-translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export const ProgramCardsGrid: React.FC<ProgramCardsGridProps> = ({
  programs = CANONICAL_PROGRAMS,
  currentProgramId,
  excludeProgramId,
  linkMode = 'landing',
  variant,
}) => {
  const effectiveExclude = excludeProgramId || currentProgramId;
  const isCompact = variant === 'compact-tabs' || (variant !== 'cards' && Boolean(effectiveExclude));

  if (isCompact) {
    return (
      <CompactProgramTabs
        programs={programs}
        currentProgramId={currentProgramId}
        excludeProgramId={excludeProgramId}
        linkMode={linkMode}
      />
    );
  }

  const visiblePrograms = effectiveExclude
    ? programs.filter((p) => p.id !== effectiveExclude)
    : programs;

  return (
    <div className="flex flex-wrap justify-center gap-5 sm:gap-6 items-stretch" dir="rtl">
      {visiblePrograms.map((prog) => {
        const IconComponent = prog.icon;
        const targetLink = linkMode === 'mini' ? prog.miniLink : prog.landingLink;
        const isCurrent = currentProgramId === prog.id;

        return (
          <div
            key={prog.id}
            id={`program-${prog.id}`}
            className={`w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] ${prog.cardBg} rounded-3xl p-5 sm:p-6 md:p-7 ${prog.borderStyle} border-2 hover:-translate-y-1 transition-all duration-300 flex flex-col text-right group relative overflow-hidden shadow-sm hover:shadow-xl scroll-mt-24`}
          >
            {/* Colored top accent bar */}
            <div className={`h-2 w-full ${prog.accentBar} absolute top-0 right-0 left-0`} />

            {/* Top Badges Area */}
            {(prog.isFlagship || prog.winterBadge || isCurrent) && (
              <div className="flex flex-wrap items-center gap-2 mb-3.5 pt-1">
                {isCurrent && (
                  <div className="inline-flex items-center gap-1 bg-brand-green text-white px-3 py-1 rounded-full text-xs sm:text-sm font-black shadow-xs tracking-wide">
                    <span>את נמצאת כאן</span>
                  </div>
                )}
                {prog.isFlagship && (
                  <div className="inline-flex items-center gap-1.5 bg-brand-orange text-white px-3.5 py-1 rounded-full text-xs sm:text-sm font-black shadow-xs tracking-wide">
                    <Crown className="w-3.5 h-3.5 fill-current shrink-0" />
                    <span>סדנת הדגל של בין לבין</span>
                  </div>
                )}
                {prog.winterBadge && (
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white px-3.5 py-1 rounded-full text-xs sm:text-sm font-black shadow-md tracking-wide border-2 border-indigo-200 animate-badge-blink">
                    <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping shrink-0" />
                    <span>{prog.winterBadgeText || 'מחזור חורף נפתח בקרוב'}</span>
                  </div>
                )}
              </div>
            )}

            {/* Top Row: Program Logo & Category Badge */}
            <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5 pt-1">
              {prog.logoUrl ? (
                <div
                  className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-white p-1 sm:p-1.5 border-2 shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 overflow-hidden"
                  style={{ borderColor: prog.logoBorderColor }}
                >
                  <img
                    src={prog.logoUrl}
                    alt={`לוגו ${prog.name}`}
                    className="w-full h-full object-contain rounded-full"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== prog.logoFallback) {
                        target.src = prog.logoFallback;
                      }
                    }}
                  />
                </div>
              ) : (
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl ${prog.iconBoxStyle} flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0`}>
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
              )}

              <span className={`inline-block px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs md:text-sm font-black tracking-tight text-center ${prog.badgeStyle}`}>
                {prog.categoryNode}
              </span>
            </div>

            {/* Program Name */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 group-hover:text-brand-orange transition-colors tracking-tight mb-2 text-right">
              {prog.nameNode || prog.name}
            </h3>

            {/* Single Short Essence / Tagline */}
            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium leading-relaxed mb-5 sm:mb-6 flex-1 text-right">
              {prog.tagline}
            </p>

            {/* Action Button */}
            <div className="pt-4 border-t border-brand-beige/80 mt-auto">
              <Link
                to={targetLink}
                className={`w-full inline-flex items-center justify-between ${prog.buttonStyle} px-5 py-3.5 rounded-2xl text-sm sm:text-base font-black transition-all duration-300 group/btn shadow-xs hover:shadow-md active:scale-98`}
              >
                <span>לפרטים על התוכנית</span>
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover/btn:-translate-x-1 shrink-0" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
