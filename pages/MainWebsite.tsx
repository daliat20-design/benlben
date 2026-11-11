import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  Crown, 
  Menu, 
  X, 
  MessageCircle, 
  Send,
  Users,
  Compass,
  Sun,
  Tent,
  Flower2,
  Quote,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Grid,
  Layers,
  PhoneCall,
  Check,
  MoveHorizontal,
  Building2,
  User,
  Share2
} from 'lucide-react';
import { ButterflyIcon } from '../components/Hero';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { BrandGallerySlider } from '../components/BrandGallerySlider';
import { saveInquiry } from '../utils/inquiryStorage';
import { FlowTripsTitle } from '../utils/brandPrograms';

const MAIN_BRAND_LOGO_URL = "/logos/brand-main.webp";
const MAIN_BRAND_LOGO_FALLBACK = "/logos/brand-main.png";

const DALIT_PHOTO_URL = "https://i.postimg.cc/TPYf2twq/DSC-3250.jpg";
const ELSIE_PHOTO_URL = "https://i.postimg.cc/fbc302jS/Whats-App-Image-2026-09-14-at-11-31-04.jpg";

export const FLOWTRIPS_LOGO_URL = "https://i.postimg.cc/D0CqwDT0/ms'-nsy-bsqy'h-tht-flow-Trip.png";

interface WebsiteProduct {
  id: string;
  name: string;
  nameNode?: React.ReactNode;
  tabSubtitle: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  tabInactiveStyle: string;
  tabActiveStyle: string;
  hook: string;
  bodyParagraphs: string[];
  ctaPrompt?: string;
  ctaPromptNode?: React.ReactNode;
  actionButtonText?: string;
  actionButtonNode?: React.ReactNode;
  logoUrl?: string;
  logoFallback?: string;
  icon?: React.ComponentType<{ className?: string }>;
  link: string;
  accentColor: string;
  borderStyle: string;
  buttonStyle: string;
  cardBg: string;
  isFlagship?: boolean;
}

// 4 תוכניות לנשים
export const WOMEN_PROGRAMS: WebsiteProduct[] = [
  {
    id: 'midlife',
    name: 'אמצע החיים',
    tabSubtitle: 'סדנת הדגל | נשים 45-60',
    subtitle: 'סדנת הדגל | נשים 45–60',
    tag: 'סדנת הדגל • נשים 45–60',
    tagColor: 'bg-brand-orange text-white',
    tabInactiveStyle: 'bg-[#FFF3EB] text-[#C56B3E] border-2 border-[#C56B3E] hover:bg-[#FFE5D2] shadow-xs',
    tabActiveStyle: 'bg-[#C56B3E] text-white border-2 border-[#9F4F24] shadow-md scale-102 ring-2 ring-offset-2 ring-[#C56B3E]',
    hook: 'את נכנסת לחדר ולא זוכרת למה. מתעוררת בשלוש בלילה עם רשימת משימות. רגע, מתי כל זה התחיל?',
    bodyParagraphs: [
      'גיל המעבר מביא איתו הרבה יותר מגלי חום, ולא תמיד ברור מה קשור למה. לפעמים את אפילו לא בטוחה אם זו את, הגיל או סתם תקופה עמוסה במיוחד.',
      'בשישה מפגשים (המחולקים ל-3 מפגשים בכל חלק) נעשה סדר בשינויים, ננפץ כמה מיתוסים, נדבר גם על הדברים שפחות נעים לשאול ונגלה מה באמת אפשר לעשות כדי להרגיש טוב יותר.',
      'ניתן להירשם לחלק הראשון, לחלק השני או לתוכנית כולה – והתכנים והמרצות בכל מחזור מותאמים לאופי הקבוצה מתוך מניפת התכנים ונבחרת מרצות הבית שלנו.'
    ],
    ctaPrompt: 'רוצה להבין מה עובר עלייך ? לחצי פה לפרטים על התוכנית',
    actionButtonText: 'רוצה להבין מה עובר עלייך ? לחצי פה לפרטים על התוכנית',
    logoUrl: '/logos/midlife.webp',
    logoFallback: '/logos/midlife.png',
    link: '/midlife-workshop?from=programs',
    accentColor: '#C56B3E',
    borderStyle: 'border-2 border-brand-orange/60 shadow-[0_10px_35px_rgba(197,107,62,0.12)] hover:border-brand-orange hover:shadow-xl',
    buttonStyle: 'bg-gradient-to-r from-[#C56B3E] to-[#B85D19] hover:from-[#B85D19] hover:to-[#93542B] text-white',
    cardBg: 'bg-gradient-to-b from-[#fffbf7] via-[#fff7ef] to-[#ffeedd]',
    isFlagship: true,
  },
  {
    id: 'ahead-of-you',
    name: 'עוד לפנייך',
    tabSubtitle: 'תוכנית לנשים 60+',
    subtitle: 'תוכנית לנשים 60+',
    tag: 'תוכנית לנשים 60+',
    tagColor: 'bg-[#b23a5f] text-white',
    tabInactiveStyle: 'bg-[#FDF2F5] text-[#b23a5f] border-2 border-[#b23a5f] hover:bg-[#FCE1E8] shadow-xs',
    tabActiveStyle: 'bg-[#b23a5f] text-white border-2 border-[#831f3e] shadow-md scale-102 ring-2 ring-offset-2 ring-[#b23a5f]',
    hook: 'כבר עשית כל כך הרבה בחיים. אבל מתי בפעם האחרונה עשית משהו בפעם הראשונה?',
    bodyParagraphs: [
      'יש דברים שאת כבר יודעת על עצמך היטב. אבל אולי יש גם רצונות חדשים, שאלות שלא שאלת ואפשרויות שעוד לא יצא לך לבדוק. מי אמר שבגיל הזה כבר קשה להפתיע אותך?',
      'חמישה מפגשים עם תוכן מקצועי, התנסויות מפתיעות ושיחות שלא תמיד יוצא לנהל ביומיום. הזדמנות לפגוש נשים חדשות, להסתקרן מחדש ואולי לגלות שיש בך עוד צדדים שלא ממש הכרת.'
    ],
    ctaPrompt: 'לחצי לגלות מה עוד לפנייך',
    actionButtonText: 'לחצי לגלות מה עוד לפנייך',
    logoUrl: '/logos/ahead-of-you.webp',
    logoFallback: '/logos/ahead-of-you.png',
    link: '/p/ahead-of-you?from=programs',
    accentColor: '#b23a5f',
    borderStyle: 'border-2 border-[#b23a5f]/40 hover:border-[#b23a5f] shadow-[0_8px_30px_rgba(178,58,95,0.08)] hover:shadow-xl',
    buttonStyle: 'bg-[#b23a5f] hover:bg-[#8f2847] text-white',
    cardBg: 'bg-gradient-to-b from-[#ffffff] via-[#fffbfc] to-[#fcedf0]',
  },
  {
    id: 'movement-180',
    name: 'עד 180°',
    tabSubtitle: 'סדנת שינוי חוויתית',
    subtitle: 'סדנא תהליכית חוויתי לשינוי',
    tag: 'סדנא תהליכית חוויתי לשינוי',
    tagColor: 'bg-[#204C8E] text-white',
    tabInactiveStyle: 'bg-[#EFF5FC] text-[#204C8E] border-2 border-[#204C8E] hover:bg-[#DDE9F8] shadow-xs',
    tabActiveStyle: 'bg-[#204C8E] text-white border-2 border-[#143564] shadow-md scale-102 ring-2 ring-offset-2 ring-[#204C8E]',
    hook: 'כמה פעמים כבר אמרת לעצמך "יום אחד אני אעשה את זה"? ומה קרה מאז?',
    bodyParagraphs: [
      'אולי זה רעיון שמסתובב לך בראש כבר שנים. אולי משהו שהתחלת וזנחת, או שינוי שאת יודעת שאת רוצה, אבל איכשהו תמיד יש משהו דחוף יותר.',
      'בשלושה מפגשים מעשיים נברר מה את באמת רוצה, נזהה מה משאיר אותך במקום ונמצא דרך להפוך את הרצון לצעדים שאפשר להתחיל לעשות. לא צריך להפוך את כל החיים. לפעמים מספיק להתחיל להזיז משהו אחד.'
    ],
    ctaPrompt: 'אולי הגיע הזמן להזיז משהו ? לחצי פה לפרטים',
    actionButtonText: 'אולי הגיע הזמן להזיז משהו ? לחצי פה לפרטים',
    logoUrl: '/logos/up-to-180.webp',
    logoFallback: '/logos/up-to-180.png',
    link: '/p/up-to-180?from=programs',
    accentColor: '#204C8E',
    borderStyle: 'border-2 border-[#204C8E]/40 hover:border-[#204C8E] shadow-[0_8px_30px_rgba(32,76,142,0.1)] hover:shadow-xl',
    buttonStyle: 'bg-[#204C8E] hover:bg-[#183a6d] text-white',
    cardBg: 'bg-gradient-to-b from-[#f8faff] via-[#f0f4fc] to-[#e8effa]',
  },
  {
    id: 'flowtrips',
    name: 'FLOWTRIPS',
    nameNode: <span dir="ltr" className="inline-block font-black">FLOWTRIPS</span>,
    tabSubtitle: 'חוויות דרך וריטרטים',
    subtitle: 'חוויות דרך וריטרטים',
    tag: 'חוויות דרך וריטרטים',
    tagColor: 'bg-[#d97706] text-white',
    tabInactiveStyle: 'bg-[#FFFBEB] text-[#b45309] border-2 border-[#d97706] hover:bg-[#FEF3C7] shadow-xs',
    tabActiveStyle: 'bg-[#d97706] text-white border-2 border-[#92400e] shadow-md scale-102 ring-2 ring-offset-2 ring-[#d97706]',
    hook: 'חוויה שבונה את הדרך שלך – FlowTrips וריטריטים לנשים מבית בין לבין.',
    bodyParagraphs: [
      'יש יציאות מהשגרה שנועדו בעיקר לשינוי אווירה. יש חוויות שנותנות לנו הרבה יותר מזה.',
      'ב"בין לבין" אנחנו יוצרות FlowTrips וריטריטים לנשים, שנבנים מתוך חיבור בין תוכן, תנועה, מפגשים, טבע, התנסויות, זמן לעצמך והרבה מקום גם להנאה.',
      'לפעמים זה FlowTrip – חוויית דרך בתנועה שעוברת בין מקומות, אנשים וטעמים; לפעמים זה ריטריט שמאפשר לעצור, לשהות ולהעמיק במקום אחד. חוויה שבונה את הדרך שלך.'
    ],
    ctaPrompt: 'בואי לגלות מה זה FLOWTRIPS וריטריטים',
    ctaPromptNode: (
      <span>
        בואי לגלות מה זה <FlowTripsTitle />
      </span>
    ),
    actionButtonText: 'בואי לגלות מה זה FLOWTRIPS וריטריטים',
    actionButtonNode: (
      <span>
        בואי לגלות מה זה <FlowTripsTitle />
      </span>
    ),
    logoUrl: FLOWTRIPS_LOGO_URL,
    link: '/p/flowtrips?from=programs',
    accentColor: '#d97706',
    borderStyle: 'border-2 border-amber-400/50 hover:border-amber-500 shadow-[0_8px_30px_rgba(217,119,6,0.1)] hover:shadow-xl',
    buttonStyle: 'bg-amber-600 hover:bg-amber-700 text-white',
    cardBg: 'bg-gradient-to-b from-[#fffefc] via-[#fffbf2] to-[#fef3c7]/40',
  },
];

