import React, { useEffect } from 'react';
import { Sparkles, Compass, Users, Lightbulb, Coffee } from 'lucide-react';
import { ButterflyIcon } from '../../components/Hero';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { MiniPageTopNav, OtherProgramsNav } from '../../components/MiniProgramNav';
import { FLOWTRIPS_LOGO_URL, FlowTripsTitle } from '../../utils/brandPrograms';

export { FLOWTRIPS_LOGO_URL };

export const FlowTripsMiniPage: React.FC<{ embedded?: boolean; id?: string }> = ({
  embedded = false,
  id = 'flowtrips',
}) => {
  useEffect(() => {
    if (!embedded) {
      document.title = "חוויות דרך וריטריטים לנשים | FlowTrips וריטריטים | בין לבין";
      window.scrollTo(0, 0);
    }
  }, [embedded]);

  const whatsappMessage = encodeURIComponent(
    "שלום, קראתי על FlowTrips וריטריטים לנשים מבית בין לבין ואשמח לשמוע פרטים ולהכיר את החוויות הקרובות!"
  );
  const whatsappUrl = `https://wa.me/972508353731?text=${whatsappMessage}`;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "חוויות דרך וריטריטים לנשים | FlowTrips וריטריטים | בין לבין",
          text: "FlowTrips וריטריטים לנשים - חוויה שבונה את הדרך שלך. מבית בין לבין | מרחבים לנשים.",
          url,
        });
      } catch {
        // user cancelled share
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('הקישור הועתק ללוח!');
    }
  };

  return (
    <section
      id={id}
      className={`text-gray-800 antialiased selection:bg-amber-500/20 selection:text-amber-900 relative overflow-hidden ${
        embedded ? 'py-12 sm:py-16' : 'min-h-screen bg-gradient-to-b from-[#fffcf7] via-[#fff7ec] to-[#feede0]'
      }`}
      dir="rtl"
    >
      {/* Background Ambience Elements */}
      <ButterflyIcon size={260} className="absolute -top-16 -right-20 opacity-[0.04] animate-drift pointer-events-none hidden md:block text-amber-700" />
      <ButterflyIcon size={220} className="absolute top-1/2 -left-20 opacity-[0.035] animate-float pointer-events-none hidden md:block text-orange-700" />
      <ButterflyIcon size={240} className="absolute -bottom-16 right-10 opacity-[0.04] animate-float pointer-events-none hidden md:block text-amber-700" />

      {/* Top Navigation Hub - Standalone */}
      {!embedded && (
        <MiniPageTopNav
          currentTitle="FlowTrips וריטריטים"
          themeColor="#d97706"
          onShare={handleShare}
        />
      )}

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-16 relative z-10">

        {/* 1. Hero & Opening Header */}
        <div className="max-w-3xl mx-auto text-center pt-4 pb-10 sm:pb-12 border-b border-amber-600/20">
          
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full bg-white p-2.5 sm:p-3 border-4 border-amber-600/30 shadow-[0_12px_35px_rgba(217,119,6,0.18)] flex items-center justify-center transition-transform hover:scale-105 duration-300 shrink-0 overflow-hidden">
              <img
                src={FLOWTRIPS_LOGO_URL}
                alt="לוגו FlowTrips וריטריטים"
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Badge: חוויות דרך וריטריטים לנשים */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm sm:text-base font-black mb-4 bg-amber-500/15 text-amber-900 border border-amber-600/30 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>חוויות דרך וריטריטים לנשים</span>
          </div>

          {/* H1: חוויות דרך וריטריטים לנשים */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-amber-900 tracking-tight leading-[1.15] mb-2 text-center">
            חוויות דרך וריטריטים לנשים
          </h1>

          {/* H2: FlowTrips וריטריטים */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-800 tracking-tight mb-4 text-center">
            FlowTrips וריטריטים
          </h2>

          {/* חוויה שבונה את הדרך שלך */}
          <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-8 text-center leading-snug">
            חוויה שבונה את הדרך שלך.
          </div>

          {/* Opening Narrative */}
          <div className="space-y-4 text-lg sm:text-xl md:text-2xl text-gray-800 leading-[1.8] max-w-2xl mx-auto text-right font-normal">
            <div className="text-center text-gray-900 space-y-1.5 font-bold">
              <p>יש יציאות מהשגרה שנועדו בעיקר לשינוי אווירה.</p>
              <p className="text-amber-800 font-black">יש חוויות שנותנות לנו הרבה יותר מזה.</p>
            </div>

            <div className="bg-amber-500/10 p-5 sm:p-6 rounded-2xl border-r-4 border-amber-600 my-4 text-right">
              <p className="font-medium text-gray-900 leading-relaxed text-base sm:text-lg md:text-xl">
                ב"בין לבין" אנחנו יוצרות <strong className="font-black text-amber-900">FlowTrips וריטריטים לנשים</strong>, שנבנים מתוך חיבור בין תוכן, תנועה, מפגשים, טבע, התנסויות, זמן לעצמך והרבה מקום גם להנאה.
              </p>
            </div>

            <div className="space-y-3 text-base sm:text-lg md:text-xl text-gray-800 text-right leading-relaxed pt-2">
              <p>
                לפעמים זה <strong className="font-bold text-amber-900">FlowTrip – חוויית דרך בתנועה</strong>, שעוברת בין מקומות, אנשים וטעמים.
                <br />
                לפעמים זה ריטריט שמאפשר לעצור, לשהות ולהעמיק במקום אחד.
              </p>
              <p className="text-gray-700 pt-2">
                הפורמט משתנה. הכוונה נשארת אותה כוונה: ליצור מרחב מדויק שמוציא אותך מהשגרה ומאפשר לך לחוות, לגלות, ליהנות וגם לשים לב לדברים שלא תמיד מקבלים מקום בתוך הקצב היומיומי.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Section: אז מה מחכה לך? */}
        <section className="max-w-3xl mx-auto py-10 sm:py-14 border-b border-amber-600/20">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-amber-900 tracking-tight mb-3 text-center">
              אז מה מחכה לך?
            </h2>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* הדרך */}
            <div className="bg-white/95 rounded-2xl p-5 sm:p-7 border-2 border-amber-600/25 shadow-xs hover:shadow-md hover:border-amber-600 transition-all text-right group">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border bg-amber-100 text-amber-800 border-amber-200 group-hover:scale-105 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-amber-800 transition-colors">
                  הדרך
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
                לפעמים היא ממש בתנועה, לפעמים היא מתרחשת במקום אחד. תמיד יש בה גילוי, סקרנות ויציאה מהמסלול הרגיל.
              </p>
            </div>

            {/* המפגש */}
            <div className="bg-white/95 rounded-2xl p-5 sm:p-7 border-2 border-amber-600/25 shadow-xs hover:shadow-md hover:border-amber-600 transition-all text-right group">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border bg-orange-100 text-orange-800 border-orange-200 group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-amber-800 transition-colors">
                  המפגש
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
                נשים, שיחות, חוויות משותפות והיכרות שנבנית באופן טבעי, בלי מאמץ ובלי צורך "להיות משהו".
              </p>
            </div>

            {/* התוכן */}
            <div className="bg-white/95 rounded-2xl p-5 sm:p-7 border-2 border-amber-600/25 shadow-xs hover:shadow-md hover:border-amber-600 transition-all text-right group">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border bg-emerald-100 text-emerald-800 border-emerald-200 group-hover:scale-105 transition-transform">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-amber-800 transition-colors">
                  התוכן
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
                פעילויות והתנסויות שנבחרות בקפידה ומשתלבות בתוך החוויה, בלי להשתלט עליה.
              </p>
            </div>

            {/* הרגעים שבין לבין */}
            <div className="bg-white/95 rounded-2xl p-5 sm:p-7 border-2 border-amber-600/25 shadow-xs hover:shadow-md hover:border-amber-600 transition-all text-right group">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border bg-rose-100 text-rose-800 border-rose-200 group-hover:scale-105 transition-transform">
                  <Coffee className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-amber-800 transition-colors">
                  הרגעים שבין לבין
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
                זמן ליהנות, לצחוק, לנשום, לנוח, לדבר, לשתוק ולתת מקום גם למה שלא תוכנן.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Section: מה שמחבר בין כל החוויות */}
        <section className="max-w-3xl mx-auto py-10 sm:py-14 border-b border-amber-600/20">
          <div className="bg-white/90 rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-amber-600/30 shadow-md">
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-black bg-amber-100 text-amber-800 mb-2">
                החיבור והתפיסה
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-900 tracking-tight">
                מה שמחבר בין כל החוויות
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-gray-800 leading-relaxed text-right">
              <p className="font-medium">
                בין אם זו חוויית דרך בתנועה ובין אם זה ריטריט במקום אחד, אנחנו בונות את הקצב, התוכן, המפגשים והמרחב כמכלול אחד.
              </p>

              <div className="p-5 sm:p-6 rounded-2xl bg-amber-50 border-r-4 border-amber-600 my-4 space-y-2 text-right">
                <p className="text-gray-900 font-bold">לא רשימת פעילויות.</p>
                <p className="text-gray-900 font-bold">לא לו"ז שממלאים רק כדי להספיק.</p>
                <p className="text-amber-900 font-black text-lg pt-1">
                  חוויה שנבנתה עם מחשבה על מה קורה בתוכה.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Section: למי זה מתאים? */}
        <section className="max-w-3xl mx-auto py-10 sm:py-14 border-b border-amber-600/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-amber-900 tracking-tight mb-3">
              למי זה מתאים?
            </h2>
          </div>

          <div className="bg-amber-100/50 rounded-3xl p-6 sm:p-8 border border-amber-300 text-right text-base sm:text-lg text-gray-800 leading-relaxed space-y-4">
            <p className="font-bold text-gray-900 text-lg sm:text-xl">
              לנשים שרוצות לצאת מהשגרה, להתאוורר, ליהנות ולחוות משהו שיש בו קצת יותר.
            </p>
            <p>
              למי שאוהבת לגלות מקומות ועולמות חדשים, לפגוש נשים, להתנסות, לנוח, לצחוק, להתרגש ולחזור עם חוויות, זיכרונות ואולי גם משהו חדש לחשוב עליו.
            </p>
          </div>
        </section>

        {/* 5. Section: החוויות הבאות כבר מתגבשות + CTA */}
        <section className="max-w-3xl mx-auto py-10 sm:py-14 text-center">
          <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <ButterflyIcon size={180} className="absolute -bottom-10 -left-10 opacity-15 pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-black bg-white/20 backdrop-blur-xs text-white border border-white/30">
                בקרוב
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-snug">
                החוויות הבאות כבר מתגבשות
              </h2>

              <p className="text-base sm:text-lg text-amber-100 font-medium">
                FlowTrips וריטריטים חדשים מבית "בין לבין" כבר בדרך.
              </p>

              <p className="text-sm sm:text-base text-white/90">
                רוצה לשמוע לפני כולן מה אנחנו מתכננות ולהיות בין הראשונות שמצטרפות?
              </p>

              <div className="p-3.5 bg-white/10 rounded-2xl border border-white/20 my-2">
                <p className="text-base sm:text-lg font-bold text-white">
                  מזמינות אותך לשיחה קצרה ולהיכרות עם החוויות הקרובות.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full text-base sm:text-lg font-black transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                  <span>אשמח לשמוע עוד</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Bottom Signature */}
        <div className="max-w-3xl mx-auto text-center pt-8 border-t border-amber-600/20 text-gray-700 text-sm sm:text-base space-y-1.5">
          <div className="font-black text-amber-900 text-lg sm:text-xl">
            FlowTrips וריטריטים לנשים
          </div>
          <div className="text-gray-800 font-bold">
            חוויה שבונה את הדרך שלך.
          </div>
          <div className="text-brand-green font-bold pt-1">
            מבית <span className="font-black">בין לבין | מרחבים לנשים</span>
          </div>
        </div>

        {/* Cross-navigation to Other Programs */}
        {!embedded && (
          <div className="mt-8">
            <OtherProgramsNav currentProgramId="flowtrips" />
          </div>
        )}
      </div>
    </section>
  );
};

export default FlowTripsMiniPage;
