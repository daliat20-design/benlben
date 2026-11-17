import React, { useState } from 'react';
import {
  Users,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  Trash2,
  Search,
  Copy,
  Check,
  Download,
  Camera,
  Bell,
  Heart,
  FileSpreadsheet,
  Sparkles,
  CheckCircle2,
  CreditCard,
} from 'lucide-react';
import {
  SoulRegistration,
  deleteSoulRegistration,
  updateSoulRegistrationPayment,
} from '../utils/soulRegistrationStorage';

interface SoulRegistrationsPanelProps {
  registrations: SoulRegistration[];
}

function getFirstName(fullName: string): string {
  const trimmed = (fullName || '').trim();
  if (!trimmed) return '';
  return trimmed.split(/\s+/)[0] || trimmed;
}

function formatIsraelPhoneForWhatsApp(phone: string): string {
  const digits = (phone || '').replace(/\D/g, '');
  if (digits.startsWith('972')) return digits;
  return `972${digits.replace(/^0/, '')}`;
}

function buildPaymentWhatsAppMessage(reg: SoulRegistration): string {
  const firstName = getFirstName(reg.fullName);
  const greeting = firstName ? `היי ${firstName},` : 'היי,';
  return [
    greeting,
    '',
    'איזה כיף שבחרת להצטרף אלינו ל״אימון לנשמה״!',
    '',
    'התשלום התקבל ומקומך בסדנה שוריין בהצלחה.',
    '',
    'לקראת תחילת המפגשים נפתח קבוצת ווטסאפ ייעודית, שבה נשתף את כל הפרטים, העדכונים והמידע שכדאי לדעת לפני שמתחילות.',
    '',
    'אנחנו מתרגשות לצאת איתך לדרך המשותפת של "בין לבין" וסטודיו רעות.',
    '',
    'נתראה בקרוב,',
    'רעות, דלית ואלסי',
  ].join('\n');
}

function buildPaymentWhatsAppUrl(reg: SoulRegistration): string {
  const phone = formatIsraelPhoneForWhatsApp(reg.phone);
  const message = buildPaymentWhatsAppMessage(reg);
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
}

