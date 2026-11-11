import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  Heart, 
  Share2, 
  Calendar, 
  MapPin, 
  Clock, 
  Check, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ChevronDown, 
  Phone,
  Menu,
  Compass
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { OtherProgramsNav } from '../../components/MiniProgramNav';
import { saveInquiry } from '../../utils/inquiryStorage';

// Program Contacts
const CONTACTS = {
  dalit: {
    name: 'דלית כורה',
    shortName: 'דלית',
    phone: '050-8353731',
    cleanNumber: '972508353731',
    message: encodeURIComponent('שלום דלית, קראתי על תוכנית "עוד לפנייך" ואשמח לשוחח ולשמוע פרטים נוספים.')
  },
  elsie: {
    name: 'אלסי זיסלמן',
    shortName: 'אלסי',
    phone: '054-7458668',
    cleanNumber: '972547458668',
    message: encodeURIComponent('שלום אלסי, קראתי על תוכנית "עוד לפנייך" ואשמח לשוחח ולשמוע פרטים נוספים.')
  }
};

// 5 Sessions Data
const SESSIONS = [
  {
    tag: 'גוף ובריאות',
    title: 'הגוף שלנו, הבריאות ואיכות החיים',
    description: 'מה משתנה בגוף עם השנים? איך שומרים על חיוניות, תנועה ובריאות? מה חשוב לדעת כדי להמשיך להרגיש טוב וליהנות מהחיים?',
    accentColor: '#982D49',
    bgTint: 'bg-[#FAF2F4]'
  },
  {
    tag: 'משפחה ויחסים',
    title: 'המשפחה שלנו, היחסים והתפקידים שמשתנים',
    description: 'הילדים כבר גדולים, לפעמים יש נכדים, הזוגיות משתנה. איך מוצאים את האיזון בין להיות שם בשביל כולם לבין להיות קשובה גם לעצמך?',
    accentColor: '#476653',
    bgTint: 'bg-[#F2F6F3]'
  },
  {
    tag: 'זמן ובחירה',
    title: 'הזמן שלי, העצמאות והבחירות שלי',
    description: 'מה עושים כשהקצב משתנה? איך שומרים על עצמאות בעולם שמתחדש כל הזמן? איך הופכים את הזמן והאפשרויות שעומדים לרשותנו למשהו שבאמת מתאים לנו?',
    accentColor: '#982D49',
    bgTint: 'bg-[#FAF4F0]'
  },
  {
    tag: 'חברות ושייכות',
    title: 'חברות, קשרים ותחושת שייכות',
    description: 'איך מטפחים חברויות לאורך השנים? איך יוצרים קשרים חדשים? מה מקומה של חברות נשית בחיינו ואיך שומרים על מעגלים חברתיים משמעותיים?',
    accentColor: '#476653',
    bgTint: 'bg-[#F2F5F4]'
  },
  {
    tag: 'סקרנות והתחדשות',
    title: 'סקרנות, התחדשות וכל מה שעוד אפשר',
    description: 'מי אמר שיש גיל שבו מפסיקים לגלות דברים חדשים? על למידה, תחומי עניין, עשייה, התנסויות חדשות והאפשרות להמשיך להפתיע גם את עצמנו.',
    accentColor: '#982D49',
    bgTint: 'bg-[#FAF1F3]'
  }
];

// Testimonials Data
const TESTIMONIALS = [
  {
    quote: 'לקחתי איתי את האהבה, מאור הפנים, החברויות החדשות, התכנים והידע, ובעיקר את הרצון להמשיך ולממש את היכולות שלי וליהנות מהדרך.',
    author: 'ענבל ס׳',
    tag: 'חברויות וצמיחה',
    accent: 'burgundy'
  },
  {
    quote: 'סדנה מושקעת, חווייתית ומוצלחת שהשאירה טעם של עוד. חברותא מעולה וצוות מדהים.',
    author: 'איילת',
    tag: 'חברותא וצוות',
    accent: 'sage'
  },
  {
    quote: 'למדתי שאני לא לבד בתהליך. פגשתי נשים מקסימות וחמות, חיכיתי בכל פעם למפגש הבא.',
    author: 'ענת י׳',
    tag: 'שייכות וחיבור',
    accent: 'sage'
  },
  {
    quote: 'תודה על האווירה המאפשרת, הנתינה האינסופית, המחשבה על הפרטים הקטנים, החיוך, החיבוק והתכנים המעניינים.',
    author: 'לימור ג׳',
    tag: 'אווירה ונתינה',
    accent: 'burgundy'
  }
];

// Registration Plans
const REGISTRATION_PLANS = [
  {
    id: 'plan_friend',
    name: 'חברה מביאה חברה - כפל מבצעים (710 ₪ לכל אחת)',
    shortLabel: 'חברה מביאה חברה',
    price: '710 ₪ לכל אחת',
    benefit: 'כפל מבצעים: מעל 5% הנחה + מפגש בונוס חינם',
    badge: 'הכי משתלם'
  },
  {
    id: 'plan_early',
    name: 'הרשמה מוקדמת - עיריית כפר סבא (750 ₪)',
    shortLabel: 'הרשמה מוקדמת',
    price: '750 ₪',
    benefit: 'מפגש בונוס מתנה · 6 מפגשים במחיר 5',
    badge: 'עיריית כפר סבא'
  },
  {
    id: 'plan_regular',
    name: 'הרשמה רגילה (750 ₪)',
    shortLabel: 'הרשמה רגילה',
    price: '750 ₪',
    benefit: '5 מפגשים מלאים ומעשירים',
    badge: 'סדרה מלאה'
  }
];

