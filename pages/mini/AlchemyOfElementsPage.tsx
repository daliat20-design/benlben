import React, { useEffect } from 'react';
import { MessageCircle, Sparkles, Wind, Droplet, Flame, Mountain } from 'lucide-react';
import { ButterflyIcon } from '../../components/Hero';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { MiniPageTopNav, OtherProgramsNav } from '../../components/MiniProgramNav';

const ALCHEMY_LOGO_URL = "/logos/alchemy.webp";
const ALCHEMY_LOGO_FALLBACK = "/logos/alchemy.png";

export const AlchemyOfElementsPage: React.FC<{ embedded?: boolean; id?: string }> = ({ embedded = false, id = 'alchemy' }) => {
  useEffect(() => {
    if (!embedded) {
      document.title = "אלכימיה של יסודות | יום שיא בטבע לנשים | בין לבין";
      window.scrollTo(0, 0);
    }
  }, [embedded]);

  const whatsappMessage = encodeURIComponent(
    "היי דלית, קראתי על 'אלכימיה של יסודות' ואשמח לקבל פרטים נוספים על תיאום יום שיא לקבוצה / ארגון."
  );
  const whatsappUrl = `https://wa.me/972508353731?text=${whatsappMessage}`;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "אלכימיה של יסודות | בין לבין",
          text: "יום אחד. ארבעה יסודות. הרבה מקום לעצמך. חוויה נשית בטבע מבית בין לבין.",
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

  return (
    <section id={id} className={`text-gray-800 antialiased selection:bg-[#48996B]/20 selection:text-[#327a51] relative overflow-hidden ${embedded ? 'py-12 sm:py-16' : 'min-h-screen bg-gradient-to-b from-[#f6fbf8] via-[#edf6f0] to-[#e0efe5]'}`} dir="rtl">
      {/* Background Ambience Elements */}
      <ButterflyIcon size={260} className="absolute -top-16 -right-20 opacity-[0.035] animate-drift pointer-events-none hidden md:block" />
      <ButterflyIcon size={220} className="absolute top-1/2 -left-20 opacity-[0.03] animate-float pointer-events-none hidden md:block" />
      <ButterflyIcon size={240} className="absolute -bottom-16 right-10 opacity-[0.035] animate-float pointer-events-none hidden md:block" />

      {/* Top Navigation Hub - Standalone */}
      {!embedded && (
        <MiniPageTopNav 
          currentTitle="אלכימיה של יסודות" 
          themeColor="#48996B" 
          onShare={handleShare} 
        />
      )}

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16 relative z-10">

        {/* Hero Section of the Product */}
        <div className="text-center pt-4 pb-10 sm:pb-12 border-b border-[#48996B]/20">
          
          {/* Program Dedicated Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-white p-2 sm:p-3 border-4 border-[#48996B]/30 shadow-[0_12px_35px_rgba(72,153,107,0.18)] flex items-center justify-center transition-transform hover:scale-105 duration-300 shrink-0 overflow-hidden">
              <img 
                src={ALCHEMY_LOGO_URL} 
                alt="לוגו אלכימיה של יסודות" 
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== ALCHEMY_LOGO_FALLBACK) {
                    target.src = ALCHEMY_LOGO_FALLBACK;
                  }
                }}
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm sm:text-base font-black mb-4 bg-[#48996B]/15 text-[#327a51] border border-[#48996B]/30 shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>יום שיא וסדנת טבע</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#327a51] tracking-tight leading-[1.1] mb-4 text-center">
            אלכימיה של יסודות
          </h1>

          <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-8 text-center">
            יום אחד. ארבעה יסודות. הרבה מקום לעצמך.
          </div>

          {/* Opening Narrative */}
          <div className="space-y-5 text-xl sm:text-2xl text-gray-800 leading-[1.8] max-w-2xl mx-auto text-right font-normal">
            <p className="font-bold text-center text-gray-900">
              יש ימים שאנחנו יוצאות אליהם כדי להתאוורר.<br />
              יש ימים שאנחנו חוזרות מהם קצת אחרת.
            </p>

            <div className="bg-[#48996B]/10 p-4 rounded-2xl border-r-4 border-[#48996B] my-2">
              <p className="font-bold text-gray-900">
                <strong className="font-black text-[#327a51]">אלכימיה של יסודות</strong> היא חוויה נשית בטבע, שמחברת בין תנועה, מפגש, התבוננות והנאה, דרך ארבעת היסודות: רוח, מים, אש ואדמה.
              </p>
            </div>

            <p className="text-gray-700 text-lg sm:text-xl text-center">
              לא כרעיון מופשט, אלא כדרך לפגוש את עצמנו דרך מה שקורה בתוכנו עכשיו.
            </p>
          </div>
        </div>

        {/* The 4 Elements Section */}
        <section className="py-10 sm:py-14 border-b border-[#48996B]/20">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-5xl font-black text-[#327a51] tracking-tight mb-3 text-center">
              ארבעת היסודות
            </h2>
            <p className="text-gray-700 text-lg sm:text-xl font-bold text-center">
              מרחב של תנועה, שחרור, חיבור והשתרשות
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Air */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border-2 border-[#48996B]/25 shadow-sm hover:shadow-md hover:border-[#48996B] transition-all text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#48996B]/15 text-[#327a51] flex items-center justify-center font-black text-base mb-4 mx-auto">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 tracking-tight text-center">
                הרוח שאיתה הגעתי
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed text-center">
                מצב הרוח, האנרגיה והכוונה שאני מביאה איתי.
              </p>
            </div>

            {/* Water */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border-2 border-[#48996B]/25 shadow-sm hover:shadow-md hover:border-[#48996B] transition-all text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#48996B]/15 text-[#327a51] flex items-center justify-center font-black text-base mb-4 mx-auto">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 tracking-tight text-center">
                המים שבתוכי
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed text-center">
                מה אני מבקשת לרכך, לשחרר או לאפשר לו לזרום.
              </p>
            </div>

            {/* Fire */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border-2 border-[#48996B]/25 shadow-sm hover:shadow-md hover:border-[#48996B] transition-all text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#C56B3E]/15 text-[#C56B3E] flex items-center justify-center font-black text-base mb-4 mx-auto">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 tracking-tight text-center">
                האש שבתוכי
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed text-center">
                מה עובר בי שינוי ומבקש לקבל צורה חדשה.
              </p>
            </div>

            {/* Earth */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border-2 border-[#48996B]/25 shadow-sm hover:shadow-md hover:border-[#48996B] transition-all text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#48996B]/15 text-[#327a51] flex items-center justify-center font-black text-base mb-4 mx-auto">
                <Mountain className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 tracking-tight text-center">
                האדמה שבתוכי
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed text-center">
                מה אני בוחרת לשתול, להשקות ולהצמיח מכאן.
              </p>
            </div>

          </div>
        </section>

        {/* Experience Narrative */}
        <section className="py-10 sm:py-14 border-b border-[#48996B]/20 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-[#327a51] mb-6 tracking-tight text-center">
            יום שהוא גם חוויה וגם מסע
          </h2>

          <div className="space-y-5 text-lg sm:text-xl md:text-2xl text-gray-800 leading-[1.8] font-normal max-w-2xl mx-auto text-right">
            <p className="text-center">
              לאורך היום ארבעת היסודות פוגשים אותנו בדרכים שונות: בטבע, בדרך, בתנועה, בשיחה, בחוויה קבוצתית וברגעים של עצירה והתבוננות.
            </p>

            <p className="text-center">
              כל תחנה מוסיפה עוד שכבה, בלי להפוך את היום לכבד או עמוס.
            </p>

            <p className="text-center">
              יש בו מקום לצחוק וליהנות, להיות ביחד וגם לפגוש את עצמנו.
            </p>

            <div className="p-7 sm:p-8 bg-white rounded-3xl border-2 border-[#48996B]/30 shadow-sm text-center mt-6">
              <p className="text-[#327a51] font-black text-xl sm:text-2xl leading-relaxed">
                כי לפעמים שינוי לא מתחיל בהחלטה גדולה.<br />
                הוא מתחיל ביום אחד שמאפשר לנו לצאת לרגע מהשגרה, להסתכל קצת אחרת ולחזור עם משהו חדש.
              </p>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="py-10 sm:py-14 border-b border-[#48996B]/20">
          <div className="bg-white p-7 sm:p-9 rounded-3xl border-2 border-[#48996B]/30 shadow-sm text-center">
            <h3 className="text-3xl sm:text-4xl font-black text-[#327a51] mb-4 tracking-tight text-center">
              למי זה מתאים?
            </h3>
            
            <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-bold mb-3">
              לקבוצות נשים, קהילות וארגונים שמחפשים יום שיא שיש בו יותר מבילוי משותף.
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              חוויה שמחברת בין טבע, תוכן וקבוצה, ויכולה להיבנות ולהתאים את עצמה למקום, לקבוצה ולמטרת היום.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 sm:py-14 border-b border-[#48996B]/20 text-center">
          <div className="bg-white p-8 sm:p-11 rounded-[2.5rem] border-2 border-[#48996B]/30 shadow-md max-w-xl mx-auto">
            <div className="text-2xl sm:text-3xl font-black text-[#327a51] mb-3 text-center">
              מעוניינת בפרטים נוספים או בתיאום יום שיא?
            </div>
            
            <p className="text-base sm:text-lg text-gray-700 mb-7 font-medium text-center">
              דלית מזמינה אותך לשיחה קצרה לבירור והתאמת החוויה לקבוצה שלך.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#48996B] hover:bg-[#388258] text-white px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-black transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-98"
            >
              <WhatsAppIcon className="w-6 h-6 fill-current text-white" />
              <span>אשמח לשוחח</span>
            </a>
          </div>

          {/* Sub-footer sign-off */}
          <div className="mt-8 text-center text-xs sm:text-sm text-gray-600 font-bold space-y-1">
            <div className="font-black text-[#327a51] text-base sm:text-lg">אלכימיה של יסודות</div>
            <div className="text-gray-700">יום שיא בטבע לנשים</div>
            <div>מבית <span className="font-black text-brand-green">בין לבין | תוכניות וריטריטים לנשים</span></div>
          </div>
        </section>

        {/* Navigation to Other Programs - AT THE VERY END */}
        {!embedded && (
          <div className="pt-8 pb-4">
            <OtherProgramsNav currentProgramId="alchemy" />
          </div>
        )}

      </div>
    </section>
  );
};

export default AlchemyOfElementsPage;