// 2 תוכניות לקהילות ולארגונים (היילייטס ראשון כפי שהוגדר)
export const ORG_PROGRAMS: WebsiteProduct[] = [
  {
    id: 'highlights',
    name: 'היילייטס',
    tabSubtitle: 'לארגונים',
    subtitle: 'לארגונים',
    tag: 'ארגונים ומקומות עבודה (B2B)',
    tagColor: 'bg-[#204c8e] text-white',
    tabInactiveStyle: 'bg-[#EFF4F9] text-[#1e3d59] border-2 border-[#1e3d59] hover:bg-[#DFEAF3] shadow-xs',
    tabActiveStyle: 'bg-[#1e3d59] text-white border-2 border-[#112435] shadow-md scale-102 ring-2 ring-offset-2 ring-[#1e3d59]',
    hook: 'סדנאות ומפגשי תוכן מעצימים לנשים בעולם העבודה.',
    bodyParagraphs: [
      'תוכנית פיתוח ייחודית לארגונים, חברות ואירועי רווחה והעשרה. חיבור בין ניסיון חיים, נוכחות אישית וכלים מעשיים להובלה והשפעה בעולם העבודה המשתנה.'
    ],
    ctaPrompt: 'רוצים להאיר את ההייליטס אצלכם בארגון ? לחצו פה',
    actionButtonText: 'רוצים להאיר את ההייליטס אצלכם בארגון ? לחצו פה',
    logoUrl: '/logos/highlights.webp',
    logoFallback: '/logos/highlights.png',
    link: '/p/highlights?from=programs',
    accentColor: '#204c8e',
    borderStyle: 'border-2 border-[#204c8e]/30 hover:border-[#204c8e] shadow-[0_8px_30px_rgba(32,76,142,0.08)] hover:shadow-xl',
    buttonStyle: 'bg-[#204c8e] hover:bg-[#183a6d] text-white',
    cardBg: 'bg-gradient-to-b from-[#f9fafc] via-[#f1f4f9] to-[#e4eaf3]',
  },
  {
    id: 'the-tent',
    name: 'האוהל',
    tabSubtitle: 'מנהיגות בקהילות',
    subtitle: 'מנהיגות בקהילות',
    tag: 'מוכוון קהילות ויישובים',
    tagColor: 'bg-[#a8672a] text-white',
    tabInactiveStyle: 'bg-[#FBF6F0] text-[#a8672a] border-2 border-[#a8672a] hover:bg-[#F5E8DC] shadow-xs',
    tabActiveStyle: 'bg-[#a8672a] text-white border-2 border-[#734316] shadow-md scale-102 ring-2 ring-offset-2 ring-[#a8672a]',
    hook: 'מהכוחות והעוגנים הפנימיים אל יוזמה, הובלה ועשייה משותפת בקהילה.',
    bodyParagraphs: [
      'המרחב הקהילתי של בין לבין. התאמה ייחודית של סדנאות ומפגשים ליישובים, עיריות, מתנ״סים וקבוצות נשים מקומיות, המחברות בין חוכמת החיים האישית לתנועה משותפת ויוזמה מקומית.'
    ],
    ctaPrompt: 'לחצי פה לפרטים וליצירת מרחב בקהילה שלך',
    actionButtonText: 'לחצי פה לפרטים וליצירת מרחב בקהילה שלך',
    logoUrl: '/logos/the-tent.webp',
    logoFallback: '/logos/the-tent.png',
    link: '/p/the-tent?from=programs',
    accentColor: '#a8672a',
    borderStyle: 'border-2 border-[#a8672a]/30 hover:border-[#a8672a] shadow-[0_8px_30px_rgba(168,103,42,0.08)] hover:shadow-xl',
    buttonStyle: 'bg-[#a8672a] hover:bg-[#8c5421] text-white',
    cardBg: 'bg-gradient-to-b from-[#fffcf9] via-[#fdf7f0] to-[#f7ece0]',
  },
];

export const WEBSITE_PRODUCTS: WebsiteProduct[] = [...WOMEN_PROGRAMS, ...ORG_PROGRAMS];

interface WebsiteTestimonial {
  id: string;
  quote: string;
  author: string;
  program: string;
  programColor: string;
}

const WEBSITE_TESTIMONIALS: WebsiteTestimonial[] = [
  {
    id: '1',
    quote: "לקחתי איתי את האהבה, מאור הפנים, החברויות החדשות, התכנים והידע, ובעיקר את הרצון להמשיך ולממש את היכולות שלי וליהנות מהדרך.",
    author: "ענבל ס'",
    program: "סדנת אמצע החיים",
    programColor: "bg-[#C56B3E]/10 text-[#C56B3E] border-[#C56B3E]/30"
  },
  {
    id: '2',
    quote: "סדנה מושקעת, חווייתית ומוצלחת שהשאירה טעם של עוד. חברותא מעולה וצוות מדהים שפותח את הלב ונותן מקום אמיתי לכל אחת.",
    author: "איילת",
    program: "סדנת הדגל",
    programColor: "bg-[#2D5043]/10 text-[#2D5043] border-[#2D5043]/30"
  },
  {
    id: '3',
    quote: "הסדנה הייתה מעשירה, מעניינת, מחברת ומלאת ידע. המרצות היו מרתקות ומחוברות לגיל ולמצב, והמנחות פשוט מקסימות ומעוררות השראה.",
    author: "לימור",
    program: "סדנת אמצע החיים",
    programColor: "bg-[#204C8E]/10 text-[#204C8E] border-[#204C8E]/30"
  },
  {
    id: '4',
    quote: "למדתי שאני לא לבד בתהליך הזה. פגשתי נשים מקסימות וחמות, חיכיתי בכל פעם מחדש למפגש הבא. קיבלתי עוגנים ומשמעות עמוקה.",
    author: "ענת י'",
    program: "עוֹד לְפָנַיִךְ (60+)",
    programColor: "bg-[#b23a5f]/10 text-[#b23a5f] border-[#b23a5f]/30"
  },
  {
    id: '5',
    quote: "המרחב שדלית ואלסי יצרו אפשר לי לנשום באמת, לשחרר את העומס של היומיום ולחזור לעצמי עם אנרגיות חדשות, שקט פנימי וחיבור עמוק.",
    author: "שרון ק'",
    program: "FLOWTRIPS וריטריטים",
    programColor: "bg-amber-600/10 text-amber-700 border-amber-600/30"
  },
  {
    id: '6',
    quote: "ההשקעה הורגשה בכל התחומים: המיקום הנעים, הכיבוד המפנק, הנושאים הכי רלוונטיים וההרצאות המצוינות. מקום בטוח, מקצועי ומאפשר.",
    author: "אנונימית",
    program: "סדנת אמצע החיים",
    programColor: "bg-[#C56B3E]/10 text-[#C56B3E] border-[#C56B3E]/30"
  },
  {
    id: '7',
    quote: "התוכנית פתחה בי משהו. למדתי לסמוך, להרגיש את העוצמה הנשית, לקבל החלטות מדויקות ולחזק את הביטחון האישי והתעסוקתי שלי.",
    author: "אלונה ש'",
    program: "עד 180° - מרעיון לתנועה",
    programColor: "bg-[#204C8E]/10 text-[#204C8E] border-[#204C8E]/30"
  },
  {
    id: '8',
    quote: "תודה על האווירה המאפשרת, הנתינה האינסופית, המחשבה על כל פרט קטן, החיוך, החיבוק והתכנים המרתקים שמלווים אותי מאז בכל יום.",
    author: "ליטל א'",
    program: "מרחבי בין לבין",
    programColor: "bg-[#2D5043]/10 text-[#2D5043] border-[#2D5043]/30"
  }
];