// Share Button with Native Share or Modal Fallback
const ShareButton: React.FC<{
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'pill';
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({
  className = '',
  variant = 'secondary',
  text = 'שתפי חברה',
  size = 'md'
}) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://bein-levein.co.il/p/ahead-of-you';
  const shareText = `היי! ראיתי את התוכנית "עוֹד לְפָנַיִךְ" לנשים 60+ מבית "בין לבין" וחשבתי עליך. שווה לקרוא ולהירשם מוקדם יחד – מקבלות גם הנחה וגם מפגש במתנה: ${shareUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const handleShare = async () => {
    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: 'עוֹד לְפָנַיִךְ | תוכנית לנשים 60+ מבית בין לבין',
          text: 'היי! ראיתי את התוכנית "עוד לפנייך" לנשים 60+ מבית "בין לבין" וחשבתי עליך:',
          url: shareUrl
        });
        return;
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setShowModal(true);
        }
        return;
      }
    }
    setShowModal(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-4 sm:px-5 py-2 sm:py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base sm:text-lg gap-2.5 font-bold'
  }[size];

  const variantClasses = {
    primary: 'bg-[#982D49] hover:bg-[#7A2139] text-white shadow-sm hover:shadow active:scale-[0.98]',
    secondary: 'bg-[#476653] hover:bg-[#385242] text-white shadow-sm hover:shadow active:scale-[0.98]',
    outline: 'border-2 border-[#476653] text-[#476653] hover:bg-[#476653] hover:text-white bg-white/80 active:scale-[0.98]',
    pill: 'bg-white hover:bg-[#FAF1F3] text-[#982D49] border border-[#982D49]/30 shadow-2xs hover:shadow-xs active:scale-[0.98]'
  }[variant];

  return (
    <>
      <button
        onClick={handleShare}
        className={`inline-flex items-center justify-center rounded-full font-bold transition-all cursor-pointer select-none ${sizeClasses} ${variantClasses} ${className}`}
        aria-label="שתפי חברה בתוכנית עוד לפנייך"
      >
        <Share2 size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
        <span>{text}</span>
      </button>

      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowModal(false)}
        >
          <div 
            dir="rtl"
            className="bg-white rounded-3xl max-w-sm w-full p-6 text-right shadow-2xl border border-[#D68B98]/30 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#D68B98]/20 pb-3">
              <h3 className="text-lg font-bold text-[#982D49]">שתפי חברה בתוכנית</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-[#2C2422]/90 leading-relaxed">
              שלחי לחברה קישור ישיר לתוכנית "עוד לפנייך". בהרשמה יחד שתיכן נהנות מהנחה וממפגש בונוס מתנה!
            </p>

            <div className="space-y-2.5 pt-1">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-bold flex items-center justify-center gap-2 text-sm shadow-sm transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>שליחה בווטסאפ לחברה</span>
              </a>

              <button
                onClick={copyToClipboard}
                className="w-full py-3 px-4 bg-[#FAF1F3] hover:bg-[#F3E2E6] text-[#982D49] rounded-full font-bold flex items-center justify-center gap-2 text-sm border border-[#982D49]/20 transition-colors"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Share2 size={16} />}
                <span>{copied ? 'הקישור הועתק!' : 'העתקת קישור לדף'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const AheadOfYouMiniPage: React.FC<{ embedded?: boolean; id?: string }> = ({
  embedded = false,
  id = 'ahead-of-you'
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('חברה מביאה חברה - כפל מבצעים (710 ₪ לכל אחת)');
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [consentUpdates, setConsentUpdates] = useState(true);
  const [formErrors, setFormErrors] = useState<{ fullName?: string; phone?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<{ fullName: string; selectedPlan: string } | null>(null);

  // Floating WhatsApp widget open state
  const [isWaWidgetOpen, setIsWaWidgetOpen] = useState(false);
  const waWidgetRef = useRef<HTMLDivElement>(null);

  // Sticky header mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!embedded) {
      document.title = 'עוֹד לְפָנַיִךְ | תוכנית לנשים 60+ | בין לבין';
      window.scrollTo(0, 0);
    }
  }, [embedded]);

  // Click outside listener for WhatsApp floating widget
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (waWidgetRef.current && !waWidgetRef.current.contains(e.target as Node)) {
        setIsWaWidgetOpen(false);
      }
    };
    if (isWaWidgetOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isWaWidgetOpen]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (planName?: string) => {
    if (planName) {
      setSelectedPlan(planName);
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validatePhone = (val: string) => {
    const clean = val.replace(/[\s-]/g, '');
    return /^(05\d{8}|0[23489]\d{7})$/.test(clean);
  };

  const validateEmail = (val: string) => {
    return !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { fullName?: string; phone?: string; email?: string } = {};

    if (!fullName.trim()) {
      errors.fullName = 'נא להזין שם מלא';
    } else if (fullName.trim().length < 2) {
      errors.fullName = 'השם קצר מדי';
    }

    if (!phone.trim()) {
      errors.phone = 'נא להזין מספר טלפון';
    } else if (!validatePhone(phone.trim())) {
      errors.phone = 'נא להזין מספר טלפון ישראלי תקין (לדוגמה: 050-1234567)';
    }

    if (email.trim() && !validateEmail(email.trim())) {
      errors.email = 'כתובת הדוא"ל אינה תקינה';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      // 1. Save locally with specific od_lefanayich key
      const leadRecord = {
        id: 'lead_' + Date.now(),
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        message: message.trim() || undefined,
        selectedPlan,
        consentUpdates,
        createdAt: new Date().toISOString()
      };
      
      const localKey = 'od_lefanayich_inquiries';
      const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
      existing.unshift(leadRecord);
      localStorage.setItem(localKey, JSON.stringify(existing));

      // 2. Also register in the central inquiry storage so it reaches the main admin and Firestore
      await saveInquiry({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        programs: ['עוד לפנייך', selectedPlan],
        notes: `מסלול: ${selectedPlan}. הודעה: ${message.trim() || 'אין הערות נוספות'}`,
        submittedAt: new Date().toISOString(),
        source: 'עוד לפנייך - דף נחיתה ייעודי',
        audienceType: 'private'
      });

      setSubmittedLead({ fullName: fullName.trim(), selectedPlan });
      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch {
      setIsSubmitting(false);
      setFormErrors({
        phone: 'אירעה שגיאה קלה בשמירה. אנא נסי שוב או פני ישירות בווטסאפ.'
      });
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
    setSubmittedLead(null);
  };

  const dalitInquiryMsg = encodeURIComponent(
    `שלום דלית, השארתי פרטים באתר "עוד לפנייך" עבור: ${selectedPlan}. שמי: ${fullName || 'מתעניינת'}.`
  );
  const elsieInquiryMsg = encodeURIComponent(
    `שלום אלסי, השארתי פרטים באתר "עוד לפנייך" עבור: ${selectedPlan}. שמי: ${fullName || 'מתעניינת'}.`
  );

  return (
    <div dir="rtl" className="min-h-screen bg-[#F9F1EA] text-[#2C2422] font-sans antialiased selection:bg-[#D68B98]/30 selection:text-[#982D49]">
      
      {/* 1. STICKY TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#F9F1EA]/95 backdrop-blur-md border-b border-[#D68B98]/20 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Logo & Brand Back to Home */}
          <a
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 shrink min-w-0 hover:opacity-90 transition-opacity"
            aria-label="עוד לפנייך מבית בין לבין - חזרה לדף הבית"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white/90 p-1 border border-[#476653]/20 shadow-2xs shrink-0 flex items-center justify-center">
              <img
                src="/bein-levein-logo.png"
                alt="לוגו בין לבין"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/logos/brand-main.png';
                }}
              />
            </div>
            <div className="text-right min-w-0">
              <span className="block text-lg sm:text-2xl font-bold tracking-tight text-[#982D49] font-display leading-tight truncate">
                עוֹד לְפָנַיִךְ
              </span>
              <span className="block text-[10px] sm:text-xs text-[#476653] font-medium leading-tight truncate">
                מבית "בין לבין" · תוכניות לנשים
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[15px] font-medium text-[#476653]">
            <button onClick={() => scrollToSection('about')} className="hover:text-[#982D49] transition-colors whitespace-nowrap cursor-pointer">
              על התוכנית
            </button>
            <button onClick={() => scrollToSection('sessions')} className="hover:text-[#982D49] transition-colors whitespace-nowrap cursor-pointer">
              חמשת המפגשים
            </button>
            <button onClick={() => scrollToSection('why-bein-levein')} className="hover:text-[#982D49] transition-colors whitespace-nowrap cursor-pointer">
              סוד הקסם
            </button>
            <button onClick={() => scrollToSection('founders')} className="hover:text-[#982D49] transition-colors whitespace-nowrap cursor-pointer">
              הצוות המוביל
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-[#982D49] transition-colors whitespace-nowrap cursor-pointer">
              המלצות
            </button>
            <button onClick={() => scrollToSection('what-you-get')} className="hover:text-[#982D49] transition-colors whitespace-nowrap cursor-pointer">
              מה את מקבלת
            </button>
            <button onClick={() => scrollToSection('schedule')} className="hover:text-[#982D49] transition-colors whitespace-nowrap cursor-pointer">
              מועדים והרשמה
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ShareButton variant="pill" size="sm" className="hidden sm:inline-flex" />
            <button
              onClick={() => scrollToContact()}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#982D49] hover:bg-[#7A2139] active:scale-[0.98] transition-all shadow-xs shrink-0 cursor-pointer"
            >
              השאירי פרטים
            </button>

            {/* Mobile / Compact Navigation Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-white border border-[#D68B98]/40 text-[#982D49] hover:bg-[#FAF1F3] transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
              aria-label="תפריט ניווט והתמצאות בדף"
              title="תפריט ניווט בדף"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile / Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#D68B98]/20 bg-[#FFFCF8] px-4 py-4 sm:px-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="max-w-md mx-auto space-y-1.5 text-right font-medium">
              <div className="px-3 py-1.5 text-xs font-bold text-[#476653] flex items-center gap-1.5 border-b border-[#D68B98]/15 mb-2">
                <Compass size={14} className="text-[#982D49]" />
                <span>ניווט והתמצאות בדף עוד לפנייך:</span>
              </div>

              {[
                { id: 'about', label: 'על התוכנית' },
                { id: 'sessions', label: 'חמשת המפגשים' },
                { id: 'why-bein-levein', label: 'מה סוד הקסם?' },
                { id: 'founders', label: 'הצוות המוביל (דלית ואלסי)' },
                { id: 'testimonials', label: 'המלצות משתתפות' },
                { id: 'what-you-get', label: 'מה את מקבלת בתוכנית?' },
                { id: 'schedule', label: 'מידע, מועדים והרשמה' },
                { id: 'contact', label: 'יצירת קשר והרשמה' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-right px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#2C2422] hover:bg-[#FAF1F3] hover:text-[#982D49] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#982D49]/60">←</span>
                </button>
              ))}

              <div className="pt-3 border-t border-[#D68B98]/20 mt-3 flex items-center justify-between gap-2">
                <a
                  href="/"
                  className="flex-1 py-2.5 px-3 bg-[#FAF1F3] hover:bg-[#F3E2E6] text-[#982D49] rounded-xl text-xs font-bold text-center border border-[#982D49]/20 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  <span>לאתר הבית של בין לבין</span>
                </a>
                <div className="shrink-0">
                  <ShareButton variant="pill" size="sm" text="שתפי" />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="about" className="relative overflow-hidden bg-[#F9F1EA] pt-6 pb-16 sm:pt-10 sm:pb-24 border-b border-[#D68B98]/20">
        <div className="absolute top-0 right-0 w-80 sm:w-[480px] h-80 sm:h-[480px] bg-[#D68B98]/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#476653]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-14">
            
            {/* Logo Image */}
            <div className="lg:col-span-5 flex justify-center items-center py-2 lg:py-0 order-1 lg:order-2">
              <div className="relative group max-w-[260px] sm:max-w-[320px] lg:max-w-full">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D68B98]/25 to-[#476653]/15 blur-xl transform scale-95 group-hover:scale-105 transition-transform duration-500" />
                <div className="relative inline-block select-none max-w-full aspect-square transition-transform duration-300 hover:scale-[1.01] w-56 h-56 sm:w-68 sm:h-68 md:w-80 md:h-80 mx-auto relative z-10 drop-shadow-md">
                  <img
                    src="/od-lefanayich-logo.png"
                    alt="תוכנית עוד לפנייך (60+) - עוד לגלות"
                    className="w-full h-full object-contain drop-shadow-md"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/logos/ahead-of-you.png';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Hero Copy */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5 text-right order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-white/70 border border-[#D68B98]/30 text-[#476653] font-bold text-xs sm:text-sm shadow-2xs">
                <span>עוֹד לְפָנַיִךְ</span>
                <span className="text-[#D68B98]">·</span>
                <span>תוכנית לנשים 60+ מבית בין לבין</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-[#982D49] font-display leading-[1.22] tracking-tight text-balance text-center lg:text-right">
                מי אמר שאחרי גיל 60
                <span className="block mt-1 sm:mt-2 text-[#2C2422]">
                  כבר קשה להפתיע אותך?
                </span>
              </h1>

              <div className="p-4 sm:p-5 bg-white/80 rounded-2xl border-r-4 border-r-[#982D49] border border-[#D68B98]/30 shadow-xs">
                <p className="text-lg sm:text-xl md:text-2xl font-medium text-[#2C2422] font-display leading-snug">
                  אנחנו דווקא חושבות שיש לא מעט דברים שתופתעי לגלות –{' '}
                  <strong className="font-extrabold text-[#982D49] underline decoration-[#D68B98]/60 underline-offset-4">
                    בעיקר על עצמך
                  </strong>
                </p>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-[#2C2422]/90 leading-relaxed font-normal">
                כי גם כשהחיים כבר לימדו אותך דבר או שניים, הם ממשיכים להשתנות. המשפחה, הגוף, מערכות היחסים, סדרי העדיפויות. יש דברים שאת כבר מכירה היטב, ויש כאלה שפתאום מעוררים שאלות חדשות.
              </p>
            </div>
          </div>

          {/* Cards below hero */}
          <div className="space-y-6 sm:space-y-8 text-right max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border-2 border-[#D68B98]/35 shadow-sm space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-2.5 text-[#476653] font-bold text-sm sm:text-base">
                <Sparkles size={18} className="text-[#982D49]" />
                <span>החיבור המדויק לשלב החיים הנוכחי</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#982D49] font-display leading-snug">
                בדיוק בשביל זה יצרנו את <span className="underline decoration-[#D68B98]/50 decoration-wavy">"עוד לפנייך"</span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-[#2C2422]/95 leading-relaxed font-medium">
                תוכנית של חמישה מפגשים המשלבת ידע מקצועי על נושאים שנוגעים לחיים שלך היום, התנסויות חווייתיות, שיחות פתוחות והיכרות עם נשים שנמצאות בשלב דומה בחיים.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-[#FAF1F3] rounded-3xl border border-[#D68B98]/40 shadow-xs flex flex-col md:flex-row items-center gap-5 text-center md:text-right">
              <div className="w-14 h-14 rounded-2xl bg-[#982D49] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Heart size={28} />
              </div>
              <div className="flex-1">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#982D49] font-display leading-relaxed">
                  לא עוד סדרת הרצאות – אלא הזדמנות לשתף, לשאול, לצחוק, ללמוד מנשים אחרות ולגלות נקודות מבט חדשות.
                </p>
              </div>
            </div>

            <div className="py-3 text-center w-full max-w-2xl mx-auto px-2">
              <p className="text-xl sm:text-2xl md:text-3xl font-normal text-[#2C2422] font-display leading-relaxed text-center">
                <span className="block text-center">כי עם כל מה שכבר צברת בדרך,</span>
                <strong className="font-bold text-[#982D49] block mt-1.5 text-center">
                  תארי לך כמה עוד אפשר לגלות יחד.
                </strong>
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-2xl mx-auto">
              <button
                onClick={() => scrollToSection('sessions')}
                className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-bold text-white bg-[#982D49] hover:bg-[#7A2139] active:scale-[0.99] rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer min-h-[50px]"
              >
                <span>לגלות את נושאי המפגשים</span>
                <ChevronDown size={19} className="animate-bounce" />
              </button>

              <button
                onClick={() => scrollToContact()}
                className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-[#476653] bg-white hover:bg-[#FAF1F3] hover:text-[#982D49] border border-[#476653]/30 rounded-full transition-all shadow-2xs min-h-[50px] flex items-center justify-center cursor-pointer"
              >
                השאירי פרטים ונחזור אלייך
              </button>

              <ShareButton variant="pill" text="שתפי חברה" size="md" className="w-full sm:w-auto min-h-[50px] px-6" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. FIVE SESSIONS */}
      <section id="sessions" className="py-16 md:py-24 bg-[#FFFCF8] border-b border-[#D68B98]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-sm font-semibold tracking-wider text-[#476653]">עולמות התוכן של התוכנית</span>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-[#982D49] font-display leading-tight text-balance">
              חמישה מפגשים. על מה שמשתנה, על מה שחשוב ועל מה שעוד אפשר
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#2C2422]/80">נושאים הנוגעים בחיים עצמם</p>
            <div className="w-16 h-0.5 bg-[#D68B98] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SESSIONS.map((session, index) => {
              const isFifth = index === 4;
              return (
                <div
                  key={session.tag}
                  className={`relative rounded-2xl p-6 sm:p-7 border border-[#D68B98]/25 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between ${session.bgTint} ${
                    isFifth ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs font-bold tracking-wider px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: session.accentColor }}
                      >
                        {session.tag}
                      </span>
                      <span className="text-xs text-[#476653] font-medium">עוֹד לְפָנַיִךְ</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#982D49] font-display mb-3 leading-snug">
                      {session.title}
                    </h3>
                    <p className="text-base text-[#2C2422]/90 leading-relaxed">
                      {session.description}
                    </p>
                  </div>
                  <div className="pt-5 mt-5 border-t border-[#D68B98]/20 flex items-center text-xs font-medium text-[#476653]">
                    <span>ידע מקצועי · שיח פתוח</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 sm:mt-14 text-center max-w-md mx-auto">
            <p className="text-base sm:text-lg text-[#476653] font-medium mb-4">
              רוצה לדעת מתי נפתח המחזור הקרוב?
            </p>
            <button
              onClick={() => scrollToContact()}
              className="w-full sm:w-auto px-9 py-4 text-base sm:text-lg font-semibold text-white bg-[#982D49] hover:bg-[#7A2139] active:scale-[0.99] rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer min-h-[48px] flex items-center justify-center mx-auto"
            >
              לחצי כאן ונשוחח
            </button>
          </div>
        </div>
      </section>

      {/* 4. WHY BEIN LEVEIN (סוד הקסם) */}
      <section id="why-bein-levein" className="py-16 md:py-24 bg-[#EDF3EF] border-b border-[#476653]/15 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-sm font-semibold tracking-wider text-[#476653]">הייחודיות והחוויה</span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[#982D49] font-display">
              מה סוד הקסם?
            </h2>
            <div className="w-16 h-0.5 bg-[#476653] mx-auto mt-4 rounded-full opacity-60" />
          </div>

          <div className="space-y-8 text-right max-w-3xl mx-auto">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 md:p-10 border border-[#476653]/20 shadow-xs">
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#982D49] font-display leading-relaxed">
                בבין לבין אנחנו מאמינות שתוכן טוב הוא רק חלק מהחוויה. הקסם נוצר במפגש בין הידע והכלים שאנחנו מביאות לבין הניסיון וחוכמת החיים של כל משתתפת.
              </p>
            </div>

            <div className="space-y-3">
              <div className="relative rounded-3xl overflow-hidden shadow-sm border-2 border-white/90 bg-white group max-w-3xl mx-auto">
                <img
                  src="/sisterhood-circle.png"
                  alt="מעגל נשים חם ומחבק בסלון"
                  className="w-full h-[280px] sm:h-[380px] md:h-[460px] object-cover group-hover:scale-[1.01] transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/mwm-about.webp';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2422]/60 via-transparent to-transparent flex items-end p-5 sm:p-6">
                  <p className="text-white text-base sm:text-lg md:text-xl font-bold">
                    מרחב נשי של הקשבה, שיתוף וצחוק משותף
                  </p>
                </div>
              </div>
              <p className="text-center text-sm font-semibold text-[#476653]">
                מרחב נשי של הקשבה, שיתוף וצחוק משותף
              </p>
            </div>

            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 md:p-10 border border-[#476653]/20 shadow-xs space-y-5">
              <p className="text-base sm:text-lg md:text-xl text-[#2C2422]/90 leading-relaxed font-normal">
                נשים שלא בהכרח מכירות זו את זו נפגשות, השיחות נפתחות, הסיפורים מתחברים. לפעמים נולדת תובנה, לפעמים פשוט צוחקות יחד.
              </p>
              <div className="pt-4 border-t border-[#476653]/15 space-y-3">
                <p className="text-base sm:text-lg text-[#2C2422]/90 leading-relaxed font-normal">
                  המרחב הזה מאפשר לכל אחת לקחת בדיוק את מה שנכון לה – רעיון חדש, נקודת מבט רעננה, או אולי תחושה מחזקת של חיבור ושייכות.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOUNDERS / LEADERSHIP (הצוות המוביל) */}
      <section id="founders" className="py-16 md:py-24 bg-[#FAF6F2] border-b border-[#D68B98]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm font-semibold tracking-wider text-[#476653]">מי עומדות מאחורי התוכנית</span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[#982D49] font-display">
              נעים להכיר, אנחנו דלית ואלסי
            </h2>
            <p className="mt-3 text-lg text-[#2C2422]/80">
              שותפות לדרך ומייסדות "בין לבין" – מרחבים, תוכניות וחוויות לנשים
            </p>
            <div className="w-16 h-0.5 bg-[#D68B98] mx-auto mt-4 rounded-full" />
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white p-5 sm:p-7 rounded-3xl border border-[#D68B98]/30 shadow-sm relative overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden shadow-xs border border-[#D68B98]/25 bg-[#FAF1F3]">
                <img
                  src="https://i.postimg.cc/T3rB3TgC/standing-together-lounge.jpg"
                  alt="דלית כורה ואלסי זיסלמן - מייסדות בין לבין"
                  className="w-full h-[300px] sm:h-[400px] md:h-[460px] object-cover object-top"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/dalit-and-elsie.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2422]/65 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">דלית כורה & אלסי זיסלמן</h3>
                    <p className="text-sm text-white/90 font-medium mt-0.5">מייסדות ושותפות בבית "בין לבין"</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-right space-y-3 text-base sm:text-lg text-[#2C2422]/90 leading-relaxed">
                <p>
                  הקמנו את <span className="font-semibold text-[#982D49]">"בין לבין"</span> מתוך תשוקה אמיתית לייצר עבור נשים מרחבי מפגש מעוררי השראה, שמחברים בין ידע מקצועי מעמיק לחום אנושי, הקשבה ושותפות.
                </p>
                <p>
                  אנחנו פועלות יחד כצוות מוביל, מתוך כבוד רב לניסיון החיים של כל אישה שמצטרפת אלינו, ומתוך אמונה שבכל גיל ובכל שלב יש עוד רבדים לגלות, להתפתח וליהנות מהם.
                </p>
              </div>
            </div>
          </div>

          {/* Individual Bio Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Dalit */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D68B98]/20 shadow-xs text-right space-y-4 flex flex-col justify-between">
              <div>
                <div className="border-b border-[#D68B98]/15 pb-4 mb-4">
                  <h4 className="text-2xl font-bold text-[#982D49] font-display">דלית כורה</h4>
                  <p className="text-sm text-[#476653] font-semibold mt-1">הוגה ומובילת התוכניות</p>
                </div>
                <div className="space-y-3 text-base text-[#2C2422]/90 leading-relaxed font-normal">
                  <p>
                    בעלת ניסיון רב בהובלת קהילות נשים, בפיתוח תוכן ובהפקת תוכניות ואירועים. ב"בין לבין" דלית הופכת רעיונות לחוויות משמעותיות, ומובילה את התוכניות משלב הרעיון ועד לביצוע, תוך הקפדה על התמונה הגדולה והפרטים הקטנים.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#D68B98]/15">
                <a
                  href={`https://wa.me/${CONTACTS.dalit.cleanNumber}?text=${CONTACTS.dalit.message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAF1F3] hover:bg-[#982D49] text-[#982D49] hover:text-white rounded-full text-sm font-bold transition-all w-full justify-center border border-[#982D49]/20 shadow-2xs cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>שיחה עם דלית בווטסאפ</span>
                </a>
              </div>
            </div>

            {/* Elsie */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#476653]/20 shadow-xs text-right space-y-4 flex flex-col justify-between">
              <div>
                <div className="border-b border-[#476653]/15 pb-4 mb-4">
                  <h4 className="text-2xl font-bold text-[#476653] font-display">אלסי זיסלמן</h4>
                  <p className="text-sm text-[#982D49] font-semibold mt-1">מנחה ומרצה, טריינרית NLP</p>
                </div>
                <div className="space-y-3 text-base text-[#2C2422]/90 leading-relaxed font-normal">
                  <p>
                    בעלת ניסיון בליווי תהליכים אישיים וקבוצתיים ובהנחיית נשים. ב"בין לבין" אלסי מובילה את השיח וההתנסויות, משלבת כלים מעולם ה־NLP ומסייעת להפוך תובנות לבחירות ולצעדים מעשיים.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#476653]/15">
                <a
                  href={`https://wa.me/${CONTACTS.elsie.cleanNumber}?text=${CONTACTS.elsie.message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F2F6F3] hover:bg-[#476653] text-[#476653] hover:text-white rounded-full text-sm font-bold transition-all w-full justify-center border border-[#476653]/20 shadow-2xs cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>שיחה עם אלסי בווטסאפ</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS (מה אומרות המשתתפות) */}
      <section id="testimonials" className="py-16 md:py-24 bg-[#FAF4F0] border-b border-[#D68B98]/20 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#D68B98]/30 text-xs sm:text-sm font-bold text-[#476653] shadow-2xs mb-3">
              <Heart size={14} className="text-[#982D49] fill-[#982D49]" />
              <span>סדנאות "בין לבין"</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#982D49] font-display">
              משתתפות ממליצות מהלב
            </h2>
            <div className="w-16 h-0.5 bg-[#D68B98] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-right">
            {TESTIMONIALS.map((t, idx) => {
              const isBurgundy = t.accent === 'burgundy';
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D68B98]/25 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
                >
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${
                      isBurgundy ? 'bg-[#FAF1F3] text-[#982D49]' : 'bg-[#F2F6F3] text-[#476653]'
                    }`}
                  >
                    <span className="text-xl font-serif">“</span>
                  </div>

                  <p className="text-base sm:text-lg md:text-xl text-[#2C2422]/90 font-medium leading-relaxed mb-6 font-display">
                    "{t.quote}"
                  </p>

                  <div className="pt-4 border-t border-[#D68B98]/15 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-xs ${
                          isBurgundy ? 'bg-[#982D49]' : 'bg-[#476653]'
                        }`}
                      >
                        {t.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-[#2C2422] font-display">{t.author}</h4>
                        <p className="text-xs text-[#2C2422]/60 font-medium">משתתפת בסדנאות "בין לבין"</p>
                      </div>
                    </div>
                    {t.tag && (
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold hidden sm:inline-block ${
                          isBurgundy ? 'bg-[#FAF1F3] text-[#982D49]' : 'bg-[#F2F6F3] text-[#476653]'
                        }`}
                      >
                        {t.tag}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. WHAT YOU GET (מה את מקבלת בתוכנית) */}
      <section id="what-you-get" className="py-16 md:py-24 bg-[#FFFCF8] border-b border-[#D68B98]/20 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm font-semibold tracking-wider text-[#476653]">הערך והתועלות</span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[#982D49] font-display">
              מה את מקבלת בתוכנית?
            </h2>
            <div className="w-16 h-0.5 bg-[#D68B98] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 text-right">
            {[
              {
                title: '5 מפגשים חווייתיים (2.5–3 שעות בכל מפגש)',
                description: 'סה"כ 12.5–15 שעות של תוכן איכותי, התנסויות סדנאיות ושיח פתוח במרחב נשי אינטימי ונעים.'
              },
              {
                title: 'הרצאות ומפגשים עם נשות מקצוע מנוסות',
                description: 'ידע, כלים ונקודות מבט חדשות בנושאים שנוגעים לחיים שלך היום: שינויים, מערכות יחסים, בריאות, חברות, בחירה ועוד.'
              },
              {
                title: 'הובלה והנחיה מקצועית לאורך התוכנית',
                description: 'דלית כורה, הוגה ומובילת התוכניות, ואלסי זיסלמן, מנחה, מרצה וטריינרית NLP, מלוות את המפגשים ויוצרות את החיבור בין התוכן, ההתנסות והשיח הקבוצתי.'
              },
              {
                title: 'קבוצת ווטסאפ מלווה',
                description: 'מרחב לעדכונים, שיתוף והמשך השיח והקשרים שנוצרים בין המפגשים.'
              },
              {
                title: 'אירוח וכיבוד קל ומפנק',
                description: 'אווירה חמה ומזמינה שמאפשרת להרגיש בנוח, להכיר ולהתחבר.'
              },
              {
                title: 'חומרים אישיים והפתעות קטנות',
                description: 'כלים יישומיים והפתעות שנבחרו במיוחד עבור המשתתפות.'
              },
              {
                title: 'הרבה יותר מסדרת הרצאות',
                description: 'הזדמנות להכיר נשים חדשות, ללמוד זו מזו, ליהנות יחד ולצאת עם תובנות וכלים שאפשר לקחת הלאה.',
                isFullWidth: true
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-6 sm:p-7 border border-[#D68B98]/25 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-start ${
                  item.isFullWidth ? 'md:col-span-2 bg-gradient-to-r from-white via-[#FAF4F0]/50 to-white border-[#982D49]/30' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#982D49] mt-2 shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#982D49] font-display leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-base sm:text-lg text-[#2C2422]/90 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => scrollToContact()}
              className="px-8 py-3.5 text-base font-bold text-white bg-[#982D49] hover:bg-[#7A2139] rounded-full shadow-md transition-all cursor-pointer"
            >
              השאירי פרטים להרשמה
            </button>
          </div>
        </div>
      </section>

      {/* 8. SCHEDULE & PRICING PLANS */}
      <section id="schedule" className="py-16 md:py-24 bg-[#FAF0F2] border-b border-[#D68B98]/20 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm font-semibold tracking-wider text-[#476653]">מידע, מועדים והרשמה</span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[#982D49] font-display">
              כל הפרטים שכדאי לדעת
            </h2>
            <div className="w-16 h-0.5 bg-[#D68B98] mx-auto mt-4 rounded-full" />
          </div>

          {/* 3 Overview Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-right mb-10">
            {/* When */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D68B98]/25 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF1F3] text-[#982D49] flex items-center justify-center shrink-0">
                    <Calendar size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-[#982D49] font-display">מתי מתחילות?</h3>
                </div>
                <p className="text-base text-[#2C2422]/90 leading-relaxed font-normal">
                  המחזור הקרוב של "עוד לפנייך" מתוכנן לצאת לדרך בקרוב. התאריכים המדויקים יימסרו לנרשמות מראש.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#D68B98]/15 flex items-center gap-2 text-xs font-semibold text-[#476653]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#476653]" />
                <span>המועדים המדויקים יימסרו לנרשמות מראש</span>
              </div>
            </div>

            {/* Where */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D68B98]/25 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F2F6F3] text-[#476653] flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-[#476653] font-display">איפה נפגשות?</h3>
                </div>
                <p className="text-base text-[#2C2422]/90 leading-relaxed font-normal">
                  בכפר סבא. בחלל אינטימי, נעים, נגיש ומזמין המותאם במיוחד לאופי המפגשים.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#476653]/15 flex items-center gap-2 text-xs font-semibold text-[#476653]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#476653]" />
                <span>חלל אינטימי, נעים, נגיש ומזמין</span>
              </div>
            </div>

            {/* Structure */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D68B98]/25 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF1F3] text-[#982D49] flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-[#982D49] font-display">מבנה המפגשים</h3>
                </div>
                <p className="text-base text-[#2C2422]/90 leading-relaxed font-normal">
                  5 מפגשים, אחת לשבוע, בני שעתיים וחצי עד שלוש שעות כל אחד.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#D68B98]/15 flex items-center gap-2 text-xs font-semibold text-[#982D49]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#982D49]" />
                <span>משלב תוכן מקצועי, שיח חופשי וכיבוד מפנק</span>
              </div>
            </div>
          </div>

          {/* Full Series Notice */}
          <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-white border border-[#D68B98]/30 shadow-xs text-right space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-[#982D49] font-bold text-base sm:text-lg">
                <AlertCircle size={20} className="shrink-0" />
                <span>הרשמה לסדרה המלאה</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF1F3] border border-[#D68B98]/40 text-[#982D49] text-xs font-black">
                מס' המקומות מוגבל – מהרי לשריין מקומך!
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#2C2422]/90 leading-relaxed font-normal">
              ההרשמה היא לכל חמשת המפגשים, כדי לאפשר היכרות, אינטימיות ופתיחות בקבוצה, וליצור תהליך משותף שנבנה ממפגש למפגש.{' '}
              <span className="text-[#982D49] font-semibold">(אין אפשרות לרכישת מפגש בודד).</span>
            </p>
            <p className="text-xs sm:text-sm text-[#476653] font-semibold pt-1">
              • מספר המקומות מוגבל, כדי לשמור על האווירה האינטימית והאישית שמאפיינת את המפגשים. מהרי לשריין מקומך.
            </p>
          </div>

          {/* Pricing Cards Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#982D49] font-display">אפשרויות הרשמה והטבות</h3>
            <p className="text-sm text-[#476653] font-medium mt-1">בחרי את האפשרות המתאימה לך ביותר</p>
          </div>

          {/* 3 Tier Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-right items-stretch">
            
            {/* Regular */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D68B98]/30 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold text-[#2C2422] font-display">הרשמה רגילה</h4>
                <div className="mt-4 mb-3">
                  <div className="text-4xl sm:text-5xl font-black text-[#982D49] font-display tracking-tight">
                    750 ₪
                  </div>
                  <div className="text-sm font-semibold text-[#476653] mt-1">150 ₪ למפגש</div>
                </div>
                <div className="pt-3 border-t border-[#D68B98]/20 space-y-2">
                  <div className="text-lg font-bold text-[#2C2422]">5 מפגשים</div>
                  <p className="text-sm sm:text-base text-[#2C2422]/85 leading-relaxed">
                    כל התכנים והחוויות של התוכנית.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#D68B98]/15">
                <button
                  onClick={() => scrollToContact('הרשמה רגילה (750 ₪)')}
                  className="w-full py-3 px-4 text-sm font-bold text-[#982D49] bg-[#FAF1F3] hover:bg-[#982D49] hover:text-white rounded-full transition-colors cursor-pointer text-center"
                >
                  השאירי פרטים להרשמה
                </button>
              </div>
            </div>

            {/* Early Bird Kfar Saba */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D68B98]/30 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#476653]">עד 30.11.26</span>
                  <span className="text-xs font-semibold text-[#982D49]">עיריית כפר סבא</span>
                </div>
                <h4 className="text-xl font-bold text-[#2C2422] font-display">הרשמה מוקדמת</h4>
                <p className="text-xs sm:text-sm text-[#476653] font-medium mt-0.5">
                  במסגרת ההפי האוור של עיריית כפר סבא
                </p>

                <div className="my-3.5 p-3.5 bg-[#FAF1F3] border border-[#D68B98]/50 rounded-2xl text-center">
                  <span className="block text-lg font-bold text-[#982D49]">מפגש בונוס מתנה</span>
                  <span className="block text-xs text-[#476653] font-medium mt-1">
                    במסגרת ההפי האוור של עיריית כפר סבא · בהרשמה עד 30.11.26
                  </span>
                </div>

                <div className="py-2.5 px-3 bg-[#F9F1EA]/70 rounded-xl border border-[#D68B98]/20 text-center my-2">
                  <div className="text-base sm:text-lg font-bold text-[#2C2422]">
                    6 מפגשים במחיר של 5 מפגשים
                  </div>
                </div>

                <div className="mt-3 mb-2">
                  <div className="text-4xl sm:text-5xl font-black text-[#982D49] font-display tracking-tight">
                    750 ₪
                  </div>
                  <div className="text-sm font-semibold text-[#476653] mt-1">125 ₪ למפגש</div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#D68B98]/15">
                <button
                  onClick={() => scrollToContact('הרשמה מוקדמת - עיריית כפר סבא (750 ₪)')}
                  className="w-full py-3 px-4 text-sm font-bold text-[#982D49] bg-[#FAF1F3] hover:bg-[#982D49] hover:text-white rounded-full transition-colors cursor-pointer text-center"
                >
                  השאירי פרטים
                </button>
              </div>
            </div>

            {/* Friend Brings Friend - Featured */}
            <div className="bg-[#FFF5F7] rounded-3xl p-6 sm:p-7 border-2 border-[#982D49] shadow-md flex flex-col justify-between relative">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-[#982D49] text-white shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>הכי משתלם</span>
                  </span>
                  <span className="text-xs font-semibold text-[#982D49]">עד 30.11.26</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-[#982D49] font-display">חברה מביאה חברה</h4>

                <div className="mt-4 mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-[#982D49] font-display tracking-tight">
                      710 ₪
                    </span>
                    <span className="text-base font-bold text-[#982D49]">לכל אחת</span>
                  </div>
                  <div className="text-sm font-semibold text-[#2C2422]/60 line-through mt-0.5">
                    במקום 750 ₪
                  </div>
                </div>

                <div className="my-3.5 p-3.5 bg-[#982D49] text-white rounded-2xl text-center shadow-xs space-y-1">
                  <span className="block text-lg sm:text-xl font-black font-display tracking-tight text-white">
                    כפל מבצעים !!
                  </span>
                  <span className="block text-sm font-bold text-[#F4D0D8]">מעל 5% הנחה</span>
                  <span className="block text-sm font-bold text-white">מפגש בונוס חינם</span>
                </div>

                <div className="pt-2 border-t border-[#982D49]/20 space-y-1">
                  <p className="text-sm font-bold text-[#982D49]">בתוקף לשתיכן בהרשמה עד 30.11.26</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#982D49]/20 space-y-2.5">
                <button
                  onClick={() => scrollToContact('חברה מביאה חברה - כפל מבצעים (710 ₪ לכל אחת)')}
                  className="w-full py-3.5 px-4 text-sm font-bold text-white bg-[#982D49] hover:bg-[#7A2139] rounded-full transition-colors cursor-pointer text-center shadow-xs"
                >
                  שריינו מקום יחד (710 ₪)
                </button>
                <ShareButton variant="pill" text="שתפי עם חברה" size="sm" className="w-full justify-center" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. REGISTRATION FORM (יצירת קשר והרשמה) */}
      <section id="contact" className="py-20 md:py-28 bg-[#982D49] text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#476653]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
            <span className="text-sm font-semibold tracking-wider text-[#F4E2E5]">יצירת קשר</span>
            <h2 className="mt-1 text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white">
              מסקרן אותך? נשמח להכיר!
            </h2>
            <div className="space-y-3 text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              <p>
                לא צריך להגיע עם שאלת שינוי גדולה. מספיק קצת סקרנות, רצון לחוות משהו חדש ולהכיר נשים נוספות.
              </p>
              <p className="font-bold text-white text-lg sm:text-xl">
                רוצה לשמוע עוד ולהתעדכן לפני כולן? השאירי פרטים ונחזור אלייך אישית.
              </p>
            </div>
            <div className="inline-block mt-3 p-3.5 sm:p-4 bg-white/20 backdrop-blur-xs rounded-2xl border border-white/40 text-white shadow-sm text-sm sm:text-base font-black">
              <span>⚡ מס' המקומות מוגבל – מהרי לשריין מקומך!</span>
            </div>
          </div>

          <div className="bg-[#FFFCF8] text-[#2C2422] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border border-white/20 max-w-xl mx-auto">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#EBF1ED] text-[#476653] mx-auto flex items-center justify-center">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-[#982D49] font-display">
                  תודה רבה, {submittedLead?.fullName}!
                </h3>
                <div className="p-3 bg-[#FAF1F3] rounded-2xl border border-[#982D49]/30 text-center space-y-1">
                  <span className="text-xs font-semibold text-[#476653] block">המסלול שבחרת:</span>
                  <span className="text-base font-black text-[#982D49] block">{submittedLead?.selectedPlan}</span>
                </div>
                <p className="text-base text-[#2C2422]/85 leading-relaxed max-w-md mx-auto">
                  פרטייך נשמרו בהצלחה במערכת. נחזור אלייך בהקדם באהבה עם כל הפרטים לקראת פתיחת המחזור הקרוב של "עוד לפנייך".
                </p>

                <div className="pt-2 p-4 bg-[#FAF1F3] rounded-2xl border border-[#D68B98]/30 max-w-md mx-auto space-y-2 text-center">
                  <p className="text-sm font-bold text-[#982D49]">
                    רוצה לבוא עם חברה וליהנות מ־"גם הנחה וגם מפגש במתנה"?
                  </p>
                  <ShareButton variant="primary" text="שתפי חברה בווטסאפ" size="md" className="w-full justify-center" />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/${CONTACTS.dalit.cleanNumber}?text=${dalitInquiryMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#476653] hover:bg-[#385242] text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>שיחה עם דלית בווטסאפ</span>
                  </a>
                  <a
                    href={`https://wa.me/${CONTACTS.elsie.cleanNumber}?text=${elsieInquiryMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#476653] hover:bg-[#385242] text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>שיחה עם אלסי בווטסאפ</span>
                  </a>
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleResetForm}
                    className="text-xs text-[#2C2422]/60 hover:text-[#982D49] underline cursor-pointer"
                  >
                    השארת פרטים למשתתפת נוספת
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-right" noValidate>
                {/* Plan Selection */}
                <div>
                  <label className="block text-sm font-bold text-[#982D49] mb-1.5 flex items-center justify-between">
                    <span>באיזו אפשרות הרשמה את מתעניינת?</span>
                    <span className="text-xs font-normal text-[#476653]">ניתן לשנות בכל שלב</span>
                  </label>
                  <div className="space-y-2">
                    {REGISTRATION_PLANS.map((plan) => {
                      const isSelected = selectedPlan === plan.name;
                      return (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.name)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-right ${
                            isSelected
                              ? 'bg-[#FAF1F3] border-2 border-[#982D49] shadow-xs'
                              : 'bg-white border-[#D68B98]/30 hover:border-[#982D49]/40'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? 'border-[#982D49] bg-[#982D49]' : 'border-gray-400 bg-white'
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-sm text-[#2C2422] truncate">{plan.shortLabel}</div>
                              <div className="text-xs text-[#476653] font-medium truncate">{plan.benefit}</div>
                            </div>
                          </div>
                          <div className="text-left shrink-0 mr-2">
                            <span className="font-black text-sm text-[#982D49]">{plan.price}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-[#2C2422] mb-1">
                    שם מלא <span className="text-[#982D49]">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: undefined });
                    }}
                    placeholder="לדוגמה: שרה ישראלי"
                    className={`w-full px-4 py-2.5 rounded-xl border text-base bg-white focus:outline-none transition-all ${
                      formErrors.fullName
                        ? 'border-red-400 ring-2 ring-red-100'
                        : 'border-[#D68B98]/40 focus:border-[#982D49] focus:ring-2 focus:ring-[#982D49]/10'
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle size={13} />
                      <span>{formErrors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#2C2422] mb-1">
                    מספר טלפון <span className="text-[#982D49]">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                    }}
                    placeholder="050-1234567"
                    className={`w-full px-4 py-2.5 rounded-xl border text-base bg-white text-right focus:outline-none transition-all ${
                      formErrors.phone
                        ? 'border-red-400 ring-2 ring-red-100'
                        : 'border-[#D68B98]/40 focus:border-[#982D49] focus:ring-2 focus:ring-[#982D49]/10'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle size={13} />
                      <span>{formErrors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#2C2422] mb-1">
                    כתובת דוא"ל <span className="text-xs font-normal text-[#2C2422]/60">(שדה רשות)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                    }}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-2.5 rounded-xl border text-base bg-white text-right focus:outline-none transition-all ${
                      formErrors.email
                        ? 'border-red-400 ring-2 ring-red-100'
                        : 'border-[#D68B98]/40 focus:border-[#982D49] focus:ring-2 focus:ring-[#982D49]/10'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle size={13} />
                      <span>{formErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#2C2422] mb-1">
                    כמה מילים / שאלות <span className="text-xs font-normal text-[#2C2422]/60">(שדה רשות)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="נשמח לשמוע מה מעניין אותך, שאלות או כל דבר שתרצי לשתף..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D68B98]/40 text-base bg-white focus:outline-none focus:border-[#982D49] focus:ring-2 focus:ring-[#982D49]/10 transition-all resize-none"
                  />
                </div>

                {/* Updates consent */}
                <div className="pt-1 flex items-start gap-2.5">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={consentUpdates}
                    onChange={(e) => setConsentUpdates(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#982D49] focus:ring-[#982D49] border-gray-300 accent-[#982D49] cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-[#2C2422]/80 leading-normal cursor-pointer select-none">
                    אשמח לקבל עדכונים, מועדים ותכנים על תוכניות וריטריטים מבית "בין לבין" (ניתן להסיר בכל עת).
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 text-base sm:text-lg font-bold text-white bg-[#982D49] hover:bg-[#7A2139] active:scale-[0.99] rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 min-h-[50px]"
                  >
                    <Send size={18} className="rotate-180" />
                    <span>{isSubmitting ? 'שומרת פרטים...' : 'גם אני רוצה לגלות מה עוד לפניי'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-[#2C2422]/60 pt-1">
                  <ShieldCheck size={12} />
                  <span>הפרטים שלך נשמרים אצלנו בפרטיות מוחלטת ולא יועברו לאיש</span>
                </div>
              </form>
            )}
          </div>

          {/* Personal contact options */}
          <div className="mt-10 text-center space-y-4">
            <p className="text-base text-white/95 font-medium">
              מעדיפה שיחה אישית? נשמח לשוחח, לספר לך על התוכנית ולענות על כל שאלה:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href={`https://wa.me/${CONTACTS.dalit.cleanNumber}?text=${dalitInquiryMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-[#476653] hover:text-[#982D49] hover:bg-[#F9F1EA] text-sm sm:text-base font-bold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer w-full sm:w-auto justify-center"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                <span>שיחה עם דלית בווטסאפ ({CONTACTS.dalit.phone})</span>
              </a>
              <a
                href={`https://wa.me/${CONTACTS.elsie.cleanNumber}?text=${elsieInquiryMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-[#476653] hover:text-[#982D49] hover:bg-[#F9F1EA] text-sm sm:text-base font-bold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer w-full sm:w-auto justify-center"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                <span>שיחה עם אלסי בווטסאפ ({CONTACTS.elsie.phone})</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. COMPACT PROGRAM TABS - OTHER PROGRAMS NAVIGATION */}
      <section className="py-12 px-4 sm:px-6 bg-[#FAF1F3] border-t border-[#D68B98]/30">
        <div className="max-w-5xl mx-auto">
          <OtherProgramsNav currentProgramId="ahead-of-you" />
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-[#FAF1F3] text-[#2C2422] pt-14 pb-10 border-t-2 border-[#D68B98]/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-10 border-b border-[#D68B98]/25">
            <div className="md:col-span-3 flex justify-center md:justify-start">
              <div className="p-3 bg-white rounded-3xl border border-[#D68B98]/30 shadow-xs inline-flex items-center justify-center">
                <img
                  src="/bein-levein-logo.png"
                  alt="בין לבין - מרחבים לנשים"
                  className="w-28 h-28 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/logos/brand-main.png';
                  }}
                />
              </div>
            </div>

            <div className="md:col-span-6 text-center space-y-3">
              <h3 className="text-2xl font-bold font-display text-[#982D49] tracking-wide">
                עוֹד לְפָנַיִךְ | תוכנית לנשים 60+
              </h3>
              <p className="text-sm sm:text-base text-[#2C2422]/85 leading-relaxed max-w-lg mx-auto font-normal">
                מבית "בין לבין" – מרחבים, תוכניות וחוויות לנשים. תוכן מקצועי, שיח פתוח ומפגש חם ומחבר.
              </p>
              <div className="pt-1 flex items-center justify-center gap-2 text-xs font-semibold text-[#476653]">
                <span>דלית כורה</span>
                <span>·</span>
                <span>אלסי זיסלמן</span>
                <span>·</span>
                <span>כפר סבא</span>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col items-center md:items-end gap-2.5">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#982D49] hover:bg-[#982D49] hover:text-white rounded-full text-xs font-bold border border-[#982D49]/30 transition-colors shadow-2xs"
              >
                <span>לאתר הבית של בין לבין</span>
                <ArrowLeft size={14} />
              </a>
              <ShareButton variant="outline" text="שתפי חברה" size="sm" />
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#2C2422]/70 gap-3">
            <p>© {new Date().getFullYear()} "עוֹד לְפָנַיִךְ" מבית "בין לבין" | כל הזכויות שמורות לדלית כורה ואלסי זיסלמן.</p>
            <p>נוצר באהבה עבור נשים 60+</p>
          </div>
        </div>
      </footer>

      {/* 12. FLOATING WHATSAPP BUTTON & POPUP WIDGET */}
      <div ref={waWidgetRef} className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 flex flex-col items-start select-none font-sans">
        {isWaWidgetOpen && (
          <div
            dir="rtl"
            className="mb-3 w-72 sm:w-80 bg-[#FFFCF8] text-[#2C2422] rounded-3xl shadow-2xl border border-[#D68B98]/30 p-5 animate-in fade-in slide-in-from-bottom-3 duration-200"
          >
            <div className="flex items-center justify-between border-b border-[#D68B98]/20 pb-3 mb-3 text-right">
              <div>
                <h4 className="text-base font-bold text-[#982D49] font-display">שיחה אישית בווטסאפ</h4>
                <p className="text-xs text-[#476653] font-medium">תוכנית "עוֹד לְפָנַיִךְ" · מבית בין לבין</p>
              </div>
              <button
                onClick={() => setIsWaWidgetOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#2C2422]/60 hover:text-[#982D49] hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="סגירה"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-[#2C2422]/80 leading-relaxed mb-4 text-right">
              שלום! נשמח לשוחח, לענות על שאלות ולספר לך על המפגשים הקרובים:
            </p>

            <div className="space-y-2">
              <a
                href={`https://wa.me/${CONTACTS.dalit.cleanNumber}?text=${CONTACTS.dalit.message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3.5 bg-[#FAF1F3] hover:bg-[#982D49] text-[#982D49] hover:text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-between border border-[#982D49]/20"
              >
                <div className="flex items-center gap-2">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>שיחה עם דלית כורה</span>
                </div>
                <span className="text-[10px] opacity-75">{CONTACTS.dalit.phone}</span>
              </a>

              <a
                href={`https://wa.me/${CONTACTS.elsie.cleanNumber}?text=${CONTACTS.elsie.message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3.5 bg-[#F2F6F3] hover:bg-[#476653] text-[#476653] hover:text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-between border border-[#476653]/20"
              >
                <div className="flex items-center gap-2">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>שיחה עם אלסי זיסלמן</span>
                </div>
                <span className="text-[10px] opacity-75">{CONTACTS.elsie.phone}</span>
              </a>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsWaWidgetOpen(!isWaWidgetOpen)}
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
          aria-label="פתיחת שיחה אישית בווטסאפ עם דלית ואלסי"
        >
          <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white transition-transform duration-300 group-hover:scale-110" />
          <span className="sr-only">וואטסאפ בין לבין</span>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#982D49] border-2 border-white" />
          </span>
        </button>
      </div>

    </div>
  );
};

export default AheadOfYouMiniPage;
