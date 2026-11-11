import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Sparkles, MessageCircle, AlertCircle, HeartHandshake, Check } from 'lucide-react';
import { saveInquiry } from '../utils/inquiryStorage';

export const WORKSHOP_PACKAGES = [
  {
    id: 'together',
    name: 'באות יחד',
    price: '₪810 למשתתפת',
    note: '6 מפגשים לכל אחת בהרשמה משותפת של שתי משתתפות (135 ₪ למפגש)',
    tag: 'המחיר המשתלם ביותר',
    tagColor: 'bg-[#C56B3E] text-white',
    border: 'border-[#C56B3E]/30',
    activeBg: 'bg-[#FFF4EB] border-[#C56B3E]',
  },
  {
    id: 'full',
    name: 'החוויה המלאה - כל 6 המפגשים',
    price: '₪900 למשתתפת',
    note: 'כל 6 המפגשים: חלק א׳ + חלק ב׳ של התוכנית (150 ₪ למפגש)',
    tag: 'כל 6 המפגשים',
    tagColor: 'bg-[#2D5043] text-white',
    border: 'border-[#2D5043]/30',
    activeBg: 'bg-[#2D5043]/5 border-[#2D5043]',
  },
  {
    id: 'part1',
    name: "שלושה בתור התחלה - חלק א'",
    price: '₪510 למשתתפת',
    note: '3 מפגשים לבחירה: חלק א׳ (170 ₪ למפגש)',
    tag: '3 מפגשים',
    tagColor: 'bg-[#FFF4EB] text-[#93542B]',
    border: 'border-[#2D5043]/25',
    activeBg: 'bg-[#2D5043]/5 border-[#2D5043]',
  },
  {
    id: 'part2',
    name: "שלושה בתור התחלה - חלק ב'",
    price: '₪510 למשתתפת',
    note: '3 מפגשים לבחירה: חלק ב׳ (170 ₪ למפגש)',
    tag: '3 מפגשים',
    tagColor: 'bg-[#FFF4EB] text-[#93542B]',
    border: 'border-[#C56B3E]/25',
    activeBg: 'bg-[#FFF4EB] border-[#C56B3E]',
  },
];

interface WorkshopInterestFormProps {
  id?: string;
  selectedPackage?: string;
  onSelectPackage?: (pkg: string) => void;
}

