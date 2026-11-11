import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Users, Activity, Compass, BookOpen, TrendingUp, Sparkles, Sun, CheckCircle2 } from 'lucide-react';
import { ButterflyIcon } from './ButterflyIcon';

interface SessionItem {
  id: number;
  part: 'A' | 'B';
  partTitle: string;
  value: string;
  title: string;
  subtitle: string;
  description: string;
  professionalPart: string;
  icon: React.ComponentType<any>;
}

const SESSIONS_DATA: SessionItem[] = [
  {
    id: 1,
    part: 'A',
    partTitle: 'חלק א׳: התכנסות וחקירה פנימית',
    value: 'קבלה',
    title: 'כשזה מתחיל להשתנות',
    subtitle: 'התסמינים הפיזיים והרגשיים של גיל המעבר',
    description: 'מפגש העוסק בשינויים הפיזיים, הרגשיים והמנטליים המאפיינים את תקופת גיל המעבר. נבין מה עובר על הגוף, מה קורה לנו מבפנים ואיך אפשר לפגוש את השינוי מתוך ידע, ויסות, בהירות וקבלה.',
    professionalPart: 'הזווית המקצועית: טיפול רגשי, חוסן וקבלת החלטות בתקופות מעבר.',
    icon: Heart
  },
  {
    id: 2,
    part: 'A',
    partTitle: 'חלק א׳: התכנסות וחקירה פנימית',
    value: 'אחריות ושחרור',
    title: 'בין חיבוק לשחרור',
    subtitle: 'הורים מתבגרים וסינדרום הקן המתרוקן',
    description: 'מפגש העוסק בציר המשפחתי המורכב של אמצע החיים: מצד אחד ילדים שיוצאים לדרך עצמאית, מצד שני הורים מתבגרים הזקוקים ליותר נוכחות, אחריות ותשומת לב. נבחן איך אפשר להחזיק קרוב, לשחרר בעדינות ולשמור גם על עצמנו.',
    professionalPart: 'הזווית המקצועית: פסיכותרפיה וליווי תקופות מעבר במשפחה.',
    icon: Users
  },
  {
    id: 3,
    part: 'A',
    partTitle: 'חלק א׳: התכנסות וחקירה פנימית',
    value: 'איזון',
    title: 'להחזיר לעצמי כוח',
    subtitle: 'תזונה, תנועה ושיפור היחסים עם הגוף',
    description: 'מפגש העוסק בגוף המשתנה, באנרגיה, בתזונה, בתנועה ובמערכת היחסים שלנו עם עצמנו. נבחן איך אפשר להחזיר תחושת כוח, חיוניות ואיזון, מתוך הקשבה, אחריות אישית ובחירות קטנות שמייצרות שינוי.',
    professionalPart: 'הזווית המקצועית: נטורופתיה, תזונה טבעית ואורח חיים בריא בגיל המעבר.',
    icon: Activity
  },
  {
    id: 4,
    part: 'A',
    partTitle: 'חלק א׳: התכנסות וחקירה פנימית',
    value: 'בחירה',
    title: 'קבלת החלטות מתוך בחירה',
    subtitle: 'לבחור ממקום אישי ופנימי',
    description: 'מפגש העוסק בזיקוק מצבים ותובנות ותרגומם לצעדים מעשיים. נעמיק בהבנת הרצונות האמיתיים שלנו וביכולת לקבל החלטות מתוך בחירה אישית ופנימית המניעה לפעולה.',
    professionalPart: 'הזווית המקצועית: אימון אישי, הנחיית קבוצות ותהליכי שינוי.',
    icon: Compass
  },
  {
    id: 5,
    part: 'B',
    partTitle: 'חלק ב׳: צמיחה, חיבור ומשמעות',
    value: 'הקשבה',
    title: 'ללמוד להקשיב',
    subtitle: 'זהות חדשה שמבקשת להיוולד',
    description: 'מפגש העוסק בהעמקה בהקשבה לעצמנו ולבחירות שלנו בתקופה של שינויים, דרך כלים חווייתיים ויצירתיים המחברים בין גוף, רגש, מוזיקה, סטיילינג תרפי וזהות.',
    professionalPart: 'הזווית המקצועית: התפתחות אישית, סטיילינג תרפי, NLP וחיבור חווייתי.',
    icon: BookOpen
  },
  {
    id: 6,
    part: 'B',
    partTitle: 'חלק ב׳: צמיחה, חיבור ומשמעות',
    value: 'הגשמה',
    title: 'מי אני עכשיו?',
    subtitle: 'זהות, משמעות ולגלות כיוון מחדש',
    description: 'מפגש העוסק בזהות, צמתי קריירה, משמעות, עשייה והגשמה אישית. נעסוק בשאלה מי אני כשהתפקידים שהגדירו אותי משתנים, ואיך אפשר לדייק כיוון חדש או מחודש להמשך הדרך.',
    professionalPart: 'הזווית המקצועית: ייעוץ ארגוני, ייעוץ קריירה וליווי צמתי שינוי.',
    icon: TrendingUp
  },
  {
    id: 7,
    part: 'B',
    partTitle: 'חלק ב׳: צמיחה, חיבור ומשמעות',
    value: 'קרבה',
    title: 'מגע, מרחק ומה שביניהם',
    subtitle: 'אינטימיות, תשוקה וזוגיות מחודשת',
    description: 'מפגש העוסק בזוגיות, אינטימיות, מיניות, דימוי גוף וקרבה בתקופת גיל המעבר. נפתח שיח רגיש ואמיץ ונבחן איך אפשר ליצור חיבור מחודש לעצמנו, לגוף שלנו ולמערכות היחסים בחיינו.',
    professionalPart: 'הזווית המקצועית: ייעוץ זוגי ומיני וליווי אינטימיות בגיל המעבר.',
    icon: Sparkles
  },
  {
    id: 8,
    part: 'B',
    partTitle: 'חלק ב׳: צמיחה, חיבור ומשמעות',
    value: 'הודיה',
    title: 'לסגור מעגל, לפתוח לב',
    subtitle: 'הכרת תודה, אושר ומשמעות',
    description: 'מפגש המאפשר לאסוף את הדרך שעברנו, לתת מקום לתובנות, לחיבורים ולשינויים שנוצרו לאורך התוכנית. נעסוק בהכרת תודה, משמעות, אושר אישי ופתיחת הלב להמשך הדרך.',
    professionalPart: 'הזווית המקצועית: הנחיית NLP, איסוף תהליך ופריצות דרך.',
    icon: Sun
  }
];

