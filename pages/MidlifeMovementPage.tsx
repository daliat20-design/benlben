import React, { useState, useEffect, useRef } from 'react';
import { saveInquiry } from '../utils/inquiryStorage';

type TrackType = 'שלושת המפגשים' | 'פלואו טריפ' | 'המסלול המשולב';

const PROGRAM_LOGO_URL = "https://i.postimg.cc/YCQjBJMs/Butterfly-logo-with-corrected-Hebrew-subtitle.png";
const BRAND_LOGO_URL = "/logos/brand-main.webp";
const BRAND_LOGO_FALLBACK = "/logos/brand-main.png";

// תמונות אותנטיות מהדף הראשי של בין לבין
const GALLERY_PHOTOS = [
  { url: 'https://i.postimg.cc/L6HXW70S/IS-0800.jpg', alt: 'מפגש נשי אינטימי' },
  { url: 'https://i.postimg.cc/yYmV7Ttm/IS-0576.jpg', alt: 'חיבור ושיח פתוח' },
  { url: 'https://i.postimg.cc/2yCzPbG1/IS-0777.jpg', alt: 'רגעים של הקשבה וקרבה' },
  { url: 'https://i.postimg.cc/sDDjmWvx/c4957b4d-b80f-4f63-b14c-195536a30300.jpg', alt: 'סדנה והתנסות מעשית' },
  { url: 'https://i.postimg.cc/xCC3XM6R/d1eb9c15-b336-4bf3-9cb0-d7400712e8c1.jpg', alt: 'יוצרות ומגלות יחד' },
  { url: 'https://i.postimg.cc/8zS3jXMk/fd1e841d-049f-48a3-a8ca-c76337f4b653.jpg', alt: 'עבודה אישית מעמיקה' },
  { url: 'https://i.postimg.cc/jjzYtqL8/IS-0475.jpg', alt: 'מפגש מעצים ומהנה' },
  { url: 'https://i.postimg.cc/28Vp3718/IS-0348.jpg', alt: 'זמן איכות לעצמך' },
  { url: 'https://i.postimg.cc/C52Qb9R0/IS-0554.jpg', alt: 'מרחב של שיתוף וצמיחה' },
];

