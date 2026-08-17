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
    description: 'מפגש פתיחה העוסק בשינויים הפיזיים, הרגשיים והמנטליים המאפיינים את תקופת גיל המעבר. נבין מה עובר על הגוף, מה קורה לנו מבפנים ואיך אפשר לפגוש את השינוי מתוך ידע, ויסות, בהירות וקבלה.',
    professionalPart: 'החלק המקצועי יועבר על ידי אשת מקצוע מתחומי הטיפול הרגשי, החוסן, שינויי חיים או ליווי נשים בתקופות מעבר.',
    icon: Heart
  },
  {
    id: 2,
    part: 'A',
    partTitle: 'חלק א׳: התכנסות וחקירה פנימית',
    value: 'אחריות ושחרור',
    title: 'בין חיבוק לשחרור',
    subtitle: 'הורים מתבגרים וסינדרום הקן המתרוקן',
    description: 'מפגש העוסק בציר המשפחתי המורכב של אמצע החיים: מצד אחד ילדים שיוצאים לדרך עצמאית, מצד שני הורים מתבגרים הזקוקים ליותר נוכחות, אחריות ותשומת לב. במפגש ניגע בהיבטים הרגשיים, המשפחתיים והמעשיים של התקופה הזו, ונבחן איך אפשר להחזיק קרוב, לשחרר בעדינות ולשמור גם על עצמנו בתוך המעגל המשפחתי המשתנה.',
    professionalPart: 'החלק המקצועי עשוי לשלב מומחיות מתחומי הטיפול, ההנחיה, המשפחה, הזקנה, הליווי הרגשי או ההיבטים המשפטיים והמעשיים הקשורים להורים מתבגרים.',
    icon: Users
  },
  {
    id: 3,
    part: 'A',
    partTitle: 'חלק א׳: התכנסות וחקירה פנימית',
    value: 'איזון',
    title: 'להחזיר לעצמי כוח',
    subtitle: 'תזונה, תנועה ושיפור היחסים עם הגוף',
    description: 'מפגש העוסק בגוף המשתנה, באנרגיה, בתזונה, בתנועה ובמערכת היחסים שלנו עם עצמנו. נבחן איך אפשר להחזיר תחושת כוח, חיוניות ואיזון, לא מתוך ביקורת או מאבק, אלא מתוך הקשבה, אחריות אישית ובחירות קטנות שמייצרות שינוי.',
    professionalPart: 'החלק המקצועי יועבר על ידי אשת מקצוע מתחומי התזונה, אורח החיים הבריא, התנועה, הבריאות הנשית או הליווי ההוליסטי לנשים בגיל המעבר.',
    icon: Activity
  },
  {
    id: 4,
    part: 'A',
    partTitle: 'חלק א׳: התכנסות וחקירה פנימית',
    value: 'בחירה',
    title: 'קבלת החלטות מתוך בחירה',
    subtitle: 'לבחור ממקום אישי ופנימי',
    description: 'מפגש העוסק ביכולת לעצור, להקשיב לרצונות שלנו ולבחור מתוך מקום פנימי, ולא רק מתוך ציפיות, הרגלים או תפקידים שלקחנו על עצמנו לאורך השנים. נלמד לזהות מה חשוב לנו עכשיו, מה מבקש להשתנות ואיך אפשר לתרגם תובנות לצעדים מעשיים.',
    professionalPart: 'החלק המקצועי יועבר על ידי מנחת קבוצות, מאמנת אישית, יועצת תהליכית או אשת מקצוע המתמחה בקבלת החלטות, שינוי וצמיחה אישית.',
    icon: Compass
  },
  {
    id: 5,
    part: 'B',
    partTitle: 'חלק ב׳: צמיחה, חיבור ומשמעות',
    value: 'הקשבה',
    title: 'ללמוד להקשיב',
    subtitle: 'זהות חדשה שמבקשת להיוולד',
    description: 'מפגש העוסק בזהות, הקשבה פנימית והאפשרות לגלות על עצמנו דברים חדשים גם באמצע החיים. דרך חוויה, התבוננות וכלים יצירתיים נבחן מה עוד קיים בנו, מה מבקש לקבל ביטוי ומה יכול להיפתח כשאנחנו מאפשרות לעצמנו ללמוד מחדש מי אנחנו.',
    professionalPart: 'החלק המקצועי עשוי להיות מובל על ידי נשות מקצוע מתחומי ההתפתחות האישית, היצירה, הסטיילינג התרפי, ה־NLP, ההנחיה או כלים חווייתיים המחברים בין גוף, רגש וזהות.',
    icon: BookOpen
  },
  {
    id: 6,
    part: 'B',
    partTitle: 'חלק ב׳: צמיחה, חיבור ומשמעות',
    value: 'הגשמה',
    title: 'מי אני עכשיו?',
    subtitle: 'לגלות כיוון מחדש',
    description: 'מפגש העוסק בצמתי קריירה, משמעות, עשייה והגשמה אישית. נעסוק בשאלה מה מתאים לי עכשיו, אילו חוזקות וניסיון אני מביאה איתי, ואיך אפשר להתחיל לדייק כיוון חדש או מחודש להמשך הדרך המקצועית והאישית.',
    professionalPart: 'החלק המקצועי יועבר על ידי אשת מקצוע מתחומי הייעוץ הארגוני, הקריירה, משאבי האנוש, פיתוח אישי או ליווי נשים בצמתי שינוי והגשמה.',
    icon: TrendingUp
  },
  {
    id: 7,
    part: 'B',
    partTitle: 'חלק ב׳: צמיחה, חיבור ומשמעות',
    value: 'קרבה',
    title: 'מגע, מרחק ומה שביניהם',
    subtitle: 'אינטימיות, תשוקה וזוגיות מחודשת',
    description: 'מפגש העוסק בזוגיות, אינטימיות, מיניות, דימוי גוף וקרבה בתקופת גיל המעבר. נפתח שיח רגיש ואמיץ על נושאים שלא תמיד מקבלים מקום, ונבחן איך אפשר ליצור חיבור מחודש לעצמנו, לגוף שלנו ולמערכות היחסים הקרובות בחיינו.',
    professionalPart: 'החלק המקצועי יועבר על ידי אשת מקצוע מתחומי הייעוץ הזוגי, המיני, הטיפול הרגשי, דימוי הגוף או ליווי נשים בתהליכי שינוי ביחסים ובאינטימיות.',
    icon: Sparkles
  },
  {
    id: 8,
    part: 'B',
    partTitle: 'חלק ב׳: צמיחה, חיבור ומשמעות',
    value: 'הודיה',
    title: 'לסגור מעגל, לפתוח לב',
    subtitle: 'מפגש סיום: הכרת תודה, אושר ומשמעות',
    description: 'מפגש סיום המאפשר לאסוף את הדרך שעברנו, לתת מקום לתובנות, לחיבורים ולשינויים שנוצרו לאורך התוכנית. נעסוק בהכרת תודה, משמעות, אושר אישי ופתיחת הלב להמשך הדרך.',
    professionalPart: 'החלק המקצועי יועבר על ידי מנחת קבוצות, מנחת NLP, אשת טיפול, מאמנת או מומחית להתפתחות אישית, שתסייע לאסוף את התהליך ולתרגם אותו לבהירות, בחירה והמשך תנועה.',
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
    const borderTheme = isOrange ? 'border-brand-orange/20 hover:border-brand-orange/40' : 'border-brand-green/20 hover:border-brand-green/40';
    const numColor = isOrange ? 'text-brand-orange bg-brand-orange/5' : 'text-brand-green bg-brand-green/5';
    const pillColor = isOrange ? 'bg-brand-orange text-white' : 'bg-brand-green text-white';
    const ringHighlight = isOrange ? 'group-hover:ring-brand-orange/20' : 'group-hover:ring-brand-green/20';
    const textTheme = isOrange ? 'text-brand-orange' : 'text-brand-green';

    return (
      <div 
        key={s.id}
        id={`session-card-${s.id}`}
        className="group relative bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-6 sm:p-8 md:p-10 border-2 transition-all duration-500 shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:shadow-xl text-right flex flex-col justify-between overflow-hidden"
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
          {/* Header row */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-brand-beige/60">
            <span className={`text-sm md:text-base font-black px-4 py-1.5 rounded-full ${pillColor}`}>
              ערך מוביל: {s.value}
            </span>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl md:text-2xl ${numColor}`}>
              {s.id}
            </div>
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
          <h2 className="text-4xl md:text-7xl font-black mb-6 text-brand-green tracking-tighter">מבנה המפגשים</h2>
          <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            התוכנית בנויה משמונה מפגשים המשלבים ידע מקצועי, שיח נשי, התבוננות אישית וכלים מעשיים.
          </p>
          <p className="text-sm md:text-lg text-gray-500 max-w-3xl mx-auto mt-4 font-medium leading-relaxed">
            בכל מפגש נעסוק בנושא מרכזי אחר מתוך עולמן של נשים באמצע החיים ובתקופת גיל המעבר, דרך הרצאה מקצועית, מעגלי שיח, שאלות מנחות ותהליך אישי מתמשך.
          </p>
          <div className="h-1.5 w-24 bg-brand-orange mx-auto mt-8 rounded-full opacity-50"></div>
        </div>

        {/* Timeline Part A */}
        <div className="mb-20">
          <div className="flex justify-center mb-12">
            <div className="bg-brand-green text-white px-8 py-4 rounded-full shadow-lg text-center inline-block">
              <h3 className="text-xl md:text-3xl font-black tracking-tight">חלק א׳: התכנסות וחקירה פנימית</h3>
            </div>
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

        {/* Timeline Part B */}
        <div className="mb-12">
          <div className="flex justify-center mb-12">
            <div className="bg-brand-orange text-white px-8 py-4 rounded-full shadow-lg text-center inline-block">
              <h3 className="text-xl md:text-3xl font-black tracking-tight">חלק ב׳: צמיחה, חיבור ומשמעות</h3>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {partB.map(renderSessionCard)}
          </div>
        </div>
      </div>
    </section>
  );
};
