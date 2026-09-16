import React from 'react';
import { Link } from 'react-router-dom';
import { ButterflyIcon } from '../ButterflyIcon';
import { 
  CheckCircle2, Sparkles, Clock, Users, Coffee, 
  GraduationCap, HeartHandshake, Video, ArrowLeft, MessageCircle, Gift, MessageSquare
} from 'lucide-react';
import { MWM_CONTACTS } from '../../constants';

export const MwmPricing: React.FC = () => {
  const includesList = [
    {
      icon: Clock,
      title: '8 מפגשים פרונטליים מלאים (3 שעות בכל מפגש)',
      desc: 'סה"כ 24 שעות של תוכן איכותי, העמקה, שיח פתוח וסדנאות מעשיות במרחב אינטימי ונעים.'
    },
    {
      icon: GraduationCap,
      title: 'הרצאות של מומחיות ומרצות מהשורה הראשונה',
      desc: 'מפגשים עם נשות מקצוע מובילות בתחומי גיל המעבר, שינה, מיניות וזוגיות, תזונה ודימוי גוף, סטיילינג וזכויות.'
    },
    {
      icon: Users,
      title: 'הובלה והנחיה מקצועית צמודה לאורך כל הדרך',
      desc: 'ליווי אישי וקבוצתי על ידי דלית כורה (הוגה ומובילת התוכניות) ואלסי זיסלמן (מנחה, מרצה וטריינרית NLP).'
    },
    {
      icon: MessageSquare,
      title: 'קבוצת ווטסאפ מלווה לתוכנית',
      desc: 'מרחב שיתוף, עדכונים, חיבור והמשך שיח תומך ומחבק בין המפגשים.'
    },
    {
      icon: Video,
      title: 'מפגש בונוס ייחודי בזום בנושא יפוי כח מתמשך',
      desc: 'הרצאה מעשית וחשובה שמועברת על ידי עורכת דין מומחית בתחום.'
    },
    {
      icon: Coffee,
      title: 'אירוח וכיבוד מפנק ועשיר',
      desc: 'אווירה חמה, מחבקת ומזמינה המאפשרת להתרווח ולהרגיש בבית.'
    },
    {
      icon: Gift,
      title: 'חומרים אישיים, הפתעות ועוד',
      desc: 'דפי עבודה, כלים יישומיים והפתעות קטנות ומרגשות שנבחרו עבורכן באהבה.'
    },
    {
      icon: HeartHandshake,
      title: 'מעטפת כלים מעשיים, תובנות ומרחב נשי מחבר',
      desc: 'הזדמנות אמיתית לעצור, להשקיע בעצמך, לגלות שאת לא לבד ולצאת עם תובנות וצעדים מעשיים לחיים.'
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white via-brand-cream/40 to-white px-4 md:px-6 relative overflow-hidden text-right">
      {/* Decorative Brand Butterflies */}
      <ButterflyIcon size={320} className="absolute -top-20 -right-20 animate-drift opacity-5 -z-10 hidden md:block" />
      <ButterflyIcon size={240} className="absolute bottom-10 -left-10 animate-float opacity-5 -z-10 hidden md:block" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-6 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-black mb-4 tracking-tight border border-brand-orange/20">
            השקעה בעצמך
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-brand-green tracking-tight mb-4">
            עלות התוכנית
          </h2>
          <div className="h-1.5 w-24 bg-brand-orange mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-2xl text-gray-700 font-bold max-w-2xl mx-auto leading-relaxed">
            מעטפת שלמה, מעמיקה ומקצועית שנבנתה במיוחד עבורך.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[3.5rem] border-2 border-brand-beige shadow-2xl overflow-hidden max-w-5xl mx-auto">
          
          {/* Top Banner with Price */}
          <div className="bg-gradient-to-r from-brand-green via-[#43523e] to-brand-green text-white p-8 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>
            <ButterflyIcon size={220} className="absolute -bottom-10 -left-10 opacity-10 text-white pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="text-center md:text-right space-y-2">
                <span className="inline-block bg-brand-orange text-white text-xs md:text-sm font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  תוכנית מקיפה ומלאה
                </span>
                <h3 className="text-3xl md:text-5xl font-black tracking-tight">
                  בין לבין - כוכב יאיר צור יגאל
                </h3>
                <p className="text-brand-cream/90 text-base md:text-lg font-medium">
                  8 מפגשי עומק + מפגש בונוס בזום + אירוח וכיבוד מלא
                </p>
              </div>

              {/* Price Tag Box */}
              <div className="bg-white text-brand-green p-6 md:p-8 rounded-[2.5rem] shadow-2xl border-4 border-brand-orange/30 text-center shrink-0 min-w-[260px] md:min-w-[280px]">
                <span className="text-xs md:text-sm font-black text-brand-orange block mb-1">
                  עלות התוכנית המלאה
                </span>
                <div className="flex items-baseline justify-center gap-1.5" dir="ltr">
                  <span className="text-5xl md:text-6xl font-black text-brand-green tracking-tight">
                    ₪1,350
                  </span>
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-500 block mt-1">
                  עבור כל מרכיבי התוכנית
                </span>
              </div>
            </div>
          </div>

          {/* Included Features Grid */}
          <div className="p-8 md:p-14 bg-brand-cream/20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-brand-green text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-2xl md:text-3xl font-black text-brand-green">
                מה את מקבלת בתוכנית?
              </h4>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {includesList.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx}
                    className="bg-white p-6 md:p-8 rounded-[2rem] border border-brand-beige shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange group-hover:bg-brand-green group-hover:text-white transition-colors flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                        <h5 className="text-lg md:text-xl font-black text-brand-green leading-snug">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Callout */}
            <div className="mt-12 pt-10 border-t border-brand-beige/80 flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 md:p-10 rounded-[2.5rem] border border-brand-beige shadow-md">
              <div className="text-center md:text-right space-y-1">
                <h5 className="text-xl md:text-2xl font-black text-brand-green">
                  רוצה להבטיח את מקומך?
                </h5>
                <p className="text-sm md:text-base text-gray-600 font-medium">
                  מילוי טופס "נעים להכיר" אינו מחייב ומאפשר לנו לחזור אלייך עם כל הפרטים.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <Link
                  to="/mwm-form"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-green hover:to-brand-lightGreen text-white px-8 py-4 rounded-full text-lg md:text-xl font-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-b-4 border-brand-orange/40"
                >
                  <span>למילוי טופס נעים להכיר</span>
                  <ArrowLeft className="w-5 h-5" />
                </Link>

                <a
                  href={`https://wa.me/${MWM_CONTACTS[0].internationalPhone}?text=${MWM_CONTACTS[0].message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-cream hover:bg-brand-beige/60 text-brand-green border-2 border-brand-beige px-6 py-4 rounded-full text-base font-black transition-all shadow-sm"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span>שאלה בוואטסאפ</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
