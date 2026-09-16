import React, { useEffect } from 'react';
import { MessageCircle, Building2, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { ButterflyIcon } from '../../components/Hero';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { MiniPageTopNav, OtherProgramsNav } from '../../components/MiniProgramNav';

const HIGHLIGHTS_LOGO_URL = "/logos/highlights.webp";
const HIGHLIGHTS_LOGO_FALLBACK = "/logos/highlights.png";

export const HighlightsMiniPage: React.FC<{ embedded?: boolean; id?: string }> = ({ embedded = false, id = 'highlights' }) => {
  useEffect(() => {
    if (!embedded) {
      document.title = "היילייטס | מניסיון ונוכחות להובלה והשפעה בארגונים | בין לבין";
      window.scrollTo(0, 0);
    }
  }, [embedded]);

  const whatsappMessage = encodeURIComponent(
    "היי דלית, קראתי על תוכנית 'היילייטס' לפיתוח אישי ומקצועי לנשים בארגונים, ואשמח לשמוע פרטים נוספים ולתאם שיחת היכרות."
  );
  const whatsappUrl = `https://wa.me/972508353731?text=${whatsappMessage}`;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "היילייטס | מניסיון ונוכחות להובלה והשפעה | בין לבין",
          text: "היילייטס - תוכנית פיתוח אישית ומקצועית לנשים באמצע החיים בארגונים. מבית בין לבין | תוכניות לנשים.",
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

  const focusAreas = [
    {
      id: 1,
      title: 'נוכחות, קול והשפעה',
      desc: 'חיזוק הביטוי המקצועי, הנראות וההשפעה בארגון.'
    },
    {
      id: 2,
      title: 'קריירה והשלב המקצועי הבא',
      desc: 'זיהוי נכסים מקצועיים, דיוק שאיפות ופתיחת אפשרויות להמשך הדרך.'
    },
    {
      id: 3,
      title: 'עומס, אנרגיה ואיזונים',
      desc: 'התמודדות עם שחיקה, ניהול משאבים והצבת גבולות.'
    },
    {
      id: 4,
      title: 'גוף ושינויי אמצע החיים',
      desc: 'ידע וכלים להתמודדות עם השינויים הפיזיולוגיים והשפעתם על התפקוד ואיכות החיים.'
    },
    {
      id: 5,
      title: 'משמעות, חוסן ובחירה',
      desc: 'חיבור מחודש לערכים, לכוחות ולמה שמניע אותנו עכשיו.'
    },
    {
      id: 6,
      title: 'קשרים, עמיתות ושייכות',
      desc: 'חיזוק מערכות יחסים, רישות פנים ארגוני ויצירת קבוצת עמיתות משמעותית.'
    },
    {
      id: 7,
      title: 'מנהיגות והשפעה',
      desc: 'פיתוח סגנון מנהיגות אישי ומינוף הניסיון והוותק להובלה ולהשפעה.'
    }
  ];

  return (
    <section id={id} className={`text-gray-800 antialiased selection:bg-[#204C8E]/20 selection:text-[#204C8E] relative overflow-hidden ${embedded ? 'py-12 sm:py-16' : 'min-h-screen bg-gradient-to-b from-[#f5f8fc] via-[#edf3fc] to-[#dfeaf9]'}`} dir="rtl">
      {/* Background Ambience Elements */}
      <ButterflyIcon size={260} className="absolute -top-16 -right-20 opacity-[0.04] animate-drift pointer-events-none hidden md:block" />
      <ButterflyIcon size={220} className="absolute top-1/2 -left-20 opacity-[0.035] animate-float pointer-events-none hidden md:block" />
      <ButterflyIcon size={240} className="absolute -bottom-16 right-10 opacity-[0.04] animate-float pointer-events-none hidden md:block" />

      {/* Top Navigation Hub - Standalone */}
      {!embedded && (
        <MiniPageTopNav 
          currentTitle="היילייטס" 
          themeColor="#204C8E" 
          onShare={handleShare} 
        />
      )}

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16 relative z-10">

        {/* Hero & Opening Section */}
        <div className="text-center pt-4 pb-10 sm:pb-12 border-b border-[#204C8E]/20">
          
          {/* Program Dedicated Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-white p-2 sm:p-3 border-4 border-[#204C8E]/30 shadow-[0_12px_35px_rgba(32,76,142,0.18)] flex items-center justify-center transition-transform hover:scale-105 duration-300 shrink-0 overflow-hidden">
              <img 
                src={HIGHLIGHTS_LOGO_URL} 
                alt="לוגו היילייטס" 
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== HIGHLIGHTS_LOGO_FALLBACK) {
                    target.src = HIGHLIGHTS_LOGO_FALLBACK;
                  }
                }}
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm sm:text-base font-black mb-4 bg-[#204C8E]/10 text-[#204C8E] border border-[#204C8E]/30 shadow-xs">
            <Building2 className="w-5 h-5 text-[#204C8E]" />
            <span>תוכנית לארגונים וחברות</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#204C8E] tracking-tight leading-[1.1] mb-4 text-center">
            היילייטס
          </h1>

          <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3 text-center">
            מניסיון ונוכחות להובלה והשפעה
          </div>

          <p className="text-xl sm:text-2xl font-bold text-[#204C8E] mb-8 text-center">
            תוכנית פיתוח אישית ומקצועית לנשים באמצע החיים בארגונים
          </p>

          {/* Narrative Opening */}
          <div className="space-y-5 text-xl sm:text-2xl text-gray-800 leading-[1.8] max-w-2xl font-normal mx-auto text-right">
            <p className="text-center">
              נשים באמצע החיים מחזיקות בניסיון עשיר, במומחיות ובהיכרות עמוקה עם הארגון. במקביל, זהו שלב שמפגיש שינויים אישיים, משפחתיים, פיזיולוגיים ומקצועיים ולעיתים גם שאלות חדשות על המשך הדרך.
            </p>

            <p className="text-2xl sm:text-3xl font-black text-[#204C8E] pt-2 text-center">
              <strong>היילייטס</strong> נולדה מתוך ההבנה שדווקא בצומת הזה יש הזדמנות.
            </p>

            {/* Two opportunities cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-6 rounded-3xl border-2 border-[#204C8E]/25 shadow-sm text-center">
                <div className="text-sm sm:text-base font-black text-[#204C8E] uppercase tracking-wider mb-2">
                  הזדמנות עבור האישה
                </div>
                <p className="text-base sm:text-lg text-gray-800 font-bold leading-relaxed">
                  לעצור, לזהות מחדש את הכוחות, הניסיון והאפשרויות שלה ולהרחיב את הנוכחות וההשפעה שלה.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border-2 border-[#204C8E]/25 shadow-sm text-center">
                <div className="text-sm sm:text-base font-black text-[#D2600F] uppercase tracking-wider mb-2">
                  הזדמנות עבור הארגון
                </div>
                <p className="text-base sm:text-lg text-gray-800 font-bold leading-relaxed">
                  לטפח הון אנושי מנוסה, לחזק מחוברות ולתרגם ניסיון מצטבר להמשך צמיחה, יוזמה והשפעה.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Personal Growth. Organizational Value. */}
        <section className="py-10 sm:py-14 border-b border-[#204C8E]/20 text-center">
          <div className="inline-block px-5 py-1.5 bg-[#204C8E]/10 text-[#204C8E] rounded-full text-sm sm:text-base font-black mb-3 border border-[#204C8E]/30">
            החיבור המנצח
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#204C8E] mb-6 tracking-tight text-center">
            התפתחות אישית. ערך ארגוני.
          </h2>

          <div className="space-y-5 text-lg sm:text-xl md:text-2xl text-gray-800 leading-[1.8] font-normal max-w-2xl mx-auto text-right">
            <p className="text-center">
              היילייטס מחברת בין עולמה של האישה, הניסיון המקצועי שלה והמציאות הארגונית שבה היא פועלת.
            </p>

            <p className="text-center">
              באמצעות ידע מקצועי, תהליכי התפתחות אישית, שיח קבוצתי וכלים מעשיים נוצר מרחב שמאפשר למשתתפות להתבונן מחדש על המקום שלהן בארגון ועל השלב הבא שלהן בתוכו.
            </p>

            <div className="p-6 sm:p-7 bg-white rounded-3xl border-2 border-[#204C8E]/30 shadow-sm text-center mt-5">
              <p className="text-xl sm:text-2xl font-black text-[#204C8E] leading-relaxed">
                ידע הופך להבנה. הבנה הופכת לבחירה. בחירה הופכת לתנועה אישית וארגונית.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Focus Areas */}
        <section className="py-10 sm:py-14 border-b border-[#204C8E]/20">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-5xl font-black text-[#204C8E] tracking-tight mb-3 text-center">
              במה אפשר להתמקד?
            </h2>
            <p className="text-gray-700 text-lg sm:text-xl font-bold text-center">
              התוכנית נבנית בהתאם לצרכים ולמטרות של כל ארגון ויכולה לשלב בין עולמות תוכן שונים:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {focusAreas.map((area) => (
              <div
                key={area.id}
                className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#204C8E]/25 shadow-sm hover:shadow-md hover:border-[#204C8E] transition-all text-right flex flex-col"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="w-10 h-10 rounded-2xl bg-[#204C8E]/15 text-[#204C8E] border border-[#5E98F1]/40 font-black text-base flex items-center justify-center">
                    0{area.id}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-2 text-center">
                  {area.title}
                </h3>

                <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed mt-auto text-center">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Not an Off-the-Shelf Product */}
        <section className="py-10 sm:py-14 border-b border-[#204C8E]/20">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#204C8E]/25 shadow-sm space-y-5 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center gap-2 text-[#204C8E] font-black text-sm sm:text-base">
              <Sparkles className="w-5 h-5 text-[#D2600F]" />
              <span>התאמה אישית מלאה</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#204C8E] tracking-tight text-center">
              לא מוצר מדף
            </h2>

            <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-bold text-center">
              כל ארגון מתחיל מנקודה אחרת.
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium text-center">
              לכן היילייטס אינה מגיעה כתוכנית סגורה מראש. התהליך מתחיל בהיכרות ובבירור הצרכים, ומתוכם נבחרים נקודות הפוקוס, התכנים והמבנה המתאימים לארגון ולנשים המשתתפות.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-center">
              <div className="p-5 sm:p-6 bg-[#204C8E]/10 rounded-2xl border border-[#204C8E]/25">
                <div className="font-black text-[#204C8E] text-lg mb-1">
                  תהליך עומק קבוצתי
                </div>
                <p className="text-base text-gray-800 font-medium">
                  סדרה של 4–8 מפגשים תהליכיים המעמיקים בנושאים הנבחרים ומלווים הטמעה.
                </p>
              </div>

              <div className="p-5 sm:p-6 bg-[#204C8E]/10 rounded-2xl border border-[#204C8E]/25">
                <div className="font-black text-[#204C8E] text-lg mb-1">
                  Spotlight – יום שיא ממוקד
                </div>
                <p className="text-base text-gray-800 font-medium">
                  סדנה מרוכזת או יום שיא סביב נושא או צורך מסוים הרלוונטי לארגון.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: What does the organization gain? */}
        <section className="py-10 sm:py-14 border-b border-[#204C8E]/20">
          <div className="bg-white p-7 sm:p-9 rounded-3xl border-2 border-[#204C8E]/25 space-y-5 shadow-sm">
            <div className="flex items-center justify-center gap-2 text-[#204C8E] font-bold text-sm sm:text-base">
              <TrendingUp className="w-5 h-5 text-[#D2600F]" />
              <span>ערך ארגוני והשפעה מדידה</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-[#204C8E] tracking-tight mb-3 text-center">
              ומה הארגון מרוויח?
            </h3>

            <div className="flex items-start gap-4 text-lg sm:text-xl text-gray-800 leading-relaxed font-medium">
              <CheckCircle2 className="w-7 h-7 text-[#204C8E] shrink-0 mt-1" />
              <p>
                חיבור מחודש של נשים מנוסות לארגון, חיזוק תחושת המשמעות והמסוגלות, הרחבת הנוכחות וההשפעה ושימור ידע והון אנושי משמעותי.
              </p>
            </div>

            <div className="flex items-start gap-4 text-lg sm:text-xl text-gray-800 leading-relaxed font-medium">
              <CheckCircle2 className="w-7 h-7 text-[#204C8E] shrink-0 mt-1" />
              <p>
                בסיום תהליך עומק ניתן גם לקבל תמונת מצב אנונימית ומגמתית של תובנות, צרכים ונושאים שעלו בקבוצה, כבסיס להמשך חשיבה ארגונית.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 sm:py-14 border-b border-[#204C8E]/20 text-center">
          <div className="bg-white p-8 sm:p-11 rounded-[2.5rem] border-2 border-[#204C8E]/30 shadow-md max-w-xl mx-auto">
            <div className="text-2xl sm:text-3xl font-black text-[#204C8E] mb-3 text-center">
              רוצה לבחון התאמה לארגון שלך?
            </div>
            
            <p className="text-base sm:text-lg text-gray-700 mb-7 font-medium text-center">
              דלית מזמינה מנהלות ומנהלי משאבי אנוש, הדרכה, רווחה ומובילות בארגונים לשיחת חשיבה והתאמה משותפת.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#204C8E] hover:bg-[#183a6d] text-white px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-black transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-98"
            >
              <WhatsAppIcon className="w-6 h-6 fill-current text-white" />
              <span>אשמח לשוחח</span>
            </a>
          </div>

          {/* Sub-footer sign-off */}
          <div className="mt-8 text-center text-xs sm:text-sm text-gray-600 font-bold space-y-1">
            <div className="font-black text-[#204C8E] text-base sm:text-lg">היילייטס</div>
            <div className="text-gray-700">תוכנית פיתוח אישית ומקצועית לנשים באמצע החיים בארגונים</div>
            <div>מבית <span className="font-black text-brand-green">בין לבין | תוכניות וריטריטים לנשים</span></div>
          </div>
        </section>

        {/* Navigation to Other Programs - AT THE VERY END */}
        {!embedded && (
          <div className="pt-8 pb-4">
            <OtherProgramsNav currentProgramId="highlights" />
          </div>
        )}

      </div>
    </section>
  );
};

export default HighlightsMiniPage;
