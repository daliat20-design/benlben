import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Dumbbell, 
  Clock, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Share2, 
  Menu,
  X,
  Compass,
  Star,
  Quote,
  Heart,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { ButterflyIcon } from '../components/Hero';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { BrandGallerySlider } from '../components/BrandGallerySlider';
import { SoulRegistrationForm } from '../components/SoulRegistrationForm';
import { LegalModals } from '../components/LegalModals';
import { SPEAKERS, TEAM } from '../constants';

const PAYBOX_URL = 'https://links.payboxapp.com/IxnnnpXV67b';
const SOUL_DATES = ['9.1.27', '16.1.27', '23.1.27', '30.1.27'];

const SOUL_SPEAKER_ORDER = ['מיה קדוש', 'יעל ינאי אלי', 'טליה גולן', 'חגית בן ארי'];
const SOUL_SPEAKERS = [
  ...SOUL_SPEAKER_ORDER
    .map((name) => SPEAKERS.find((s) => s.name === name))
    .filter((s): s is (typeof SPEAKERS)[number] => Boolean(s)),
  ...SPEAKERS.filter((s) => !SOUL_SPEAKER_ORDER.includes(s.name)),
];

interface SoulSessionItem {
  id: string;
  theme?: string;
  leadingValue: string;
  title: string;
  subtitle?: string;
  description?: string;
  introParagraphs?: string[];
  bulletsTitle?: string;
  bullets?: string[];
  closingParagraphs?: string[];
  badgeColor: string;
  cardBorder: string;
  iconBg: string;
}

// 4 Sessions Tailored for Fitness Gym Trainees (Ages 40-55)
const SOUL_SESSIONS: SoulSessionItem[] = [
  {
    id: 'change',
    theme: 'תסמינים ושינויים בגיל המעבר',
    leadingValue: 'קבלה',
    title: 'כשזה מתחיל להשתנות',
    subtitle: 'תסמינים בגיל המעבר (גם אם את לא יודעת) הם כבר שם',
    description: 'את מתאמנת, אוכלת נכון ומשקיעה בגוף – אבל פתאום השינה משתבשת, מצב הרוח קופץ, רמות האנרגיה משתנות ומשקל הגוף מתנהג אחרת. במפגש נצלול לעומק השינויים ההורמונליים והפיזיים, ננפץ מיתוסים ונבין איך לזהות את הסימנים המוקדמים בגילאי \u200E40-55\u200E עוד לפני שהם הופכים למשבר.',
    badgeColor: 'bg-[#0E7490] text-white',
    cardBorder: 'border-[#0E7490]/30',
    iconBg: 'bg-[#0E7490]/10 text-[#0E7490]'
  },
  {
    id: 'breath',
    leadingValue: 'שחרור ואיזון',
    title: 'לוקחות אוויר',
    introParagraphs: [
      'אנחנו נושמות כל הזמן, אבל כמה מאיתנו באמת עוצרות לשים לב לאופן שבו אנחנו נושמות?',
      'במפגש חווייתי נגלה איך הנשימה משפיעה על הגוף, על התחושות שלנו ועל איכות החיים ביומיום.'
    ],
    bulletsTitle: 'נכיר טכניקות נשימה פשוטות שיכולות לסייע לנו:',
    bullets: [
      'להירגע ולהפחית מתח',
      'לשפר את איכות השינה',
      'לווסת את הגוף במצבי לחץ',
      'למצוא רגעים של איזון ובהירות במהלך היום'
    ],
    closingParagraphs: [
      'נתנסה בתרגילי נשימה ונחווה טעימה קצרה של נשימה מעגלית בליווי מוזיקה והנחיה, שתאפשר לנו לעצור, להרפות ולהתחבר לגוף.',
      'נשלב גם תנועה וריקוד חופשי, קצת מוזיקה והרבה מקום לשחרר.',
      'לא צריך ניסיון קודם. רק לבוא ולנשום.'
    ],
    badgeColor: 'bg-[#C56B3E] text-white',
    cardBorder: 'border-[#C56B3E]/30',
    iconBg: 'bg-[#C56B3E]/10 text-[#C56B3E]'
  },
  {
    id: 'intimacy',
    theme: 'זוגיות ואינטימיות',
    leadingValue: 'קרבה',
    title: 'מגע מרחק ומה שביניהם',
    subtitle: 'זוגיות, תשוקה ואינטימיות מחודשת כשהשנים עוברות',
    description: 'איך השינויים של אמצע החיים פוגשים את הזוגיות והאינטימיות? מפגש פתוח, רגיש ואמיץ על החשק המיני, השינויים ברגש, תיאום ציפיות מחודש עם בן/בת הזוג, ואיך להפוך את השלב הזה בחיים להזדמנות של קרבה עמוקה, קבלה עצמית וחיבור חדש.',
    badgeColor: 'bg-[#0E7490] text-white',
    cardBorder: 'border-[#0E7490]/30',
    iconBg: 'bg-[#0E7490]/10 text-[#0E7490]'
  },
  {
    id: 'trust',
    theme: 'משפחה וזהות עצמית',
    leadingValue: 'אמון',
    title: 'בין חיבוק לשחרור',
    subtitle: 'המשפחה, הבחירה והזמן שאת מחזירה לעצמך',
    description: 'הילדים גדלים, המשפחה בתנועה, והעומס היומיומי של קריירה ובית שואב אותנו בלי הפסקה. במפגש הסיום נעצור להתבונן בך – איפה את נמצאת בתוך כל המשוואה הזו? איך מפנים מקום אמיתי לרצונות שלך, מנהלים את האנרגיה מול המשפחה, ומגלים את הפרק הבא שלך מתוך אמון, שמחה, בהירות ועוצמה.',
    badgeColor: 'bg-[#C56B3E] text-white',
    cardBorder: 'border-[#C56B3E]/30',
    iconBg: 'bg-[#C56B3E]/10 text-[#C56B3E]'
  }
];

