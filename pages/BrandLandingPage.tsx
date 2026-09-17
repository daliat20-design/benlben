import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Share2, 
  Sparkles, 
  ChevronUp, 
  ChevronDown,
  Compass, 
  Sun, 
  Trees, 
  Tent, 
  Flower2, 
  ArrowLeft,
  Crown,
  Menu,
  X,
  Lock
} from 'lucide-react';
import { ButterflyIcon } from '../components/Hero';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { InterestForm } from '../components/InterestForm';
import { BrandGallerySlider } from '../components/BrandGallerySlider';

const DALIT_PHOTO_URL = "https://i.postimg.cc/TPYf2twq/DSC-3250.jpg";
const ELSIE_PHOTO_URL = "https://i.postimg.cc/fbc302jS/Whats-App-Image-2026-09-14-at-11-31-04.jpg";

interface ProgramCardTheme {
  id: string;
  name: string;
  isFlagship?: boolean;
  winterBadge?: boolean;
  winterBadgeText?: string;
  categoryNode?: React.ReactNode;
  tagline: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  logoUrl?: string;
  logoFallback?: string;
  link: string;
  cardBg: string;
  borderStyle: string;
  iconBoxStyle: string;
  badgeStyle: string;
  buttonStyle: string;
  accentBar: string;
}

const MAIN_BRAND_LOGO_URL = "/logos/brand-main.webp";
const MAIN_BRAND_LOGO_FALLBACK = "/logos/brand-main.png";

const MIDLIFE_LOGO_URL = "/logos/midlife.webp";
const MIDLIFE_LOGO_FALLBACK = "/logos/midlife.png";

const UNTIL180_LOGO_URL = "/logos/up-to-180.webp";
const UNTIL180_LOGO_FALLBACK = "/logos/up-to-180.png";

const ALCHEMY_LOGO_URL = "/logos/alchemy.webp";
const ALCHEMY_LOGO_FALLBACK = "/logos/alchemy.png";

const AHEAD_OF_YOU_LOGO_URL = "/logos/ahead-of-you.webp";
const AHEAD_OF_YOU_LOGO_FALLBACK = "/logos/ahead-of-you.png";

const HIGHLIGHTS_LOGO_URL = "/logos/highlights.webp";
const HIGHLIGHTS_LOGO_FALLBACK = "/logos/highlights.png";

const THE_TENT_LOGO_URL = "/logos/the-tent.webp";
const THE_TENT_LOGO_FALLBACK = "/logos/the-tent.png";

const getProgramBorderColor = (id: string) => {
  switch (id) {
    case 'midlife': return 'rgba(203,119,69,0.4)';
    case 'up-to-180': return 'rgba(13,110,122,0.4)';
    case 'alchemy': return 'rgba(72,153,107,0.4)';
    case 'ahead-of-you': return 'rgba(178,58,95,0.4)';
    case 'the-tent': return 'rgba(168,103,42,0.4)';
    case 'highlights': return 'rgba(32,76,142,0.4)';
    default: return 'rgba(203,119,69,0.4)';
  }
};

