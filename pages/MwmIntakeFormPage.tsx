import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { saveIntakeSubmission } from '../utils/mwmStorage';
import { ButterflyIcon } from '../components/ButterflyIcon';
import { CONTACT_PHONE, MWM_CONTACTS } from '../constants';
import { PrivacyPolicyModal } from '../components/mwm/PrivacyPolicyModal';
import { 
  CheckCircle2, Sparkles, Send, ArrowRight, Heart, HelpCircle, 
  AlertCircle, MessageCircle, ShieldCheck, Eye 
} from 'lucide-react';

const AGE_OPTIONS = [
  '45-50',
  '51-55',
  '56-60'
];

const PERIOD_CHARACTERISTICS_OPTIONS = [
  'הרבה דברים משתנים בו זמנית',
  'אני מרגישה שהגיע הזמן לדייק דברים',
  'אני בתקופה של שאלות והתלבטויות',
  'אני דווקא במקום טוב ורוצה להמשיך להתפתח ממנו',
  'אני מרגישה עומס ורוצה קצת מקום לעצמי',
  'אני בתקופה של שינוי',
  'קשה לי להגדיר, אבל משהו מרגיש אחרת',
  'אחר'
];

const TOPICS_OF_INTEREST_OPTIONS = [
  { id: 'body', label: 'הגוף והשינויים שהוא עובר', icon: '🌿' },
  { id: 'relationships', label: 'זוגיות ומערכות יחסים', icon: '❤️' },
  { id: 'parenting', label: 'ילדים והורות בשלב החדש', icon: '🌱' },
  { id: 'parents', label: 'הורים מתבגרים', icon: '🤝' },
  { id: 'career', label: 'קריירה ועבודה', icon: '💼' },
  { id: 'self_time', label: 'זמן לעצמי', icon: '☕' },
  { id: 'identity', label: 'זהות, משמעות ומה אני רוצה עכשיו', icon: '✨' },
  { id: 'friendships', label: 'חברות וקשרים', icon: '👭' },
  { id: 'health', label: 'בריאות ואורח חיים', icon: '🍏' },
  { id: 'emotional', label: 'שינויים רגשיים', icon: '🌊' },
  { id: 'other', label: 'אחר', icon: '✍️' }
];

