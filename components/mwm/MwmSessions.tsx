import React from 'react';
import { ButterflyIcon } from '../ButterflyIcon';
import { 
  Heart, 
  Users, 
  Activity, 
  Compass, 
  Sparkles, 
  Briefcase, 
  Flame, 
  Sun
} from 'lucide-react';

interface SessionTopic {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  accent?: boolean;
}

export const MwmSessions: React.FC = () => {
  const topics: SessionTopic[] = [
    {
      title: 'כשהגוף מתחיל לדבר אחרת',
      subtitle: 'השינויים הפיזיים והרגשיים באמצע החיים ובתקופת גיל המעבר',
      description: 'נבין טוב יותר מה עובר על הגוף, מה קורה לנו מבפנים ואיך אפשר לפגוש את השינוי עם יותר ידע, בהירות וקבלה.',
      icon: Heart,
    },
    {
      title: 'בין חיבוק לשחרור',
      subtitle: 'ילדים שגדלים, הורים שמתבגרים ואנחנו באמצע',
      description: 'ניגע בציר המשפחתי שמאפיין כל כך הרבה נשים בשלב הזה. ילדים שיוצאים לדרך עצמאית מצד אחד, הורים שזקוקים לנו יותר מצד שני, והשאלה איך שומרים גם על עצמנו בתוך כל זה.',
      icon: Users,
    },
    {
      title: 'להחזיר לעצמי כוח',
      subtitle: 'תזונה, תנועה והיחסים שלנו עם הגוף',
      description: 'נדבר על אנרגיה, תזונה, תנועה והגוף המשתנה. לא ממקום של מאבק, אלא מתוך הקשבה ובחירות קטנות שאפשר באמת לקחת לחיים.',
      icon: Activity,
    },
    {
      title: 'לבחור ממקום שלי',
      subtitle: 'בחירות, החלטות ומה נכון לי עכשיו',
      description: 'אחרי שנים שבהן הרבה מהבחירות שלנו קשורות גם לאחרים, נבדוק מה חשוב לנו היום, מה כבר פחות מתאים ומה אנחנו רוצות לבחור מחדש.',
      icon: Compass,
    },
    {
      title: 'ללמוד להקשיב לעצמי',
      subtitle: 'זהות, רצונות וקולות שנדחקו קצת הצידה',
      description: 'נעצור להקשיב למה שאנחנו רוצות, צריכות ומרגישות היום, גם אם התשובות שונות מאלה שהיו לנו לפני עשר או עשרים שנה.',
      icon: Sparkles,
      accent: true,
    },
    {
      title: 'מי אני עכשיו?',
      subtitle: 'קריירה, עשייה, משמעות והמשך הדרך',
      description: 'לא תמיד אנחנו רוצות לעשות מהפכה. לפעמים אנחנו פשוט רוצות לדייק. נבחן את הניסיון, היכולות והחוזקות שכבר צברנו ונשאל איך אנחנו רוצות שהעשייה שלנו תיראה בשנים הבאות.',
      icon: Briefcase,
      accent: true,
    },
    {
      title: 'מגע, מרחק ומה שביניהם',
      subtitle: 'זוגיות, אינטימיות וקרבה',
      description: 'מרחב לשיחה רגישה ופתוחה על זוגיות, תשוקה, דימוי גוף ואינטימיות בתקופה שבה גם אנחנו וגם מערכות היחסים שלנו משתנות.',
      icon: Flame,
      accent: true,
    },
    {
      title: 'לעצור ולראות את הדרך',
      subtitle: 'הכרת תודה, אושר ומשמעות',
      description: 'מפגש שמאפשר לאסוף את הדרך שעברנו יחד, לזהות מה אנחנו לוקחות איתנו ולתת מקום למה שכבר קיים בחיים שלנו לצד מה שעוד נרצה ליצור.',
      icon: Sun,
      accent: true,
    },
  ];

  return (
    <section id="sessions" className="py-24 bg-white px-4 md:px-6 relative overflow-hidden">
      <ButterflyIcon size={300} className="absolute top-20 -right-20 animate-drift opacity-[0.03] -z-10 hidden md:block" />
      <ButterflyIcon size={240} className="absolute bottom-20 -left-10 animate-float opacity-[0.03] -z-10 hidden md:block" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-6 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-black mb-4 tracking-tight border border-brand-orange/20">
            נושאי התוכנית
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-brand-green tracking-tight">
            טעימה מהתכנים שנפגוש
          </h2>
          <div className="h-1.5 w-24 bg-brand-orange mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            const isAccent = topic.accent;
            const iconBg = isAccent ? 'bg-brand-orange/15 text-brand-orange' : 'bg-brand-green/15 text-brand-green';
            const cardBorder = isAccent ? 'border-brand-orange/25 hover:border-brand-orange' : 'border-brand-beige hover:border-brand-green';

            return (
              <div 
                key={index}
                className={`bg-white rounded-[2.5rem] p-8 md:p-10 border-2 ${cardBorder} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between text-right`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl ${iconBg} shadow-sm`}>
                      <Icon size={28} />
                    </div>
                    <ButterflyIcon size={28} className="opacity-15 text-brand-green" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-brand-green mb-2">
                    {topic.title}
                  </h3>
                  <h4 className={`text-base md:text-lg font-bold mb-4 ${isAccent ? 'text-brand-orange' : 'text-brand-green/80'}`}>
                    {topic.subtitle}
                  </h4>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium">
                    {topic.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
