import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  ArrowDown, 
  Share2, 
  Sparkles, 
  ChevronUp, 
  Compass, 
  Sun, 
  Trees, 
  Tent, 
  Flower2, 
  ArrowLeft,
  Crown
} from 'lucide-react';
import { ButterflyIcon } from '../components/Hero';

interface ProgramCardTheme {
  id: string;
  name: string;
  isFlagship?: boolean;
  categoryNode: React.ReactNode;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  cardBg: string;
  borderStyle: string;
  iconBoxStyle: string;
  badgeStyle: string;
  buttonStyle: string;
  accentBar: string;
}

const ALL_PROGRAMS: ProgramCardTheme[] = [
  {
    id: 'midlife',
    name: 'אמצע החיים',
    isFlagship: true,
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
    link: '/p/midlife',
    cardBg: 'bg-gradient-to-b from-[#fffbf7] via-[#fff7ef] to-[#ffeedd]',
    borderStyle: 'border-2 border-brand-orange/60 ring-2 ring-brand-orange/20 shadow-[0_12px_40px_rgba(203,119,69,0.15)] hover:border-brand-orange hover:shadow-2xl',
    iconBoxStyle: 'bg-brand-orange/20 text-brand-orange border border-brand-orange/40 shadow-xs',
    badgeStyle: 'bg-brand-orange text-white border border-brand-orange shadow-xs font-black',
    buttonStyle: 'bg-brand-orange hover:bg-brand-green text-white shadow-sm hover:shadow-md',
    accentBar: 'bg-brand-orange'
  },
  {
    id: 'up-to-180',
    name: 'עד 180°',
    categoryNode: <span>סדנה לתהליכי שינוי</span>,
    tagline: 'לעצור, לשנות זווית ולבחור את הצעד הבא.',
    icon: Compass,
    link: '/p/up-to-180',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#f7fbfb] to-[#edf6f6]',
    borderStyle: 'border border-teal-200/80 hover:border-teal-400 hover:shadow-xl shadow-[0_8px_30px_rgba(20,110,120,0.05)]',
    iconBoxStyle: 'bg-teal-50 text-teal-700 border border-teal-200/70',
    badgeStyle: 'bg-teal-50 text-teal-800 border border-teal-200/80',
    buttonStyle: 'bg-teal-700/10 hover:bg-teal-700 text-teal-800 hover:text-white',
    accentBar: 'bg-teal-500'
  },
  {
    id: 'the-tent',
    name: 'האוהל',
    categoryNode: <span>מנהיגות, יוזמה והשפעה</span>,
    tagline: 'מהכוחות והעוגנים הפנימיים אל יוזמה, הובלה ועשייה בקהילה.',
    icon: Tent,
    link: '/p/the-tent',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#fffdf9] to-[#fbf2e3]',
    borderStyle: 'border border-amber-200/80 hover:border-amber-400 hover:shadow-xl shadow-[0_8px_30px_rgba(180,120,20,0.05)]',
    iconBoxStyle: 'bg-amber-50 text-amber-700 border border-amber-200/70',
    badgeStyle: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    buttonStyle: 'bg-amber-700/10 hover:bg-amber-700 text-amber-800 hover:text-white',
    accentBar: 'bg-amber-500'
  },
  {
    id: 'alchemy',
    name: 'אלכימיה של יסודות',
    categoryNode: <span>יום שיא בטבע</span>,
    tagline: 'חוויה שמחברת בין טבע, תנועה, התבוננות וחיבור לעצמנו.',
    icon: Trees,
    link: '/p/alchemy',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#fbfdfb] to-[#edf6ec]',
    borderStyle: 'border border-emerald-200/80 hover:border-emerald-400 hover:shadow-xl shadow-[0_8px_30px_rgba(40,120,60,0.05)]',
    iconBoxStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-200/70',
    badgeStyle: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80',
    buttonStyle: 'bg-emerald-700/10 hover:bg-emerald-700 text-emerald-800 hover:text-white',
    accentBar: 'bg-emerald-600'
  },
  {
    id: 'ahead-of-you',
    name: 'עוד לפנייך',
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
    link: '/p/ahead-of-you',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#fffbfc] to-[#fcedf0]',
    borderStyle: 'border border-rose-200/80 hover:border-rose-400 hover:shadow-xl shadow-[0_8px_30px_rgba(180,50,80,0.05)]',
    iconBoxStyle: 'bg-rose-50 text-rose-700 border border-rose-200/70',
    badgeStyle: 'bg-rose-50 text-rose-800 border border-rose-200/80',
    buttonStyle: 'bg-rose-700/10 hover:bg-rose-700 text-rose-800 hover:text-white',
    accentBar: 'bg-rose-500'
  },
  {
    id: 'highlights',
    name: 'היילייטס',
    categoryNode: <span>תוכנית פיתוח בארגונים</span>,
    tagline: 'מניסיון ונוכחות להובלה והשפעה לנשים באמצע החיים.',
    icon: Sparkles,
    link: '/p/highlights',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#fafaff] to-[#edf0fc]',
    borderStyle: 'border border-indigo-200/80 hover:border-indigo-400 hover:shadow-xl shadow-[0_8px_30px_rgba(70,60,160,0.05)]',
    iconBoxStyle: 'bg-indigo-50 text-indigo-700 border border-indigo-200/70',
    badgeStyle: 'bg-indigo-50 text-indigo-800 border border-indigo-200/80',
    buttonStyle: 'bg-indigo-700/10 hover:bg-indigo-700 text-indigo-800 hover:text-white',
    accentBar: 'bg-indigo-600'
  }
];

