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
      part: 'חלק א׳ • מפגש 1',
      value: 'קבלה',
      isPartB: false,
      title: 'גיל המעבר: מה בעצם קורה לי?',
      subtitle: 'תסמינים ושינויים פיזיים ורגשיים',
      desc: 'שינה שמשתבשת, שינויים במצב הרוח, עייפות, גלי חום או תחושה שמשהו בגוף כבר לא עובד כמו פעם. מה מכל אלה קשור לגיל המעבר, ואילו שינויים יכולים להופיע עוד לפני שאנחנו מזהות שהתקופה הזו התחילה? נכיר את התסמינים הפיזיים והרגשיים, נבין את הקשר ביניהם ונקבל כלים להתמודדות עם השינויים מתוך ידע, קבלה וביטחון.'
    },
    {
      id: 't2',
      part: 'חלק א׳ • מפגש 2',
      value: 'אחריות ושחרור',
      isPartB: false,
      title: 'בין הילדים להורים: ואיפה אני בכל הסיפור?',
      subtitle: 'הורים מתבגרים, ילדים שעוזבים את הבית ושינויים במשפחה',
      desc: 'מצד אחד, הילדים גדלים ויוצאים לדרך עצמאית. מצד שני, ההורים שלנו מתבגרים ולעיתים זקוקים לנו יותר מתמיד. בתוך השינויים האלה אנחנו מוצאות את עצמנו בתפקידים חדשים, בין דאגה, אחריות ורצון להיות שם בשביל כולם. נדבר על השינויים ביחסים המשפחתיים, על הצבת גבולות, על שחרור ועל מציאת המקום שלנו בתוך המשפחה המשתנה.'
    },
    {
      id: 't3',
      part: 'חלק א׳ • מפגש 3',
      value: 'איזון',
      isPartB: false,
      title: 'מה הגוף שלי צריך עכשיו?',
      subtitle: 'תזונה, אנרגיה ובריאות בגיל המעבר',
      desc: 'פתאום מה שעבד לנו במשך שנים כבר לא בהכרח עובד באותה צורה. חילוף החומרים משתנה, המשקל מתנהג אחרת וגם רמות האנרגיה לא תמיד צפויות. נבין כיצד השינויים ההורמונליים משפיעים על הצרכים התזונתיים שלנו, נדבר על שמירה על מסת שריר, בריאות העצם וחיוניות ונכיר עקרונות תזונה והרגלים מעשיים שיכולים לתמוך בגוף בתקופה הזו.'
    },
    {
      id: 't4',
      part: 'חלק א׳ • מפגש 4',
      value: 'בחירה',
      isPartB: false,
      title: 'מה אני באמת רוצה, ומה אני בוחרת?',
      subtitle: 'קבלת החלטות מתוך הקשבה לרצונות ולצרכים שלנו',
      desc: 'אנחנו רגילות לקבל החלטות, אבל לא תמיד עוצרות לשאול עד כמה הן באמת משקפות את מה שאנחנו רוצות. איך מבדילים בין הרצון שלנו לבין הציפיות של הסביבה? מה עושים כשיש התלבטות, ואיך מקבלים החלטות בלי לתת לפחד או להרגל לנהל אותנו? נתרגל כלים שיעזרו לנו לזהות מה חשוב לנו, לבחון אפשרויות ולבחור מתוך בהירות וביטחון.'
    },
    {
      id: 't5',
      part: 'חלק ב׳ • מפגש 5',
      value: 'שחרור ואיזון',
      isPartB: true,
      title: 'לוקחות אוויר',
      subtitle: '',
      introParagraphs: [
        'אנחנו נושמות כל הזמן, אבל כמה מאיתנו באמת עוצרות לשים לב לאופן שבו אנחנו נושמות?',
        'במפגש חווייתי נגלה איך הנשימה משפיעה על הגוף, על התחושות שלנו ועל איכות החיים ביומיום.'
      ],
      bulletsTitle: 'נכיר טכניקות נשימה פשוטות שיכולות לסייע לנו:',
      bullets: [
        'להירגע ולהפחית מתח',
        'לשפר את איכות השינה',
        'לווסת את הגוף במצבי לחץ',
        'למצוא רגעים של איזון ובהירות במהלך היום'
      ],
      closingParagraphs: [
        'נתנסה בתרגילי נשימה ונחווה טעימה קצרה של נשימה מעגלית בליווי מוזיקה והנחיה, שתאפשר לנו לעצור, להרפות ולהתחבר לגוף.',
        'נשלב גם תנועה וריקוד חופשי, קצת מוזיקה והרבה מקום לשחרר.',
        'לא צריך ניסיון קודם. רק לבוא ולנשום.'
      ],
      desc: ''
    },
    {
      id: 't6',
      part: 'חלק ב׳ • מפגש 6',
      value: 'הגשמה',
      isPartB: true,
      title: 'ומה עכשיו עם הקריירה שלי?',
      subtitle: 'עבודה, קריירה וכיוונים מקצועיים חדשים באמצע החיים',
      desc: 'אולי אנחנו מרוצות מהעבודה אבל רוצות להתפתח, אולי מרגישות שמיצינו, ואולי יש חלום מקצועי שעדיין לא העזנו לבדוק. נבחן מה חשוב לנו היום בעולם העבודה, אילו יכולות וניסיון צברנו לאורך השנים ואילו אפשרויות עומדות בפנינו. נדבר על שינוי מקצועי, התפתחות, משמעות והדרך להפוך מחשבה על שינוי לכיוון שאפשר להתחיל לקדם.'
    },
    {
      id: 't7',
      part: 'חלק ב׳ • מפגש 7',
      value: 'קרבה',
      isPartB: true,
      title: 'זוגיות ואינטימיות: מה משתנה בינינו?',
      subtitle: 'קרבה, תשוקה ומיניות בתקופת גיל המעבר',
      desc: 'גיל המעבר יכול להשפיע לא רק על הגוף שלנו, אלא גם על החשק, האינטימיות והיחסים הזוגיים. איך מדברים על מה שמשתנה? מה עושים כשיש פערים בצרכים וברצונות? איך שומרים על קרבה ומגלים אותה מחדש? מפגש פתוח ורגיש שבו נדבר על זוגיות, מיניות, תקשורת, דימוי גוף והאפשרות ליצור אינטימיות שמתאימה למי שאנחנו היום.'
    },
    {
      id: 't8',
      part: 'חלק ב׳ • מפגש 8',
      value: 'הודיה',
      isPartB: true,
      title: 'מהתובנות לחיים עצמם',
      subtitle: 'כלים מעולם ה-NLP לחיבור התובנות וליצירת שינוי',
      desc: 'לאורך הדרך אנחנו לומדות על עצמנו, מזהות דברים שהיינו רוצות לשמר ואחרים שהגיע הזמן לשנות. אבל איך לוקחים את כל התובנות האלה אל החיים עצמם? במפגש חווייתי נשתמש בעקרונות ובכלים מעולם ה-NLP כדי להתבונן בדפוסי חשיבה, לזהות את המשאבים והחוזקות שלנו ולחבר בין מה שגילינו לבין הבחירות והצעדים הבאים שלנו. נסיים בהכרת תודה על מה שכבר יש ועל האפשרויות שעוד לפנינו.'
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

          {/* Opening Narrative - WhatsApp Conversation + Regular Follow-up */}
          <div className="max-w-2xl mx-auto text-right space-y-5">
            {/* WhatsApp Chat Window */}
            <div className="rounded-3xl overflow-hidden border border-[#C56B3E]/25 shadow-md bg-[#EFEAE2]">
              {/* WhatsApp Top Bar */}
              <div className="bg-[#075E54] text-white px-4 sm:px-5 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                  <img
                    src="/logos/midlife.webp"
                    alt="בין לבין"
                    className="w-7 h-7 object-contain rounded-full"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-right">
                  <div className="text-sm sm:text-base font-black leading-tight">
                    בין חברות • אמצע החיים
                  </div>
                </div>
              </div>

              {/* Chat Wallpaper & Bubbles */}
              <div className="p-4 sm:p-6 space-y-3 flex flex-col bg-[radial-gradient(#d8d0c5_1px,transparent_1px)] [background-size:16px_16px]">
                {/* Message 1: Incoming */}
                <div className="self-start max-w-[85%] bg-white text-gray-900 px-4 py-2.5 rounded-2xl rounded-tr-xs shadow-xs">
                  <p className="text-base sm:text-lg font-black">״היי אהובה, מה שלומך?״</p>
                </div>

                {/* Message 2: Outgoing */}
                <div className="self-end max-w-[85%] bg-[#D9FDD3] text-gray-900 px-4 py-2.5 rounded-2xl rounded-tl-xs shadow-xs flex items-end gap-2">
                  <p className="text-base sm:text-lg font-black">״הכול בסדר.״</p>
                  <svg className="w-4 h-4 text-[#53BDEB] shrink-0 mb-0.5" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 5.5L4.5 9L11.5 1.5" />
                    <path d="M5.5 5.5L9 9L15 1.5" />
                  </svg>
                </div>

                {/* Message 3: Incoming reflection */}
                <div className="self-start max-w-[92%] sm:max-w-[88%] bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tr-xs shadow-xs">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                    כמה פעמים ביום אנחנו עונות ככה? לפעמים זו באמת כל התשובה. לפעמים, אם רק הייתה לנו הזדמנות להרחיב, היה לנו עוד הרבה מה לשתף.
                  </p>
                </div>

                {/* Message 4: Outgoing */}
                <div className="self-end max-w-[92%] sm:max-w-[88%] bg-[#D9FDD3] text-gray-800 px-4 py-3 rounded-2xl rounded-tl-xs shadow-xs">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                    אולי היינו מספרות על משהו שהשתנה בגוף ואנחנו מנסות להבין אם הוא קשור לגיל המעבר.
                  </p>
                  <div className="flex justify-end mt-1">
                    <svg className="w-4 h-4 text-[#53BDEB]" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 5.5L4.5 9L11.5 1.5" />
                      <path d="M5.5 5.5L9 9L15 1.5" />
                    </svg>
                  </div>
                </div>

                {/* Message 5: Incoming */}
                <div className="self-start max-w-[92%] sm:max-w-[88%] bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tr-xs shadow-xs">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                    אולי היינו שואלות למה מה שתמיד עבד לנו בתזונה כבר פחות מתאים, איך מדברות עם בן הזוג על מה שהשתנה בינינו, או מה בא לנו לעשות עם הזמן שמתפנה כשהילדים פחות צריכים אותנו.
                  </p>
                </div>

                {/* Message 6: Outgoing */}
                <div className="self-end max-w-[92%] sm:max-w-[88%] bg-[#D9FDD3] text-gray-800 px-4 py-3 rounded-2xl rounded-tl-xs shadow-xs">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                    אולי היינו משתפות ברעיון שכבר שנים אנחנו שומרות ל״יום אחד״.
                  </p>
                  <div className="flex justify-end mt-1">
                    <svg className="w-4 h-4 text-[#53BDEB]" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 5.5L4.5 9L11.5 1.5" />
                      <path d="M5.5 5.5L9 9L15 1.5" />
                    </svg>
                  </div>
                </div>

                {/* Message 7: Final punchy question */}
                <div className="self-start max-w-[92%] sm:max-w-[88%] bg-white text-gray-900 px-4 py-3 rounded-2xl rounded-tr-xs shadow-xs border-r-4 border-[#075E54]">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                    לפעמים כל מה שמתחשק לנו לשאול זה{' '}
                    <strong className="font-black text-[#075E54]">״תגידי, גם אצלך זה ככה?״</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Regular Follow-up Text */}
            <div className="bg-white/95 p-6 sm:p-8 rounded-3xl border border-[#C56B3E]/25 shadow-sm space-y-4 text-lg sm:text-xl text-gray-800 leading-[1.8] font-normal">
              <p>
                מתוך כל השאלות, השינויים והשיחות שלא תמיד יוצא לנו לנהל, נולדה ״אמצע החיים״ של בין לבין. מרחב שבו את יכולה להבין קצת יותר את מה שעובר עלייך, לקבל מידע רלוונטי ממרצות מומחיות בתחומן, לשתף, להקשיב ולפגוש נשים שנמצאות בתקופת חיים דומה לשלך.
              </p>

              <p className="font-bold text-[#93542B]">
                את מוזמנת להצטרף אלינו, להביא איתך את מה שמעסיק אותך עכשיו ולגלות מה עוד אפשרי.
              </p>
            </div>
          </div>
        </div>

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

                <h3 className={`text-xl sm:text-2xl font-black tracking-tight mb-1 text-right ${m.isPartB ? 'text-[#C56B3E]' : 'text-[#2D5043]'}`}>
                  {m.title}
                </h3>

                {m.subtitle && (
                  <p className="text-sm sm:text-base font-bold text-gray-800 mb-2 text-right">
                    {m.subtitle}
                  </p>
                )}

                <p className="text-xs sm:text-sm font-black text-[#93542B] mb-3 text-right">
                  ערך מוביל: {m.value}
                </p>

                {m.desc ? (
                  <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed mt-auto text-right">
                    {m.desc}
                  </p>
                ) : (
                  <div className="space-y-2.5 text-sm sm:text-base text-gray-700 font-medium leading-relaxed mt-auto text-right">
                    {m.introParagraphs?.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                    {m.bulletsTitle && (
                      <div className="bg-[#FFF9F4] rounded-2xl p-3.5 space-y-1.5 border border-[#C56B3E]/15">
                        <p className="font-bold text-[#93542B]">{m.bulletsTitle}</p>
                        <ul className="space-y-1 pr-4 list-disc marker:text-[#C56B3E]">
                          {m.bullets?.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {m.closingParagraphs?.map((para, cIdx) => (
                      <p
                        key={cIdx}
                        className={
                          cIdx === (m.closingParagraphs?.length || 0) - 1
                            ? 'font-black text-[#C56B3E]'
                            : ''
                        }
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-7 bg-gradient-to-r from-[#FFF4EB] via-[#FFE6D1] to-[#FFF4EB] p-5 sm:p-7 rounded-3xl border-2 border-[#C56B3E] shadow-lg text-center animate-notice-blink">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C56B3E] text-white text-xs font-black mb-2.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-200 animate-ping"></span>
              <span>חשוב לדעת ✦</span>
            </div>
            <p className="text-base sm:text-lg font-black text-[#2D5043] leading-relaxed">
              רשימת המפגשים מציגה את מאגר הנושאים של סדנת ״אמצע החיים״. בכל מחזור מתקיימים שישה מפגשים, שלושה בכל חלק. הנושאים נבחרים מתוך שני החלקים וניתן לשלב ביניהם בהתאם לאופי הקבוצה ולצרכיה.
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

