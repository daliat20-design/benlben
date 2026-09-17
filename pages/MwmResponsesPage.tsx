import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';
import { ButterflyIcon } from '../components/ButterflyIcon';
import { 
  subscribeToIntakeSubmissions, 
  deleteIntakeSubmission, 
  IntakeSubmission 
} from '../utils/mwmStorage';
import { 
  Users, Trash2, Phone, Calendar, Heart, HelpCircle, 
  Sparkles, ArrowRight, ShieldCheck, Download, Search, 
  MessageCircle, ExternalLink, RefreshCw, LogIn, LogOut, Check,
  Lock, KeyRound, Eye, EyeOff, AlertCircle, Share2, Copy, X
} from 'lucide-react';

const REQUIRED_PIN = '9672';
const PIN_STORAGE_KEY = 'mwm_team_pin_auth_granted';

export const MwmResponsesPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem(PIN_STORAGE_KEY) === 'true' ||
      localStorage.getItem(PIN_STORAGE_KEY) === 'true'
    );
  });
  const [pinDigits, setPinDigits] = useState(['', '', '', '']);
  const [pinError, setPinError] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [submissions, setSubmissions] = useState<IntakeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<IntakeSubmission | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  useEffect(() => {
    document.title = 'ניהול תשובות טופס נעים להכיר - כוכב יאיר | בין לבין';

    // Auto-login if accessed with PIN query parameter (e.g. ?code=9672 or ?pin=9672)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const hashQuery = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '';
      const hashParams = new URLSearchParams(hashQuery);
      const codeParam =
        urlParams.get('pin') ||
        urlParams.get('code') ||
        hashParams.get('pin') ||
        hashParams.get('code');

      if (codeParam === REQUIRED_PIN) {
        setIsAuthenticated(true);
        sessionStorage.setItem(PIN_STORAGE_KEY, 'true');
        localStorage.setItem(PIN_STORAGE_KEY, 'true');
      }
    } catch (e) {
      console.error('URL params check failed:', e);
    }
    
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user?.email === 'daliat20@gmail.com') {
        setIsAuthenticated(true);
        sessionStorage.setItem(PIN_STORAGE_KEY, 'true');
        localStorage.setItem(PIN_STORAGE_KEY, 'true');
      }
    });

    // Subscribe to storage
    const unsubscribeData = subscribeToIntakeSubmissions((items) => {
      setSubmissions(items);
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

    // Auto-focus next input
    if (cleanVal && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // If 4 digits entered, check PIN
    const completeCode = newDigits.join('');
    if (completeCode.length === 4) {
      if (completeCode === REQUIRED_PIN) {
        setIsAuthenticated(true);
        sessionStorage.setItem(PIN_STORAGE_KEY, 'true');
        localStorage.setItem(PIN_STORAGE_KEY, 'true');
      } else {
        setPinError(true);
        setTimeout(() => {
          setPinDigits(['', '', '', '']);
          inputRefs[0].current?.focus();
        }, 600);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleLockOut = () => {
    sessionStorage.removeItem(PIN_STORAGE_KEY);
    localStorage.removeItem(PIN_STORAGE_KEY);
    setIsAuthenticated(false);
    setPinDigits(['', '', '', '']);
    setPinError(false);
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteIntakeSubmission(id);
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Error deleting submission:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const copyToClipboard = (sub: IntakeSubmission) => {
    let text = `📋 טופס נעים להכיר - ${sub.fullName}\n`;
    text += `טלפון: ${sub.phone}\n`;
    text += `גיל: ${sub.ageRange}\n`;
    text += `\nמה משך/הניע להצטרף:\n${sub.motivation}\n`;
    if (sub.stopFeelingAlone) {
      text += `\nדבר שתרצה להפסיק להרגיש לגביו לבד / להבין שהוא טבעי:\n${sub.stopFeelingAlone}\n`;
    }
    if (sub.periodCharacteristics?.length) {
      text += `\nמאפייני התקופה: ${sub.periodCharacteristics.join(', ')}\n`;
    }
    if (sub.topicsOfInterest?.length) {
      text += `\nנושאים שמעסיקים:\n`;
      sub.topicsOfInterest.forEach(t => {
        text += `- ${t}`;
        if (sub.topicDetails?.[t]) {
          text += ` (שאלה/ציפייה: ${sub.topicDetails[t]})`;
        }
        text += `\n`;
      });
    }
    text += `\nציפיות מהתוכנית:\n${sub.expectations}\n`;
    if (sub.notes) {
      text += `\nדברים שחשוב לדעת:\n${sub.notes}\n`;
    }
    text += `\nמשאלה אישית:\n${sub.personalWish}\n`;

    navigator.clipboard.writeText(text);
    setCopiedId(sub.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getDirectTeamLink = () => {
    const publicBase = 'https://ais-pre-jttptouynfsjqnrg3kuoj3-29867443297.europe-west1.run.app';
    const origin = (typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('ais-dev-') && !window.location.origin.includes('localhost'))
      ? window.location.origin
      : publicBase;
    return `${origin}/responses?code=${REQUIRED_PIN}`;
  };

  const copyTeamLink = () => {
    const shareMessage = `🌸 הקישור הישיר לניהול פניות התעניינות ותשובות (בין לבין):\n${getDirectTeamLink()}\n\nקוד גישה: ${REQUIRED_PIN}`;
    navigator.clipboard.writeText(shareMessage);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 3000);
  };

  const shareToWhatsApp = () => {
    const shareMessage = encodeURIComponent(
      `🌸 הקישור הישיר לניהול פניות התעניינות ותשובות (בין לבין):\n${getDirectTeamLink()}\n\nקוד גישה: ${REQUIRED_PIN}`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareMessage}`, '_blank');
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const term = searchTerm.toLowerCase();
    return (
      (sub.fullName || '').toLowerCase().includes(term) ||
      (sub.phone || '').includes(term) ||
      (sub.motivation || '').toLowerCase().includes(term) ||
      (sub.stopFeelingAlone || '').toLowerCase().includes(term) ||
      (sub.expectations || '').toLowerCase().includes(term) ||
      (sub.personalWish || '').toLowerCase().includes(term)
    );
  });

  const exportCSV = () => {
    if (submissions.length === 0) return;
    
    const headers = ['שם מלא', 'טלפון', 'גיל', 'מה גרם להצטרף', 'להפסיק להרגיש לבד/טבעי', 'ציפיות מהתוכנית', 'משאלה אישית', 'הערות נוספות', 'תאריך מילוי'];
    const rows = submissions.map(s => [
      `"${s.fullName || ''}"`,
      `"${s.phone || ''}"`,
      `"${s.ageRange || ''}"`,
      `"${(s.motivation || '').replace(/"/g, '""')}"`,
      `"${(s.stopFeelingAlone || '').replace(/"/g, '""')}"`,
      `"${(s.expectations || '').replace(/"/g, '""')}"`,
      `"${(s.personalWish || '').replace(/"/g, '""')}"`,
      `"${(s.notes || '').replace(/"/g, '""')}"`,
      `"${s.submittedAt ? new Date(s.submittedAt).toLocaleDateString('he-IL') : ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bein-levein-intake-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PIN PROTECTION SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-cream/60 flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
        <ButterflyIcon size={300} className="absolute -top-12 -right-12 opacity-5 animate-drift -z-10" />
        <ButterflyIcon size={250} className="absolute -bottom-10 -left-10 opacity-5 animate-float -z-10" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border-2 border-brand-orange/40 max-w-md w-full text-center space-y-8 relative z-10"
        >
          {/* Logo & Lock Badge */}
          <div className="relative w-20 h-20 mx-auto">
            <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center shadow-inner border border-brand-green/20">
              <Lock className="w-10 h-10 text-brand-green" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-md">
              <KeyRound className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-black text-brand-green">
              כניסת צוות מאובטחת
            </h1>
            <p className="text-sm font-bold text-gray-500">
              לצפייה בתשובות המשתתפות, הקישי את קוד הגישה בן 4 הספרות:
            </p>
          </div>

          {/* 4 Digit PIN Inputs */}
          <div className="flex items-center justify-center gap-3 md:gap-4" dir="ltr">
            {pinDigits.map((digit, idx) => (
              <input
                key={idx}
                ref={inputRefs[idx]}
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                autoFocus={idx === 0}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`w-14 h-16 md:w-16 md:h-18 text-center text-3xl font-black rounded-2xl border-2 transition-all shadow-inner focus:outline-none ${
                  pinError 
                    ? 'border-red-500 bg-red-50 text-red-600 animate-shake' 
                    : digit 
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
              <span>קוד שגוי. נסי שוב.</span>
            </motion.div>
          )}

          {/* Keypad numbers for mobile tap convenience */}
          <div className="grid grid-cols-3 gap-2 pt-2 max-w-xs mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  if (k === 'C') {
                    setPinDigits(['', '', '', '']);
                    inputRefs[0].current?.focus();
                  } else if (k === '⌫') {
                    const idxToClear = pinDigits.map(d => Boolean(d)).lastIndexOf(true);
                    if (idxToClear >= 0) {
                      const newDigits = [...pinDigits];
                      newDigits[idxToClear] = '';
                      setPinDigits(newDigits);
                      inputRefs[idxToClear].current?.focus();
                    }
                  } else {
                    const firstEmptyIdx = pinDigits.findIndex(d => !d);
                    if (firstEmptyIdx !== -1) {
                      handleDigitChange(firstEmptyIdx, k);
                    }
                  }
                }}
                className="py-3 rounded-xl bg-brand-cream/40 hover:bg-brand-beige border border-brand-beige font-black text-lg text-brand-green transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                {k}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-brand-beige flex items-center justify-between">
            <Link 
              to="/mwm" 
              className="text-xs font-bold text-gray-500 hover:text-brand-orange transition-colors flex items-center gap-1"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>חזרה לדף התוכנית</span>
            </Link>

            <button
              onClick={handleLogin}
              className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-brand-orange" />
              <span>התחברות עם Google</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD VIEW
  return (
    <div className="min-h-screen bg-brand-cream/60 font-sans selection:bg-brand-beige selection:text-brand-green relative overflow-hidden" dir="rtl">
      {/* Decorative Butterflies */}
      <ButterflyIcon size={250} className="absolute -top-10 -right-10 opacity-5 animate-drift -z-10" />
      <ButterflyIcon size={200} className="absolute bottom-10 -left-10 opacity-5 animate-float -z-10" />

      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-beige shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-full shadow-sm border border-brand-beige/50 bg-white">
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
                <h1 className="text-xl font-black text-brand-green leading-tight">ניהול תשובות טפסי "נעים להכיר"</h1>
                <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-green-300">
                  🔒 מאובטח
                </span>
              </div>
              <p className="text-xs font-bold text-brand-orange">בין לבין - כוכב יאיר צור יגאל</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-brand-orange hover:bg-brand-green text-white px-4 py-2 rounded-full text-xs font-black transition-all shadow-sm cursor-pointer"
              title="שיתוף גישה למסך זה עם חברות הצוות"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>שיתוף גישה לצוות</span>
            </button>

            <button
              onClick={handleLockOut}
              className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3.5 py-2 rounded-full text-xs font-bold transition-all border border-gray-200 cursor-pointer"
              title="נעילת מסך ויציאה"
            >
              <Lock className="w-3.5 h-3.5 text-brand-orange" />
              <span>נעילת מסך</span>
            </button>

            <Link
              to="/mwm"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-green hover:text-brand-orange bg-brand-cream px-4 py-2 rounded-full border border-brand-beige transition-all hidden sm:inline-flex"
            >
              <span>לדף הנחיתה</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/mwm-form"
              className="inline-flex items-center gap-1.5 text-sm font-black bg-brand-green hover:bg-brand-orange text-white px-4 py-2 rounded-full transition-all shadow-sm"
            >
              <span>למילוי טופס</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Actions & Stats Banner */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-lg border border-brand-beige mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-green text-white rounded-2xl flex items-center justify-center shadow-md">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-brand-green">
                {submissions.length} {submissions.length === 1 ? 'משתתפת מילאה' : 'משתתפות מילאו'}
              </div>
              <p className="text-sm font-bold text-gray-500">
                טופס היכרות "נעים להכיר" - סדנת אמצע החיים (כוכב יאיר צור יגאל).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="חיפוש לפי שם / טלפון..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-full border border-brand-beige focus:border-brand-orange focus:outline-none text-sm text-gray-800 bg-brand-cream/30"
              />
            </div>

            {/* Share Team Link */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-2 bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white border border-brand-orange/30 px-4 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>שיתוף קישור לצוות</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={exportCSV}
              disabled={submissions.length === 0}
              className="inline-flex items-center gap-2 bg-brand-cream hover:bg-brand-beige/50 text-brand-green border border-brand-beige px-4 py-2.5 rounded-full text-sm font-bold transition-all disabled:opacity-40 cursor-pointer"
            >
              <Download className="w-4 h-4 text-brand-orange" />
              <span>ייצוא לאקסל (CSV)</span>
            </button>
          </div>
        </div>

        {/* Submissions List */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-brand-beige shadow-sm">
            <RefreshCw className="w-8 h-8 text-brand-orange animate-spin mx-auto mb-3" />
            <p className="text-lg font-bold text-brand-green">טוען תשובות...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-brand-beige shadow-sm space-y-4">
            <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto text-brand-orange">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-brand-green">עדיין אין תשובות להצגה</h3>
            <p className="text-base text-gray-600 max-w-md mx-auto">
              תוכלי למלא טופס לדוגמה כדי לבדוק איך הכל נראה, והתשובה שלך תופיע כאן מיד.
            </p>
            <Link
              to="/mwm-form"
              className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 rounded-full font-black hover:bg-brand-green transition-all shadow-md"
            >
              <span>מילוי טופס ניסיון</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Cards Column / Left list */}
            <div className="lg:col-span-1 space-y-4">
              {filteredSubmissions.map((sub) => {
                const isSelected = selectedSubmission?.id === sub.id;
                const cleanPhone = (sub.phone || '').replace(/\D/g, '');
                const formattedDate = sub.submittedAt 
                  ? new Date(sub.submittedAt).toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' })
                  : '';

                return (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedSubmission(sub)}
                    className={`p-5 rounded-3xl border-2 transition-all cursor-pointer text-right relative overflow-hidden ${
                      isSelected
                        ? 'bg-white border-brand-orange shadow-lg scale-[1.01]'
                        : 'bg-white/80 border-brand-beige hover:border-brand-beige/80 hover:bg-white shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h4 className="text-lg font-black text-brand-green">{sub.fullName}</h4>
                        <div className="flex items-center gap-2 text-xs font-bold text-brand-orange mt-0.5">
                          <span>גיל: {sub.ageRange}</span>
                          {formattedDate && <span>• {formattedDate}</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <a
                          href={`https://wa.me/972${cleanPhone.startsWith('0') ? cleanPhone.slice(1) : cleanPhone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-green-50 text-[#25D366] hover:bg-green-100 rounded-full transition-all border border-green-200 cursor-pointer"
                          title="שיחה בוואטסאפ"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmId(sub.id);
                          }}
                          className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-full transition-all border border-red-200 cursor-pointer"
                          title="מחיקת תשובה זו"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-brand-cream/50 p-3 rounded-2xl border border-brand-beige/50 text-xs text-gray-700 line-clamp-2">
                      <span className="font-bold text-brand-green">מוטיבציה: </span>
                      {sub.motivation}
                    </div>

                    {sub.stopFeelingAlone && (
                      <div className="mt-2 text-xs text-gray-600 bg-brand-green/5 p-2 rounded-xl border border-brand-green/20 line-clamp-2">
                        <span className="font-bold text-brand-green">להפסיק להרגיש לבד: </span>
                        {sub.stopFeelingAlone}
                      </div>
                    )}

                    {sub.personalWish && (
                      <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-full">
                        <Sparkles className="w-3 h-3" />
                        <span>משאלה: {sub.personalWish}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Detailed View Column */}
            <div className="lg:col-span-2">
              {selectedSubmission ? (
                <div className="bg-white p-6 md:p-10 rounded-[3rem] shadow-xl border-2 border-brand-orange/40 text-right space-y-8 sticky top-24">
                  
                  {/* Detailed Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-beige pb-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl md:text-4xl font-black text-brand-green">
                          {selectedSubmission.fullName}
                        </h2>
                        <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-xs font-black">
                          גיל: {selectedSubmission.ageRange}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-4 h-4 text-brand-orange" />
                          <span dir="ltr">{selectedSubmission.phone}</span>
                        </span>
                        {selectedSubmission.submittedAt && (
                          <span className="flex items-center gap-1.5 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(selectedSubmission.submittedAt).toLocaleString('he-IL')}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(selectedSubmission)}
                        className="inline-flex items-center gap-1.5 bg-brand-cream hover:bg-brand-beige/50 text-brand-green border border-brand-beige px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer"
                      >
                        {copiedId === selectedSubmission.id ? <Check className="w-4 h-4 text-green-600" /> : <Sparkles className="w-4 h-4 text-brand-orange" />}
                        <span>{copiedId === selectedSubmission.id ? 'הועתק!' : 'העתקת סיכום'}</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(selectedSubmission.id)}
                        className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>מחיקת תשובה</span>
                      </button>
                    </div>
                  </div>

                  {/* Section 1: Motivation */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-brand-green">
                      מה גרם לך לבחור להצטרף ל"בין לבין"?
                    </h3>
                    <div className="bg-brand-cream/40 p-5 rounded-2xl border border-brand-beige text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                      {selectedSubmission.motivation}
                    </div>
                  </div>

                  {/* Section 2: Stop feeling alone / natural */}
                  {selectedSubmission.stopFeelingAlone && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-brand-orange fill-current" />
                        <h3 className="text-lg font-black text-brand-green">
                          מה הדבר שהיית רוצה להפסיק להרגיש לגביו לבד או להבין שהוא די טבעי?
                        </h3>
                      </div>
                      <div className="bg-brand-green/5 p-5 rounded-2xl border-2 border-brand-green/30 text-gray-800 text-base leading-relaxed whitespace-pre-wrap font-medium">
                        {selectedSubmission.stopFeelingAlone}
                      </div>
                    </div>
                  )}

                  {/* Section 3: Period Characteristics */}
                  {selectedSubmission.periodCharacteristics && selectedSubmission.periodCharacteristics.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-black text-brand-green">
                        מה הכי מאפיין את התקופה עבורך?
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubmission.periodCharacteristics.map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-brand-green/10 text-brand-green font-bold text-sm px-4 py-2 rounded-xl border border-brand-green/20"
                          >
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section 4: Topics of Interest & Dynamic Questions */}
                  {selectedSubmission.topicsOfInterest && selectedSubmission.topicsOfInterest.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-black text-brand-green">
                        נושאים שמעסיקים במיוחד ושאלות/ציפיות ספציפיות:
                      </h3>
                      <div className="space-y-3">
                        {selectedSubmission.topicsOfInterest.map((topic, idx) => {
                          const detail = selectedSubmission.topicDetails?.[topic];
                          return (
                            <div key={idx} className="bg-brand-cream/30 p-4 rounded-2xl border border-brand-beige space-y-2">
                              <div className="font-black text-brand-orange text-base">
                                ✦ {topic}
                              </div>
                              {detail ? (
                                <div className="bg-white p-3 rounded-xl border border-brand-orange/20 text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                                  <HelpCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                                  <span>{detail}</span>
                                </div>
                              ) : (
                                <div className="text-xs text-gray-400 italic">לא נוספה שאלה/ציפייה ספציפית</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Section 5: Expectations */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-brand-green">
                      מה היית שמחה לקבל מהתוכנית?
                    </h3>
                    <div className="bg-brand-cream/40 p-5 rounded-2xl border border-brand-beige text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                      {selectedSubmission.expectations}
                    </div>
                  </div>

                  {/* Section 6: Notes */}
                  {selectedSubmission.notes && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-black text-brand-green">
                        דברים שחשוב לדעת:
                      </h3>
                      <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                        {selectedSubmission.notes}
                      </div>
                    </div>
                  )}

                  {/* Section 7: Special Wish (Gift Note!) */}
                  <div className="bg-gradient-to-r from-brand-orange/15 to-amber-100 p-6 rounded-3xl border-2 border-brand-orange/50 space-y-2">
                    <div className="flex items-center gap-2 text-brand-orange font-black text-sm">
                      <Sparkles className="w-4 h-4 fill-current" />
                      <span>רעיון לפתק אישי בקבלת הפנים:</span>
                    </div>
                    <div className="text-xl md:text-2xl font-black text-brand-green">
                      "{selectedSubmission.fullName}, כתבת שהיית רוצה קצת יותר <span className="text-brand-orange underline underline-offset-4">{selectedSubmission.personalWish}</span>. שמרנו לך אותה כאן."
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white p-12 rounded-[3rem] border border-brand-beige text-center space-y-3">
                  <p className="text-lg font-bold text-gray-500">בחרי משתתפת מהרשימה מימין כדי לראות את מלוא התשובות והפירוט.</p>
                </div>
              )}
            </div>

          </div>
        )}
      </main>

      {/* Share Team Access Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white p-8 md:p-10 rounded-[2.5rem] max-w-lg w-full text-right space-y-6 shadow-2xl border-2 border-brand-orange/40 relative"
            >
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center border border-brand-orange/20">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-brand-green">שיתוף תוצאות עם הצוות</h3>
                  <p className="text-xs md:text-sm font-bold text-gray-500">אין צורך בגוגל פורמס – הכל מנוהל ומעודכן כאן בשידור חי!</p>
                </div>
              </div>

              <div className="bg-brand-cream/60 p-5 rounded-2xl border border-brand-beige space-y-3 text-sm text-gray-700">
                <div className="font-bold text-brand-green text-base">
                  איך חברות הצוות צופות בתוצאות?
                </div>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>
                    שולחים להן את הקישור הישיר (פתיחה מכל סמארטפון או מחשב).
                  </li>
                  <li>
                    קוד הגישה לצוות הוא: <span className="font-black text-brand-orange text-base px-2 py-0.5 bg-white rounded-lg border border-brand-beige">9672</span>
                  </li>
                  <li>
                    הקישור המהיר למטה כבר פותח להן את המסך ישירות!
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={shareToWhatsApp}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-6 rounded-2xl font-black text-base transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>שליחת קישור גישה לצוות בוואטסאפ</span>
                </button>

                <button
                  onClick={copyTeamLink}
                  className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-orange text-white py-3.5 px-6 rounded-2xl font-black text-base transition-all shadow-md cursor-pointer"
                >
                  {copiedShareLink ? <Check className="w-5 h-5 text-green-300" /> : <Copy className="w-5 h-5" />}
                  <span>{copiedShareLink ? 'הקישור הועתק ללוח!' : 'העתקת הודעת גישה וקישור'}</span>
                </button>

                <button
                  onClick={exportCSV}
                  className="w-full flex items-center justify-center gap-2 bg-brand-cream hover:bg-brand-beige text-brand-green py-3 px-6 rounded-2xl font-bold text-sm border border-brand-beige transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-brand-orange" />
                  <span>הורדת קובץ אקסל (CSV) למחשב לשיתוף ידני</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="text-xs font-bold text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  סגירה
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-8 rounded-3xl max-w-md w-full text-center space-y-6 shadow-2xl border-2 border-red-200"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                <Trash2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900">מחיקת תשובה</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  האם את בטוחה שברצונך למחוק את התשובה הזו? (מעולה למחיקת תשובות ניסיון ובדיקה).
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  disabled={deletingId === deleteConfirmId}
                  className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded-full transition-all flex-1 shadow-md cursor-pointer"
                >
                  {deletingId === deleteConfirmId ? 'מוחק...' : 'כן, מחקי עכשיו'}
                </button>
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-full transition-all flex-1 cursor-pointer"
                >
                  ביטול
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MwmResponsesPage;
