import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Phone, Mail, Calendar, MessageCircle, 
  Trash2, Search, ExternalLink, Copy, Check, Sparkles,
  Layers, ChevronDown, ChevronUp, AlertCircle
} from 'lucide-react';
import { 
  InquirySubmission, 
  subscribeToInquiries, 
  deleteInquiry 
} from '../utils/inquiryStorage';

export const InquiriesTab: React.FC = () => {
  const [inquiries, setInquiries] = useState<InquirySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<InquirySubmission | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToInquiries((items) => {
      setInquiries(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

  const cleanPhoneForWhatsApp = (rawPhone: string) => {
    let digits = rawPhone.replace(/\D/g, '');
    if (digits.startsWith('0')) {
      digits = '972' + digits.substring(1);
    }
    return digits;
  };

  return (
    <div className="space-y-6">
      {/* Header Bar with Search and Count */}
      <div className="bg-white p-6 rounded-3xl border border-brand-beige shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-brand-orange animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-black text-brand-green">
              פניות התעניינות מהאתר ({inquiries.length})
            </h2>
          </div>
          <p className="text-sm text-gray-600">
            מתעניינות שהשאירו פרטים בדפי הנחיתה של "בין לבין"
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="חיפוש לפי שם, טלפון, מייל או תוכנית..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 bg-brand-cream/40 rounded-xl border border-brand-beige text-sm text-gray-900 focus:outline-none focus:border-brand-green transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-brand-beige">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-600 font-bold">טוען פניות...</p>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-brand-beige shadow-sm">
          <Sparkles className="w-12 h-12 text-brand-orange mx-auto mb-3 opacity-60" />
          <h3 className="text-xl font-bold text-brand-green mb-1">
            {searchTerm ? 'לא נמצאו פניות התואמות את החיפוש' : 'עדיין אין פניות התעניינות'}
          </h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            {searchTerm
              ? 'נסי לשנות את מונח החיפוש'
              : 'כאשר גולשות ישאירו פרטים בטופס ההתעניינות בדפי הנחיתה, הן יופיעו כאן בזמן אמת.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredInquiries.map((inq) => {
            const formattedDate = new Date(inq.submittedAt).toLocaleDateString('he-IL', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });
            const waNumber = cleanPhoneForWhatsApp(inq.phone);
            const waText = encodeURIComponent(
              `היי ${inq.fullName}, שוחחנו בעקבות פנייתך ב"בין לבין" מרחבים לנשים, נשמח להכיר ולספר לך על המרחבים!`
            );
            const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${waText}`;

            return (
              <div
                key={inq.id}
                className="bg-white rounded-3xl p-6 border-2 border-brand-beige/80 hover:border-brand-green/50 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Top line: Name & Date */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-xl font-black text-brand-green">
                        {inq.fullName}
                      </h3>
                      <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                        <span>{formattedDate}</span>
                        {inq.source && (
                          <span className="bg-brand-cream px-2 py-0.5 rounded-full border border-brand-beige text-[11px] font-semibold text-brand-green">
                            {inq.source}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick actions: copy & delete */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => copyInquiryDetails(inq)}
                        title="העתקת פרטים"
                        className="p-2 rounded-xl text-gray-500 hover:text-brand-green hover:bg-brand-cream/50 transition-colors"
                      >
                        {copiedId === inq.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {deleteConfirmId === inq.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={deletingId === inq.id}
                            onClick={() => handleDelete(inq.id)}
                            className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors"
                          >
                            {deletingId === inq.id ? '...' : 'אישור מחיקה'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold"
                          >
                            ביטול
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(inq.id)}
                          title="מחיקת פנייה"
                          className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Phone & Email contact badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <a
                      href={`tel:${inq.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sm font-bold text-slate-800 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-orange" />
                      <span dir="ltr">{inq.phone}</span>
                    </a>

                    <a
                      href={`mailto:${inq.email}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sm font-bold text-slate-800 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-brand-green" />
                      <span dir="ltr">{inq.email}</span>
                    </a>
                  </div>

                  {/* Programs badges */}
                  <div className="mb-4">
                    <div className="text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-brand-orange" />
                      <span>תוכניות שמעניינות אותה:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {inq.programs && inq.programs.length > 0 ? (
                        inq.programs.map((prog, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-bold px-3 py-1 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20"
                          >
                            {prog}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">לא צוינו תוכניות ספציפיות</span>
                      )}
                    </div>
                  </div>

                  {/* Notes if present */}
                  {inq.notes && (
                    <div className="p-3.5 rounded-2xl bg-brand-cream/50 border border-brand-beige text-sm text-gray-800 mb-4 leading-relaxed">
                      <span className="font-bold text-brand-green block mb-1 text-xs">
                        כמה מילים מהפונה:
                      </span>
                      {inq.notes}
                    </div>
                  )}
                </div>

                {/* Bottom Action: WhatsApp button */}
                <div className="pt-2 border-t border-brand-beige/60">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>פתיחת שיחה בוואטסאפ עם {inq.fullName}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