// Authentic Testimonials from Midlife Workshop participants
const SOUL_TESTIMONIALS = [
  {
    id: '1',
    quote: "לקחתי איתי את האהבה, מאור הפנים, החברויות החדשות, התכנים והידע, ובעיקר את הרצון להמשיך ולממש את היכולות שלי וליהנות מהדרך.",
    author: "ענבל ס'",
    program: "סדנת אמצע החיים",
    programColor: "bg-[#0E7490]/10 text-[#0E7490] border-[#0E7490]/30"
  },
  {
    id: '2',
    quote: "הסדנה הייתה מעשירה, מעניינת, מחברת ומלאת ידע. המרצות היו מרתקות ומחוברות לגיל ולמצב, והמנחות פשוט מקסימות ומעוררות השראה.",
    author: "לימור",
    program: "סדנת אמצע החיים",
    programColor: "bg-[#C56B3E]/10 text-[#C56B3E] border-[#C56B3E]/30"
  },
  {
    id: '3',
    quote: "סדנה מושקעת, חווייתית ומוצלחת שהשאירה טעם של עוד. חברותא מעולה וצוות מדהים שפותח את הלב ונותן מקום אמיתי לכל אחת.",
    author: "איילת",
    program: "סדנת הדגל",
    programColor: "bg-[#0E7490]/10 text-[#0E7490] border-[#0E7490]/30"
  },
  {
    id: '4',
    quote: "למדתי שאני לא לבד בתהליך הזה. פגשתי נשים מקסימות וחמות, חיכיתי בכל פעם מחדש למפגש הבא. קיבלתי עוגנים ומשמעות עמוקה.",
    author: "ענת י'",
    program: "סדנת אמצע החיים",
    programColor: "bg-[#C56B3E]/10 text-[#C56B3E] border-[#C56B3E]/30"
  },
  {
    id: '5',
    quote: "ההשקעה הורגשה בכל התחומים: המיקום הנעים, הכיבוד המפנק, הנושאים הכי רלוונטיים וההרצאות המצוינות. מקום בטוח, מקצועי ומאפשר.",
    author: "משתתפת בסדנה",
    program: "סדנת אמצע החיים",
    programColor: "bg-[#0E7490]/10 text-[#0E7490] border-[#0E7490]/30"
  },
  {
    id: '6',
    quote: "המרחב שדלית ואלסי יצרו אפשר לי לנשום באמת, לשחרר את העומס של היומיום ולחזור לעצמי עם אנרגיות חדשות, שקט פנימי וחיבור עמוק.",
    author: "שרון ק'",
    program: "מרחבי בין לבין",
    programColor: "bg-[#C56B3E]/10 text-[#C56B3E] border-[#C56B3E]/30"
  }
];

