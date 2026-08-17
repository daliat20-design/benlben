
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div 
        className="absolute inset-0 bg-brand-green/40 backdrop-blur-md" 
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-4xl max-h-[80vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col animate-fade-in border border-brand-beige">
        <div className="p-6 md:p-8 border-b border-brand-beige flex justify-between items-center bg-brand-beige/20">
          <h2 className="text-2xl md:text-3xl font-black text-brand-green">{title}</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white shadow-sm border border-brand-beige flex items-center justify-center text-brand-green hover:bg-brand-orange hover:text-white transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-8 md:p-12 overflow-y-auto text-right text-gray-700 leading-relaxed font-medium">
          {children}
        </div>
        <div className="p-6 bg-brand-beige/10 border-t border-brand-beige text-center">
          <button 
            onClick={onClose}
            className="bg-brand-green text-white px-8 py-2 rounded-full font-bold hover:bg-brand-orange transition-all"
          >
            סגירה
          </button>
        </div>
      </div>
    </div>
  );
};

export const LegalModals: React.FC<{ 
  activeModal: 'terms' | 'privacy' | null; 
  closeModal: () => void; 
}> = ({ activeModal, closeModal }) => {
  return (
    <>
      {/* Terms of Use */}
      <Modal 
        isOpen={activeModal === 'terms'} 
        onClose={closeModal} 
        title="תקנון התוכנית ותנאי הרשמה"
      >
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-black text-brand-orange mb-3">1. כללי</h3>
            <p>השתתפות בתוכנית "בין לבין" (להלן: "התוכנית") מותנית בקבלת תנאי תקנון זה. התוכנית מופעלת על ידי הנהלת התוכנית.</p>
          </section>
          
          <section>
            <h3 className="text-xl font-black text-brand-orange mb-3">2. הרשמה</h3>
            <p>ההרשמה הראשונית לתוכנית מתבצעת באמצעות טופס הצטרפות. הבטחת המקום בתוכנית תתבצע לאחר שיחה אישית והסדרת הרישום מול צוות התוכנית.</p>
          </section>

          <section>
            <h3 className="text-xl font-black text-brand-orange mb-3">3. שינויים בתוכנית</h3>
            <p>הנהלת התוכנית שומרת לעצמה את הזכות לבצע שינויים בלוח הזמנים, בזהות המרצות או בתכנים במידת הצורך, תוך עדכון המשתתפות מראש ככל הניתן.</p>
          </section>

          <section>
            <h3 className="text-xl font-black text-brand-orange mb-3">4. קניין רוחני</h3>
            <p>חל איסור מוחלט על הקלטה, צילום או הפצה של חומרי הלימוד והתכנים המועברים במפגשים ללא אישור מפורש ובכתב מהנהלת התוכנית.</p>
          </section>
        </div>
      </Modal>

      {/* Privacy Policy */}
      <Modal 
        isOpen={activeModal === 'privacy'} 
        onClose={closeModal} 
        title="מדיניות פרטיות"
      >
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-black text-brand-orange mb-3">1. איסוף מידע</h3>
            <p>המידע הנאסף בטופס הצטרפות (שם, טלפון, אימייל) נועד ליצירת קשר ראשוני לצורך מתן פרטים על התוכנית בלבד.</p>
          </section>
          
          <section>
            <h3 className="text-xl font-black text-brand-orange mb-3">2. שימוש במידע</h3>
            <p>אנו משתמשים במידע שלך כדי לעדכן אותך בנוגע לרישום לתוכנית ובנוגע לאירועים ומפגשים עתידיים שלנו. תוכלו לבקש להסיר את עצמכם מרשימת התפוצה בכל עת.</p>
          </section>

          <section>
            <h3 className="text-xl font-black text-brand-orange mb-3">3. אבטחת מידע</h3>
            <p>אנו נוקטים באמצעי הזהירות המקובלים כדי להגן על המידע האישי שלך. המידע לא יועבר, יימכר או יושכר לצדדים שלישיים ללא הסכמתך המפורשת.</p>
          </section>

          <section>
            <h3 className="text-xl font-black text-brand-orange mb-3">4. קבצי עוגיות (Cookies)</h3>
            <p>האתר עשוי להשתמש בעוגיות לצורך שיפור חוויית המשתמש וסטטיסטיקות פנימיות בלבד.</p>
          </section>
        </div>
      </Modal>
    </>
  );
};