export const MidlifeMovementPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<TrackType>('שלושת המפגשים');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    document.title = "אמצע החיים | מרעיון לתנועה";
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    // In RTL: swipe left (diff > 50) means next, swipe right (diff < -50) means prev
    if (diff > 50) {
      nextPhoto();
    } else if (diff < -50) {
      prevPhoto();
    }
    setTouchStartX(null);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const scrollToForm = (track?: TrackType) => {
    if (track) {
      setSelectedTrack(track);
    }
    const formElement = document.getElementById('interest-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('נא למלא שם מלא');
      return;
    }

    const cleanPhone = phone.trim().replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setErrorMessage('נא למלא מספר טלפון תקין');
      return;
    }

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('נא למלא כתובת דוא״ל תקינה');
      return;
    }

    setIsSubmitting(true);

    try {
      await saveInquiry({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: cleanEmail,
        programs: [`אמצע החיים - מרעיון לתנועה: ${selectedTrack}`],
        source: 'דף נחיתה אמצע החיים - מרעיון לתנועה',
        submittedAt: new Date().toISOString(),
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error saving inquiry:', err);
      setErrorMessage('אירעה שגיאה קלה בשליחה. נא לנסות שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F4] text-gray-800 font-sans selection:bg-[#C56B3E]/20 selection:text-[#204C8E]" dir="rtl">
      
      {/* סרגל עליון עם לוגו בין לבין */}
      <header className="border-b border-[#C56B3E]/15 bg-white/95 backdrop-blur-sm sticky top-0 z-30 shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-right">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 overflow-hidden bg-white p-0.5 shrink-0 shadow-2xs">
              <img 
                src={BRAND_LOGO_URL} 
                alt="לוגו בין לבין" 
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== BRAND_LOGO_FALLBACK) {
                    target.src = BRAND_LOGO_FALLBACK;
                  }
                }}
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black text-[#C56B3E] tracking-tight">בין לבין</span>
              <span className="text-gray-300 mx-1.5 font-light">|</span>
              <span className="text-xs font-bold text-gray-600">מרחבים לנשים</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollToForm()}
            className="text-xs sm:text-sm font-bold text-[#204C8E] hover:text-[#C56B3E] transition-colors cursor-pointer"
          >
            להשארת פרטים
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-14 sm:space-y-18">

        {/* 1. Hero עם לוגו התוכנית */}
        <section className="text-right space-y-6">
          
          {/* לוגו התוכנית - מוצג בראש הדף */}
          <div className="flex justify-start sm:justify-start">
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-white p-2 border-2 border-[#C56B3E]/30 shadow-md flex items-center justify-center overflow-hidden">
              <img 
                src={PROGRAM_LOGO_URL} 
                alt="לוגו אמצע החיים" 
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#C56B3E] tracking-tight leading-none">
              אמצע החיים
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#204C8E] tracking-tight">
              מרעיון לתנועה
            </h2>
          </div>

          <p className="text-lg sm:text-xl font-bold text-gray-900 border-r-4 border-[#C56B3E] pr-3 py-0.5">
            שלושה מפגשים מעשיים לקידום שינוי אישי
          </p>

          <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed pt-2">
            <p>
              יש משהו שאת רוצה לשנות, אבל הוא נשאר בינתיים בגדר מחשבה?
              <br />
              אולי את כבר יודעת מה היית רוצה שיקרה, אבל מתקשה להתחיל. אולי את מרגישה שמשהו מבקש להשתנות, ועדיין לא ברור לך בדיוק מה.
            </p>
            <p>
              בשלושה מפגשים סדנאיים נברר מה את מבקשת לעצמך עכשיו, נזהה מה מקשה עלייך להתקדם ונמצא דרך להתחיל לתת לזה מקום בחיים.
            </p>
            <p>
              בכל מפגש נשלב ידע מקצועי, התנסות ועבודה אישית. מכל מפגש תצאי עם משהו משלך, עד לצעד ראשון שתוכלי לנסות בשגרה.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => scrollToForm()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#204C8E] hover:bg-[#183a6d] text-white text-base font-bold rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              אני רוצה לשמוע עוד
            </button>
          </div>
        </section>

        {/* 2. שלושה מפגשים - 3 כרטיסים */}
        <section className="space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#C56B3E] text-right">
            שלושה מפגשים. כל אחד מקדם אותך עוד שלב.
          </h3>

          <div className="space-y-5">
            
            {/* מפגש 1 */}
            <div className="bg-white border-2 border-[#C56B3E]/20 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4 text-right">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
                    פענוח השינוי
                  </h4>
                  <p className="text-sm text-gray-600 font-medium">
                    בהובלת פסיכותרפיסטית
                  </p>
                </div>
                <span className="w-10 h-10 rounded-full bg-[#204C8E] text-white flex items-center justify-center text-lg font-black shrink-0">
                  1
                </span>
              </div>

              <div className="bg-[#FFF4EB] border-r-4 border-[#C56B3E] p-4 rounded-lg">
                <p className="font-bold text-base sm:text-lg text-gray-900">
                  מה אני באמת מבקשת לשנות עכשיו?
                </p>
              </div>

              <div className="text-base text-gray-700 leading-relaxed space-y-2">
                <p>
                  לפעמים מאחורי המשפט ״אני רוצה יותר זמן לעצמי״ מסתתר רצון אחר: לבחור בלי להרגיש אשמה, לפנות מקום לעניין שנדחק הצדה או לשנות את סדר העדיפויות.
                </p>
                <p>
                  נעצור לברר מה עומד מאחורי הרצון שלך ומה מתוכו חשוב לך לקדם עכשיו.
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-base font-bold text-[#204C8E]">
                  תצאי עם: <span className="font-medium text-gray-800">ניסוח ברור של השינוי שאת רוצה לקדם.</span>
                </p>
              </div>
            </div>

            {/* מפגש 2 */}
            <div className="bg-white border-2 border-[#C56B3E]/20 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4 text-right">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
                    מה קורה לי כשאני מנסה לזוז
                  </h4>
                  <p className="text-sm text-gray-600 font-medium">
                    בהובלת מיה קדוש, עם כלים מעולמות ה-CBT
                  </p>
                </div>
                <span className="w-10 h-10 rounded-full bg-[#204C8E] text-white flex items-center justify-center text-lg font-black shrink-0">
                  2
                </span>
              </div>

              <div className="bg-[#FFF4EB] border-r-4 border-[#C56B3E] p-4 rounded-lg">
                <p className="font-bold text-base sm:text-lg text-gray-900">
                  מה קורה בין ״אני רוצה״ לבין ״אני עושה״?
                </p>
              </div>

              <div className="text-base text-gray-700 leading-relaxed space-y-2">
                <p>
                  נזהה את המחשבות, ההרגלים והתגובות שמופיעים כשאת מנסה לעשות משהו אחרת. נבדוק מה מחזיר אותך לאותה נקודה ואיזו תגובה חדשה תוכלי לנסות.
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-base font-bold text-[#204C8E]">
                  תצאי עם: <span className="font-medium text-gray-800">זיהוי החסם המרכזי שלך וכלי מעשי להתחיל להתמודד איתו.</span>
                </p>
              </div>
            </div>

            {/* מפגש 3 */}
            <div className="bg-white border-2 border-[#C56B3E]/20 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4 text-right">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
                    מגייסת את עצמי לטובת השינוי
                  </h4>
                  <p className="text-sm text-gray-600 font-medium">
                    בהובלת אלסי זיסלמן
                  </p>
                </div>
                <span className="w-10 h-10 rounded-full bg-[#204C8E] text-white flex items-center justify-center text-lg font-black shrink-0">
                  3
                </span>
              </div>

              <div className="bg-[#FFF4EB] border-r-4 border-[#C56B3E] p-4 rounded-lg">
                <p className="font-bold text-base sm:text-lg text-gray-900">
                  מה כבר יש בי שיכול לעזור לי להתחיל?
                </p>
              </div>

              <div className="text-base text-gray-700 leading-relaxed space-y-2">
                <p>
                  נחזור למצבים שבהם הצלחת לעשות שינוי, נזהה כוחות שעומדים לרשותך ונבנה עוגן אישי שתוכלי להיעזר בו ברגע האמת.
                </p>
                <p>
                  מתוך כל אלה תבחרי פעולה קטנה ומוגדרת לבדיקה בחיים עצמם.
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-base font-bold text-[#204C8E]">
                  תצאי עם: <span className="font-medium text-gray-800">משאב אישי, עוגן תומך וצעד ראשון שתוכלי להתחיל לנסות.</span>
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 3. את בוחרת כמה להעמיק */}
        <section className="bg-white border border-[#C56B3E]/20 rounded-2xl p-6 sm:p-8 text-right space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-[#C56B3E]">
            את בוחרת כמה להעמיק
          </h3>
          <div className="space-y-3 text-base sm:text-lg text-gray-700 leading-relaxed">
            <p>
              אפשר להגיע עם שינוי מסוים שאת רוצה לקדם, להגיע כדי לבדוק מה מעסיק אותך או פשוט מתוך סקרנות ורצון לקבל ידע וכלים.
            </p>
            <p>
              את בוחרת כמה לשתף וכמה להעמיק בעבודה האישית. יש מקום גם להתנסות, למפגש ולהנאה שבדרך.
            </p>
          </div>
        </section>

        {/* 4. גלריית תמונות בחלון אחד וגלילה מתוכו - מותאמת ללא שום חיתוך */}
        <section className="space-y-3 text-right">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold text-[#C56B3E]">
              טעימה מהאווירה במפגשים
            </h3>
            <span className="text-xs sm:text-sm font-bold text-[#204C8E]">
              תמונה {currentPhotoIndex + 1} מתוך {GALLERY_PHOTOS.length}
            </span>
          </div>

          {/* החלון המרכזי של הגלריה - מותאם כך שאף תמונה לא תיחתך */}
          <div 
            className="relative h-[290px] sm:h-[400px] md:h-[460px] w-full overflow-hidden rounded-2xl bg-[#1d1b1a] border-2 border-[#C56B3E]/30 shadow-md select-none group flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* רקע מטושטש הרמוני של אותה תמונה שממלא את המסגרת ברכות */}
            <img
              src={GALLERY_PHOTOS[currentPhotoIndex].url}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
            />

            {/* התמונה המרכזית במלואה - object-contain ללא שום חיתוך */}
            <img
              key={currentPhotoIndex}
              src={GALLERY_PHOTOS[currentPhotoIndex].url}
              alt={GALLERY_PHOTOS[currentPhotoIndex].alt}
              className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain transition-all duration-300 drop-shadow-md"
              loading="lazy"
            />

            {/* כפתורי ניווט בתוך החלון - ללא אייקונים */}
            <div className="absolute inset-y-0 right-3 z-20 flex items-center">
              <button
                type="button"
                onClick={prevPhoto}
                className="bg-black/60 hover:bg-[#204C8E] text-white px-3.5 py-2 rounded-xl text-xs font-bold backdrop-blur-md transition-colors cursor-pointer border border-white/20 shadow-sm"
                title="תמונה קודמת"
              >
                הקודם
              </button>
            </div>

            <div className="absolute inset-y-0 left-3 z-20 flex items-center">
              <button
                type="button"
                onClick={nextPhoto}
                className="bg-black/60 hover:bg-[#204C8E] text-white px-3.5 py-2 rounded-xl text-xs font-bold backdrop-blur-md transition-colors cursor-pointer border border-white/20 shadow-sm"
                title="תמונה הבאה"
              >
                הבא
              </button>
            </div>
          </div>

          {/* כיתוב חיצוני מחוץ לתמונה כך שלא יסתיר שום חלק ממנה */}
          <div className="bg-white border border-[#C56B3E]/20 rounded-xl px-4 py-2.5 flex items-center justify-between text-right shadow-2xs">
            <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">
              {GALLERY_PHOTOS[currentPhotoIndex].alt}
            </p>
            <span className="text-[11px] font-bold text-gray-500 shrink-0 mr-3">
              החלקה באצבע או לחיצה על הכפתורים
            </span>
          </div>

          {/* מחווני נקודות ניווט מתחת לחלון */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {GALLERY_PHOTOS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPhotoIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentPhotoIndex 
                    ? 'w-6 bg-[#204C8E]' 
                    : 'w-2 bg-[#C56B3E]/30 hover:bg-[#C56B3E]'
                }`}
                aria-label={`עבור לתמונה ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* 5. פלואו טריפ - אזור נפרד וקצר עם נוכחות בולטת לכחול העמוק #204C8E */}
        <section className="bg-gradient-to-b from-[#204C8E]/5 to-[#204C8E]/10 border-2 border-[#204C8E]/40 rounded-2xl p-6 sm:p-8 text-right space-y-4">
          <p className="text-sm sm:text-base font-bold text-[#204C8E]">
            רוצה להמשיך את התנועה גם מחוץ לשגרה?
          </p>

          <h3 className="text-2xl sm:text-3xl font-black text-[#204C8E]">
            פלואו טריפ | יומיים בכרמל
          </h3>

          <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
            יומיים של טבע, טעמים, תנועה, מפגש וזמן לעצמך. הזדמנות להחליף אווירה, ליהנות יחד ולפגוש את מה שעלה בסדנה גם דרך החוויה.
          </p>

          <div className="pt-2">
            <p className="text-sm sm:text-base font-bold text-gray-700 bg-white/80 border border-[#204C8E]/20 rounded-xl px-4 py-2.5 inline-block">
              אפשר להירשם לסדנה, לפלואו טריפ או למסלול המשולב.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => scrollToForm('פלואו טריפ')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-[#204C8E] hover:bg-[#183a6d] text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
            >
              לפרטים על הפלואו טריפ
            </button>
          </div>
        </section>

        {/* 6. טופס התעניינות */}
        <section id="interest-form" className="bg-white border-2 border-[#C56B3E]/30 rounded-2xl p-6 sm:p-8 shadow-sm text-right space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#C56B3E]">
              נתחיל ממה שמעסיק אותך עכשיו
            </h3>
            <p className="text-base text-gray-600">
              השאירי פרטים לקבלת מועדים, מחירים ופרטים נוספים.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-[#FFF4EB] border-2 border-[#C56B3E]/40 rounded-xl p-6 text-center space-y-3">
              <h4 className="text-xl font-bold text-[#204C8E]">
                תודה, הפרטים התקבלו בהצלחה
              </h4>
              <p className="text-base text-gray-700">
                נחזור אלייך בהקדם עם כל המידע על מועדים, מחירים והרשמה.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFullName('');
                  setPhone('');
                  setEmail('');
                }}
                className="text-xs font-bold text-[#C56B3E] underline cursor-pointer pt-2"
              >
                שליחת פנייה נוספת
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-bold p-3 rounded-xl text-right">
                  {errorMessage}
                </div>
              )}

              {/* שם מלא */}
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="block text-sm font-bold text-gray-800">
                  שם מלא *
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="השם שלך"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#204C8E] focus:ring-1 focus:ring-[#204C8E] bg-[#FFF9F4] text-base outline-none text-right transition-colors"
                />
              </div>

              {/* טלפון */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="block text-sm font-bold text-gray-800">
                  טלפון *
                </label>
                <input
                  id="phone"
                  type="tel"
                  dir="ltr"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="050-0000000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#204C8E] focus:ring-1 focus:ring-[#204C8E] bg-[#FFF9F4] text-base outline-none text-right transition-colors"
                />
              </div>

              {/* דוא״ל */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-bold text-gray-800">
                  דוא״ל *
                </label>
                <input
                  id="email"
                  type="email"
                  dir="ltr"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#204C8E] focus:ring-1 focus:ring-[#204C8E] bg-[#FFF9F4] text-base outline-none text-right transition-colors"
                />
              </div>

              {/* מעניין אותי */}
              <div className="space-y-2 pt-2">
                <label className="block text-sm font-bold text-gray-800">
                  מעניין אותי:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(['שלושת המפגשים', 'פלואו טריפ', 'המסלול המשולב'] as TrackType[]).map((track) => (
                    <button
                      key={track}
                      type="button"
                      onClick={() => setSelectedTrack(track)}
                      className={`py-3 px-3 rounded-xl text-sm font-bold border transition-all text-center cursor-pointer ${
                        selectedTrack === track
                          ? 'bg-[#204C8E] text-white border-[#204C8E] shadow-xs'
                          : 'bg-[#FFF9F4] text-gray-700 border-gray-200 hover:border-[#204C8E]/40'
                      }`}
                    >
                      {track}
                    </button>
                  ))}
                </div>
              </div>

              {/* כפתור שליחה */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#204C8E] hover:bg-[#183a6d] disabled:opacity-50 text-white font-extrabold text-lg rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  {isSubmitting ? 'שולח...' : 'אשמח לקבל פרטים'}
                </button>
              </div>

            </form>
          )}
        </section>

      </main>

      {/* Footer מינימלי ונקי */}
      <footer className="border-t border-[#C56B3E]/15 bg-white py-8 px-4 text-center text-xs text-gray-500 space-y-1">
        <p className="font-bold text-[#C56B3E]">
          בין לבין | מרחבים לנשים
        </p>
        <p>
          כל הזכויות שמורות
        </p>
      </footer>

    </div>
  );
};

export default MidlifeMovementPage;
