import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Share2, 
  ArrowLeft, 
  Flower2, 
  Compass, 
  Tent, 
  Trees, 
  Sun, 
  Sparkles,
  Crown
} from 'lucide-react';

export interface MiniProgramMeta {
  id: string;
  name: string;
  category: string;
  tagline: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
  logoUrl?: string;
  isFlagship?: boolean;
  themeColor: string; // Hex color for highlights
  accentBar: string;
  badgeStyle: string;
  cardBg: string;
  borderStyle: string;
  iconBoxStyle: string;
  buttonStyle: string;
  textColor: string;
  logoFallback?: string;
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

export const ALL_MINI_PROGRAMS: MiniProgramMeta[] = [
  {
    id: 'midlife',
    name: 'אמצע החיים',
    category: 'סדנת הדגל לנשים 45–60',
    tagline: 'מעטפת מקצועית של ידע, שיח והתבוננות אישית לתקופת גיל המעבר.',
    link: '/p/midlife',
    icon: Flower2,
    logoUrl: MIDLIFE_LOGO_URL,
    logoFallback: MIDLIFE_LOGO_FALLBACK,
    isFlagship: true,
    themeColor: '#C56B3E',
    accentBar: 'bg-[#C56B3E]',
    badgeStyle: 'bg-[#C56B3E]/10 text-[#C56B3E] border-[#C56B3E]/30',
    cardBg: 'bg-gradient-to-b from-[#fffbf7] via-[#fff7ef] to-[#ffeedd]',
    borderStyle: 'border-2 border-[#C56B3E]/50 shadow-[0_10px_30px_rgba(197,107,62,0.12)] hover:border-[#C56B3E]',
    iconBoxStyle: 'bg-[#C56B3E]/15 text-[#C56B3E] border border-[#C56B3E]/30',
    buttonStyle: 'bg-[#C56B3E] hover:bg-[#a84f24] text-white',
    textColor: 'text-[#C56B3E]'
  },
  {
    id: 'ahead-of-you',
    name: 'עוֹד לְפָנַיִךְ',
    category: 'תוכנית לנשים 60+',
    tagline: 'להמשיך לגלות, לבחור, להתחדש וליצור משמעות.',
    link: '/p/ahead-of-you',
    icon: Sun,
    logoUrl: AHEAD_OF_YOU_LOGO_URL,
    logoFallback: AHEAD_OF_YOU_LOGO_FALLBACK,
    themeColor: '#b23a5f',
    accentBar: 'bg-[#b23a5f]',
    badgeStyle: 'bg-[#b23a5f]/10 text-[#b23a5f] border-[#b23a5f]/30',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#fffbfc] to-[#fcedf0]',
    borderStyle: 'border-2 border-[#b23a5f]/40 shadow-[0_10px_30px_rgba(178,58,95,0.1)] hover:border-[#b23a5f]',
    iconBoxStyle: 'bg-[#b23a5f]/15 text-[#b23a5f] border border-[#b23a5f]/30',
    buttonStyle: 'bg-[#b23a5f] hover:bg-[#8f2847] text-white',
    textColor: 'text-[#b23a5f]'
  },
  {
    id: 'up-to-180',
    name: 'עד 180°',
    category: 'סדנה לתהליכי שינוי',
    tagline: 'לעצור, לשנות זווית ולבחור את הצעד הבא.',
    link: '/p/up-to-180',
    icon: Compass,
    logoUrl: UNTIL180_LOGO_URL,
    logoFallback: UNTIL180_LOGO_FALLBACK,
    themeColor: '#0d6e7a',
    accentBar: 'bg-[#0d6e7a]',
    badgeStyle: 'bg-[#0d6e7a]/10 text-[#0d6e7a] border-[#0d6e7a]/30',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#f7fbfb] to-[#edf6f6]',
    borderStyle: 'border-2 border-[#0d6e7a]/40 shadow-[0_10px_30px_rgba(13,110,122,0.1)] hover:border-[#0d6e7a]',
    iconBoxStyle: 'bg-[#0d6e7a]/15 text-[#0d6e7a] border border-[#0d6e7a]/30',
    buttonStyle: 'bg-[#0d6e7a] hover:bg-[#08545e] text-white',
    textColor: 'text-[#0d6e7a]'
  },
  {
    id: 'alchemy',
    name: 'אלכימיה של יסודות',
    category: 'יום שיא בטבע',
    tagline: 'חוויה שמחברת בין טבע, תנועה, התבוננות וחיבור לעצמנו.',
    link: '/p/alchemy',
    icon: Trees,
    logoUrl: ALCHEMY_LOGO_URL,
    logoFallback: ALCHEMY_LOGO_FALLBACK,
    themeColor: '#48996B',
    accentBar: 'bg-[#48996B]',
    badgeStyle: 'bg-[#48996B]/10 text-[#327a51] border-[#48996B]/30',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#f7faf8] to-[#eaf4ee]',
    borderStyle: 'border-2 border-[#48996B]/40 shadow-[0_10px_30px_rgba(72,153,107,0.1)] hover:border-[#48996B]',
    iconBoxStyle: 'bg-[#48996B]/15 text-[#327a51] border border-[#48996B]/30',
    buttonStyle: 'bg-[#48996B] hover:bg-[#397d56] text-white',
    textColor: 'text-[#327a51]'
  },
  {
    id: 'the-tent',
    name: 'האוהל',
    category: 'מנהיגות, יוזמה והשפעה',
    tagline: 'מהכוחות והעוגנים הפנימיים אל יוזמה, הובלה ועשייה בקהילה.',
    link: '/p/the-tent',
    icon: Tent,
    logoUrl: THE_TENT_LOGO_URL,
    logoFallback: THE_TENT_LOGO_FALLBACK,
    themeColor: '#914e13',
    accentBar: 'bg-[#b87333]',
    badgeStyle: 'bg-[#b87333]/15 text-[#914e13] border-[#b87333]/35',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#fdfbf7] to-[#f7efe3]',
    borderStyle: 'border-2 border-[#b87333]/40 shadow-[0_10px_30px_rgba(184,115,51,0.1)] hover:border-[#914e13]',
    iconBoxStyle: 'bg-[#b87333]/15 text-[#914e13] border border-[#b87333]/35',
    buttonStyle: 'bg-[#914e13] hover:bg-[#723b0b] text-white',
    textColor: 'text-[#914e13]'
  },
  {
    id: 'highlights',
    name: 'היילייטס',
    category: 'תוכנית פיתוח בארגונים',
    tagline: 'מניסיון ונוכחות להובלה והשפעה לנשים באמצע החיים.',
    link: '/p/highlights',
    icon: Sparkles,
    logoUrl: HIGHLIGHTS_LOGO_URL,
    logoFallback: HIGHLIGHTS_LOGO_FALLBACK,
    themeColor: '#204C8E',
    accentBar: 'bg-[#204C8E]',
    badgeStyle: 'bg-[#204C8E]/10 text-[#204C8E] border-[#204C8E]/30',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#f8fbff] to-[#edf4fc]',
    borderStyle: 'border-2 border-[#204C8E]/40 shadow-[0_10px_30px_rgba(32,76,142,0.1)] hover:border-[#204C8E]',
    iconBoxStyle: 'bg-[#204C8E]/15 text-[#204C8E] border border-[#204C8E]/30',
    buttonStyle: 'bg-[#204C8E] hover:bg-[#183a6d] text-white',
    textColor: 'text-[#204C8E]'
  }
];

interface MiniPageTopNavProps {
  currentTitle?: string;
  themeColor?: string;
  onShare?: () => void;
}

export const MiniPageTopNav: React.FC<MiniPageTopNavProps> = ({
  currentTitle,
  themeColor = '#234E3D',
  onShare
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
    <header className="pt-6 pb-4 px-4 sm:px-6 relative z-30">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Prominent Back Button to Main Page */}
        <Link
          to="/women-programs"
          className="inline-flex items-center gap-2 bg-white/95 hover:bg-brand-green hover:text-white text-brand-green px-4 py-2 rounded-full text-xs sm:text-sm font-black border border-brand-green/20 shadow-xs hover:shadow-md transition-all active:scale-95 group"
          title="חזרה לעמוד הראשי של בין לבין"
        >
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-brand-orange group-hover:text-white" />
          <span>לעמוד הראשי של בין לבין</span>
        </Link>

        {/* Brand identity & Share Button */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/women-programs"
            className="hidden sm:inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide border border-brand-green/15 hover:bg-brand-green/15 transition-colors"
          >
            <span>בין לבין</span>
            <span className="text-brand-orange font-light">|</span>
            <span>תוכניות לנשים</span>
          </Link>

          <button
            onClick={handleDefaultShare}
            aria-label="הזמיני חברה"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-brand-orange transition-colors px-3 py-1.5 rounded-full bg-white/90 hover:bg-white border border-brand-beige shadow-2xs active:scale-95 cursor-pointer"
            title="הזמיני חברה"
          >
            <Share2 className="w-3.5 h-3.5 text-brand-orange" />
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
  const otherPrograms = ALL_MINI_PROGRAMS.filter(p => p.id !== currentProgramId);

  return (
    <section className="mt-12 pt-8 pb-10 border-t-2 border-brand-beige/80">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-brand-green/10 text-brand-green rounded-full text-xs font-black mb-2 border border-brand-green/15">
          <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
          <span>הבית של בין לבין</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-brand-green tracking-tight mb-1 text-center">
          תוכניות וריטריטים נוספים של בין לבין
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-medium text-center">
          מעבר ישיר למידע על שאר התוכניות
        </p>
      </div>

      {/* Responsive Grid of Small Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 mb-8 max-w-4xl mx-auto">
        {otherPrograms.map((prog) => {
          const IconComp = prog.icon;
          return (
            <Link
              key={prog.id}
              to={prog.link}
              className="flex items-center justify-between gap-3 bg-white hover:bg-brand-orange/5 p-3 sm:px-4 rounded-2xl border-2 border-brand-beige/90 hover:border-brand-orange transition-all duration-200 group text-right shadow-2xs hover:shadow-sm active:scale-98"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {prog.logoUrl ? (
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white p-1 border shadow-2xs flex items-center justify-center shrink-0 overflow-hidden"
                    style={{
                      borderColor: prog.themeColor ? `${prog.themeColor}50` : 'rgba(197,107,62,0.3)'
                    }}
                  >
                    <img 
                      src={prog.logoUrl} 
                      alt={`לוגו ${prog.name}`} 
                      className="w-full h-full object-contain"
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
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${prog.themeColor}15`,
                      borderColor: `${prog.themeColor}35`,
                      color: prog.themeColor
                    }}
                  >
                    <IconComp className="w-4.5 h-4.5" />
                  </div>
                )}
                <div className="min-w-0 text-right">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm sm:text-base font-black text-gray-900 group-hover:text-brand-orange transition-colors truncate">
                      {prog.name}
                    </span>
                    {prog.isFlagship && (
                      <Crown className="w-3.5 h-3.5 text-brand-orange fill-brand-orange shrink-0" />
                    )}
                  </div>
                  <div 
                    className="text-xs font-bold truncate"
                    style={{ color: prog.themeColor }}
                  >
                    {prog.category}
                  </div>
                </div>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-brand-orange group-hover:-translate-x-0.5 transition-all shrink-0" />
            </Link>
          );
        })}
      </div>

      {/* Big Return Button to Master Landing Page */}
      <div className="text-center pt-2">
        <Link
          to="/women-programs"
          className="inline-flex items-center justify-center gap-2.5 bg-brand-green hover:bg-brand-orange text-white px-7 py-3 rounded-full text-xs sm:text-sm font-black transition-all shadow-xs hover:shadow-md active:scale-98"
        >
          <ArrowRight className="w-4 h-4" />
          <span>לעמוד הראשי של בין לבין</span>
        </Link>
      </div>
    </section>
  );
};
