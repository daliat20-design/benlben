import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Dumbbell, 
  Heart, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MapPin, 
  Users, 
  ChevronDown, 
  MessageCircle, 
  Share2, 
  ShieldCheck, 
  Flame, 
  Smile, 
  Calendar,
  Flower2,
  X
} from 'lucide-react';
import { ButterflyIcon } from '../components/Hero';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { SPEAKERS, TEAM } from '../constants';
import { Speaker } from '../types';
import { saveInquiry } from '../utils/inquiryStorage';

// 4 Sessions Tailored for Fitness Gym Trainees (Ages 45-55)
const SOUL_SESSIONS = [
  {
    id: 'change',
    theme: 'תסמינים בגיל המעבר',
    leadingValue: 'קבלה',
    title: 'כשזה מתחיל להשתנות',
    subtitle: 'תסמינים בגיל המעבר (גם אם את לא יודעת) הם כבר שם',
    description: 'את מתאמנת, אוכלת נכון ומשקיעה בגוף – אבל פתאום השינה משתבשת, מצב הרוח קופץ, רמות האנרגיה משתנות ומשקל הגוף מתנהג אחרת. במפגש נצלול לעומק השינויים ההורמונליים והפיזיים, ננפץ מיתוסים ונבין איך לזהות את הסימנים המוקדמים בגילאי \u200E45-55\u200E עוד לפני שהם הופכים למשבר.',
    nlpHighlight: 'כלי NLP למפגש: טכניקות עוגן וויסות רגשי להתמודדות עם רגעי סערה, מתח וחוסר ודאות גופנית מתוך קבלה עצמית.',
    expertField: 'הרצאת מומחית: ליווי תהליכי שינוי, חוסן פיזיולוגי וקבלת החלטות בגיל המעבר',
    badgeColor: 'bg-[#0E7490] text-white',
    cardBorder: 'border-[#0E7490]/30',
    iconBg: 'bg-[#0E7490]/10 text-[#0E7490]'
  },
  {
    id: 'strength',
    theme: 'תזונה ואנרגיה',
    leadingValue: 'איזון',
    title: 'להחזיר לעצמי כח',
    subtitle: 'תזונה מדויקת לאימון, לחיוניות ולאיזון הורמונלי',
    description: 'הגוף שלך באימון דורש מענה תזונתי שונה לחלוטין בתקופת אמצע החיים. נדבר על תזונה נשית מותאמת, צפיפות עצם, מסת שריר, שמירה על אנרגיה יציבה לאורך היום, חילוף חומרים ואיזון הורמונלי טבעי. ידע מעשי שמתחבר ישירות לאורח החיים הספורטיבי שלך.',
    nlpHighlight: 'כלי NLP למפגש: שינוי דפוסי אכילה אוטומטיים וחיזוק הדימוי הגופני החיובי מתוך כבוד ואיזון לגוף הבוגר.',
    expertField: 'הרצאת מומחית: נטורופתיה, תזונה טבעית מותאמת ואורח חיים בריא בגילאי \u200E45-55\u200E',
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
    nlpHighlight: 'כלי NLP למפגש: תקשורת מקרבת, שפת השפעה והגדרת גבולות וצרכים אינטימיים בביטחון ובקרבה.',
    expertField: 'הרצאת מומחית: ייעוץ זוגי ומיני וליווי אינטימיות בגיל המעבר',
    badgeColor: 'bg-[#0E7490] text-white',
    cardBorder: 'border-[#0E7490]/30',
    iconBg: 'bg-[#0E7490]/10 text-[#0E7490]'
  },
  {
    id: 'trust',
    theme: 'משפחה, זהות ועצמי',
    leadingValue: 'אמון',
    title: 'בין חיבוק לשחרור',
    subtitle: 'המשפחה, הבחירה והזמן שאת מחזירה לעצמך',
    description: 'הילדים גדלים, המשפחה בתנועה, והעומס היומיומי של קריירה ובית שואב אותנו בלי הפסקה. במפגש הסיום נעצור להתבונן בך – איפה את נמצאת בתוך כל המשוואה הזו? איך מפנים מקום אמיתי לרצונות שלך, מנהלים את האנרגיה מול המשפחה, ומגלים את הפרק הבא שלך מתוך אמון, שמחה, בהירות ועוצמה.',
    nlpHighlight: 'כלי NLP למפגש: איסוף התהליך, בניית חזון אישי לעשור הבא ועיגון מוטיבציה מתוך אמון עצמי.',
    expertField: 'הרצאת מומחית והנחיית NLP: טריינרית NLP, ייעוץ אישי ויצירת פריצות דרך',
    badgeColor: 'bg-[#C56B3E] text-white',
    cardBorder: 'border-[#C56B3E]/30',
    iconBg: 'bg-[#C56B3E]/10 text-[#C56B3E]'
  }
];

