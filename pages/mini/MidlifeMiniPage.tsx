import React, { useEffect } from 'react';
import { MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { ButterflyIcon } from '../../components/Hero';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { MiniPageTopNav, OtherProgramsNav } from '../../components/MiniProgramNav';

const MIDLIFE_LOGO_URL = "/logos/midlife.webp";
const MIDLIFE_LOGO_FALLBACK = "/logos/midlife.png";

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
      title: 'תסמינים ושינויים בגיל המעבר',
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
      desc: 'לסגור את התהליך עם כלים מעולם ה-NLP, במבט על מה שיש ועל מה שעוד אפשרי.'
    }
  ];

  return (
    <section id={id} className={`text-gray-800 antialiased selection:bg-brand-orange/20 selection:text-brand-green relative overflow-hidden ${embedded ? 'py-12 sm:py-16' : 'min-h-screen bg-gradient-to-b from-[#fffaf5] via-[#fff4eb] to-[#fdede0]'}`} dir="rtl">
      {/* Background Ambience Elements */}
      <ButterflyIcon size={260} className="absolute -top-16 -right-20 opacity-[0.035] animate-drift pointer-events-none hidden md:block" />
      <ButterflyIcon size={220} className="absolute top-1/2 -left-20 opacity-[0.03] animate-float pointer-events-none hidden md:block" />
      <ButterflyIcon size={240} className="absolute -bottom-16 right-10 opacity-[0.035] animate-float pointer-events-none hidden md:block" />

      {/* Top Navigation Hub - Standalone */}
      {!embedded && (
        <MiniPageTopNav 
          currentTitle="אמצע החיים" 
          themeColor="#C56B3E" 
          onShare={handleShare} 
        />
      )}

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16 relative z-10">

        {/* Hero Section */}
        <div className="text-center pt-4 pb-10 sm:pb-12 border-b border-[#C56B3E]/20">
          
          {/* Program Dedicated Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-white p-2 sm:p-3 border-4 border-[#C56B3E]/30 shadow-[0_12px_35px_rgba(197,107,62,0.18)] flex items-center justify-center transition-transform hover:scale-105 duration-300 shrink-0 overflow-hidden">
              <img 
                src={MIDLIFE_LOGO_URL} 
                alt="לוגו אמצע החיים" 
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== MIDLIFE_LOGO_FALLBACK) {
                    target.src = MIDLIFE_LOGO_FALLBACK;
                  }
                }}
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm sm:text-base font-black mb-4 bg-[#C56B3E]/10 text-[#C56B3E] border border-[#C56B3E]/30 shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>סדנת הדגל</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#C56B3E] tracking-tight leading-[1.1] mb-4 text-center">
            אמצע החיים
          </h1>

          <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-8 text-center">
            סדנת הדגל של בין לבין לנשים בגילאי <span dir="ltr">45–60</span>
          </div>

          {/* Opening Narrative */}
          <div className="space-y-5 text-xl sm:text-2xl text-gray-800 leading-[1.8] max-w-2xl font-normal mx-auto text-right">
            <p className="font-bold text-gray-900">
              יש תקופות בחיים שבהן הרבה דברים משתנים כמעט במקביל.
            </p>

            <p>
              הגוף משתנה. הילדים גדלים. ההורים מתבגרים. הזוגיות מקבלת צורה אחרת. הקריירה מעלה שאלות חדשות. דברים שהתאימו לנו במשך שנים כבר לא תמיד מרגישים מדויקים.
            </p>

            <div className="bg-[#C56B3E]/10 p-4 rounded-2xl border-r-4 border-[#C56B3E] text-center my-3">
              <p className="text-[#C56B3E] font-black text-2xl sm:text-3xl">
                ובתוך כל אלה, נפתח גם מרחב חדש.
              </p>
            </div>

            <p>
              מרחב לעצור ולשאול מה נכון לי עכשיו. להבין את השינויים שאני עוברת, לקבל ידע וכלים, לפגוש נשים שנמצאות בשלב דומה ולגלות מה עוד מחכה לי בפרק הבא.
            </p>
          </div>
        </div>

        {/* Section: Much more than a menopause workshop */}
        <section className="py-10 sm:py-14 border-b border-[#C56B3E]/20 text-center">
          <div className="inline-block px-5 py-2 bg-[#C56B3E]/10 text-[#C56B3E] rounded-full text-sm sm:text-base font-black mb-4 border border-[#C56B3E]/30">
            מבט רחב ומעמיק
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#C56B3E] mb-6 tracking-tight text-center">
            הרבה יותר מסדנה על גיל המעבר
          </h2>

          <div className="space-y-5 text-lg sm:text-xl md:text-2xl text-gray-800 leading-[1.8] font-normal max-w-2xl mx-auto text-right">
            <p className="text-center font-medium text-gray-700">
              ידע על גיל המעבר אפשר למצוא היום כמעט בכל מקום.
            </p>

            <p className="text-2xl sm:text-3xl font-black text-gray-900 text-center text-[#C56B3E]">
              אבל אמצע החיים הוא הרבה יותר מגיל המעבר.
            </p>

            <p>
              <strong className="font-black text-[#C56B3E]">אמצע החיים</strong> היא מעטפת שמחברת בין ידע מקצועי, שיח נשי, התבוננות אישית וכלים מעשיים.
            </p>

            <p>
              במהלך שמונה מפגשים אנחנו נוגעות בנושאים שמעסיקים נשים בתקופה הזו: השינויים הפיזיים והרגשיים, הגוף, הורים מתבגרים וילדים שעוזבים את הקן, בחירות, זהות, קריירה והגשמה, זוגיות ואינטימיות.
            </p>

            <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#C56B3E]/30 shadow-sm mt-6 text-center">
              <p className="text-[#C56B3E] font-black text-xl sm:text-2xl leading-relaxed">
                כל מפגש משלב הרצאה של אשת מקצוע, שיח בקבוצה ותהליך אישי שממשיך ממפגש למפגש.
              </p>
            </div>
          </div>
        </section>

        {/* Section: The 8 Meetings */}
        <section className="py-10 sm:py-14 border-b border-[#C56B3E]/20">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-5xl font-black text-[#C56B3E] tracking-tight mb-3 text-center">
              שמונה מפגשים. הרבה זוויות. תהליך אחד.
            </h2>
            <p className="text-gray-700 text-lg sm:text-xl font-bold text-center">
              מסע של שמונה שבועות שבו כל מפגש מאיר זווית אחרת של אמצע החיים
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {meetings.map((m) => (
              <div
                key={m.num}
                className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#C56B3E]/25 shadow-sm hover:shadow-md hover:border-[#C56B3E] transition-all text-right flex flex-col"
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-[#C56B3E]/15 text-[#C56B3E] font-black text-base flex items-center justify-center">
                    {m.num}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-gray-500 uppercase tracking-wider">
                    מפגש {m.num}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-2 text-center">
                  {m.title}
                </h3>

                <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed mt-auto text-center">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Who is it for? */}
        <section className="py-10 sm:py-14 border-b border-[#C56B3E]/20">
          <div className="bg-white p-7 sm:p-9 rounded-3xl border-2 border-[#C56B3E]/30 space-y-5 shadow-sm">
            <h3 className="text-3xl sm:text-4xl font-black text-[#C56B3E] tracking-tight mb-4 text-center">
              למי הסדנה מתאימה?
            </h3>

            <div className="flex items-start gap-4 text-lg sm:text-xl text-gray-800 leading-relaxed font-medium">
              <CheckCircle2 className="w-7 h-7 text-[#C56B3E] shrink-0 mt-1" />
              <p>
                לנשים בגילאי <span dir="ltr">45–60</span> שרוצות להבין טוב יותר את התקופה שהן נמצאות בה, אבל לא רק דרך מה שמשתנה בגוף.
              </p>
            </div>

            <div className="flex items-start gap-4 text-lg sm:text-xl text-gray-800 leading-relaxed font-medium">
              <CheckCircle2 className="w-7 h-7 text-[#C56B3E] shrink-0 mt-1" />
              <p>
                למי שמחפשת מקום לשאול, ללמוד, לשתף, לחשוב ולפגוש נשים שנמצאות בדיוק באותו "בין לבין".
              </p>
            </div>

            <div className="pt-6 border-t border-[#C56B3E]/20 text-center">
              <p className="text-lg sm:text-xl text-gray-700 font-medium">
                כי אישה באמצע החיים לא צריכה לגלות את עצמה מחדש.
              </p>
              <p className="text-2xl sm:text-3xl font-black text-[#C56B3E] mt-2">
                היא פשוט יכולה לגלות מה עוד יש בה.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 sm:py-14 border-b border-[#C56B3E]/20 text-center">
          <div className="bg-white p-8 sm:p-11 rounded-[2.5rem] border-2 border-[#C56B3E]/30 shadow-md max-w-xl mx-auto">
            <div className="text-2xl sm:text-3xl font-black text-[#C56B3E] mb-3 text-center">
              מעוניינת בפרטים נוספים?
            </div>
            
            <p className="text-base sm:text-lg text-gray-700 mb-7 font-medium text-center">
              דלית מזמינה אותך לשיחה אישית ופתוחה לכל שאלה לקראת פתיחת הקבוצה.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#C56B3E] hover:bg-[#a84f24] text-white px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-black transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-98"
            >
              <WhatsAppIcon className="w-6 h-6 fill-current text-white" />
              <span>אשמח לשוחח</span>
            </a>
          </div>

          {/* Sub-footer sign-off */}
          <div className="mt-8 text-center text-xs sm:text-sm text-gray-600 font-bold space-y-1">
            <div className="font-black text-[#C56B3E] text-base sm:text-lg">אמצע החיים</div>
            <div className="text-gray-700">8 מפגשים לנשים בגילאי <span dir="ltr">45–60</span></div>
            <div>סדנת הדגל מבית <span className="font-black text-brand-green">בין לבין | תוכניות וריטריטים לנשים</span></div>
          </div>
        </section>

        {/* Navigation to Other Programs - AT THE VERY END */}
        {!embedded && (
          <div className="pt-8 pb-4">
            <OtherProgramsNav currentProgramId="midlife" />
          </div>
        )}

      </div>
    </section>
  );
};

export default MidlifeMiniPage;

