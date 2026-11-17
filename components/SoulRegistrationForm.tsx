import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Send,
  ShieldCheck,
  Sparkles,
  CreditCard,
  ExternalLink,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { saveSoulRegistration } from '../utils/soulRegistrationStorage';

const MARITAL_STATUS_OPTIONS = [
  'נשואה',
  'בזוגיות',
  'רווקה',
  'גרושה',
  'אלמנה',
  'אחר',
  'מעדיפה לא לציין',
];

const CHILDREN_AGE_OPTIONS = [
  '0 עד 6',
  '7 עד 12',
  '13 עד 18',
  '19 עד 25',
  '26 ומעלה',
  'אין לי ילדים',
];

const JOIN_REASON_OPTIONS = [
  'הזדמנות לעצור רגע ולהקדיש זמן לעצמי',
  'לקבל ידע וכלים להתמודדות עם השינויים באמצע החיים',
  'לפגוש נשים שנמצאות בשלב חיים דומה',
  'לחוות משהו חדש, מהנה וקצת אחר מהשגרה',
  'להכיר את עצמי קצת יותר טוב',
  'אחר',
];

const CURIOUS_TOPIC_OPTIONS = [
  'קבלה עצמית והתמודדות עם שינויים',
  'נשימה, שחרור ואיזון',
  'זוגיות, אינטימיות וקרבה',
  'יחסים במשפחה והמקום שלי בתוכה',
  'אמון בעצמי ובבחירות שלי',
];

const HEARD_FROM_OPTIONS = [
  'דרך הסטודיו',
  'דרך חברה',
  'דרך קבוצת ווטסאפ',
  'פייסבוק או אינסטגרם',
  'אחר',
];

interface SoulRegistrationFormProps {
  whatsappUrl: string;
  payboxUrl: string;
  onOpenTerms: () => void;
}