const ALL_PROGRAMS: ProgramCardTheme[] = [
  {
    id: 'midlife',
    name: 'אמצע החיים',
    isFlagship: true,
    winterBadge: true,
    winterBadgeText: 'מחזור חורף נפתח בקרוב',
    categoryNode: (
      <span>
        נשים{' '}
        <span dir="ltr" className="inline-block font-sans font-black">
          45-60
        </span>
      </span>
    ),
    tagline: 'מעטפת מקצועית של ידע, שיח והתבוננות אישית לתקופת גיל המעבר.',
    icon: Flower2,
    logoUrl: MIDLIFE_LOGO_URL,
    logoFallback: MIDLIFE_LOGO_FALLBACK,
    link: '/p/midlife',
    cardBg: 'bg-gradient-to-b from-[#fffbf7] via-[#fff7ef] to-[#ffeedd]',
    borderStyle: 'border-2 border-brand-orange/60 ring-2 ring-brand-orange/20 shadow-[0_12px_40px_rgba(203,119,69,0.15)] hover:border-brand-orange hover:shadow-2xl',
    iconBoxStyle: 'bg-brand-orange/20 text-brand-orange border border-brand-orange/40 shadow-xs',
    badgeStyle: 'bg-brand-orange/10 text-brand-orange border border-brand-orange/30 font-black',
    buttonStyle: 'bg-brand-orange hover:bg-brand-green text-white shadow-sm hover:shadow-md',
    accentBar: 'bg-brand-orange'
  },
  {
    id: 'ahead-of-you',
    name: 'עוֹד לְפָנַיִךְ',
    winterBadge: true,
    winterBadgeText: 'מחזור חורף נפתח בקרוב',
    categoryNode: (
      <span>
        תוכנית לנשים{' '}
        <span dir="ltr" className="inline-block font-sans font-black">
          60+
        </span>
      </span>
    ),
    tagline: 'להמשיך לגלות, לבחור, להתחדש וליצור משמעות.',
    icon: Sun,
    logoUrl: AHEAD_OF_YOU_LOGO_URL,
    logoFallback: AHEAD_OF_YOU_LOGO_FALLBACK,
    link: '/p/ahead-of-you',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#fffbfc] to-[#fcedf0]',
    borderStyle: 'border-2 border-[#b23a5f]/40 hover:border-[#b23a5f] hover:shadow-xl shadow-[0_8px_30px_rgba(178,58,95,0.08)]',
    iconBoxStyle: 'bg-[#b23a5f]/15 text-[#b23a5f] border border-[#b23a5f]/30',
    badgeStyle: 'bg-[#b23a5f]/10 text-[#b23a5f] border border-[#b23a5f]/30 font-black',
    buttonStyle: 'bg-[#b23a5f] hover:bg-[#8f2847] text-white shadow-sm hover:shadow-md',
    accentBar: 'bg-[#b23a5f]'
  },
  {
    id: 'up-to-180',
    name: 'עד 180°',
    categoryNode: <span>סדנה לתהליכי שינוי</span>,
    tagline: 'לעצור, לשנות זווית ולבחור את הצעד הבא.',
    icon: Compass,
    logoUrl: UNTIL180_LOGO_URL,
    logoFallback: UNTIL180_LOGO_FALLBACK,
    link: '/p/up-to-180',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#f7fbfb] to-[#edf6f6]',
    borderStyle: 'border-2 border-[#0d6e7a]/40 hover:border-[#0d6e7a] hover:shadow-xl shadow-[0_8px_30px_rgba(13,110,122,0.08)]',
    iconBoxStyle: 'bg-[#0d6e7a]/15 text-[#0d6e7a] border border-[#0d6e7a]/30',
    badgeStyle: 'bg-[#0d6e7a]/10 text-[#0d6e7a] border border-[#0d6e7a]/30 font-black',
    buttonStyle: 'bg-[#0d6e7a] hover:bg-[#08545e] text-white shadow-sm hover:shadow-md',
    accentBar: 'bg-[#0d6e7a]'
  },
  {
    id: 'alchemy',
    name: 'אלכימיה של יסודות',
    categoryNode: <span>יום שיא בטבע</span>,
    tagline: 'חוויה שמחברת בין טבע, תנועה, התבוננות וחיבור לעצמנו.',
    icon: Trees,
    logoUrl: ALCHEMY_LOGO_URL,
    logoFallback: ALCHEMY_LOGO_FALLBACK,
    link: '/p/alchemy',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#f7faf8] to-[#eaf4ee]',
    borderStyle: 'border-2 border-[#48996B]/40 hover:border-[#48996B] hover:shadow-xl shadow-[0_8px_30px_rgba(72,153,107,0.08)]',
    iconBoxStyle: 'bg-[#48996B]/15 text-[#327a51] border border-[#48996B]/30',
    badgeStyle: 'bg-[#48996B]/10 text-[#327a51] border border-[#48996B]/30 font-black',
    buttonStyle: 'bg-[#48996B] hover:bg-[#397d56] text-white shadow-sm hover:shadow-md',
    accentBar: 'bg-[#48996B]'
  },
  {
    id: 'the-tent',
    name: 'האוהל',
    categoryNode: <span>מנהיגות, יוזמה והשפעה</span>,
    tagline: 'מהכוחות והעוגנים הפנימיים אל יוזמה, הובלה ועשייה בקהילה.',
    icon: Tent,
    logoUrl: THE_TENT_LOGO_URL,
    logoFallback: THE_TENT_LOGO_FALLBACK,
    link: '/p/the-tent',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#fdfbf7] to-[#f7efe3]',
    borderStyle: 'border-2 border-[#b87333]/40 hover:border-[#a05a20] hover:shadow-xl shadow-[0_8px_30px_rgba(184,115,51,0.08)]',
    iconBoxStyle: 'bg-[#b87333]/15 text-[#914e13] border border-[#b87333]/30',
    badgeStyle: 'bg-[#b87333]/10 text-[#914e13] border border-[#b87333]/30 font-black',
    buttonStyle: 'bg-[#914e13] hover:bg-[#723b0b] text-white shadow-sm hover:shadow-md',
    accentBar: 'bg-[#b87333]'
  },
  {
    id: 'highlights',
    name: 'היילייטס',
    categoryNode: <span>תוכנית פיתוח בארגונים</span>,
    tagline: 'מניסיון ונוכחות להובלה והשפעה לנשים באמצע החיים.',
    icon: Sparkles,
    logoUrl: HIGHLIGHTS_LOGO_URL,
    logoFallback: HIGHLIGHTS_LOGO_FALLBACK,
    link: '/p/highlights',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#f8fbff] to-[#edf4fc]',
    borderStyle: 'border-2 border-[#204C8E]/40 hover:border-[#204C8E] hover:shadow-xl shadow-[0_8px_30px_rgba(32,76,142,0.08)]',
    iconBoxStyle: 'bg-[#204C8E]/15 text-[#204C8E] border border-[#204C8E]/30',
    badgeStyle: 'bg-[#204C8E]/10 text-[#204C8E] border border-[#204C8E]/30 font-black',
    buttonStyle: 'bg-[#204C8E] hover:bg-[#183a6d] text-white shadow-sm hover:shadow-md',
    accentBar: 'bg-[#204C8E]'
  }
];

