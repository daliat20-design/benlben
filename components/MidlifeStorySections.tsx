import React from 'react';
import { ImageGallery } from './ImageGallery';
import { ButterflyIcon } from './Hero';

export const MidlifeGallerySection: React.FC = () => {
  return (
    <section
      id="gallery-section"
      className="py-12 sm:py-16 md:py-18 bg-[#EDE0C6] border-b-2 border-[#2D5043]/20 relative px-4 sm:px-6 overflow-hidden scroll-mt-20"
      dir="rtl"
    >
      <div className="max-w-5xl mx-auto relative flex flex-col items-center">
        <ButterflyIcon
          size={50}
          className="absolute top-12 right-10 md:right-32 animate-drift opacity-35 text-[#C56B3E] hidden md:block -z-10"
        />
        <ButterflyIcon
          size={60}
          className="absolute bottom-4 left-10 md:left-32 animate-float opacity-25 text-[#2D5043] hidden md:block -z-10"
        />

        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#C56B3E] text-center tracking-tight">
            טעימה מהסדנאות
          </h2>
          <div className="h-1.5 sm:h-2 w-20 sm:w-24 bg-[#C56B3E] mt-3 sm:mt-4 rounded-full"></div>
        </div>

        <div className="w-full max-w-4xl bg-white rounded-3xl sm:rounded-[3rem] p-3 sm:p-4 shadow-xl overflow-hidden border-2 border-[#C56B3E]/30">
          <ImageGallery />
        </div>
      </div>
    </section>
  );
};