export const SoulRegistrationForm: React.FC<SoulRegistrationFormProps> = ({
  whatsappUrl,
  payboxUrl,
  onOpenTerms,
}) => {
  // 1-4 Personal details
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  // 5 Marital status
  const [maritalStatus, setMaritalStatus] = useState('');

  // 6 Children ages (multi, "אין לי ילדים" clears others)
  const [childrenAges, setChildrenAges] = useState<string[]>([]);

  // 7 Trains at studio
  const [trainsAtStudio, setTrainsAtStudio] = useState<'כן' | 'לא' | ''>('');

  // 8 Join reasons (multi + other text)
  const [joinReasons, setJoinReasons] = useState<string[]>([]);
  const [joinReasonsOther, setJoinReasonsOther] = useState('');

  // 9 Curious topics (up to 2)
  const [curiousTopics, setCuriousTopics] = useState<string[]>([]);
  const [topicLimitNote, setTopicLimitNote] = useState(false);

  // 10 Open text
  const [personalGift, setPersonalGift] = useState('');

  // 11 Heard from (single + other text)
  const [heardFrom, setHeardFrom] = useState('');
  const [heardFromOther, setHeardFromOther] = useState('');

  // 12 Allergies (mandatory)
  const [allergiesChoice, setAllergiesChoice] = useState<'none' | 'yes' | ''>('');
  const [allergiesDetails, setAllergiesDetails] = useState('');

  // 13 Terms checkbox
  const [termsAccepted, setTermsAccepted] = useState(false);

  // 14 Photo consent (unselected by default, required)
  const [photoConsentChoice, setPhotoConsentChoice] = useState<'yes' | 'no' | ''>('');

  // 15 Stay in touch (unselected by default, required)
  const [stayInTouchChoice, setStayInTouchChoice] = useState<'yes' | 'no' | ''>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [missingFields, setMissingFields] = useState<Record<string, boolean>>({});

  const clearMissing = (key: string) => {
    if (missingFields[key]) {
      setMissingFields((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleToggleChildrenAge = (opt: string) => {
    clearMissing('childrenAges');
    if (opt === 'אין לי ילדים') {
      setChildrenAges((prev) =>
        prev.includes('אין לי ילדים') ? [] : ['אין לי ילדים']
      );
      return;
    }
    setChildrenAges((prev) => {
      const withoutNone = prev.filter((item) => item !== 'אין לי ילדים');
      if (withoutNone.includes(opt)) {
        return withoutNone.filter((item) => item !== opt);
      }
      return [...withoutNone, opt];
    });
  };

  const handleToggleJoinReason = (opt: string) => {
    clearMissing('joinReasons');
    setJoinReasons((prev) =>
      prev.includes(opt) ? prev.filter((item) => item !== opt) : [...prev, opt]
    );
  };

  const handleToggleCuriousTopic = (opt: string) => {
    clearMissing('curiousTopics');
    setCuriousTopics((prev) => {
      if (prev.includes(opt)) {
        setTopicLimitNote(false);
        return prev.filter((item) => item !== opt);
      }
      if (prev.length >= 2) {
        setTopicLimitNote(true);
        return prev;
      }
      setTopicLimitNote(false);
      return [...prev, opt];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const missing: Record<string, boolean> = {};
    let firstErrorElId: string | null = null;
    const markMissing = (key: string, elId: string) => {
      missing[key] = true;
      if (!firstErrorElId) firstErrorElId = elId;
    };

    if (!fullName.trim()) markMissing('fullName', 'soul-q1');
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) markMissing('phone', 'soul-q2');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      markMissing('email', 'soul-q3');
    }
    const parsedAge = Number(age);
    if (!age.trim() || Number.isNaN(parsedAge) || parsedAge < 18 || parsedAge > 120) {
      markMissing('age', 'soul-q4');
    }
    if (!maritalStatus) markMissing('maritalStatus', 'soul-q5');
    if (childrenAges.length === 0) markMissing('childrenAges', 'soul-q6');
    if (!trainsAtStudio) markMissing('trainsAtStudio', 'soul-q7');
    if (
      joinReasons.length === 0 ||
      (joinReasons.includes('אחר') && !joinReasonsOther.trim())
    ) {
      markMissing('joinReasons', 'soul-q8');
    }
    if (curiousTopics.length === 0 || curiousTopics.length > 2) {
      markMissing('curiousTopics', 'soul-q9');
    }
    if (!personalGift.trim()) markMissing('personalGift', 'soul-q10');
    if (!heardFrom || (heardFrom === 'אחר' && !heardFromOther.trim())) {
      markMissing('heardFrom', 'soul-q11');
    }
    if (!allergiesChoice || (allergiesChoice === 'yes' && !allergiesDetails.trim())) {
      markMissing('allergies', 'soul-q12');
    }
    if (!termsAccepted) markMissing('termsAccepted', 'soul-q13');
    if (!photoConsentChoice) markMissing('photoConsent', 'soul-q14');
    if (!stayInTouchChoice) markMissing('stayInTouch', 'soul-q15');

    if (Object.keys(missing).length > 0) {
      setMissingFields(missing);
      setFormError('כל השאלות בשאלון הן שדות חובה. נא להשלים את השדות המסומנים באדום.');
      if (firstErrorElId) {
        document.getElementById(firstErrorElId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setMissingFields({});
    setFormError(null);
    setIsSubmitting(true);

    const formattedAllergies =
      allergiesChoice === 'none'
        ? 'אין לי אלרגיות או רגישויות'
        : `יש אלרגיה/רגישות: ${allergiesDetails.trim()}`;

    try {
      await saveSoulRegistration({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        age: Math.round(parsedAge),
        maritalStatus,
        childrenAges,
        trainsAtStudio: trainsAtStudio as 'כן' | 'לא',
        joinReasons,
        joinReasonsOther: joinReasons.includes('אחר') ? joinReasonsOther.trim() : '',
        curiousTopics,
        // Keep exact full answer for personal welcome kit message
        personalGift,
        heardFrom,
        heardFromOther: heardFrom === 'אחר' ? heardFromOther.trim() : '',
        allergies: formattedAllergies,
        termsAccepted: true,
        photoConsent: photoConsentChoice === 'yes',
        stayInTouchConsent: stayInTouchChoice === 'yes',
        submittedAt: new Date().toISOString(),
        source: 'אמצע החיים - אימון לנשמה (רעות)',
      });
      setIsSubmitted(true);
      setTimeout(() => {
        document.getElementById('soul-interest')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } catch {
      setFormError('אירעה שגיאה קלה בשמירה. ניתן לנסות שוב או לפנות אלינו בוואטסאפ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white text-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-white/30 text-center space-y-6 animate-in fade-in">
        <div className="w-16 h-16 rounded-full bg-teal-100 text-[#0E7490] mx-auto flex items-center justify-center">
          <CheckCircle2 size={38} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
            איזה כיף !!
            <br />
            הפרטים שלך התקבלו
          </h3>
          <p className="text-base sm:text-xl font-black text-[#0E7490] leading-relaxed">
            על מנת לשריין ולהבטיח את מקומך יש לבצע תשלום בלינק מטה
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#FFF7ED] to-[#F0FDF4] p-5 sm:p-6 rounded-2xl border-2 border-[#C56B3E]/30 max-w-lg mx-auto space-y-3">
          <p className="text-sm sm:text-base font-black text-slate-800">
            הסדרת תשלום בפייבוקס (600 ש&quot;ח עבור 4 מפגשים):
          </p>
          <p className="text-xs sm:text-sm font-black text-[#C56B3E]">
            שימי לב: רק ביצוע התשלום בפועל מבטיח שריון מקום בסדנה.
          </p>
          <a
            href={payboxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 bg-[#C56B3E] hover:bg-[#B25A2E] text-white rounded-full font-black text-base transition-all shadow-md hover:shadow-lg"
          >
            <CreditCard className="w-5 h-5" />
            <span>מעבר לתשלום בפייבוקס</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E7490] hover:bg-[#0891B2] text-white rounded-full font-bold text-sm transition-all shadow-md"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>שיחה ישירה בוואטסאפ עם דלית ואלסי</span>
          </a>
        </div>
      </div>
    );
  }

  const cardHighlightClass = (key: string) =>
    missingFields[key]
      ? 'border-red-400 bg-red-50/40 ring-2 ring-red-200'
      : 'border-slate-200 bg-slate-50/50';

  return (
    <div className="bg-white text-slate-800 rounded-3xl p-5 sm:p-9 shadow-2xl border-4 border-white/30 text-right">
      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {formError && (
          <div className="p-3.5 bg-red-50 border border-red-300 text-red-700 text-xs sm:text-sm rounded-2xl flex items-center gap-2 font-bold">
            <AlertCircle size={18} className="shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* חלק א: פרטים אישיים */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 border-b-2 border-[#0E7490]/20 pb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0E7490]" />
            <h3 className="text-xl sm:text-2xl font-black text-[#0E7490]">פרטים אישיים</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. שם מלא */}
            <div id="soul-q1">
              <label className="block text-sm font-black text-slate-800 mb-1.5">
                1. שם מלא <span className="text-[#C56B3E]">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  clearMissing('fullName');
                  setFullName(e.target.value);
                }}
                placeholder="שם פרטי ומשפחה"
                className={`w-full px-4 py-3 rounded-xl border text-base focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/15 transition-all text-right bg-white ${
                  missingFields.fullName ? 'border-red-400 ring-2 ring-red-200' : 'border-slate-200'
                }`}
              />
            </div>

            {/* 2. טלפון נייד */}
            <div id="soul-q2">
              <label className="block text-sm font-black text-slate-800 mb-1.5">
                2. טלפון נייד <span className="text-[#C56B3E]">*</span>
              </label>
              <input
                type="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => {
                  clearMissing('phone');
                  setPhone(e.target.value);
                }}
                placeholder="050-1234567"
                className={`w-full px-4 py-3 rounded-xl border text-base focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/15 transition-all text-right bg-white ${
                  missingFields.phone ? 'border-red-400 ring-2 ring-red-200' : 'border-slate-200'
                }`}
              />
            </div>

            {/* 3. כתובת דוא"ל */}
            <div id="soul-q3">
              <label className="block text-sm font-black text-slate-800 mb-1.5">
                3. כתובת דוא&quot;ל <span className="text-[#C56B3E]">*</span>
              </label>
              <input
                type="email"
                dir="ltr"
                value={email}
                onChange={(e) => {
                  clearMissing('email');
                  setEmail(e.target.value);
                }}
                placeholder="name@example.com"
                className={`w-full px-4 py-3 rounded-xl border text-base focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/15 transition-all text-right bg-white ${
                  missingFields.email ? 'border-red-400 ring-2 ring-red-200' : 'border-slate-200'
                }`}
              />
            </div>

            {/* 4. גיל */}
            <div id="soul-q4">
              <label className="block text-sm font-black text-slate-800 mb-1.5">
                4. גיל <span className="text-[#C56B3E]">*</span>
              </label>
              <input
                type="number"
                dir="ltr"
                min={18}
                max={120}
                value={age}
                onChange={(e) => {
                  clearMissing('age');
                  setAge(e.target.value);
                }}
                placeholder="למשל: 48"
                className={`w-full px-4 py-3 rounded-xl border text-base focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/15 transition-all text-right bg-white ${
                  missingFields.age ? 'border-red-400 ring-2 ring-red-200' : 'border-slate-200'
                }`}
              />
            </div>
          </div>

          {/* 5. מצב משפחתי */}
          <div id="soul-q5" className={`p-4 sm:p-5 rounded-2xl border transition-all ${cardHighlightClass('maritalStatus')}`}>
            <label className="block text-sm sm:text-base font-black text-slate-900 mb-3">
              5. מצב משפחתי <span className="text-[#C56B3E]">*</span>
              <span className="text-xs font-medium text-slate-500 mr-2">(בחירה אחת)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {MARITAL_STATUS_OPTIONS.map((opt) => {
                const selected = maritalStatus === opt;
                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm font-bold cursor-pointer transition-all ${
                      selected
                        ? 'bg-[#0E7490] text-white border-[#0E7490] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#0E7490]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="soul-marital-status"
                      value={opt}
                      checked={selected}
                      onChange={() => {
                        clearMissing('maritalStatus');
                        setMaritalStatus(opt);
                      }}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selected ? 'border-white bg-white' : 'border-slate-300'
                      }`}
                    >
                      {selected && <span className="w-2 h-2 rounded-full bg-[#0E7490]" />}
                    </span>
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 6. מהם גילאי הילדים שלך? */}
          <div id="soul-q6" className={`p-4 sm:p-5 rounded-2xl border transition-all ${cardHighlightClass('childrenAges')}`}>
            <label className="block text-sm sm:text-base font-black text-slate-900 mb-3">
              6. מהם גילאי הילדים שלך? <span className="text-[#C56B3E]">*</span>
              <span className="text-xs font-medium text-slate-500 mr-2">(בחירה מרובה)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CHILDREN_AGE_OPTIONS.map((opt) => {
                const checked = childrenAges.includes(opt);
                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm font-bold cursor-pointer transition-all ${
                      checked
                        ? 'bg-[#0E7490] text-white border-[#0E7490] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#0E7490]/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggleChildrenAge(opt)}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 text-[11px] font-black ${
                        checked ? 'border-white bg-white text-[#0E7490]' : 'border-slate-300'
                      }`}
                    >
                      {checked ? '✓' : ''}
                    </span>
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 7. האם את מתאמנת בסטודיו? */}
          <div id="soul-q7" className={`p-4 sm:p-5 rounded-2xl border transition-all ${cardHighlightClass('trainsAtStudio')}`}>
            <label className="block text-sm sm:text-base font-black text-slate-900 mb-3">
              7. האם את מתאמנת בסטודיו? <span className="text-[#C56B3E]">*</span>
              <span className="text-xs font-medium text-slate-500 mr-2">(בחירה אחת)</span>
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              {(['כן', 'לא'] as const).map((opt) => {
                const selected = trainsAtStudio === opt;
                return (
                  <label
                    key={opt}
                    className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-black cursor-pointer transition-all ${
                      selected
                        ? 'bg-[#0E7490] text-white border-[#0E7490] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#0E7490]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="soul-trains-at-studio"
                      value={opt}
                      checked={selected}
                      onChange={() => {
                        clearMissing('trainsAtStudio');
                        setTrainsAtStudio(opt);
                      }}
                      className="sr-only"
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* חלק ב: קצת עלייך */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 border-b-2 border-[#C56B3E]/25 pb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C56B3E]" />
            <h3 className="text-xl sm:text-2xl font-black text-[#C56B3E]">קצת עלייך</h3>
          </div>

          {/* 8. מה בעיקר גרם לך לרצות להצטרף ל"אימון לנשמה"? */}
          <div id="soul-q8" className={`p-4 sm:p-5 rounded-2xl border transition-all ${cardHighlightClass('joinReasons')}`}>
            <label className="block text-sm sm:text-base font-black text-slate-900 mb-3">
              8. מה בעיקר גרם לך לרצות להצטרף ל&quot;אימון לנשמה&quot;? <span className="text-[#C56B3E]">*</span>
              <span className="text-xs font-medium text-slate-500 mr-2">(בחירה מרובה)</span>
            </label>
            <div className="space-y-2.5">
              {JOIN_REASON_OPTIONS.map((opt) => {
                const checked = joinReasons.includes(opt);
                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-bold cursor-pointer transition-all ${
                      checked
                        ? 'bg-[#0E7490] text-white border-[#0E7490] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#0E7490]/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggleJoinReason(opt)}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 text-[11px] font-black ${
                        checked ? 'border-white bg-white text-[#0E7490]' : 'border-slate-300'
                      }`}
                    >
                      {checked ? '✓' : ''}
                    </span>
                    <span>{opt}</span>
                  </label>
                );
              })}

              {joinReasons.includes('אחר') && (
                <div className="pt-1">
                  <input
                    type="text"
                    value={joinReasonsOther}
                    onChange={(e) => {
                      clearMissing('joinReasons');
                      setJoinReasonsOther(e.target.value);
                    }}
                    placeholder="פרטי כאן מה גרם לך לרצות להצטרף..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0E7490]/40 bg-white text-sm focus:outline-none focus:border-[#0E7490] text-right"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 9. מבין הנושאים שנפגוש בסדרה (עד שני נושאים בלבד) */}
          <div id="soul-q9" className={`p-4 sm:p-5 rounded-2xl border transition-all ${cardHighlightClass('curiousTopics')}`}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <label className="text-sm sm:text-base font-black text-slate-900">
                9. מבין הנושאים שנפגוש בסדרה, מה הכי מעסיק או מסקרן אותך כרגע? <span className="text-[#C56B3E]">*</span>
              </label>
              <span className="text-xs font-black px-3 py-1 rounded-full bg-[#C56B3E]/15 text-[#C56B3E]">
                נבחרו {curiousTopics.length} מתוך עד 2 נושאים
              </span>
            </div>

            {topicLimitNote && (
              <p className="text-xs font-bold text-[#C56B3E] mb-2">
                ניתן לבחור עד שני נושאים בלבד (בטלי סימון קיים כדי להחליף בחירה).
              </p>
            )}

            <div className="space-y-2.5">
              {CURIOUS_TOPIC_OPTIONS.map((opt) => {
                const checked = curiousTopics.includes(opt);
                const disabledByLimit = !checked && curiousTopics.length >= 2;
                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                      checked
                        ? 'bg-[#C56B3E] text-white border-[#C56B3E] shadow-xs cursor-pointer'
                        : disabledByLimit
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#C56B3E]/50 cursor-pointer'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggleCuriousTopic(opt)}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 text-[11px] font-black ${
                        checked ? 'border-white bg-white text-[#C56B3E]' : 'border-slate-300'
                      }`}
                    >
                      {checked ? '✓' : ''}
                    </span>
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 10. שאלה פתוחה לערכת הוולקאם */}
          <div id="soul-q10" className={`p-4 sm:p-5 rounded-2xl border transition-all ${cardHighlightClass('personalGift')}`}>
            <label className="block text-sm sm:text-base font-black text-slate-900 mb-2">
              10. אם היית יכולה להעניק לעצמך דבר אחד בתקופה הזו בחיים, מה הוא היה? <span className="text-[#C56B3E]">*</span>
            </label>
            <div className="text-xs sm:text-sm text-slate-600 space-y-1 mb-3 leading-relaxed">
              <p>זו יכולה להיות תחושה שהיית רוצה להרגיש יותר, משהו שהיית רוצה לשנות, לשחרר או פשוט לאפשר לעצמך.</p>
              <p className="font-bold text-[#0E7490]">אין תשובה נכונה או לא נכונה. רק מה שנכון לך.</p>
            </div>
            <textarea
              rows={4}
              value={personalGift}
              onChange={(e) => {
                clearMissing('personalGift');
                setPersonalGift(e.target.value);
              }}
              placeholder="כתבי בחופשיות כמה משפטים מהלב..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-base focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/15 transition-all text-right resize-y min-h-[120px]"
            />
          </div>
        </div>

        {/* חלק ג: עוד כמה פרטים */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 border-b-2 border-[#0E7490]/20 pb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0E7490]" />
            <h3 className="text-xl sm:text-2xl font-black text-[#0E7490]">עוד כמה פרטים</h3>
          </div>

          {/* 11. איך שמעת על הסדרה? */}
          <div id="soul-q11" className={`p-4 sm:p-5 rounded-2xl border transition-all ${cardHighlightClass('heardFrom')}`}>
            <label className="block text-sm sm:text-base font-black text-slate-900 mb-3">
              11. איך שמעת על הסדרה? <span className="text-[#C56B3E]">*</span>
              <span className="text-xs font-medium text-slate-500 mr-2">(בחירה אחת)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {HEARD_FROM_OPTIONS.map((opt) => {
                const selected = heardFrom === opt;
                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-bold cursor-pointer transition-all ${
                      selected
                        ? 'bg-[#0E7490] text-white border-[#0E7490] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#0E7490]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="soul-heard-from"
                      value={opt}
                      checked={selected}
                      onChange={() => {
                        clearMissing('heardFrom');
                        setHeardFrom(opt);
                      }}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selected ? 'border-white bg-white' : 'border-slate-300'
                      }`}
                    >
                      {selected && <span className="w-2 h-2 rounded-full bg-[#0E7490]" />}
                    </span>
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>

            {heardFrom === 'אחר' && (
              <div className="mt-2.5">
                <input
                  type="text"
                  value={heardFromOther}
                  onChange={(e) => {
                    clearMissing('heardFrom');
                    setHeardFromOther(e.target.value);
                  }}
                  placeholder="פרטי איך שמעת על הסדרה..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#0E7490]/40 bg-white text-sm focus:outline-none focus:border-[#0E7490] text-right"
                />
              </div>
            )}
          </div>

          {/* 12. אלרגיות ורגישויות למזון */}
          <div id="soul-q12" className={`p-4 sm:p-5 rounded-2xl border transition-all ${cardHighlightClass('allergies')}`}>
            <label className="block text-sm sm:text-base font-black text-slate-900 mb-1">
              12. האם יש לך אלרגיות או רגישויות למזון? <span className="text-[#C56B3E]">*</span>
            </label>
            <p className="text-xs text-slate-500 mb-3">
              חשוב לנו שכולן ירגישו בנוח ויהנו מהכיבוד הקל במפגשים (בחירה אחת).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { val: 'none' as const, label: 'אין לי אלרגיות או רגישויות' },
                { val: 'yes' as const, label: 'יש לי אלרגיה / רגישות (יש לפרט)' },
              ].map((opt) => {
                const selected = allergiesChoice === opt.val;
                return (
                  <label
                    key={opt.val}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-bold cursor-pointer transition-all ${
                      selected
                        ? 'bg-[#0E7490] text-white border-[#0E7490] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#0E7490]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="soul-allergies"
                      value={opt.val}
                      checked={selected}
                      onChange={() => {
                        clearMissing('allergies');
                        setAllergiesChoice(opt.val);
                      }}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selected ? 'border-white bg-white' : 'border-slate-300'
                      }`}
                    >
                      {selected && <span className="w-2 h-2 rounded-full bg-[#0E7490]" />}
                    </span>
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>

            {allergiesChoice === 'yes' && (
              <div className="mt-2.5">
                <input
                  type="text"
                  value={allergiesDetails}
                  onChange={(e) => {
                    clearMissing('allergies');
                    setAllergiesDetails(e.target.value);
                  }}
                  placeholder="פרטי כאן לאילו מזונות או מרכיבים יש לך אלרגיה / רגישות..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#0E7490]/40 bg-white text-sm focus:outline-none focus:border-[#0E7490] text-right"
                />
              </div>
            )}
          </div>

          {/* 13. אישור תקנון ותנאי ההרשמה */}
          <div id="soul-q13" className={`p-4 sm:p-5 rounded-2xl border transition-all ${cardHighlightClass('termsAccepted')}`}>
            <div className="text-sm sm:text-base font-black text-slate-900 mb-2.5">
              13. אישור תקנון ותנאי ההרשמה <span className="text-[#C56B3E]">*</span>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  clearMissing('termsAccepted');
                  setTermsAccepted(e.target.checked);
                }}
                className="mt-1 w-5 h-5 rounded accent-[#0E7490] cursor-pointer shrink-0"
              />
              <span className="text-sm font-bold text-slate-700 leading-relaxed">
                אני מאשרת שקראתי את פרטי התוכנית, מועדי המפגשים ואת{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onOpenTerms();
                  }}
                  className="text-[#0E7490] underline hover:text-[#C56B3E] font-black cursor-pointer"
                >
                  תקנון התוכנית ותנאי ההרשמה והביטול
                </button>
                .
              </span>
            </label>
          </div>

          {/* 14. אישור צילום ופרסום */}
          <div id="soul-q14" className={`p-4 sm:p-5 rounded-2xl border transition-all ${cardHighlightClass('photoConsent')}`}>
            <div className="text-sm sm:text-base font-black text-slate-900 mb-1.5">
              14. אישור צילום ופרסום <span className="text-[#C56B3E]">*</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
              ייתכן שנצלם במהלך המפגשים לצורך תיעוד ופרסום הפעילות של &quot;בין לבין&quot; מרחבים לנשים.
            </p>
            <div className="space-y-2.5">
              {[
                {
                  val: 'yes' as const,
                  label: 'אני מאשרת שימוש בתמונות שבהן אני מופיעה לצורכי פרסום.',
                },
                {
                  val: 'no' as const,
                  label: 'איני מאשרת שימוש בתמונות שבהן אני מופיעה לצורכי פרסום.',
                },
              ].map((opt) => {
                const selected = photoConsentChoice === opt.val;
                return (
                  <label
                    key={opt.val}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-bold cursor-pointer transition-all ${
                      selected
                        ? 'bg-[#0E7490] text-white border-[#0E7490] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#0E7490]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="soul-photo-consent"
                      value={opt.val}
                      checked={selected}
                      onChange={() => {
                        clearMissing('photoConsent');
                        setPhotoConsentChoice(opt.val);
                      }}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selected ? 'border-white bg-white' : 'border-slate-300'
                      }`}
                    >
                      {selected && <span className="w-2 h-2 rounded-full bg-[#0E7490]" />}
                    </span>
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 15. רוצה להישאר איתנו בקשר? */}
          <div id="soul-q15" className={`p-4 sm:p-5 rounded-2xl border transition-all ${cardHighlightClass('stayInTouch')}`}>
            <div className="text-sm sm:text-base font-black text-slate-900 mb-1.5">
              15. רוצה להישאר איתנו בקשר? <span className="text-[#C56B3E]">*</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
              אשמח לקבל מדי פעם עדכונים על סדנאות, מפגשים וחוויות נוספות של &quot;בין לבין&quot;.
            </p>
            <div className="space-y-2.5">
              {[
                {
                  val: 'yes' as const,
                  label: 'כן, אשמח לקבל מדי פעם עדכונים על סדנאות, מפגשים וחוויות נוספות של "בין לבין".',
                },
                {
                  val: 'no' as const,
                  label: 'לא מעוניינת בקבלת עדכונים נוספים.',
                },
              ].map((opt) => {
                const selected = stayInTouchChoice === opt.val;
                return (
                  <label
                    key={opt.val}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-bold cursor-pointer transition-all ${
                      selected
                        ? 'bg-[#0E7490] text-white border-[#0E7490] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#0E7490]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="soul-stay-in-touch"
                      value={opt.val}
                      checked={selected}
                      onChange={() => {
                        clearMissing('stayInTouch');
                        setStayInTouchChoice(opt.val);
                      }}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selected ? 'border-white bg-white' : 'border-slate-300'
                      }`}
                    >
                      {selected && <span className="w-2 h-2 rounded-full bg-[#0E7490]" />}
                    </span>
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* הודעת פרטיות קצרה + כפתור שליחה */}
        <div className="space-y-4 pt-2">
          <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 bg-[#F0FDF4] border border-[#0E7490]/20 p-3.5 rounded-2xl">
            <ShieldCheck size={18} className="text-[#0E7490] shrink-0 mt-0.5" />
            <span>
              הפרטים ישמשו את בין לבין לצורך ניהול ההרשמה, התאמת המפגשים והכנת חומרים אישיים למשתתפות.
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#0E7490] to-[#0891B2] hover:from-[#0891B2] hover:to-[#0E7490] active:scale-99 text-white font-black text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <Sparkles size={18} className="text-amber-300" />
            <span>{isSubmitting ? 'שומרת פרטים...' : 'אני מצטרפת לאימון לנשמה'}</span>
            <Send size={18} className="rotate-180" />
          </button>
        </div>
      </form>
    </div>
  );
};