export const SoulRegistrationsPanel: React.FC<SoulRegistrationsPanelProps> = ({
  registrations,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReg, setSelectedReg] = useState<SoulRegistration | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedGiftId, setCopiedGiftId] = useState<string | null>(null);
  const [copiedPaymentMsgId, setCopiedPaymentMsgId] = useState<string | null>(null);
  const [copiedSheetsTable, setCopiedSheetsTable] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingPaidId, setUpdatingPaidId] = useState<string | null>(null);

  const paidCount = registrations.filter((r) => Boolean(r.paid)).length;
  const photoYesCount = registrations.filter((r) => r.photoConsent).length;
  const updatesYesCount = registrations.filter((r) => r.stayInTouchConsent).length;

  const filtered = registrations.filter((r) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      r.fullName.toLowerCase().includes(term) ||
      r.phone.includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.personalGift.toLowerCase().includes(term) ||
      (r.allergies || '').toLowerCase().includes(term) ||
      r.curiousTopics.some((t) => t.toLowerCase().includes(term))
    );
  });

  const buildTableData = () => {
    const headers = [
      'תאריך הרשמה',
      '1. שם מלא',
      '2. טלפון נייד',
      '3. כתובת דוא"ל',
      '4. גיל',
      '5. מצב משפחתי',
      '6. גילאי הילדים',
      '7. מתאמנת בסטודיו',
      '8. מה גרם לרצות להצטרף',
      '9. נושאים מובילים (עד 2)',
      '10. שאלה פתוחה לערכת וולקאם (תשובה מלאה)',
      '11. איך שמעה על הסדרה',
      '12. אלרגיות ורגישויות למזון',
      '13. אישור תקנון ותנאי הרשמה',
      '14. אישור צילום ופרסום',
      '15. הסכמה להישאר בקשר (עדכונים)',
      'סטטוס תשלום (פייבוקס)',
      'תאריך אישור תשלום',
    ];

    const rows = registrations.map((r) => {
      const reasons = [
        ...r.joinReasons.filter((x) => x !== 'אחר'),
        ...(r.joinReasons.includes('אחר')
          ? [r.joinReasonsOther ? `אחר: ${r.joinReasonsOther}` : 'אחר']
          : []),
      ].join(' | ');

      const heard =
        r.heardFrom === 'אחר' && r.heardFromOther
          ? `אחר: ${r.heardFromOther}`
          : r.heardFrom;

      const dtStr = r.submittedAt
        ? new Date(r.submittedAt).toLocaleString('he-IL', {
            timeZone: 'Asia/Jerusalem',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : '';

      const paidDtStr =
        r.paid && r.paidAt
          ? new Date(r.paidAt).toLocaleString('he-IL', {
              timeZone: 'Asia/Jerusalem',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '';

      return [
        dtStr,
        r.fullName,
        r.phone,
        r.email,
        String(r.age),
        r.maritalStatus,
        (r.childrenAges || []).join(' | '),
        r.trainsAtStudio,
        reasons,
        (r.curiousTopics || []).join(' | '),
        // Exact unmodified full text of Q10
        r.personalGift,
        heard,
        r.allergies || 'לא צוין',
        r.termsAccepted ? 'מאשרת' : 'לא',
        r.photoConsent ? 'מאשרת צילום ופרסום' : 'איני מאשרת צילום ופרסום',
        r.stayInTouchConsent ? 'כן, אשמח לעדכונים' : 'לא מעוניינת בעדכונים',
        r.paid ? 'שולם ✓' : 'ממתין לתשלום',
        paidDtStr,
      ];
    });

    return { headers, rows };
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) return;
    const { headers, rows } = buildTableData();
    const escapeCell = (val: string) => `"${(val || '').replace(/"/g, '""')}"`;
    const csvLines = [
      headers.map(escapeCell).join(','),
      ...rows.map((row) => row.map(escapeCell).join(',')),
    ];
    const blob = new Blob(['\uFEFF' + csvLines.join('\r\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `soul-training-registrations-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyForGoogleSheets = async () => {
    if (registrations.length === 0) return;
    const { headers, rows } = buildTableData();
    const sanitizeTSV = (val: string) => (val || '').replace(/[\t\r\n]+/g, ' ');
    const tsv = [
      headers.map(sanitizeTSV).join('\t'),
      ...rows.map((row) => row.map(sanitizeTSV).join('\t')),
    ].join('\n');
    await navigator.clipboard.writeText(tsv);
    setCopiedSheetsTable(true);
    setTimeout(() => setCopiedSheetsTable(false), 3000);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteSoulRegistration(id);
      if (selectedReg?.id === id) setSelectedReg(null);
      setDeleteConfirmId(null);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSetPaid = async (reg: SoulRegistration, nextPaid: boolean) => {
    setUpdatingPaidId(reg.id);
    try {
      const { paidAt } = await updateSoulRegistrationPayment(reg.id, nextPaid);
      setSelectedReg((prev) =>
        prev?.id === reg.id ? { ...prev, paid: nextPaid, paidAt } : prev
      );
    } finally {
      setUpdatingPaidId(null);
    }
  };

  const copyPaymentMessage = (reg: SoulRegistration) => {
    navigator.clipboard.writeText(buildPaymentWhatsAppMessage(reg));
    setCopiedPaymentMsgId(reg.id);
    setTimeout(() => setCopiedPaymentMsgId(null), 2500);
  };

  const copyWelcomeGift = (reg: SoulRegistration) => {
    navigator.clipboard.writeText(reg.personalGift);
    setCopiedGiftId(reg.id);
    setTimeout(() => setCopiedGiftId(null), 2500);
  };

  const copyAllDetails = (reg: SoulRegistration) => {
    const text = [
      `🌸 הרשמה לאימון לנשמה - ${reg.fullName}`,
      `סטטוס תשלום: ${reg.paid ? 'שולם ושוריין ✓' : 'ממתין לתשלום'}`,
      `טלפון: ${reg.phone} | אימייל: ${reg.email} | גיל: ${reg.age}`,
      `מצב משפחתי: ${reg.maritalStatus}`,
      `גילאי ילדים: ${(reg.childrenAges || []).join(', ')}`,
      `מתאמנת בסטודיו: ${reg.trainsAtStudio}`,
      `סיבות הצטרפות: ${(reg.joinReasons || []).join(', ')}${reg.joinReasonsOther ? ` (${reg.joinReasonsOther})` : ''}`,
      `נושאים מובילים: ${(reg.curiousTopics || []).join(', ')}`,
      `תשובה מלאה לשאלה 10 (ערכת וולקאם):\n${reg.personalGift}`,
      `איך שמעה: ${reg.heardFrom}${reg.heardFromOther ? ` (${reg.heardFromOther})` : ''}`,
      `אלרגיות ורגישויות: ${reg.allergies || 'לא צוין'}`,
      `אישור צילום ופרסום: ${reg.photoConsent ? 'מאשרת' : 'אינה מאשרת'}`,
      `הסכמה לעדכונים: ${reg.stayInTouchConsent ? 'מעוניינת בעדכונים' : 'לא מעוניינת'}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopiedId(reg.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Export & Stats Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#0E7490]/25 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#0E7490] text-white text-xs font-black">
              אימון לנשמה
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {registrations.length} {registrations.length === 1 ? 'נרשמת' : 'נרשמות'} בטופס ההרשמה
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold text-slate-600">
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full font-black">
              <CreditCard className="w-3.5 h-3.5" />
              שילמו ושוריינו: {paidCount} מתוך {registrations.length}
            </span>
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
              <Camera className="w-3.5 h-3.5" />
              מאשרות צילום: {photoYesCount} מתוך {registrations.length}
            </span>
            <span className="inline-flex items-center gap-1 bg-cyan-50 text-[#0E7490] border border-[#0E7490]/25 px-2.5 py-1 rounded-full">
              <Bell className="w-3.5 h-3.5" />
              מעוניינות בעדכונים: {updatesYesCount} מתוך {registrations.length}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportCSV}
            disabled={registrations.length === 0}
            className="inline-flex items-center gap-2 bg-[#0E7490] hover:bg-[#0891B2] disabled:opacity-50 text-white px-4 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>ייצוא לטבלה (CSV ל-Google Sheets / Excel)</span>
          </button>

          <button
            type="button"
            onClick={handleCopyForGoogleSheets}
            disabled={registrations.length === 0}
            className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-50 text-emerald-800 border border-emerald-300 px-4 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer"
          >
            {copiedSheetsTable ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>הטבלה הועתקה! הדביקי ב-Google Sheets</span>
              </>
            ) : (
              <>
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>העתקה להדבקה ב-Google Sheets</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="חיפוש נרשמת לפי שם, טלפון, נושא או תשובה..."
          className="w-full pr-10 pl-4 py-2.5 rounded-full border border-brand-beige bg-white text-sm focus:outline-none focus:border-[#0E7490] text-right shadow-2xs"
        />
        <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-brand-beige p-8">
          <div className="w-16 h-16 bg-[#0E7490]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0E7490]">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-1">
            {searchTerm ? 'לא נמצאו נרשמות תואמות לחיפוש' : 'עדיין אין נרשמות בשאלון אימון לנשמה'}
          </h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            כל משתתפת שתמלא את טופס ההרשמה בתחתית דף הנחיתה של &quot;אימון לנשמה&quot; תופיע כאן מיד עם כל 15 התשובות וייצוא ישיר לטבלה.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* List */}
          <div className="lg:col-span-6 space-y-3">
            {filtered.map((reg) => {
              const isSelected = selectedReg?.id === reg.id;
              const formattedDate = new Date(reg.submittedAt).toLocaleString('he-IL', {
                timeZone: 'Asia/Jerusalem',
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={reg.id}
                  onClick={() => setSelectedReg(reg)}
                  className={`bg-white p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-xs hover:shadow-md ${
                    isSelected
                      ? 'border-[#0E7490] ring-2 ring-[#0E7490]/20'
                      : 'border-brand-beige hover:border-[#0E7490]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-base sm:text-lg text-slate-900">{reg.fullName}</h4>
                        <span className="text-xs font-bold text-[#0E7490] bg-[#0E7490]/10 px-2 py-0.5 rounded-full">
                          גיל {reg.age}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400 flex items-center gap-1 font-mono mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>{formattedDate}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`https://api.whatsapp.com/send?phone=972${reg.phone.replace(/\D/g, '').replace(/^0/, '')}&text=${encodeURIComponent(
                          `היי ${reg.fullName}, איזה כיף שהצטרפת ל"אימון לנשמה"! 🌸`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                        title="וואטסאפ"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${reg.phone}`}
                        className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                        title="חיוג"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 mb-2.5">
                    <span className="font-bold text-gray-800 font-mono">{reg.phone}</span>
                    <span className="text-gray-500 font-mono truncate max-w-[200px]">{reg.email}</span>
                  </div>

                  {/* Quick Payment Status + Consent Pills */}
                  <div
                    className="flex flex-wrap items-center gap-1.5 mb-2.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {reg.paid ? (
                      <button
                        type="button"
                        onClick={() => handleSetPaid(reg, false)}
                        disabled={updatingPaidId === reg.id}
                        title="לחצי לביטול סימון תשלום"
                        className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full border bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
                      >
                        <Check className="w-3 h-3" />
                        <span>שולם ושוריין ✓</span>
                      </button>
                    ) : (
                      <a
                        href={buildPaymentWhatsAppUrl(reg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleSetPaid(reg, true)}
                        className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full border bg-amber-50 text-amber-900 border-amber-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all cursor-pointer shadow-2xs"
                        title="לחיצה מסמנת ✓ שולם ופותחת הודעת אישור תשלום ושריון מקום בווטסאפ"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>סמני ✓ שולם + שלחי ווטסאפ</span>
                      </a>
                    )}

                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                        reg.photoConsent
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {reg.photoConsent ? '📷 מאשרת צילום' : '🚫 לא מאשרת צילום'}
                    </span>
                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                        reg.stayInTouchConsent
                          ? 'bg-cyan-50 text-[#0E7490] border-[#0E7490]/30'
                          : 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}
                    >
                      {reg.stayInTouchConsent ? '🔔 מעוניינת בעדכונים' : 'ללא עדכונים'}
                    </span>
                    {reg.allergies && !reg.allergies.startsWith('אין') && (
                      <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full border bg-amber-50 text-amber-800 border-amber-300">
                        ⚠️ אלרגיה/רגישות
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-2">
                    <span className="font-bold text-[#C56B3E]">לערכת וולקאם: </span>
                    &quot;{reg.personalGift}&quot;
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-6">
            {selectedReg ? (
              <div className="bg-white p-6 rounded-3xl border border-[#0E7490]/25 shadow-sm sticky top-24 space-y-5">
                <div className="flex items-start justify-between gap-3 border-b border-brand-beige pb-4">
                  <div>
                    <span className="text-[11px] font-black text-white bg-[#0E7490] px-2.5 py-0.5 rounded-full">
                      שאלון הרשמה מלא (15 שאלות)
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1.5">
                      {selectedReg.fullName} (גיל {selectedReg.age})
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">
                      {new Date(selectedReg.submittedAt).toLocaleString('he-IL', {
                        timeZone: 'Asia/Jerusalem',
                      })}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyAllDetails(selectedReg)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-[#0E7490] bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-all cursor-pointer"
                  >
                    {copiedId === selectedReg.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">הועתק!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>העתקת כל התשובות</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Payment Confirmation & WhatsApp Reservation Box */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border-2 space-y-3 transition-all ${
                    selectedReg.paid
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-amber-50/60 border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={Boolean(selectedReg.paid)}
                        disabled={updatingPaidId === selectedReg.id}
                        onChange={(e) => handleSetPaid(selectedReg, e.target.checked)}
                        className="w-5 h-5 rounded accent-emerald-600 cursor-pointer"
                      />
                      <span className="text-sm font-black text-slate-900">
                        {selectedReg.paid
                          ? `תשלום אושר ומקום שוריין עבור ${selectedReg.fullName}`
                          : 'סמני ✓ לאחר קבלת תשלום בפייבוקס'}
                      </span>
                    </label>
                    {selectedReg.paid && selectedReg.paidAt && (
                      <span className="text-[11px] font-mono text-emerald-700 font-bold">
                        {new Date(selectedReg.paidAt).toLocaleString('he-IL', {
                          timeZone: 'Asia/Jerusalem',
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={buildPaymentWhatsAppUrl(selectedReg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (!selectedReg.paid) handleSetPaid(selectedReg, true);
                      }}
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black px-4 py-2.5 rounded-full shadow-xs transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>
                        {selectedReg.paid
                          ? `שליחת הודעת שריון מקום ל${getFirstName(selectedReg.fullName)} בווטסאפ`
                          : `✓ סמני שולם + שלחי ווטסאפ ל${getFirstName(selectedReg.fullName)}`}
                      </span>
                    </a>

                    <button
                      type="button"
                      onClick={() => copyPaymentMessage(selectedReg)}
                      className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold px-3.5 py-2 rounded-full transition-all cursor-pointer"
                    >
                      {copiedPaymentMsgId === selectedReg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">נוסח ההודעה הועתק!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>העתקת נוסח ההודעה</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Question 10 Highlight for Welcome Kit */}
                <div className="bg-gradient-to-br from-[#FFF4EB] to-white p-4 rounded-2xl border-2 border-[#C56B3E]/30 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#C56B3E]">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      שאלה 10 — מסר אישי לערכת הוולקאם (נשמר במלואו):
                    </span>
                    <button
                      type="button"
                      onClick={() => copyWelcomeGift(selectedReg)}
                      className="text-[11px] font-black px-2.5 py-1 rounded-full bg-white border border-[#C56B3E]/30 text-[#C56B3E] hover:bg-[#C56B3E] hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedGiftId === selectedReg.id ? 'הועתק!' : 'העתקה לוולקאם'}
                    </button>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedReg.personalGift}
                  </p>
                </div>

                {/* All 14 Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-gray-500 block">טלפון נייד</span>
                    <a href={`tel:${selectedReg.phone}`} className="font-mono font-bold text-[#0E7490]">
                      {selectedReg.phone}
                    </a>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-gray-500 block">כתובת דוא&quot;ל</span>
                    <a href={`mailto:${selectedReg.email}`} className="font-mono text-[#0E7490] break-all">
                      {selectedReg.email}
                    </a>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-gray-500 block">5. מצב משפחתי</span>
                    <span className="font-bold text-slate-800">{selectedReg.maritalStatus}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-gray-500 block">7. מתאמנת בסטודיו?</span>
                    <span className="font-bold text-slate-800">{selectedReg.trainsAtStudio}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 sm:col-span-2">
                    <span className="text-[11px] text-gray-500 block mb-1">6. גילאי הילדים</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(selectedReg.childrenAges || []).map((c, i) => (
                        <span key={i} className="bg-white border border-slate-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 sm:col-span-2">
                    <span className="text-[11px] text-gray-500 block mb-1">8. מה גרם לרצות להצטרף?</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700 font-medium">
                      {(selectedReg.joinReasons || []).map((r, i) => (
                        <li key={i}>
                          {r}
                          {r === 'אחר' && selectedReg.joinReasonsOther ? `: ${selectedReg.joinReasonsOther}` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 sm:col-span-2">
                    <span className="text-[11px] text-gray-500 block mb-1">9. נושאים מסקרנים (עד 2)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(selectedReg.curiousTopics || []).map((t, i) => (
                        <span key={i} className="bg-[#C56B3E]/15 text-[#C56B3E] px-2.5 py-0.5 rounded-full text-xs font-black">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 sm:col-span-2">
                    <span className="text-[11px] text-gray-500 block">11. איך שמעה על הסדרה</span>
                    <span className="font-bold text-slate-800">
                      {selectedReg.heardFrom}
                      {selectedReg.heardFrom === 'אחר' && selectedReg.heardFromOther
                        ? `: ${selectedReg.heardFromOther}`
                        : ''}
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border sm:col-span-2 ${
                    selectedReg.allergies && !selectedReg.allergies.startsWith('אין')
                      ? 'bg-amber-50 border-amber-300'
                      : 'bg-slate-50 border-slate-100'
                  }`}>
                    <span className="text-[11px] text-gray-500 block">12. אלרגיות ורגישויות למזון</span>
                    <span className="font-bold text-slate-900">
                      {selectedReg.allergies || 'לא צוין'}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-gray-500 block">14. אישור צילום ופרסום</span>
                    <span className={`font-black ${selectedReg.photoConsent ? 'text-emerald-700' : 'text-red-700'}`}>
                      {selectedReg.photoConsent ? 'מאשרת שימוש בתמונות' : 'אינה מאשרת שימוש בתמונות'}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-gray-500 block">15. להישאר בקשר (עדכונים)</span>
                    <span className="font-black text-[#0E7490]">
                      {selectedReg.stayInTouchConsent ? 'מעוניינת בעדכונים' : 'לא מעוניינת בעדכונים'}
                    </span>
                  </div>
                </div>

                {/* Delete */}
                <div className="pt-3 border-t border-brand-beige flex justify-end">
                  {deleteConfirmId === selectedReg.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-600 font-bold">בטוחה שברצונך למחוק הרשמה זו?</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(selectedReg.id)}
                        disabled={deletingId === selectedReg.id}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        כן, מחקי
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(null)}
                        className="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        ביטול
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(selectedReg.id)}
                      className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>מחיקת הרשמה זו</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-3xl border border-dashed border-brand-beige text-center text-gray-400 py-20">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#0E7490]" />
                <p className="font-bold text-sm text-gray-500">
                  בחרי נרשמת מהרשימה לצפייה בכל 15 התשובות (כולל אלרגיות, המסר לערכת הוולקאם ואישורי הצילום והעדכונים)
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
