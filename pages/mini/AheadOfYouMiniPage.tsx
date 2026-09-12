import React, { useEffect } from 'react';
import { MessageCircle, Share2, Users, CheckCircle2, HeartHandshake } from 'lucide-react';
import { ButterflyIcon } from '../../components/Hero';

export const AheadOfYouMiniPage: React.FC<{ embedded?: boolean; id?: string }> = ({ embedded = false, id = 'ahead-of-you' }) => {
  useEffect(() => {
    if (!embedded) {
      document.title = "עוד לפנייך | תוכנית לנשים 60+ | בין לבין";
      window.scrollTo(0, 0);
    }
  }, [embedded]);

  const whatsappMessage = encodeURIComponent(
    "היי דלית, קראתי על התוכנית 'עוד לפנייך' לנשים 60+ ואשמח לקבל פרטים נוספים."
  );
  const whatsappUrl = `https://wa.me/972508353731?text=${whatsappMessage}`;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "עוד לפנייך | תוכנית לנשים 60+ | בין לבין",
          text: "עוד לפנייך - תוכנית לנשים 60+ מבית בין לבין | תוכניות לנשים.",
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
      id: 1,
      title: 'הגוף שלי עכשיו',
      desc: 'בריאות, תנועה, שינויים פיזיים והדרך לשמור על חיוניות ואיכות חיים.'
    },
    {
      id: 2,
      title: 'הזמן שלי',
      desc: 'איך אני רוצה שהיום שלי ייראה ומה אני בוחרת לעשות עם הזמן שעומד לרשותי.'
    },
    {
      id: 3,
      title: 'אני בתוך השינוי',
      desc: 'זהות, תפקידים שמשתנים והדרך למצוא את המקום שנכון לי עכשיו.'
    },
    {
      id: 4,
      title: 'משפחה בין הדורות',
      desc: 'ילדים בוגרים, נכדים, זוגיות, גבולות והמקום שלי בתוך המשפחה המשתנה.'
    },
    {
      id: 5,
      title: 'חברות, קשרים ושייכות',
      desc: 'על חברות בשלב הזה בחיים, קשרים שמשתנים, קשרים חדשים, בדידות, שייכות והכוח שיש בחברותא נשית.'
    },
    {
      id: 6,
      title: 'עצמאות בעולם משתנה',
      desc: 'להמשיך לבחור, להחליט, להתנהל ולהרגיש בטוחה גם כשהעולם סביבנו משתנה במהירות.'
    },
    {
      id: 7,
      title: 'סקרנות, למידה והתחדשות',
      desc: 'דברים חדשים שעוד אפשר ללמוד, לנסות, לחוות ולגלות.'
    },
    {
      id: 8,
      title: 'משמעות והפרק הבא',
      desc: 'מה עוד הייתי רוצה לעשות, לתת, ליצור ולהכניס לחיים שלי.'
    }
  ];

  return (
    <section id={id} className={`text-gray-800 antialiased selection:bg-brand-orange/20 selection:text-brand-green relative overflow-hidden ${embedded ? 'py-12 sm:py-16' : 'min-h-screen bg-brand-cream'}`} dir="rtl">
      {/* Background Ambience Elements */}
      <ButterflyIcon size={260} className="absolute -top-16 -right-20 opacity-[0.035] animate-drift pointer-events-none hidden md:block" />
      <ButterflyIcon size={220} className="absolute top-1/2 -left-20 opacity-[0.03] animate-float pointer-events-none hidden md:block" />
      <ButterflyIcon size={240} className="absolute -bottom-16 right-10 opacity-[0.035] animate-float pointer-events-none hidden md:block" />

      {/* Header / Brand Tag - standalone only */}
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

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16 relative z-10">

        {/* Hero & Intro Section */}
        <div className="text-center md:text-right pt-4 pb-10 sm:pb-12 border-b border-brand-beige/80">
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-brand-green tracking-tight leading-[1.1] mb-4">
            עוד לפנייך
          </h1>

          <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-orange tracking-tight mb-8">
            תוכנית לנשים <span dir="ltr">60+</span>
          </div>

          {/* Narrative Opening */}
          <div className="space-y-4 text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl font-medium">
            <p>
              יש שלב בחיים שבו משהו בקצב משתנה.
            </p>

            <p className="text-gray-800">
              הילדים כבר חיים את החיים שלהם. לפעמים כבר יש נכדים. הגוף מבקש התייחסות אחרת, מערכות היחסים משתנות, סדרי העדיפויות מתחדדים ויש יותר מקום לחשוב גם על עצמי.
            </p>

            <p className="text-gray-600 text-base sm:text-lg pt-1">
              אבל השאלה המעניינת היא לא רק מה השתנה.
            </p>

            <p className="text-2xl sm:text-3xl font-black text-brand-green tracking-tight py-2">
              אלא מה אני רוצה לעשות עם כל מה שעוד לפניי.
            </p>

            <p className="text-gray-700 text-base sm:text-lg">
              <strong className="text-brand-green font-bold">&quot;עוד לפנייך&quot;</strong> נולדה מתוך הסתכלות אחרת על השנים האלה. לא כסיכום של מה שהיה, אלא כתקופה שיש בה עוד מקום לבחירה, לסקרנות, לקשרים, לעשייה, להתחדשות ולמשמעות.
            </p>

            <p className="text-brand-orange font-bold text-lg pt-1">
              ובעיקר, לא לעבור אותה לבד.
            </p>

            <p className="text-gray-600 text-base sm:text-lg">
              לפגוש נשים שנמצאות בשלב דומה, לדבר על הדברים שמעסיקים אותנו באמת, לשמוע נקודות מבט אחרות, לשתף מניסיון החיים שכבר צברנו וליצור חיבורים חדשים.
            </p>
          </div>
        </div>

        {/* Section: Not just staying active. Staying in motion. */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="inline-block px-4 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs sm:text-sm font-black mb-3 border border-brand-green/15">
            הסתכלות אחרת על השנים האלה
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-brand-green mb-6 tracking-tight">
            לא רק להישאר פעילה. להמשיך להיות בתנועה.
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
            <p>
              יש הרבה שיח על איך לשמור על הבריאות, הזיכרון והגוף בשנים האלה. כל אלה חשובים.
            </p>

            <p className="text-xl sm:text-2xl font-black text-brand-orange">
              אבל החיים בשלב הזה הם הרבה יותר מזה.
            </p>

            <p>
              <strong className="font-black text-brand-green">עוד לפנייך</strong> מחברת בין ידע מקצועי, שיח נשי, חברותא, התבוננות אישית וכלים מעשיים.
            </p>

            <div className="bg-white/80 p-5 sm:p-6 rounded-2xl border border-brand-beige/80 shadow-2xs mt-2">
              <p className="text-brand-green font-bold text-base sm:text-lg">
                מרחב שבו אפשר גם ללמוד וגם לדבר, גם להקשיב וגם להביא את עצמנו.
              </p>
            </div>
          </div>
        </section>

        {/* Section: What we will talk about */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="text-center md:text-right mb-8">
            <h2 className="text-2xl sm:text-4xl font-black text-brand-green tracking-tight mb-2">
              על מה נדבר?
            </h2>
            <p className="text-gray-600 text-base sm:text-lg font-medium">
              נושאי הליבה שמעסיקים נשים בשלב הזה, במפגשים עמוקים ומעשיים
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {topics.map((t) => (
              <div
                key={t.id}
                className="bg-white/85 backdrop-blur-sm p-5 sm:p-6 rounded-3xl border border-brand-beige shadow-2xs hover:shadow-md hover:border-brand-orange/40 transition-all text-right flex flex-col"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-orange/10 text-brand-orange font-black text-sm flex items-center justify-center mb-3">
                  {t.id}
                </div>

                <h3 className="text-lg sm:text-xl font-black text-brand-green tracking-tight mb-2">
                  {t.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed mt-auto">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: The Togetherness */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="bg-white/90 p-7 sm:p-9 rounded-3xl border border-brand-beige shadow-sm space-y-4 text-right">
            <div className="flex items-center gap-2.5 text-brand-orange font-black text-sm mb-1">
              <HeartHandshake className="w-5 h-5" />
              <span>הכוח שבקבוצה</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-brand-green tracking-tight">
              ויש גם את הביחד
            </h2>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              חלק משמעותי מ&quot;עוד לפנייך&quot; הוא הקבוצה עצמה.
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              נשים שמגיעות עם ניסיון חיים, סיפורים, שאלות ותובנות. מפגש קבוע שמאפשר להכיר באמת, לשתף, לצחוק, להתייעץ, ללמוד זו מזו וליצור קשרים שיכולים להמשיך גם מעבר לתוכנית.
            </p>

            <div className="p-5 bg-brand-cream/80 rounded-2xl border border-brand-beige/80 space-y-2">
              <p className="text-base sm:text-lg text-gray-600 font-medium">
                כי לפעמים הדבר שאנחנו צריכות בשלב הזה הוא לא עוד הרצאה.
              </p>
              <p className="text-lg sm:text-xl font-black text-brand-green">
                אלא מקום שיש בו גם תוכן טוב וגם נשים לחלוק איתן את הדרך.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Who is the program for? */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="bg-brand-beige/40 p-6 sm:p-8 rounded-3xl border border-brand-beige space-y-4">
            <div className="flex items-center gap-2 text-brand-green font-bold text-xs sm:text-sm">
              <Users className="w-4 h-4" />
              <span>הקהילה שלנו</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-brand-green tracking-tight mb-4">
              למי התוכנית מתאימה?
            </h3>

            <div className="flex items-start gap-3 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
              <p>
                לנשים <span dir="ltr">60+</span> שרוצות לפגוש את השנים האלה לא רק דרך השינויים והאתגרים שהן מביאות איתן, אלא גם דרך האפשרויות שנפתחות בהן.
              </p>
            </div>

            <div className="flex items-start gap-3 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
              <p>
                לנשים שרוצות להמשיך ללמוד, לפגוש, לשתף, להתפתח ולגלות מה עוד מחכה להן בהמשך הדרך.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pt-8 pb-8 text-center">
          <div className="bg-white p-7 sm:p-10 rounded-[2.5rem] border-2 border-brand-beige shadow-lg max-w-xl mx-auto">
            <div className="text-xl sm:text-2xl font-black text-brand-green mb-2">
              רוצה לשמוע עוד על התוכנית?
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
              דלית מזמינה אותך לשיחה אישית ופתוחה לכל שאלה לקראת פתיחת המפגשים.
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
            <div className="font-black text-brand-green text-base sm:text-lg">עוד לפנייך</div>
            <div className="text-gray-700">תוכנית לנשים <span dir="ltr">60+</span></div>
            <div>מבית <span className="font-black text-brand-green">בין לבין | תוכניות לנשים</span></div>
          </div>
        </section>

      </div>
    </section>
  );
};

export default AheadOfYouMiniPage;
