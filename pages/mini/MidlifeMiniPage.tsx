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

  const topics = [
    {
      id: 't1',
      part: 'חלק א׳',
      isPartB: false,
      title: 'כשזה מתחיל להשתנות',
      desc: 'התסמינים הפיזיים והרגשיים של גיל המעבר – להבין מה משתנה ומה יכול לעזור.'
    },
    {
      id: 't2',
      part: 'חלק א׳',
      isPartB: false,
      title: 'בין חיבוק לשחרור',
      desc: 'הורים מתבגרים וסינדרום הקן המתרוקן – בין הורים שמתבגרים לילדים שגדלים ומשחררים.'
    },
    {
      id: 't3',
      part: 'חלק א׳',
      isPartB: false,
      title: 'להחזיר לעצמי כוח',
      desc: 'תזונה, תנועה ושיפור היחסים עם הגוף – להחזיר לעצמי כוח ולבנות מערכת יחסים טובה יותר עם הגוף.'
    },
    {
      id: 't4',
      part: 'חלק א׳',
      isPartB: false,
      title: 'קבלת החלטות מתוך בחירה',
      desc: 'לבחור ממקום אישי ופנימי – לזקק מצבים ותובנות ולתרגם אותם לצעדים מעשיים.'
    },
    {
      id: 't5',
      part: 'חלק ב׳',
      isPartB: true,
      title: 'ללמוד להקשיב',
      desc: 'זהות חדשה שמבקשת להיוולד – להעמיק בהקשבה לעצמנו ולבחירות שלנו דרך חיבור חווייתי.'
    },
    {
      id: 't6',
      part: 'חלק ב׳',
      isPartB: true,
      title: 'מי אני עכשיו?',
      desc: 'זהות, משמעות ולגלות כיוון מחדש – מי אני כשהתפקידים שהגדירו אותי משתנים, ולגלות מחדש כיוון ורצון.'
    },
    {
      id: 't7',
      part: 'חלק ב׳',
      isPartB: true,
      title: 'מגע, מרחק ומה שביניהם',
      desc: 'אינטימיות, תשוקה וזוגיות מחודשת – לדבר גם על מה שמשתנה בינינו וליצור חיבור מחודש.'
    },
    {
      id: 't8',
      part: 'חלק ב׳',
      isPartB: true,
      title: 'לסגור מעגל, לפתוח לב',
      desc: 'הכרת תודה, אושר ומשמעות – לאסוף את התהליך במבט על מה שיש ועל מה שעוד אפשרי.'
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

          {/* Opening Narrative: אמצע החיים. מי הכין אותנו לזה? */}
          <div className="space-y-5 text-lg sm:text-xl text-gray-800 leading-[1.8] max-w-2xl font-normal mx-auto text-right bg-white/85 p-6 sm:p-8 rounded-3xl border border-[#C56B3E]/25 shadow-xs">
            <h2 className="text-2xl sm:text-3xl font-black text-[#C56B3E] tracking-tight">
              אמצע החיים. מי הכין אותנו לזה?
            </h2>

            <p>
              פעם, לפני שהתקשרת לחברה בשלוש בלילה, היית צריכה סיבה ממש טובה.
            </p>
            <p>
              היום מספיק לראות שהיא מחוברת.
            </p>

            <div className="my-3 p-4 rounded-2xl bg-[#FFF4EB]/90 border-r-4 border-[#C56B3E] space-y-2 text-[#2D5043] font-bold">
              <p>&quot;גם את ערה?&quot;</p>
              <p>&quot;כן. כבר הספקתי לעשות בראש סדר בארונות, לשקול להחליף עבודה ולהיזכר שאין חלב.&quot;</p>
            </div>

            <p>
              בבוקר, כמובן, את כבר לא ממש זוכרת בשביל מה פתחת את המקרר.
            </p>

            <p className="font-black text-[#2D5043] pt-2 border-t border-[#C56B3E]/15">
              יש משהו מפתיע באמצע החיים.
            </p>

            <p>
              אנחנו מגיעות עם כל כך הרבה ניסיון, ידע ותובנות שצברנו בדרך. ובכל זאת, דווקא עכשיו מתעוררות לא מעט שאלות חדשות.
            </p>

            <p>
              חלקן קשורות לגוף ולשינויים שלא תמיד הכינו אותנו אליהם. אחרות קשורות לזוגיות, למשפחה, למערכות היחסים ולמה שאנחנו רוצות מעצמנו ומהחיים.
            </p>

            <p>
              ואנחנו, כמו נשים שיודעות להסתדר, מתחילות לחפש תשובות.
            </p>

            <p>
              גוגל, צ&apos;ט, פודקאסטים, שיחות עם חברות. לפעמים גם שואלות &quot;בשביל חברה&quot;.
            </p>

            <p className="font-bold text-[#93542B]">
              רק שהתשובות לא תמיד מתחברות, ולפעמים כל תשובה מביאה איתה עוד שלוש שאלות.
            </p>
          </div>
        </div>

        {/* Section: אולי הגיע הזמן לחבר את הנקודות? */}
        <section className="py-10 sm:py-14 border-b border-[#C56B3E]/20 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-[#C56B3E] mb-6 tracking-tight text-center">
            אולי הגיע הזמן לחבר את הנקודות?
          </h2>

          <div className="space-y-5 text-lg sm:text-xl text-gray-800 leading-[1.8] font-normal max-w-2xl mx-auto text-right">
            <p className="font-bold text-[#2D5043]">
              כי לפעמים הבעיה היא לא שאין תשובות. להפך, יש יותר מדי מהן.
            </p>

            <p>
              מה שחסר הוא רגע להבין מה באמת רלוונטי לחיים שלנו, מה אפשר לעשות אחרת, ואולי אפילו להיזכר בכמה דברים שרצינו לעצמנו ומזמן לא מצאנו זמן להתעכב עליהם.
            </p>

            <div className="bg-[#C56B3E]/10 p-5 rounded-2xl border-r-4 border-[#2D5043] text-center my-4">
              <p className="text-[#2D5043] font-black text-xl sm:text-2xl">
                ומה אם לא היינו צריכות לפענח את כל זה לבד?
              </p>
            </div>
          </div>
        </section>

        {/* Section: אמצע החיים. הרבה יותר מסדנה על גיל המעבר. */}
        <section className="py-10 sm:py-14 border-b border-[#C56B3E]/20 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-[#C56B3E] mb-6 tracking-tight text-center">
            אמצע החיים. הרבה יותר מסדנה על גיל המעבר.
          </h2>

          <div className="space-y-5 text-lg sm:text-xl text-gray-800 leading-[1.8] font-normal max-w-2xl mx-auto text-right">
            <p>
              מתוך ההבנה הזאת נולדה{' '}
              <strong className="font-black text-[#C56B3E]">
                &quot;אמצע החיים&quot;, סדנת הדגל של בין לבין.
              </strong>
            </p>

            <p>
              סדנה שמחברת בין ידע מקצועי בגובה העיניים לחוויה נשית משותפת, עם שיחות פתוחות, התנסויות וכלים מעשיים.
            </p>

            <p>
              הזדמנות לקבל תשובות לשאלות שמעסיקות אותך, להסתכל על דברים מזווית קצת אחרת, לפגוש נשים שנמצאות בשלב חיים דומה ולקחת איתך כלים ותובנות שתוכלי ליישם גם ביומיום.
            </p>

            <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#C56B3E]/30 shadow-sm mt-6 text-center">
              <p className="text-[#C56B3E] font-black text-xl sm:text-2xl leading-relaxed">
                מה אומרת? מצטרפת?
              </p>
            </div>
          </div>
        </section>

        {/* Section: Content Fan (All 8 Possible Topics without session numbers) */}
        <section className="py-10 sm:py-14 border-b border-[#C56B3E]/20">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-5xl font-black text-[#C56B3E] tracking-tight mb-3 text-center">
              מניפת התכנים של הסדנא
            </h2>
            <p className="text-gray-700 text-lg sm:text-xl font-bold text-center">
              סדנה בת 6 מפגשים המחולקים ל-3 מפגשים בכל חלק – מתוך מניפת התכנים נבחרים הנושאים והמרצות בהתאמה לכל מחזור
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {topics.map((m) => (
              <div
                key={m.id}
                className={`bg-white p-6 sm:p-7 rounded-3xl border-2 shadow-sm hover:shadow-md transition-all text-right flex flex-col ${
                  m.isPartB
                    ? 'border-[#C56B3E]/25 hover:border-[#C56B3E]'
                    : 'border-[#2D5043]/25 hover:border-[#2D5043]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`w-10 h-10 rounded-2xl font-black text-base flex items-center justify-center ${
                      m.isPartB
                        ? 'bg-[#C56B3E]/15 text-[#C56B3E]'
                        : 'bg-[#2D5043]/10 text-[#2D5043]'
                    }`}
                  >
                    ✦
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-black px-3 py-1 rounded-full ${
                      m.isPartB
                        ? 'bg-[#FFF4EB] text-[#C56B3E]'
                        : 'bg-[#2D5043]/10 text-[#2D5043]'
                    }`}
                  >
                    {m.part}
                  </span>
                </div>

                <h3 className={`text-xl sm:text-2xl font-black tracking-tight mb-2 text-center ${m.isPartB ? 'text-[#C56B3E]' : 'text-[#2D5043]'}`}>
                  {m.title}
                </h3>

                <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed mt-auto text-center">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 bg-gradient-to-r from-[#FFF4EB] via-[#FFE6D1] to-[#FFF4EB] p-5 sm:p-7 rounded-3xl border-2 border-[#C56B3E] shadow-lg text-center animate-notice-blink">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C56B3E] text-white text-xs font-black mb-2.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-200 animate-ping"></span>
              <span>שימי לב ✦</span>
            </div>
            <p className="text-base sm:text-lg font-black text-[#2D5043] leading-relaxed">
              בכל מחזור מתקיימים 6 מפגשים המחולקים ל-3 מפגשים בכל חלק מתוך מניפת התכנים ובליווי נבחרת מרצות הבית (מיה קדוש, חגית בן ארי, אנה בדוס ריכטר, מיכל שביט, גולדי אברהם, סימה ביטון קצביץ וטליה גולן) – בהתאמה לקבוצה ולדגשי המחזור.
            </p>
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
              מזמינות אותך לשיחה אישית ופתוחה לכל שאלה לקראת פתיחת הקבוצה.
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
            <div className="text-gray-700">6 מפגשים (3 בכל חלק) לנשים בגילאי <span dir="ltr">45–60</span></div>
            <div>סדנת הדגל מבית <span className="font-black text-brand-green">בין לבין | מרחבים לנשים</span></div>
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