export const MidlifeHowItWorksAndBenefits: React.FC = () => {
  const takeaways = [
    {
      title: 'ידע שעושה סדר',
      text: 'להבין אילו שינויים עשויים להיות קשורים לגיל המעבר, מה כדאי לבדוק ואילו אפשרויות עומדות בפנייך. לקבל מידע מנשות מקצוע, במקום להישאר עם עצות שלא תמיד מסתדרות זו עם זו.',
      accent: 'border-t-[#C56B3E]',
      titleColor: 'text-[#C56B3E]',
    },
    {
      title: 'כלים לחיים עצמם',
      text: 'להכיר ולהתנסות בכלים מעשיים, גם מעולם ה-NLP, שיכולים לעזור בהתמודדות עם שינויים, בהרגלים ובבחירות היומיומיות.',
      accent: 'border-t-[#2D5043]',
      titleColor: 'text-[#2D5043]',
    },
    {
      title: 'נקודות מבט חדשות',
      text: 'להסתכל קצת אחרת על הזוגיות, על המשפחה המשתנה, על העבודה ועל הדברים שחשובים לך היום. לפעמים שאלה טובה או שיחה מעניינת מספיקות כדי לפתוח כיוון חדש למחשבה.',
      accent: 'border-t-[#2D5043]',
      titleColor: 'text-[#2D5043]',
    },
    {
      title: 'מפגש נשי שכיף להיות חלק ממנו',
      text: 'לפגוש נשים שנמצאות בתקופה דומה, לשמוע חוויות, לשתף אם מתחשק לך, לצחוק וליהנות מכמה שעות של תוכן, שיחה וזמן לעצמך.',
      accent: 'border-t-[#C56B3E]',
      titleColor: 'text-[#C56B3E]',
    },
  ];

  return (
    <>
      {/* Section 4: איך נראים המפגשים? (White) */}
      <section
        id="about"
        className="py-12 sm:py-16 md:py-20 bg-white px-4 sm:px-6 border-y border-[#C56B3E]/15 scroll-mt-20"
        dir="rtl"
      >
        <div className="max-w-4xl mx-auto text-right">
          <div className="text-center mb-7 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2D5043] tracking-tight">
              איך נראים המפגשים?
            </h2>
            <div className="h-1.5 w-20 bg-[#C56B3E] mx-auto mt-3 sm:mt-4 rounded-full"></div>
          </div>

          <div className="bg-[#F5EBD8] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-9 md:p-11 border-2 border-[#2D5043]/25 border-r-[10px] border-r-[#C56B3E] shadow-[0_14px_40px_rgba(45,80,67,0.10)] space-y-4 text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-normal">
            <p>
              בכל מפגש נעסוק בנושא אחר שמלווה אותנו באמצע החיים, בהנחיית אשת מקצוע מתחומה.
            </p>
            <p className="font-bold text-[#2D5043]">
              נלמד, נתנסה בכלים מעשיים ונפתח שיחה.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: מה את מקבלת ? (Rich Sage Mint) */}
      <section
        id="takeaways"
        className="py-12 sm:py-16 md:py-20 bg-[#CEE2D6] border-b-2 border-[#2D5043]/25 px-4 sm:px-6 scroll-mt-20"
        dir="rtl"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2D5043] tracking-tight">
              מה את מקבלת ?
            </h2>
            <div className="h-1.5 w-20 bg-[#C56B3E] mx-auto mt-3 sm:mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 text-right">
            {takeaways.map((item, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#2D5043]/20 border-t-[8px] ${item.accent} shadow-md hover:shadow-lg transition-shadow space-y-3`}
              >
                <h3 className={`text-xl sm:text-2xl font-black ${item.titleColor}`}>
                  {item.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export const MidlifeSpecialApproachSection: React.FC = () => {
  return (
    <section
      id="our-approach"
      className="py-12 sm:py-16 bg-[#2D5043] px-4 sm:px-6 border-b-4 border-[#1F3A30]"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-[#FFF9F4] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 border-2 border-[#C56B3E]/40 shadow-2xl space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black text-[#2D5043] tracking-tight">
            מה מיוחד בדרך שלנו?
          </h2>
          <div className="h-1.5 w-20 bg-[#C56B3E] mx-auto rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-normal max-w-3xl mx-auto pt-1">
            אנחנו מחברות בין נשות מקצוע מתחומים שונים, התנסות מעשית וקבוצה שנפגשת לאורך הסדרה. כך נוצר מקום שבו הידע המקצועי פוגש את ניסיון החיים ואת השיחות בין המשתתפות.
          </p>
        </div>
      </div>
    </section>
  );
};

interface MidlifePreFormCTAProps {
  onOpenForm?: () => void;
  isFormOpen?: boolean;
}

export const MidlifePreFormCTA: React.FC<MidlifePreFormCTAProps> = ({
  onOpenForm,
  isFormOpen = false,
}) => {
  const handleButtonClick = () => {
    if (onOpenForm) {
      onOpenForm();
    } else {
      const el = document.getElementById('interest-form') || document.getElementById('interest');
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="interest"
      className="py-12 sm:py-16 bg-[#2D5043] border-b-4 border-[#1F3A30] px-4 sm:px-6 text-center scroll-mt-20"
      dir="rtl"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-7 sm:p-10 md:p-12 border-2 border-[#C56B3E]/40 shadow-2xl space-y-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#C56B3E] tracking-tight">
            אז נפגשות באמצע החיים?
          </h2>
          <div className="space-y-2 text-base sm:text-xl text-gray-800 leading-relaxed">
            <p className="font-normal">
              לא צריך להכיר את כל התסמינים, להגיע עם שאלה גדולה או לחשוב שאת זקוקה לשינוי.
            </p>
            <p className="text-xl sm:text-2xl font-black text-[#2D5043]">
              מספיק להיות סקרנית.
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleButtonClick}
              aria-expanded={isFormOpen}
              className="w-full sm:w-auto bg-gradient-to-r from-[#C56B3E] to-[#B85D19] hover:from-[#B85D19] hover:to-[#93542B] text-white px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-black shadow-[0_12px_28px_rgba(197,107,62,0.35)] hover:shadow-2xl transition-all transform hover:-translate-y-0.5 border-b-4 border-[#93542B] cursor-pointer"
            >
              אשמח לפרטים נוספים
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
