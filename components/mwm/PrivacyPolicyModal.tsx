import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, Lock, Heart, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" dir="rtl">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl border-2 border-brand-orange/40 p-6 md:p-10 space-y-6 text-right z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-brand-beige pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center border border-brand-green/20 shrink-0">
                  <ShieldCheck className="w-7 h-7 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-brand-green">
                    תקנון פרטיות ושמירת סודיות
                  </h3>
                  <p className="text-xs md:text-sm font-bold text-brand-orange">
                    "בין לבין" - תוכנית לנשים באמצע החיים | כוכב יאיר - צור יגאל
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label="סגור"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Intro Callout */}
            <div className="bg-brand-cream/80 p-5 rounded-2xl border border-brand-beige flex items-start gap-3.5">
              <Lock className="w-5 h-5 text-brand-green shrink-0 mt-1" />
              <div className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                אנו מייחסות חשיבות עליונה לשמירה על פרטיותך, ביטחונך ותחושת הנוחות שלך. המרחב של "בין לבין" מבוסס על אמון, כבוד הדדי ודיסקרטיות מוחלטת.
              </div>
            </div>

            {/* Terms List */}
            <div className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
              
              <div className="space-y-1.5">
                <h4 className="font-black text-brand-green text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                  1. מטרת איסוף המידע
                </h4>
                <p className="pr-6 text-gray-600 text-sm">
                  הפרטים הנמסרים על ידך בטופס "נעים להכיר" (לרבות שם, טלפון, גיל, תחושות ותחומי עניין) נועדו אך ורק כדי לאפשר לצוות התוכנית להכיר אותך, לדייק את תכני המפגשים עבור הקבוצה וליצור עמך קשר לקראת פתיחת התוכנית.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-black text-brand-green text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                  2. סודיות מוחלטת ואי-העברה לצד שלישי
                </h4>
                <p className="pr-6 text-gray-600 text-sm">
                  המידע האישי שלך נשמר בסודיות מלאה. אנו מתחייבות שלא להעביר, למכור, להשכיר או לחלוק את פרטייך האישיים או תשובותייך עם שום גורם חיצוני או צד שלישי שאינו מוסמך מצוות התוכנית.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-black text-brand-green text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                  3. אבטחת המידע
                </h4>
                <p className="pr-6 text-gray-600 text-sm">
                  הנתונים מנוהלים ומאובטחים באמצעי הצפנה והגנה קפדניים (כולל הגנת קוד גישה לצוות המורשה בלבד), על מנת למנוע גישה בלתי מורשית.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-black text-brand-green text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                  4. סודיות הדדית במפגשי הקבוצה
                </h4>
                <p className="pr-6 text-gray-600 text-sm">
                  מרחב הסדנאות והמפגשים מבוסס על כלל יסוד: "מה שנאמר במעגל נשאר במעגל". כל משתתפת מתחייבת לכבד את פרטיותן של חברותיה לקבוצה ולא לשתף תכנים אישיים מחוץ למפגש.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-black text-brand-green text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                  5. זכויותייך לגבי המידע
                </h4>
                <p className="pr-6 text-gray-600 text-sm">
                  בכל עת עומדת לך הזכות לפנות למובילות התוכנית בבקשה לעיין בפרטים שנשמרו, לעדכן אותם או לבקש את מחיקתם המלאה ממאגר הרישום.
                </p>
              </div>

            </div>

            {/* Signatories & Footer */}
            <div className="pt-5 border-t border-brand-beige space-y-4">
              <div className="bg-brand-cream/60 p-4 rounded-2xl border border-brand-beige text-xs sm:text-sm text-gray-700 font-bold space-y-1.5">
                <div className="flex items-center gap-2 text-brand-orange">
                  <Heart className="w-4 h-4 fill-current shrink-0" />
                  <span className="font-black">החותמות על תקנון הפרטיות:</span>
                </div>
                <div className="pr-6 space-y-1 text-gray-800">
                  <div>✦ <strong>תניה וענבל</strong> – מובילות MWM כיצ"י</div>
                  <div>✦ <strong>דלית כורה ואלסי זיסלמן</strong> – מנהלות "בין לבין"</div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto bg-brand-green hover:bg-brand-orange text-white px-8 py-2.5 rounded-full font-black text-sm transition-all shadow-md cursor-pointer text-center"
                >
                  סגירה
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyPolicyModal;
