import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Sparkles, MessageCircle, AlertCircle, HeartHandshake, Check } from 'lucide-react';
import { saveInquiry } from '../utils/inquiryStorage';

export const AVAILABLE_PROGRAMS: Array<{
  id: string;
  label: string;
  sub: React.ReactNode;
  color: string;
  activeColor: string;
}> = [
  {
    id: 'midlife',
    label: 'אמצע החיים',
    sub: (
      <span>
        תוכנית לנשים{' '}
        <span dir="ltr" className="inline-block font-sans font-medium">
          45-60
        </span>{' '}
        על השינויים, השאלות והנושאים שמעסיקים אותנו באמצע החיים.
      </span>
    ),
    color: 'border-brand-orange text-brand-orange bg-brand-orange/5',
    activeColor: 'bg-brand-orange text-white border-brand-orange',
  },
  {
    id: 'ahead-of-you',
    label: 'עוד לפנייך',
    sub: 'תוכנית לנשים 60+ על גוף, יחסים, עצמאות, קשרים והחיים בשלב הזה.',
    color: 'border-brand-green text-brand-green bg-brand-green/5',
    activeColor: 'bg-brand-green text-white border-brand-green',
  },
  {
    id: 'up-to-180',
    label: 'עד 180°',
    sub: 'ארבעה מפגשים שמניעים שינוי מרצון וכיוון לצעד ראשון.',
    color: 'border-amber-700 text-amber-800 bg-amber-50',
    activeColor: 'bg-amber-700 text-white border-amber-700',
  },
  {
    id: 'alchemy',
    label: 'אלכימיה של יסודות',
    sub: 'יום בטבע שמשלב חוויה, תנועה, מפגש והתבוננות דרך ארבעת היסודות.',
    color: 'border-brand-terracotta text-brand-terracotta bg-brand-terracotta/5',
    activeColor: 'bg-brand-terracotta text-white border-brand-terracotta',
  },
  {
    id: 'the-tent',
    label: 'האוהל',
    sub: 'תוכנית לפיתוח יוזמה, מנהיגות והשפעה נשית.',
    color: 'border-emerald-700 text-emerald-800 bg-emerald-50',
    activeColor: 'bg-emerald-700 text-white border-emerald-700',
  },
  {
    id: 'highlights',
    label: 'Highlights',
    sub: 'תוכנית פיתוח אישית ומקצועית לנשים בארגונים.',
    color: 'border-teal-700 text-teal-800 bg-teal-50',
    activeColor: 'bg-teal-700 text-white border-teal-700',
  },
  {
    id: 'retreats',
    label: 'ימי שיא וריטריטים',
    sub: 'יציאה מהשגרה ליום של חברותא וכיף.',
    color: 'border-rose-700 text-rose-800 bg-rose-50',
    activeColor: 'bg-rose-700 text-white border-rose-700',
  },
  {
    id: 'consulting',
    label: 'פתוחה לשמוע',
    sub: 'אשמח להתייעץ ולמצוא יחד מה הכי מתאים לי.',
    color: 'border-stone-600 text-stone-700 bg-stone-50',
    activeColor: 'bg-stone-700 text-white border-stone-700',
  },
];

