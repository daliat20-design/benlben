import React, { useEffect } from 'react';
import { MessageCircle, Share2, ArrowRight } from 'lucide-react';
import { ButterflyIcon } from '../../components/Hero';

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

      {/* Main Content Area - Up to ~2 scroll screens */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16 relative z-10">

        {/* Hero Section of the Product */}
        <div className="text-center md:text-right pt-4 pb-10 sm:pb-12 border-b border-brand-beige/80">
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-brand-green tracking-tight leading-[1.1] mb-4">
            אלכימיה של יסודות
          </h1>

          <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-orange tracking-tight mb-8">
            יום אחד. ארבעה יסודות. הרבה מקום לעצמך.
          </div>

          {/* Opening Narrative */}
          <div className="space-y-4 text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl">
            <p className="font-medium">
              יש ימים שאנחנו יוצאות אליהם כדי להתאוורר.<br />
              יש ימים שאנחנו חוזרות מהם קצת אחרת.
            </p>

            <p className="font-medium text-gray-800">
              <strong className="font-black text-brand-green">אלכימיה של יסודות</strong> היא חוויה נשית בטבע, שמחברת בין תנועה, מפגש, התבוננות והנאה, דרך ארבעת היסודות: רוח, מים, אש ואדמה.
            </p>

            <p className="text-gray-600 text-base sm:text-lg">
              לא כרעיון מופשט, אלא כדרך לפגוש את עצמנו דרך מה שקורה בתוכנו עכשיו.
            </p>
          </div>
        </div>

        {/* The 4 Elements Section - Clean, airy, not cluttered */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Air */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-7 rounded-3xl border border-brand-beige shadow-xs hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center font-black text-sm mb-3">
                רוח
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-brand-green mb-2 tracking-tight">
                הרוח שאיתה הגעתי
              </h3>
              <p className="text-base text-gray-600 font-medium leading-relaxed">
                מצב הרוח, האנרגיה והכוונה שאני מביאה איתי.
              </p>
            </div>

            {/* Water */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-7 rounded-3xl border border-brand-beige shadow-xs hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center font-black text-sm mb-3">
                מים
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-brand-green mb-2 tracking-tight">
                המים שבתוכי
              </h3>
              <p className="text-base text-gray-600 font-medium leading-relaxed">
                מה אני מבקשת לרכך, לשחרר או לאפשר לו לזרום.
              </p>
            </div>

            {/* Fire */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-7 rounded-3xl border border-brand-beige shadow-xs hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-brand-orange/15 text-brand-orange flex items-center justify-center font-black text-sm mb-3">
                אש
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-brand-green mb-2 tracking-tight">
                האש שבתוכי
              </h3>
              <p className="text-base text-gray-600 font-medium leading-relaxed">
                מה עובר בי שינוי ומבקש לקבל צורה חדשה.
              </p>
            </div>

            {/* Earth */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-7 rounded-3xl border border-brand-beige shadow-xs hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center font-black text-sm mb-3">
                אדמה
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-brand-green mb-2 tracking-tight">
                האדמה שבתוכי
              </h3>
              <p className="text-base text-gray-600 font-medium leading-relaxed">
                מה אני בוחרת לשתול, להשקות ולהצמיח מכאן.
              </p>
            </div>

          </div>
        </section>

        {/* Experience Narrative */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <h2 className="text-2xl sm:text-3xl font-black text-brand-green mb-6 tracking-tight">
            יום שהוא גם חוויה וגם מסע
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
            <p>
              לאורך היום ארבעת היסודות פוגשים אותנו בדרכים שונות: בטבע, בדרך, בתנועה, בשיחה, בחוויה קבוצתית וברגעים של עצירה והתבוננות.
            </p>

            <p>
              כל תחנה מוסיפה עוד שכבה, בלי להפוך את היום לכבד או עמוס.
            </p>

            <p>
              יש בו מקום לצחוק וליהנות, להיות ביחד וגם לפגוש את עצמנו.
            </p>

            <p className="text-brand-green font-bold pt-2">
              כי לפעמים שינוי לא מתחיל בהחלטה גדולה.<br />
              הוא מתחיל ביום אחד שמאפשר לנו לצאת לרגע מהשגרה, להסתכל קצת אחרת ולחזור עם משהו חדש.
            </p>
          </div>
        </section>

        {/* Target Audience */}
        <section className="py-10 sm:py-12">
          <div className="bg-brand-beige/40 p-6 sm:p-8 rounded-3xl border border-brand-beige">
            <h3 className="text-xl sm:text-2xl font-black text-brand-green mb-3 tracking-tight">
              למי זה מתאים?
            </h3>
            
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium mb-3">
              לקבוצות נשים, קהילות וארגונים שמחפשים יום שיא שיש בו יותר מבילוי משותף.
            </p>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              חוויה שמחברת בין טבע, תוכן וקבוצה, ויכולה להיבנות ולהתאים את עצמה למקום, לקבוצה ולמטרת היום.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pt-4 pb-8 text-center">
          <div className="bg-white p-7 sm:p-9 rounded-[2.5rem] border-2 border-brand-beige shadow-lg max-w-xl mx-auto">
            <div className="text-xl sm:text-2xl font-black text-brand-green mb-2">
              מעוניינת בפרטים נוספים או בתיאום יום שיא?
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
              דלית מזמינה אותך לשיחה קצרה לבירור והתאמת החוויה לקבוצה שלך.
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
          <div className="mt-12 text-center text-xs sm:text-sm text-gray-500 font-bold space-y-1">
            <div className="font-black text-brand-green text-sm sm:text-base">אלכימיה של יסודות</div>
            <div>יום שיא מבית <span className="font-black text-brand-green">בין לבין | תוכניות לנשים</span></div>
          </div>
        </section>

      </div>
    </section>
  );
};

export default AlchemyOfElementsPage;
