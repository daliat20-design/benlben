import React, { useEffect } from 'react';
import { MessageCircle, Users, CheckCircle2, HeartHandshake, Sparkles } from 'lucide-react';
import { ButterflyIcon } from '../../components/Hero';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { MiniPageTopNav, OtherProgramsNav } from '../../components/MiniProgramNav';

const AHEAD_OF_YOU_LOGO_URL = "https://i.postimg.cc/L53wDLTH/Chat-GPT-Image-Sep-16-2026-10-04-45-AM.png";
const AHEAD_OF_YOU_LOGO_FALLBACK = "https://i.postimg.cc/L53wDLTH/Chat-GPT-Image-Sep-16-2026-10-04-45-AM.png";

export const AheadOfYouMiniPage: React.FC<{ embedded?: boolean; id?: string }> = ({ embedded = false, id = 'ahead-of-you' }) => {
  useEffect(() => {
    if (!embedded) {
      document.title = "עוֹד לְפָנַיִךְ | תוכנית לנשים 60+ | בין לבין";
      window.scrollTo(0, 0);
    }
  }, [embedded]);

  const whatsappMessage = encodeURIComponent(
    "היי דלית, קראתי על התוכנית 'עוֹד לְפָנַיִךְ' לנשים 60+ ואשמח לקבל פרטים נוספים."
  );
  const whatsappUrl = `https://wa.me/972508353731?text=${whatsappMessage}`;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "עוֹד לְפָנַיִךְ | תוכנית לנשים 60+ | בין לבין",
          text: "עוֹד לְפָנַיִךְ - תוכנית לנשים 60+ מבית בין לבין | תוכניות וריטריטים לנשים.",
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
      title: 'הגוף והבריאות',
      desc: 'שינויים פיזיים, תנועה, חיוניות ואיכות חיים.'
    },
    {
      title: 'משפחה ויחסים',
      desc: 'ילדים בוגרים, נכדים, זוגיות, גבולות ותפקידים בתוך המשפחה.'
    },
    {
      title: 'הזמן והעצמאות שלי',
      desc: 'הזמן שהתפנה, הבחירות שלי וההתנהלות בעולם שמשתנה.'
    },
    {
      title: 'חברות וקשרים',
      desc: 'קשרים ותיקים וחדשים, חברות נשית, בדידות ושייכות.'
    },
    {
      title: 'סקרנות, למידה ועשייה',
      desc: 'מה מעניין אותי ללמוד, לנסות, לעשות ולהיות חלק ממנו.'
    }
  ];

  return (
    <section id={id} className={`text-gray-800 antialiased selection:bg-[#b04a5a]/20 selection:text-[#b04a5a] relative overflow-hidden ${embedded ? 'py-12 sm:py-16' : 'min-h-screen bg-gradient-to-b from-[#fdf6f7] via-[#faedf0] to-[#f5dfe4]'}`} dir="rtl">
      {/* Background Ambience Elements */}
      <ButterflyIcon size={260} className="absolute -top-16 -right-20 opacity-[0.035] animate-drift pointer-events-none hidden md:block" />
      <ButterflyIcon size={220} className="absolute top-1/2 -left-20 opacity-[0.03] animate-float pointer-events-none hidden md:block" />
      <ButterflyIcon size={240} className="absolute -bottom-16 right-10 opacity-[0.035] animate-float pointer-events-none hidden md:block" />

      {/* Top Navigation Hub - Standalone */}
      {!embedded && (
        <MiniPageTopNav 
          currentTitle="עוֹד לְפָנַיִךְ" 
          themeColor="#b04a5a" 
          onShare={handleShare} 
        />
      )}

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16 relative z-10">

        {/* Hero & Intro Section */}
        <div className="text-center pt-4 pb-10 sm:pb-12 border-b border-[#b04a5a]/20">
          
          {/* Program Dedicated Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-white p-2 sm:p-3 border-4 border-[#b04a5a]/30 shadow-[0_12px_35px_rgba(176,74,90,0.18)] flex items-center justify-center transition-transform hover:scale-105 duration-300 shrink-0 overflow-hidden">
              <img 
                src={AHEAD_OF_YOU_LOGO_URL} 
                alt="לוגו עוֹד לְפָנַיִךְ" 
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== AHEAD_OF_YOU_LOGO_FALLBACK) {
                    target.src = AHEAD_OF_YOU_LOGO_FALLBACK;
                  }
                }}
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm sm:text-base font-black mb-4 bg-[#b04a5a]/10 text-[#b04a5a] border border-[#b04a5a]/30 shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>תוכנית לנשים <span dir="ltr">60+</span></span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#b04a5a] tracking-tight leading-[1.1] mb-4 text-center">
            עוֹד לְפָנַיִךְ
          </h1>

          <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-8 text-center">
            תוכנית לנשים <span dir="ltr">60+</span>
          </div>

          {/* Narrative Opening */}
          <div className="space-y-5 text-xl sm:text-2xl text-gray-800 leading-[1.8] max-w-2xl font-normal mx-auto text-right">
            <p className="text-center text-2xl sm:text-3xl font-black text-[#b04a5a]">
              יש שלב שבו משהו בקצב משתנה.
            </p>

            <p>
              הילדים כבר חיים את החיים שלהם, לפעמים כבר יש נכדים, הגוף מבקש התייחסות אחרת, מערכות היחסים משתנות ויש קצת יותר מקום גם לעצמי.
            </p>

            <div className="bg-[#b04a5a]/10 p-4 rounded-2xl border-r-4 border-[#b04a5a] my-2">
              <p className="font-bold text-gray-900">
                <strong className="text-[#b04a5a] font-black">עוֹד לְפָנַיִךְ</strong> היא תוכנית שמביאה לשולחן את הנושאים שמעסיקים נשים בשלב הזה בחיים. ידע מקצועי לצד שיחה פתוחה, ניסיון החיים שכל אחת מביאה איתה, והיכרות עם נשים שנמצאות במקום דומה.
              </p>
            </div>

            <p>
              מדברים על מה שקורה בגוף ובבריאות, על המשפחה והיחסים שמשתנים, על הזמן שהתפנה ועל עצמאות, חברות וקשרים, וגם על הדברים שעוד מעניין אותנו ללמוד, לנסות ולעשות.
            </p>
          </div>
        </div>

        {/* Section: What we will talk about */}
        <section className="py-10 sm:py-14 border-b border-[#b04a5a]/20">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-5xl font-black text-[#b04a5a] tracking-tight mb-3 text-center">
              על מה נדבר?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {topics.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#b04a5a]/25 shadow-sm hover:shadow-md hover:border-[#b04a5a] transition-all text-right flex flex-col"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#b04a5a]/15 text-[#b04a5a] font-black text-base flex items-center justify-center mb-4">
                  {idx + 1}
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-2">
                  {t.title}
                </h3>

                <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed mt-auto">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: What happens when we meet regularly? */}
        <section className="py-10 sm:py-14 border-b border-[#b04a5a]/20">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#b04a5a]/30 shadow-sm space-y-5 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2.5 text-[#b04a5a] font-black text-base mb-1">
              <HeartHandshake className="w-6 h-6" />
              <span>החברותא הנשית</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#b04a5a] tracking-tight text-center">
              ומה קורה כשנפגשות באופן קבוע?
            </h2>

            <div className="space-y-4 text-right">
              <p className="text-2xl sm:text-3xl font-black text-[#b04a5a] text-center">
                נוצרת קבוצה.
              </p>

              <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-normal">
                נשים שמגיעות עם ניסיון, שאלות, דעות וסיפורים. מכירות, משתפות, מתייעצות, צוחקות ולומדות גם מנשות המקצוע וגם זו מזו.
              </p>

              <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-normal">
                עם הזמן נוצרת היכרות אמיתית, ולעיתים גם קשרים שממשיכים הרבה מעבר למפגשים עצמם.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Who is the program for? */}
        <section className="py-10 sm:py-14 border-b border-[#b04a5a]/20">
          <div className="bg-white p-7 sm:p-9 rounded-3xl border-2 border-[#b04a5a]/30 space-y-5 shadow-sm">
            <div className="flex items-center justify-center gap-2 text-[#b04a5a] font-bold text-sm sm:text-base">
              <Users className="w-5 h-5" />
              <span>הקהילה שלנו</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-[#b04a5a] tracking-tight mb-4 text-center">
              למי התוכנית מתאימה?
            </h3>

            <div className="flex items-start gap-4 text-lg sm:text-xl text-gray-800 leading-relaxed font-medium">
              <CheckCircle2 className="w-7 h-7 text-[#b04a5a] shrink-0 mt-1" />
              <p>
                לנשים <span dir="ltr" className="font-bold">60+</span> שמחפשות תוכן שמדבר אל החיים שלהן היום, לצד מפגש קבוע עם נשים נוספות, שיחה טובה, למידה וחברותא.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section - BEFORE other programs */}
        <section className="py-10 sm:py-14 border-b border-[#b04a5a]/20 text-center">
          <div className="bg-white p-8 sm:p-11 rounded-[2.5rem] border-2 border-[#b04a5a]/30 shadow-md max-w-xl mx-auto">
            <div className="text-2xl sm:text-3xl font-black text-[#b04a5a] mb-3 text-center">
              רוצה לשמוע עוד על התוכנית?
            </div>
            
            <p className="text-base sm:text-lg text-gray-700 mb-7 font-medium text-center">
              דלית מזמינה אותך לשיחה אישית ופתוחה לכל שאלה לקראת פתיחת המפגשים.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#b04a5a] hover:bg-[#8f3644] text-white px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-black transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-98"
            >
              <WhatsAppIcon className="w-6 h-6 fill-current text-white" />
              <span>אשמח לשוחח</span>
            </a>
          </div>

          {/* Sub-footer sign-off */}
          <div className="mt-8 text-center text-xs sm:text-sm text-gray-600 font-bold space-y-1">
            <div className="font-black text-[#b04a5a] text-base sm:text-lg">עוֹד לְפָנַיִךְ | תוכנית לנשים 60+</div>
            <div>מבית <span className="font-black text-brand-green">בין לבין | תוכניות וריטריטים לנשים</span></div>
          </div>
        </section>

        {/* Navigation to Other Programs - AT THE VERY END */}
        {!embedded && (
          <div className="pt-8 pb-4">
            <OtherProgramsNav currentProgramId="ahead-of-you" />
          </div>
        )}

      </div>
    </section>
  );
};

export default AheadOfYouMiniPage;
