import React, { useEffect } from 'react';
import { MessageCircle, Compass, CheckCircle2, Sparkles } from 'lucide-react';
import { ButterflyIcon } from '../../components/Hero';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { MiniPageTopNav, OtherProgramsNav } from '../../components/MiniProgramNav';

const UNTIL180_LOGO_URL = "/logos/up-to-180.webp";
const UNTIL180_LOGO_FALLBACK = "/logos/up-to-180.png";

export const UpTo180MiniPage: React.FC<{ embedded?: boolean; id?: string }> = ({ embedded = false, id = 'up-to-180' }) => {
  useEffect(() => {
    if (!embedded) {
      document.title = "עד 180° | ארבעה מפגשים שמניעים שינוי | בין לבין";
      window.scrollTo(0, 0);
    }
  }, [embedded]);

  const whatsappMessage = encodeURIComponent(
    "היי דלית, קראתי על הסדנה 'עד 180° - ארבעה מפגשים שמניעים שינוי' ואשמח לקבל פרטים נוספים."
  );
  const whatsappUrl = `https://wa.me/972508353731?text=${whatsappMessage}`;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "עד 180° | ארבעה מפגשים שמניעים שינוי | בין לבין",
          text: "עד 180° - ארבעה מפגשים שמניעים שינוי. סדנה תהליכית מבית בין לבין | תוכניות לנשים.",
          url,
        });
      } catch (err) {
        // user cancelled share
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('הקישור הועתק ללוח!');
    }
  };

  const angles = [
    {
      step: 1,
      name: 'לזהות',
      question: 'מה הייתי רוצה לשנות ולמה זה חשוב לי דווקא עכשיו?'
    },
    {
      step: 2,
      name: 'להסתכל אחרת',
      question: 'אילו הרגלים, מחשבות או הנחות משאירים אותי במקום ואיזו זווית חדשה יכולה לפתוח אפשרות אחרת?'
    },
    {
      step: 3,
      name: 'לבחור',
      question: 'מה מתוך כל מה שאפשר, נכון לי לקדם עכשיו?'
    },
    {
      step: 4,
      name: 'להתחיל לזוז',
      question: 'להפוך את הבחירה לצעדים ברורים וליצור מחויבות אישית להמשך הדרך.'
    }
  ];

  return (
    <section id={id} className={`text-gray-800 antialiased selection:bg-[#0d6e7a]/20 selection:text-[#0d6e7a] relative overflow-hidden ${embedded ? 'py-12 sm:py-16' : 'min-h-screen bg-gradient-to-b from-[#f3fafb] via-[#eaf5f7] to-[#def0f3]'}`} dir="rtl">
      {/* Background Ambience Elements */}
      <ButterflyIcon size={260} className="absolute -top-16 -right-20 opacity-[0.035] animate-drift pointer-events-none hidden md:block" />
      <ButterflyIcon size={220} className="absolute top-1/2 -left-20 opacity-[0.03] animate-float pointer-events-none hidden md:block" />
      <ButterflyIcon size={240} className="absolute -bottom-16 right-10 opacity-[0.035] animate-float pointer-events-none hidden md:block" />

      {/* Top Navigation Hub - Standalone */}
      {!embedded && (
        <MiniPageTopNav 
          currentTitle="עד 180°" 
          themeColor="#0d6e7a" 
          onShare={handleShare} 
        />
      )}

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16 relative z-10">

        {/* Hero Section */}
        <div className="text-center pt-4 pb-10 sm:pb-12 border-b border-[#0d6e7a]/20">
          
          {/* Program Dedicated Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-white p-2 sm:p-3 border-4 border-[#0d6e7a]/30 shadow-[0_12px_35px_rgba(13,110,122,0.18)] flex items-center justify-center transition-transform hover:scale-105 duration-300 shrink-0 overflow-hidden">
              <img 
                src={UNTIL180_LOGO_URL} 
                alt="לוגו עד 180°" 
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== UNTIL180_LOGO_FALLBACK) {
                    target.src = UNTIL180_LOGO_FALLBACK;
                  }
                }}
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm sm:text-base font-black mb-4 bg-[#0d6e7a]/10 text-[#0d6e7a] border border-[#0d6e7a]/30 shadow-xs">
            <Compass className="w-4 h-4" />
            <span>סדנה לתהליכי שינוי</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#0d6e7a] tracking-tight leading-[1.1] mb-4 text-center">
            עד 180°
          </h1>

          <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-8 text-center">
            ארבעה מפגשים שמניעים שינוי
          </div>

          {/* Narrative Opening */}
          <div className="space-y-5 text-xl sm:text-2xl text-gray-800 leading-[1.8] max-w-2xl font-normal mx-auto text-right">
            <p className="text-2xl sm:text-3xl font-black text-[#0d6e7a] text-center">
              יש דברים שאנחנו כבר יודעות שאנחנו רוצות לשנות.
            </p>

            <p>
              רעיון שמסתובב בראש. החלטה שאנחנו דוחות. משהו שכבר לא מתאים לנו כמו פעם. רצון להתחיל, להפסיק, להתקדם או פשוט לעשות אחרת.
            </p>

            <p className="text-gray-700 text-lg sm:text-xl pt-1 text-center font-bold">
              אבל בין הרצון לשינוי לבין הרגע שבו באמת מתחילים לזוז, יש לפעמים מרחק.
            </p>

            <div className="bg-[#0d6e7a]/10 p-5 rounded-2xl border-r-4 border-[#0d6e7a] my-2 text-center">
              <p className="text-2xl sm:text-3xl font-black text-[#0d6e7a] tracking-tight py-1">
                <strong>עד 180°</strong> נולדה בדיוק בשביל המרחק הזה.
              </p>
            </div>

            <p>
              סדרה של ארבעה מפגשים תהליכיים שמאפשרת לעצור, להסתכל על מה שאנחנו רוצות לשנות מזווית אחרת ולהתחיל להפוך רצון לתנועה.
            </p>
          </div>
        </div>

        {/* Section: You don't have to turn everything upside down */}
        <section className="py-10 sm:py-14 border-b border-[#0d6e7a]/20 text-center">
          <div className="inline-block px-5 py-1.5 bg-[#0d6e7a]/10 text-[#0d6e7a] rounded-full text-sm sm:text-base font-black mb-3 border border-[#0d6e7a]/30">
            זווית של תנועה
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0d6e7a] mb-6 tracking-tight text-center">
            לא חייבים להפוך את הכול
          </h2>

          <div className="space-y-5 text-lg sm:text-xl md:text-2xl text-gray-800 leading-[1.8] font-normal max-w-2xl mx-auto text-right">
            <p className="text-2xl sm:text-3xl font-black text-gray-900 text-center">
              לפעמים מספיק לשנות כמה מעלות כדי להתחיל לנוע לכיוון אחר.
            </p>

            <p className="text-center">
              במהלך ארבעת המפגשים נשלב בין הרצאות השראה, עבודה אישית, כתיבה ושיתופים.
            </p>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#0d6e7a]/25 shadow-sm mt-4 text-center">
              <p className="text-gray-800 leading-relaxed font-bold">
                כל מפגש ייקח אותנו עוד צעד בתהליך: מהרצון הכללי שמשהו ישתנה, דרך הבנה מדויקת יותר של מה אנחנו באמת רוצות, מה עוצר אותנו ומה יכול לעזור לנו להתקדם, ועד לבחירה בצעדים שאפשר להתחיל לעשות בפועל.
              </p>
            </div>
          </div>
        </section>

        {/* Section: From Four Angles to Motion */}
        <section className="py-10 sm:py-14 border-b border-[#0d6e7a]/20">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-5xl font-black text-[#0d6e7a] tracking-tight mb-3 text-center">
              מארבע זוויות לתנועה
            </h2>
            <p className="text-gray-700 text-lg sm:text-xl font-bold text-center">
              ארבעה צעדים מדויקים המובילים מהתבוננות אל עשייה ומחויבות
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {angles.map((a) => (
              <div
                key={a.step}
                className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#0d6e7a]/25 shadow-sm hover:shadow-md hover:border-[#0d6e7a] transition-all text-right flex flex-col"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="w-10 h-10 rounded-2xl bg-[#0d6e7a]/15 text-[#0d6e7a] font-black text-base flex items-center justify-center">
                    0{a.step}
                  </span>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    שלב {a.step}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-2 text-center">
                  {a.name}
                </h3>

                <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed mt-auto text-center">
                  {a.question}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Inspiration meets action */}
        <section className="py-10 sm:py-14 border-b border-[#0d6e7a]/20">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#0d6e7a]/25 shadow-sm space-y-5 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-[#0d6e7a] font-black text-sm sm:text-base mb-1">
              <Sparkles className="w-5 h-5 text-[#0d6e7a]" />
              <span>נקודת פתיחה מעוררת השראה</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#0d6e7a] tracking-tight text-center">
              השראה שפוגשת עשייה
            </h2>

            <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-medium text-right">
              חלק מהתהליך יכלול הרצאות השראה, ובהן <strong className="font-black text-[#0d6e7a]">&quot;אלסי ב־180 מעלות&quot;</strong>, הרצאתה האישית של אלסי זיסלמן על שינוי, בחירה והיכולת לשנות כיוון.
            </p>

            <p className="text-xl sm:text-2xl font-black text-gray-900 pt-1 text-center">
              אבל ההשראה היא רק נקודת הפתיחה.
            </p>

            <div className="p-6 bg-[#0d6e7a]/10 rounded-2xl border border-[#0d6e7a]/30">
              <p className="text-lg sm:text-xl text-[#0d6e7a] font-black leading-relaxed text-center">
                הסדנא תתווה דרך כיוון וצעד ראשון שיזיז את הזוית במספר מעלות.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Who is the workshop for? */}
        <section className="py-10 sm:py-14 border-b border-[#0d6e7a]/20">
          <div className="bg-white p-7 sm:p-9 rounded-3xl border-2 border-[#0d6e7a]/25 space-y-5 shadow-sm">
            <div className="flex items-center justify-center gap-2 text-[#0d6e7a] font-bold text-sm sm:text-base">
              <Compass className="w-5 h-5" />
              <span>המרחב שלך</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-[#0d6e7a] tracking-tight mb-4 text-center">
              למי הסדנה מתאימה?
            </h3>

            <div className="flex items-start gap-4 text-lg sm:text-xl text-gray-800 leading-relaxed font-medium">
              <CheckCircle2 className="w-7 h-7 text-[#0d6e7a] shrink-0 mt-1" />
              <p>
                לנשים שמרגישות שיש משהו שהן רוצות להזיז בחיים, גם אם הן עדיין לא יודעות בדיוק איך.
              </p>
            </div>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed pr-10 font-medium">
              זה יכול להיות שינוי אישי, מקצועי, משפחתי, שינוי בהרגלים או רצון שכבר הרבה זמן מחכה לקבל מקום.
            </p>

            <div className="pt-5 border-t border-[#0d6e7a]/20 space-y-2 text-center">
              <p className="text-lg sm:text-xl text-gray-700 font-medium">
                לא צריך להגיע עם תוכנית מוכנה.
              </p>
              <p className="text-2xl sm:text-3xl font-black text-[#0d6e7a]">
                מספיק להגיע עם רצון שמשהו יהיה קצת אחרת.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 sm:py-14 border-b border-[#0d6e7a]/20 text-center">
          <div className="bg-white p-8 sm:p-11 rounded-[2.5rem] border-2 border-[#0d6e7a]/30 shadow-md max-w-xl mx-auto">
            <div className="text-2xl sm:text-3xl font-black text-[#0d6e7a] mb-3 text-center">
              רוצה לקבל פרטים?
            </div>
            
            <p className="text-base sm:text-lg text-gray-700 mb-7 font-medium text-center">
              דלית מזמינה אותך לשיחה אישית ופתוחה לבדוק האם זה המרחב המדויק עבורך עכשיו.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#0d6e7a] hover:bg-[#08545e] text-white px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-black transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-98"
            >
              <WhatsAppIcon className="w-6 h-6 fill-current text-white" />
              <span>אשמח לשוחח</span>
            </a>
          </div>

          {/* Sub-footer sign-off */}
          <div className="mt-8 text-center text-xs sm:text-sm text-gray-600 font-bold space-y-1">
            <div className="font-black text-[#0d6e7a] text-base sm:text-lg">עד 180°</div>
            <div className="text-gray-700">4 מפגשים תהליכיים להתנעת שינוי</div>
            <div>מבית <span className="font-black text-brand-green">בין לבין | תוכניות וריטריטים לנשים</span></div>
          </div>
        </section>

        {/* Navigation to Other Programs - AT THE VERY END */}
        {!embedded && (
          <div className="pt-8 pb-4">
            <OtherProgramsNav currentProgramId="up-to-180" />
          </div>
        )}

      </div>
    </section>
  );
};

export default UpTo180MiniPage;
