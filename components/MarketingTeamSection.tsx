
import React from 'react';
import { ButterflyIcon } from './ButterflyIcon';

const MARKETING_TEAM = [
  {
    name: "דלית כורה",
    role: "הוגה ומובילת התוכניות",
    paragraphs: [
      'מתמחה בהובלת פרויקטים, בפיתוח תוכניות ובתרגום רעיונות לתהליכים יישומיים, מדויקים וברורים. לאורך השנים צברה ניסיון בהובלת קהילות נשים, בפיתוח תוכן ובהפקת תוכניות ואירועים, מתוך היכרות עמוקה עם הדרך שבה תוכן, שיח וחוויה מתחברים לתהליך שלם.',
      'ב"בין לבין" דלית מחזיקה את התמונה הגדולה ואת הפרטים הקטנים, ומובילה את התוכניות משלב הרעיון, דרך הפיתוח והדיוק ועד למימוש.'
    ]
  },
  {
    name: "אלסי זיסלמן",
    role: "מנחה ומרצה, טריינרית NLP",
    paragraphs: [
      'מלווה תהליכים אישיים וקבוצתיים של שינוי, התבוננות וקבלת החלטות. בעלת ניסיון בהנחיית קבוצות ובעבודה עם נשים, ומביאה לתוכניות כלים מעולם ה־NLP לצד יכולת להוביל שיח שמאפשר להתבונן, לדייק ולנוע קדימה.',
      'ב"בין לבין" אלסי מובילה את תהליכי ההתבוננות והשיח, ומסייעת לנשים לתרגם תובנות לבחירות ולצעדים מעשיים.'
    ]
  }
];

export const MarketingTeamSection: React.FC = () => {
  return (
    <section id="marketing-team" className="pt-24 pb-24 bg-brand-beige/40 px-6 relative overflow-hidden text-right">
      <ButterflyIcon size={160} className="absolute bottom-10 right-10 animate-float opacity-5" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20 md:mb-24">
          <h2 className="text-5xl md:text-8xl font-black text-brand-green text-center tracking-tighter leading-none mb-12 drop-shadow-sm">
            הצוות שמאחורי הקלעים
          </h2>
          <div className="h-2.5 w-48 bg-brand-orange mx-auto rounded-full shadow-inner" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-14 max-w-5xl mx-auto">
          {MARKETING_TEAM.map((member, idx) => (
            <div key={idx} className="group relative flex flex-col text-right p-10 md:p-14 bg-white rounded-[3.5rem] shadow-[0_20px_60px_rgba(84,99,79,0.06)] border-t-8 border-brand-green hover:border-brand-orange transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 overflow-hidden">
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-3xl font-black text-brand-green mb-3 group-hover:text-brand-orange transition-colors duration-500">{member.name}</h3>
                <div className="inline-block self-start px-5 py-2 bg-brand-beige rounded-full text-brand-green font-black text-sm mb-8 border border-brand-green/10 shadow-sm">
                  {member.role}
                </div>
                <div className="w-16 h-1.5 bg-brand-orange mb-8 rounded-full group-hover:w-full transition-all duration-1000 ease-in-out"></div>
                <div className="space-y-4 text-gray-700 leading-relaxed text-lg md:text-xl font-medium opacity-90">
                  {member.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
