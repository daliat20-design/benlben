import React, { useEffect } from 'react';
import { MessageCircle, Sparkles, Compass, Users, Lightbulb, Coffee, ArrowLeft, HeartHandshake, MapPin } from 'lucide-react';
import { ButterflyIcon } from '../../components/Hero';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { MiniPageTopNav, OtherProgramsNav } from '../../components/MiniProgramNav';

export const FLOWTRIPS_LOGO_URL = "https://i.postimg.cc/D0CqwDT0/ms'-nsy-bsqy'h-tht-flow-Trip.png";

export const FlowTripsMiniPage: React.FC<{ embedded?: boolean; id?: string }> = ({ embedded = false, id = 'flowtrips' }) => {
  useEffect(() => {
    if (!embedded) {
      document.title = "FlowTrips | חוויות דרך לנשים - מסעות של 3 ימים | בין לבין";
      window.scrollTo(0, 0);
    }
  }, [embedded]);

  const whatsappMessage = encodeURIComponent(
    "היי דלית, קראתי על FlowTrips ואשמח לשמוע עוד על המסעות הראשונים ולהיות בין הראשונות שמקבלות פרטים!"
  );
  const whatsappUrl = `https://wa.me/972508353731?text=${whatsappMessage}`;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "FlowTrips | חוויות דרך לנשים | בין לבין",
          text: "FlowTrips - חוויות דרך לנשים | מסעות של שלושה ימים. לא ריטריט. לא טיול. חוויה שבונה את הדרך שלך. מבית בין לבין | מרחבים לנשים.",
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

  const experiencePillars = [
    {
      title: 'הדרך',
      desc: 'נופים, מקומות חדשים, גילויים קטנים והפתעות שלא תמיד נמצאות במסלול המתוכנן.',
      icon: Compass,
      color: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    {
      title: 'המפגש',
      desc: 'נשים, שיחות, חוויות משותפות והיכרות שנבנית באופן טבעי לאורך הדרך.',
      icon: Users,
      color: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    {
      title: 'התוכן',
      desc: 'פעילויות והתנסויות שמשתלבות במסע, מעוררות מחשבה ומזמינות להתבונן מזוויות חדשות.',
      icon: Lightbulb,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    },
    {
      title: 'הרגעים שבין לבין',
      desc: 'זמן ליהנות, לצחוק, לנשום, לעצור לרגע ולתת מקום גם לדברים שלא תכננו.',
      icon: Coffee,
      color: 'bg-rose-100 text-rose-800 border-rose-200'
    }
  ];

  return (
    <section id={id} className={`text-gray-800 antialiased selection:bg-amber-500/20 selection:text-amber-900 relative overflow-hidden ${embedded ? 'py-12 sm:py-16' : 'min-h-screen bg-gradient-to-b from-[#fffcf7] via-[#fff7ec] to-[#feede0]'}`} dir="rtl">
      {/* Background Ambience Elements */}
      <ButterflyIcon size={260} className="absolute -top-16 -right-20 opacity-[0.04] animate-drift pointer-events-none hidden md:block text-amber-700" />
      <ButterflyIcon size={220} className="absolute top-1/2 -left-20 opacity-[0.035] animate-float pointer-events-none hidden md:block text-orange-700" />
      <ButterflyIcon size={240} className="absolute -bottom-16 right-10 opacity-[0.04] animate-float pointer-events-none hidden md:block text-amber-700" />

      {/* Top Navigation Hub - Standalone */}
      {!embedded && (
        <MiniPageTopNav 
          currentTitle="FlowTrips" 
          themeColor="#d97706" 
          onShare={handleShare} 
        />
      )}

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16 relative z-10">

        {/* Hero Section of FlowTrips */}
        <div className="text-center pt-4 pb-10 sm:pb-12 border-b border-amber-600/20">
          
          {/* Dedicated Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full bg-white p-2.5 sm:p-3 border-4 border-amber-600/30 shadow-[0_12px_35px_rgba(217,119,6,0.18)] flex items-center justify-center transition-transform hover:scale-105 duration-300 shrink-0 overflow-hidden">
              <img 
                src={FLOWTRIPS_LOGO_URL} 
                alt="לוגו FlowTrips" 
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm sm:text-base font-black mb-4 bg-amber-500/15 text-amber-900 border border-amber-600/30 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>חוויות דרך לנשים | מסעות של שלושה ימים</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-amber-900 tracking-tight leading-[1.1] mb-3 text-center">
            FlowTrips
          </h1>

          <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-8 text-center leading-snug">
            לא ריטריט. לא טיול. חוויה שבונה את הדרך שלך.
          </div>

          {/* Opening Narrative */}
          <div className="space-y-5 text-xl sm:text-2xl text-gray-800 leading-[1.8] max-w-2xl mx-auto text-right font-normal">
            <div className="text-center text-gray-900 space-y-1.5 font-bold">
              <p>יש טיולים שאנחנו יוצאות אליהם כדי לראות מקומות חדשים.</p>
              <p className="text-amber-800 font-black">יש חוויות שגורמות לנו לראות גם את עצמנו קצת אחרת.</p>
            </div>

            <div className="bg-amber-500/10 p-5 rounded-2xl border-r-4 border-amber-600 my-4 text-right">
              <p className="font-bold text-gray-900 leading-relaxed">
                <strong className="font-black text-amber-900">FlowTrips</strong> מבית בין לבין היא חוויית דרך נשית, שמשלבת בין טיול, תוכן, מפגשים, התנסויות וזמן לעצמך.
              </p>
            </div>

            <p className="text-gray-700 text-lg sm:text-xl text-center leading-relaxed">
              לא ריטריט שנשארים במקום אחד, ולא טיול שבו רק עוברים ממקום למקום.<br className="hidden sm:inline" />
              אלא דרך אחרת לצאת מהשגרה, לגלות, ליהנות ולתת מקום גם למה שקורה בתוכנו.
            </p>
          </div>
        </div>

        {/* Section: אז מה קורה ב־FlowTrip? */}
        <section className="py-10 sm:py-14 border-b border-amber-600/20">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-900 tracking-tight mb-3 text-center">
              אז מה קורה ב־FlowTrip?
            </h2>
            <p className="text-gray-800 text-lg sm:text-xl font-bold text-center max-w-xl mx-auto">
              המקומות, האנשים, התנועה והעצירות מתחברים לחוויה אחת.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {experiencePillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white/95 rounded-2xl p-6 sm:p-7 border-2 border-amber-600/25 shadow-xs hover:shadow-md hover:border-amber-600 transition-all text-right group"
                >
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${pillar.color} group-hover:scale-105 transition-transform`}>
                      <PillarIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-amber-800 transition-colors">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: שלושה ימים. הרבה יותר מטיול. */}
        <section className="py-10 sm:py-14 border-b border-amber-600/20">
          <div className="bg-white/90 rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-amber-600/30 shadow-md">
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-black bg-amber-100 text-amber-800 mb-2">
                עומק וקלילות יחד
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-900 tracking-tight">
                שלושה ימים. הרבה יותר מטיול.
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-gray-800 leading-relaxed text-right">
              <p>
                לאורך שלושה ימים הדרך עצמה הופכת לחלק מהחוויה. הנופים, המפגשים, הטעמים, התנועה, הזמן יחד והעצירות של בין לבין משתלבים ברצף אחד.
              </p>
              <p>
                בלי לוח זמנים עמוס רק כדי להספיק עוד אטרקציה, ובלי להפוך כל רגע לתהליך עמוק.
              </p>
              <p>
                יש מקום לקלילות ולהנאה, לחברותא נשית, לסקרנות וגם לרגעים שבהם משהו קטן פתאום מתחבר.
              </p>
              
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-r-4 border-amber-600 text-center sm:text-right mt-4 font-bold text-gray-900 space-y-1">
                <p>כי לפעמים לא צריך לנסוע רחוק כדי לגלות משהו חדש.</p>
                <p className="text-amber-800 font-black">צריך רק לצאת לדרך קצת אחרת.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: למי זה מתאים? */}
        <section className="py-10 sm:py-14 border-b border-amber-600/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-amber-900 tracking-tight mb-3">
              למי זה מתאים?
            </h2>
            <p className="text-lg sm:text-xl font-bold text-gray-900 max-w-xl mx-auto">
              לנשים שרוצות לצאת מהשגרה, לטייל, ליהנות ולחוות משהו שיש בו קצת יותר.
            </p>
          </div>

          <div className="bg-amber-100/50 rounded-2xl p-6 sm:p-7 border border-amber-300 text-right text-base sm:text-lg text-gray-800 leading-relaxed">
            <p>
              למי שאוהבת לגלות מקומות חדשים, לפגוש נשים, להתנסות בדברים אחרים ולחזור עם חוויות, זיכרונות ואולי גם תובנה שלא ציפתה לה.
            </p>
          </div>
        </section>

        {/* Section: CTA / הרשמה ראשונית */}
        <section className="py-10 sm:py-14 text-center">
          <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white rounded-3xl p-7 sm:p-10 shadow-xl relative overflow-hidden">
            <ButterflyIcon size={180} className="absolute -bottom-10 -left-10 opacity-15 pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-black bg-white/20 backdrop-blur-xs text-white border border-white/30">
                המסעות הראשונים מתגבשים
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-snug">
                FlowTrips יוצאת לדרך, והמסעות הראשונים מתגבשים.
              </h2>

              <p className="text-base sm:text-lg text-amber-100 font-bold">
                רוצה לשמוע לאן נוסעים ולהיות בין הראשונות שמקבלות פרטים?
              </p>

              <p className="text-sm sm:text-base text-white/90">
                דלית מזמינה אותך לשיחה קצרה ולהיכרות עם החוויה.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full text-base sm:text-lg font-black transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>אשמח לשמוע עוד</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Page Bottom Signature */}
        <div className="text-center pt-8 border-t border-amber-600/20 text-gray-700 text-sm sm:text-base space-y-1">
          <div className="font-black text-amber-900 text-lg sm:text-xl">FlowTrips</div>
          <div className="text-gray-700 font-bold">לא ריטריט. לא טיול. חוויה שבונה את הדרך שלך.</div>
          <div className="text-brand-green font-bold pt-1">
            מבית <span className="font-black">בין לבין | מרחבים לנשים</span>
          </div>
        </div>

        {/* Cross-navigation to Other Programs */}
        {!embedded && (
          <OtherProgramsNav currentProgramId="flowtrips" />
        )}

      </div>
    </section>
  );
};

export default FlowTripsMiniPage;
