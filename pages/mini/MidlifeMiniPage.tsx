import React, { useEffect } from 'react';
import { MessageCircle, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import { ButterflyIcon } from '../../components/Hero';

export const MidlifeMiniPage: React.FC<{ embedded?: boolean; id?: string }> = ({ embedded = false, id = 'midlife' }) => {
  useEffect(() => {
    if (!embedded) {
      document.title = "אמצע החיים | סדנת הדגל לנשים בגילאי 45–60 | בין לבין";
      window.scrollTo(0, 0);
    }
  }, [embedded]);

  const whatsappMessage = encodeURIComponent(
    "היי דלית, קראתי על סדנת 'אמצע החיים' ואשמח לקבל פרטים נוספים על המחזור הקרוב."
  );
  const whatsappUrl = `https://wa.me/972508353731?text=${whatsappMessage}`;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "אמצע החיים | סדנת הדגל | בין לבין",
          text: "אמצע החיים - סדנת הדגל של בין לבין לנשים בגילאי 45–60. הרבה יותר מסדנה על גיל המעבר.",
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
      title: 'גוף וגיל המעבר',
      desc: 'להבין מה משתנה ומה יכול לעזור.'
    },
    {
      num: 2,
      title: 'משפחה ותפקידים משתנים',
      desc: 'בין הורים שמתבגרים לילדים שגדלים ומשחררים.'
    },
    {
      num: 3,
      title: 'תזונה, תנועה והגוף שלי',
      desc: 'להחזיר לעצמי כוח ולבנות מערכת יחסים טובה יותר עם הגוף.'
    },
    {
      num: 4,
      title: 'בחירה וקבלת החלטות',
      desc: 'לעצור את האוטומט ולבדוק מה נכון לי עכשיו.'
    },
    {
      num: 5,
      title: 'זהות והקשבה לעצמי',
      desc: 'מי אני כשהתפקידים שהגדירו אותי מתחילים להשתנות?'
    },
    {
      num: 6,
      title: 'קריירה, משמעות והגשמה',
      desc: 'לגלות מחדש כיוון, רצון ומה עוד הייתי רוצה לעשות.'
    },
    {
      num: 7,
      title: 'זוגיות, קרבה ואינטימיות',
      desc: 'לדבר גם על מה שמשתנה בינינו.'
    },
    {
      num: 8,
      title: 'הודיה והפרק הבא',
      desc: 'לסגור את התהליך עם מבט על מה שיש ועל מה שעוד אפשרי.'
    }
  ];

  return (
    <section id={id} className={`text-gray-800 antialiased selection:bg-brand-orange/20 selection:text-brand-green relative overflow-hidden ${embedded ? 'py-12 sm:py-16' : 'min-h-screen bg-brand-cream'}`} dir="rtl">
      {/* Background Ambience Elements */}
      <ButterflyIcon size={260} className="absolute -top-16 -right-20 opacity-[0.035] animate-drift pointer-events-none hidden md:block" />
      <ButterflyIcon size={220} className="absolute top-1/2 -left-20 opacity-[0.03] animate-float pointer-events-none hidden md:block" />
      <ButterflyIcon size={240} className="absolute -bottom-16 right-10 opacity-[0.035] animate-float pointer-events-none hidden md:block" />

      {/* Mini Header / Brand Tag - standalone only */}
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

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16 relative z-10">

        {/* Hero Section */}
        <div className="text-center md:text-right pt-4 pb-10 sm:pb-12 border-b border-brand-beige/80">
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-brand-green tracking-tight leading-[1.1] mb-4">
            אמצע החיים
          </h1>

          <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-orange tracking-tight mb-8">
            סדנת הדגל של בין לבין לנשים בגילאי <span dir="ltr">45–60</span>
          </div>

          {/* Opening Narrative */}
          <div className="space-y-4 text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl font-medium">
            <p>
              יש תקופות בחיים שבהן הרבה דברים משתנים כמעט במקביל.
            </p>

            <p className="text-gray-800">
              הגוף משתנה. הילדים גדלים. ההורים מתבגרים. הזוגיות מקבלת צורה אחרת. הקריירה מעלה שאלות חדשות. דברים שהתאימו לנו במשך שנים כבר לא תמיד מרגישים מדויקים.
            </p>

            <p className="text-brand-green font-bold text-xl pt-1">
              ובתוך כל אלה, נפתח גם מרחב חדש.
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              מרחב לעצור ולשאול מה נכון לי עכשיו. להבין את השינויים שאני עוברת, לקבל ידע וכלים, לפגוש נשים שנמצאות בשלב דומה ולגלות מה עוד מחכה לי בפרק הבא.
            </p>
          </div>
        </div>

        {/* Section: Much more than a menopause workshop */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="inline-block px-4 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs sm:text-sm font-black mb-3">
            מבט רחב ומעמיק
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-brand-green mb-6 tracking-tight">
            הרבה יותר מסדנה על גיל המעבר
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
            <p>
              ידע על גיל המעבר אפשר למצוא היום כמעט בכל מקום.
            </p>

            <p className="text-xl sm:text-2xl font-black text-brand-green">
              אבל אמצע החיים הוא הרבה יותר מגיל המעבר.
            </p>

            <p>
              <strong className="font-black text-brand-green">אמצע החיים</strong> היא מעטפת שמחברת בין ידע מקצועי, שיח נשי, התבוננות אישית וכלים מעשיים.
            </p>

            <p className="text-gray-700">
              במהלך שמונה מפגשים אנחנו נוגעות בנושאים שמעסיקים נשים בתקופה הזו: השינויים הפיזיים והרגשיים, הגוף, הורים מתבגרים וילדים שעוזבים את הקן, בחירות, זהות, קריירה והגשמה, זוגיות ואינטימיות.
            </p>

            <div className="bg-white/80 p-5 sm:p-6 rounded-2xl border border-brand-beige/80 shadow-2xs mt-4">
              <p className="text-brand-green font-bold text-base sm:text-lg">
                כל מפגש משלב הרצאה של אשת מקצוע, שיח בקבוצה ותהליך אישי שממשיך ממפגש למפגש.
              </p>
            </div>
          </div>
        </section>

        {/* Section: The 8 Meetings */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="text-center md:text-right mb-8">
            <h2 className="text-2xl sm:text-4xl font-black text-brand-green tracking-tight mb-2">
              שמונה מפגשים. הרבה זוויות. תהליך אחד.
            </h2>
            <p className="text-gray-600 text-base sm:text-lg font-medium">
              מסע של שמונה שבועות שבו כל מפגש מאיר זווית אחרת של אמצע החיים
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {meetings.map((m) => (
              <div
                key={m.num}
                className="bg-white/85 backdrop-blur-sm p-5 sm:p-6 rounded-3xl border border-brand-beige shadow-2xs hover:shadow-md hover:border-brand-orange/40 transition-all text-right flex flex-col"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="w-8 h-8 rounded-xl bg-brand-green/10 text-brand-green font-black text-sm flex items-center justify-center">
                    {m.num}
                  </span>
                  <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                    מפגש {m.num}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-brand-green tracking-tight mb-1.5">
                  {m.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed mt-auto">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Who is it for? */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="bg-brand-beige/40 p-6 sm:p-8 rounded-3xl border border-brand-beige space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-brand-green tracking-tight mb-4">
              למי הסדנה מתאימה?
            </h3>

            <div className="flex items-start gap-3 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
              <p>
                לנשים בגילאי <span dir="ltr">45–60</span> שרוצות להבין טוב יותר את התקופה שהן נמצאות בה, אבל לא רק דרך מה שמשתנה בגוף.
              </p>
            </div>

            <div className="flex items-start gap-3 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
              <p>
                למי שמחפשת מקום לשאול, ללמוד, לשתף, לחשוב ולפגוש נשים שנמצאות בדיוק באותו "בין לבין".
              </p>
            </div>

            <div className="pt-4 border-t border-brand-beige text-center md:text-right">
              <p className="text-base sm:text-lg text-gray-600">
                כי אישה באמצע החיים לא צריכה לגלות את עצמה מחדש.
              </p>
              <p className="text-xl sm:text-2xl font-black text-brand-orange mt-1">
                היא פשוט יכולה לגלות מה עוד יש בה.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pt-8 pb-8 text-center">
          <div className="bg-white p-7 sm:p-10 rounded-[2.5rem] border-2 border-brand-beige shadow-lg max-w-xl mx-auto">
            <div className="text-xl sm:text-2xl font-black text-brand-green mb-2">
              מעוניינת בפרטים על המחזור הקרוב?
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
              דלית מזמינה אותך לשיחה אישית ופתוחה לכל שאלה לקראת פתיחת הקבוצה.
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
            <div className="font-black text-brand-green text-base sm:text-lg">אמצע החיים</div>
            <div className="text-gray-700">8 מפגשים לנשים בגילאי <span dir="ltr">45–60</span></div>
            <div>סדנת הדגל מבית <span className="font-black text-brand-green">בין לבין | תוכניות לנשים</span></div>
          </div>
        </section>

      </div>
    </section>
  );
};

export default MidlifeMiniPage;

