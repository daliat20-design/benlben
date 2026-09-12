import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle } from 'lucide-react';
import { MWM_CONTACTS } from '../../constants';

export interface WhatsAppContactItem {
  name: string;
  role?: string;
  phone: string;
  rawPhone: string;
  internationalPhone: string;
  message: string;
}

interface WhatsAppContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts?: WhatsAppContactItem[];
  title?: string;
  subtitle?: string;
  footerNote?: string;
}

export const WhatsAppContactModal: React.FC<WhatsAppContactModalProps> = ({ 
  isOpen, 
  onClose,
  contacts = MWM_CONTACTS,
  title = 'לשיחה עם מובילות MWM כיצ"י',
  subtitle = 'מוזמנת לפנות ישירות בוואטסאפ לכל שאלה או התלבטות:',
  footerNote = 'צוות "בין לבין" • כוכב יאיר - צור יגאל'
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2.5rem] p-6 md:p-8 max-w-md w-full shadow-2xl border-2 border-brand-orange/30 text-center space-y-6 relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 left-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
              aria-label="סגירה"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 pt-2">
              <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto shadow-inner border border-[#25D366]/20">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-brand-green">
                {title}
              </h3>
              <p className="text-sm font-bold text-gray-500">
                {subtitle}
              </p>
            </div>

            {/* Contacts List */}
            <div className="space-y-3 pt-2">
              {contacts.map((contact) => (
                <a
                  key={contact.rawPhone}
                  href={`https://wa.me/${contact.internationalPhone}?text=${contact.message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center justify-between p-4 rounded-2xl bg-brand-cream/50 hover:bg-[#25D366] text-gray-800 hover:text-white border border-brand-beige hover:border-[#25D366] transition-all group shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="flex items-center gap-3 text-right">
                    <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-white/20 flex items-center justify-center text-[#25D366] group-hover:text-white transition-colors shadow-sm">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-brand-green group-hover:text-white transition-colors">
                        {contact.name}
                      </h4>
                      {contact.role && (
                        <p className="text-[11px] font-bold text-brand-orange group-hover:text-white/90 transition-colors">
                          {contact.role}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="text-xs font-black bg-white group-hover:bg-white/20 text-brand-green group-hover:text-white px-3 py-1.5 rounded-full transition-colors shadow-sm">
                    שליחת הודעה ←
                  </span>
                </a>
              ))}
            </div>

            {footerNote && (
              <div className="pt-2 text-xs font-bold text-brand-orange">
                {footerNote}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppContactModal;