export const BrandLandingPage: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  useEffect(() => {
    document.title = "בין לבין תוכניות לנשים";
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsNavOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const whatsappMasterText = encodeURIComponent(
    "אשמח לשמוע פרטים על תוכניות בין לבין לנשים"
  );
  const dalitWhatsappUrl = `https://wa.me/972508353731?text=${whatsappMasterText}`;
  const elsieWhatsappUrl = `https://wa.me/972547458668?text=${whatsappMasterText}`;

  const shareText = "תראי מה מצאתי !! סדנאות, מרחבים וריטרטים לנשים";
  
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "בין לבין | מרחבים לנשים",
          text: shareText,
          url,
        });
      } catch {
        // user cancelled share
      }
    } else {
      // Fallback: open WhatsApp share or copy to clipboard
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${url}`)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const scrollToSection = (sectionId: string) => {
    setIsNavOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        const yOffset = -75; // account for sticky header
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-gray-800 antialiased selection:bg-brand-orange/20 selection:text-brand-green font-sans" dir="rtl">
      
      {/* =========================================================================
          תפריט עליון קבוע ודביק (Sticky Top) עם תפריט נפתח (Dropdown)
          - לוגו ושם המותג
          - לחצן "הזמיני חברה" (מופיע גם כאן למעלה וגם בתחתית הדף)
          - לחצן תפריט נפתח לניווט מהיר לכל התוכניות, הצוות ו"צרי קשר"
      ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-beige/90 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          
          {/* מותג ימין: לוגו עגול + שם המותג */}
          <a 
            href="#" 
            onClick={(e) => { 
              e.preventDefault(); 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }} 
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-brand-green/30 shadow-xs flex items-center justify-center overflow-hidden bg-white p-1 group-hover:scale-105 transition-transform">
              <img 
                src={MAIN_BRAND_LOGO_URL} 
                alt="לוגו בין לבין" 
                className="w-full h-full object-contain rounded-full"
                loading="eager"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== MAIN_BRAND_LOGO_FALLBACK) {
                    target.src = MAIN_BRAND_LOGO_FALLBACK;
                  }
                }}
              />
            </div>
            <span className="text-xl sm:text-2xl font-black text-brand-green tracking-tight">
              בין לבין
            </span>
          </a>

          {/* פעולות שמאל: לחצן "הזמיני חברה" + לחצן תפריט נפתח */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* לחצן הזמיני חברה - מופיע למעלה (וגם בתחתית הדף) */}
            <button
              onClick={handleShare}
              aria-label="הזמיני חברה"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700 hover:text-brand-orange transition-colors py-2 px-3.5 sm:px-4 rounded-full bg-brand-cream hover:bg-white border border-brand-beige cursor-pointer shadow-xs active:scale-95"
              title="הזמיני חברה"
            >
              <Share2 className="w-4 h-4 text-brand-orange" />
              <span>הזמיני חברה</span>
            </button>

            {/* לחצן תפריט נפתח */}
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              aria-expanded={isNavOpen}
              aria-label="תפריט ניווט"
              className={`inline-flex items-center gap-2 text-xs sm:text-sm font-black py-2 px-3.5 sm:px-4 rounded-full border transition-all cursor-pointer shadow-xs active:scale-95 ${
                isNavOpen 
                  ? 'bg-brand-green text-white border-brand-green shadow-sm' 
                  : 'bg-white hover:bg-brand-cream text-brand-green border-brand-green/40 hover:border-brand-green'
              }`}
            >
              {isNavOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Menu className="w-4 h-4 text-brand-green" />
              )}
              <span>תפריט</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isNavOpen ? 'rotate-180 text-white' : 'text-brand-green'}`} />
            </button>

          </div>
        </div>

        {/* התפריט הנפתח (Dropdown Panel) */}
        {isNavOpen && (
          <>
            {/* מסך שקוף לסגירה בלחיצה בחוץ */}
            <div 
              className="fixed inset-0 top-[57px] sm:top-[65px] bg-black/25 backdrop-blur-2xs z-40 transition-opacity"
              onClick={() => setIsNavOpen(false)}
            />

            <div className="relative z-50 border-t border-brand-beige bg-white/98 backdrop-blur-md shadow-2xl px-4 sm:px-6 py-5 max-h-[82vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 text-right">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-xs sm:text-sm font-black text-brand-green tracking-wide">
                    התוכניות והריטריטים של בין לבין:
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">
                    לחצי למעבר מהיר
                  </span>
                </div>

                {/* רשת קישורים לתוכניות */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                  
                  {/* אמצע החיים */}
                  <Link
                    to="/p/midlife"
                    onClick={() => setIsNavOpen(false)}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200 hover:border-brand-orange transition-all text-right group shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/20 text-brand-orange flex items-center justify-center font-black text-base shrink-0 group-hover:scale-105 transition-transform">
                      <Flower2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-black text-base text-gray-900 group-hover:text-brand-orange transition-colors">
                        אמצע החיים
                      </div>
                      <div className="text-xs text-gray-600">
                        סדנת הדגל לנשים <span dir="ltr">45-60</span>
                      </div>
                    </div>
                  </Link>

                  {/* עוד לפנייך */}
                  <Link
                    to="/p/ahead-of-you"
                    onClick={() => setIsNavOpen(false)}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200 hover:border-rose-400 transition-all text-right group shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-base shrink-0 group-hover:scale-105 transition-transform">
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-black text-base text-gray-900 group-hover:text-rose-700 transition-colors">
                        עוֹד לְפָנַיִךְ
                      </div>
                      <div className="text-xs text-gray-600">תוכנית לנשים 60+</div>
                    </div>
                  </Link>

                  {/* אלכימיה של היסודות */}
                  <Link
                    to="/p/alchemy"
                    onClick={() => setIsNavOpen(false)}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-teal-50/70 hover:bg-teal-100/80 border border-teal-200 hover:border-teal-400 transition-all text-right group shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-base shrink-0 group-hover:scale-105 transition-transform">
                      <Trees className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-black text-base text-gray-900 group-hover:text-teal-700 transition-colors">
                        אלכימיה של היסודות
                      </div>
                      <div className="text-xs text-gray-600">יום שיא וסדנת טבע</div>
                    </div>
                  </Link>

                  {/* עד 180° */}
                  <Link
                    to="/p/up-to-180"
                    onClick={() => setIsNavOpen(false)}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-sky-50/70 hover:bg-sky-100/80 border border-sky-200 hover:border-sky-400 transition-all text-right group shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-base shrink-0 group-hover:scale-105 transition-transform">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-black text-base text-gray-900 group-hover:text-sky-700 transition-colors">
                        עד 180°
                      </div>
                      <div className="text-xs text-gray-600">סדנה לתהליכי שינוי</div>
                    </div>
                  </Link>

                  {/* היילייטס */}
                  <Link
                    to="/p/highlights"
                    onClick={() => setIsNavOpen(false)}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 hover:border-blue-400 transition-all text-right group shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-base shrink-0 group-hover:scale-105 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-black text-base text-gray-900 group-hover:text-blue-700 transition-colors">
                        היילייטס
                      </div>
                      <div className="text-xs text-gray-600">לארגונים וחברות</div>
                    </div>
                  </Link>

                  {/* האוהל */}
                  <Link
                    to="/p/the-tent"
                    onClick={() => setIsNavOpen(false)}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200/90 hover:border-amber-400 transition-all text-right group shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-[#914e13] flex items-center justify-center font-black text-base shrink-0 group-hover:scale-105 transition-transform">
                      <Tent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-black text-base text-gray-900 group-hover:text-[#914e13] transition-colors">
                        האוהל
                      </div>
                      <div className="text-xs text-gray-600">מנהיגות והשפעה נשית</div>
                    </div>
                  </Link>

                </div>

                {/* קישורים תחתונים בתפריט: הצוות, צרי קשר והזמיני חברה */}
                <div className="mt-4 pt-3.5 border-t border-brand-beige flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => scrollToSection('gallery')}
                      className="px-4 py-2 rounded-full text-xs sm:text-sm font-black bg-white hover:bg-brand-orange hover:text-white text-gray-800 border border-brand-orange/30 transition-all shadow-2xs cursor-pointer"
                    >
                      גלריית רגעים
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('team')}
                      className="px-4 py-2 rounded-full text-xs sm:text-sm font-black bg-brand-cream hover:bg-brand-green hover:text-white text-brand-green border border-brand-green/30 transition-all cursor-pointer"
                    >
                      הצוות - מי אנחנו
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('contact')}
                      className="px-5 py-2 rounded-full text-xs sm:text-sm font-black bg-brand-orange hover:bg-brand-green text-white transition-all shadow-xs cursor-pointer"
                    >
                      צרי קשר
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsNavOpen(false);
                      handleShare();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-brand-orange transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>הזמיני חברה</span>
                  </button>
                </div>

              </div>
            </div>
          </>
        )}
      </header>

      {/* =========================================================================
          1. HERO ופתיח המותג
          - פרפרים מוסתרים במובייל ומוגנים מכיסוי טקסט (-z-10, pointer-events-none, hidden md:block)
          - תמונה מוצגת לרוחב (Landscape) ללא חיתוך
          - כותרות ממורכזות בנייד, פונטים מוגדלים לקריאה מיטבית בגלילה
      ========================================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-6 overflow-hidden bg-brand-cream border-b border-brand-beige/80">
        {/* Floating Butterflies: Located in non-obstructive spots on both mobile & desktop */}
        <ButterflyIcon size={65} className="absolute top-4 left-3 sm:top-8 sm:left-10 opacity-40 animate-float pointer-events-none select-none z-0" />
        <ButterflyIcon size={55} className="absolute top-2 right-2 sm:top-6 sm:right-12 opacity-35 animate-drift pointer-events-none select-none z-0" />
        <ButterflyIcon size={50} className="absolute bottom-4 right-4 sm:bottom-6 sm:right-20 opacity-30 animate-float pointer-events-none select-none z-0" />

        <div className="max-w-5xl mx-auto relative z-10">

          {/* Hero Content Grid: Typography + Authentic Feminine Photo displayed in Horizontal Landscape */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Main Text Content */}
            <div className="lg:col-span-7 text-center">
              
              {/* Main Brand Logo - Prominent, circular & perfectly positioned without covering text */}
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full bg-white p-3 sm:p-4 border-4 border-brand-green/30 shadow-[0_16px_45px_rgba(35,78,61,0.18)] flex items-center justify-center transition-transform hover:scale-105 duration-300 shrink-0 overflow-hidden">
                  <img 
                    src={MAIN_BRAND_LOGO_URL} 
                    alt="לוגו בין לבין - בית נשי לתוכן, חוויה ומפגש" 
                    className="w-full h-full object-contain rounded-full"
                    loading="eager"
                    fetchPriority="high"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== MAIN_BRAND_LOGO_FALLBACK) {
                        target.src = MAIN_BRAND_LOGO_FALLBACK;
                      }
                    }}
                  />
                </div>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-brand-green tracking-tight leading-[1.12] mb-3 drop-shadow-xs text-center">
                בין לבין
              </h1>

              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-orange mb-8 tracking-tight text-center">
                מרחבים לנשים
              </div>

              {/* Flowing Copy with enlarged mobile font and generous line-height */}
              <div className="space-y-6 text-xl sm:text-2xl text-gray-800 leading-[1.85] sm:leading-relaxed font-normal max-w-2xl text-right mx-auto">
                <h3 className="font-extrabold text-2xl sm:text-3xl text-brand-green text-center sm:text-right leading-snug">
                  בבין לבין אנחנו לא סופרות שנים. אנחנו משתמשות בהן לטובתנו.
                </h3>

                <div className="bg-brand-orange/10 border-r-4 border-brand-orange pr-4 py-3 rounded-l-2xl">
                  <p className="font-black text-brand-orange text-xl sm:text-2xl">
                    רוצה לגלות איך? בואי, יש לנו הרגשה שנפתיע אותך.
                  </p>
                </div>

                <p>
                  לפעמים נדמה שככל שהשנים עוברות, האפשרויות דווקא מצטמצמות. שהשינויים בגוף, במשפחה, בזוגיות או בעבודה דורשים מאיתנו בעיקר להסתגל. שיש דברים שכבר מאוחר מדי לשנות.
                </p>

                <p className="font-black text-2xl sm:text-3xl text-brand-green">
                  אנחנו גילינו בדיוק את ההפך.
                </p>

                <p>
                  אחרי שנים של הובלת קהילה נשית ומפגש עם נשים בתקופות שונות בחיים, הבנו שכל מה שצברנו בדרך, הניסיון, הידע, ההיכרות עם עצמנו, הקשרים, ולפעמים גם הזמן שמתפנה, יכול להפוך דווקא עכשיו ליתרון.
                </p>

                <div className="bg-brand-green/8 border-r-4 border-brand-green pr-4 py-3.5 rounded-l-2xl my-2">
                  <p className="font-normal text-gray-900 text-xl sm:text-2xl">
                    <strong className="font-black text-brand-green">זו הגישה של בין לבין:</strong> לא להתעלם מהשינויים, אלא ללמוד איך להשתמש במה שכבר יש לנו כדי לנוע בתוכם, להניע את מה שאנחנו רוצות ולמקסם את מה שעוד לפנינו.
                  </p>
                </div>

                <p>
                  מכאן נולדו המרחבים שלנו, המשלבים <strong className="font-black text-brand-green">מפגש, תוכן וחוויה</strong>, וכל אחד מהם פוגש גיל, תקופה או מטרה אחרת.
                </p>

                <p>
                  מ<strong className="font-black text-brand-orange">אמצע החיים</strong>, תוכנית הדגל שלנו לנשים בגילאי <strong className="font-black" dir="ltr">45-60</strong>, דרך <strong className="font-black text-brand-orange">עוד לפנייך</strong> לנשים 60+, תוכניות להאצת שינויים ולהגשמת רצונות וחלומות, ועד מנהיגות, פיתוח בארגונים, ריטריטים וימי שיא.
                </p>

                <div className="pt-6 border-t-2 border-brand-beige text-center space-y-2">
                  <p className="text-gray-900 font-bold text-xl sm:text-2xl">
                    אנחנו מאמינות שבין המרחבים האלה נמצא גם המענה למה שאת מחפשת.
                  </p>
                  <p className="text-brand-green font-black text-2xl sm:text-3xl">
                    בואי לגלות מה מתאים לך.
                  </p>
                </div>
              </div>

              {/* כפתור פנייה / יצירת קשר עם וואטסאפ: אשמח לשוחח */}
              <div className="mt-8 sm:mt-10 flex justify-center">
                <a
                  href={dalitWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-black transition-all border-2 border-slate-300 hover:border-slate-400 shadow-md hover:shadow-lg cursor-pointer active:scale-98 group"
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center text-emerald-600 transition-colors">
                    <WhatsAppIcon className="w-5 h-5 fill-current" />
                  </div>
                  <span>אשמח לשוחח</span>
                </a>
              </div>
            </div>

            {/* Authentic Brand Photograph: Presented in Landscape (לרוחב) with Bein Levein Logo in the bottom-right corner */}
            <div className="lg:col-span-5 flex justify-center w-full mt-2 lg:mt-0">
              <div className="relative w-full max-w-lg">
                <div className="overflow-hidden rounded-3xl shadow-xl border-4 border-white aspect-[16/10] sm:aspect-[3/2] bg-brand-beige/30">
                  <img 
                    src="https://i.postimg.cc/X73f8XLh/IS-1193.jpg" 
                    alt="בין לבין - תוכניות וריטריטים לנשים" 
                    className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  />
                </div>

                {/* Organic decorative badge */}
                <div className="absolute -bottom-3 sm:-bottom-4 -left-2 bg-white/95 backdrop-blur-xs py-2 px-4 rounded-2xl border border-brand-beige shadow-md text-right">
                  <span className="text-sm sm:text-base font-bold text-brand-orange block">
                    מרחב של הקשבה, חיבור וצמיחה
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          2. אזור המוצרים בקוביות קומפקטיות ומאוזנות
      ========================================================================= */}
      <section id="programs-section" className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-b border-brand-beige/80 relative overflow-hidden">
        {/* Floating Butterflies: Placed safely in outer corners so they never cover text */}
        <ButterflyIcon size={65} className="absolute top-4 right-3 sm:top-8 sm:right-8 opacity-35 animate-float pointer-events-none select-none z-0" />
        <ButterflyIcon size={55} className="absolute bottom-4 left-3 sm:bottom-8 sm:left-8 opacity-30 animate-drift pointer-events-none select-none z-0" />

        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Section Heading - Centered for Mobile and Desktop with solid badge */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-brand-green text-white rounded-full text-xs sm:text-sm font-black mb-2.5 tracking-tight shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span>הבית של בין לבין</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-green tracking-tight mb-2">
              התוכניות והריטריטים שלנו
            </h2>
            <p className="text-sm sm:text-base text-gray-700 font-bold max-w-xl mx-auto leading-relaxed px-2">
              כל תוכנית פוגשת צורך אחר ומציעה דרך ייחודית לעבור תהליך, ללמוד ולהתחבר
            </p>
            <div className="h-1 w-16 bg-brand-orange mx-auto mt-3 rounded-full opacity-60"></div>

            {/* Winter Cohorts Announcement Bar - Delicate & Refined */}
            <div className="mt-6 max-w-2xl mx-auto bg-gradient-to-r from-brand-cream via-white to-brand-cream border-2 border-brand-orange/30 rounded-2xl p-4 sm:p-5 shadow-xs text-center">
              <div className="inline-flex items-center gap-2 text-brand-orange font-black text-sm sm:text-base mb-1">
                <span className="text-lg">❄️</span>
                <span>החורף נפגשות בין לבין</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">
                מחזורים חדשים של <span className="text-brand-orange font-black">אמצע החיים (<span dir="ltr">45-60</span>)</span> ושל <span className="text-[#b23a5f] font-black">עוד לפנייך (60+)</span> נפתחים בקרוב!
              </p>
              <div className="mt-2 text-xs text-gray-500 font-medium">
                רוצה להבטיח מקום? לחצי על התוכנית לפרטים או השאירי פרטים בטופס בתחתית העמוד.
              </div>
            </div>
          </div>

          {/* Cards Grid: 6 Distinct Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {ALL_PROGRAMS.map((prog) => {
              const IconComponent = prog.icon;
              return (
                <div
                  key={prog.id}
                  id={`program-${prog.id}`}
                  className={`${prog.cardBg} rounded-3xl p-6 sm:p-7 ${prog.borderStyle} border-2 hover:-translate-y-1 transition-all duration-300 flex flex-col text-right group relative overflow-hidden shadow-sm hover:shadow-xl scroll-mt-24`}
                >
                  {/* Colored top accent bar for instant card visual identity */}
                  <div className={`h-2 w-full ${prog.accentBar} absolute top-0 right-0 left-0`}></div>

                  {/* Top Badges Area: Flagship ribbon & Winter Cohort badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-3.5">
                    {prog.isFlagship && (
                      <div className="inline-flex items-center gap-1.5 bg-brand-orange text-white px-3.5 py-1 rounded-full text-xs sm:text-sm font-black shadow-xs tracking-wide">
                        <Crown className="w-3.5 h-3.5 fill-current" />
                        <span>סדנת הדגל של בין לבין</span>
                      </div>
                    )}
                    {prog.winterBadge && (
                      <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-lg tracking-wide border-2 border-indigo-200 animate-badge-blink">
                        <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping shrink-0" />
                        <span>{prog.winterBadgeText || 'מחזור חורף נפתח בקרוב'}</span>
                      </div>
                    )}
                  </div>

                  {/* Top Row: Delicate Icon / Custom Logo & Category Badge */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    {prog.logoUrl ? (
                      <div 
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white p-1.5 border-2 shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 overflow-hidden"
                        style={{
                          borderColor: getProgramBorderColor(prog.id)
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
                      <div className={`w-16 h-16 rounded-2xl ${prog.iconBoxStyle} flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                    )}
                    
                    {prog.categoryNode && (
                      <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-black tracking-tight ${prog.badgeStyle}`}>
                        {prog.categoryNode}
                      </span>
                    )}
                  </div>

                  {/* Program Name */}
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-brand-orange transition-colors tracking-tight mb-2 text-center sm:text-right">
                    {prog.name}
                  </h3>

                  {/* Single Short Essence / Tagline */}
                  <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed mb-6 flex-1 text-right">
                    {prog.tagline}
                  </p>

                  {/* Action Button to Enter the Program Page */}
                  <div className="pt-4 border-t border-brand-beige/80 mt-auto">
                    <Link
                      to={prog.link}
                      className={`w-full inline-flex items-center justify-between ${prog.buttonStyle} px-5 py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg font-black transition-all duration-300 group/btn shadow-xs hover:shadow-md active:scale-98`}
                    >
                      <span>לפרטים על התוכנית</span>
                      <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover/btn:-translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>


        </div>
      </section>

      {/* =========================================================================
          גלריית תמונות בגלילה צידית מתוך התוכניות והריטריטים
      ========================================================================= */}
      <BrandGallerySlider />

      {/* =========================================================================
          3. קצת עלינו
      ========================================================================= */}
      <section id="team" className="py-16 sm:py-24 px-4 sm:px-6 bg-brand-cream border-b border-brand-beige/80 relative overflow-hidden text-right scroll-mt-20">
        {/* Floating Butterflies: Placed in outer margins to ensure text is never covered */}
        <ButterflyIcon size={65} className="absolute top-6 left-3 sm:top-10 sm:left-10 opacity-35 animate-drift pointer-events-none select-none z-0" />
        <ButterflyIcon size={55} className="absolute bottom-6 right-3 sm:bottom-10 sm:right-12 opacity-30 animate-float pointer-events-none select-none z-0" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-brand-green tracking-tight mb-3">
              קצת עלינו
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-bold max-w-xl mx-auto leading-relaxed px-2">
              הצוות שמאחורי התוכניות, הסדנאות והריטריטים של בין לבין
            </p>
            <div className="h-1.5 w-24 bg-brand-orange mx-auto mt-4 rounded-full opacity-60"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 max-w-4xl mx-auto">
            {/* דלית כורה - כרטיס ירוק מותג מובחן */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-md border-2 border-brand-green/30 border-t-8 border-t-brand-green hover:shadow-lg transition-all duration-300 flex flex-col text-right">
              <div className="mb-4 text-center flex flex-col items-center">
                {/* תמונה עגולה של דלית - ממורכזת למעלה ללא חיתוך הפנים */}
                <div className="relative mb-4">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-lg ring-4 ring-brand-green/25 bg-brand-cream">
                    <img 
                      src={DALIT_PHOTO_URL} 
                      alt="דלית כורה - בין לבין" 
                      className="w-full h-full object-cover object-[center_20%]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-brand-green mb-2 text-center">
                  דלית כורה
                </h3>
                <div className="inline-block px-4 py-1.5 bg-white text-brand-green font-black text-base rounded-full border border-brand-green/20 shadow-xs">
                  הוגה ומובילת התוכניות
                </div>
              </div>
              <div className="w-16 h-1 bg-brand-orange mb-6 rounded-full mx-auto"></div>
              
              <div className="space-y-4 text-gray-700 leading-[1.8] text-lg sm:text-xl font-normal">
                <p>
                  מתמחה בהובלת פרויקטים, בפיתוח תוכניות ובתרגום רעיונות לתהליכים יישומיים, מדויקים וברורים. לאורך השנים צברה ניסיון בהובלת קהילות נשים, בפיתוח תוכן ובהפקת תוכניות ואירועים, מתוך היכרות עמוקה עם הדרך שבה תוכן, שיח וחוויה מתחברים לתהליך שלם.
                </p>
                <p className="font-bold text-brand-green text-center text-lg sm:text-xl">
                  ב&quot;בין לבין&quot; דלית מחזיקה את התמונה הגדולה ואת הפרטים הקטנים, ומובילה את התוכניות משלב הרעיון, דרך הפיתוח והדיוק ועד למימוש.
                </p>
              </div>
            </div>

            {/* אלסי זיסלמן - כרטיס כתום מותג מובחן */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-md border-2 border-brand-orange/30 border-t-8 border-t-brand-orange hover:shadow-lg transition-all duration-300 flex flex-col text-right">
              <div className="mb-4 text-center flex flex-col items-center">
                {/* תמונה עגולה של אלסי */}
                <div className="relative mb-4">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-lg ring-4 ring-brand-orange/25 bg-brand-cream">
                    <img 
                      src={ELSIE_PHOTO_URL} 
                      alt="אלסי זיסלמן - בין לבין" 
                      className="w-full h-full object-cover object-[center_25%]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-brand-green mb-2 text-center">
                  אלסי זיסלמן
                </h3>
                <div className="inline-block px-4 py-1.5 bg-white text-brand-orange font-black text-base rounded-full border border-brand-orange/20 shadow-xs">
                  מנחה ומרצה, טריינרית NLP
                </div>
              </div>
              <div className="w-16 h-1 bg-brand-green mb-6 rounded-full mx-auto"></div>
              
              <div className="space-y-4 text-gray-700 leading-[1.8] text-lg sm:text-xl font-normal">
                <p>
                  מלווה תהליכים אישיים וקבוצתיים של שינוי, התבוננות וקבלת החלטות. בעלת ניסיון בהנחיית קבוצות ובעבודה עם נשים, ומביאה לתוכניות כלים מעולם ה־NLP לצד יכולת להוביל שיח שמאפשר להתבונן, לדייק ולנוע קדימה.
                </p>
                <p className="font-bold text-brand-green text-center text-lg sm:text-xl">
                  ב&quot;בין לבין&quot; אלסי מובילה את תהליכי ההתבוננות והשיח, ומסייעת לנשים לתרגם תובנות לבחירות ולצעדים מעשיים.
                </p>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* =========================================================================
          4. "מכאן, אפשר פשוט לדבר" ואחריו כפתורי צרי קשר
      ========================================================================= */}
      <section id="contact" className="bg-white py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden scroll-mt-20">
        {/* Floating Butterflies: Placed in outer margins to ensure text is never covered */}
        <ButterflyIcon size={65} className="absolute top-6 right-3 sm:top-10 sm:right-10 opacity-35 animate-float pointer-events-none select-none z-0" />
        <ButterflyIcon size={55} className="absolute bottom-6 left-3 sm:bottom-10 sm:left-10 opacity-30 animate-drift pointer-events-none select-none z-0" />

        <div className="max-w-3xl mx-auto relative z-10 text-right">
          
          {/* בלוק "מכאן, אפשר פשוט לדבר" */}
          <div className="bg-brand-cream p-7 sm:p-10 rounded-3xl border-2 border-brand-beige shadow-sm mb-10 sm:mb-12">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 bg-brand-orange text-white px-5 py-2 rounded-full text-sm font-black mb-4 tracking-tight shadow-xs">
                <Sparkles className="w-4 h-4 text-white" />
                <span>החיבור מתחיל בשיחה</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-brand-green mb-6 tracking-tight text-center">
              בואי נדבר בין לבין
            </h2>

            <div className="space-y-5 text-xl sm:text-2xl text-gray-800 leading-[1.8] font-normal text-right max-w-2xl mx-auto">
              <p>
                הגעת לכאן כי משהו סיקרן או נגע בך.
                <br />
                יכול להיות שאת מחפשת משהו לעצמך, לקבוצה, לקהילה או לארגון.
              </p>

              <p>
                כך או כך, נשמח להכיר, לשמוע מה את מחפשת ולבדוק איזה מרחב מתאים
              </p>

              <p>
                את יכולה להצטרף לאחד המרחבים שאנחנו פותחות לאורך השנה, או לפנות אלינו כדי שניצור יחד מרחב שמתאים לקבוצה.
              </p>

              <p className="font-black text-brand-green pt-3 text-center text-2xl sm:text-3xl border-t-2 border-brand-beige/80">
                אז באיזה מרחב ניפגש ?
              </p>
            </div>
          </div>

          {/* טופס התעניינות */}
          <div className="mb-14">
            <InterestForm
              id="interest-form"
              source="דף מרחבים לנשים (ראשי)"
              title="טופס התעניינות"
              subtitle="השאירי פרטים, סמני את המרחבים שמעניינים אותך ונשמח לחזור אלייך בהקדם"
            />
          </div>

          {/* אפשרות לשיחה ישירה בוואטסאפ */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-green/10 text-brand-green text-base sm:text-lg font-bold">
              <span>או מוזמנת לכתוב לנו ישירות בוואטסאפ:</span>
            </div>
          </div>

          {/* כפתורי צרי קשר (ישירות, ללא כותרת נוספת) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-10 max-w-xl mx-auto text-center">
            
            {/* דלית כורה */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border-2 border-brand-green/30 border-t-8 border-t-brand-green shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="mb-6">
                <div className="font-black text-2xl sm:text-3xl text-brand-green">
                  דלית כורה
                </div>
              </div>
              
              <a
                href={dalitWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full py-4 sm:py-5 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 hover:text-black font-black text-lg sm:text-xl border-2 border-slate-300 hover:border-slate-400 shadow-sm hover:shadow-md transition-all active:scale-98 group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center text-emerald-600 transition-colors">
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                </div>
                <span>אשמח לשוחח</span>
              </a>
            </div>

            {/* אלסי זיסלמן */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border-2 border-brand-orange/30 border-t-8 border-t-brand-orange shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="mb-6">
                <div className="font-black text-2xl sm:text-3xl text-brand-green">
                  אלסי זיסלמן
                </div>
              </div>
              
              <a
                href={elsieWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full py-4 sm:py-5 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 hover:text-black font-black text-lg sm:text-xl border-2 border-slate-300 hover:border-slate-400 shadow-sm hover:shadow-md transition-all active:scale-98 group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center text-emerald-600 transition-colors">
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                </div>
                <span>אשמח לשוחח</span>
              </a>
            </div>

          </div>

          {/* לחצן הזמיני חברה בתחתית הדף */}
          <div className="mt-8 mb-6 flex justify-center">
            <button
              onClick={handleShare}
              aria-label="הזמיני חברה"
              className="inline-flex items-center justify-center gap-3 bg-white hover:bg-brand-cream text-brand-green hover:text-brand-orange px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-black border-2 border-brand-green/30 hover:border-brand-orange transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95 group"
            >
              <div className="w-8 h-8 rounded-full bg-brand-orange/15 group-hover:bg-brand-orange/25 flex items-center justify-center text-brand-orange transition-colors">
                <Share2 className="w-4 h-4" />
              </div>
              <span>הזמיני חברה</span>
            </button>
          </div>

          {/* סיום הדף / זכויות יוצרים - נוסח מבוקש בדיוק */}
          <div className="mt-12 pt-8 border-t border-brand-beige/80 text-sm sm:text-base text-gray-700 font-medium text-center space-y-1">
            <p className="font-extrabold text-brand-green text-base sm:text-lg">
              2026 בין לבין | מרחבים לנשים
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              כל הזכויות שמורות
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/responses?code=9672"
                title="כניסת צוות לניהול פניות מתעניינות"
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-green font-bold transition-colors py-1.5 px-3.5 rounded-full bg-white/80 hover:bg-white border border-brand-beige shadow-xs active:scale-95"
              >
                <Lock className="w-3.5 h-3.5 text-brand-orange" />
                <span>כניסת צוות | ניהול פניות מהאתר</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="חזרה לראש הדף"
          className="fixed bottom-6 left-6 z-40 bg-white hover:bg-brand-green text-brand-green hover:text-white p-3 rounded-full shadow-lg border border-brand-beige transition-all hover:scale-105 cursor-pointer"
          title="חזרה לראש הדף"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};

export default BrandLandingPage;