export const WorkshopInterestForm: React.FC<WorkshopInterestFormProps> = ({
  id = 'interest',
  selectedPackage: externalSelectedPackage,
  onSelectPackage,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPkg, setSelectedPkg] = useState<string>('באות יחד (₪810 למשתתפת)');
  const [aboutSelf, setAboutSelf] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (externalSelectedPackage) {
      if (externalSelectedPackage.includes('באות יחד')) {
        setSelectedPkg('באות יחד (₪810 למשתתפת)');
      } else if (externalSelectedPackage.includes('ששת המפגשים') || externalSelectedPackage.includes('המלאה') || externalSelectedPackage.includes('כולה') || externalSelectedPackage.includes('6 המפגשים')) {
        setSelectedPkg('החוויה המלאה - כל 6 המפגשים (₪900 למשתתפת)');
      } else if (externalSelectedPackage.includes("חלק א'") || externalSelectedPackage.includes('הראשון')) {
        setSelectedPkg("שלושה בתור התחלה - חלק א' (₪510 למשתתפת)");
      } else if (externalSelectedPackage.includes("חלק ב'") || externalSelectedPackage.includes('השני')) {
        setSelectedPkg("שלושה בתור התחלה - חלק ב' (₪510 למשתתפת)");
      } else if (externalSelectedPackage.includes("חלק א'") || externalSelectedPackage.includes('הראשון') || externalSelectedPackage.includes('שלושה בתור התחלה') || externalSelectedPackage.includes('3 מפגשים')) {
        setSelectedPkg("שלושה בתור התחלה - חלק א' (₪510 למשתתפת)");
      }
    }
  }, [externalSelectedPackage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('נא למלא שם מלא');
      return;
    }

    const cleanPhone = phone.trim().replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setErrorMessage('נא להזין מספר טלפון נייד תקין (לפחות 9 ספרות)');
      return;
    }

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('נא להזין כתובת מייל תקינה');
      return;
    }

    setIsSubmitting(true);

    try {
      await saveInquiry({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: cleanEmail,
        programs: [`סדנת אמצע החיים: ${selectedPkg}`],
        notes: aboutSelf.trim(),
        source: 'דף נחיתה אמצע החיים - סדנת הדגל',
        submittedAt: new Date().toISOString(),
      });

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting inquiry:', err);
      setErrorMessage('אירעה שגיאה קלה בשליחה. נא לנסות שנית או לפנות אלינו בוואטסאפ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setAboutSelf('');
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  const whatsappMessage = encodeURIComponent(
    `היי דלית ואלסי, שמי ${fullName || 'מתעניינת'}, שלחתי עכשיו פנייה לסדנת אמצע החיים לגבי מסלול ${selectedPkg} ואשמח לשוחח!`
  );
  const quickWhatsappUrl = `https://api.whatsapp.com/send?phone=972508353731&text=${whatsappMessage}`;

  return (
    <section id={id} className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl sm:rounded-4xl p-5 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(197,107,62,0.08)] border-2 border-[#C56B3E]/20 relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#2D5043] via-[#C56B3E] to-[#B85D19]" />

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-8 px-4"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-[#FFF4EB] text-[#C56B3E] flex items-center justify-center mb-6 shadow-sm border border-[#C56B3E]/30">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-[#2D5043] mb-4">
                איזה כיף, קיבלנו את הפרטים!
              </h3>

              <p className="text-xl sm:text-2xl text-gray-800 mb-6 font-medium leading-relaxed max-w-xl mx-auto">
                תודה <strong className="text-[#C56B3E] font-bold">{fullName}</strong>, 
                קיבלנו את פנייתך באהבה ונחזור אלייך בהקדם לטלפון{' '}
                <span dir="ltr" className="font-bold text-gray-900">{phone}</span>
                <span> לשיחה אישית ושריון מקומך במסלול <strong>{selectedPkg}</strong>.</span>
              </p>

              <div className="bg-[#FFF9F4] border border-[#C56B3E]/20 rounded-2xl p-6 max-w-lg mx-auto mb-8 text-right">
                <div className="flex items-center gap-2 text-[#2D5043] font-bold text-lg mb-2">
                  <HeartHandshake className="w-5 h-5 text-[#C56B3E]" />
                  <span>רוצה לדבר כבר עכשיו?</span>
                </div>
                <p className="text-gray-700 text-base mb-4 leading-normal">
                  אם את מעדיפה לחסוך זמן או לשאול שאלה ישירה, מוזמנת להמשיך ישירות לשיחה בוואטסאפ:
                </p>
                <a
                  href={quickWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C56B3E] to-[#B85D19] hover:from-[#B85D19] hover:to-[#93542B] text-white font-bold text-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>המשך שיחה מהירה בוואטסאפ</span>
                </a>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="text-gray-500 hover:text-[#C56B3E] font-semibold text-base underline underline-offset-4 cursor-pointer"
              >
                שליחת פנייה נוספת
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-6 sm:mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C56B3E]/10 text-[#C56B3E] text-sm sm:text-base font-bold mb-3 border border-[#C56B3E]/20">
                  <Sparkles className="w-4 h-4" />
                  <span>בואי נתחבר</span>
                </div>
                {/* Exact requested heading */}
                <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-[#C56B3E] mb-3 tracking-tight leading-snug">
                  השאירי פרטים ונשמח לחזור אלייך לשיחת אישית ושריון מקומך
                </h3>
                <p className="text-sm sm:text-lg text-gray-700 max-w-xl mx-auto leading-relaxed">
                  הסדנה מתקיימת במסגרת אינטימית בקבוצה קטנה. השאירי פרטים ונעדכן אותך לפני כולן לקראת מחזור חורף הקרוב.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3 text-base sm:text-lg font-medium">
                  <AlertCircle className="w-6 h-6 flex-shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7 text-right">
                {/* 1. שם מלא */}
                <div>
                  <label htmlFor="ws-fullName" className="block text-base sm:text-lg font-bold text-gray-900 mb-2">
                    שם מלא <span className="text-[#C56B3E]">*</span>
                  </label>
                  <input
                    id="ws-fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="לדוגמה: שרה ישראלי"
                    className="w-full px-5 py-3.5 sm:py-4 text-lg text-gray-900 bg-[#FFF9F4] rounded-2xl border-2 border-[#C56B3E]/20 focus:border-[#C56B3E] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* 2. נייד ומייל */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label htmlFor="ws-phone" className="block text-base sm:text-lg font-bold text-gray-900 mb-2">
                      מספר נייד <span className="text-[#C56B3E]">*</span>
                    </label>
                    <input
                      id="ws-phone"
                      type="tel"
                      required
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="050-1234567"
                      className="w-full px-5 py-3.5 sm:py-4 text-lg text-gray-900 bg-[#FFF9F4] rounded-2xl border-2 border-[#C56B3E]/20 focus:border-[#C56B3E] focus:bg-white focus:outline-none text-right transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="ws-email" className="block text-base sm:text-lg font-bold text-gray-900 mb-2">
                      כתובת מייל <span className="text-[#C56B3E]">*</span>
                    </label>
                    <input
                      id="ws-email"
                      type="email"
                      required
                      dir="ltr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-5 py-3.5 sm:py-4 text-lg text-gray-900 bg-[#FFF9F4] rounded-2xl border-2 border-[#C56B3E]/20 focus:border-[#C56B3E] focus:bg-white focus:outline-none text-right transition-all"
                    />
                  </div>
                </div>

                {/* 3. סימון חבילה מעניינת */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-base sm:text-lg font-bold text-gray-900">
                      איזו חבילה מעניינת אותך? <span className="text-[#C56B3E]">*</span>
                    </label>
                    <span className="text-xs sm:text-sm text-gray-500 font-medium">
                      (בחרי את המסלול המועדף)
                    </span>
                  </div>

                  <div className="space-y-3">
                    {WORKSHOP_PACKAGES.map((pkg) => {
                      const fullLabel = `${pkg.name} (${pkg.price})`;
                      const isSelected = selectedPkg.includes(pkg.name);
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => {
                            setSelectedPkg(fullLabel);
                            if (onSelectPackage) onSelectPackage(pkg.name);
                          }}
                          className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 sm:gap-4 ${
                            isSelected
                              ? `${pkg.activeBg} shadow-sm ring-1 ring-[#C56B3E]/40`
                              : 'border-slate-200 bg-white hover:border-[#C56B3E]/30 hover:bg-[#FFF9F4]/40'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-1 border-2 transition-all ${
                              isSelected
                                ? 'bg-[#C56B3E] border-[#C56B3E] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                              <span className="text-lg sm:text-xl font-black text-[#2D5043]">
                                {pkg.name}
                              </span>
                              <span className="text-base sm:text-lg font-black text-[#C56B3E]">
                                {pkg.price}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                              {pkg.note}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. מקום לרשום כמה מילים על עצמה */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="ws-about" className="text-base sm:text-lg font-bold text-gray-900">
                      כמה מילים על עצמך (אופציונלי)
                    </label>
                    <span className="text-xs sm:text-sm text-gray-400">אופציונלי</span>
                  </div>
                  <textarea
                    id="ws-about"
                    rows={3}
                    value={aboutSelf}
                    onChange={(e) => setAboutSelf(e.target.value)}
                    placeholder="ספרי לנו כמה מילים על עצמך, מה מביא אותך או שאלות שחשובות לך לקראת הסדנה..."
                    className="w-full px-5 py-3.5 text-base sm:text-lg text-gray-900 bg-[#FFF9F4] rounded-2xl border-2 border-[#C56B3E]/20 focus:border-[#C56B3E] focus:bg-white focus:outline-none transition-all resize-y"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 sm:py-5 px-8 rounded-2xl bg-gradient-to-r from-[#C56B3E] to-[#B85D19] hover:from-[#B85D19] hover:to-[#93542B] text-white font-black text-xl sm:text-2xl shadow-[0_12px_28px_rgba(197,107,62,0.35)] hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.99] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>שולחת פרטים...</span>
                    ) : (
                      <>
                        <span>שליחת פרטים ושריון מקומך</span>
                        <Send className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-500 text-xs sm:text-sm mt-3 font-normal">
                    הפרטים נשמרים בדיסקרטיות מלאה וישמשו ליצירת קשר אישי בלבד
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