export const BrandLandingPage: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    document.title = "בין לבין תוכניות לנשים";
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPrograms = () => {
    const el = document.getElementById('programs-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappMasterText = encodeURIComponent(
    "אשמח לשמוע פרטים על תוכניות בין לבין לנשים"
  );
  const dalitWhatsappUrl = `https://wa.me/972508353731?text=${whatsappMasterText}`;
  const elsieWhatsappUrl = `https://wa.me/972547458668?text=${whatsappMasterText}`;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "בין לבין | תוכניות וריטריטים לנשים",
          text: "בית לתוכניות, סדנאות וריטריטים לנשים מבית בין לבין.",
          url,
        });
      } catch {
        // user cancelled share
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('הקישור הועתק ללוח!');
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream text-gray-800 antialiased selection:bg-brand-orange/20 selection:text-brand-green font-sans" dir="rtl">
      
      {/* =========================================================================
          1. HERO ופתיח המותג
          - פרפרים מוסתרים במובייל ומוגנים מכיסוי טקסט (-z-10, pointer-events-none, hidden md:block)
          - תמונה מוצגת לרוחב (Landscape) ללא חיתוך
          - כותרות ממורכזות בנייד, פונטים מוגדלים לקריאה מיטבית בגלילה
      ========================================================================= */}
      <section className="relative pt-6 sm:pt-12 pb-14 sm:pb-20 px-4 sm:px-6 overflow-hidden bg-brand-cream border-b-2 border-brand-beige/80">
        {/* Subtle Ambient Butterflies: Strictly hidden on mobile and kept behind all content (-z-10) */}
        <ButterflyIcon size={260} className="absolute -top-10 -right-20 opacity-[0.035] animate-drift pointer-events-none select-none hidden md:block -z-10" />
        <ButterflyIcon size={220} className="absolute bottom-0 -left-16 opacity-[0.03] animate-float pointer-events-none select-none hidden md:block -z-10" />

        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Top Bar: Clean Brand Mark & Share */}
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-brand-beige shadow-sm flex items-center justify-center overflow-hidden bg-white/80">
                <img 
                  src="https://i.postimg.cc/PrH50HRm/logo-jpg.webp" 
                  alt="לוגו בין לבין" 
                  className="w-full h-full object-cover"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
              <span className="text-xl sm:text-2xl font-black text-brand-green tracking-tight">
                בין לבין
              </span>
            </div>

            <button
              onClick={handleShare}
              aria-label="מוזמנת לשתף"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 hover:text-brand-orange transition-colors py-1.5 px-3.5 rounded-full bg-white/80 hover:bg-white border border-brand-beige cursor-pointer shadow-xs active:scale-95"
              title="מוזמנת לשתף"
            >
              <Share2 className="w-3.5 h-3.5 text-brand-orange" />
              <span>מוזמנת לשתף</span>
            </button>
          </div>

          {/* Hero Content Grid: Typography + Authentic Feminine Photo displayed in Horizontal Landscape */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Main Text Content */}
            <div className="lg:col-span-7 text-right">
              
              <h1 className="text-[36px] sm:text-5xl md:text-6xl font-black text-brand-green tracking-tight leading-[1.15] mb-2 drop-shadow-xs text-center lg:text-right">
                בין לבין
              </h1>

              <div className="text-[24px] sm:text-3xl md:text-4xl font-black text-brand-orange mb-6 sm:mb-8 tracking-tight text-center lg:text-right">
                תוכניות וריטריטים לנשים
              </div>

              {/* Flowing Copy with enlarged mobile font and generous line-height */}
              <div className="space-y-4 text-[17px] sm:text-lg text-gray-700 leading-[1.75] sm:leading-relaxed font-normal max-w-2xl text-right">
                <p>
                  יש תקופות שבהן אנחנו רוצות לעצור ולהבין קצת יותר.
                  <br />
                  לפעמים מתעורר רצון לשנות, להתחדש, להוביל, לפגוש נשים אחרות או פשוט לצאת מהשגרה למשהו שעושה לנו טוב.
                </p>

                <p>
                  <strong className="font-black text-brand-green">בין לבין</strong> נולדה מתוך ההבנה שבכל שלב אנחנו מחפשות משהו קצת שונה.
                </p>

                <p>
                  יצרנו בית לתוכניות, סדנאות וריטריטים לנשים, שנוגעים בנקודות שונות לאורך הדרך ומשלבים ידע, התבוננות, שיח, עשייה וחוויה.
                </p>

                <p>
                  יש בהם מקום לשינויים שמביאים איתם שלבים שונים בחיים, להתפתחות אישית, למנהיגות ויוזמה, וגם ליציאה אל הטבע ולמפגש נשי שמאפשר לעצור לרגע את הקצב הרגיל.
                </p>

                <p className="pt-3 text-brand-green font-bold text-[18px] sm:text-xl border-t border-brand-beige/90 text-center sm:text-right">
                  מוזמנות להכיר את בין לבין ולראות מה מדבר אליכן
                </p>
              </div>

              {/* Quick Actions - centered on mobile */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <button
                  onClick={scrollToPrograms}
                  className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-orange text-white px-7 py-3.5 rounded-full text-base font-black transition-all shadow-sm hover:shadow cursor-pointer active:scale-98"
                >
                  <span>להכיר את התוכניות</span>
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </button>

                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-brand-orange/10 text-brand-green hover:text-brand-orange px-7 py-3.5 rounded-full text-base font-black transition-all border border-brand-green/20 cursor-pointer shadow-xs active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>דברו איתנו</span>
                </button>
              </div>
            </div>

              {/* Authentic Brand Photograph: Presented in Landscape (לרוחב) without vertical cropping */}
            <div className="lg:col-span-5 flex justify-center w-full mt-2 lg:mt-0">
              <div className="relative w-full max-w-lg">
                <div className="overflow-hidden rounded-3xl shadow-xl border-4 border-white aspect-[16/10] sm:aspect-[3/2] bg-brand-beige/30">
                  <img 
                    src="https://i.postimg.cc/X73f8XLh/IS-1193.jpg" 
                    alt="בין לבין - תוכניות וריטריטים לנשים" 
                    className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  />
                </div>
                {/* Organic decorative badge - text "6 תוכניות..." removed as requested */}
                <div className="absolute -bottom-4 -left-2 bg-white/95 backdrop-blur-xs py-2 px-4 rounded-2xl border border-brand-beige shadow-md text-right">
                  <span className="text-xs sm:text-sm font-bold text-brand-orange block">
                    מרחב של הקשבה, חיבור וצמיחה
                  </span>
                </div>
              </div>
            </div>

          </div>


        </div>
      </section>

      {/* =========================================================================
          2. אזור המוצרים בקוביות
          מעוצב כפרק נפרד עם רקע מובחן בגוון מרווה טבעי (Sage), מסגרות מודגשות וכרטיסים בולטים
          סדנת הדגל "אמצע החיים" מסומנת בהבלטה מיוחדת
      ========================================================================= */}
      <section id="programs-section" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#ebf1e6] border-y-4 border-[#d5ded0] relative overflow-hidden shadow-inner">
        {/* Subtle decorative background accents - safely hidden on mobile */}
        <ButterflyIcon size={240} className="absolute -top-16 -right-16 opacity-[0.03] animate-drift pointer-events-none select-none hidden md:block -z-10" />
        <ButterflyIcon size={200} className="absolute -bottom-16 -left-16 opacity-[0.03] animate-float pointer-events-none select-none hidden md:block -z-10" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Section Heading - Centered for Mobile and Desktop with solid badge */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-1.5 bg-brand-green text-white rounded-full text-xs md:text-sm font-black mb-3.5 tracking-tight shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span>הבית של בין לבין</span>
            </div>
            <h2 className="text-[30px] sm:text-4xl md:text-5xl font-black text-brand-green tracking-tight mb-3">
              התוכניות והריטריטים שלנו
            </h2>
            <p className="text-[17px] sm:text-lg text-gray-700 font-bold max-w-xl mx-auto leading-relaxed px-2">
              כל תוכנית פוגשת צורך אחר ומציעה דרך ייחודית לעבור תהליך, ללמוד ולהתחבר
            </p>
            <div className="h-1.5 w-20 bg-brand-orange mx-auto mt-5 rounded-full opacity-60"></div>
          </div>

          {/* Cards Grid: 6 Distinct Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {ALL_PROGRAMS.map((prog) => {
              const IconComponent = prog.icon;
              return (
                <div
                  key={prog.id}
                  id={`program-card-${prog.id}`}
                  className={`${prog.cardBg} rounded-3xl p-6 sm:p-8 ${prog.borderStyle} border-2 hover:-translate-y-1.5 transition-all duration-300 flex flex-col text-right group relative overflow-hidden shadow-md hover:shadow-xl`}
                >
                  {/* Colored top accent bar for instant card visual identity */}
                  <div className={`h-1.5 w-full ${prog.accentBar} absolute top-0 right-0 left-0`}></div>

                  {/* Flagship special ribbon badge at top */}
                  {prog.isFlagship && (
                    <div className="mb-4 inline-flex items-center gap-1.5 self-start bg-brand-orange text-white px-3.5 py-1 rounded-full text-xs font-black shadow-xs tracking-wide">
                      <Crown className="w-3.5 h-3.5 fill-current" />
                      <span>סדנת הדגל של בין לבין</span>
                    </div>
                  )}

                  {/* Top Row: Delicate Icon & Category Badge */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${prog.iconBoxStyle} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-black tracking-tight ${prog.badgeStyle}`}>
                      {prog.categoryNode}
                    </span>
                  </div>

                  {/* Program Name */}
                  <h3 className="text-[25px] sm:text-3xl font-black text-brand-green group-hover:text-brand-orange transition-colors tracking-tight mb-3">
                    {prog.name}
                  </h3>

                  {/* Single Short Essence / Tagline */}
                  <p className="text-[17px] sm:text-lg text-gray-700 font-medium leading-relaxed mb-6 flex-1">
                    {prog.tagline}
                  </p>

                  {/* Action Button to Enter the Program Page */}
                  <div className="pt-4 border-t border-brand-beige/80 mt-auto">
                    <Link
                      to={prog.link}
                      className={`w-full inline-flex items-center justify-between ${prog.buttonStyle} px-5 py-4 rounded-2xl text-base font-black transition-all duration-300 group/btn shadow-xs active:scale-98`}
                    >
                      <span>לפרטים על התוכנית</span>
                      <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover/btn:-translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>


        </div>
      </section>

      {/* =========================================================================
          3. קצת עלינו - אלסי ודלית (About Us)
          פרק נפרד עם רקע לבן צח ונקי לקונטרסט מרבי, כרטיסים צבעוניים מובחנים
      ========================================================================= */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 bg-white border-b-4 border-brand-beige relative overflow-hidden text-right">
        {/* Decorative background butterfly - hidden on mobile and kept behind content */}
        <ButterflyIcon size={220} className="absolute top-10 -right-16 opacity-[0.035] animate-drift pointer-events-none select-none hidden md:block -z-10" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-1.5 bg-brand-green text-white rounded-full text-xs md:text-sm font-black mb-3.5 tracking-tight shadow-xs">
              <span>קצת עלינו</span>
            </div>
            <h2 className="text-[30px] sm:text-4xl md:text-5xl font-black text-brand-green tracking-tight mb-3">
              אלסי ודלית
            </h2>
            <p className="text-[17px] sm:text-lg text-gray-700 font-medium max-w-xl mx-auto leading-relaxed px-2">
              הצוות שמאחורי התוכניות, הסדנאות והריטריטים של בין לבין
            </p>
            <div className="h-1.5 w-20 bg-brand-orange mx-auto mt-4 rounded-full opacity-60"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 max-w-4xl mx-auto">
            {/* דלית כורה - כרטיס ירוק מותג מובחן */}
            <div className="bg-[#f6f9f4] rounded-3xl p-7 sm:p-9 shadow-md border-2 border-brand-green/30 border-t-8 border-t-brand-green hover:shadow-lg transition-all duration-300 flex flex-col text-right">
              <div className="mb-4 text-center sm:text-right flex flex-col sm:items-start items-center">
                <h3 className="text-[26px] sm:text-3xl font-black text-brand-green mb-2">
                  דלית כורה
                </h3>
                <div className="inline-block px-4 py-1 bg-white text-brand-green font-black text-sm rounded-full border border-brand-green/20 shadow-xs">
                  הוגה ומובילת התוכניות
                </div>
              </div>
              <div className="w-12 h-1 bg-brand-orange mb-6 rounded-full mx-auto sm:mx-0"></div>
              
              <div className="space-y-4 text-gray-700 leading-[1.75] text-[16px] sm:text-[17px] font-normal">
                <p>
                  מתמחה בהובלת פרויקטים ובתרגום רעיונות לתהליכים יישומיים, מדויקים וברורים. פעילה לאורך שנים ב"אמהות עם מהות", ברמה המקומית והארצית, בהובלת קהילה, תוכן, תוכניות ואירועים. הניסיון הזה מביא לתוכניות היכרות עמוקה עם קהילות נשים ועם הדרך לבנות תהליך שמחבר בין תוכן, שיח וחוויה.
                </p>
                <p className="font-semibold text-brand-green">
                  ב"בין לבין" דלית מחזיקה את המבנה, הרצף והקצב, ומובילה את התהליך מהרעיון ועד למימוש.
                </p>
              </div>
            </div>

            {/* אלסי זיסלמן - כרטיס כתום מותג מובחן */}
            <div className="bg-[#fdf8f2] rounded-3xl p-7 sm:p-9 shadow-md border-2 border-brand-orange/30 border-t-8 border-t-brand-orange hover:shadow-lg transition-all duration-300 flex flex-col text-right">
              <div className="mb-4 text-center sm:text-right flex flex-col sm:items-start items-center">
                <h3 className="text-[26px] sm:text-3xl font-black text-brand-green mb-2">
                  אלסי זיסלמן
                </h3>
                <div className="inline-block px-4 py-1 bg-white text-brand-orange font-black text-sm rounded-full border border-brand-orange/20 shadow-xs">
                  מנחה ומרצה, טריינרית NLP
                </div>
              </div>
              <div className="w-12 h-1 bg-brand-green mb-6 rounded-full mx-auto sm:mx-0"></div>
              
              <div className="space-y-4 text-gray-700 leading-[1.75] text-[16px] sm:text-[17px] font-normal">
                <p>
                  מלווה תהליכים אישיים וקבוצתיים של שינוי, התבוננות וקבלת החלטות. פעילה לאורך שנים ב"אמהות עם מהות", ברמה המקומית והארצית, ומביאה איתה ניסיון בהנחיית קבוצות והיכרות עמוקה עם נשים, קהילות ותהליכים קבוצתיים.
                </p>
                <p className="font-semibold text-brand-green">
                  ב"בין לבין" אלסי מובילה את תהליכי ההתבוננות והשיח, ומסייעת לנשים לתרגם תובנות פנימיות לבחירות ולצעדים מעשיים.
                </p>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* =========================================================================
          4. "מכאן, אפשר פשוט לדבר" ואחריו כפתורי צור קשר (ללא כותרת)
          חלק סיום מעוצב עם רקע חם בגוון דבש-חימר (Terracotta/Honey-Cream) מובחן ובולט
      ========================================================================= */}
      <section id="contact" className="bg-gradient-to-b from-[#fbf2e7] via-[#f7eae0] to-[#efdecb] py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden shadow-inner">
        {/* Gentle Butterfly Accent - safely hidden on mobile */}
        <ButterflyIcon size={240} className="absolute -bottom-10 -left-16 opacity-[0.035] animate-float pointer-events-none select-none hidden md:block -z-10" />

        <div className="max-w-3xl mx-auto relative z-10 text-right">
          
          {/* בלוק "מכאן, אפשר פשוט לדבר" - מסגרת כרטיס מוגבהת לקריאה נוחה */}
          <div className="bg-white/95 backdrop-blur-xs p-6 sm:p-9 rounded-3xl border-2 border-brand-orange/20 shadow-md mb-10 sm:mb-12">
            <div className="flex justify-center sm:justify-start">
              <div className="inline-flex items-center gap-2 bg-brand-orange text-white px-5 py-1.5 rounded-full text-xs sm:text-sm font-black mb-4 tracking-tight shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>החיבור מתחיל בשיחה</span>
              </div>
            </div>

            <h2 className="text-[30px] sm:text-4xl md:text-5xl font-black text-brand-green mb-6 tracking-tight text-center sm:text-right">
              מכאן, אפשר פשוט לדבר
            </h2>

            <div className="space-y-4 text-[17px] sm:text-lg text-gray-700 leading-[1.75] font-normal text-right">
              <p>
                אולי הגעת לכאן כי אחת התוכניות סקרנה אותך.
                <br />
                אולי את מחפשת משהו לעצמך, ואולי עבור קבוצה, קהילה או ארגון.
              </p>

              <p>
                כך או כך, נשמח לשמוע ממך, להכיר ולספר קצת יותר על מה שקורה עכשיו בבין לבין.
              </p>

              <p className="font-medium text-brand-green pt-1">
                אפשר להצטרף לתוכניות ולריטריטים שאנחנו פותחות לאורך השנה, ואפשר גם ליצור איתנו משהו שמתאים במיוחד לקבוצה שלכן.
              </p>
            </div>
          </div>

          {/* כפתורי יצירת קשר (ישירות, ללא כותרת נוספת) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-10 max-w-xl mx-auto text-center">
            
            {/* דלית כורה */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-brand-green/30 border-t-6 border-t-brand-green shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="font-black text-2xl text-brand-green mb-1.5">
                  דלית כורה
                </div>
                <div className="text-sm font-bold text-gray-500 mb-6">
                  הוגה ומובילת התוכניות
                </div>
              </div>
              
              <a
                href={dalitWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full py-4 px-5 rounded-2xl bg-brand-green hover:bg-brand-orange text-white font-black text-base shadow-sm hover:shadow-md transition-all active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-current text-white" />
                <span>הודעת וואטסאפ לדלית</span>
              </a>
            </div>

            {/* אלסי זיסלמן */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-brand-orange/30 border-t-6 border-t-brand-orange shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="font-black text-2xl text-brand-green mb-1.5">
                  אלסי זיסלמן
                </div>
                <div className="text-sm font-bold text-gray-500 mb-6">
                  מנחה ומרצה, טריינרית NLP
                </div>
              </div>
              
              <a
                href={elsieWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full py-4 px-5 rounded-2xl bg-brand-orange hover:bg-brand-green text-white font-black text-base shadow-sm hover:shadow-md transition-all active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-current text-white" />
                <span>הודעת וואטסאפ לאלסי</span>
              </a>
            </div>

          </div>

          {/* כפתור מרכזי: "בואי נדבר" במסגרת כרטיס בולטת */}
          <div className="bg-white/90 rounded-3xl p-6 sm:p-8 border-2 border-brand-orange/30 shadow-md flex flex-col items-center justify-center gap-3 text-center max-w-lg mx-auto">
            <a
              href={dalitWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-brand-orange hover:bg-brand-green text-white px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-black transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-98"
            >
              <MessageCircle className="w-6 h-6 fill-current text-white" />
              <span>בואי נדבר</span>
            </a>

            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              לחיצה תפתח שיחת וואטסאפ עם הודעה מוכנה לתיאום ובירור פרטים
            </span>
          </div>

          {/* סיום הדף / זכויות יוצרים */}
          <div className="mt-14 pt-8 border-t border-brand-beige/80 text-xs text-gray-500 font-medium text-center">
            © {new Date().getFullYear()} בין לבין | תוכניות וריטריטים לנשים. כל הזכויות שמורות.
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
