import React, { useEffect } from 'react';
import { MessageCircle, Share2, Building2, TrendingUp, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import { ButterflyIcon } from '../../components/Hero';

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

        {/* Hero & Opening Section */}
        <div className="text-center md:text-right pt-4 pb-10 sm:pb-12 border-b border-brand-beige/80">
          
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-1 rounded-full text-xs sm:text-sm font-black mb-3">
            <Building2 className="w-4 h-4" />
            <span>תוכנית לארגונים וחברות</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-brand-green tracking-tight leading-[1.1] mb-4">
            היילייטס
          </h1>

          <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-orange tracking-tight mb-4">
            מניסיון ונוכחות להובלה והשפעה
          </div>

          <p className="text-lg sm:text-xl font-bold text-brand-green mb-8">
            תוכנית פיתוח אישית ומקצועית לנשים באמצע החיים בארגונים.
          </p>

          {/* Narrative Opening */}
          <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl font-medium">
            <p>
              נשים באמצע החיים מחזיקות בניסיון עשיר, במומחיות ובהיכרות עמוקה עם הארגון. במקביל, זהו שלב שמפגיש שינויים אישיים, משפחתיים, פיזיולוגיים ומקצועיים ולעיתים גם שאלות חדשות על המשך הדרך.
            </p>

            <p className="text-xl sm:text-2xl font-black text-brand-green pt-2">
              <strong>היילייטס</strong> נולדה מתוך ההבנה שדווקא בצומת הזה יש הזדמנות.
            </p>

            {/* Two opportunities cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="bg-white/85 p-5 rounded-2xl border border-brand-beige shadow-2xs text-right">
                <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">
                  הזדמנות עבור האישה
                </div>
                <p className="text-sm sm:text-base text-gray-800 font-bold leading-snug">
                  לעצור, לזהות מחדש את הכוחות, הניסיון והאפשרויות שלה ולהרחיב את הנוכחות וההשפעה שלה.
                </p>
              </div>

              <div className="bg-white/85 p-5 rounded-2xl border border-brand-beige shadow-2xs text-right">
                <div className="text-xs font-bold text-brand-green uppercase tracking-wider mb-1">
                  הזדמנות עבור הארגון
                </div>
                <p className="text-sm sm:text-base text-gray-800 font-bold leading-snug">
                  לטפח הון אנושי מנוסה, לחזק מחוברות ולתרגם ניסיון מצטבר להמשך צמיחה, יוזמה והשפעה.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Personal Growth. Organizational Value. */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="inline-block px-4 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs sm:text-sm font-black mb-3 border border-brand-green/15">
            החיבור המנצח
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-brand-green mb-6 tracking-tight">
            התפתחות אישית. ערך ארגוני.
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
            <p>
              היילייטס מחברת בין עולמה של האישה, הניסיון המקצועי שלה והמציאות הארגונית שבה היא פועלת.
            </p>

            <p>
              באמצעות ידע מקצועי, תהליכי התפתחות אישית, שיח קבוצתי וכלים מעשיים נוצר מרחב שמאפשר למשתתפות להתבונן מחדש על המקום שלהן בארגון ועל השלב הבא שלהן בתוכו.
            </p>

            <div className="p-5 sm:p-6 bg-white/90 rounded-2xl border border-brand-beige shadow-2xs text-center md:text-right mt-3">
              <p className="text-lg sm:text-xl font-black text-brand-green leading-relaxed">
                ידע הופך להבנה. הבנה הופכת לבחירה. בחירה הופכת לתנועה אישית וארגונית.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Focus Areas */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="text-center md:text-right mb-8">
            <h2 className="text-2xl sm:text-4xl font-black text-brand-green tracking-tight mb-2">
              במה אפשר להתמקד?
            </h2>
            <p className="text-gray-600 text-base sm:text-lg font-medium">
              התוכנית נבנית בהתאם לצרכים ולמטרות של כל ארגון ויכולה לשלב בין עולמות תוכן שונים:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {focusAreas.map((area) => (
              <div
                key={area.id}
                className="bg-white/85 backdrop-blur-sm p-5 sm:p-6 rounded-3xl border border-brand-beige shadow-2xs hover:shadow-md hover:border-brand-orange/40 transition-all text-right flex flex-col"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="w-8 h-8 rounded-xl bg-brand-green/10 text-brand-green font-black text-sm flex items-center justify-center">
                    0{area.id}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-brand-green tracking-tight mb-2">
                  {area.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed mt-auto">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Not an Off-the-Shelf Product */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="bg-white/90 p-7 sm:p-9 rounded-3xl border border-brand-beige shadow-sm space-y-4 text-right">
            <div className="inline-flex items-center gap-2 text-brand-orange font-black text-xs sm:text-sm">
              <Sparkles className="w-4 h-4" />
              <span>התאמה אישית מלאה</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-brand-green tracking-tight">
              לא מוצר מדף
            </h2>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              כל ארגון מתחיל מנקודה אחרת.
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              לכן היילייטס אינה מגיעה כתוכנית סגורה מראש. התהליך מתחיל בהיכרות ובבירור הצרכים, ומתוכם נבחרים נקודות הפוקוס, התכנים והמבנה המתאימים לארגון ולנשים המשתתפות.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 sm:p-5 bg-brand-cream/80 rounded-2xl border border-brand-beige/80">
                <div className="font-black text-brand-green text-base mb-1">
                  תהליך עומק קבוצתי
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  סדרה של 4–8 מפגשים תהליכיים המעמיקים בנושאים הנבחרים ומלווים הטמעה.
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-brand-cream/80 rounded-2xl border border-brand-beige/80">
                <div className="font-black text-brand-orange text-base mb-1">
                  Spotlight – מפגש ממוקד או יום שיא
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  סדנה מרוכזת או יום שיא סביב נושא או צורך מסוים הרלוונטי לארגון.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: What does the organization gain? */}
        <section className="py-10 sm:py-12 border-b border-brand-beige/80">
          <div className="bg-brand-beige/40 p-6 sm:p-8 rounded-3xl border border-brand-beige space-y-4">
            <div className="flex items-center gap-2 text-brand-green font-bold text-xs sm:text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>ROI & ערך ארגוני מדיד</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-brand-green tracking-tight mb-2">
              ומה הארגון מרוויח?
            </h3>

            <div className="flex items-start gap-3 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
              <p>
                חיבור מחודש של נשים מנוסות לארגון, חיזוק תחושת המשמעות והמסוגלות, הרחבת הנוכחות וההשפעה ושימור ידע והון אנושי משמעותי.
              </p>
            </div>

            <div className="flex items-start gap-3 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
              <p>
                בסיום תהליך עומק ניתן גם לקבל תמונת מצב אנונימית ומגמתית של תובנות, צרכים ונושאים שעלו בקבוצה, כבסיס להמשך חשיבה ארגונית.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pt-8 pb-8 text-center">
          <div className="bg-white p-7 sm:p-10 rounded-[2.5rem] border-2 border-brand-beige shadow-lg max-w-xl mx-auto">
            <div className="text-xl sm:text-2xl font-black text-brand-green mb-2">
              רוצה לבחון התאמה לארגון שלך?
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
              דלית מזמינה מנהלות ומנהלי משאבי אנוש, הדרכה, רווחה ומובילות בארגונים לשיחת חשיבה והתאמה משותפת.
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
            <div className="font-black text-brand-green text-base sm:text-lg">היילייטס</div>
            <div className="text-gray-700">תוכנית פיתוח אישית ומקצועית לנשים באמצע החיים בארגונים</div>
            <div>מבית <span className="font-black text-brand-green">בין לבין | תוכניות לנשים</span></div>
          </div>
        </section>

      </div>
    </section>
  );
};

export default HighlightsMiniPage;
