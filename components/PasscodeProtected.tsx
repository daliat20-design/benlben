import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowRight, ShieldAlert, Eye, EyeOff, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { ButterflyIcon } from './Hero';

const REQUIRED_CODE = '9672';
const STORAGE_KEY = 'mwm_pilot_auth_9672';

export const PasscodeProtected: React.FC<{
  children: React.ReactNode;
  pageTitle?: string;
}> = ({
  children,
  pageTitle = 'סדנת הפיילוט (אמהות עם מהות)'
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;

    // Check URL parameters for direct passcode access (?code=9672 or ?pin=9672 or ?passcode=9672)
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const hashQuery = window.location.hash.includes('?')
        ? window.location.hash.substring(window.location.hash.indexOf('?'))
        : '';
      const hashParams = hashQuery ? new URLSearchParams(hashQuery) : null;

      const codeFromUrl =
        searchParams.get('code') ||
        searchParams.get('pin') ||
        searchParams.get('passcode') ||
        hashParams?.get('code') ||
        hashParams?.get('pin') ||
        hashParams?.get('passcode');

      if (codeFromUrl === REQUIRED_CODE) {
        sessionStorage.setItem(STORAGE_KEY, REQUIRED_CODE);
        localStorage.setItem(STORAGE_KEY, REQUIRED_CODE);
        return true;
      }
    } catch (e) {
      // ignore
    }

    // Check stored session/local authentication
    try {
      if (
        sessionStorage.getItem(STORAGE_KEY) === REQUIRED_CODE ||
        localStorage.getItem(STORAGE_KEY) === REQUIRED_CODE
      ) {
        return true;
      }
    } catch (e) {
      // ignore
    }

    return false;
  });

  const [enteredCode, setEnteredCode] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasscodeForm, setShowPasscodeForm] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const originalTitle = document.title;
      return () => {
        document.title = originalTitle;
      };
    }
  }, [isAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredCode.trim() === REQUIRED_CODE) {
      setError(false);
      try {
        sessionStorage.setItem(STORAGE_KEY, REQUIRED_CODE);
        localStorage.setItem(STORAGE_KEY, REQUIRED_CODE);
      } catch (e) {
        // ignore
      }
      setIsAuthenticated(true);
    } else {
      setError(true);
    }
  };

  const handleLockAgain = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    setEnteredCode('');
    setIsAuthenticated(false);
  };

  // If successfully verified with code 9672, show the actual landing page content
  if (isAuthenticated) {
    return (
      <div className="relative">
        {/* Admin top notification bar */}
        <div
          className="bg-amber-100 border-b-2 border-amber-300 text-amber-950 px-4 py-2.5 text-xs md:text-sm font-black flex flex-wrap items-center justify-between gap-3 z-50 sticky top-0 backdrop-blur-md shadow-sm"
          dir="rtl"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse"></span>
            <span>את צופה בדף סדנת הפיילוט שהסתיימה (מורשית כניסה - קוד 9672)</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="bg-brand-green hover:bg-brand-orange text-white px-3 py-1 rounded-full font-black text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>מעבר לאתר הראשי העדכני</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </Link>
            <button
              onClick={handleLockAgain}
              className="px-2.5 py-1 bg-white hover:bg-amber-50 text-amber-900 border border-amber-400 rounded-full text-xs font-bold transition-colors cursor-pointer"
            >
              נעילה מחדש
            </button>
          </div>
        </div>
        {children}
      </div>
    );
  }

  // Passcode gate view - completely blocks the page and prices,
  // informs visitor that the program has ended, and directs to the updated brand programs page.
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#faf9f6] via-[#f1f2e9]/80 to-[#faf9f6] flex items-center justify-center p-4 sm:p-6 font-sans text-right relative overflow-hidden"
      dir="rtl"
    >
      {/* Decorative Butterflies */}
      <ButterflyIcon
        size={360}
        className="absolute -top-16 -right-16 opacity-5 pointer-events-none hidden md:block"
      />
      <ButterflyIcon
        size={280}
        className="absolute -bottom-16 -left-16 opacity-5 pointer-events-none hidden md:block"
      />

      <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-2xl border-2 border-brand-beige p-7 sm:p-12 relative z-10 text-center">
        {/* Brand Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="inline-block group">
            <div className="w-24 h-24 rounded-full bg-brand-cream border-2 border-brand-beige flex items-center justify-center p-2.5 shadow-md group-hover:scale-105 transition-transform duration-300">
              <img
                src="/logos/brand-main.webp"
                alt="בין לבין | מרחבים לנשים"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  e.currentTarget.src = '/logos/brand-main.png';
                }}
              />
            </div>
          </Link>
        </div>

        {/* Notice Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-black mb-5 bg-amber-50 text-amber-900 border border-amber-200 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          <span>עדכון לגבי התוכנית</span>
        </div>

        {/* Main Headline requested by user */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-green tracking-tight leading-tight mb-4">
          התוכנית הספציפית הזו כבר הסתיימה
        </h1>

        {/* Subtitle requested by user */}
        <p className="text-xl sm:text-2xl font-black text-brand-orange mb-4 leading-snug">
          אך נשמח להציג בפנייך את התוכניות והמרחבים החדשים שלנו!
        </p>

        <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed mb-8 max-w-lg mx-auto">
          מרחבי התוכן, הסדנאות והמסעות של <strong className="font-black text-brand-green">בין לבין</strong> ממשיכים להתחדש עם מגוון תוכניות לנשים באמצע החיים, תוכנית עוד לפנייך (60+), עד 180°, <span dir="rtl" style={{ unicodeBidi: 'isolate' }}><span dir="ltr">FLOWTRIPS</span> וריטריטים</span> ועוד.
        </p>

        {/* Primary Call to Action Button - Directs to updated master brand page */}
        <div className="mb-8">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-orange to-amber-600 hover:from-brand-green hover:to-[#43523e] text-white font-black text-lg sm:text-xl py-4.5 px-8 rounded-full transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-98"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>לצפייה בתוכניות ובמרחבים החדשים</span>
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Link>
        </div>

        {/* Discreet Admin Lock Access for Dalith (Passcode 9672) */}
        <div className="pt-6 border-t border-brand-beige/80">
          {!showPasscodeForm ? (
            <button
              onClick={() => setShowPasscodeForm(true)}
              className="text-xs sm:text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors inline-flex items-center gap-2 cursor-pointer bg-brand-cream/60 px-4 py-2 rounded-full border border-brand-beige"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>כניסת מנהלת / צפייה בדף הפיילוט שהסתיים</span>
            </button>
          ) : (
            <div className="bg-brand-cream/50 p-5 rounded-2xl border border-brand-beige space-y-3 text-right">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-brand-orange flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>הזנת קוד גישה לצפייה בדף הפיילוט:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowPasscodeForm(false)}
                  className="text-[11px] text-gray-500 hover:text-gray-800 underline cursor-pointer"
                >
                  סגירה
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoFocus
                    value={enteredCode}
                    onChange={(e) => {
                      setEnteredCode(e.target.value);
                      if (error) setError(false);
                    }}
                    placeholder="הזיני קוד גישה (4 ספרות)"
                    className={`w-full px-4 py-3 rounded-xl border-2 text-center text-lg font-black tracking-widest outline-none transition-all ${
                      error
                        ? 'border-red-400 bg-red-50 text-red-900 focus:ring-2 focus:ring-red-200'
                        : 'border-brand-beige focus:border-brand-orange bg-white text-gray-900'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    aria-label={showPassword ? 'הסתר קוד' : 'הצג קוד'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {error && (
                  <div className="flex items-center justify-center gap-1.5 text-red-600 text-xs font-bold bg-red-50 py-1.5 px-3 rounded-lg border border-red-200">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>קוד גישה שגוי, אנא נסי שוב.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-brand-green hover:bg-brand-orange text-white font-black text-base py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  כניסה לדף
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasscodeProtected;
