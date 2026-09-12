import React, { useEffect } from 'react';
import { MessageCircle, Share2, Compass, CheckCircle2, Sparkles, Tent, Flag } from 'lucide-react';
import { ButterflyIcon } from '../../components/Hero';

export const TheTentMiniPage: React.FC<{ embedded?: boolean; id?: string }> = ({ embedded = false, id = 'the-tent' }) => {
  useEffect(() => {
    if (!embedded) {
      document.title = "האוהל | תוכנית למנהיגות, יוזמה והשפעה נשית | בין לבין";
      window.scrollTo(0, 0);
    }
  }, [embedded]);

  const whatsappMessage = encodeURIComponent(
    "היי דלית, קראתי על תוכנית 'האוהל' למנהיגות, יוזמה והשפעה נשית, ואשמח לשמוע פרטים נוספים."
  );
  const whatsappUrl = `https://wa.me/972508353731?text=${whatsappMessage}`;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "האוהל | תוכנית למנהיגות, יוזמה והשפעה נשית | בין לבין",
          text: "האוהל - תוכנית למנהיגות, יוזמה והשפעה נשית. 5 מפגשים תהליכיים + יום שיא. מבית בין לבין | תוכניות לנשים.",
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

  const meetings = [
    {
      num: 1,
      title: 'מחזקות יתדות',
      subtitle: 'העוגנים והכוחות שלי',
      desc: 'מה כבר יש בי שיכול להפוך לתשתית להובלה?'
    },
    {
      num: 2,
      title: 'מסיטות את הפתח',
      subtitle: 'בחירה וגבולות',
      desc: 'איפה אני בוחרת להשקיע את הזמן, האנרגיה והנוכחות שלי?'
    },
    {
      num: 3,
      title: 'מקשיבות פנימה',
      subtitle: 'הקול שלי',
      desc: 'מה חשוב לי לומר, לקדם ולהביא אל המרחב?'
    },
    {
      num: 4,
      title: 'מרחיבות יריעות',
      subtitle: 'מרעיון לאפשרות',
      desc: 'איפה אני מזהה צורך, הזדמנות או משהו שהייתי רוצה ליצור?'
    },
    {
      num: 5,
      title: 'יוצאות מהאוהל',
      subtitle: 'מנהיגות והשפעה',
      desc: 'איך הופכים ניסיון, רצון ורעיון לכיוון שאפשר להתחיל לקדם?'
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
          
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-1 rounded-full text-xs sm:text-sm font-black mb-3 border border-brand-green/15">
            <Tent className="w-4 h-4 text-brand-green" />
            <span>תוכנית למנהיגות, יוזמה והשפעה נשית</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-brand-green tracking-tight leading-[1.1] mb-4">
            האוהל
          </h1>

          <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-orange tracking-tight mb-8">
            תוכנית למנהיגות, יוזמה והשפעה נשית
          </div>

          {/* Narrative Opening */}
          <div className="space-y-4 text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl font-medium">
            <p className="text-xl sm:text-2xl font-black text-brand-green">
              יש נשים שרוצות לעשות יותר.
            </p>

            <p className="text-gray-800">
              יש להן ניסיון, יכולות, היכרות עמוקה עם אנשים וקהילה, רעיונות ודברים שחשוב להן לקדם. לא תמיד הן מגדירות את עצמן כמנהיגות, ולא תמיד ברור להן איך להפוך את כל מה שכבר קיים בהן ליוזמה ולעשייה.
            </p>

            <p className="text-gray-700 pt-2">
              <strong className="text-brand-green font-black">&quot;האוהל&quot;</strong> היא תוכנית שמחברת בין שני הדברים:
            </p>

            <div className="bg-white/85 p-5 sm:p-6 rounded-2xl border border-brand-beige shadow-2xs">
              <p className="text-brand-green font-bold text-base sm:text-lg leading-relaxed">
                בין הכוחות והניסיון שכבר קיימים בכל משתתפת לבין היכולת לזהות איפה היא רוצה להשפיע, מה היא רוצה להוביל ואיך מתחילים להפוך כוונה לעשייה.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Why a tent? */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="inline-block px-4 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs sm:text-sm font-black mb-3">
            הדימוי המוביל
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-brand-green mb-6 tracking-tight">
            למה דווקא אוהל?
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
            <p className="text-lg sm:text-xl font-bold text-gray-800">
              האוהל הוא הדימוי שמלווה את התהליך כולו.
            </p>

            <p>
              כדי לצאת ולהשפיע צריך קודם לדעת מהן היתדות שמחזיקות אותי, לאן אני בוחרת להפנות את הפתח, איזה קול אני מביאה איתי ואיפה אני רוצה להרחיב את היריעות.
            </p>

            <p>
              דרך הדימוי הזה המשתתפות עוברות תהליך שמתחיל בזיהוי הכוחות, הערכים והניסיון שלהן ומתקדם בהדרגה אל מנהיגות, יוזמה והשפעה.
            </p>

            <div className="p-6 bg-brand-beige/40 rounded-3xl border border-brand-beige space-y-2 mt-4">
              <p className="text-base sm:text-lg text-gray-600 font-medium">
                לא מנהיגות כתפקיד.
              </p>
              <p className="text-xl sm:text-2xl font-black text-brand-green leading-snug">
                מנהיגות כיכולת לראות צורך, לגבש רעיון, לרתום אחרות ולהתחיל להזיז משהו במרחב שבו אני חיה ופועלת.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 5 Meetings */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="text-center md:text-right mb-8">
            <h2 className="text-2xl sm:text-4xl font-black text-brand-green tracking-tight mb-2">
              חמישה מפגשים. מהכוחות שלי אל העשייה.
            </h2>
            <p className="text-gray-600 text-base sm:text-lg font-medium">
              מסע תהליכי של חמישה שלבים המחברים בין עוגן פנימי להשפעה חיצונית
            </p>
          </div>

          <div className="space-y-4">
            {meetings.map((m) => (
              <div
                key={m.num}
                className="bg-white/85 backdrop-blur-sm p-5 sm:p-6 rounded-3xl border border-brand-beige shadow-2xs hover:shadow-md hover:border-brand-orange/40 transition-all text-right flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-brand-green/10 text-brand-green font-black text-base flex items-center justify-center shrink-0">
                    0{m.num}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-black text-brand-green tracking-tight">
                        {m.title}
                      </h3>
                      <span className="text-brand-orange font-bold text-sm">|</span>
                      <span className="text-sm sm:text-base font-bold text-brand-orange">
                        {m.subtitle}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 font-medium mt-1">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 sm:p-5 bg-white/70 rounded-2xl border border-brand-beige/80 text-center md:text-right">
            <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
              המפגשים משלבים ידע והשראה עם עבודה תהליכית, כתיבה, שיח, עבודה משותפת וכלים שמסייעים לעבור בהדרגה מחשיבה לעשייה.
            </p>
          </div>
        </section>

        {/* Section: Planting the Tent Peg - Peak Day */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="bg-white/90 p-7 sm:p-9 rounded-3xl border border-brand-beige shadow-sm space-y-4 text-right">
            <div className="inline-flex items-center gap-2 text-brand-orange font-black text-xs sm:text-sm">
              <Flag className="w-4 h-4" />
              <span>יום שיא לפיתוח יוזמות</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-brand-green tracking-tight">
              נוטעות יתד
            </h2>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              התהליך מסתיים ביום שיא שמוקדש למעבר <strong className="font-black text-brand-green">מרעיון ליוזמה</strong>.
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              המשתתפות עובדות על צורך או נושא שחשוב להן, מחדדות למי הן רוצות לפעול, מפתחות כיוון ליוזמה ובוחנות מה נדרש כדי להתחיל לקדם אותה.
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              אפשר לעבוד באופן אישי או להתחבר לנשים נוספות סביב רעיון משותף.
            </p>

            <div className="p-5 sm:p-6 bg-brand-cream/80 rounded-2xl border border-brand-beige/80 space-y-2">
              <p className="text-sm sm:text-base text-gray-600 font-medium">
                המטרה אינה לצאת ביום אחד עם מיזם שלם.
              </p>
              <p className="text-lg sm:text-xl font-black text-brand-green leading-snug">
                המטרה היא לצאת עם רעיון מגובש יותר, שותפות אפשריות וצעד ראשון שאפשר להתחיל ממנו.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Who is the program for? */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="bg-brand-beige/40 p-6 sm:p-8 rounded-3xl border border-brand-beige space-y-4">
            <div className="flex items-center gap-2 text-brand-green font-bold text-xs sm:text-sm">
              <Compass className="w-4 h-4" />
              <span>קהל היעד</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-brand-green tracking-tight mb-4">
              למי התוכנית מתאימה?
            </h3>

            <div className="flex items-start gap-3 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
              <p>
                לנשים שרוצות להיות מעורבות יותר, להוביל, ליזום ולהשפיע בקהילה ובמרחבים שבהם הן פועלות.
              </p>
            </div>

            <div className="flex items-start gap-3 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
              <p>
                גם לנשים שכבר פעילות ומחפשות את הצעד הבא, וגם לנשים שמרגישות שיש להן מה לתת ורוצות למצוא את המקום והדרך להפוך את זה לעשייה.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pt-8 pb-8 text-center">
          <div className="bg-white p-7 sm:p-10 rounded-[2.5rem] border-2 border-brand-beige shadow-lg max-w-xl mx-auto">
            <div className="text-xl sm:text-2xl font-black text-brand-green mb-2">
              רוצה לקבל פרטים על המחזור הקרוב של האוהל?
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
              דלית מזמינה אותך לשיחה אישית ופתוחה לכל שאלה לקראת פתיחת התוכנית.
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
            <div className="font-black text-brand-green text-base sm:text-lg">האוהל</div>
            <div className="text-gray-700">5 מפגשים תהליכיים + יום שיא לפיתוח יוזמות</div>
            <div>מבית <span className="font-black text-brand-green">בין לבין | תוכניות לנשים</span></div>
          </div>
        </section>

      </div>
    </section>
  );
};

export default TheTentMiniPage;
