import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { 
  Users, Phone, Mail, Calendar, MessageCircle, 
  Trash2, Search, Copy, Check, Sparkles,
  Layers, Lock, KeyRound, AlertCircle, ArrowRight,
  ShieldCheck, RefreshCw, LogOut, CheckCircle2, Share2, Smartphone, X
} from 'lucide-react';
import { ButterflyIcon } from '../components/Hero';
import { 
  InquirySubmission, 
  subscribeToInquiries, 
  deleteInquiry 
} from '../utils/inquiryStorage';
import { auth } from '../firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';

const REQUIRED_PIN = '9672';
const PIN_STORAGE_KEY = 'beinlevein_inquiries_auth_granted';

const checkInitialAuth = (): boolean => {
  try {
    if (
      sessionStorage.getItem(PIN_STORAGE_KEY) === 'true' ||
      localStorage.getItem(PIN_STORAGE_KEY) === 'true'
    ) {
      return true;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const hashQuery = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '';
    const hashParams = new URLSearchParams(hashQuery);
    const codeParam =
      urlParams.get('pin') ||
      urlParams.get('code') ||
      hashParams.get('pin') ||
      hashParams.get('code');

    if (codeParam === REQUIRED_PIN) {
      sessionStorage.setItem(PIN_STORAGE_KEY, 'true');
      localStorage.setItem(PIN_STORAGE_KEY, 'true');
      return true;
    }
  } catch (e) {
    console.error('URL params check failed:', e);
  }
  return false;
};

export const InquiriesResponsesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkInitialAuth);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pinDigits, setPinDigits] = useState(['', '', '', '']);
  const [pinError, setPinError] = useState(false);
  const [inquiries, setInquiries] = useState<InquirySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<InquirySubmission | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSigningInGoogle, setIsSigningInGoogle] = useState(false);
  const [copiedDirectLink, setCopiedDirectLink] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const getDirectLink = () => {
    // Shared public Cloud Run URL is universally accessible to Elsi and external users without dev login
    const publicBase = 'https://ais-pre-jttptouynfsjqnrg3kuoj3-29867443297.europe-west1.run.app';
    const origin = (typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('ais-dev-') && !window.location.origin.includes('localhost'))
      ? window.location.origin
      : publicBase;
    return `${origin}/responses?code=${REQUIRED_PIN}`;
  };

  const handleCopyDirectLink = () => {
    const url = getDirectLink();
    navigator.clipboard.writeText(url);
    setCopiedDirectLink(true);
    setTimeout(() => setCopiedDirectLink(false), 2500);
  };

  const handleShareElsiWhatsApp = () => {
    const url = getDirectLink();
    const text = encodeURIComponent(
      `היי אלסי 🌸\nזה הקישור הישיר שלנו לניהול פניות המתעניינות מהאתר (נפתח מיד בנייד ללא צורך בסיסמה):\n${url}\n\nמומלץ לשמור במסך הבית 📱`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Monitor searchParams changes reactively
  useEffect(() => {
    const codeParam = searchParams.get('code') || searchParams.get('pin');
    if (codeParam === REQUIRED_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem(PIN_STORAGE_KEY, 'true');
      localStorage.setItem(PIN_STORAGE_KEY, 'true');
    }
  }, [searchParams, location]);

  useEffect(() => {
    document.title = 'ניהול פניות מתעניינות | בין לבין';

    // Check Firebase authentication
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user?.email === 'daliat20@gmail.com' || user?.email?.endsWith('@beinlevein.co.il')) {
        setIsAuthenticated(true);
        sessionStorage.setItem(PIN_STORAGE_KEY, 'true');
        localStorage.setItem(PIN_STORAGE_KEY, 'true');
      }
    });

    const unsubscribeData = subscribeToInquiries((items) => {
      setInquiries(items);
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeData();
    };
  }, []);

  const handleDigitChange = (index: number, val: string) => {
    setPinError(false);
    const cleanVal = val.replace(/\D/g, '').slice(-1);
    const newDigits = [...pinDigits];
    newDigits[index] = cleanVal;
    setPinDigits(newDigits);

    if (cleanVal && index < 3) {
      const nextInput = document.getElementById(`inq-pin-${index + 1}`);
      nextInput?.focus();
    }

    if (index === 3 && cleanVal) {
      const completeCode = newDigits.slice(0, 3).join('') + cleanVal;
      if (completeCode === REQUIRED_PIN) {
        setIsAuthenticated(true);
        sessionStorage.setItem(PIN_STORAGE_KEY, 'true');
        localStorage.setItem(PIN_STORAGE_KEY, 'true');
      } else {
        setPinError(true);
        setTimeout(() => {
          setPinDigits(['', '', '', '']);
          document.getElementById('inq-pin-0')?.focus();
        }, 600);
      }
    }
  };

  const handleDirectPass = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem(PIN_STORAGE_KEY, 'true');
    localStorage.setItem(PIN_STORAGE_KEY, 'true');
  };

  const handleGoogleSignIn = async () => {
    setIsSigningInGoogle(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
      sessionStorage.setItem(PIN_STORAGE_KEY, 'true');
      localStorage.setItem(PIN_STORAGE_KEY, 'true');
    } catch (err) {
      console.error('Google Sign-in failed:', err);
    } finally {
      setIsSigningInGoogle(false);
    }
  };

  const handleLockOut = () => {
    sessionStorage.removeItem(PIN_STORAGE_KEY);
    localStorage.removeItem(PIN_STORAGE_KEY);
    setIsAuthenticated(false);
    setPinDigits(['', '', '', '']);
    setPinError(false);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteInquiry(id);
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const copyInquiryDetails = (inq: InquirySubmission) => {
    const text = `🌸 פניית התעניינות - בין לבין\nשם: ${inq.fullName}\nטלפון: ${inq.phone}\nאימייל: ${inq.email}\nתוכניות שמעניינות: ${(inq.programs || []).join(', ') || 'לא צוין'}\nכמה מילים: ${inq.notes || 'אין'}\nתאריך: ${new Date(inq.submittedAt).toLocaleDateString('he-IL')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(inq.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      inq.fullName.toLowerCase().includes(term) ||
      inq.phone.includes(term) ||
      inq.email.toLowerCase().includes(term) ||
      (inq.programs && inq.programs.some((p) => p.toLowerCase().includes(term))) ||
      (inq.notes && inq.notes.toLowerCase().includes(term))
    );
  });

  // LOCK SCREEN VIEW
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-cream/60 flex items-center justify-center p-4" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl max-w-md w-full border border-brand-beige text-center space-y-5"
        >
          <div className="w-14 h-14 bg-brand-orange/15 text-brand-orange rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-brand-green mb-1">פניות התעניינות - בין לבין</h1>
            <p className="text-xs text-gray-500">הזיני את קוד הגישה (9672) או לחצי לכניסה מהירה</p>
          </div>

          {/* Quick 1-click Unlock Button */}
          <button
            type="button"
            onClick={handleDirectPass}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-brand-green to-brand-lightGreen hover:opacity-95 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <KeyRound className="w-4 h-4 text-brand-orange" />
            <span>כניסה ישירה כמנהלת (קוד 9672)</span>
          </button>

          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-brand-beige w-full"></div>
            <span className="bg-white px-3 text-[11px] text-gray-400 font-bold uppercase">או הקלדת קוד</span>
          </div>

          <div className="flex justify-center gap-3 dir-ltr">
            {[0, 1, 2, 3].map((idx) => (
              <input
                key={idx}
                id={`inq-pin-${idx}`}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={pinDigits[idx]}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-2xl font-black rounded-xl border-2 transition-all outline-none ${
                  pinError 
                    ? 'border-red-500 bg-red-50 text-red-700' 
                    : pinDigits[idx] 
                    ? 'border-brand-orange bg-brand-orange/10 text-brand-green' 
                    : 'border-brand-beige bg-brand-cream/30 focus:border-brand-orange'
                }`}
              />
            ))}
          </div>

          {pinError && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-red-600 text-sm font-bold"
            >
              <AlertCircle className="w-4 h-4" />
              <span>קוד שגוי. נסי שוב או לחצי על כפתור הכניסה הישירה.</span>
            </motion.div>
          )}

          {/* Keypad for mobile */}
          <div className="grid grid-cols-3 gap-2 pt-1 max-w-xs mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  if (k === 'C') {
                    setPinDigits(['', '', '', '']);
                    document.getElementById('inq-pin-0')?.focus();
                  } else if (k === '⌫') {
                    const idxToClear = pinDigits.map(d => Boolean(d)).lastIndexOf(true);
                    if (idxToClear >= 0) {
                      const newDigits = [...pinDigits];
                      newDigits[idxToClear] = '';
                      setPinDigits(newDigits);
                      document.getElementById(`inq-pin-${idxToClear}`)?.focus();
                    }
                  } else {
                    const firstEmptyIdx = pinDigits.findIndex(d => !d);
                    if (firstEmptyIdx !== -1) {
                      handleDigitChange(firstEmptyIdx, k);
                    }
                  }
                }}
                className="py-2.5 rounded-xl bg-brand-cream/40 hover:bg-brand-beige border border-brand-beige font-black text-base text-brand-green transition-all active:scale-95 shadow-xs cursor-pointer"
              >
                {k}
              </button>
            ))}
          </div>

          {/* Google Sign-in */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSigningInGoogle}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
              <span>{isSigningInGoogle ? 'מתחבר...' : 'כניסה באמצעות Google (daliat20@gmail.com)'}</span>
            </button>
          </div>

          <div className="pt-3 border-t border-brand-beige flex items-center justify-center">
            <Link 
              to="/" 
              className="text-xs font-bold text-gray-500 hover:text-brand-orange transition-colors flex items-center gap-1"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>חזרה לדף הראשי של בין לבין</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // AUTHENTICATED INQUIRIES VIEW
  return (
    <div className="min-h-screen bg-brand-cream/60 font-sans selection:bg-brand-beige selection:text-brand-green relative overflow-hidden" dir="rtl">
      <ButterflyIcon size={250} className="absolute -top-10 -right-10 opacity-5 animate-drift -z-10" />
      <ButterflyIcon size={200} className="absolute bottom-10 -left-10 opacity-5 animate-float -z-10" />

      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-beige shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-full shadow-xs border border-brand-beige/50 bg-white">
              <img 
                src="/logos/brand-main.webp" 
                alt="בין לבין לוגו" 
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/logos/brand-main.png') {
                    target.src = '/logos/brand-main.png';
                  }
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-brand-green leading-tight">פניות התעניינות מהאתר</h1>
                <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-green-300">
                  🔒 מאובטח
                </span>
              </div>
              <p className="text-xs font-bold text-brand-orange">בין לבין | מרחבים לנשים</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowShareModal(true)}
              className="inline-flex items-center gap-1.5 bg-[#25D366]/15 hover:bg-[#25D366] text-brand-green hover:text-white border border-[#25D366]/40 px-3.5 py-2 rounded-full text-xs font-black transition-all cursor-pointer shadow-xs"
              title="שיתוף קישור ישיר לנייד של דלית ואלסי"
            >
              <Share2 className="w-3.5 h-3.5 text-brand-orange" />
              <span>קישור מהיר לנייד</span>
            </button>

            <button
              onClick={handleLockOut}
              className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-xs font-bold transition-all border border-gray-200 cursor-pointer"
              title="נעילת מסך"
            >
              <LogOut className="w-3.5 h-3.5 text-brand-orange" />
              <span className="hidden sm:inline">נעילת מסך</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-green hover:text-brand-orange bg-brand-cream px-3 sm:px-4 py-2 rounded-full border border-brand-beige transition-all"
            >
              <span>לאתר הראשי</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Top Summary Banner */}
        <div className="bg-white p-5 sm:p-7 rounded-3xl shadow-sm border border-brand-beige mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-green text-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
              <Users className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-brand-green">
                {inquiries.length} {inquiries.length === 1 ? 'פנייה התקבלה' : 'פניות התקבלו'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                נשים שהשאירו פרטים בטופס ההתעניינות בדף הראשי של בין לבין
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleShareElsiWhatsApp}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>שליחה לאלסי בוואטסאפ</span>
            </button>

            <button
              onClick={handleCopyDirectLink}
              className="inline-flex items-center gap-2 bg-brand-cream hover:bg-brand-beige text-brand-green border border-brand-beige px-4 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer"
            >
              {copiedDirectLink ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-brand-orange" />}
              <span>{copiedDirectLink ? 'הקישור הועתק!' : 'העתקת קישור ישיר'}</span>
            </button>

            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="חיפוש לפי שם, טלפון, תוכנית..."
                className="w-full pr-10 pl-4 py-2.5 rounded-full border border-brand-beige bg-brand-cream/30 text-sm focus:outline-none focus:border-brand-orange focus:bg-white transition-all text-right"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-brand-beige">
            <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold text-gray-600">טוען פניות...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-brand-beige p-8">
            <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-4 text-brand-orange">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-brand-green mb-1">
              {searchTerm ? 'לא נמצאו פניות תואמות לחיפוש' : 'עדיין אין פניות חדשות בטופס ההתעניינות'}
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
              כאשר מתעניינות ישאירו פרטים בטופס ההתעניינות באתר, הן יופיעו כאן מיד עם אפשרות לחיוג ושליחת וואטסאפ בלחיצה אחת.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-orange text-white px-5 py-2.5 rounded-full text-sm font-black transition-all"
            >
              <span>מעבר לאתר הראשי לבדיקת הטופס</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* List of Inquiries */}
            <div className="lg:col-span-7 space-y-3">
              {filteredInquiries.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id;
                const formattedDate = new Date(inq.submittedAt).toLocaleDateString('he-IL', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <motion.div
                    key={inq.id}
                    layout
                    onClick={() => setSelectedInquiry(inq)}
                    className={`bg-white p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-xs hover:shadow-md ${
                      isSelected
                        ? 'border-brand-orange ring-2 ring-brand-orange/20'
                        : 'border-brand-beige hover:border-brand-green/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h4 className="font-black text-base sm:text-lg text-brand-green">{inq.fullName}</h4>
                        <span className="text-[11px] text-gray-400 flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3" />
                          <span>{formattedDate}</span>
                        </span>
                      </div>

                      {/* Quick Contact Buttons */}
                      <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={`https://api.whatsapp.com/send?phone=972${inq.phone.replace(/\D/g, '').replace(/^0/, '')}&text=${encodeURIComponent(
                            `היי ${inq.fullName}, שמחנו מאוד שפנית והתעניינת בתוכניות של "בין לבין"! 🌸 איזה כיף, נשמח לתת לך את כל הפרטים.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                          title="שליחת וואטסאפ מהיר"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        <a
                          href={`tel:${inq.phone}`}
                          className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                          title="חיוג טלפוני"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 mb-3">
                      <span className="font-bold text-gray-800 font-mono">{inq.phone}</span>
                      {inq.email && <span className="text-gray-500 font-mono truncate max-w-[200px]">{inq.email}</span>}
                    </div>

                    {/* Programs Requested */}
                    {inq.programs && inq.programs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {inq.programs.map((p, i) => (
                          <span
                            key={i}
                            className="bg-brand-orange/10 text-brand-orange border border-brand-orange/20 text-[11px] font-black px-2.5 py-0.5 rounded-full"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    )}

                    {inq.notes && (
                      <p className="text-xs text-gray-500 mt-2 bg-brand-cream/30 p-2 rounded-lg line-clamp-2">
                        "{inq.notes}"
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Inquiry Details Panel */}
            <div className="lg:col-span-5">
              {selectedInquiry ? (
                <div className="bg-white p-6 rounded-3xl border border-brand-beige shadow-sm sticky top-28 space-y-6">
                  <div className="flex items-start justify-between gap-3 border-b border-brand-beige pb-4">
                    <div>
                      <span className="text-[11px] font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-0.5 rounded-full">
                        פרטי פנייה
                      </span>
                      <h3 className="text-xl font-black text-brand-green mt-1">{selectedInquiry.fullName}</h3>
                      <p className="text-xs text-gray-400 font-mono">
                        {new Date(selectedInquiry.submittedAt).toLocaleString('he-IL')}
                      </p>
                    </div>

                    <button
                      onClick={() => copyInquiryDetails(selectedInquiry)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-brand-green bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-all cursor-pointer"
                      title="העתקת כל הפרטים"
                    >
                      {copiedId === selectedInquiry.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-green-700 font-bold">הועתק!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>העתקה</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Actions Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`https://api.whatsapp.com/send?phone=972${selectedInquiry.phone.replace(/\D/g, '').replace(/^0/, '')}&text=${encodeURIComponent(
                        `היי ${selectedInquiry.fullName}, שמחנו מאוד שפנית והתעניינת בתוכניות של "בין לבין"! 🌸 איזה כיף, נשמח לתת לך את כל הפרטים.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-black text-sm transition-all shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>שליחת וואטסאפ</span>
                    </a>

                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-black text-sm transition-all shadow-xs"
                    >
                      <Phone className="w-4 h-4" />
                      <span>חיוג טלפוני</span>
                    </a>
                  </div>

                  {/* Info details */}
                  <div className="space-y-4 text-sm">
                    <div className="bg-brand-cream/30 p-3.5 rounded-2xl border border-brand-beige/60">
                      <span className="text-xs text-gray-500 block mb-0.5">מספר טלפון</span>
                      <a href={`tel:${selectedInquiry.phone}`} className="font-mono font-bold text-base text-brand-green">
                        {selectedInquiry.phone}
                      </a>
                    </div>

                    {selectedInquiry.email && (
                      <div className="bg-brand-cream/30 p-3.5 rounded-2xl border border-brand-beige/60">
                        <span className="text-xs text-gray-500 block mb-0.5">כתובת אימייל</span>
                        <a href={`mailto:${selectedInquiry.email}`} className="font-mono text-sm text-brand-green hover:underline">
                          {selectedInquiry.email}
                        </a>
                      </div>
                    )}

                    {selectedInquiry.programs && selectedInquiry.programs.length > 0 && (
                      <div className="bg-brand-cream/30 p-3.5 rounded-2xl border border-brand-beige/60">
                        <span className="text-xs text-gray-500 block mb-2 font-bold">תוכניות שמעניינות אותה:</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedInquiry.programs.map((p, i) => (
                            <span
                              key={i}
                              className="bg-brand-orange/15 text-brand-orange border border-brand-orange/30 text-xs font-black px-3 py-1 rounded-full"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedInquiry.notes && (
                      <div className="bg-brand-cream/30 p-3.5 rounded-2xl border border-brand-beige/60">
                        <span className="text-xs text-gray-500 block mb-1 font-bold">כמה מילים נוספות:</span>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedInquiry.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Delete button */}
                  <div className="pt-4 border-t border-brand-beige flex justify-end">
                    {deleteConfirmId === selectedInquiry.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-600 font-bold">בטוחה שברצונך למחוק?</span>
                        <button
                          onClick={() => handleDelete(selectedInquiry.id)}
                          disabled={deletingId === selectedInquiry.id}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                        >
                          כן, מחקי
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg"
                        >
                          ביטול
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(selectedInquiry.id)}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-bold cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>מחיקת פנייה זו</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-dashed border-brand-beige text-center text-gray-400 py-20">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-30 text-brand-green" />
                  <p className="font-bold text-sm text-gray-500">בחרי פנייה מהרשימה לצפייה בכל הפרטים ולפעולות מהירות</p>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Share / Mobile Shortcut Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" dir="rtl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white p-6 sm:p-8 rounded-[2.5rem] max-w-lg w-full text-right space-y-6 shadow-2xl border-2 border-brand-orange/40 relative"
            >
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-5 left-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 text-brand-orange flex items-center justify-center border border-brand-orange/20 shrink-0">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-brand-green">גישה מהירה מהנייד</h3>
                  <p className="text-xs sm:text-sm font-bold text-gray-500">קישור ישיר לדלית ולאלסי ללא צורך בהקלדת סיסמה</p>
                </div>
              </div>

              {/* Direct link box */}
              <div className="bg-brand-cream/50 p-4 rounded-2xl border border-brand-beige space-y-2">
                <span className="text-xs font-bold text-gray-500 block">הקישור הישיר שלך ושל אלסי:</span>
                <div className="bg-white p-3 rounded-xl border border-brand-beige font-mono text-xs text-gray-700 break-all select-all flex items-center justify-between gap-2">
                  <span>{getDirectLink()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5">
                <button
                  onClick={handleShareElsiWhatsApp}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>שליחת הקישור לאלסי בוואטסאפ</span>
                </button>

                <button
                  onClick={handleCopyDirectLink}
                  className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-orange text-white py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base transition-all shadow-md cursor-pointer"
                >
                  {copiedDirectLink ? <Check className="w-5 h-5 text-green-300" /> : <Copy className="w-5 h-5" />}
                  <span>{copiedDirectLink ? 'הקישור הישיר הועתק ללוח!' : 'העתקת הקישור הישיר'}</span>
                </button>
              </div>

              {/* Home screen tip */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                  <Sparkles className="w-4 h-4 text-brand-orange" />
                  <span>טיפ: שמירה כצלמית (אפליקציה) במסך הבית</span>
                </div>
                <p className="leading-relaxed">
                  פתחי את הקישור בדפדפן הנייד (Safari ב-iPhone או Chrome ב-Android), לחצי על כפתור השיתוף/תפריט ובחרי <strong>"הוסף למסך הבית" (Add to Home Screen)</strong>. כך המסך ייפתח בלחיצה אחת כמו אפליקציה!
                </p>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-xs font-bold text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  סגירה
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InquiriesResponsesPage;
