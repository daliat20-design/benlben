import React, { useEffect } from 'react';
import { MessageCircle, Compass, CheckCircle2, Tent, Flag } from 'lucide-react';
import { ButterflyIcon } from '../../components/Hero';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { MiniPageTopNav, OtherProgramsNav } from '../../components/MiniProgramNav';

const THE_TENT_LOGO_URL = "/logos/the-tent.webp";
const THE_TENT_LOGO_FALLBACK = "/logos/the-tent.png";

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
    <section id={id} className={`text-gray-800 antialiased selection:bg-[#914e13]/20 selection:text-[#914e13] relative overflow-hidden ${embedded ? 'py-12 sm:py-16' : 'min-h-screen bg-gradient-to-b from-[#fdfbf7] via-[#faf4ea] to-[#f4e8d5]'}`} dir="rtl">
      {/* Background Ambience Elements */}
      <ButterflyIcon size={260} className="absolute -top-16 -right-20 opacity-[0.04] animate-drift pointer-events-none hidden md:block" />
      <ButterflyIcon size={220} className="absolute top-1/2 -left-20 opacity-[0.035] animate-float pointer-events-none hidden md:block" />
      <ButterflyIcon size={240} className="absolute -bottom-16 right-10 opacity-[0.04] animate-float pointer-events-none hidden md:block" />

      {/* Top Navigation Hub - Standalone */}
      {!embedded && (
        <MiniPageTopNav 
          currentTitle="האוהל" 
          themeColor="#914e13" 
          onShare={handleShare} 
        />
      )}

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16 relative z-10">

        {/* Hero Section */}
        <div className="text-center pt-4 pb-10 sm:pb-12 border-b border-[#b87333]/25">
          
          {/* Program Dedicated Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-white p-2 sm:p-3 border-4 border-[#b87333]/35 shadow-[0_12px_35px_rgba(184,115,51,0.18)] flex items-center justify-center transition-transform hover:scale-105 duration-300 shrink-0 overflow-hidden">
              <img 
                src={THE_TENT_LOGO_URL} 
                alt="לוגו האוהל" 
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== THE_TENT_LOGO_FALLBACK) {
                    target.src = THE_TENT_LOGO_FALLBACK;
                  }
                }}
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm sm:text-base font-black mb-4 bg-[#b87333]/15 text-[#914e13] border border-[#b87333]/35 shadow-xs">
            <Tent className="w-5 h-5 text-[#914e13]" />
            <span>תוכנית למנהיגות, יוזמה והשפעה נשית</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#914e13] tracking-tight leading-[1.1] mb-4 text-center">
            האוהל
          </h1>

          <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-8 text-center">
            תוכנית למנהיגות, יוזמה והשפעה נשית
          </div>

          {/* Narrative Opening */}
          <div className="space-y-5 text-xl sm:text-2xl text-gray-800 leading-[1.8] max-w-2xl font-normal mx-auto text-right">
            <p className="text-2xl sm:text-3xl font-black text-[#914e13] text-center">
              יש נשים שרוצות לעשות יותר.
            </p>

            <p>
              יש להן ניסיון, יכולות, היכרות עמוקה עם אנשים וקהילה, רעיונות ודברים שחשוב להן לקדם. לא תמיד הן מגדירות את עצמן כמנהיגות, ולא תמיד ברור להן איך להפוך את כל מה שכבר קיים בהן ליוזמה ולעשייה.
            </p>

            <div className="bg-[#b87333]/12 p-5 rounded-2xl border-r-4 border-[#914e13] my-2 text-center">
              <p className="font-bold text-[#914e13] text-xl sm:text-2xl leading-relaxed">
                <strong className="font-black">&quot;האוהל&quot;</strong> היא תוכנית שמחברת בין הכוחות והניסיון שכבר קיימים בכל משתתפת לבין היכולת לזהות איפה היא רוצה להשפיע, מה היא רוצה להוביל ואיך מתחילים להפוך כוונה לעשייה.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Why a tent? */}
        <section className="py-10 sm:py-14 border-b border-[#b87333]/25 text-center">
          <div className="inline-block px-5 py-1.5 bg-[#b87333]/15 text-[#914e13] rounded-full text-sm sm:text-base font-black mb-3 border border-[#b87333]/30">
            הדימוי המוביל
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#914e13] mb-6 tracking-tight text-center">
            למה דווקא אוהל?
          </h2>

          <div className="space-y-5 text-lg sm:text-xl md:text-2xl text-gray-800 leading-[1.8] font-normal max-w-2xl mx-auto text-right">
            <p className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
              האוהל הוא הדימוי שמלווה את התהליך כולו.
            </p>

            <p className="text-center">
              כדי לצאת ולהשפיע צריך קודם לדעת מהן היתדות שמחזיקות אותי, לאן אני בוחרת להפנות את הפתח, איזה קול אני מביאה איתי ואיפה אני רוצה להרחיב את היריעות.
            </p>

            <p className="text-center">
              דרך הדימוי הזה המשתתפות עוברות תהליך שמתחיל בזיהוי הכוחות, הערכים והניסיון שלהן ומתקדם בהדרגה אל מנהיגות, יוזמה והשפעה.
            </p>

            <div className="p-7 sm:p-8 bg-white rounded-3xl border-2 border-[#b87333]/30 shadow-sm space-y-3 mt-6 text-center">
              <p className="text-base sm:text-lg text-gray-600 font-bold">
                לא מנהיגות כתפקיד.
              </p>
              <p className="text-xl sm:text-2xl font-black text-[#914e13] leading-relaxed">
                מנהיגות כיכולת לראות צורך, לגבש רעיון, לרתום אחרות ולהתחיל להזיז משהו במרחב שבו אני חיה ופועלת.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 5 Meetings */}
        <section className="py-10 sm:py-14 border-b border-[#b87333]/25">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-5xl font-black text-[#914e13] tracking-tight mb-3 text-center">
              חמישה מפגשים. מהכוחות שלי אל העשייה.
            </h2>
            <p className="text-gray-700 text-lg sm:text-xl font-bold text-center">
              מסע תהליכי של חמישה שלבים המחברים בין עוגן פנימי להשפעה חיצונית
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {meetings.map((m) => (
              <div
                key={m.num}
                className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#b87333]/25 shadow-sm hover:shadow-md hover:border-[#914e13] transition-all text-right flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <span className="w-12 h-12 rounded-2xl bg-[#b87333]/15 text-[#914e13] border border-[#b87333]/40 font-black text-lg flex items-center justify-center shrink-0">
                    0{m.num}
                  </span>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                        {m.title}
                      </h3>
                      <span className="text-[#914e13] font-bold text-base">|</span>
                      <span className="text-base sm:text-lg font-black text-[#914e13]">
                        {m.subtitle}
                      </span>
                    </div>
                    <p className="text-base sm:text-lg text-gray-700 font-medium mt-1 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-6 bg-white rounded-2xl border-2 border-[#b87333]/20 text-center">
            <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed">
              המפגשים משלבים ידע והשראה עם עבודה תהליכית, כתיבה, שיח, עבודה משותפת וכלים שמסייעים לעבור בהדרגה מחשיבה לעשייה.
            </p>
          </div>
        </section>

        {/* Section: Planting the Tent Peg - Peak Day */}
        <section className="py-10 sm:py-14 border-b border-[#b87333]/25">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#b87333]/25 shadow-sm space-y-5 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center gap-2 text-[#914e13] bg-[#b87333]/15 px-4 py-1.5 rounded-full font-black text-sm border border-[#b87333]/35">
              <Flag className="w-5 h-5 text-[#914e13]" />
              <span>יום שיא לפיתוח יוזמות</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#914e13] tracking-tight text-center">
              נוטעות יתד
            </h2>

            <div className="space-y-4 text-right">
              <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-bold">
                התהליך מסתיים ביום שיא שמוקדש למעבר <strong className="font-black text-[#914e13]">מרעיון ליוזמה</strong>.
              </p>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                המשתתפות עובדות על צורך או נושא שחשוב להן, מחדדות למי הן רוצות לפעול, מפתחות כיוון ליוזמה ובוחנות מה נדרש כדי להתחיל לקדם אותה.
              </p>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                אפשר לעבוד באופן אישי או להתחבר לנשים נוספות סביב רעיון משותף.
              </p>
            </div>

            <div className="p-6 bg-[#b87333]/12 rounded-2xl border border-[#b87333]/25 space-y-2 text-center mt-4">
              <p className="text-base text-gray-700 font-bold">
                המטרה אינה לצאת ביום אחד עם מיזם שלם.
              </p>
              <p className="text-xl sm:text-2xl font-black text-[#914e13] leading-relaxed">
                המטרה היא לצאת עם רעיון מגובש יותר, שותפות אפשריות וצעד ראשון שאפשר להתחיל ממנו.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Who is the program for? */}
        <section className="py-10 sm:py-14 border-b border-[#b87333]/25">
          <div className="bg-white p-7 sm:p-9 rounded-3xl border-2 border-[#b87333]/25 space-y-5 shadow-sm">
            <div className="flex items-center justify-center gap-2 text-[#914e13] font-bold text-sm sm:text-base">
              <Compass className="w-5 h-5" />
              <span>קהל היעד</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-[#914e13] tracking-tight mb-4 text-center">
              למי התוכנית מתאימה?
            </h3>

            <div className="flex items-start gap-4 text-lg sm:text-xl text-gray-800 leading-relaxed font-medium">
              <CheckCircle2 className="w-7 h-7 text-[#914e13] shrink-0 mt-1" />
              <p>
                לנשים שרוצות להיות מעורבות יותר, להוביל, ליזום ולהשפיע בקהילה ובמרחבים שבהם הן פועלות.
              </p>
            </div>

            <div className="flex items-start gap-4 text-lg sm:text-xl text-gray-800 leading-relaxed font-medium">
              <CheckCircle2 className="w-7 h-7 text-[#914e13] shrink-0 mt-1" />
              <p>
                גם לנשים שכבר פעילות ומחפשות את הצעד הבא, וגם לנשים שמרגישות שיש להן מה לתת ורוצות למצוא את המקום והדרך להפוך את זה לעשייה.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 sm:py-14 border-b border-[#b87333]/25 text-center">
          <div className="bg-white p-8 sm:p-11 rounded-[2.5rem] border-2 border-[#b87333]/30 shadow-md max-w-xl mx-auto">
            <div className="text-2xl sm:text-3xl font-black text-[#914e13] mb-3 text-center">
              רוצה לקבל פרטים על המחזור הקרוב של האוהל?
            </div>
            
            <p className="text-base sm:text-lg text-gray-700 mb-7 font-medium text-center">
              דלית מזמינה אותך לשיחה אישית ופתוחה לכל שאלה לקראת פתיחת התוכנית.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#914e13] hover:bg-[#723b0b] text-white px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-black transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-98"
            >
              <WhatsAppIcon className="w-6 h-6 fill-current text-white" />
              <span>אשמח לשוחח</span>
            </a>
          </div>

          {/* Sub-footer sign-off */}
          <div className="mt-8 text-center text-xs sm:text-sm text-gray-600 font-bold space-y-1">
            <div className="font-black text-[#914e13] text-base sm:text-lg">האוהל</div>
            <div className="text-gray-700">5 מפגשים תהליכיים + יום שיא לפיתוח יוזמות</div>
            <div>מבית <span className="font-black text-brand-green">בין לבין | תוכניות וריטריטים לנשים</span></div>
          </div>
        </section>

        {/* Navigation to Other Programs - AT THE VERY END */}
        {!embedded && (
          <div className="pt-8 pb-4">
            <OtherProgramsNav currentProgramId="the-tent" />
          </div>
        )}

      </div>
    </section>
  );
};

export default TheTentMiniPage;