export const SoulTrainingPage: React.FC = () => {
  // Mobile & In-Page Dropdown Navigation
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sessions Tabbed Window State
  const [activeSessionIdx, setActiveSessionIdx] = useState(0);
  const sessionTouchStartXRef = useRef<number | null>(null);

  // Speakers Carousel Gallery State
  const [activeSpeakerIdx, setActiveSpeakerIdx] = useState(0);
  const [expandedBios, setExpandedBios] = useState<Record<number, boolean>>({});
  const touchStartXRef = useRef<number | null>(null);

  // Testimonials Carousel State
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const testTouchStartXRef = useRef<number | null>(null);

  // Legal modal state
  const [activeLegalModal, setActiveLegalModal] = useState<'terms' | 'privacy' | null>(null);

  const toggleSpeakerBio = (idx: number) => {
    setExpandedBios(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const nextSession = () => {
    setActiveSessionIdx(prev => (prev === SOUL_SESSIONS.length - 1 ? 0 : prev + 1));
  };

  const prevSession = () => {
    setActiveSessionIdx(prev => (prev === 0 ? SOUL_SESSIONS.length - 1 : prev - 1));
  };

  const nextSpeaker = () => {
    setActiveSpeakerIdx(prev => (prev === SOUL_SPEAKERS.length - 1 ? 0 : prev + 1));
  };

  const prevSpeaker = () => {
    setActiveSpeakerIdx(prev => (prev === 0 ? SOUL_SPEAKERS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveTestimonialIdx(prev => (prev === SOUL_TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx(prev => (prev === 0 ? SOUL_TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleSessionTouchStart = (e: React.TouchEvent) => {
    sessionTouchStartXRef.current = e.touches[0].clientX;
  };

  const handleSessionTouchEnd = (e: React.TouchEvent) => {
    if (sessionTouchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - sessionTouchStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        prevSession();
      } else {
        nextSession();
      }
    }
    sessionTouchStartXRef.current = null;
  };

  const handleSpeakerTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleSpeakerTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        prevSpeaker();
      } else {
        nextSpeaker();
      }
    }
    touchStartXRef.current = null;
  };

  const handleTestTouchStart = (e: React.TouchEvent) => {
    testTouchStartXRef.current = e.touches[0].clientX;
  };

  const handleTestTouchEnd = (e: React.TouchEvent) => {
    if (testTouchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - testTouchStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        prevTestimonial();
      } else {
        nextTestimonial();
      }
    }
    testTouchStartXRef.current = null;
  };

  useEffect(() => {
    document.title = "אמצע החיים - אימון לנשמה | בשיתוף הסטודיו של רעות | בין לבין";
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    
    // Ensure mobile browser bar (Android/WhatsApp) is white and seamless
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', '#ffffff');
    }
  }, []);

  const whatsappMessage = encodeURIComponent(
    "היי דלית ואלסי, קראתי על סדנת 'אמצע החיים - אימון לנשמה' בשיתוף הסטודיו של רעות ואשמח לשמוע פרטים נוספים!"
  );
  const whatsappUrl = `https://wa.me/972508353731?text=${whatsappMessage}`;

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "אמצע החיים - אימון לנשמה | בשיתוף הסטודיו של רעות",
          text: "את משקיעה באימון לגוף כל השנה – מתי השקעת באימון לנפש? סדנה בת 4 מפגשים לנשים \u200E40-55\u200E מבית בין לבין.",
          url,
        });
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('הקישור הועתק ללוח!');
    }
  };

  const navMenuItems = [
    { label: 'על הסדנה', id: 'about' },
    { label: '4 המפגשים', id: 'soul-sessions' },
    { label: 'נבחרת המרצות', id: 'speakers' },
    { label: 'גלריית תמונות', id: 'gallery' },
    { label: 'דלית ואלסי', id: 'team' },
    { label: 'מה אומרות המשתתפות', id: 'testimonials' },
    { label: 'מחיר ומועדים', id: 'pricing-dates' },
    { label: 'הרשמה ותשלום', id: 'soul-interest', isHighlight: true },
  ];

  const currentSpeaker = SOUL_SPEAKERS[activeSpeakerIdx];
  const isCurrentBioExpanded = !!expandedBios[activeSpeakerIdx];
  const cleanCurrentBio = currentSpeaker ? currentSpeaker.bio.replace(/<[^>]+>/g, '') : '';
  const isCurrentBioLong = cleanCurrentBio.length > 150;

  const currentTestimonial = SOUL_TESTIMONIALS[activeTestimonialIdx];

  return (
    <div className="min-h-screen font-sans selection:bg-[#0E7490]/20 selection:text-[#083344] bg-[#F8FAFC] text-slate-800 overflow-x-clip" dir="rtl">
      
      {/* 1. TOP STICKY NAVBAR - Clean title without "בשיתוף מכון הכושר..." */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#0E7490]/20 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-3">
          
          {/* Logos & Clean Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex items-center -space-x-2 space-x-reverse shrink-0">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white p-1 border-2 border-[#54634f]/40 shadow-xs flex items-center justify-center relative z-10">
                <img
                  src="/logos/brand-main.webp"
                  alt="לוגו בין לבין"
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.src.endsWith('/logos/brand-main.png')) {
                      target.src = '/logos/brand-main.png';
                    }
                  }}
                />
              </div>
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white p-1 border-2 border-[#0E7490]/30 shadow-xs flex items-center justify-center">
                <img
                  src="/logos/midlife.webp"
                  alt="לוגו אמצע החיים"
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/logos/midlife.png';
                  }}
                />
              </div>
            </div>
            <div className="text-right">
              {/* Mobile: two distinct stacked lines */}
              <div className="flex flex-col sm:hidden text-right leading-tight">
                <span className="text-xs font-black text-[#0E7490] tracking-tight">אמצע החיים</span>
                <span className="text-[11px] font-black text-[#C56B3E] tracking-tight">אימון לנשמה</span>
              </div>
              {/* Desktop: single line with separator */}
              <div className="hidden sm:flex items-center gap-1.5 text-xl lg:text-2xl font-black text-[#0E7490] tracking-tight whitespace-nowrap">
                <span>אמצע החיים</span>
                <span className="text-[#C56B3E]">✦</span>
                <span className="text-[#C56B3E]">אימון לנשמה</span>
              </div>
            </div>
          </div>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-bold text-slate-600">
            <button onClick={() => scrollToSection('about')} className="hover:text-[#0E7490] transition-colors cursor-pointer">
              על הסדנה
            </button>
            <button onClick={() => scrollToSection('soul-sessions')} className="hover:text-[#0E7490] transition-colors cursor-pointer">
              4 המפגשים
            </button>
            <button onClick={() => scrollToSection('speakers')} className="hover:text-[#0E7490] transition-colors cursor-pointer">
              נבחרת המרצות
            </button>
            <button onClick={() => scrollToSection('gallery')} className="hover:text-[#0E7490] transition-colors cursor-pointer">
              גלריה
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-[#0E7490] transition-colors cursor-pointer">
              המלצות
            </button>
            <button onClick={() => scrollToSection('pricing-dates')} className="hover:text-[#0E7490] transition-colors cursor-pointer">
              מחיר ומועדים
            </button>
          </nav>

          {/* Action Buttons & Dropdown Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Dropdown Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              aria-label="תפריט התמצאות בדף"
              className="p-1.5 sm:px-3 sm:py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-all flex items-center gap-1 cursor-pointer border border-slate-200"
            >
              {isMenuOpen ? <X size={16} className="text-[#0E7490]" /> : <Menu size={16} className="text-[#0E7490]" />}
              <span className="hidden sm:inline">תפריט הדף</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180 text-[#0E7490]' : 'text-slate-400'}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 sm:px-3 sm:py-2 rounded-full bg-[#0E7490]/10 hover:bg-[#0E7490]/20 text-[#0E7490] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              title="שתפי חברה"
              aria-label="שתפי חברה"
            >
              <Share2 size={15} />
              <span className="hidden sm:inline">שתפי חברה</span>
            </button>

            <button
              onClick={() => scrollToSection('soul-interest')}
              className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#0E7490] to-[#0891B2] hover:from-[#0891B2] hover:to-[#0E7490] text-white text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <span className="hidden sm:inline">שמרי לי מקום</span>
              <span className="sm:hidden">שמרי מקום</span>
            </button>
          </div>
        </div>

        {/* Dropdown Menu Panel */}
        {isMenuOpen && (
          <div className="border-t border-[#0E7490]/20 bg-white/98 shadow-xl backdrop-blur-md animate-in slide-in-from-top-3 duration-200">
            <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5 text-[#0E7490]">
                  <Compass size={15} />
                  <span>התמצאות מהירה בדף הסדנה</span>
                </span>
                <span>לחצי למעבר ישיר</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {navMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-right p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${
                      item.isHighlight 
                        ? 'bg-[#0E7490] text-white shadow-xs hover:bg-[#0891B2]' 
                        : 'bg-slate-50 hover:bg-[#0E7490]/10 text-slate-700 hover:text-[#0E7490]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[11px] opacity-70">←</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-10 sm:pt-14 md:pt-18 pb-14 sm:pb-20 md:pb-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#E8F5F7] via-[#F3FAFB] to-[#EAF5F6]/70 border-b border-[#0E7490]/10">
        
        {/* Background Ambience */}
        <ButterflyIcon size={240} className="absolute -top-10 -right-20 opacity-[0.04] text-[#0E7490] pointer-events-none" />
        <ButterflyIcon size={220} className="absolute bottom-10 -left-10 opacity-[0.04] text-[#C56B3E] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Bein Levein Main Brand Logo in Hero */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white p-2.5 border-2 border-[#54634f]/30 shadow-md flex items-center justify-center overflow-hidden">
                <img
                  src="/logos/brand-main.webp"
                  alt="לוגו בין לבין - מרחבים לנשים"
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.src.endsWith('/logos/brand-main.png')) {
                      target.src = '/logos/brand-main.png';
                    }
                  }}
                />
              </div>
              <span className="text-lg sm:text-2xl font-black text-[#54634f] tracking-tight">
                &quot;בין לבין | מרחבים לנשים&quot;
              </span>
            </div>

            {/* Collaboration Tag */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border-2 border-[#0E7490]/30 shadow-xs text-xs sm:text-sm font-black text-[#0E7490]">
              <Dumbbell className="w-4 h-4 text-[#C56B3E]" />
              <span>בשיתוף הסטודיו של רעות</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#C56B3E]">
                נשים בגילאי <span dir="ltr">40-55</span>
              </span>
            </div>

            {/* H1 Heading - Two distinct lines on mobile and desktop */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#0E7490] tracking-tight leading-[1.12]">
              <span className="block">אמצע החיים</span>
              <span className="block text-[#C56B3E] mt-1 sm:mt-2">אימון לנשמה</span>
            </h1>

            {/* Main Punchy Motto */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-[#0E7490]/10 via-[#C56B3E]/10 to-[#0E7490]/10 rounded-3xl border border-[#0E7490]/20 max-w-2xl mx-auto shadow-xs">
              <p className="text-lg sm:text-2xl md:text-3xl font-black text-slate-800 leading-snug">
                את משקיעה באימון לגוף כל השנה – <br />
                <span className="text-[#0E7490] underline decoration-[#C56B3E] decoration-wavy underline-offset-8">
                  מתי השקעת באימון לנפש?
                </span>
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-700 max-w-3xl mx-auto leading-relaxed">
              את כבר יודעת איך לפנות זמן לאימון. הפעם אנחנו מזמינות אותך להקדיש את הזמן הזה לעצמך בדרך קצת אחרת. ארבעה מפגשים שיפתחו שיחה על מה שמשתנה באמצע החיים ועל מה שאת רוצה לתת לו יותר מקום
            </p>

            {/* 4 Pillars Highlights - ONLY the 4 requested items */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 max-w-3xl mx-auto text-center">
              <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-[#0E7490]/30 shadow-xs flex items-center justify-center min-h-[90px] sm:min-h-[105px]">
                <div className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                  תסמינים ושינויים בגיל המעבר
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-[#C56B3E]/35 shadow-xs flex items-center justify-center min-h-[90px] sm:min-h-[105px]">
                <div className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                  נשימה, שחרור ואיזון
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-[#0E7490]/30 shadow-xs flex items-center justify-center min-h-[90px] sm:min-h-[105px]">
                <div className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                  זוגיות ואינטימיות
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-[#C56B3E]/35 shadow-xs flex items-center justify-center min-h-[90px] sm:min-h-[105px]">
                <div className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                  משפחה וזהות עצמית
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION - WHY SOUL TRAINING & 3 UPDATED BENEFIT CARDS */}
      <section id="about" className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-200/80 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-right space-y-8">
          
          <div className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-black text-[#0E7490] tracking-widest uppercase bg-[#0E7490]/10 px-4 py-1.5 rounded-full">
              הרבה יותר מעוד אימון
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              למה דווקא עכשיו, ולמה במכון הכושר?
            </h2>
            <div className="w-16 h-1 bg-[#0E7490] mx-auto rounded-full mt-3"></div>
          </div>

          <div className="bg-[#F8FAFC] p-6 sm:p-9 rounded-3xl border-2 border-[#0E7490]/20 space-y-4 shadow-xs leading-relaxed text-base sm:text-lg text-slate-700">
            <p className="font-bold text-xl sm:text-2xl text-slate-900 leading-snug">
              במכון הכושר את רגילה לחזק את השרירים, להעלות דופק, להזיע, לפרוק מתחים ולשמור על הגוף.
            </p>
            <p>
              אבל בגילאי <span dir="ltr">40-55</span> משהו נוסף מתחיל להתרחש. לפעמים אלו גלי חום קלים, לפעמים יקיצות באמצע הלילה עם דופק מהיר, לפעמים ירידה בלתי מוסברת באנרגיה, ולפעמים שאלות על הזוגיות, על הילדים שמתבגרים ועל המקום שלך בעולם.
            </p>
            <p className="font-bold text-[#0E7490] text-lg sm:text-xl border-t border-slate-200 pt-3">
              אלו אינם סימני חולשה – אלו סימני הדרך של גיל המעבר.
            </p>
            <p>
              והדרך הטובה ביותר לעבור אותם היא בדיוק כמו באימון: עם ידע מקצועי, ליווי מומחיות, כלים פרקטיים וקבוצה של נשים שנמצאות בדיוק באותו המקום.
            </p>
          </div>

          {/* 3 Core Benefits - Exactly as Requested */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            
            {/* Card 1 */}
            <div className="p-6 bg-gradient-to-b from-[#F0FDF4] to-white rounded-2xl border border-[#0E7490]/20 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-[#0E7490]/15 text-[#0E7490] flex items-center justify-center font-black text-xl mb-3">
                ✦
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">ידע מקצועי בשיחה פתוחה</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                בכל מפגש נפגוש מרצה מומחית בתחומה שתשתף ידע בגובה העיניים. יהיה מקום לשאול, לשתף ולהתנסות.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-gradient-to-b from-[#FFF7ED] to-white rounded-2xl border border-[#C56B3E]/20 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-[#C56B3E]/15 text-[#C56B3E] flex items-center justify-center font-black text-xl mb-3">
                ✦
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">כלים מעולם ה־NLP ליומיום</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                בכל מפגש נתרגל כלים שיעזרו לך להגיב אחרת ברגעי עומס ולבחון מחדש מחשבות שמגבילות אותך.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-gradient-to-b from-[#F0F9FF] to-white rounded-2xl border border-[#0E7490]/20 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-[#0E7490]/15 text-[#0E7490] flex items-center justify-center font-black text-xl mb-3">
                ✦
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">להכיר גם מחוץ לאימון</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                הזדמנות להכיר קצת אחרת, לשתף במה שמתאים לך ולשמוע איך נשים אחרות פוגשות את אמצע החיים, באווירה חמה ועם כיבוד קל.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUR SESSIONS DETAILS - SINGLE TABBED SLIDING WINDOW */}
      <section id="soul-sessions" className="py-14 sm:py-22 px-4 sm:px-6 bg-gradient-to-b from-[#FFF7F0] via-[#FCF3EB] to-[#FAF0E6]/80 border-b border-[#C56B3E]/15 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
            <span className="text-xs sm:text-sm font-black text-[#C56B3E] tracking-widest uppercase bg-[#C56B3E]/10 px-4 py-1.5 rounded-full">
              תוכנית המפגשים
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              4 מפגשים מעצימים לאימון הנפש
            </h2>
            <p className="text-sm sm:text-base font-bold text-slate-500">
              בחרי לשונית למעלה או דפדפי לצדדים בין ארבעת המפגשים
            </p>
            <div className="w-16 h-1 bg-[#0E7490] mx-auto rounded-full mt-3"></div>
          </div>

          {/* Top Tabs Bar above the window */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4" role="tablist" aria-label="תוכנית 4 המפגשים">
            {SOUL_SESSIONS.map((session, idx) => {
              const isActive = activeSessionIdx === idx;
              const isTeal = idx % 2 === 0;
              return (
                <button
                  key={session.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveSessionIdx(idx)}
                  className={`p-3 sm:p-4 rounded-2xl border-2 text-right transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                    isActive
                      ? isTeal
                        ? 'bg-[#0E7490] text-white border-[#0E7490] shadow-md -translate-y-0.5'
                        : 'bg-[#C56B3E] text-white border-[#C56B3E] shadow-md -translate-y-0.5'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-[#0E7490]/40 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`text-[11px] font-black uppercase tracking-wide ${
                      isActive ? 'text-white/85' : isTeal ? 'text-[#0E7490]' : 'text-[#C56B3E]'
                    }`}
                  >
                    ערך מוביל: {session.leadingValue}
                  </span>
                  <span className="text-sm sm:text-base font-black leading-snug">
                    {session.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Single Focused Sliding Session Window */}
          {(() => {
            const session = SOUL_SESSIONS[activeSessionIdx];
            if (!session) return null;
            return (
              <div
                key={session.id}
                onTouchStart={handleSessionTouchStart}
                onTouchEnd={handleSessionTouchEnd}
                style={{ touchAction: 'pan-y' }}
                className={`bg-white rounded-3xl p-6 sm:p-9 md:p-10 border-2 ${session.cardBorder} shadow-lg text-right relative overflow-hidden select-none animate-in fade-in duration-300`}
              >
                {/* Top Navigation Header inside window */}
                <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
                  <span className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-black ${session.badgeColor}`}>
                    ערך מוביל: {session.leadingValue}{session.theme ? ` • ${session.theme}` : ''}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={prevSession}
                      aria-label="למפגש הקודם"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 hover:bg-[#0E7490] text-slate-700 hover:text-white border border-slate-200 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
                    >
                      <ChevronRight size={18} />
                    </button>
                    <span className="text-xs font-black text-slate-400 px-1.5">
                      {activeSessionIdx + 1}/{SOUL_SESSIONS.length}
                    </span>
                    <button
                      type="button"
                      onClick={nextSession}
                      aria-label="למפגש הבא"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 hover:bg-[#0E7490] text-slate-700 hover:text-white border border-slate-200 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
                    >
                      <ChevronLeft size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                      {session.title}
                    </h3>
                    {session.subtitle && (
                      <p className="text-base sm:text-xl font-bold text-[#0E7490] mt-1">
                        {session.subtitle}
                      </p>
                    )}
                  </div>

                  {session.description ? (
                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal min-h-[96px]">
                      {session.description}
                    </p>
                  ) : (
                    <div className="space-y-3 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                      {session.introParagraphs?.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}

                      {session.bulletsTitle && (
                        <div className="bg-[#FFF4EB]/60 border-r-4 border-[#C56B3E] rounded-2xl p-4 sm:p-5 space-y-2">
                          <p className="font-bold text-slate-900">{session.bulletsTitle}</p>
                          <ul className="space-y-1.5 pr-4 list-disc marker:text-[#C56B3E] font-medium text-slate-800">
                            {session.bullets?.map((item, bIdx) => (
                              <li key={bIdx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {session.closingParagraphs?.map((para, cIdx) => (
                        <p
                          key={cIdx}
                          className={
                            cIdx === (session.closingParagraphs?.length || 0) - 1
                              ? 'font-bold text-[#0E7490]'
                              : ''
                          }
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                </div>

                {/* Bottom Dots & Mobile Swipe Hint */}
                <div className="pt-6 mt-5 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-center gap-2">
                    {SOUL_SESSIONS.map((s, dotIdx) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveSessionIdx(dotIdx)}
                        aria-label={`עבור למפגש ${dotIdx + 1}`}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          activeSessionIdx === dotIdx
                            ? dotIdx % 2 === 0
                              ? 'w-8 bg-[#0E7490]'
                              : 'w-8 bg-[#C56B3E]'
                            : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex sm:hidden items-center justify-center gap-2 text-[11px] text-slate-400 font-bold">
                    <ChevronRight className="w-3.5 h-3.5 text-[#0E7490]" />
                    <span>החליקי ימינה או שמאלה למעבר בין המפגשים</span>
                    <ChevronLeft className="w-3.5 h-3.5 text-[#0E7490]" />
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* 5. SPEAKERS & EXPERTS - FOCUSED GALLERY WINDOW */}
      <section id="speakers" className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-200/80 scroll-mt-20">
        <div className="max-w-5xl mx-auto text-right">
          
          {/* Headings & Subtitle Kept as Requested */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-block px-5 sm:px-6 py-1.5 sm:py-2 bg-[#0E7490]/10 text-[#0E7490] rounded-full text-xs sm:text-sm font-black mb-2 tracking-tight border border-[#0E7490]/30">
              נבחרת מרצות הבית של בין לבין
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              נבחרת מרצות הבית
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-base sm:text-xl md:text-2xl font-bold leading-relaxed text-center">
              צוות המומחיות ומרצות הבית שלנו מלווה את הסדנאות בידע, ניסיון וכלים לדרך. הרכב המרצות בכל מחזור נקבע ומתעדכן בהתאם לתכני המחזור, לזמינות ולצרכי הקבוצה.
            </p>
            <div className="w-16 h-1 bg-[#0E7490] mx-auto rounded-full mt-4"></div>
          </div>

          {/* Focused Carousel Gallery Window (Small tabs deleted as requested) */}
          {currentSpeaker && (
            <div 
              onTouchStart={handleSpeakerTouchStart}
              onTouchEnd={handleSpeakerTouchEnd}
              style={{ touchAction: 'pan-y' }}
              className="bg-gradient-to-b from-[#F0FDF4]/70 via-white to-white rounded-3xl p-6 sm:p-9 border-2 border-[#0E7490]/30 shadow-lg relative select-none animate-in fade-in duration-300"
            >
              {/* Window Navigation Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-[#0E7490]/10 text-[#0E7490]">
                  מרצה {activeSpeakerIdx + 1} מתוך {SOUL_SPEAKERS.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSpeaker}
                    aria-label="למרצה הקודמת"
                    className="w-10 h-10 rounded-full bg-white hover:bg-[#0E7490] text-slate-700 hover:text-white border border-slate-200 shadow-xs flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={nextSpeaker}
                    aria-label="למרצה הבאה"
                    className="w-10 h-10 rounded-full bg-white hover:bg-[#0E7490] text-slate-700 hover:text-white border border-slate-200 shadow-xs flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>
                </div>
              </div>

              {/* Speaker Content in 2 Columns on Tablet/Desktop, Stacked on Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Photo Column */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="w-full max-w-[260px] aspect-[4/4.2] rounded-3xl overflow-hidden bg-slate-100 border-2 border-white shadow-md">
                    {currentSpeaker.image ? (
                      <img 
                        src={currentSpeaker.image} 
                        alt={currentSpeaker.name} 
                        className="w-full h-full object-cover"
                        style={{ objectPosition: currentSpeaker.imagePosition || 'top' }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-black text-[#0E7490]">
                        {currentSpeaker.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Details Column */}
                <div className="md:col-span-8 space-y-3 text-right">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {currentSpeaker.name}
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-[#0E7490] mt-1 leading-snug">
                      {currentSpeaker.title}
                    </p>
                  </div>

                  <p className={`text-sm sm:text-base text-slate-700 leading-relaxed font-normal whitespace-pre-line ${isCurrentBioExpanded ? '' : 'line-clamp-4'}`}>
                    {cleanCurrentBio}
                  </p>

                  {isCurrentBioLong && (
                    <button
                      type="button"
                      onClick={() => toggleSpeakerBio(activeSpeakerIdx)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0E7490]/10 hover:bg-[#0E7490]/20 text-[#0E7490] text-xs sm:text-sm font-black transition-all cursor-pointer mt-1"
                    >
                      <span>{isCurrentBioExpanded ? 'הסתר מידע נוסף' : 'קראי עוד על המרצה...'}</span>
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isCurrentBioExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              </div>

              {/* Dots indicator at bottom */}
              <div className="flex items-center justify-center gap-2 pt-6 mt-4 border-t border-slate-100">
                {SOUL_SPEAKERS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveSpeakerIdx(dotIdx)}
                    aria-label={`עבור למרצה ${dotIdx + 1}`}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      activeSpeakerIdx === dotIdx ? 'w-8 bg-[#0E7490]' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 6. AUTHENTIC PHOTO GALLERY WINDOW (BELOW SPEAKERS) */}
      <BrandGallerySlider title="טעימה מהסדנאות והריטריטים שלנו" />

      {/* 7. FOUNDERS TEAM (DALIT & ELSIE) */}
      <section id="team" className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#ECF6F7] via-[#F3FAFB] to-[#E8F4F5] border-t border-[#0E7490]/15 scroll-mt-20">
        <div className="max-w-5xl mx-auto text-right">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs sm:text-sm font-black text-[#C56B3E] tracking-widest uppercase bg-[#C56B3E]/10 px-4 py-1.5 rounded-full">
              מובילות התוכנית
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              נעים להכיר, דלית ואלסי
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              שותפות מייסדות של "בין לבין | מרחבים לנשים"
            </p>
            <div className="w-16 h-1 bg-[#0E7490] mx-auto rounded-full mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TEAM.map((member, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {member.image && (
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-slate-100">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                        style={{ 
                          // Elsie is idx 1 on left in RTL: raise photo so she's positioned higher
                          objectPosition: idx === 1 ? 'center 2%' : (member.imagePosition || 'center 12%') 
                        }}
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <div className="text-xs font-bold text-[#0E7490] mb-3">
                    {member.role}
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS - WOMEN SHARE FROM THE HEART IN A FOCUSED WINDOW (BEFORE REGISTRATION) */}
      <section id="testimonials" className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#FFF9F3] via-[#FDF5EC] to-[#FFF8F0] border-t border-[#C56B3E]/15 relative overflow-hidden scroll-mt-20">
        <div className="max-w-4xl mx-auto relative text-right">
          
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#C56B3E]/15 text-[#C56B3E] rounded-full text-xs sm:text-sm font-black mb-1">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>מילים מהלב • נשים מספרות</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              ממליצות עלינו באהבה
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
              רשמים וחוויות מהלב מתוך סדנת אמצע החיים והמפגשים של "בין לבין":
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-[#0E7490] to-[#C56B3E] mx-auto rounded-full mt-3"></div>
          </div>

          {/* Testimonial Single Focused Window */}
          {currentTestimonial && (
            <div className="max-w-2xl mx-auto">
              <div 
                onTouchStart={handleTestTouchStart}
                onTouchEnd={handleTestTouchEnd}
                style={{ touchAction: 'pan-y' }}
                className="bg-white rounded-3xl p-6 sm:p-9 border-2 border-[#0E7490]/25 shadow-lg text-right relative flex flex-col justify-between min-h-[250px] sm:min-h-[270px] animate-in fade-in duration-300 select-none"
              >
                <ButterflyIcon size={40} className="absolute top-4 left-4 opacity-10 text-[#0E7490]" />

                {/* Top card bar: Program tag, Stars rating & Arrows */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black px-3 py-1 rounded-full border ${currentTestimonial.programColor}`}>
                      {currentTestimonial.program}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Navigation arrows inside card */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={prevTestimonial}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-[#0E7490] transition-colors cursor-pointer"
                      title="המלצה קודמת"
                      aria-label="המלצה קודמת"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-black text-slate-400 px-1">
                      {activeTestimonialIdx + 1}/{SOUL_TESTIMONIALS.length}
                    </span>
                    <button
                      type="button"
                      onClick={nextTestimonial}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-[#0E7490] transition-colors cursor-pointer"
                      title="המלצה הבאה"
                      aria-label="המלצה הבאה"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Quote body */}
                <div className="mb-6 space-y-2">
                  <Quote className="w-6 h-6 text-[#0E7490]/30 rotate-180" />
                  <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium italic">
                    "{currentTestimonial.quote}"
                  </p>
                </div>

                {/* Participant name */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-bold">משתתפת בסדנה</span>
                  <span className="text-base sm:text-lg font-black text-[#0E7490]">
                    {currentTestimonial.author}
                  </span>
                </div>
              </div>

              {/* Mobile swipe hint */}
              <div className="flex sm:hidden items-center justify-center gap-2 text-[11px] text-slate-400 font-bold mt-3">
                <ChevronRight className="w-3.5 h-3.5 text-[#0E7490]" />
                <span>החליקי ימינה או שמאלה למעבר בין ההמלצות</span>
                <ChevronLeft className="w-3.5 h-3.5 text-[#0E7490]" />
              </div>

              {/* Dots navigation */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {SOUL_TESTIMONIALS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveTestimonialIdx(dotIdx)}
                    aria-label={`עבור להמלצה ${dotIdx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeTestimonialIdx === dotIdx ? 'w-6 bg-[#0E7490]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 8.5 PRICING, WHAT YOU GET, DATES & PAYBOX TERMS GATE */}
      <section id="pricing-dates" className="py-16 sm:py-22 px-4 sm:px-6 bg-gradient-to-b from-[#EEF7F6] via-[#F5FBFA] to-[#E6F4F3] border-t border-[#0E7490]/15 scroll-mt-20">
        <div className="max-w-5xl mx-auto text-right space-y-10">

          {/* Intro & Special Launch Pricing Card */}
          <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 border-2 border-[#C56B3E]/35 shadow-xl relative overflow-hidden">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C56B3E]/10 text-[#C56B3E] text-xs sm:text-sm font-black border border-[#C56B3E]/25">
                <Sparkles className="w-4 h-4" />
                <span>הטבת השקה למחזור הראשון</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                מתחילות משהו חדש ביחד!
              </h2>

              <p className="text-base sm:text-xl font-bold text-slate-700 leading-relaxed">
                ״אימון לנשמה״ יוצאת לדרך בשיתוף פעולה ראשון בין סטודיו רעות ל״בין לבין״, ולכבוד המאורע מחכה לך מחיר מיוחד למחזור הראשון בלבד.
              </p>
            </div>

            {/* Price Highlight + Dates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8 items-stretch">
              {/* Price Box */}
              <div className="md:col-span-6 bg-gradient-to-br from-[#FFF4EB] to-white p-6 sm:p-8 rounded-3xl border-2 border-[#C56B3E]/30 flex flex-col justify-center text-center space-y-3 shadow-xs">
                <span className="text-xs font-black text-[#C56B3E] uppercase tracking-wider">
                  הנחה מיוחדת למחזור הראשון בלבד
                </span>
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-baseline justify-center gap-3">
                    <span
                      className="text-2xl sm:text-3xl font-black text-slate-400 line-through decoration-[2.5px] decoration-[#C56B3E]/85"
                      aria-label="מחיר מקורי 150 שקלים"
                    >
                      150 ש&quot;ח
                    </span>
                    <div className="text-4xl sm:text-5xl font-black text-[#C56B3E]">
                      125 ש&quot;ח <span className="text-lg sm:text-xl font-bold text-slate-700">למפגש</span>
                    </div>
                  </div>
                  <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#C56B3E] text-white text-base sm:text-lg font-black shadow-xs">
                    <span>סה&quot;כ 500 ש&quot;ח</span>
                    <span className="text-xs sm:text-sm font-bold text-white/90 line-through decoration-white/80">
                      600 ש&quot;ח
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white/95">
                      (לכל 4 המפגשים)
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-bold pt-1">
                  בסטודיו של רעות • בקבוצה קטנה ומספר מקומות מוגבל
                </p>
              </div>

              {/* Dates & Hours Box */}
              <div className="md:col-span-6 bg-gradient-to-br from-[#F0FDF4] to-white p-6 sm:p-8 rounded-3xl border-2 border-[#0E7490]/30 flex flex-col justify-between space-y-4 shadow-xs">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#0E7490] font-black text-lg sm:text-xl">
                    <Calendar className="w-5 h-5" />
                    <span>מועדי המפגשים הקרובים</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-base sm:text-lg">
                    <Clock className="w-4 h-4 text-[#C56B3E] shrink-0" />
                    <span>מוצ&quot;ש • בשעות <span dir="ltr" className="font-black text-[#0E7490]">19:00–22:00</span></span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-2.5" dir="ltr">
                  {SOUL_DATES.map((dateStr, i) => (
                    <div
                      key={dateStr}
                      className="bg-white border border-[#0E7490]/25 rounded-2xl px-3 py-2.5 text-center shadow-2xs"
                    >
                      <span className="block text-[10px] font-bold text-slate-400">מפגש {i + 1}</span>
                      <span className="text-base sm:text-lg font-black text-[#0E7490]">{dateStr}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* What You Get Bullets */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-black text-[#0E7490] tracking-tight">
                  אז מה את מקבלת?
                </h3>
                <div className="h-1 w-16 bg-[#C56B3E] mx-auto mt-2.5 rounded-full opacity-80" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#FFF9F4] border border-[#C56B3E]/15">
                  <CheckCircle2 className="w-6 h-6 text-[#C56B3E] shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                    <strong className="font-black text-[#0E7490]">תוכן מקצועי ואיכותי:</strong> 4 מפגשים מעמיקים בני 3 שעות, עם הרצאות בהובלת נשות מקצוע מומחיות בתחומן.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#FFF9F4] border border-[#C56B3E]/15">
                  <CheckCircle2 className="w-6 h-6 text-[#C56B3E] shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                    <strong className="font-black text-[#0E7490]">הנחיה וליווי אישי וקבוצתי:</strong> בהובלת מנחות התוכנית דלית ואלסי, לאורך כל הסדרה.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#FFF9F4] border border-[#C56B3E]/15">
                  <CheckCircle2 className="w-6 h-6 text-[#C56B3E] shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                    <strong className="font-black text-[#0E7490]">הרבה מעבר להרצאות:</strong> התנסויות מעשיות, כלים מעולם ה-NLP, חומרי תוכן וערכת וולקאם אישית ומפנקת.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#FFF9F4] border border-[#C56B3E]/15">
                  <CheckCircle2 className="w-6 h-6 text-[#C56B3E] shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                    <strong className="font-black text-[#0E7490]">חיבור גם בין המפגשים:</strong> קבוצת וואטסאפ ייעודית לשיתוף, העשרה והמשך הקשר.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#FFF9F4] border border-[#C56B3E]/15 md:col-span-2">
                  <CheckCircle2 className="w-6 h-6 text-[#C56B3E] shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                    <strong className="font-black text-[#0E7490]">חוויה מוקפדת:</strong> אירוח בסטודיו של רעות, כיבוד קל ומפנק, אווירה נעימה והזדמנות להכיר נשים חדשות גם מחוץ לאימון.
                  </p>
                </div>
              </div>
            </div>

            {/* Clear 3-Step Registration & Payment Copy below What You Get */}
            <div className="mt-8 pt-7 border-t border-slate-200 space-y-5">
              <div className="max-w-xl mx-auto bg-gradient-to-br from-[#F0FDF4] to-[#FFF9F4] border-2 border-[#0E7490]/25 rounded-3xl p-5 sm:p-7 text-right space-y-3 shadow-xs">
                <h4 className="text-lg sm:text-xl font-black text-[#0E7490]">
                  תהליך ההרשמה והתשלום פשוט:
                </h4>
                <ol className="space-y-2 text-sm sm:text-base font-bold text-slate-800 list-none">
                  <li className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#0E7490] text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
                    <span>ממלאים את השאלון מטה</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#0E7490] text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
                    <span>מאשרים בוי (✓) את התקנון</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#C56B3E] text-white text-xs font-black flex items-center justify-center shrink-0">3</span>
                    <span>בסיום יפתח קישור לתשלום ישיר בפייבוקס</span>
                  </li>
                </ol>
                <p className="pt-2 border-t border-[#0E7490]/15 text-xs sm:text-sm font-black text-[#C56B3E]">
                  שימי לב: רק ביצוע התשלום בפועל מבטיח שריון מקום בסדנה.
                </p>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => scrollToSection('soul-interest')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#0E7490] to-[#0891B2] hover:from-[#0891B2] hover:to-[#0E7490] text-white font-black text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>להרשמה, אישור תקנון ותשלום בפייבוקס</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. REGISTRATION FORM */}
      <section id="soul-interest" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#0E7490] via-[#0891B2] to-[#0E7490] text-white relative scroll-mt-20">
        <div className="max-w-3xl mx-auto relative z-10 text-right">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              טופס הרשמה | בין לבין - אימון לנשמה
            </h2>
          </div>

          <SoulRegistrationForm
            whatsappUrl={whatsappUrl}
            payboxUrl={PAYBOX_URL}
            onOpenTerms={() => setActiveLegalModal('terms')}
          />

          {/* Direct WhatsApp Prompt */}
          <div className="mt-8 text-center space-y-2 text-white">
            <p className="text-sm font-medium">מעדיפה לשוחח ישירות בוואטסאפ?</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#0E7490] hover:bg-slate-100 rounded-full font-bold text-sm shadow-md transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>שיחה עם דלית ואלסי בוואטסאפ</span>
            </a>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 text-center text-xs sm:text-sm space-y-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3 text-right">
            <div className="w-11 h-11 rounded-full bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src="/logos/brand-main.webp"
                alt="לוגו בין לבין"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.endsWith('/logos/brand-main.png')) {
                    target.src = '/logos/brand-main.png';
                  }
                }}
              />
            </div>
            <div>
              <div className="text-lg font-black text-white">
                אמצע החיים ✦ אימון לנשמה
              </div>
              <div className="text-xs text-slate-400">
                בשיתוף הסטודיו של רעות &amp; &quot;בין לבין | מרחבים לנשים&quot;
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 size={14} />
              <span>שתפי חברה</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              <span>וואטסאפ</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs">
          <button
            type="button"
            onClick={() => setActiveLegalModal('terms')}
            className="underline hover:text-white transition-colors cursor-pointer"
          >
            תקנון התוכנית ותנאי הרשמה
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setActiveLegalModal('privacy')}
            className="underline hover:text-white transition-colors cursor-pointer"
          >
            מדיניות פרטיות
          </button>
        </div>

        <p>© {new Date().getFullYear()} "בין לבין | מרחבים לנשים" & מכון הכושר של רעות. כל הזכויות שמורות.</p>
        <p className="text-slate-500 text-xs">
          דף נחיתה ייעודי לשיתוף פעולה. הסדנה מיועדת לנשים בגילאי <span dir="ltr">40-55</span>.
        </p>
      </footer>

      <LegalModals
        activeModal={activeLegalModal}
        closeModal={() => setActiveLegalModal(null)}
        variant="soul"
      />
    </div>
  );
};

export default SoulTrainingPage;
