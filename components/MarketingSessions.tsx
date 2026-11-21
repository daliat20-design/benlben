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
  introParagraphs?: string[];
  bulletsTitle?: string;
  bullets?: string[];
  closingParagraphs?: string[];
  professionalPart: string;
  icon: React.ComponentType<any>;
}

const SESSIONS_DATA: SessionItem[] = [
  {
    id: 1,
    part: 'A',
    partTitle: 'חלק א׳: להבין מה משתנה, למצוא את האיזון',
    value: 'קבלה',
    title: 'גיל המעבר: מה בעצם קורה לי?',
    subtitle: 'תסמינים ושינויים פיזיים ורגשיים',
    description: 'שינה שמשתבשת, שינויים במצב הרוח, עייפות, גלי חום או תחושה שמשהו בגוף כבר לא עובד כמו פעם. מה מכל אלה קשור לגיל המעבר, ואילו שינויים יכולים להופיע עוד לפני שאנחנו מזהות שהתקופה הזו התחילה? נכיר את התסמינים הפיזיים והרגשיים, נבין את הקשר ביניהם ונקבל כלים להתמודדות עם השינויים מתוך ידע, קבלה וביטחון.',
    professionalPart: '',
    icon: Heart
  },
  {
    id: 2,
    part: 'A',
    partTitle: 'חלק א׳: להבין מה משתנה, למצוא את האיזון',
    value: 'אחריות ושחרור',
    title: 'בין הילדים להורים: ואיפה אני בכל הסיפור?',
    subtitle: 'הורים מתבגרים, ילדים שעוזבים את הבית ושינויים במשפחה',
    description: 'מצד אחד, הילדים גדלים ויוצאים לדרך עצמאית. מצד שני, ההורים שלנו מתבגרים ולעיתים זקוקים לנו יותר מתמיד. בתוך השינויים האלה אנחנו מוצאות את עצמנו בתפקידים חדשים, בין דאגה, אחריות ורצון להיות שם בשביל כולם. נדבר על השינויים ביחסים המשפחתיים, על הצבת גבולות, על שחרור ועל מציאת המקום שלנו בתוך המשפחה המשתנה.',
    professionalPart: '',
    icon: Users
  },
  {
    id: 3,
    part: 'A',
    partTitle: 'חלק א׳: להבין מה משתנה, למצוא את האיזון',
    value: 'איזון',
    title: 'מה הגוף שלי צריך עכשיו?',
    subtitle: 'תזונה, אנרגיה ובריאות בגיל המעבר',
    description: 'פתאום מה שעבד לנו במשך שנים כבר לא בהכרח עובד באותה צורה. חילוף החומרים משתנה, המשקל מתנהג אחרת וגם רמות האנרגיה לא תמיד צפויות. נבין כיצד השינויים ההורמונליים משפיעים על הצרכים התזונתיים שלנו, נדבר על שמירה על מסת שריר, בריאות העצם וחיוניות ונכיר עקרונות תזונה והרגלים מעשיים שיכולים לתמוך בגוף בתקופה הזו.',
    professionalPart: '',
    icon: Activity
  },
  {
    id: 4,
    part: 'A',
    partTitle: 'חלק א׳: להבין מה משתנה, למצוא את האיזון',
    value: 'בחירה',
    title: 'מה אני באמת רוצה, ומה אני בוחרת?',
    subtitle: 'קבלת החלטות מתוך הקשבה לרצונות ולצרכים שלנו',
    description: 'אנחנו רגילות לקבל החלטות, אבל לא תמיד עוצרות לשאול עד כמה הן באמת משקפות את מה שאנחנו רוצות. איך מבדילים בין הרצון שלנו לבין הציפיות של הסביבה? מה עושים כשיש התלבטות, ואיך מקבלים החלטות בלי לתת לפחד או להרגל לנהל אותנו? נתרגל כלים שיעזרו לנו לזהות מה חשוב לנו, לבחון אפשרויות ולבחור מתוך בהירות וביטחון.',
    professionalPart: '',
    icon: Compass
  },
  {
    id: 5,
    part: 'B',
    partTitle: 'חלק ב׳: להקשיב לעצמנו, לגלות אפשרויות חדשות',
    value: 'שחרור ואיזון',
    title: 'לוקחות אוויר',
    subtitle: '',
    description: '',
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
    professionalPart: '',
    icon: BookOpen
  },
  {
    id: 6,
    part: 'B',
    partTitle: 'חלק ב׳: להקשיב לעצמנו, לגלות אפשרויות חדשות',
    value: 'הגשמה',
    title: 'ומה עכשיו עם הקריירה שלי?',
    subtitle: 'עבודה, קריירה וכיוונים מקצועיים חדשים באמצע החיים',
    description: 'אולי אנחנו מרוצות מהעבודה אבל רוצות להתפתח, אולי מרגישות שמיצינו, ואולי יש חלום מקצועי שעדיין לא העזנו לבדוק. נבחן מה חשוב לנו היום בעולם העבודה, אילו יכולות וניסיון צברנו לאורך השנים ואילו אפשרויות עומדות בפנינו. נדבר על שינוי מקצועי, התפתחות, משמעות והדרך להפוך מחשבה על שינוי לכיוון שאפשר להתחיל לקדם.',
    professionalPart: '',
    icon: TrendingUp
  },
  {
    id: 7,
    part: 'B',
    partTitle: 'חלק ב׳: להקשיב לעצמנו, לגלות אפשרויות חדשות',
    value: 'קרבה',
    title: 'זוגיות ואינטימיות: מה משתנה בינינו?',
    subtitle: 'קרבה, תשוקה ומיניות בתקופת גיל המעבר',
    description: 'גיל המעבר יכול להשפיע לא רק על הגוף שלנו, אלא גם על החשק, האינטימיות והיחסים הזוגיים. איך מדברים על מה שמשתנה? מה עושים כשיש פערים בצרכים וברצונות? איך שומרים על קרבה ומגלים אותה מחדש? מפגש פתוח ורגיש שבו נדבר על זוגיות, מיניות, תקשורת, דימוי גוף והאפשרות ליצור אינטימיות שמתאימה למי שאנחנו היום.',
    professionalPart: '',
    icon: Sparkles
  },
  {
    id: 8,
    part: 'B',
    partTitle: 'חלק ב׳: להקשיב לעצמנו, לגלות אפשרויות חדשות',
    value: 'הודיה',
    title: 'מהתובנות לחיים עצמם',
    subtitle: 'כלים מעולם ה-NLP לחיבור התובנות וליצירת שינוי',
    description: 'לאורך הדרך אנחנו לומדות על עצמנו, מזהות דברים שהיינו רוצות לשמר ואחרים שהגיע הזמן לשנות. אבל איך לוקחים את כל התובנות האלה אל החיים עצמם? במפגש חווייתי נשתמש בעקרונות ובכלים מעולם ה-NLP כדי להתבונן בדפוסי חשיבה, לזהות את המשאבים והחוזקות שלנו ולחבר בין מה שגילינו לבין הבחירות והצעדים הבאים שלנו. נסיים בהכרת תודה על מה שכבר יש ועל האפשרויות שעוד לפנינו.',
    professionalPart: '',
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
              {s.subtitle && (
                <p className={`text-base md:text-xl font-bold ${textTheme}`}>
                  {s.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          {s.description ? (
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed font-medium mb-6">
              {s.description}
            </p>
          ) : (
            <div className="space-y-3 text-gray-600 text-sm md:text-lg leading-relaxed font-medium mb-6">
              {s.introParagraphs?.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
              {s.bulletsTitle && (
                <div className="bg-[#FFF9F4] rounded-2xl p-4 space-y-2 border border-brand-orange/20">
                  <p className="font-bold text-brand-green">{s.bulletsTitle}</p>
                  <ul className="space-y-1 pr-4 list-disc marker:text-brand-orange">
                    {s.bullets?.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
              {s.closingParagraphs?.map((para, cIdx) => (
                <p
                  key={cIdx}
                  className={
                    cIdx === (s.closingParagraphs?.length || 0) - 1
                      ? 'font-black text-brand-orange'
                      : ''
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Professional Part Box (only if provided) */}
        {s.professionalPart && (
          <div className={`p-4 md:p-5 rounded-2xl ${isOrange ? 'bg-brand-orange/5' : 'bg-brand-green/5'} border-r-4 ${isOrange ? 'border-brand-orange' : 'border-brand-green'}`}>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed font-bold">
              {s.professionalPart}
            </p>
          </div>
        )}
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
              <h3 className="text-xl md:text-3xl font-black tracking-tight">חלק א׳: להבין מה משתנה, למצוא את האיזון</h3>
            </div>
            <p className="mt-3 text-sm md:text-base font-black text-brand-green bg-white px-5 py-1.5 rounded-full border border-brand-green/20 shadow-2xs">
              ארבעה נושאים אפשריים העוסקים בגוף, במשפחה ובבחירות שלנו בתקופת אמצע החיים.
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
              <h3 className="text-xl md:text-3xl font-black tracking-tight">חלק ב׳: להקשיב לעצמנו, לגלות אפשרויות חדשות</h3>
            </div>
            <p className="mt-3 text-sm md:text-base font-black text-brand-orange bg-white px-5 py-1.5 rounded-full border border-brand-orange/20 shadow-2xs">
              ארבעה נושאים אפשריים העוסקים בזהות, בקריירה, ביחסים וביצירת שינוי.
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
            רשימת המפגשים מציגה את מאגר הנושאים של סדנת ״אמצע החיים״. בכל מחזור מתקיימים שישה מפגשים, שלושה בכל חלק. הנושאים נבחרים מתוך שני החלקים וניתן לשלב ביניהם בהתאם לאופי הקבוצה ולצרכיה.
          </p>
        </div>
      </div>
    </section>
  );
};