export const MarketingSessions: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const partA = SESSIONS_DATA.filter(s => s.part === 'A');
  const partB = SESSIONS_DATA.filter(s => s.part === 'B');

  const renderSessionCard = (s: SessionItem) => {
    const IconComponent = s.icon;
    const isOrange = s.part === 'B';
    const borderTheme = isOrange ? 'border-brand-orange/25 hover:border-brand-orange/50' : 'border-brand-green/25 hover:border-brand-green/50';
    const partBadgeColor = isOrange ? 'text-brand-orange bg-brand-orange/10 border-brand-orange/20' : 'text-brand-green bg-brand-green/10 border-brand-green/20';
    const pillColor = isOrange ? 'bg-brand-orange text-white' : 'bg-brand-green text-white';
    const textTheme = isOrange ? 'text-brand-orange' : 'text-brand-green';

    return (
      <div 
        key={s.id}
        id={`session-card-${s.id}`}
        className={`group relative bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-6 sm:p-8 md:p-10 border-2 ${borderTheme} transition-all duration-500 shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:shadow-xl text-right flex flex-col justify-between overflow-hidden`}
        style={{ contentVisibility: 'auto' }}
        onMouseEnter={() => setHoveredId(s.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* Floating background butterfly on hover (hidden on mobile) */}
        <ButterflyIcon 
          size={160} 
          className={`absolute -bottom-10 -left-10 opacity-0 transition-opacity duration-700 pointer-events-none hidden md:block ${isOrange ? 'text-brand-orange/5' : 'text-brand-green/5'} ${hoveredId === s.id ? 'opacity-100' : ''}`} 
        />

        <div>
          {/* Header row (Without Session Numbers) */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-brand-beige/60">
            <span className={`text-sm md:text-base font-black px-4 py-1.5 rounded-full ${pillColor}`}>
              ערך מוביל: {s.value}
            </span>
            <span className={`text-xs md:text-sm font-black px-3.5 py-1.5 rounded-full border ${partBadgeColor}`}>
              {isOrange ? 'חלק ב׳' : 'חלק א׳'}
            </span>
          </div>

          {/* Icon + Title block */}
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-3 rounded-2xl ${isOrange ? 'bg-brand-orange/10 text-brand-orange' : 'bg-brand-green/10 text-brand-green'} transition-transform duration-500 group-hover:scale-110 flex-shrink-0 mt-1`}>
              <IconComponent size={24} className="md:w-7 md:h-7" />
            </div>
            <div>
              <h4 className="text-xl md:text-3xl font-black text-brand-green leading-snug tracking-tight mb-1">
                {s.title}
              </h4>
              <p className={`text-base md:text-xl font-bold ${textTheme}`}>
                {s.subtitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm md:text-lg leading-relaxed font-medium mb-6">
            {s.description}
          </p>
        </div>

        {/* Professional Part Box */}
        <div className={`p-4 md:p-5 rounded-2xl ${isOrange ? 'bg-brand-orange/5' : 'bg-brand-green/5'} border-r-4 ${isOrange ? 'border-brand-orange' : 'border-brand-green'}`}>
          <p className="text-xs md:text-base text-gray-700 leading-relaxed font-bold">
            {s.professionalPart}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="program-structure" className="pt-24 pb-20 bg-brand-cream/40 px-4 md:px-6 relative overflow-hidden">
      {/* Background Decor Butterflies (hidden on mobile to avoid overlapping) */}
      <ButterflyIcon size={300} className="absolute top-20 -right-20 animate-drift opacity-[0.03] -z-10 hidden md:block" />
      <ButterflyIcon size={240} className="absolute bottom-20 -left-10 animate-float opacity-[0.03] -z-10 hidden md:block" />

      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-7xl font-black mb-6 text-brand-green tracking-tighter">מניפת התכנים של הסדנא</h2>
          <p className="text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto font-bold leading-relaxed">
            סדנת אמצע החיים בנויה מ-6 מפגשים המחולקים ל-3 מפגשים בכל חלק, ומשלבת ידע מקצועי, שיח נשי, התבוננות אישית וכלים מעשיים.
          </p>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-medium leading-relaxed">
            לפניכן מניפת התכנים המלאה של הסדנה – מתוכה נבחרים בכל מחזור 3 נושאים בכל חלק בהתאם לאופי הקבוצה ולדגשים שנבחר לקיים (ניתן להירשם לחלק הראשון, לחלק השני או לתוכנית כולה).
          </p>
          <div className="h-1.5 w-24 bg-brand-orange mx-auto mt-8 rounded-full opacity-50"></div>
        </div>

        {/* Part A */}
        <div className="mb-20">
          <div className="flex flex-col items-center mb-12">
            <div className="bg-brand-green text-white px-8 py-4 rounded-full shadow-lg text-center inline-block">
              <h3 className="text-xl md:text-3xl font-black tracking-tight">חלק א׳: התכנסות וחקירה פנימית</h3>
            </div>
            <p className="mt-3 text-sm md:text-base font-black text-brand-green bg-white px-5 py-1.5 rounded-full border border-brand-green/20 shadow-2xs">
              מתוך נושאי חלק א׳ מתקיימים 3 מפגשים בכל מחזור
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {partA.map(renderSessionCard)}
          </div>
        </div>

        {/* Divider with elegant layout */}
        <div className="my-16 flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-brand-beige"></div>
          </div>
        </div>

        {/* Part B */}
        <div className="mb-12">
          <div className="flex flex-col items-center mb-12">
            <div className="bg-brand-orange text-white px-8 py-4 rounded-full shadow-lg text-center inline-block">
              <h3 className="text-xl md:text-3xl font-black tracking-tight">חלק ב׳: צמיחה, חיבור ומשמעות</h3>
            </div>
            <p className="mt-3 text-sm md:text-base font-black text-brand-orange bg-white px-5 py-1.5 rounded-full border border-brand-orange/20 shadow-2xs">
              מתוך נושאי חלק ב׳ מתקיימים 3 מפגשים בכל מחזור
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {partB.map(renderSessionCard)}
          </div>
        </div>

        {/* Bottom flexibility note - Highlighted & Gently Blinking */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#FFF4EB] via-[#FFE6D1] to-[#FFF4EB] p-6 sm:p-8 md:p-10 rounded-[2.2rem] border-2 border-brand-orange shadow-xl text-center animate-notice-blink">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange text-white text-xs md:text-sm font-black mb-3 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-200 animate-ping"></span>
            <span>חשוב לדעת ✦</span>
          </div>
          <p className="text-base md:text-xl font-black text-brand-green leading-relaxed">
            <span className="text-brand-orange underline decoration-2 underline-offset-4">שימי לב:</span> רשימת הנושאים שלעיל מייצגת את מניפת התכנים האפשריים של הסדנה. בכל מחזור מתקיימים 6 מפגשים המחולקים ל-3 מפגשים בכל חלק בליווי נבחרת מרצות הבית שלנו, והדגשים מותאמים לכל קבוצה.
          </p>
        </div>
      </div>
    </section>
  );
};