export const MwmIntakeFormPage: React.FC = () => {
  useEffect(() => {
    document.title = 'נעים להכיר | בין לבין - תוכנית לנשים באמצע החיים';
    window.scrollTo(0, 0);
  }, []);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [ageRange, setAgeRange] = useState('');
  
  const [motivation, setMotivation] = useState('');
  const [stopFeelingAlone, setStopFeelingAlone] = useState('');
  
  const [periodCharacteristics, setPeriodCharacteristics] = useState<string[]>([]);
  const [otherPeriodChar, setOtherPeriodChar] = useState('');
  
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [otherTopicTitle, setOtherTopicTitle] = useState('');
  const [topicDetails, setTopicDetails] = useState<Record<string, string>>({});
  
  const [expectations, setExpectations] = useState('');
  const [notes, setNotes] = useState('');
  const [personalWish, setPersonalWish] = useState('');

  // Privacy modal state (purely optional to view, not forced)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // UI status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Toggle selection for Question 6 (Characteristics)
  const togglePeriodChar = (option: string) => {
    setPeriodCharacteristics(prev => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  // Toggle selection for Question 7 (Topics)
  const toggleTopic = (topicLabel: string) => {
    setSelectedTopics(prev => {
      const exists = prev.includes(topicLabel);
      if (exists) {
        const updated = prev.filter(t => t !== topicLabel);
        const updatedDetails = { ...topicDetails };
        delete updatedDetails[topicLabel];
        setTopicDetails(updatedDetails);
        return updated;
      } else {
        return [...prev, topicLabel];
      }
    });
  };

  // Update specific topic's question/expectation
  const handleTopicDetailChange = (topicLabel: string, value: string) => {
    setTopicDetails(prev => ({
      ...prev,
      [topicLabel]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('נא למלא שם מלא');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('נא למלא מספר טלפון נייד');
      return;
    }
    if (!ageRange) {
      setErrorMessage('נא לבחור את טווח הגילאים');
      return;
    }
    if (!motivation.trim()) {
      setErrorMessage('נא להשיב מה גרם לך לבחור להצטרף ל"בין לבין"');
      return;
    }
    if (!stopFeelingAlone.trim()) {
      setErrorMessage('נא להשיב על שאלה 5 (מה הדבר שהיית רוצה להפסיק להרגיש לגביו לבד או להבין שהוא די טבעי)');
      return;
    }
    if (periodCharacteristics.length === 0) {
      setErrorMessage('נא לבחור לפחות מאפיין אחד לתקופה הנוכחית');
      return;
    }
    if (selectedTopics.length === 0) {
      setErrorMessage('נא לבחור לפחות נושא אחד שמעסיק אותך בתקופה זו');
      return;
    }
    if (!expectations.trim()) {
      setErrorMessage('נא להשיב מה היית שמחה לקבל מהתוכנית');
      return;
    }
    if (!personalWish.trim()) {
      setErrorMessage('נא להשיב על שאלת הסיום האישית');
      return;
    }

    setIsSubmitting(true);

    try {
      const finalPeriodCharacteristics = periodCharacteristics.map(item => 
        item === 'אחר' && otherPeriodChar.trim() ? `אחר: ${otherPeriodChar.trim()}` : item
      );

      const finalSelectedTopics = selectedTopics.map(item => 
        item === 'אחר' && otherTopicTitle.trim() ? `אחר: ${otherTopicTitle.trim()}` : item
      );

      const payload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        ageRange: ageRange,
        motivation: motivation.trim(),
        stopFeelingAlone: stopFeelingAlone.trim(),
        periodCharacteristics: finalPeriodCharacteristics,
        topicsOfInterest: finalSelectedTopics,
        topicDetails: topicDetails,
        expectations: expectations.trim(),
        notes: notes.trim(),
        personalWish: personalWish.trim(),
        submittedAt: new Date().toISOString()
      };

      await saveIntakeSubmission(payload);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Error submitting intake form:', err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const prepareWhatsAppSummaryFor = (contactPhone: string) => {
    const summaryText = `*היי, מילאתי את טופס "נעים להכיר" - בין לבין כוכב יאיר צור יגאל*%0A%0A` +
      `*שם מלא:* ${encodeURIComponent(fullName)}%0A` +
      `*טלפון:* ${encodeURIComponent(phone)}%0A` +
      `*גיל:* ${encodeURIComponent(ageRange)}%0A%0A` +
      `*מה גרם לי לבחור להצטרף:*%0A${encodeURIComponent(motivation)}%0A%0A` +
      `*דבר שהייתי רוצה להפסיק להרגיש לגביו לבד:*%0A${encodeURIComponent(stopFeelingAlone)}%0A%0A` +
      `*מה היית שמחה לקבל מהתוכנית:*%0A${encodeURIComponent(expectations)}%0A%0A` +
      `*משהו שהייתי רוצה שיהיה לי קצת יותר:*%0A${encodeURIComponent(personalWish)}`;
    
    return `https://wa.me/${contactPhone}?text=${summaryText}`;
  };

  return (
    <div className="min-h-screen bg-brand-cream/60 font-sans selection:bg-brand-beige selection:text-brand-green relative overflow-hidden" dir="rtl">
      {/* Decorative Butterflies */}
      <ButterflyIcon size={260} className="absolute -top-12 -right-16 opacity-5 animate-drift -z-10" />
      <ButterflyIcon size={180} className="absolute top-1/3 -left-12 opacity-5 animate-float -z-10" />
      <ButterflyIcon size={220} className="absolute bottom-20 -right-10 opacity-5 animate-drift -z-10" />

      {/* Top Header / Nav Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-brand-beige shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/mwm" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
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
            <div className="flex flex-col">
              <span className="text-lg font-black text-brand-green leading-tight">בין לבין</span>
              <span className="text-xs font-bold text-brand-orange">כוכב יאיר - צור יגאל</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link 
              to="/mwm" 
              className="flex items-center gap-2 text-sm md:text-base font-black text-brand-green hover:text-brand-orange bg-brand-beige/30 hover:bg-brand-beige/60 px-5 py-2 rounded-full transition-all border border-brand-beige"
            >
              <span>חזרה לדף התוכנית</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl border-2 border-brand-green text-center space-y-8 my-8"
          >
            <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12 text-brand-green" />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-black text-brand-green tracking-tight">
                תודה שמילאת ושיתפת!
              </h1>
              <p className="text-xl md:text-2xl text-brand-orange font-bold leading-relaxed max-w-xl mx-auto">
                שמחות להכיר אותך ומחכות לפגוש אותך ב"בין לבין"!
              </p>
              
              {/* Names and Roles in Success Screen */}
              <div className="pt-2 text-base md:text-lg font-bold text-brand-green space-y-1">
                <div>דלית כורה ואלסי זיסלמן – מנהלות "בין לבין"</div>
                <div>ענבל סטביצקי ותניה פינצבסקי – מובילות MWM כיצ"י</div>
              </div>
            </div>

            <div className="bg-brand-beige/20 p-6 md:p-8 rounded-3xl border border-brand-beige text-right space-y-3 max-w-xl mx-auto">
              <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed">
                התשובות שלך נשמרו אצל צוות התוכנית ויסייעו לנו לדייק את המפגשים במיוחד עבורך ועבור הקבוצה.
              </p>
              <p className="text-sm md:text-base text-gray-500 font-medium">
                נחזור אלייך בקרוב עם כל העדכונים לקראת המפגש הראשון.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <p className="text-sm font-bold text-gray-600">
                רוצה לעדכן אותנו או לשאול שאלה בוואטסאפ?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {MWM_CONTACTS.map((c) => (
                  <a
                    key={c.rawPhone}
                    href={prepareWhatsAppSummaryFor(c.internationalPhone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 rounded-full text-base font-black transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>שליחת הודעה ל{c.name} ({c.phone})</span>
                  </a>
                ))}
              </div>

              <div className="pt-2">
                <Link 
                  to="/mwm" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green text-white px-8 py-3.5 rounded-full text-base font-black hover:bg-brand-orange transition-all shadow-md"
                >
                  <span>חזרה לדף התוכנית</span>
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* Header Card */}
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border-t-8 border-brand-orange text-right space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-block bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 text-white px-5 py-2 rounded-full text-xs md:text-sm font-black tracking-wide shadow-md">
                  אמהות עם מהות כוכב יאיר צור יגאל
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-brand-green bg-brand-green/10 px-4 py-1.5 rounded-full border border-brand-green/20">
                  <Sparkles className="w-4 h-4 text-brand-orange" />
                  <span>טופס היכרות</span>
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-black text-brand-green tracking-tight">
                  נעים להכיר
                </h1>
                <h2 className="text-xl md:text-2xl font-bold text-brand-orange">
                  בין לבין - תוכנית לנשים באמצע החיים
                </h2>
              </div>

              <div className="bg-brand-cream/80 p-6 md:p-8 rounded-3xl border border-brand-beige space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
                <p className="font-bold text-brand-green">
                  לקראת תחילת הדרך שלנו יחד, נשמח להכיר אותך קצת יותר.
                </p>
                <p>
                  "בין לבין" נוגעת בנושאים שמעסיקים נשים בתקופת אמצע החיים, אבל כל אחת מגיעה אליה ממקום קצת אחר.
                </p>
                <p>
                  השאלות הקצרות כאן יעזרו לנו להכיר את הקבוצה, לדייק את המפגשים ולבנות עבורכן מרחב נעים, רלוונטי ומשמעותי.
                </p>
                <p className="font-bold text-brand-orange">
                  אין תשובות נכונות או לא נכונות. פשוט מה שנכון לך היום.
                </p>
              </div>
            </div>

            {/* The Form */}
            <form onSubmit={handleSubmit} className="space-y-6 text-right">
              
              {/* Question 1: Full Name */}
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-md border border-brand-beige space-y-3">
                <label className="block text-lg md:text-xl font-black text-brand-green">
                  1. שם מלא <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="הקלידי את שמך המלא"
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-brand-beige focus:border-brand-orange focus:outline-none text-base md:text-lg text-gray-800 transition-all shadow-inner bg-brand-cream/30"
                />
              </div>

              {/* Question 2: Mobile Phone */}
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-md border border-brand-beige space-y-3">
                <label className="block text-lg md:text-xl font-black text-brand-green">
                  2. מספר טלפון נייד <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05X-XXXXXXX"
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-brand-beige focus:border-brand-orange focus:outline-none text-base md:text-lg text-gray-800 transition-all shadow-inner bg-brand-cream/30"
                  dir="ltr"
                />
              </div>

              {/* Question 3: Age Range */}
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-md border border-brand-beige space-y-4">
                <label className="block text-lg md:text-xl font-black text-brand-green">
                  3. מה גילך? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {AGE_OPTIONS.map((opt) => {
                    const isSelected = ageRange === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setAgeRange(opt)}
                        className={`p-4 rounded-2xl border-2 font-black text-base md:text-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-brand-orange text-white border-brand-orange shadow-md scale-[1.02]'
                            : 'bg-brand-cream/40 text-gray-700 border-brand-beige hover:border-brand-orange/50 hover:bg-white'
                        }`}
                      >
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 4: Motivation */}
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-md border border-brand-beige space-y-3">
                <label className="block text-lg md:text-xl font-black text-brand-green">
                  4. מה גרם לך לבחור להצטרף ל"בין לבין"? <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={3}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="ספרי לנו בכמה מילים מה משך אותך או הניע אותך להצטרף..."
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-brand-beige focus:border-brand-orange focus:outline-none text-base md:text-lg text-gray-800 transition-all shadow-inner bg-brand-cream/30"
                />
              </div>

              {/* Question 5: Stop feeling alone / natural */}
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-md border-2 border-brand-green/30 space-y-3">
                <div className="flex items-center gap-2 text-brand-green font-black text-xs md:text-sm bg-brand-green/10 px-3.5 py-1 rounded-full w-fit">
                  <Heart className="w-4 h-4 text-brand-orange fill-current" />
                  <span>מרחב של שיתוף וטבעיות</span>
                </div>
                <label className="block text-lg md:text-xl font-black text-brand-green leading-snug">
                  5. מה הדבר שהיית רוצה להפסיק להרגיש לגביו לבד או להבין שהוא די טבעי? <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={3}
                  value={stopFeelingAlone}
                  onChange={(e) => setStopFeelingAlone(e.target.value)}
                  placeholder="שתפי אותנו בתחושה, מחשבה, שינוי או התמודדות שהיית שמחה לגלות שאת לא לבד בה..."
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-brand-beige focus:border-brand-orange focus:outline-none text-base md:text-lg text-gray-800 transition-all shadow-inner bg-brand-cream/30"
                />
              </div>

              {/* Question 6: Period Characteristics */}
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-md border border-brand-beige space-y-4">
                <div className="space-y-1">
                  <label className="block text-lg md:text-xl font-black text-brand-green">
                    6. כשאת חושבת על התקופה שאת נמצאת בה היום, מה הכי מאפיין אותה עבורך? <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm font-bold text-brand-orange">
                    (אפשר לסמן יותר מתשובה אחת)
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {PERIOD_CHARACTERISTICS_OPTIONS.map((opt) => {
                    const isChecked = periodCharacteristics.includes(opt);
                    return (
                      <div 
                        key={opt}
                        onClick={() => togglePeriodChar(opt)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isChecked 
                            ? 'bg-brand-green/10 border-brand-green text-brand-green font-black shadow-sm' 
                            : 'bg-brand-cream/30 border-brand-beige text-gray-700 font-medium hover:bg-white hover:border-brand-beige/80'
                        }`}
                      >
                        <span className="text-base md:text-lg">{opt}</span>
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isChecked ? 'bg-brand-green border-brand-green text-white' : 'border-gray-300 bg-white'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {periodCharacteristics.includes('אחר') && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-2"
                  >
                    <input 
                      type="text" 
                      value={otherPeriodChar}
                      onChange={(e) => setOtherPeriodChar(e.target.value)}
                      placeholder="פרטי מה מאפיין את התקופה שלך..."
                      className="w-full px-5 py-3 rounded-2xl border-2 border-brand-orange focus:outline-none text-base text-gray-800 bg-brand-cream/30"
                    />
                  </motion.div>
                )}
              </div>

              {/* Question 7: Topics of Interest with Dynamic Expandable Questions */}
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-md border-2 border-brand-orange/40 space-y-5">
                <div className="space-y-1">
                  <div className="inline-block bg-brand-orange text-white px-3 py-0.5 rounded-full text-xs font-black mb-1">
                    נושאי המפגשים
                  </div>
                  <label className="block text-lg md:text-xl font-black text-brand-green">
                    7. אילו נושאים מעסיקים אותך במיוחד בתקופה הזו? <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm font-bold text-brand-orange">
                    (סמני את הנושאים שרלוונטיים עבורך – סימון נושא יפתח אפשרות קצרה לשתף בשאלות ובציפיות שלך ממנו)
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {TOPICS_OF_INTEREST_OPTIONS.map((item) => {
                    const isChecked = selectedTopics.includes(item.label);
                    return (
                      <div 
                        key={item.id}
                        className={`rounded-2xl border-2 transition-all overflow-hidden ${
                          isChecked 
                            ? 'bg-brand-orange/5 border-brand-orange shadow-md' 
                            : 'bg-brand-cream/30 border-brand-beige hover:border-brand-orange/40 hover:bg-white'
                        }`}
                      >
                        {/* Checkbox row */}
                        <div 
                          onClick={() => toggleTopic(item.label)}
                          className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.icon}</span>
                            <span className={`text-base md:text-lg ${isChecked ? 'font-black text-brand-green' : 'font-semibold text-gray-700'}`}>
                              {item.label}
                            </span>
                          </div>
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isChecked ? 'bg-brand-orange border-brand-orange text-white' : 'border-gray-300 bg-white'
                          }`}>
                            {isChecked && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                        </div>

                        {/* Dynamic Expandable Area for this topic */}
                        <AnimatePresence>
                          {isChecked && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="px-4 pb-4 pt-1 border-t border-brand-orange/20 bg-white/70 space-y-3"
                            >
                              {item.id === 'other' && (
                                <input 
                                  type="text" 
                                  value={otherTopicTitle}
                                  onChange={(e) => setOtherTopicTitle(e.target.value)}
                                  placeholder="איזה נושא נוסף מעסיק אותך?"
                                  className="w-full px-4 py-2.5 rounded-xl border border-brand-orange focus:outline-none text-sm md:text-base text-gray-800 bg-white mb-2"
                                />
                              )}

                              <div className="flex items-start gap-2 text-brand-green font-bold text-sm md:text-base">
                                <HelpCircle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                                <span>מה השאלה שמעסיקה אותך בתחום הזה ומה הציפיות שלך מהמפגש?</span>
                              </div>

                              <textarea
                                rows={2}
                                value={topicDetails[item.label] || ''}
                                onChange={(e) => handleTopicDetailChange(item.label, e.target.value)}
                                placeholder="לדוגמה: הייתי רוצה להבין איך להתמודד עם... / אשמח לקבל כלים פרקטיים בנושא..."
                                className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:border-brand-orange focus:outline-none text-sm md:text-base text-gray-800 bg-white shadow-inner"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Question 8: Expectations */}
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-md border border-brand-beige space-y-3">
                <label className="block text-lg md:text-xl font-black text-brand-green">
                  8. מה היית שמחה לקבל מהתוכנית? <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={3}
                  value={expectations}
                  onChange={(e) => setExpectations(e.target.value)}
                  placeholder="כלים, ידע מקצועי, שיח חברי, זמן לעצמי, השראה..."
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-brand-beige focus:border-brand-orange focus:outline-none text-base md:text-lg text-gray-800 transition-all shadow-inner bg-brand-cream/30"
                />
              </div>

              {/* Question 9: Important notes (Optional) */}
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-md border border-brand-beige space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-lg md:text-xl font-black text-brand-green">
                    9. יש משהו שחשוב לך שנדע עלייך לפני שאנחנו מתחילות?
                  </label>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">לא חובה</span>
                </div>
                <textarea 
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="משהו אישי, העדפה מיוחדת, רגישות או כל דבר שתרצי לשתף אותנו..."
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-brand-beige focus:border-brand-orange focus:outline-none text-base md:text-lg text-gray-800 transition-all shadow-inner bg-brand-cream/30"
                />
              </div>

              {/* Bonus Question 10 */}
              <div className="bg-gradient-to-br from-brand-orange/10 via-brand-beige/20 to-brand-cream p-6 md:p-8 rounded-[2rem] shadow-lg border-2 border-brand-orange space-y-4">
                <div className="flex items-center gap-2 text-brand-orange font-black text-sm md:text-base">
                  <Heart className="w-5 h-5 fill-current" />
                  <span>ולפני שמסיימות, שאלה קטנה רק בשבילך...</span>
                </div>
                <label className="block text-lg md:text-xl font-black text-brand-green">
                  10. אם היית יכולה לבחור משהו אחד שהיית רוצה שיהיה לך קצת יותר ממנו בתקופה הקרובה, מה היית בוחרת? <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={personalWish}
                  onChange={(e) => setPersonalWish(e.target.value)}
                  placeholder="לדוגמה: שקט, קלילות, ביטחון, אומץ, זמן איכות..."
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-brand-orange focus:outline-none text-base md:text-lg text-gray-800 bg-white shadow-inner font-medium"
                />
              </div>

              {/* Privacy Terms & Confidentiality info Box (Read for whoever wants) */}
              <div className="bg-white p-5 md:p-6 rounded-[2rem] border border-brand-beige shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-black text-brand-green">
                      שמירה על פרטיות וסודיות מלאה
                    </div>
                    <p className="text-xs text-gray-500">
                      כל המידע מוגן ומיועד לשימוש צוות התוכנית בלבד.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="text-xs md:text-sm font-bold text-brand-orange hover:text-brand-green underline underline-offset-4 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <span>תקנון פרטיות ושמירת סודיות</span>
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Error Box */}
              {errorMessage && (
                <div className="p-4 bg-red-50 border-2 border-red-300 text-red-700 rounded-2xl flex items-center gap-3 font-bold">
                  <AlertCircle className="w-6 h-6 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-green hover:to-brand-lightGreen text-white py-5 px-8 rounded-full text-xl md:text-2xl font-black transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer transform hover:-translate-y-1 border-b-4 border-brand-orange/40"
                >
                  {isSubmitting ? (
                    <span>שולח את הטופס...</span>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      <span>שליחת טופס "נעים להכיר"</span>
                    </>
                  )}
                </button>
              </div>

              {/* Ending Note & Signatures */}
              <div className="text-center pt-6 space-y-4">
                <div className="space-y-1.5">
                  <p className="text-lg md:text-xl text-brand-green font-black">
                    שמחות להכיר אותך ומחכות לפגוש אותך ב"בין לבין"!
                  </p>
                  <p className="text-sm md:text-base font-bold text-brand-orange">
                    דלית ואלסי (מנהלות "בין לבין") | ענבל ותניה (מובילות MWM כיצ"י)
                  </p>
                </div>
                <p className="text-xs md:text-sm text-gray-400">
                  כל הפרטים נשמרים בסודיות מלאה אצל צוות התוכנית.
                </p>
                <div className="pt-2">
                  <Link 
                    to="/mwm-responses" 
                    className="text-xs text-gray-400 hover:text-brand-orange hover:underline transition-all"
                  >
                    🔒 כניסת צוות (לצפייה וניהול תשובות)
                  </Link>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal 
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
};

export default MwmIntakeFormPage;