interface InterestFormProps {
  id?: string;
  source?: string;
  preselectedProgramId?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const InterestForm: React.FC<InterestFormProps> = ({
  id = 'interest-form',
  source = 'מרחבים לנשים',
  preselectedProgramId,
  title = 'טופס התעניינות',
  subtitle = 'השאירי פרטים ונשמח לחזור אלייך, להכיר ולבדוק יחד איזה מרחב הכי מתאים עבורך',
  className = '',
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>(() => {
    if (preselectedProgramId) {
      const match = AVAILABLE_PROGRAMS.find((p) => p.id === preselectedProgramId);
      return match ? [match.label] : [];
    }
    return [];
  });
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleProgram = (programLabel: string) => {
    setSelectedPrograms((prev) =>
      prev.includes(programLabel)
        ? prev.filter((item) => item !== programLabel)
        : [...prev, programLabel]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic validations
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
        programs: selectedPrograms.length > 0 ? selectedPrograms : ['לא צוינה תוכנית ספציפית'],
        notes: notes.trim(),
        source,
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
    setSelectedPrograms([]);
    setNotes('');
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  const whatsappMessage = encodeURIComponent(
    `היי דלית ואלסי, שמי ${fullName || 'מתעניינת'}, שלחתי עכשיו טופס התעניינות בתוכניות בין לבין ואשמח לשוחח!`
  );
  const quickWhatsappUrl = `https://api.whatsapp.com/send?phone=972522452206&text=${whatsappMessage}`;

  return (
    <section id={id} className={`w-full max-w-3xl mx-auto ${className}`}>
      <div className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 md:p-12 shadow-xl border-2 border-brand-beige relative overflow-hidden">
        {/* Subtle decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-brand-green via-brand-orange to-brand-terracotta" />

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-8 px-4"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-brand-green mb-4">
                איזה כיף, קיבלנו את הפרטים!
              </h3>

              <p className="text-xl sm:text-2xl text-gray-800 mb-6 font-medium leading-relaxed max-w-xl mx-auto">
                תודה <strong className="text-brand-orange font-bold">{fullName}</strong>, 
                קיבלנו את פנייתך באהבה ונחזור אלייך בהקדם לטלפון{' '}
                <span dir="ltr" className="font-bold text-gray-900">{phone}</span>
                {selectedPrograms.length > 0 && (
                  <span> לגבי {selectedPrograms.join(', ')}</span>
                )}
                .
              </p>

              <div className="bg-brand-cream/60 border border-brand-beige rounded-2xl p-6 max-w-lg mx-auto mb-8 text-right">
                <div className="flex items-center gap-2 text-brand-green font-bold text-lg mb-2">
                  <HeartHandshake className="w-5 h-5" />
                  <span>רוצה לדבר כבר עכשיו?</span>
                </div>
                <p className="text-gray-700 text-base mb-4 leading-normal">
                  אם את מעדיפה לחסוך זמן או לשאול שאלה ישירה, מוזמנת להמשיך ישירות לשיחה בוואטסאפ:
                </p>
                <a
                  href={quickWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>המשך שיחה מהירה בוואטסאפ</span>
                </a>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="text-gray-500 hover:text-brand-green font-semibold text-base underline underline-offset-4"
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
              <div className="text-center mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green text-sm sm:text-base font-bold mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>בואי נתחבר</span>
                </div>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-brand-green mb-3 tracking-tight">
                  {title}
                </h3>
                <p className="text-lg sm:text-xl text-gray-700 max-w-xl mx-auto leading-relaxed">
                  {subtitle}
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
                  <label htmlFor="inquiry-fullName" className="block text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    שם מלא <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    id="inquiry-fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="לדוגמה: מיכל לוי"
                    className="w-full px-5 py-3.5 sm:py-4 text-lg text-gray-900 bg-brand-cream/40 rounded-2xl border-2 border-brand-beige focus:border-brand-green focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* 2. נייד ומייל בשורה אחת במסכים רחבים */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label htmlFor="inquiry-phone" className="block text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      מספר נייד <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      required
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="050-1234567"
                      className="w-full px-5 py-3.5 sm:py-4 text-lg text-gray-900 bg-brand-cream/40 rounded-2xl border-2 border-brand-beige focus:border-brand-green focus:bg-white focus:outline-none text-right transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-email" className="block text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      כתובת מייל <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      required
                      dir="ltr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-5 py-3.5 sm:py-4 text-lg text-gray-900 bg-brand-cream/40 rounded-2xl border-2 border-brand-beige focus:border-brand-green focus:bg-white focus:outline-none text-right transition-all"
                    />
                  </div>
                </div>

                {/* 3. איזה מרחב מעניין אותך */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-lg sm:text-xl font-bold text-gray-900">
                      איזה מרחב מעניין אותך
                    </label>
                    <span className="text-sm sm:text-base text-gray-500 font-medium">
                      (אפשר לסמן יותר מאחד)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {AVAILABLE_PROGRAMS.map((program) => {
                      const isSelected = selectedPrograms.includes(program.label);
                      return (
                        <button
                          key={program.id}
                          type="button"
                          onClick={() => toggleProgram(program.label)}
                          className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl border-2 text-right transition-all ${
                            isSelected
                              ? 'border-brand-green bg-brand-green/10 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 border-2 transition-all ${
                              isSelected
                                ? 'bg-brand-green border-brand-green text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                          <div>
                            <div className={`font-black text-base sm:text-lg ${
                              isSelected ? 'text-brand-green' : 'text-gray-900'
                            }`}>
                              {program.label}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 font-normal leading-tight mt-0.5">
                              {program.sub}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. מקום אופציונלי לרשום כמה מילים */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="inquiry-notes" className="text-lg sm:text-xl font-bold text-gray-900">
                      כמה מילים שתרצי לשתף (אופציונלי)
                    </label>
                    <span className="text-xs sm:text-sm text-gray-400">אופציונלי</span>
                  </div>
                  <textarea
                    id="inquiry-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="אם יש שאלה, מחשבה, בקשה ספציפית או משהו שחשוב שנדע..."
                    className="w-full px-5 py-3.5 text-base sm:text-lg text-gray-900 bg-brand-cream/40 rounded-2xl border-2 border-brand-beige focus:border-brand-green focus:bg-white focus:outline-none transition-all resize-y"
                  />
                </div>

                {/* כפתור שליחה */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 sm:py-5 px-8 rounded-2xl bg-brand-green hover:bg-brand-green/90 text-white font-black text-xl sm:text-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span>שולחת פרטים...</span>
                    ) : (
                      <>
                        <span>שליחת פרטים ונחזור אלייך</span>
                        <Send className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-500 text-xs sm:text-sm mt-3 font-normal">
                    הפרטים שלך נשמרים אצלנו בדיסקרטיות מלאה וישמשו אך ורק ליצירת קשר על ידי צוות בין לבין
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
