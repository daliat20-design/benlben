import React, { useEffect } from 'react';
import { MessageCircle, Share2, Compass, CheckCircle2, Sparkles, ArrowLeft } from 'lucide-react';
import { ButterflyIcon } from '../../components/Hero';

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
    <section id={id} className={`text-gray-800 antialiased selection:bg-brand-orange/20 selection:text-brand-green relative overflow-hidden ${embedded ? 'py-12 sm:py-16' : 'min-h-screen bg-brand-cream'}`} dir="rtl">
      {/* Background Ambience Elements */}
      <ButterflyIcon size={260} className="absolute -top-16 -right-20 opacity-[0.035] animate-drift pointer-events-none hidden md:block" />
      <ButterflyIcon size={220} className="absolute top-1/2 -left-20 opacity-[0.03] animate-float pointer-events-none hidden md:block" />
      <ButterflyIcon size={240} className="absolute -bottom-16 right-10 opacity-[0.035] animate-float pointer-events-none hidden md:block" />

      {/* Header / Brand Tag - standalone only */}
      {!embedded && (
        <header className="pt-8 pb-4 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full text-xs sm:text-sm font-black tracking-wide border border-brand-green/15">
              <span>בין לבין</span>
              <span className="text-brand-orange font-light">|</span>
              <span>תוכניות לנשים</span>
            </div>

            <button
              onClick={handleShare}
              aria-label="שתפי את הדף"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand-orange transition-colors p-1.5 rounded-lg hover:bg-white/50"
              title="שתפי את הדף"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">שיתוף</span>
            </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16 relative z-10">

        {/* Hero Section */}
        <div className="text-center md:text-right pt-4 pb-10 sm:pb-12 border-b border-brand-beige/80">
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-brand-green tracking-tight leading-[1.1] mb-4">
            עד 180°
          </h1>

          <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-orange tracking-tight mb-8">
            ארבעה מפגשים שמניעים שינוי
          </div>

          {/* Narrative Opening */}
          <div className="space-y-4 text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl font-medium">
            <p>
              יש דברים שאנחנו כבר יודעות שאנחנו רוצות לשנות.
            </p>

            <p className="text-gray-800">
              רעיון שמסתובב בראש. החלטה שאנחנו דוחות. משהו שכבר לא מתאים לנו כמו פעם. רצון להתחיל, להפסיק, להתקדם או פשוט לעשות אחרת.
            </p>

            <p className="text-gray-600 text-base sm:text-lg pt-1">
              אבל בין הרצון לשינוי לבין הרגע שבו באמת מתחילים לזוז, יש לפעמים מרחק.
            </p>

            <p className="text-2xl sm:text-3xl font-black text-brand-green tracking-tight py-1">
              <strong>עד 180°</strong> נולדה בדיוק בשביל המרחק הזה.
            </p>

            <p className="text-gray-700 text-base sm:text-lg">
              סדרה של ארבעה מפגשים תהליכיים שמאפשרת לעצור, להסתכל על מה שאנחנו רוצות לשנות מזווית אחרת ולהתחיל להפוך רצון לתנועה.
            </p>
          </div>
        </div>

        {/* Section: You don't have to turn everything upside down */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="inline-block px-4 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs sm:text-sm font-black mb-3">
            זווית של תנועה
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-brand-green mb-6 tracking-tight">
            לא חייבים להפוך את הכול
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
            <p className="text-xl sm:text-2xl font-black text-brand-green">
              לפעמים מספיק לשנות כמה מעלות כדי להתחיל לנוע לכיוון אחר.
            </p>

            <p>
              במהלך ארבעת המפגשים נשלב בין הרצאות השראה, עבודה אישית, כתיבה ושיתופים.
            </p>

            <div className="bg-white/80 p-5 sm:p-6 rounded-2xl border border-brand-beige/80 shadow-2xs mt-3">
              <p className="text-gray-800 leading-relaxed">
                כל מפגש ייקח אותנו עוד צעד בתהליך: מהרצון הכללי שמשהו ישתנה, דרך הבנה מדויקת יותר של מה אנחנו באמת רוצות, מה עוצר אותנו ומה יכול לעזור לנו להתקדם, ועד לבחירה בצעדים שאפשר להתחיל לעשות בפועל.
              </p>
            </div>
          </div>
        </section>

        {/* Section: From Four Angles to Motion */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="text-center md:text-right mb-8">
            <h2 className="text-2xl sm:text-4xl font-black text-brand-green tracking-tight mb-2">
              מארבע זוויות לתנועה
            </h2>
            <p className="text-gray-600 text-base sm:text-lg font-medium">
              ארבעה צעדים מדויקים המובילים מהתבוננות אל עשייה ומחויבות
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {angles.map((a) => (
              <div
                key={a.step}
                className="bg-white/85 backdrop-blur-sm p-5 sm:p-6 rounded-3xl border border-brand-beige shadow-2xs hover:shadow-md hover:border-brand-orange/40 transition-all text-right flex flex-col"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="w-8 h-8 rounded-xl bg-brand-green/10 text-brand-green font-black text-sm flex items-center justify-center">
                    0{a.step}
                  </span>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    שלב {a.step}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-brand-green tracking-tight mb-2">
                  {a.name}
                </h3>

                <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed mt-auto">
                  {a.question}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Inspiration meets action */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="bg-white/90 p-7 sm:p-9 rounded-3xl border border-brand-beige shadow-sm space-y-4 text-right">
            <div className="flex items-center gap-2 text-brand-orange font-black text-sm mb-1">
              <Sparkles className="w-5 h-5 text-brand-orange" />
              <span>נקודת פתיחה מעוררת השראה</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-brand-green tracking-tight">
              השראה שפוגשת עשייה
            </h2>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              חלק מהתהליך יכלול הרצאות השראה, ובהן <strong className="font-black text-brand-green">&quot;אלסי ב־180 מעלות&quot;</strong>, הרצאתה האישית של אלסי זיסלמן על שינוי, בחירה והיכולת לשנות כיוון.
            </p>

            <p className="text-lg sm:text-xl font-black text-brand-orange pt-1">
              אבל ההשראה היא רק נקודת הפתיחה.
            </p>

            <div className="p-5 bg-brand-cream/80 rounded-2xl border border-brand-beige/80">
              <p className="text-base sm:text-lg text-brand-green font-bold leading-relaxed">
                הסדנא תתווה דרך כיוון וצעד ראשון שיזיז את הזוית במספר מעלות.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Who is the workshop for? */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="bg-brand-beige/40 p-6 sm:p-8 rounded-3xl border border-brand-beige space-y-4">
            <div className="flex items-center gap-2 text-brand-green font-bold text-xs sm:text-sm">
              <Compass className="w-4 h-4" />
              <span>המרחב שלך</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-brand-green tracking-tight mb-4">
              למי הסדנה מתאימה?
            </h3>

            <div className="flex items-start gap-3 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
              <p>
                לנשים שמרגישות שיש משהו שהן רוצות להזיז בחיים, גם אם הן עדיין לא יודעות בדיוק איך.
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed pr-9">
              זה יכול להיות שינוי אישי, מקצועי, משפחתי, שינוי בהרגלים או רצון שכבר הרבה זמן מחכה לקבל מקום.
            </p>

            <div className="pt-4 border-t border-brand-beige space-y-1 text-center md:text-right">
              <p className="text-base sm:text-lg text-gray-600">
                לא צריך להגיע עם תוכנית מוכנה.
              </p>
              <p className="text-xl sm:text-2xl font-black text-brand-orange">
                מספיק להגיע עם רצון שמשהו יהיה קצת אחרת.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pt-8 pb-8 text-center">
          <div className="bg-white p-7 sm:p-10 rounded-[2.5rem] border-2 border-brand-beige shadow-lg max-w-xl mx-auto">
            <div className="text-xl sm:text-2xl font-black text-brand-green mb-2">
              רוצה לקבל פרטים על המפגשים הקרובים?
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
              דלית מזמינה אותך לשיחה אישית ופתוחה לבדוק האם זה המרחב המדויק עבורך עכשיו.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-brand-green hover:bg-brand-orange text-white px-8 py-4 rounded-full text-base sm:text-lg font-black transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>שיחה עם דלית בוואטסאפ</span>
            </a>
          </div>

          {/* Sub-footer sign-off */}
          <div className="mt-12 text-center text-xs sm:text-sm text-gray-600 font-bold space-y-1">
            <div className="font-black text-brand-green text-base sm:text-lg">עד 180°</div>
            <div className="text-gray-700">4 מפגשים תהליכיים להתנעת שינוי</div>
            <div>מבית <span className="font-black text-brand-green">בין לבין | תוכניות לנשים</span></div>
          </div>
        </section>

      </div>
    </section>
  );
};

export default UpTo180MiniPage;