export const MainWebsite: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  // תצוגת חלון אינטראקטיבי ל-4 תוכניות נשים פרטיות
  const [activeWomenProductIdx, setActiveWomenProductIdx] = useState(0);

  // תצוגת חלון אינטראקטיבי ל-2 תוכניות קהילות וארגונים
  const [activeOrgProductIdx, setActiveOrgProductIdx] = useState(0);

  // תצוגת חלון אינטראקטיבי לצוות (דלית / אלסי)
  const [activeTeamMember, setActiveTeamMember] = useState<'dalit' | 'elsie'>('dalit');

  // תצוגת חלון אינטראקטיבי להמלצות (סליידר יחיד)
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // ניהול טופס יצירת קשר עם 2 לשוניות: נשים פרטיות מול קהילות וארגונים
  const [audienceType, setAudienceType] = useState<'private' | 'organization'>('private');

  // שדות משותפים
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // שדות ספציפיים ללשונית נשים פרטיות
  const [privateProgram, setPrivateProgram] = useState('אמצע החיים');

  // שדות ספציפיים ללשונית קהילות וארגונים
  const [orgName, setOrgName] = useState('');
  const [orgRole, setOrgRole] = useState('');
  const [orgInterest, setOrgInterest] = useState('היילייטס');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSharedCopied, setIsSharedCopied] = useState(false);

  const location = useLocation();

  useEffect(() => {
    document.title = "בין לבין | מרחבים לנשים - אתר הבית";
  }, []);

  // גלילה חלקה אוטומטית לאזור המבוקש אם הגיעו מכפתור חזרה (למשל ?section=programs או ?section=testimonials)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (section === 'programs' || window.location.hash.includes('programs')) {
      setTimeout(() => {
        document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else if (section === 'testimonials' || window.location.hash.includes('testimonials')) {
      setTimeout(() => {
        document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [location.search]);

  // מחוות הזזה פיזית (Touch Swipe) לתוכניות נשים
  const womenTouchStartX = useRef<number | null>(null);
  const womenTouchEndX = useRef<number | null>(null);

  const handleWomenTouchStart = (e: React.TouchEvent) => {
    womenTouchEndX.current = null;
    womenTouchStartX.current = e.targetTouches[0].clientX;
  };
  const handleWomenTouchMove = (e: React.TouchEvent) => {
    womenTouchEndX.current = e.targetTouches[0].clientX;
  };
  const handleWomenTouchEnd = () => {
    if (womenTouchStartX.current === null || womenTouchEndX.current === null) return;
    const distance = womenTouchStartX.current - womenTouchEndX.current;
    const minSwipe = 40;
    if (distance > minSwipe) {
      setActiveWomenProductIdx((prev) => (prev === WOMEN_PROGRAMS.length - 1 ? 0 : prev + 1));
    } else if (distance < -minSwipe) {
      setActiveWomenProductIdx((prev) => (prev === 0 ? WOMEN_PROGRAMS.length - 1 : prev - 1));
    }
  };

  // מחוות הזזה פיזית (Touch Swipe) לתוכניות קהילות וארגונים
  const orgTouchStartX = useRef<number | null>(null);
  const orgTouchEndX = useRef<number | null>(null);

  const handleOrgTouchStart = (e: React.TouchEvent) => {
    orgTouchEndX.current = null;
    orgTouchStartX.current = e.targetTouches[0].clientX;
  };
  const handleOrgTouchMove = (e: React.TouchEvent) => {
    orgTouchEndX.current = e.targetTouches[0].clientX;
  };
  const handleOrgTouchEnd = () => {
    if (orgTouchStartX.current === null || orgTouchEndX.current === null) return;
    const distance = orgTouchStartX.current - orgTouchEndX.current;
    const minSwipe = 40;
    if (distance > minSwipe) {
      setActiveOrgProductIdx((prev) => (prev === ORG_PROGRAMS.length - 1 ? 0 : prev + 1));
    } else if (distance < -minSwipe) {
      setActiveOrgProductIdx((prev) => (prev === 0 ? ORG_PROGRAMS.length - 1 : prev - 1));
    }
  };

  // מחוות הזזה פיזית (Touch Swipe) להמלצות
  const testTouchStartX = useRef<number | null>(null);
  const testTouchEndX = useRef<number | null>(null);

  const handleTestTouchStart = (e: React.TouchEvent) => {
    testTouchEndX.current = null;
    testTouchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTestTouchMove = (e: React.TouchEvent) => {
    testTouchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTestTouchEnd = () => {
    if (testTouchStartX.current === null || testTouchEndX.current === null) return;
    const distance = testTouchStartX.current - testTouchEndX.current;
    const minSwipe = 40;

    // גרירה שמאלה = מעבר להמלצה הבאה
    if (distance > minSwipe) {
      setActiveTestimonialIdx((prev) => (prev === WEBSITE_TESTIMONIALS.length - 1 ? 0 : prev + 1));
    } 
    // גרירה ימינה = מעבר להמלצה הקודמת
    else if (distance < -minSwipe) {
      setActiveTestimonialIdx((prev) => (prev === 0 ? WEBSITE_TESTIMONIALS.length - 1 : prev - 1));
    }
  };

  const scrollToSection = (id: string) => {
    setIsNavOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShareSite = async () => {
    const shareTitle = 'בין לבין | מרחבים לנשים';
    const shareText = 'בין לבין - מרחבים לנשים: סדנאות, תוכניות עומק, חוויות דרך וריטריטים המשלבים מפגש, תוכן וחוויה.';
    const shareUrl = window.location.origin + (window.location.pathname === '/' ? '' : window.location.pathname);

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // המשתמש ביטל או שהשיתוף לא נתמך
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsSharedCopied(true);
      setTimeout(() => setIsSharedCopied(false), 3000);
    } catch {
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle}\n${shareText}\n${shareUrl}`)}`;
      window.open(waUrl, '_blank');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('נא להזין שם מלא');
      return;
    }

    if (audienceType === 'organization' && !orgName.trim()) {
      setErrorMessage('נא להזין את שם הקהילה או הארגון');
      return;
    }

    const cleanPhone = phone.trim().replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setErrorMessage('נא להזין מספר טלפון תקין');
      return;
    }

    setIsSubmitting(true);

    try {
      const chosenProgram = audienceType === 'private' ? privateProgram : orgInterest;
      await saveInquiry({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        programs: [chosenProgram],
        notes: notes.trim(),
        audienceType,
        organizationName: audienceType === 'organization' ? orgName.trim() : undefined,
        role: audienceType === 'organization' ? orgRole.trim() : undefined,
        source: audienceType === 'organization' ? 'אתר הבית - פנייה מקהילה/ארגון' : 'אתר הבית - פנייה פרטית',
        submittedAt: new Date().toISOString(),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error saving inquiry:', err);
      setErrorMessage('אירעה שגיאה קלה בשליחה. נשמח לשוחח איתך בוואטסאפ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappGeneralUrl = `https://wa.me/972508353731?text=${encodeURIComponent('היי דלית ואלסי, הגעתי דרך אתר הבית של בין לבין ואשמח לשמוע פרטים נוספים.')}`;
  const dalitWhatsappUrl = `https://wa.me/972508353731?text=${encodeURIComponent('היי דלית, הגעתי דרך אתר הבית של בין לבין ואשמח לשוחח איתך.')}`;
  const elsieWhatsappUrl = `https://wa.me/972547458668?text=${encodeURIComponent('היי אלסי, הגעתי דרך אתר הבית של בין לבין ואשמח לשוחח איתך.')}`;

  return (
    <div className="min-h-screen bg-brand-cream text-gray-800 font-sans selection:bg-brand-orange/20 selection:text-brand-green" dir="rtl">
      
      {/* תפריט עליון קבוע ויוקרתי של אתר הבית */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-beige/90 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          
          {/* לוגו מותג ראשי */}
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-95 transition-opacity group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-brand-green/30 shadow-xs flex items-center justify-center overflow-hidden bg-white p-1 group-hover:scale-105 transition-transform">
              <img 
                src={MAIN_BRAND_LOGO_URL} 
                alt="לוגו בין לבין" 
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== MAIN_BRAND_LOGO_FALLBACK) {
                    target.src = MAIN_BRAND_LOGO_FALLBACK;
                  }
                }}
              />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xl sm:text-2xl font-black text-brand-green tracking-tight leading-none">
                בין לבין
              </span>
              <span className="text-xs font-bold text-brand-orange tracking-normal mt-0.5">
                מרחבים לנשים
              </span>
            </div>
          </Link>

          {/* קישורי תפריט בדסקטופ */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-700">
            <button 
              type="button" 
              onClick={() => scrollToSection('programs')} 
              className="hover:text-brand-orange transition-colors cursor-pointer"
            >
              התוכניות והמרחבים
            </button>
            <button 
              type="button" 
              onClick={() => scrollToSection('team')} 
              className="hover:text-brand-orange transition-colors cursor-pointer"
            >
              נעים להכיר
            </button>
            <button 
              type="button" 
              onClick={() => scrollToSection('gallery')} 
              className="hover:text-brand-orange transition-colors cursor-pointer"
            >
              רגעים בתמונות
            </button>
            <button 
              type="button" 
              onClick={() => scrollToSection('testimonials')} 
              className="hover:text-brand-orange transition-colors cursor-pointer font-black text-brand-orange"
            >
              המלצות
            </button>
            <button 
              type="button" 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-brand-orange transition-colors cursor-pointer"
            >
              בואי נתחבר
            </button>
          </nav>

          {/* כפתורי פעולה */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleShareSite}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white border border-brand-orange/30 py-2 px-3 sm:px-4 rounded-full transition-all cursor-pointer shadow-2xs"
              title="שיתוף אתר הבית"
            >
              <Share2 className="w-4 h-4" />
              <span>{isSharedCopied ? 'הקישור הועתק!' : 'שיתוף האתר'}</span>
            </button>

            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-[#25D366]/15 hover:bg-[#25D366] text-brand-green hover:text-white border border-[#25D366]/40 py-2 px-3.5 sm:px-4 rounded-full transition-all cursor-pointer shadow-2xs"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span className="hidden xs:inline">שיחה בוואטסאפ</span>
              <span className="xs:hidden">וואטסאפ</span>
            </a>

            {/* כפתור תפריט מובייל */}
            <button
              type="button"
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="md:hidden p-2 rounded-full border border-gray-200 text-gray-700 hover:text-brand-orange hover:bg-gray-50 transition-colors cursor-pointer"
              aria-label="תפריט"
            >
              {isNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* תפריט מובייל נפתח */}
        {isNavOpen && (
          <div className="md:hidden border-t border-brand-beige bg-white p-5 space-y-3 text-right shadow-xl animate-in fade-in">
            <button
              type="button"
              onClick={() => {
                setIsNavOpen(false);
                handleShareSite();
              }}
              className="flex items-center justify-between w-full py-2.5 text-base font-bold text-brand-orange border-b border-gray-100 text-right cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                <span>{isSharedCopied ? 'הקישור לאתר הועתק!' : 'שיתוף אתר הבית'}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('programs')}
              className="block w-full py-2.5 text-base font-bold text-gray-800 hover:text-brand-orange border-b border-gray-100 text-right"
            >
              התוכניות והמרחבים שלנו
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('team')}
              className="block w-full py-2.5 text-base font-bold text-gray-800 hover:text-brand-orange border-b border-gray-100 text-right"
            >
              נעים להכיר (דלית ואלסי)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('gallery')}
              className="block w-full py-2.5 text-base font-bold text-gray-800 hover:text-brand-orange border-b border-gray-100 text-right"
            >
              רגעים בתמונות
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('testimonials')}
              className="block w-full py-2.5 text-base font-black text-brand-orange border-b border-gray-100 text-right"
            >
              ממליצות עלינו (המלצות)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="block w-full py-2.5 text-base font-bold text-brand-green text-right"
            >
              בואי נתחבר (יצירת קשר)
            </button>
          </div>
        )}
      </header>

      <main>
        
        {/* 1. Hero של אתר הבית */}
        <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden bg-brand-cream border-b border-brand-beige/80">
          <ButterflyIcon size={260} className="absolute -top-16 -right-20 opacity-5 animate-drift pointer-events-none hidden md:block" />
          <ButterflyIcon size={200} className="absolute -bottom-16 -left-16 opacity-5 animate-float pointer-events-none hidden md:block" />

          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6 sm:space-y-8">
            
            {/* לוגו עגול בולט */}
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white p-2.5 border-4 border-brand-green/30 shadow-xl flex items-center justify-center">
                <img 
                  src={MAIN_BRAND_LOGO_URL} 
                  alt="בין לבין לוגו" 
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== MAIN_BRAND_LOGO_FALLBACK) {
                      target.src = MAIN_BRAND_LOGO_FALLBACK;
                    }
                  }}
                />
              </div>
            </div>

            {/* שם המותג גדול במיוחד + מרחבים לנשים ככותרת משנה מתחת ללוגו */}
            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-brand-green tracking-tight leading-none">
                בין לבין
              </h1>
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-orange tracking-tight">
                מרחבים לנשים
              </p>
            </div>

            {/* כותרת ראשית לפתיח: הדברים הכי מעניינים קורים בין לבין */}
            <div className="max-w-3xl mx-auto space-y-4 pt-2 sm:pt-4">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.18] text-center">
                <span className="block sm:inline">הדברים הכי מעניינים קורים</span>{' '}
                <span className="block sm:inline text-brand-orange mt-1 sm:mt-0">בין לבין</span>
              </h2>

              <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-[#2D5043] leading-snug sm:leading-relaxed text-center max-w-2xl mx-auto pt-1">
                בבין לבין אנחנו יוצרות סדנאות, תוכניות עומק, חוויות דרך וריטריטים, המשלבים
              </p>

              {/* חלק מהלוגו - מפגש. תוכן. חוויה בעיצוב ויזואלי בולט */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 font-black text-2xl sm:text-3xl md:text-4xl text-brand-orange tracking-wide pt-1 pb-2" dir="rtl">
                <span className="hover:scale-105 transition-transform">מפגש.</span>
                <span className="hover:scale-105 transition-transform">תוכן.</span>
                <span className="hover:scale-105 transition-transform">חוויה</span>
              </div>
            </div>

            {/* מרחב קצת אחר */}
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-white/95 to-[#FFF7EE]/90 backdrop-blur-sm p-5 sm:p-7 rounded-3xl border border-brand-orange/30 shadow-sm text-center">
              <p className="text-base sm:text-xl md:text-2xl font-bold text-gray-800 leading-relaxed text-center">
                כל אחד מהם הוא מרחב קצת אחר. מקום לידע מקצועי שפותח את הראש, להתנסויות מפתיעות, למפגשים ושיחות עם נשים מעניינות ולרגעים של חוויה וגילויים חדשים.
              </p>
            </div>

            {/* כפתורי פעולה מרכזיים - נגישים מיד בלי גלילה ארוכה */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1 pb-1">
              <button
                type="button"
                onClick={() => scrollToSection('programs')}
                className="w-full sm:w-auto px-8 py-4 bg-brand-orange hover:bg-brand-green text-white font-black text-lg sm:text-xl rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                לתוכניות והמרחבים שלנו
              </button>
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-gray-50 text-gray-800 font-black text-base sm:text-lg rounded-2xl border border-gray-300 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>דברי איתנו בוואטסאפ</span>
              </a>
              <button
                type="button"
                onClick={handleShareSite}
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-brand-orange/10 text-brand-orange font-black text-base sm:text-lg rounded-2xl border-2 border-brand-orange/40 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                title="שיתוף אתר הבית"
              >
                <Share2 className="w-5 h-5 text-brand-orange" />
                <span>{isSharedCopied ? 'הקישור הועתק!' : 'שיתוף אתר הבית'}</span>
              </button>
            </div>

            {/* כרטיס ויזואלי ומודולרי: אז מי אנחנו? */}
            <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm p-6 sm:p-9 md:p-10 rounded-3xl sm:rounded-[2.5rem] border border-brand-orange/30 shadow-md text-right space-y-6">
              
              {/* כותרת נעים להכיר */}
              <div className="flex items-center gap-3 border-b border-brand-beige/80 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 font-black">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#2D5043] tracking-tight">
                  נעים להכיר
                </h3>
              </div>

              {/* תמונה אותנטית - דלית ואלסי במרחב העבודה (תצוגה מלאה ללא חיתוך) */}
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border-2 border-brand-orange/20 bg-brand-cream">
                <img
                  src="https://i.postimg.cc/FzyzgDRy/working-lounge-faces-up.jpg"
                  alt="דלית ואלסי - בין לבין מרחבים לנשים"
                  className="w-full h-auto object-contain block"
                  loading="lazy"
                />
              </div>

              {/* כרטיס מייסדות: דלית ואלסי */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#FFF8F3] to-[#FFF4EC] border-r-4 border-brand-orange shadow-xs">
                <p className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 leading-relaxed">
                  אנחנו דלית כורה ואלסי זיסלמן, השותפות המייסדות של בין לבין. אוהבות אנשים, סקרניות מטבענו, ומביאות איתנו ניסיון עשיר, ידע ואהבה גדולה ליצירת חיבורים והזדמנויות חדשות עבור נשים.
                </p>
              </div>

              {/* פסקאות התוכן המעוצבות */}
              <div className="space-y-4 pt-1 text-right">
                
                {/* פסקה 1: שנים של הובלת קהילות נשים */}
                <div className="p-5 sm:p-6 rounded-2xl bg-brand-cream/60 border border-brand-beige">
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                    שנים של הובלת קהילות נשים, לצד הניסיון האישי והמקצועי שלנו, העניקו לנו היכרות עמוקה עם השאלות, האתגרים והרצונות שמעסיקים נשים בתקופות חיים שונות. כל אחת מאיתנו מביאה יכולות ונקודת מבט משלה, והשילוב בינינו מוליד רעיונות וחיבורים שלא היינו מגיעות אליהם לבד.
                  </p>
                </div>

                {/* פסקה 2: מתוך כל אלה אנחנו יוצרות את המרחבים של בין לבין */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FFF4EB]/80 to-[#FDEDE0]/50 border border-brand-orange/30">
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                    מתוך כל אלה אנחנו יוצרות את המרחבים של בין לבין. בוחרות בקפידה את התכנים ואת נשות המקצוע, משלבות התנסויות אישיות וקבוצתיות ומקדישות מחשבה לכל פרט, כדי ליצור חוויות שיש בהן עניין, ערך והנאה.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* 2. מתחם 6 המוצרים והמרחבים שלנו - חלון תצוגה אינטראקטיבי חכם עם דפדוף והזזה פיזית */}
        <section id="programs" className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-b border-brand-beige/80 relative overflow-hidden">
          <div className="max-w-5xl mx-auto">
            
            {/* כותרת ומבוא למרחבים שלנו: לכל אחת יש את הבין לבין שלה. ומה איתך? */}
            <div className="text-center mb-8 sm:mb-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-green text-white rounded-full text-xs sm:text-sm font-black mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>המרחבים שלנו</span>
              </div>
              
              <div className="mb-4 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-green tracking-tight leading-tight">
                  <span className="block">לכל אחת</span>
                  <span className="block mt-1 sm:mt-1.5">יש את הבין לבין שלה</span>
                </h2>
              </div>

              <p className="text-lg sm:text-xl md:text-2xl font-black text-brand-orange leading-relaxed mb-4">
                אז מה מעסיק אותך בתקופה הזו בחיים?
              </p>

              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-normal mb-4">
                אולי את רוצה להבין קצת יותר טוב את השינויים של אמצע החיים, אולי לגלות מה עוד מחכה לך בפרק הבא. אולי יש רעיון או שינוי שכבר מזמן מתחשק לך לקדם ואולי הגיע הזמן לפנות קצת יותר מקום לעצמך, לצאת מהשגרה, להכיר נשים מעניינות ולחוות משהו חדש.
              </p>

              <p className="text-base sm:text-lg text-gray-800 font-bold mb-4">
                יש לנו הרגשה שבין המרחבים שיצרנו, תמצאי אחד שמתאים בדיוק למקום שבו את נמצאת עכשיו.
              </p>

              <div className="h-1 w-20 bg-brand-orange mx-auto mt-3 rounded-full opacity-60"></div>
            </div>

            {/* מתחם תוכניות לנשים פרטיות: 4 לשוניות וחלון יחיד עם דפדוף ימינה/שמאלה */}
            <div className="mb-14 sm:mb-20">
              
              {/* סרגל לשוניות בחירה בין 4 התוכניות לנשים פרטיות */}
              <div className="mb-6 max-w-3xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {WOMEN_PROGRAMS.map((prod, idx) => {
                    const isActive = activeWomenProductIdx === idx;
                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => setActiveWomenProductIdx(idx)}
                        className={`p-2.5 sm:py-3.5 sm:px-3 rounded-2xl text-center transition-all flex flex-col justify-center cursor-pointer ${
                          isActive ? prod.tabActiveStyle : prod.tabInactiveStyle
                        }`}
                      >
                        <div className="flex items-center gap-1 justify-center">
                          <span className="text-xs sm:text-sm md:text-base font-black tracking-tight">{prod.nameNode || prod.name}</span>
                          {prod.isFlagship && (
                            <Crown className={`w-3 h-3 fill-current shrink-0 ${isActive ? 'text-amber-300' : 'text-[#C56B3E]'}`} />
                          )}
                        </div>
                        <span className={`text-[10px] sm:text-xs font-bold leading-tight mt-1 ${isActive ? 'text-white/95' : 'opacity-90'}`}>
                          {prod.tabSubtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* הנחיה להחליק ימינה או שמאלה - מתחת ללשוניות ומעל אמצע החיים */}
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 font-bold mb-4">
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange" />
                <span>החליקי ימינה או שמאלה למעבר בין התוכניות</span>
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange" />
              </div>

              {/* חלון תצוגה ממוקד (Focused Window) לתוכניות נשים פרטיות עם גלילה פיזית וחיצים */}
              {(() => {
                const prod = WOMEN_PROGRAMS[activeWomenProductIdx];
                const prevIdx = activeWomenProductIdx === 0 ? WOMEN_PROGRAMS.length - 1 : activeWomenProductIdx - 1;
                const nextIdx = activeWomenProductIdx === WOMEN_PROGRAMS.length - 1 ? 0 : activeWomenProductIdx + 1;
                const productWhatsappUrl = `https://wa.me/972508353731?text=${encodeURIComponent(`שלום דלית ואלסי, הגעתי דרך אתר הבית ואשמח לקבל פרטים על ${prod.name}`)}`;

                return (
                  <div className="relative animate-in fade-in duration-300 max-w-4xl mx-auto">
                    <div 
                      onTouchStart={handleWomenTouchStart}
                      onTouchMove={handleWomenTouchMove}
                      onTouchEnd={handleWomenTouchEnd}
                      style={{ touchAction: 'pan-y' }}
                      className={`${prod.cardBg} rounded-3xl p-6 sm:p-9 ${prod.borderStyle} text-right relative shadow-lg select-none`}
                    >
                      {/* סרגל עליון בתוך החלון */}
                      <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-gray-200/60">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-black tracking-tight ${prod.tagColor}`}>
                            {prod.tag}
                          </span>
                          {prod.isFlagship && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-black text-brand-orange">
                              <Crown className="w-3.5 h-3.5 fill-current" />
                              <span>סדנת הדגל</span>
                            </span>
                          )}
                        </div>

                        {/* חיצי דפדוף ישירים */}
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveWomenProductIdx(prevIdx)}
                            className="p-1.5 sm:p-2 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-brand-orange border border-gray-200 shadow-2xs transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                            title="לתוכנית הקודמת"
                            aria-label="לתוכנית הקודמת"
                          >
                            <ChevronRight className="w-4 h-4" />
                            <span className="hidden sm:inline">הקודמת</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveWomenProductIdx(nextIdx)}
                            className="p-1.5 sm:p-2 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-brand-orange border border-gray-200 shadow-2xs transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                            title="לתוכנית הבאה"
                            aria-label="לתוכנית הבאה"
                          >
                            <span className="hidden sm:inline">הבאה</span>
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* כותרת ולוגו */}
                      <div className="flex items-center gap-4 sm:gap-5 mb-5">
                        {prod.logoUrl && (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-2 border-2 border-gray-200 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                            <img 
                              src={prod.logoUrl} 
                              alt={`לוגו ${prod.name}`} 
                              className="w-full h-full object-contain rounded-full"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (prod.logoFallback && target.src !== prod.logoFallback) {
                                  target.src = prod.logoFallback;
                                }
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
                            {prod.nameNode || prod.name}
                          </h3>
                          {prod.subtitle && (
                            <p className="text-sm sm:text-base font-bold text-gray-600 mt-0.5">
                              {prod.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Hook */}
                      {prod.hook && (
                        <div className="mb-5 bg-white/85 p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-2xs">
                          <p className="text-base sm:text-lg text-gray-900 font-black leading-snug">
                            {prod.hook}
                          </p>
                        </div>
                      )}

                      {/* פסקאות תוכן */}
                      <div className="space-y-3.5 text-sm sm:text-base text-gray-700 leading-relaxed font-normal mb-6">
                        {prod.bodyParagraphs.map((paragraph, pIdx) => (
                          <p key={pIdx}>
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* כפתורי פעולה */}
                      <div className="pt-4 border-t border-gray-200/70 flex flex-col sm:flex-row items-center gap-3">
                        <Link
                          to={prod.link}
                          className={`w-full sm:flex-1 inline-flex items-center justify-center gap-2 ${prod.buttonStyle} py-3.5 px-5 rounded-2xl text-sm sm:text-base md:text-lg font-black transition-all shadow-sm hover:shadow-md cursor-pointer text-center leading-snug`}
                        >
                          <span>{prod.actionButtonNode || prod.actionButtonText}</span>
                          <ArrowLeft className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-1" />
                        </Link>

                        <a
                          href={productWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm sm:text-base border border-gray-300 shadow-2xs transition-colors cursor-pointer"
                        >
                          <WhatsAppIcon className="w-4 h-4 fill-emerald-600" />
                          <span>שאלי אותנו על תוכנית זו</span>
                        </a>
                      </div>
                    </div>

                    {/* נקודות דפדוף */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                      {WOMEN_PROGRAMS.map((p, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => setActiveWomenProductIdx(dotIdx)}
                          className={`h-2.5 rounded-full transition-all cursor-pointer ${
                            activeWomenProductIdx === dotIdx
                              ? 'w-8 bg-brand-orange'
                              : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                          }`}
                          title={p.name}
                          aria-label={p.name}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* אזור נפרד לקהילות ולארגונים: 2 לשוניות וחלון יחיד עם דפדוף ימינה/שמאלה */}
            <div className="pt-10 sm:pt-14 border-t-2 border-brand-beige/80">
              <div className="text-center mb-8 sm:mb-10 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#204c8e] text-white rounded-full text-xs sm:text-sm font-black mb-3 shadow-xs">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>קהילות וארגונים</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4">
                  <span className="block text-brand-green">בין לבין</span>
                  <span className="block mt-1 text-[#204c8e]">לקהילות ולארגונים</span>
                </h3>

                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-normal mb-4">
                  לצד התוכניות שלנו לנשים, אנחנו יוצרות גם מרחבים המותאמים לקהילות ולארגונים. משלבות תוכן מקצועי, מפגש וחוויה בהתאם לאנשים, לצרכים ולמטרות של כל קבוצה.
                </p>

                <div className="h-1 w-20 bg-[#204c8e] mx-auto mt-3 rounded-full opacity-60"></div>
              </div>

              {/* סרגל לשוניות בחירה בין 2 התוכניות לקהילות וארגונים */}
              <div className="mb-4 max-w-xl mx-auto">
                <div className="grid grid-cols-2 gap-3">
                  {ORG_PROGRAMS.map((prod, idx) => {
                    const isActive = activeOrgProductIdx === idx;
                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => setActiveOrgProductIdx(idx)}
                        className={`p-3 sm:py-3.5 sm:px-4 rounded-2xl text-center transition-all flex flex-col justify-center cursor-pointer ${
                          isActive ? prod.tabActiveStyle : prod.tabInactiveStyle
                        }`}
                      >
                        <span className="text-xs sm:text-sm md:text-base font-black tracking-tight">{prod.nameNode || prod.name}</span>
                        <span className={`text-[10px] sm:text-xs font-bold leading-tight mt-1 ${isActive ? 'text-white/95' : 'opacity-90'}`}>
                          {prod.tabSubtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* הנחיה להחליק ימינה או שמאלה - מתחת ללשוניות ומעל התוכנית */}
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 font-bold mb-4">
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#204c8e]" />
                <span>החליקו ימינה או שמאלה למעבר בין התוכניות</span>
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#204c8e]" />
              </div>

              {/* חלון תצוגה ממוקד (Focused Window) לתוכניות קהילות וארגונים עם גלילה פיזית וחיצים */}
              {(() => {
                const prod = ORG_PROGRAMS[activeOrgProductIdx];
                const prevIdx = activeOrgProductIdx === 0 ? ORG_PROGRAMS.length - 1 : activeOrgProductIdx - 1;
                const nextIdx = activeOrgProductIdx === ORG_PROGRAMS.length - 1 ? 0 : activeOrgProductIdx + 1;
                const productWhatsappUrl = `https://wa.me/972508353731?text=${encodeURIComponent(`שלום דלית ואלסי, הגעתי דרך אתר הבית ואשמח לקבל פרטים על ${prod.name}`)}`;

                return (
                  <div className="relative animate-in fade-in duration-300 max-w-4xl mx-auto">
                    <div 
                      onTouchStart={handleOrgTouchStart}
                      onTouchMove={handleOrgTouchMove}
                      onTouchEnd={handleOrgTouchEnd}
                      style={{ touchAction: 'pan-y' }}
                      className={`${prod.cardBg} rounded-3xl p-6 sm:p-9 ${prod.borderStyle} text-right relative shadow-lg select-none`}
                    >
                      {/* סרגל עליון בתוך החלון */}
                      <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-gray-200/60">
                        <span className={`px-3 py-1 rounded-full text-xs font-black tracking-tight ${prod.tagColor}`}>
                          {prod.tag}
                        </span>

                        {/* חיצי דפדוף ישירים */}
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveOrgProductIdx(prevIdx)}
                            className="p-1.5 sm:p-2 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-[#204c8e] border border-gray-200 shadow-2xs transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                            title="לתוכנית הקודמת"
                            aria-label="לתוכנית הקודמת"
                          >
                            <ChevronRight className="w-4 h-4" />
                            <span className="hidden sm:inline">הקודמת</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveOrgProductIdx(nextIdx)}
                            className="p-1.5 sm:p-2 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-[#204c8e] border border-gray-200 shadow-2xs transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                            title="לתוכנית הבאה"
                            aria-label="לתוכנית הבאה"
                          >
                            <span className="hidden sm:inline">הבאה</span>
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* כותרת ולוגו */}
                      <div className="flex items-center gap-4 sm:gap-5 mb-5">
                        {prod.logoUrl && (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-2 border-2 border-gray-200 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                            <img 
                              src={prod.logoUrl} 
                              alt={`לוגו ${prod.name}`} 
                              className="w-full h-full object-contain rounded-full"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (prod.logoFallback && target.src !== prod.logoFallback) {
                                  target.src = prod.logoFallback;
                                }
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
                            {prod.nameNode || prod.name}
                          </h4>
                          {prod.subtitle && (
                            <p className="text-sm sm:text-base font-bold text-gray-600 mt-0.5">
                              {prod.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Hook */}
                      {prod.hook && (
                        <div className="mb-5 bg-white/85 p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-2xs">
                          <p className="text-base sm:text-lg text-gray-900 font-black leading-snug">
                            {prod.hook}
                          </p>
                        </div>
                      )}

                      {/* פסקאות תוכן */}
                      <div className="space-y-3.5 text-sm sm:text-base text-gray-700 leading-relaxed font-normal mb-6">
                        {prod.bodyParagraphs.map((paragraph, pIdx) => (
                          <p key={pIdx}>
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* כפתורי פעולה */}
                      <div className="pt-4 border-t border-gray-200/70 flex flex-col sm:flex-row items-center gap-3">
                        <Link
                          to={prod.link}
                          className={`w-full sm:flex-1 inline-flex items-center justify-center gap-2 ${prod.buttonStyle} py-3.5 px-5 rounded-2xl text-sm sm:text-base md:text-lg font-black transition-all shadow-sm hover:shadow-md cursor-pointer text-center leading-snug`}
                        >
                          <span>{prod.actionButtonNode || prod.actionButtonText}</span>
                          <ArrowLeft className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-1" />
                        </Link>

                        <a
                          href={productWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm sm:text-base border border-gray-300 shadow-2xs transition-colors cursor-pointer"
                        >
                          <WhatsAppIcon className="w-4 h-4 fill-emerald-600" />
                          <span>דברו איתנו על תוכנית זו</span>
                        </a>
                      </div>
                    </div>

                    {/* נקודות דפדוף */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                      {ORG_PROGRAMS.map((p, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => setActiveOrgProductIdx(dotIdx)}
                          className={`h-2.5 rounded-full transition-all cursor-pointer ${
                            activeOrgProductIdx === dotIdx
                              ? 'w-8 bg-[#204c8e]'
                              : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                          }`}
                          title={p.name}
                          aria-label={p.name}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>
        </section>

        {/* 3. גלריית תמונות אותנטית */}
        <section id="gallery" className="py-14 sm:py-20 bg-brand-cream border-b border-brand-beige/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-green mb-2">
                רגעים מתוך המרחבים שלנו
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                טעימה מהאווירה, המפגש הנשי, השיתוף והחיבור
              </p>
            </div>
            <BrandGallerySlider />
          </div>
        </section>

        {/* 4. קצת יותר מקרוב - דלית ואלסי */}
        <section id="team" className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-b border-brand-beige/80 relative">
          <div className="max-w-4xl mx-auto text-right">
            
            {/* כותרת החלק: קצת יותר מקרוב */}
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-green tracking-tight mb-4">
                קצת יותר מקרוב
              </h2>
              <div className="h-1.5 w-24 bg-brand-orange mx-auto rounded-full opacity-60"></div>
            </div>

            {/* כרטיסי פרופיל של דלית ואלסי - זו לצד זו */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 items-stretch">
              
              {/* כרטיס דלית כורה */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-brand-green/30 border-t-8 border-t-brand-green flex flex-col justify-between text-right">
                <div>
                  <div className="mb-4 text-center flex flex-col items-center">
                    <div className="relative mb-3">
                      <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-md ring-4 ring-brand-green/25 bg-brand-cream">
                        <img 
                          src={DALIT_PHOTO_URL} 
                          alt="דלית כורה - בין לבין" 
                          className="w-full h-full object-cover object-[center_20%]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-brand-green mb-1 text-center">
                      דלית כורה
                    </h3>
                    <div className="inline-block px-3.5 py-1 bg-brand-green/10 text-brand-green font-black text-xs sm:text-sm rounded-full border border-brand-green/20">
                      פיתוח תוכן, קהילות והפקת חוויות
                    </div>
                  </div>
                  <div className="w-14 h-1 bg-brand-orange mb-4 rounded-full mx-auto"></div>
                  
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal mb-6">
                    בעלת ניסיון רב בהובלת קהילות נשים, בפיתוח תוכניות ובהפקת אירועים וחוויות. אוהבת לזהות הזדמנויות, לחבר בין רעיונות ואנשים ולהפוך מחשבה ראשונית למשהו שאפשר לפגוש, להרגיש ולחוות.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-center">
                  <a
                    href={dalitWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-green hover:bg-[#1e3d31] text-white font-black text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>שיחה ישירה עם דלית בוואטסאפ</span>
                  </a>
                </div>
              </div>

              {/* כרטיס אלסי זיסלמן */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-brand-orange/30 border-t-8 border-t-brand-orange flex flex-col justify-between text-right">
                <div>
                  <div className="mb-4 text-center flex flex-col items-center">
                    <div className="relative mb-3">
                      <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-md ring-4 ring-brand-orange/25 bg-brand-cream">
                        <img 
                          src={ELSIE_PHOTO_URL} 
                          alt="אלסי זיסלמן - בין לבין" 
                          className="w-full h-full object-cover object-[center_25%]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-brand-green mb-1 text-center">
                      אלסי זיסלמן
                    </h3>
                    <div className="inline-block px-3.5 py-1 bg-brand-orange/10 text-brand-orange font-black text-xs sm:text-sm rounded-full border border-brand-orange/20">
                      הנחיה, הרצאות וליווי תהליכים
                    </div>
                  </div>
                  <div className="w-14 h-1 bg-brand-green mb-4 rounded-full mx-auto"></div>
                  
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal mb-6">
                    מנחה, מרצה וטריינרית NLP, בעלת ניסיון בליווי תהליכים אישיים וקבוצתיים. מביאה ידע מקצועי, כלים מעשיים ויכולת ליצור מרחב שמזמין שיחה פתוחה, התנסות והתבוננות מזוויות חדשות.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-center">
                  <a
                    href={elsieWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-orange hover:bg-[#a8582d] text-white font-black text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>שיחה ישירה עם אלסי בוואטסאפ</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 5. המלצות - נשים מספרות באהבה - חלון סליידר יחיד ללא גלילה מיותרת */}
        <section id="testimonials" className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#FFFDF9] via-white to-brand-cream/60 border-b border-brand-beige/80 relative overflow-hidden">
          {/* רקע קישוטי פרפר */}
          <ButterflyIcon size={240} className="absolute -top-12 -left-12 opacity-[0.03] text-brand-green pointer-events-none select-none hidden md:block" />
          <ButterflyIcon size={200} className="absolute -bottom-10 -right-10 opacity-[0.03] text-brand-orange pointer-events-none select-none hidden md:block" />

          <div className="max-w-4xl mx-auto relative">
            
            {/* כותרת החלק */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand-orange/15 text-brand-orange rounded-full text-xs sm:text-sm font-black mb-3">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>מילים מהלב • נשים מספרות</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-green tracking-tight mb-2">
                ממליצות עלינו באהבה
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
                רשמים וחוויות מהלב מתוך הסדנאות, המפגשים והמסעות שלנו:
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-brand-orange to-amber-400 mx-auto rounded-full mt-3"></div>
            </div>

            {/* חלון סליידר יחיד וממוקד של המלצות */}
            {(() => {
              const currentT = WEBSITE_TESTIMONIALS[activeTestimonialIdx];
              const prevTIdx = activeTestimonialIdx === 0 ? WEBSITE_TESTIMONIALS.length - 1 : activeTestimonialIdx - 1;
              const nextTIdx = activeTestimonialIdx === WEBSITE_TESTIMONIALS.length - 1 ? 0 : activeTestimonialIdx + 1;

              return (
                <div className="max-w-2xl mx-auto">
                  <div 
                    onTouchStart={handleTestTouchStart}
                    onTouchMove={handleTestTouchMove}
                    onTouchEnd={handleTestTouchEnd}
                    style={{ touchAction: 'pan-y' }}
                    className="bg-white rounded-3xl p-6 sm:p-9 border-2 border-brand-orange/30 shadow-md text-right relative flex flex-col justify-between min-h-[250px] sm:min-h-[270px] animate-in fade-in duration-300 select-none"
                  >
                    <ButterflyIcon size={36} className="absolute top-4 left-4 opacity-10 text-brand-orange" />

                    {/* סרגל עליון בכרטיס: תגית מוצר + דירוג כוכבים + מונה */}
                    <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black px-3 py-1 rounded-full border ${currentT.programColor}`}>
                          {currentT.program === 'FLOWTRIPS וריטריטים' ? <FlowTripsTitle /> : currentT.program}
                        </span>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* חיצי מעבר ישירים בתוך הכרטיס */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setActiveTestimonialIdx(prevTIdx)}
                          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-brand-orange transition-colors cursor-pointer"
                          title="המלצה קודמת"
                          aria-label="המלצה קודמת"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-black text-gray-400 px-1">
                          {activeTestimonialIdx + 1}/{WEBSITE_TESTIMONIALS.length}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveTestimonialIdx(nextTIdx)}
                          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-brand-orange transition-colors cursor-pointer"
                          title="המלצה הבאה"
                          aria-label="המלצה הבאה"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* גוף הציטוט */}
                    <div className="mb-6 space-y-2">
                      <Quote className="w-6 h-6 text-brand-orange/40 rotate-180" />
                      <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium italic">
                        "{currentT.quote}"
                      </p>
                    </div>

                    {/* שם המשתתפת */}
                    <div className="pt-3 border-t border-brand-beige flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-bold">משתתפת בתוכנית</span>
                      <span className="text-base sm:text-lg font-black text-brand-green">
                        {currentT.author}
                      </span>
                    </div>
                  </div>

                  {/* רמז עדין למובייל על הזזה פיזית של המלצות */}
                  <div className="flex sm:hidden items-center justify-center gap-2 text-[11px] text-gray-400 font-bold mt-3">
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>החליקי ימינה או שמאלה למעבר בין ההמלצות</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </div>

                  {/* אינדיקטור נקודות מתחת לסליידר */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {WEBSITE_TESTIMONIALS.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => setActiveTestimonialIdx(dotIdx)}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          activeTestimonialIdx === dotIdx
                            ? 'w-7 bg-brand-orange'
                            : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                        }`}
                        title={`מעבר להמלצה ${dotIdx + 1}`}
                        aria-label={`מעבר להמלצה ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })()}

          </div>
        </section>

        {/* 6. יצירת קשר - אז איפה נפגשות? */}
        <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-brand-cream relative">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border-2 border-brand-orange/30 shadow-md text-right space-y-6">
            
            {/* כותרת האזור: אז איפה נפגשות? */}
            <div className="text-center space-y-3">
              <span className="inline-block px-4 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-black">
                אנחנו כאן בשבילך
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-brand-green tracking-tight">
                אז איפה נפגשות?
              </h2>
            </div>

            {/* שתי לשוניות בחירה בין קהלי היעד */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#FFF4EB] rounded-2xl border border-brand-orange/20 max-w-lg mx-auto">
              <button
                type="button"
                onClick={() => {
                  setAudienceType('private');
                  setErrorMessage(null);
                }}
                className={`py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  audienceType === 'private'
                    ? 'bg-brand-orange text-white shadow-xs'
                    : 'text-gray-700 hover:text-brand-orange'
                }`}
              >
                <User className="w-4 h-4" />
                <span>אני מתעניינת לעצמי</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAudienceType('organization');
                  setErrorMessage(null);
                }}
                className={`py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                  audienceType === 'organization'
                    ? 'bg-[#204c8e] text-white border-[#183a6d] shadow-sm'
                    : 'bg-[#EBF2FA] text-[#204c8e] border-[#204c8e]/40 hover:bg-[#DCE7F5]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>אני פונה מטעם קהילה או ארגון</span>
              </button>
            </div>

            {/* טקסט פתיחה וכותרת משנה בהתאם ללשונית שנבחרה */}
            {audienceType === 'private' ? (
              <div className="bg-[#FFF9F4] p-5 sm:p-6 rounded-2xl border border-brand-orange/20 text-right space-y-2">
                <p className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed">
                  משהו כאן סקרן אותך? מצאת תוכנית שמעניינת אותך או שיש לך שאלה?
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  נשמח להכיר, לשמוע מה את מחפשת ולחשוב יחד איזה מהמרחבים שלנו יכול להתאים לך.
                </p>
              </div>
            ) : (
              <div className="bg-[#F0F5FA] p-5 sm:p-6 rounded-2xl border border-[#204c8e]/20 text-right space-y-2">
                <h3 className="text-lg sm:text-xl font-black text-[#1e3d59]">
                  מחפשות תוכן וחוויה לקהילה או לארגון שלכן?
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  נשמח לשמוע על הקבוצה שלכן, על הנושאים שחשוב לכן לקדם ועל מה שהייתן רוצות ליצור יחד. נחשוב איך אפשר לבנות עבורכן מפגש, סדנה או תוכנית המשלבים תוכן מקצועי, חוויה ומפגש אנושי.
                </p>
              </div>
            )}

            {isSubmitted ? (
              <div className="bg-[#FFF4EB] border-2 border-[#C56B3E]/40 rounded-2xl p-8 text-center space-y-3">
                <h3 className="text-2xl font-black text-brand-green">
                  תודה רבה, הפרטים נשלחו בהצלחה!
                </h3>
                <p className="text-base text-gray-700">
                  נשמח ליצור איתך קשר בהקדם לשיחה אישית נעימה ומענה לכל שאלה.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-bold text-brand-orange underline cursor-pointer pt-2"
                >
                  שליחת פנייה נוספת
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-bold p-3 rounded-xl text-right">
                    {errorMessage}
                  </div>
                )}

                {/* שם מלא (חובה לשניהם) */}
                <div className="space-y-1">
                  <label htmlFor="site-fullName" className="block text-sm font-bold text-gray-800">
                    שם מלא *
                  </label>
                  <input
                    id="site-fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="השם שלך"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-[#FFF9F4] text-base outline-none text-right transition-colors"
                  />
                </div>

                {/* שדות ספציפיים לקהילה או ארגון: שם הארגון + תפקיד */}
                {audienceType === 'organization' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="site-orgName" className="block text-sm font-bold text-gray-800">
                        שם הקהילה או הארגון *
                      </label>
                      <input
                        id="site-orgName"
                        type="text"
                        required
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="שם הקהילה / חברה / ארגון"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#204c8e] focus:ring-1 focus:ring-[#204c8e] bg-[#FFF9F4] text-base outline-none text-right transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="site-orgRole" className="block text-sm font-bold text-gray-800">
                        תפקיד
                      </label>
                      <input
                        id="site-orgRole"
                        type="text"
                        value={orgRole}
                        onChange={(e) => setOrgRole(e.target.value)}
                        placeholder="תפקידך בארגון / בקהילה"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#204c8e] focus:ring-1 focus:ring-[#204c8e] bg-[#FFF9F4] text-base outline-none text-right transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* טלפון נייד (חובה לשניהם) */}
                <div className="space-y-1">
                  <label htmlFor="site-phone" className="block text-sm font-bold text-gray-800">
                    טלפון נייד *
                  </label>
                  <input
                    id="site-phone"
                    type="tel"
                    dir="ltr"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="050-0000000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-[#FFF9F4] text-base outline-none text-right transition-colors"
                  />
                </div>

                {/* דוא״ל */}
                <div className="space-y-1">
                  <label htmlFor="site-email" className="block text-sm font-bold text-gray-800">
                    דוא״ל
                  </label>
                  <input
                    id="site-email"
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-[#FFF9F4] text-base outline-none text-right transition-colors"
                  />
                </div>

                {/* בחירת תוכנית בהתאם ללשונית */}
                {audienceType === 'private' ? (
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-sm font-bold text-gray-800">
                      איזו תוכנית מעניינת אותך?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['אמצע החיים', 'עוד לפנייך', 'עד 180°', 'FLOWTRIPS', 'עדיין לא החלטתי'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setPrivateProgram(option)}
                          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center cursor-pointer ${
                            privateProgram === option
                              ? 'bg-brand-orange text-white border-brand-orange shadow-xs'
                              : 'bg-[#FFF9F4] text-gray-700 border-gray-200 hover:border-brand-orange/40'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-sm font-bold text-gray-800">
                      מה מעניין אתכן?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {['היילייטס', 'האוהל', 'סדנה או תוכנית בהתאמה אישית', 'נשמח להתייעץ'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setOrgInterest(option)}
                          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all text-right cursor-pointer flex items-center justify-between ${
                            orgInterest === option
                              ? 'bg-[#204c8e] text-white border-[#204c8e] shadow-xs'
                              : 'bg-[#FFF9F4] text-gray-700 border-gray-200 hover:border-[#204c8e]/40'
                          }`}
                        >
                          <span>{option}</span>
                          {orgInterest === option && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* טקסט חופשי בהתאם ללשונית */}
                <div className="space-y-1 pt-1">
                  <label htmlFor="site-notes" className="block text-sm font-bold text-gray-800">
                    {audienceType === 'private'
                      ? 'משהו שתרצי לשאול או לספר לנו? (טקסט חופשי)'
                      : 'ספרי לנו קצת על מה שאתן מחפשות (טקסט חופשי)'}
                  </label>
                  <textarea
                    id="site-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      audienceType === 'private'
                        ? 'נשמח לשמוע מה מביא אותך אלינו...'
                        : 'ספרי לנו על הקבוצה, הצרכים, מסגרת הזמן או המטרות...'
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-[#FFF9F4] text-base outline-none text-right transition-colors"
                  />
                </div>

                {/* כפתור שליחה אחיד בשתי הלשוניות */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 text-white font-black text-lg rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 ${
                      audienceType === 'private'
                        ? 'bg-brand-orange hover:bg-brand-green'
                        : 'bg-[#204c8e] hover:bg-[#143564]'
                    }`}
                  >
                    {isSubmitting ? 'שולח...' : 'השאירי פרטים ונשמח לחזור אלייך'}
                  </button>
                </div>

              </form>
            )}

            {/* פנייה ישירה בוואטסאפ לדלית או לאלסי מתחת לטופס */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
              <span className="text-xs sm:text-sm font-bold text-gray-600">
                מעדיפה פנייה ישירה בוואטסאפ?
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={dalitWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold border border-emerald-300 transition-colors cursor-pointer"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-600" />
                  <span>שיחה עם דלית</span>
                </a>
                <a
                  href={elsieWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold border border-emerald-300 transition-colors cursor-pointer"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-600" />
                  <span>שיחה עם אלסי</span>
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Footer ראשי של אתר הבית */}
      <footer className="bg-white border-t border-brand-beige py-10 pb-24 md:pb-10 px-4 text-center text-xs text-gray-500 space-y-3">
        <p className="font-black text-base text-brand-green">
          בין לבין | מרחבים לנשים
        </p>
        <p>
          בית נשי לתוכן, חוויה ומפגש
        </p>
        <div className="pt-1">
          <button
            type="button"
            onClick={handleShareSite}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-cream hover:bg-brand-orange/10 text-brand-orange font-bold text-xs border border-brand-orange/30 transition-all cursor-pointer shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{isSharedCopied ? 'הקישור הועתק בהצלחה!' : 'שתפי את האתר עם חברות'}</span>
          </button>
        </div>
        <p className="text-[11px] text-gray-400 pt-2">
          © {new Date().getFullYear()} כל הזכויות שמורות לבין לבין.
        </p>
      </footer>

      {/* סרגל ניווט תחתון קבוע בנייד - תחושת אתר ואפליקציה אינטראקטיבית */}
      <nav aria-label="סרגל ניווט תחתון מהיר" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-brand-beige/90 py-1.5 px-2 shadow-2xl flex items-center justify-around text-center">
        <button
          type="button"
          onClick={() => scrollToSection('programs')}
          className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-brand-orange py-1 px-2 rounded-xl transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-brand-orange" />
          <span className="text-[10px] font-black">התוכניות</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('team')}
          className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-brand-orange py-1 px-2 rounded-xl transition-colors cursor-pointer"
        >
          <Users className="w-4 h-4 text-brand-green" />
          <span className="text-[10px] font-black">הצוות</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('testimonials')}
          className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-brand-orange py-1 px-2 rounded-xl transition-colors cursor-pointer"
        >
          <Quote className="w-4 h-4 text-amber-500" />
          <span className="text-[10px] font-black">המלצות</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('gallery')}
          className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-brand-orange py-1 px-2 rounded-xl transition-colors cursor-pointer"
        >
          <Flower2 className="w-4 h-4 text-[#b23a5f]" />
          <span className="text-[10px] font-black">רגעים</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('contact')}
          className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-brand-orange py-1 px-2 rounded-xl transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4 text-[#204c8e]" />
          <span className="text-[10px] font-black">צרי קשר</span>
        </button>

        <a
          href={whatsappGeneralUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 bg-[#25D366] text-white py-1 px-2.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
          title="וואטסאפ"
        >
          <WhatsAppIcon className="w-4 h-4 fill-white" />
          <span className="text-[10px] font-black">וואטסאפ</span>
        </a>
      </nav>

    </div>
  );
};

export default MainWebsite;