export const SoulTrainingPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gymTrack, setGymTrack] = useState('מתאמנת במכון הכושר של רעות');
  const [questions, setQuestions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [expandedSpeakers, setExpandedSpeakers] = useState<Record<number, boolean>>({});

  const toggleSpeakerBio = (idx: number) => {
    setExpandedSpeakers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  useEffect(() => {
    document.title = "אמצע החיים - אימון לנשמה | בשיתוף מכון הכושר של רעות | בין לבין";
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const whatsappMessage = encodeURIComponent(
    "היי דלית ואלסי, קראתי על סדנת 'אמצע החיים - אימון לנשמה' בשיתוף מכון הכושר של רעות ואשמח לשמוע פרטים נוספים!"
  );
  const whatsappUrl = `https://wa.me/972508353731?text=${whatsappMessage}`;

  const scrollToInterest = () => {
    const el = document.getElementById('soul-interest');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSessions = () => {
    const el = document.getElementById('soul-sessions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "אמצע החיים - אימון לנשמה | בשיתוף מכון הכושר של רעות",
          text: "את משקיעה באימון לגוף כל השנה – מתי השקעת באימון לנפש? סדנה בת 4 מפגשים לנשים \u200E45-55\u200E מבית בין לבין.",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setFormError('נא למלא שם מלא ומספר טלפון');
      return;
    }
    setFormError(null);
    setIsSubmitting(true);

    try {
      await saveInquiry({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        programs: ['אמצע החיים - אימון לנשמה (מכון הכושר של רעות)'],
        notes: `מכון כושר: ${gymTrack}. שאלות: ${questions.trim() || 'אין'}`,
        submittedAt: new Date().toISOString(),
        source: 'אמצע החיים - אימון לנשמה (רעות)',
        audienceType: 'private'
      });

      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch {
      setIsSubmitting(false);
      setFormError('אירעה שגיאה קלה בשמירה. ניתן לפנות ישירות בוואטסאפ.');
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#0E7490]/20 selection:text-[#083344] bg-[#F8FAFC] text-slate-800 overflow-x-clip" dir="rtl">
      
      {/* 1. TOP STICKY NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#0E7490]/20 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-3">
          
          {/* Logo & Collaboration Pill */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white p-1 border-2 border-[#0E7490]/30 shadow-xs flex items-center justify-center shrink-0">
              <img
                src="/logos/midlife.webp"
                alt="לוגו אמצע החיים"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/logos/midlife.png';
                }}
              />
            </div>
            <div className="text-right">
              <div className="text-base sm:text-xl font-black text-[#0E7490] tracking-tight leading-tight flex items-center gap-1.5">
                <span>אמצע החיים</span>
                <span className="text-[#C56B3E]">✦</span>
                <span className="text-[#C56B3E]">אימון לנשמה</span>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-500">
                בשיתוף מכון הכושר של רעות & בית "בין לבין"
              </div>
            </div>
          </div>

          {/* Nav Links Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
            <button onClick={scrollToSessions} className="hover:text-[#0E7490] transition-colors cursor-pointer">
              4 המפגשים
            </button>
            <a href="#speakers" className="hover:text-[#0E7490] transition-colors">
              נבחרת המרצות
            </a>
            <a href="#about" className="hover:text-[#0E7490] transition-colors">
              על הסדנה
            </a>
            <a href="#team" className="hover:text-[#0E7490] transition-colors">
              מובילות התוכנית
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleShare}
              className="p-2 sm:px-3 sm:py-2 rounded-full bg-[#0E7490]/10 hover:bg-[#0E7490]/20 text-[#0E7490] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="שתפי מתאמנת"
            >
              <Share2 size={16} />
              <span className="hidden sm:inline">שתפי חברה</span>
            </button>
            <button
              onClick={scrollToInterest}
              className="px-4 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0E7490] to-[#0891B2] hover:from-[#0891B2] hover:to-[#0E7490] text-white text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              שמרי לי מקום
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-10 sm:pt-14 md:pt-18 pb-14 sm:pb-20 md:pb-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#F0FDF4]/60 via-[#F8FAFC] to-[#EFF6FF]/40">
        
        {/* Background Ambience */}
        <ButterflyIcon size={240} className="absolute -top-10 -right-20 opacity-[0.04] text-[#0E7490] pointer-events-none" />
        <ButterflyIcon size={220} className="absolute bottom-10 -left-10 opacity-[0.04] text-[#C56B3E] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            
            {/* Collaboration Tag */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border-2 border-[#0E7490]/30 shadow-xs text-xs sm:text-sm font-black text-[#0E7490]">
              <Dumbbell className="w-4 h-4 text-[#C56B3E]" />
              <span>בשיתוף בלעדי עם מכון הכושר של רעות</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#C56B3E]">
                נשים בגילאי <span dir="ltr">45-55</span>
              </span>
            </div>

            {/* Main Punchy Motto */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-[#0E7490]/10 via-[#C56B3E]/10 to-[#0E7490]/10 rounded-3xl border border-[#0E7490]/20 max-w-2xl mx-auto shadow-xs">
              <p className="text-lg sm:text-2xl md:text-3xl font-black text-slate-800 leading-snug">
                את משקיעה באימון לגוף כל השנה – <br />
                <span className="text-[#0E7490] underline decoration-[#C56B3E] decoration-wavy underline-offset-8">
                  מתי השקעת באימון לנפש?
                </span>
              </p>
            </div>

            {/* H1 Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#0E7490] tracking-tight leading-[1.08]">
              אמצע החיים <br className="hidden sm:inline" />
              <span className="text-[#C56B3E]">אימון לנשמה</span>
            </h1>

            {/* Subtitle - Exact user copy */}
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-700 max-w-3xl mx-auto leading-relaxed">
              את כבר יודעת איך לפנות זמן לאימון. הפעם אנחנו מזמינות אותך להקדיש את הזמן הזה לעצמך בדרך קצת אחרת. ארבעה מפגשים שיפתחו שיחה על מה שמשתנה באמצע החיים ועל מה שאת רוצה לתת לו יותר מקום
            </p>

            {/* 4 Pillars Highlights - No session numbering, focus on topics & leading values */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl mx-auto text-right">
              <div className="p-3.5 bg-white rounded-2xl border border-[#0E7490]/25 shadow-2xs">
                <div className="text-[11px] font-bold text-[#0E7490]">ערך מוביל: קבלה</div>
                <div className="text-sm sm:text-base font-black text-slate-800 mt-0.5">כשזה מתחיל להשתנות</div>
                <div className="text-[11px] text-slate-500 font-medium mt-1">תסמינים בגיל המעבר</div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-[#C56B3E]/30 shadow-2xs">
                <div className="text-[11px] font-bold text-[#C56B3E]">ערך מוביל: איזון</div>
                <div className="text-sm sm:text-base font-black text-slate-800 mt-0.5">להחזיר לעצמי כח</div>
                <div className="text-[11px] text-slate-500 font-medium mt-1">תזונה ואנרגיה</div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-[#0E7490]/25 shadow-2xs">
                <div className="text-[11px] font-bold text-[#0E7490]">ערך מוביל: קרבה</div>
                <div className="text-sm sm:text-base font-black text-slate-800 mt-0.5">מגע מרחק ומה שביניהם</div>
                <div className="text-[11px] text-slate-500 font-medium mt-1">זוגיות ואינטימיות</div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-[#C56B3E]/30 shadow-2xs">
                <div className="text-[11px] font-bold text-[#C56B3E]">ערך מוביל: אמון</div>
                <div className="text-sm sm:text-base font-black text-slate-800 mt-0.5">בין חיבוק לשחרור</div>
                <div className="text-[11px] text-slate-500 font-medium mt-1">משפחה, זהות ועצמי</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto">
              <button
                onClick={scrollToInterest}
                className="w-full sm:w-auto px-8 py-4 bg-[#0E7490] hover:bg-[#0891B2] active:scale-98 text-white rounded-full text-base sm:text-lg font-black shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>השאירי פרטים להרשמה מוקדמת</span>
                <ChevronDown size={18} className="animate-bounce" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-[#0E7490]/5 text-[#0E7490] border-2 border-[#0E7490]/30 rounded-full text-base font-bold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                <span>דברי איתנו בוואטסאפ</span>
              </a>
            </div>

            {/* Limited spots banner */}
            <p className="text-xs sm:text-sm font-bold text-[#C56B3E] pt-2">
              ⚡ מספר המקומות מוגבל למתאמנות מכון הכושר כדי לשמור על מעגל אינטימי, מעמיק ומחבר.
            </p>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION - WHY SOUL TRAINING */}
      <section id="about" className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-y border-slate-200">
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
              אבל בגילאי <span dir="ltr">45-55</span> משהו נוסף מתחיל להתרחש. לפעמים אלו גלי חום קלים, לפעמים יקיצות באמצע הלילה עם דופק מהיר, לפעמים ירידה בלתי מוסברת באנרגיה, ולפעמים שאלות על הזוגיות, על הילדים שמתבגרים ועל המקום שלך בעולם.
            </p>
            <p className="font-bold text-[#0E7490] text-lg sm:text-xl border-t border-slate-200 pt-3">
              אלו אינם סימני חולשה – אלו סימני הדרך של גיל המעבר.
            </p>
            <p>
              והדרך הטובה ביותר לעבור אותם היא בדיוק כמו באימון: עם ידע מקצועי, ליווי מומחיות, כלים פרקטיים וקבוצה של נשים שנמצאות בדיוק באותו המקום.
            </p>
          </div>

          {/* 3 Core Benefits - Replaced with exact requested copy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            <div className="p-6 bg-gradient-to-b from-[#F0FDF4] to-white rounded-2xl border border-[#0E7490]/20 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-[#0E7490]/15 text-[#0E7490] flex items-center justify-center font-black text-xl mb-3">
                ✦
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">ידע מקצועי בשיחה פתוחה</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                בכל מפגש תפגשי מרצה מומחית בתחומה שתביא איתה ידע מבוסס מחקר ותדבר עליו בגובה העיניים. ההרצאה פתוחה לשיחה כבר מהרגע הראשון. אפשר לשאול תוך כדי, לשתף מניסיונך ולשמוע גם את השאלות של הנשים סביבך. לאורך הסדנה נשלב גם התנסויות מעשיות שיחברו את מה שלמדנו לחיים עצמם.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-b from-[#FFF7ED] to-white rounded-2xl border border-[#C56B3E]/20 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-[#C56B3E]/15 text-[#C56B3E] flex items-center justify-center font-black text-xl mb-3">
                ✦
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">כלים שתוכלי לקחת ליומיום</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                בכל מפגש נתנסה בכלים מעולם ה־NLP. נתרגל איך להגיב אחרת ברגעים של עומס רגשי ואיך לזהות מחשבה שמגבילה אותך ולבחון אותה מחדש.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-b from-[#F0F9FF] to-white rounded-2xl border border-[#0E7490]/20 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-[#0E7490]/15 text-[#0E7490] flex items-center justify-center font-black text-xl mb-3">
                ✦
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">להכיר גם מחוץ לאימון</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                את חלק מהנשים אולי כבר פגשת באימון. כאן יהיה לכן זמן להכיר קצת אחרת, לשתף במה שמתאים לכן ולשמוע איך אחרות פוגשות את אותה תקופה בחיים. כל זה באווירה חמה וכיבוד קל.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUR SESSIONS DETAILS */}
      <section id="soul-sessions" className="py-14 sm:py-22 px-4 sm:px-6 bg-[#F8FAFC] scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-xs sm:text-sm font-black text-[#C56B3E] tracking-widest uppercase bg-[#C56B3E]/10 px-4 py-1.5 rounded-full">
              תוכנית המפגשים
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              4 מפגשים מעצימים לאימון הנפש
            </h2>
            <div className="w-16 h-1 bg-[#0E7490] mx-auto rounded-full mt-3"></div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {SOUL_SESSIONS.map((session) => (
              <div
                key={session.id}
                className={`bg-white rounded-3xl p-6 sm:p-9 md:p-10 border-2 ${session.cardBorder} shadow-sm hover:shadow-md transition-all text-right relative overflow-hidden`}
              >
                <div className="relative z-10 space-y-4">
                  {/* Tag & Leading Value (No session numbering) */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-black ${session.badgeColor}`}>
                      ערך מוביל: {session.leadingValue} • {session.theme}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      סדנת אמצע החיים | אימון לנשמה
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                      {session.title}
                    </h3>
                    <p className="text-base sm:text-xl font-bold text-[#0E7490] mt-1">
                      {session.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                    {session.description}
                  </p>

                  {/* NLP Highlight Box */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0E7490]/10 via-[#0E7490]/5 to-transparent rounded-2xl border-r-4 border-[#0E7490] text-sm sm:text-base font-bold text-slate-800">
                    <span className="text-[#0E7490] font-black">✦ </span>
                    {session.nlpHighlight}
                  </div>

                  {/* Expert Field */}
                  <div className="pt-2 text-xs sm:text-sm font-bold text-slate-500 flex items-center gap-2">
                    <Sparkles size={16} className="text-[#C56B3E] shrink-0" />
                    <span>{session.expertField}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Practical Logistics Card */}
          <div className="mt-10 p-6 sm:p-8 bg-white rounded-3xl border-2 border-slate-200 text-right space-y-4 shadow-xs">
            <h4 className="text-xl sm:text-2xl font-black text-slate-900">
              פרטים נוספים שכדאי לדעת:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm sm:text-base text-slate-700 font-medium">
              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-2xl">
                <Clock className="w-5 h-5 text-[#0E7490] shrink-0" />
                <div>
                  <span className="font-bold block text-slate-900">היקף המפגשים:</span>
                  <span>4 מפגשים שבועיים, שעתיים וחצי כל מפגש</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-2xl">
                <MapPin className="w-5 h-5 text-[#C56B3E] shrink-0" />
                <div>
                  <span className="font-bold block text-slate-900">מיקום ואירוח:</span>
                  <span>בסטודיו של רעות (כולל כיבוד קל)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-2xl">
                <Users className="w-5 h-5 text-[#0E7490] shrink-0" />
                <div>
                  <span className="font-bold block text-slate-900">קבוצה סגורה:</span>
                  <span>מספר משתתפות מוגבל לשמירה על שיח פתוח</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SPEAKERS & EXPERTS POOL */}
      <section id="speakers" className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto text-right">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SPEAKERS.map((speaker, idx) => {
              const isExpanded = !!expandedSpeakers[idx];
              const cleanBio = speaker.bio.replace(/<[^>]+>/g, '');
              const isLongBio = cleanBio.length > 130;

              return (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-100">
                      {speaker.image ? (
                        <img 
                          src={speaker.image} 
                          alt={speaker.name} 
                          className="w-full h-full object-cover"
                          style={{ objectPosition: speaker.imagePosition || 'top' }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl font-black text-[#0E7490]">
                          {speaker.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-1">
                      {speaker.name}
                    </h3>
                    <p className="text-xs font-bold text-[#0E7490] mb-3 leading-snug">
                      {speaker.title}
                    </p>
                    <p className={`text-xs sm:text-sm text-slate-600 leading-relaxed font-normal ${isExpanded ? '' : 'line-clamp-4'}`}>
                      {cleanBio}
                    </p>
                    {isLongBio && (
                      <button
                        type="button"
                        onClick={() => toggleSpeakerBio(idx)}
                        className="mt-2 text-xs font-black text-[#0E7490] hover:text-[#0891B2] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>{isExpanded ? 'הסתר' : 'קראי עוד...'}</span>
                        <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FOUNDERS TEAM (DALIT & ELSIE) */}
      <section id="team" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#F8FAFC] border-t border-slate-200">
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
                          // If Elsie (idx 1 on left in RTL), raise the image so she's positioned higher
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

      {/* 7. REGISTRATION & INTEREST FORM */}
      <section id="soul-interest" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#0E7490] via-[#0891B2] to-[#0E7490] text-white relative">
        <div className="max-w-2xl mx-auto relative z-10 text-right">
          
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs sm:text-sm font-black bg-white/20 text-white px-4 py-1.5 rounded-full border border-white/30">
              הרשמה מוקדמת למתאמנות רעות
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              שמרי לעצמך מקום בסדנה
            </h2>
            <p className="text-base sm:text-xl text-teal-100 font-medium">
              השאירי פרטים ונחזור אלייך עם מועדי הפתיחה המדויקים, מיקום וכל המידע.
            </p>
          </div>

          <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-white/30">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-teal-100 text-[#0E7490] mx-auto flex items-center justify-center">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  תודה רבה, {fullName}!
                </h3>
                <p className="text-base text-slate-600 leading-relaxed max-w-md mx-auto">
                  הפרטים שלך נקלטו בהצלחה. נחזור אלייך בהקדם עם כל המידע והמועדים לקראת פתיחת סדנת "אמצע החיים - אימון לנשמה".
                </p>
                <div className="pt-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E7490] hover:bg-[#0891B2] text-white rounded-full font-bold text-sm transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>שיחה ישירה בוואטסאפ עם דלית ואלסי</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-center gap-2 font-bold">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    שם מלא <span className="text-[#0E7490]">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="שם פרטי ומשפחה"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/10 transition-all text-right"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    טלפון נייד <span className="text-[#0E7490]">*</span>
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="050-1234567"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/10 transition-all text-right"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    דוא״ל <span className="text-xs text-slate-400 font-normal">(שדה רשות)</span>
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/10 transition-all text-right"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    האם את מתאמנת במכון הכושר של רעות?
                  </label>
                  <select
                    value={gymTrack}
                    onChange={(e) => setGymTrack(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/10 transition-all text-right bg-white"
                  >
                    <option value="מתאמנת במכון הכושר של רעות">כן, אני מתאמנת אצל רעות</option>
                    <option value="חברה של מתאמנת / מעוניינת להצטרף יחד">חברה של מתאמנת / רוצה להצטרף יחד</option>
                    <option value="מתעניינת בסדנה באופן עצמאי">מתעניינת בסדנה באופן עצמאי</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    משהו שתרצי לשאול או לספר לנו? <span className="text-xs text-slate-400 font-normal">(שדה רשות)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    placeholder="שאלות, נושאים שחשוב לך לגעת בהם, או כל דבר שתרצי לשתף..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/10 transition-all text-right resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-[#0E7490] hover:bg-[#0891B2] active:scale-99 text-white font-black text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    <Send size={18} className="rotate-180" />
                    <span>{isSubmitting ? 'שומרת פרטים...' : 'שמרי לי מקום בסדנה'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-2">
                  <ShieldCheck size={14} className="text-[#0E7490]" />
                  <span>הפרטים שלך נשמרים בפרטיות מלאה ולא יועברו לאיש.</span>
                </div>
              </form>
            )}
          </div>

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

      {/* 8. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 text-center text-xs sm:text-sm space-y-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="text-right">
            <div className="text-lg font-black text-white">
              אמצע החיים ✦ אימון לנשמה
            </div>
            <div className="text-xs text-slate-400">
              בשיתוף מכון הכושר של רעות & בית "בין לבין | מרחבים לנשים"
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 size={14} />
              <span>שתפי מתאמנת</span>
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

        <p>© {new Date().getFullYear()} "בין לבין | מרחבים לנשים" & מכון הכושר של רעות. כל הזכויות שמורות.</p>
        <p className="text-slate-500 text-xs">
          דף נחיתה ייעודי לשיתוף פעולה. הסדנה מיועדת לנשים בגילאי <span dir="ltr">45-55</span>.
        </p>
      </footer>
    </div>
  );
};

export default SoulTrainingPage;
