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
  MoveHorizontal
} from 'lucide-react';
import { ButterflyIcon } from '../components/Hero';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { BrandGallerySlider } from '../components/BrandGallerySlider';
import { saveInquiry } from '../utils/inquiryStorage';

const MAIN_BRAND_LOGO_URL = "/logos/brand-main.webp";
const MAIN_BRAND_LOGO_FALLBACK = "/logos/brand-main.png";

const DALIT_PHOTO_URL = "https://i.postimg.cc/TPYf2twq/DSC-3250.jpg";
const ELSIE_PHOTO_URL = "https://i.postimg.cc/fbc302jS/Whats-App-Image-2026-09-14-at-11-31-04.jpg";

export const FLOWTRIPS_LOGO_URL = "https://i.postimg.cc/D0CqwDT0/ms'-nsy-bsqy'h-tht-flow-Trip.png";

interface WebsiteProduct {
  id: string;
  name: string;
  tabSubtitle: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  tabInactiveStyle: string;
  tabActiveStyle: string;
  hook: string;
  bodyParagraphs: string[];
  ctaPrompt: string;
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

const WEBSITE_PRODUCTS: WebsiteProduct[] = [
  {
    id: 'midlife',
    name: 'אמצע החיים',
    tabSubtitle: 'סדנת הדגל | נשים 45-60',
    subtitle: 'סדנת הדגל | נשים 45–60',
    tag: 'סדנת הדגל • נשים 45–60',
    tagColor: 'bg-brand-orange text-white',
    tabInactiveStyle: 'bg-[#FFF3EB] text-[#C56B3E] border-2 border-[#C56B3E] hover:bg-[#FFE5D2] shadow-xs',
    tabActiveStyle: 'bg-[#C56B3E] text-white border-2 border-[#9F4F24] shadow-md scale-102 ring-2 ring-offset-2 ring-[#C56B3E]',
    hook: 'את נכנסת לחדר ולא זוכרת למה. מתעוררת בשלוש בלילה עם רשימת משימות. רגע, ממתי כל זה התחיל?',
    bodyParagraphs: [
      'גיל המעבר מביא איתו הרבה יותר מגלי חום, ולא תמיד ברור מה קשור למה. לפעמים את אפילו לא בטוחה אם זו את, הגיל או סתם תקופה עמוסה במיוחד.',
      'בשמונה מפגשים עם נשות מקצוע נעשה סדר בשינויים, ננפץ כמה מיתוסים, נדבר גם על הדברים שפחות נעים לשאול ונגלה מה באמת אפשר לעשות כדי להרגיש טוב יותר.'
    ],
    ctaPrompt: 'בואי להבין מה עובר עלייך',
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
    ctaPrompt: 'בואי לגלות מה עוד לפנייך',
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
    name: 'עד 180',
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
    ctaPrompt: 'אולי הגיע הזמן להזיז משהו?',
    logoUrl: '/logos/up-to-180.webp',
    logoFallback: '/logos/up-to-180.png',
    link: '/midlife-movement?from=programs',
    accentColor: '#204C8E',
    borderStyle: 'border-2 border-[#204C8E]/40 hover:border-[#204C8E] shadow-[0_8px_30px_rgba(32,76,142,0.1)] hover:shadow-xl',
    buttonStyle: 'bg-[#204C8E] hover:bg-[#183a6d] text-white',
    cardBg: 'bg-gradient-to-b from-[#f8faff] via-[#f0f4fc] to-[#e8effa]',
  },
  {
    id: 'flowtrips',
    name: 'FLOWTRIPS',
    tabSubtitle: 'חוויות דרך לנשים',
    subtitle: 'חוויות דרך לנשים',
    tag: 'חוויות דרך לנשים',
    tagColor: 'bg-[#d97706] text-white',
    tabInactiveStyle: 'bg-[#FFFBEB] text-[#b45309] border-2 border-[#d97706] hover:bg-[#FEF3C7] shadow-xs',
    tabActiveStyle: 'bg-[#d97706] text-white border-2 border-[#92400e] shadow-md scale-102 ring-2 ring-offset-2 ring-[#d97706]',
    hook: 'בטיול מאורגן מגלים מקומות. בריטריט מתמקדים בעצמנו. ומה אם לא צריך לבחור?',
    bodyParagraphs: [
      'דמייני חוויה שבה טבע, תרבות, טעמים מקומיים, מפגשים אנושיים, תנועה ותוכן משתלבים בדרך אחת. בלי מרוץ בין אטרקציות ובלי להרגיש שאת צריכה לעבוד על עצמך בכל רגע.',
      'אנחנו דואגות לחיבורים שבין כל אלה, כדי שאת תוכלי פשוט להיות שם, ליהנות, להסתקרן, להכיר ולגלות מה קורה כשנותנים גם לדרך עצמה מקום להפתיע.',
      'לא ריטריט. לא טיול. חוויה שבונה את הדרך שלך.'
    ],
    ctaPrompt: 'בואי לגלות מה זה FlowTrips',
    logoUrl: FLOWTRIPS_LOGO_URL,
    link: '/p/flowtrips?from=programs',
    accentColor: '#d97706',
    borderStyle: 'border-2 border-amber-400/50 hover:border-amber-500 shadow-[0_8px_30px_rgba(217,119,6,0.1)] hover:shadow-xl',
    buttonStyle: 'bg-amber-600 hover:bg-amber-700 text-white',
    cardBg: 'bg-gradient-to-b from-[#fffefc] via-[#fffbf2] to-[#fef3c7]/40',
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
    ctaPrompt: 'בואי ליצור מרחב בקהילה שלך',
    logoUrl: '/logos/the-tent.webp',
    logoFallback: '/logos/the-tent.png',
    link: '/p/the-tent?from=programs',
    accentColor: '#a8672a',
    borderStyle: 'border-2 border-[#a8672a]/30 hover:border-[#a8672a] shadow-[0_8px_30px_rgba(168,103,42,0.08)] hover:shadow-xl',
    buttonStyle: 'bg-[#a8672a] hover:bg-[#8c5421] text-white',
    cardBg: 'bg-gradient-to-b from-[#fffcf9] via-[#fdf7f0] to-[#f7ece0]',
  },
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
    ctaPrompt: 'בואו נביא את השינוי לארגון שלכם',
    logoUrl: '/logos/highlights.webp',
    logoFallback: '/logos/highlights.png',
    link: '/p/highlights?from=programs',
    accentColor: '#204c8e',
    borderStyle: 'border-2 border-[#204c8e]/30 hover:border-[#204c8e] shadow-[0_8px_30px_rgba(32,76,142,0.08)] hover:shadow-xl',
    buttonStyle: 'bg-[#204c8e] hover:bg-[#183a6d] text-white',
    cardBg: 'bg-gradient-to-b from-[#f9fafc] via-[#f1f4f9] to-[#e4eaf3]',
  },
];

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
    program: "FLOWTRIPS בטבע",
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

  // תצוגת חלון אינטראקטיבי למוצרים (מונע גלילה אינסופית בנייד)
  const [activeProductIdx, setActiveProductIdx] = useState(0);

  // תצוגת חלון אינטראקטיבי לצוות (דלית / אלסי)
  const [activeTeamMember, setActiveTeamMember] = useState<'dalit' | 'elsie'>('dalit');

  // תצוגת חלון אינטראקטיבי להמלצות (סליידר יחיד)
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('אמצע החיים (סדנת הדגל)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  // מחוות הזזה פיזית (Touch Swipe) לתוכניות
  const productTouchStartX = useRef<number | null>(null);
  const productTouchEndX = useRef<number | null>(null);

  const handleProductTouchStart = (e: React.TouchEvent) => {
    productTouchEndX.current = null;
    productTouchStartX.current = e.targetTouches[0].clientX;
  };

  const handleProductTouchMove = (e: React.TouchEvent) => {
    productTouchEndX.current = e.targetTouches[0].clientX;
  };

  const handleProductTouchEnd = () => {
    if (productTouchStartX.current === null || productTouchEndX.current === null) return;
    const distance = productTouchStartX.current - productTouchEndX.current;
    const minSwipe = 40;

    // גרירה שמאלה = מעבר לתוכנית הבאה
    if (distance > minSwipe) {
      setActiveProductIdx((prev) => (prev === WEBSITE_PRODUCTS.length - 1 ? 0 : prev + 1));
    } 
    // גרירה ימינה = מעבר לתוכנית הקודמת
    else if (distance < -minSwipe) {
      setActiveProductIdx((prev) => (prev === 0 ? WEBSITE_PRODUCTS.length - 1 : prev - 1));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('נא להזין שם מלא');
      return;
    }
    const cleanPhone = phone.trim().replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setErrorMessage('נא להזין מספר טלפון תקין');
      return;
    }

    setIsSubmitting(true);

    try {
      await saveInquiry({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        programs: [selectedProgram],
        notes: notes.trim(),
        source: 'אתר הבית הראשי של בין לבין',
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
              מי אנחנו
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
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-[#25D366]/15 hover:bg-[#25D366] text-brand-green hover:text-white border border-[#25D366]/40 py-2 px-3.5 sm:px-4 rounded-full transition-all cursor-pointer shadow-2xs"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>שיחה בוואטסאפ</span>
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
              מי אנחנו (דלית ואלסי)
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
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-white p-3 border-4 border-brand-green/30 shadow-xl flex items-center justify-center">
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

            <div className="flex flex-col items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black tracking-widest text-brand-green/80 uppercase">
                בין לבין
              </span>
              <span className="text-xl sm:text-2xl font-black text-brand-orange">
                מרחבים לנשים
              </span>
            </div>

            {/* כותרת ראשית (H1) לפי המלל המדויק */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-brand-green tracking-tight leading-tight max-w-3xl mx-auto">
              אנחנו לא סופרות שנים. אנחנו משתמשות בהן לטובתנו.
            </h1>

            {/* שאלה פותחת מודגשת */}
            <p className="text-lg sm:text-2xl font-black text-brand-orange max-w-2xl mx-auto leading-snug">
              רגע, מי החליט שעם השנים האפשרויות שלנו מצטמצמות?
            </p>

            {/* המניפסט השלם של בין לבין */}
            <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm p-6 sm:p-9 rounded-3xl border border-brand-orange/30 shadow-md text-right space-y-4">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-normal">
                נכון, יש דברים שמשתנים. הגוף לא תמיד משתף פעולה, החיים מזיזים לנו את הגבינה ולפעמים יותר מזה. אבל בואי, לא הגענו עד לכאן בידיים ריקות.
              </p>
              
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-normal">
                צברנו ניסיון, ידע, קשרים, חוכמת חיים והיכרות עם עצמנו שלא הייתה לנו פעם. אז למה שלא נשתמש בכל אלה כדי להפיק יותר ממה שעוד לפנינו?
              </p>

              <p className="text-lg sm:text-xl font-black text-brand-green pt-1">
                בדיוק מהחשיבה הזו נולדה בין לבין.
              </p>

              <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-normal">
                יצרנו מרחבים נשיים שמשלבים <strong className="font-black text-brand-orange">מפגש, תוכן וחוויה</strong> בדרכים קצת אחרות: סדנאות, תוכניות עומק, חוויות דרך ומפגשים שמביאים איתם ידע חדש, התנסויות, אנשים מעניינים והרבה מקום להנאה ולגילוי.
              </p>

              <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-normal">
                כל מרחב פוגש תקופה אחרת בחיים, רצון אחר או משהו שמתחשק לך לנסות.
              </p>

              <div className="pt-4 border-t border-brand-beige">
                <p className="text-base sm:text-lg font-black text-brand-green leading-snug text-center">
                  אז מה מתאים לך עכשיו? יש לנו הרגשה שנצליח להפתיע אותך, לגלות את המרחב שמתאים לך עכשיו
                </p>
              </div>
            </div>

            {/* כפתורי פעולה ב-Hero */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => scrollToSection('programs')}
                className="w-full sm:w-auto px-8 py-4 bg-brand-orange hover:bg-brand-green text-white font-black text-base sm:text-lg rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                לתוכניות והמרחבים שלנו
              </button>
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-gray-50 text-gray-800 font-bold text-base rounded-2xl border border-gray-300 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>דברי איתנו בוואטסאפ</span>
              </a>
            </div>

          </div>
        </section>

        {/* 2. מתחם 6 המוצרים והמרחבים שלנו - חלון תצוגה אינטראקטיבי חכם עם דפדוף והזזה פיזית */}
        <section id="programs" className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-b border-brand-beige/80 relative overflow-hidden">
          <div className="max-w-5xl mx-auto">
            
            {/* כותרת החלק */}
            <div className="text-center mb-7 sm:mb-9">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-green text-white rounded-full text-xs sm:text-sm font-black mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>המרחבים והתוכניות שלנו</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-green tracking-tight mb-2">
                בחרי מרחב שמתאים לך עכשיו
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto font-medium">
                לחצי לדפדוף בין 6 התוכניות.
              </p>
              <div className="h-1 w-20 bg-brand-orange mx-auto mt-3 rounded-full opacity-60"></div>
            </div>

            {/* סרגל לשוניות בחירה בין 6 המוצרים: כל לשונית בצבע הייחודי של התוכנית עוד לפני הלחיצה! */}
            <div className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar pb-2">
              <div className="flex items-stretch sm:justify-center gap-2 sm:gap-2.5 min-w-max">
                {WEBSITE_PRODUCTS.map((prod, idx) => {
                  const isActive = activeProductIdx === idx;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => setActiveProductIdx(idx)}
                      className={`px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-right transition-all flex flex-col justify-center cursor-pointer whitespace-nowrap ${
                        isActive ? prod.tabActiveStyle : prod.tabInactiveStyle
                      }`}
                    >
                      <div className="flex items-center gap-1.5 justify-between">
                        <span className="text-xs sm:text-sm font-black tracking-tight">{prod.name}</span>
                        {prod.isFlagship && (
                          <Crown className={`w-3 h-3 fill-current shrink-0 ${isActive ? 'text-amber-300' : 'text-[#C56B3E]'}`} />
                        )}
                      </div>
                      <span className={`text-[11px] font-bold leading-tight mt-0.5 ${isActive ? 'text-white/95' : 'opacity-90'}`}>
                        {prod.tabSubtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* חלון תצוגה ממוקד (Focused Window) עם תמיכה בהזזה פיזית לשמאל או לימין (Touch Swipe) ובחיצים */}
            {(() => {
              const prod = WEBSITE_PRODUCTS[activeProductIdx];
              const prevIdx = activeProductIdx === 0 ? WEBSITE_PRODUCTS.length - 1 : activeProductIdx - 1;
              const nextIdx = activeProductIdx === WEBSITE_PRODUCTS.length - 1 ? 0 : activeProductIdx + 1;
              const productWhatsappUrl = `https://wa.me/972508353731?text=${encodeURIComponent(`שלום דלית ואלסי, הגעתי דרך אתר הבית ואשמח לקבל פרטים על ${prod.name}`)}`;

              return (
                <div className="relative animate-in fade-in duration-300">
                  {/* החלון המרכזי של המוצר הנבחר - תומך בהזזה פיזית וגרירה בנייד */}
                  <div 
                    onTouchStart={handleProductTouchStart}
                    onTouchMove={handleProductTouchMove}
                    onTouchEnd={handleProductTouchEnd}
                    style={{ touchAction: 'pan-y' }}
                    className={`${prod.cardBg} rounded-3xl p-6 sm:p-9 ${prod.borderStyle} text-right relative shadow-lg select-none`}
                  >
                    
                    {/* סרגל עליון בתוך החלון: תגית מוצר + דפדוף ישיר בחיצים (ללא מספור!) */}
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

                      {/* חיצי דפדוף בין המוצרים ישירות מתוך החלון (ללא מספרי תוכניות) */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveProductIdx(prevIdx)}
                          className="p-1.5 sm:p-2 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-brand-orange border border-gray-200 shadow-2xs transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                          title="לתוכנית הקודמת"
                          aria-label="לתוכנית הקודמת"
                        >
                          <ChevronRight className="w-4 h-4" />
                          <span className="hidden sm:inline">הקודמת</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveProductIdx(nextIdx)}
                          className="p-1.5 sm:p-2 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-brand-orange border border-gray-200 shadow-2xs transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                          title="לתוכנית הבאה"
                          aria-label="לתוכנית הבאה"
                        >
                          <span className="hidden sm:inline">הבאה</span>
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* כותרת המוצר ולוגו */}
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
                          {prod.name}
                        </h3>
                        {prod.subtitle && (
                          <p className="text-sm sm:text-base font-bold text-gray-600 mt-0.5">
                            {prod.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* פתיח מודגש מעורר מחשבה (Hook) */}
                    {prod.hook && (
                      <div className="mb-5 bg-white/85 p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-2xs">
                        <p className="text-base sm:text-lg text-gray-900 font-black leading-snug">
                          {prod.hook}
                        </p>
                      </div>
                    )}

                    {/* פסקאות התוכן המפורטות */}
                    <div className="space-y-3.5 text-sm sm:text-base text-gray-700 leading-relaxed font-normal mb-6">
                      {prod.bodyParagraphs.map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* קריאה מעוררת השראה בסיום */}
                    {prod.ctaPrompt && (
                      <div className="py-3 px-4 bg-brand-green/10 rounded-2xl mb-6 text-center border border-brand-green/20">
                        <span className="text-sm sm:text-base font-black text-brand-green tracking-tight">
                          {prod.ctaPrompt}
                        </span>
                      </div>
                    )}

                    {/* שורת כפתורי פעולה בתוך החלון */}
                    <div className="pt-4 border-t border-gray-200/70 flex flex-col sm:flex-row items-center gap-3">
                      <Link
                        to={prod.link}
                        className={`w-full sm:flex-1 inline-flex items-center justify-center gap-2 ${prod.buttonStyle} py-3.5 px-6 rounded-2xl text-base font-black transition-all shadow-sm hover:shadow-md cursor-pointer`}
                      >
                        <span>לפרטים המלאים והרשמה</span>
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
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

                  {/* רמז עדין למובייל על אפשרות הזזה פיזית וחיצים */}
                  <div className="flex sm:hidden items-center justify-center gap-2 text-[11px] text-gray-400 font-bold mt-3">
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>החליקי ימינה או שמאלה למעבר בין התוכניות</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </div>

                  {/* אינדיקטור נקודות מתחת לחלון לדפדוף ישיר (ללא מספור!) */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {WEBSITE_PRODUCTS.map((p, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => setActiveProductIdx(dotIdx)}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          activeProductIdx === dotIdx
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

        {/* 4. הסיפור שלנו - דלית ואלסי - חלון מתחלף ממוקד */}
        <section id="team" className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-b border-brand-beige/80 relative">
          <div className="max-w-4xl mx-auto text-right">
            
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-5xl font-black text-brand-green tracking-tight mb-2">
                קצת עלינו
              </h2>
              <p className="text-base sm:text-xl text-gray-700 font-bold max-w-xl mx-auto leading-relaxed px-2">
                הצוות שמאחורי התוכניות, הסדנאות והריטריטים של בין לבין
              </p>
              <div className="h-1.5 w-24 bg-brand-orange mx-auto mt-3 rounded-full opacity-60"></div>
            </div>

            {/* לשוניות מעבר מהיר בין דלית לאלסי (חוסך גלילה כפולה בנייד) */}
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
              <button
                type="button"
                onClick={() => setActiveTeamMember('dalit')}
                className={`flex-1 sm:flex-initial px-5 py-3 rounded-2xl text-sm sm:text-base font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                  activeTeamMember === 'dalit'
                    ? 'bg-brand-green text-white shadow-md ring-2 ring-offset-2 ring-brand-green scale-102'
                    : 'bg-brand-cream text-gray-700 hover:bg-gray-100 border border-brand-beige'
                }`}
              >
                <span>דלית כורה</span>
                <span className="text-xs opacity-90 hidden sm:inline">• הוגה ומובילת התוכניות</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTeamMember('elsie')}
                className={`flex-1 sm:flex-initial px-5 py-3 rounded-2xl text-sm sm:text-base font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                  activeTeamMember === 'elsie'
                    ? 'bg-brand-orange text-white shadow-md ring-2 ring-offset-2 ring-brand-orange scale-102'
                    : 'bg-brand-cream text-gray-700 hover:bg-gray-100 border border-brand-beige'
                }`}
              >
                <span>אלסי זיסלמן</span>
                <span className="text-xs opacity-90 hidden sm:inline">• מנחה וטריינרית NLP</span>
              </button>
            </div>

            {/* חלון הצגת חברת הצוות הנבחרת (מונע גלילה ארוכה) */}
            <div className="animate-in fade-in duration-300">
              {activeTeamMember === 'dalit' ? (
                /* כרטיס דלית כורה */
                <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-md border-2 border-brand-green/30 border-t-8 border-t-brand-green flex flex-col text-right">
                  <div className="mb-4 text-center flex flex-col items-center">
                    <div className="relative mb-3">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-md ring-4 ring-brand-green/25 bg-brand-cream">
                        <img 
                          src={DALIT_PHOTO_URL} 
                          alt="דלית כורה - בין לבין" 
                          className="w-full h-full object-cover object-[center_20%]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-black text-brand-green mb-1 text-center">
                      דלית כורה
                    </h3>
                    <div className="inline-block px-4 py-1 bg-brand-green/10 text-brand-green font-black text-sm rounded-full border border-brand-green/20">
                      הוגה ומובילת התוכניות
                    </div>
                  </div>
                  <div className="w-16 h-1 bg-brand-orange mb-5 rounded-full mx-auto"></div>
                  
                  <div className="space-y-3.5 text-gray-700 leading-relaxed text-sm sm:text-base font-normal mb-6">
                    <p>
                      מתמחה בהובלת פרויקטים, בפיתוח תוכניות ובתרגום רעיונות לתהליכים יישומיים, מדויקים וברורים. לאורך השנים צברה ניסיון בהובלת קהילות נשים, בפיתוח תוכן ובהפקת תוכניות ואירועים, מתוך היכרות עמוקה עם הדרך שבה תוכן, שיח וחוויה מתחברים לתהליך שלם.
                    </p>
                    <p className="font-bold text-brand-green text-center text-sm sm:text-base bg-brand-cream/60 p-3 rounded-2xl border border-brand-beige">
                      ב&quot;בין לבין&quot; דלית מחזיקה את התמונה הגדולה ואת הפרטים הקטנים, ומובילה את התוכניות משלב הרעיון, דרך הפיתוח והדיוק ועד למימוש.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-center">
                    <a
                      href={dalitWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-green hover:bg-[#1e3d31] text-white font-black text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>שיחה ישירה עם דלית בוואטסאפ</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* כרטיס אלסי זיסלמן */
                <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-md border-2 border-brand-orange/30 border-t-8 border-t-brand-orange flex flex-col text-right">
                  <div className="mb-4 text-center flex flex-col items-center">
                    <div className="relative mb-3">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-md ring-4 ring-brand-orange/25 bg-brand-cream">
                        <img 
                          src={ELSIE_PHOTO_URL} 
                          alt="אלסי זיסלמן - בין לבין" 
                          className="w-full h-full object-cover object-[center_25%]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-black text-brand-green mb-1 text-center">
                      אלסי זיסלמן
                    </h3>
                    <div className="inline-block px-4 py-1 bg-brand-orange/10 text-brand-orange font-black text-sm rounded-full border border-brand-orange/20">
                      מנחה ומרצה, טריינרית NLP
                    </div>
                  </div>
                  <div className="w-16 h-1 bg-brand-green mb-5 rounded-full mx-auto"></div>
                  
                  <div className="space-y-3.5 text-gray-700 leading-relaxed text-sm sm:text-base font-normal mb-6">
                    <p>
                      מלווה תהליכים אישיים וקבוצתיים של שינוי, התבוננות וקבלת החלטות. בעלת ניסיון בהנחיית קבוצות ובעבודה עם נשים, ומביאה לתוכניות כלים מעולם ה־NLP לצד יכולת להוביל שיח שמאפשר להתבונן, לדייק ולנוע קדימה.
                    </p>
                    <p className="font-bold text-brand-green text-center text-sm sm:text-base bg-brand-cream/60 p-3 rounded-2xl border border-brand-beige">
                      ב&quot;בין לבין&quot; אלסי מובילה את תהליכי ההתבוננות והשיח, ומסייעת לנשים לתרגם תובנות לבחירות ולצעדים מעשיים.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-center">
                    <a
                      href={elsieWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange hover:bg-[#a8582d] text-white font-black text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>שיחה ישירה עם אלסי בוואטסאפ</span>
                    </a>
                  </div>
                </div>
              )}
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
                          {currentT.program}
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

            {/* באנר הזמנה להצטרף (מופיע פעם אחת) */}
            <div className="mt-10 sm:mt-12 bg-white rounded-3xl p-6 sm:p-8 border-2 border-brand-orange/30 shadow-xs text-center max-w-xl mx-auto space-y-3.5">
              <Sparkles className="w-7 h-7 text-brand-orange mx-auto" />
              <h3 className="text-xl sm:text-2xl font-black text-brand-green">
                רוצה גם את להיות חלק מהמרחב הזה?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                נשמח להכיר, להתאים לך את התוכנית המדויקת ביותר ולפתוח יחד דלת לפרק הבא שלך.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange hover:bg-[#B85D19] text-white font-black text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <span>בואי נדבר – לחצי להשארת פרטים</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* 6. יצירת קשר - בואי נתחבר */}
        <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-brand-cream relative">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border-2 border-brand-orange/30 shadow-md text-right space-y-6">
            
            <div className="text-center space-y-2">
              <span className="inline-block px-4 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-black">
                אנחנו כאן בשבילך
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-green">
                בואי נתחבר
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                סמני איזו תוכנית מעניינת אותך, השאירי פרטים ונשמח לחזור אלייך לשיחה אישית:
              </p>
            </div>

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

                {/* שם מלא */}
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

                {/* טלפון */}
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

                {/* תוכנית מעניינת */}
                <div className="space-y-1.5 pt-1">
                  <label className="block text-sm font-bold text-gray-800">
                    באיזו תוכנית את מתעניינת?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {WEBSITE_PRODUCTS.map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => setSelectedProgram(prod.name)}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all text-right cursor-pointer flex items-center justify-between ${
                          selectedProgram === prod.name
                            ? 'bg-brand-orange text-white border-brand-orange shadow-xs'
                            : 'bg-[#FFF9F4] text-gray-700 border-gray-200 hover:border-brand-orange/40'
                        }`}
                      >
                        <span>{prod.name}</span>
                        <span className="text-[11px] opacity-80">{prod.subtitle || prod.tag.split('•')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* כמה מילים על עצמך */}
                <div className="space-y-1 pt-1">
                  <label htmlFor="site-notes" className="block text-sm font-bold text-gray-800">
                    כמה מילים על עצמך / שאלה שתרצי לשאול:
                  </label>
                  <textarea
                    id="site-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="נשמח לשמוע מה מביא אותך אלינו..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-[#FFF9F4] text-base outline-none text-right transition-colors"
                  />
                </div>

                {/* כפתור שליחה */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-brand-orange hover:bg-brand-green disabled:opacity-50 text-white font-black text-lg rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    {isSubmitting ? 'שולח...' : 'השאירי פרטים ונשמח לחזור אלייך'}
                  </button>
                </div>

              </form>
            )}

            {/* כפתור שיחה ישירה בוואטסאפ */}
            <div className="pt-4 border-t border-gray-100 text-center">
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>מעדיפה לפנות ישירות בוואטסאפ? לחצי כאן לשיחה עם דלית או אלסי</span>
              </a>
            </div>

          </div>
        </section>

      </main>

      {/* Footer ראשי של אתר הבית */}
      <footer className="bg-white border-t border-brand-beige py-10 pb-24 md:pb-10 px-4 text-center text-xs text-gray-500 space-y-2">
        <p className="font-black text-base text-brand-green">
          בין לבין | מרחבים לנשים
        </p>
        <p>
          בית נשי לתוכן, חוויה ומפגש
        </p>
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
