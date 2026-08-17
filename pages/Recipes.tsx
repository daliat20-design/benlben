
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ButterflyIcon } from '../components/ButterflyIcon';
import { ChefHat, Search, Filter, BookOpen, Utensils, Clock, Heart, ChevronLeft } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  category: string;
  time: string;
  difficulty: 'קל' | 'בינוני' | 'מושקע';
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  notes?: string[];
  credit?: string;
  creditLink?: string;
  contactPhone?: string;
  whatsappMessage?: string;
  isArticle?: boolean;
  sections?: {
    title: string;
    content: string | string[];
    isBulletPoints?: boolean;
  }[];
}

const CATEGORIES = ['הכל', 'סלטים', 'בריאות', 'מרקים', 'קינוחים', 'תזונה', 'עריכת מזנון'];

const MOCK_RECIPES: Recipe[] = [
  {
    id: 'nutrition-summary',
    title: 'סיכום תזונה לגיל המעבר',
    category: 'תזונה',
    time: '10 דק׳ קריאה',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/65WcBm8H/images.jpg', 
    description: 'סיכום ההרצאה המלא של אנה בדוס ריכטר: תסמינים, תזונה מתאימה, תוספים וטיפים לאורח חיים בריא.',
    isArticle: true,
    ingredients: [],
    instructions: [],
    sections: [
      {
        title: 'תזונה לגיל המעבר לפי תסמינים:',
        content: ''
      },
      {
        title: 'גלי חום',
        content: 'ירידה באסטרוגן גורמת לפגיעה בהיפותלמוס – הווסת טמפ\' של הגוף'
      },
      {
        title: 'תזונה מתאימה:',
        content: [
          'מזונות המכילים פיטואסטרוגנים (תרכובות צמחיות המדמות אסטרוגן)',
          'סויה ומוצריה (המקור העשיר ביותר): פולי סויה (אדממה), טופו, טמפה, מיסו וחלב סויה.',
          'זרעים ואגוזים: זרעי פשתן (טחונים), זרעי שומשום (וטחינה), שקדים לא קלויים, אגוזי קשיו.',
          'קטניות: חומוס, עדשים, שעועית (במיוחד אדומה), אפונה.',
          'דגנים מלאים: שיבולת שועל (קוואקר), חיטה מלאה, שעורה.',
          'ירקות ופירות: ברוקולי, כרוב, נבטי אלפלפא, גזר, תפוחים, תאנים מיובשות.'
        ],
        isBulletPoints: true
      },
      {
        title: 'צמחי מרפא ותוספים עיקריים לגלי חום:',
        content: [
          'קוהוש שחור (Black Cohosh): נחשב לאחד הצמחים הפופולריים והיעילים ביותר להפחתת גלי חום ושיפור מצב הרוח.',
          'מרווה רפואית (Sage): חליטת מרווה (פושרת או קרה) ידועה כמשפרת משמעותית הזעות לילה וגלי חום.',
          'אנג\'ליקה סינית (Dong Quai): מכונה "הג\'ינסנג הנשי", מאזנת את רמות האסטרוגן ומפחיתה תסמינים.',
          'שיח אברהם (Vitex): מסייע באיזון הורמונלי, במיוחד במצבי חוסר אסטרוגן.',
          'צמחים אדפטוגניים (למצבי סטרס ועייפות): מאקה, ג\'ינסנג אמריקאי, ורודיולה.',
          'צמחים מרגיעים: ורבנה ופסיפלורה, המסייעים להפחתת חרדה ועצבנות הנלווים לגלי החום.'
        ],
        isBulletPoints: true
      },
      {
        title: 'שינויים במצב הרוח – דכדוך, דיכאון, חרדות',
        content: 'ירידה ברמות האסטרוגן משפיעה ישירות על הפחתת ייצור הסרוטונין במוח, ומוליכים עצביים נוספים כמו גאבא, דופמין.'
      },
      {
        title: 'תזונה להעלאת סרוטונין –',
        content: [
          'מזונות המעלים סרוטונין עשירים לרוב בטריפטופן (חומצת אמינו המהווה חומר מוצא), פחמימות מורכבות, ויטמין B6.',
          'מקורות טריפטופן: אגוזים (מלך, קשיו), גרעיני דלעת, בוטנים, שקדים, עוף, תרנגול הודו, ביצים, מוצרי חלב (יוגורט, קוטג\', גבינה צהובה) וסויה.',
          'פחמימות מורכבות: שיבולת שועל, בטטה, אורז מלא, וקינואה, המסייעות בשינוע הטריפטופן למוח.',
          'פירות וירקות: בננות, אבוקדו, וירקות ירוקים (תרד, ברוקולי) המספקים ויטמין B6 החיוני לתהליך.',
          'מזונות ספציפיים: אדממה (פולי סויה)'
        ],
        isBulletPoints: true
      },
      {
        title: 'נקודה נוספת חשובה לגבי סרוטונין –',
        content: 'חומר המוצא שלו זה כולסטרול!! כולסטרול נמוך לא מדובר מספיק. לצורך העניין – המלצות המקובלות הן כולסטרול כללי מתחת ל200. כולסטרול "רע" LDL מתחת ל100-130. מתחת ל100 זה מסוכן !!! אני ממליצה על לא פחות מ130. כולסטרול נמוך משבש הורמונלית. מוריד סרוטונין וגם מלטונין'
      },
      {
        title: 'מי שסובלת מכולסטרול נמוך צריכה לשלב בתזונה חמאה , ביצים , (שומן רווי ממריץ ייצור של כולסטרול) בשר שומני, סלמון, שמן קוקוס',
        content: ''
      },
      {
        title: 'מזונות להעלאת רמות מלטונין –',
        content: 'שקדים, גרעיני חמניה, גוג\'י ברי, דובדבנים, קיווי, בננות, אגוזי מלך'
      },
      {
        title: 'חוסר שקט , עצבנות, סטרס',
        content: 'ירידה באסטרוגן גורמת לעליה בהורמון הסטרס – קורטיזול . ולכן צריך לתמוך בבלוטת האדרנל – מצד אחד לאזן אותה שלא תייצר קורטיזול. ומצד שני שהייצור קורטיזול לא יפריע לה לייצר אסטרוגן. היא הבלוטה השניה שמייצרת לנו הורמוני מין כגיבוי (בנוסף לשחלות שמפסיקות לייצר אסטרוגן בגיל המעבר)'
      },
      {
        title: 'בנוסף למזונות שציינו קודם –',
        content: 'חשוב לנהל את הסטרס בדרכים נוספות כמו: תרגילי נשימה, מדיטציה, יוגה, מוסיקה, ריקוד'
      },
      {
        title: 'צמחי מרפא אדפטוגניים – לתמיכה באדרנל.',
        content: 'צמחים המסייעים לגוף להתמודד עם סטרס (דחק), מפחיתים קורטיזול ותומכים בהתאוששות מתשישות. הצמחים המובילים כוללים אשווגנדה (ויתניה משכרת), רודיולה, ג\'ינסנג לסוגיו, שוש קירח (ליקוריץ), וצמחים מרגיעים כגון וורבנה ופסיפלורה.'
      },
      {
        title: 'בעיות שינה –',
        content: [
          'נגרמות מכמה סיבות.',
          'ירידה בהורמון השינה ( עקב פגיעה בייצור סרוטונין)',
          'גלי חום והזעות לילה',
          'בנוסף למה שציינו למעלה – חשוב לשמור על הגיינת שינה: מצעי כותנה, סביבה שקטה',
          'הימנעות ממסכים לפני שינה – האור הכחול מפריעה לייצור של מלטונין וגם גורם לעוררות של המח ( רשתות חברתיות וכד..)'
        ],
        isBulletPoints: true
      },
      {
        title: 'השמנה בטנית –',
        content: [
          'השפעות עיקריות של ירידה באסטרוגן על חילוף החומרים:',
          'האטת המטבוליזם: הירידה באסטרוגן גורמת לירידה במסת השריר, דבר המוביל להאטה בקצב חילוף החומרים הבסיסי',
          'שינוי בפיזור השומן: שומן נוטה להצטבר באזור הבטן (שומן ויסרלי) במקום באזור הירכיים, מה שמגביר סיכון למחלות לב וסוכרת.',
          'ירידה ברגישות לאינסולין: הגוף מתקשה יותר לנהל את רמות הסוכר, מה שעלול להוביל לעלייה ברמות הסוכר בדם ולעלייה במשקל.',
          'עלייה בתאבון: אסטרוגן מתפקד כמדכא תיאבון טבעי; כשרמתו יורדת, נשים עשויות לחוות תחושת רעב מוגברת.',
          'השפעות נוספות: הירידה באסטרוגן קשורה גם לירידה בצפיפות העצם (אוסטאופורוזיס), עליה בכולסטרול ושינויים בתפקוד המוח והלב.'
        ],
        isBulletPoints: true
      },
      {
        title: 'טיפים חשובים לתזונה נכונה:',
        content: [
          'הרכב הצלחת משתנה.',
          'כמות חלבון גדולה יותר – מצב רגיל 0.8 גרם לכל 1 קג ממשקל הגוף . בגיל המעבר 1.2 גרם לאישה שלא מתאמנת.',
          'אישה שמתאמנת צריכה לצרוך יותר ( עד 1.6)',
          'לא לאכול רק ירקות!',
          'בגיל צעיר זה נהדר לאכול הרבה ירקות, אבל בגיל המעבר המצב משתנה.',
          'ירקות זה פחמימות שמעלות ייצור אינסולין ( גורם לאגור שומן)',
          'וזה מלא סיבים שגורמים לתחושה של נפיחות אבל חוזרים להיות רעבים אחרי זמן קצר.',
          'אין תחושת שובע לאורך זמן',
          'לא לצום ! צום מעלה רמת סטרס . הגוף נכנס למצב הישרדות ואוגר שומן.',
          'הארוחה החשובה ביותר היא ארוחת בוקר. צריך לאותת לגוף שאנחנו לא בדיאטה ולא בצום. זה מוריד רמות סטרס.',
          'במהלך היום אפשר לאכול לפי תחושה של רעב ושובע.',
          'לא סופרים קלוריות ולא אוכלים מוצרי דיאט ואוכל מעובד.',
          'מזונות מעובדים גורמים לבעיות ספיגה של חומרים מזינים. ואז האוכל לא מזין אותנו ולא נותן אנרגיה – אלא ההיפך. הוא מצריך אנרגיה בעיכול ומעייף אותנו.',
          'ממתיקים מלאכותיים לאורך זמן יכולים לגרום לתנגודת אינסולין. הסוכר נשאר בדם ותאי השומן ננעלים.',
          'ממתיקים יכולים גם לבלבל את המח. הוא דורש עוד מתוק.',
          'גלוטן – להפחית צריכה מכיוון שמערכת החיסון עוברת גם היא טלטלה בגיל המעבר ואז יכולות להיות רגישויות למזון – מה שמפריע לספיגה של חומרים מזינים מהמזון ולאיבוד אנרגיה.',
          'לא מוותרים על פחמימות - חשוב לשמור על מקור אנרגיה זמין מיידית.',
          'לא מורידים את כמות המזון – רק משנים את ההרכב שלו.',
          'חלבון – לצרוך לאורך היום את הכמות המומלצת כדי ליצור תחושת שובע לאורך כל היום.',
          'צריכת חלבון מסייעת לשמור על מסת שריר , מגבירה תחושת שובע, מאזנת הורמונלית. שומרת על חילוף חומרים תקין'
        ],
        isBulletPoints: true
      },
      {
        title: 'מסת שריר –',
        content: 'אימוני כח ( ענת הראל ) , פילאטיס אסיאתי'
      }
    ],
    credit: 'אנה בדוס ריכטר',
    contactPhone: '972507327690',
    whatsappMessage: 'היי אנה, שמעתי את ההרצאה שלך בתוכנית "בין לבין" - אשמח לשוחח'
  },
  {
    id: '2',
    title: 'מרק כתום בניחוח ג׳ינג׳ר',
    category: 'מרקים',
    time: '30 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/0jh1pytw/shutterstock-478583107-auto-Orient-c.jpg',
    description: 'מרק מחמם ומנחם, עשיר בנוגדי חמצון ומפוצץ בטעם.',
    ingredients: ['2 בטטות בינוניות', '3 גזרים', 'חתיכת דלעת (כ-300 גרם)', '1 בצל לבן', '2 ס״מ ג׳ינג׳ר טרי מגורד', 'מלח, פלפל, מעט קינמון'],
    instructions: ['מטגנים בצל וג׳ינג׳ר בסיר עמוק עד להזהבה.', 'מוסיפים את הירקות חתוכים לקוביות ומכסים במים רותחים.', 'מבשלים עד ריכוך מלא של הירקות (כ-20 דקות).', 'טוחנים בעזרת מוט בלנדר למרקם חלק וקטיפתי. מתקנים תיבול ומגישים.']
  },
  {
    id: '6',
    title: 'שייק ירוק של בוקר',
    category: 'בריאות',
    time: '5 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/Jn7XW64V/download.jpg',
    description: 'התחלה אנרגטית ליום עם שפע של ויטמינים ומינרלים.',
    ingredients: ['חופן עלי תרד טריים', 'חצי תפוח ירוק', 'חצי בננה קפואה', 'כף זרעי צ׳יה', 'כוס מים או חלב צמחי', 'מעט תמר למתיקות'],
    instructions: ['מכניסים את כל המרכיבים לבלנדר.', 'טוחנים במהירות גבוהה עד לקבלת מרקם חלק לחלוטין.', 'מוזגים לכוס גבוהה ושותים מיד.']
  },
  {
    id: '13',
    title: 'פודינג צ׳יה טרופי',
    category: 'בריאות',
    time: '15 דק׳ + השרייה',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/kg74hjJN/chia-seeds.jpg',
    description: 'ארוחה קלילה, מזינה ועתירת ערכים המבוססת על זרעי צ׳יה. מושלם כארוחת בוקר או כנשנוש בריא במהלך היום.',
    ingredients: [
      '3 כפות זרעי צ׳יה',
      '3 כפות קוקוס טחון (או קמח שקדים / שיבולת שועל)',
      '½ כוס מים',
      '⅓ כוס חלב (מכל סוג)',
      'קורט מלח',
      'תמצית וניל או גרידת תפוז/לימון',
      'תוספות בהגשה: פירות חתוכים, ממרח שקדים, מייפל/דבש, יוגורט'
    ],
    instructions: [
      'נכניס את זרעי הצ׳יה והקוקוס לצנצנת, נוסיף מים, חלב, מלח ווניל.',
      'נערבב היטב ונמתין 10 דקות.',
      'נערבב שוב ונכניס למקרר לפחות ל-3 שעות (מומלץ לילה שלם).',
      'הצנצנת נשמרת במקרר עד 3 ימים סגורה ואטומה.',
      'בהגשה: מוציאים, מוסיפים תוספות שאוהבים ונהנים!'
    ]
  },
  {
    id: '14',
    title: 'כדורי במבה טבעוניים',
    category: 'קינוחים',
    time: '15 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/k59pSbys/Whats-App-Image-2026-04-20-at-10-02-58.jpg',
    description: 'כדורי אנרגיה טבעוניים ונטולי גלוטן המשלבים חמאת בוטנים וקוקוס. טעם של במבה בגרסה בריאה ומזינה.',
    ingredients: [
      '½ כוס חמאת בוטנים',
      'קורט מלח גס',
      '¼ כוס סירופ מייפל',
      '1 כוס שבבי קוקוס טחון',
      'קוקוס טחון נוסף לציפוי'
    ],
    instructions: [
      'מערבבים בקערה את חמאת הבוטנים with syrop syrup syrop synergy... מערבבים בקערה את חמאת הבוטנים עם סירופ המייפל והמלח.',
      'מוסיפים את הקוקוס הטחון ומערבבים היטב עד לקבלת עיסה אחידה.',
      'יוצרים כדורים קטנים ומצפים אותם בקוקוס טחון.',
      'מגישים באהבה!'
    ]
  },
  {
    id: '7',
    title: 'סלט ירוק עם חמוציות ופקאן משגע',
    category: 'סלטים',
    time: '15 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/HkCCxfGS/1763642852017.jpg',
    description: 'סלט מרענן טעים במיוחד, אפשר כמובן לפזר גבינות וזה אחלה מתכון לשבועות. בסדנא תיבלנו את הסלט רק בפלפל, מלח, לימון ושמן זית.',
    ingredients: [
      'צרור פטרוזיליה קצוצה',
      'צרור כוסברה קצוצה',
      'צרור נענע קצוצה',
      '3 גבעולי סלרי + העלים קצוצים',
      'חופן חמוציות',
      'חופן פקאן מסוכר קצוץ גס',
      'חופן אגוזי מלך',
      'חופן קשיו',
      'חופן בוטנים',
      'חופן גרעיני חמניה',
      '3 כפות שמן זית',
      'מיץ מלימון אחד',
      'כף חומץ בן יין אדום',
      'כף סילאן',
      'מלח ופלפל שחור לפי הטעם'
    ],
    instructions: [
      'נקצוץ את כל הירק ונשים בקערה גדולה.',
      'נתבל בשמן, מיץ לימון, חומץ בן יין, סילאן, מלח ופלפל ונערבב היטב.',
      'נוסיף את כל הפיצוחים ונערבב שוב.'
    ],
    credit: 'סוניה סאני בן הרוש - אמהות מבשלות',
    creditLink: 'https://imaot.co.il/Book/Page/112721'
  },
  {
    id: '15',
    title: 'סלט ברוקולי טרי וחמוציות',
    category: 'סלטים',
    time: '15 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/yNRL8qrZ/i-Stock-broccoli-salad-i.jpg',
    description: 'סלט ברוקולי טרי, פריך ונגיס שמוכיח שברוקולי לא חייב בישול כדי להיות המלך של השולחן. רוצו להכין !!!! מבטיחה לכן שתצרכו לתת את המתכון בכל אירוע שבו תגישו אותו.',
    ingredients: [
      'ראש ברוקולי, מפורק לפרחים קטנים',
      '½ בצל סגול קצוץ דק',
      '½ כוס חמוציות',
      '¼ כוס גרעיני חמנייה קלויים',
      'לרוטב: ¾ כוס מיונז (אפשר לייט או שילוב יוגורט)',
      '2 כפות חומץ',
      '2 כפות דבש',
      'מלח ופלפל שחור לפי הטעם'
    ],
    instructions: [
      'מערבבים בקערה גדולה את פרחי הברוקולי, הבצל והחמוציות.',
      'מערבבים את כל חומרי הרוטב היטב בקערה נפרדת עד לקבלת מרקם אחיד.',
      'יוצקים את הרוטב על הסלט ומערבבים היטב.',
      'מפזרים את גרעיני החמנייה מעל ושומרים במקרר עד להגשה.'
    ],
    notes: [
      'למתכון בריא יותר ומופחת קלוריות החליפי את המיונז ביוגורט יווני והוסיפי רק כף מיונז.',
      'לגרסה פרווה השאירי את המתכון כפי שהוא.'
    ],
    credit: 'מאקו',
    creditLink: 'https://www.mako.co.il/food-cooking_magazine/mayonnaise-recipes/Recipe-efe920b155ee441006.htm'
  },
  {
    id: '8',
    title: 'סלט כרוב בסגנון אסייתי',
    category: 'סלטים',
    time: '20 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/qqd9R3Sk/IMG-0300small-1024x683.jpg',
    description: 'סלט כרוב בסגנון אסייתי משגע וטעים בטירוף, עם רכיבים סודיים של חמאת בוטנים ושמן שומשום.',
    ingredients: [
      '1 כרוב לבן בינוני/גדול',
      '5-6 ענפים של בצל ירוק',
      '1 כוס שבבי שקדים קלויים',
      '½ כוס בוטנים מלוחים קלויים קצוצים גס',
      '½ כוס שומשום קלוי',
      '¼ כוס רוטב סויה',
      '¼ כוס חומץ',
      '¼ כוס שמן',
      '¼ כוס סוכר חום כהה',
      '1 כף חמאת בוטנים',
      '½ כפית שמן שומשום (מומלץ מאוד)'
    ],
    instructions: [
      'לשים את כל מרכיבי הרוטב בקערה או בצנצנת, לערבב היטב לתערובת אחידה ולהניח בצד.',
      'לחתוך את הכרוב והבצל הירוק לרצועות דקות.',
      'לערבב את הכרוב עם הרוטב ולתת לו לנוח ברוטב כחצי שעה-שעה (אפשר במקרר).',
      'לפני ההגשה להוסיף את הבצל הירוק, השקדים, הבוטנים והשומשום, לערבב היטב ולהגיש.'
    ],
    credit: 'חן במטבח',
    creditLink: 'https://www.heninthekitchen.com/%D7%A1%D7%9C%D7%93-%D7%9B%D7%A8%D7%95%D7%91-%D7%90%D7%A1%D7%99%D7%99%D7%AA%D7%99/'
  },
  {
    id: '18',
    title: 'סלט גזר צבעוני וחגיגי',
    category: 'סלטים',
    time: '15 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/pTMNSZcT/502081792017.jpg',
    description: 'סלט גזר פריך עם פקאן סיני מסוכר וחמוציות ברוטב חרדל ודבש עשיר. שילוב מושלם של מתוק וקראנצ׳י.',
    ingredients: [
      'גזרים קלופים וחתוכים לרצועות דקות או מגורדים',
      '50 גרם עירית קצוצה',
      '100 גרם פקאן סיני מסוכר',
      '100 גרם חמוציות',
      'חצי כוס שמן (לרוטב)',
      '6 כפות חומץ (לרוטב)',
      '4 כפות סוכר חום (לרוטב)',
      '4 כפות חרדל דיז׳ון (לרוטב)',
      'כפית שטוחה מלח (לרוטב)',
      'קורט פלפל שחור (לרוטב)',
      '3 שיני שום כתושות (לרוטב)'
    ],
    instructions: [
      'מכינים את הגזרים: קולפים וחותכים לרצועות קטנות ודקות (ז׳וליינים) או מגרדים בפומפייה.',
      'מניחים את הגזר בקערה גדולה ומוסיפים את העירית הקצוצה, החמוציות והפקאן הסיני.',
      'מכינים את הרוטב: בקערה קטנה או בצנצנת מערבבים היטב את השמן, החומץ, הסוכר החום, החרדל, המלח, הפלפל והשום הכתוש עד לקבלת מרקם אחיד.',
      'לפני ההגשה, יוצקים את הרוטב על הסלט, מערבבים הכל היטב ומגישים.'
    ],
    credit: 'אמהות מבשלות',
    creditLink: 'https://imaot.co.il/Book/Page/119402'
  },
  {
    id: '19',
    title: 'סלט חסה רענן עם תפוחים',
    category: 'סלטים',
    time: '10 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/JnKLBXK3/racheliyeshurun-02643-Lettuce-salad-with-apples-9aff1bbe-e8e2-4cd2-b46f-920b667986c5.jpg',
    description: 'סלט חסה קלאסי ומרענן עם שדרוג של קוביות תפוח וגרעינים פריכים. הרוטב המאוזן של חרדל ודבש מחבר את כל הטעמים בצורה מושלמת.',
    ingredients: [
      'חסה טרייה ושטופה',
      'עלי בייבי',
      'תפוח חתוך לקוביות קטנות',
      'עגבניות שרי',
      'גרעיני חמניה או אגוזי מלך',
      'מיץ מלימון סחוט אחד',
      '2 כפות שמן זית',
      'חצי כפית חרדל דיז׳ון',
      'כפית קטנה דבש',
      'מלח ופלפל שחור לפי הטעם'
    ],
    instructions: [
      'נשטוף וניבש היטב את עלי החסה ועלי הבייבי.',
      'נקע את עלי החסה לחתיכות נוחות לאכילה ונניח בקערה עם עלי הבייבי.',
      'נוסיף את קוביות התפוחים, עגבניות השרי והאגוזים/גרעינים.',
      'בצנצנת קטנה נערבב היטב את כל מרכיבי הרוטב: מיץ לימון, שמן זית, חרדל, דבש ותבלינים.',
      'נצוק את הרוטב על הסלט בסמוך להגשה ונערבב בעדינות.'
    ]
  },
  {
    id: '9',
    title: 'השראה לעריכת מזנון',
    category: 'עריכת מזנון',
    time: '10 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/yYRwMBQJ/Whats-App-Image-2026-04-20-at-09-00-18.jpg',
    description: 'רעיונות לעיצוב והגשה אסתטית של מזנון אירוח עשיר ומזמין.',
    ingredients: ['כלי הגשה בגבהים שונים', 'מפות בטקסטורות טבעיות', 'סידורי פרחים קטנים', 'שפע של צבע וטריות'],
    instructions: []
  },
  {
    id: '10',
    title: 'השראה לעריכת מזנון',
    category: 'עריכת מזנון',
    time: '10 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/Gty5nJQn/Whats-App-Image-2026-04-20-at-09-00-19.jpg',
    description: 'סידור מזנון המדגיש עושר ויזואלי ושילוב נכון של מרקמים.',
    ingredients: ['מגשי עץ', 'קערות קרמיקה', 'ירקות ופירות חתוכים בצורה מושכת'],
    instructions: []
  },
  {
    id: '11',
    title: 'השראה לעריכת מזנון',
    category: 'עריכת מזנון',
    time: '10 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/65CmHcq0/Whats-App-Image-2026-04-20-at-09-00-20.jpg',
    description: 'משחקי צבעים וטריות בהגשת סלטים.',
    ingredients: ['צבעוניות של ירקות', 'פריסה אסתטית', 'שילוב של דגנים וקטניות'],
    instructions: []
  },
  {
    id: '12',
    title: 'השראה לעריכת מזנון',
    category: 'עריכת מזנון',
    time: '10 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/bvVCGFVQ/Whats-App-Image-2026-04-20-at-09-00-20-(2).jpg',
    description: 'מבט מקרוב על פרטי העריכה והשילוב המשולם של המנות.',
    ingredients: ['פרטים קטנים שעושים הבדל', 'תבלינים וקישוטים מעל המנות', 'סידור שמאפשר גישה נוחה'],
    instructions: []
  },
  {
    id: '16',
    title: 'השראה לעריכת מזנון',
    category: 'עריכת מזנון',
    time: '10 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/SKtyLv67/72c53d68-c242-4e9a-9db1-6e6566b2c9ed.jpg',
    description: 'עיצוב מזנון עשיר וצבעוני המשלבת מנות מגוונות בהגשה אסתטית. שימוש נכון בכלים ובגבהים יוצר עניין ויזואלי.',
    ingredients: ['שילובי צבעים עזים', 'כלים דקורטיביים', 'סידור שמאפשר זרימה נוחה לאורחים'],
    instructions: []
  },
  {
    id: '21',
    title: 'השראה לעריכת מזנון',
    category: 'עריכת מזנון',
    time: '10 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/6qPwY2PY/Whats-App-Image-2026-04-27-at-17-50-20.jpg',
    description: 'מזנון עשיר בעלים ירוקים וירקות טריים בסידור אסתטי ומזמין.',
    ingredients: ['שפע של ירוקים', 'סידור שכבות', 'כלי הגשה מעוצבים'],
    instructions: []
  },
  {
    id: '22',
    title: 'השראה לעריכת מזנון',
    category: 'עריכת מזנון',
    time: '10 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/wMn8hKtZ/Whats-App-Image-2026-04-27-at-17-50-09.jpg',
    description: 'סידור שולחן חגיגי המשלב צבעוניות וטריות להגשה מושלמת.',
    ingredients: ['צבעוניות מרהיבה', 'שילוב פירות וירקות', 'הגשה מוקפדת'],
    instructions: []
  },
  {
    id: '17',
    title: 'סלט סלק שחייב להיות תמיד במקרר',
    category: 'סלטים',
    time: '45 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/pV7bjPRV/1200-11-1024x1536.jpg',
    description: 'סלט מרענן, צבעוני וטעים בטירוף. שילוב מושלם של מתוק, חמוץ ועוקצני שתמיד כיף שיש במקרר.',
    ingredients: [
      '3 סלקים יפים ומוצקים',
      '2 כפות מיץ לימון',
      '1 כף סילאן או מייפל',
      '1 כף חומץ בלסמי (או עוד לימון)',
      '3 כפות שמן זית',
      '1/2 כפית מלח',
      'חופן עלי כוסברה',
      'חופן עלי נענע או 10 ענפי עירית',
      'אופציונלי: 3 שיני שום כתושות או חצי כפית שום גבישי'
    ],
    instructions: [
      'בסיר בינוני עם הרבה מים מבשלים את הסלקים עם הקליפה עד ריכוך. מסננים וקולפים את הקליפה.',
      'חותכים את הסלקים לאצבעות או לקוביות ומניחים בקערה.',
      'מוסיפים את שאר המצרכים, מערבבים היטב ומחכים כ-30 דקות לספיגת טעמים לפני ההגשה.'
    ],
    notes: [
      'בסדנא הוספנו לו גם כדורי מוצרלה קטנים שמשדרגים אותו פלאים.',
      'אם הסלקים לא מתוקים מספיק, ניתן להוסיף עוד כף סילאן או מייפל. הטעם האידיאלי הוא מתוק-חמוץ עוקצני.',
      'טיפ: אפשר להשתמש בסלק בוואקום לקיצור זמן, אך סלק טרי מבושל הוא הטעים ביותר.'
    ],
    credit: 'קרוטית',
    creditLink: 'https://www.crunchit.co.il/%D7%A1%D7%9C%D7%98-%D7%A1%D7%9C%D7%A7-%D7%A9%D7%97%D7%99%D7%99%D7%91-%D7%9C%D7%94%D7%99%D7%95%D7%AA-%D7%AA%D7%9D%D7%99%D7%93-%D7%91%D7%9E%D7%A7%D7%A8%D7%A8/'
  },
  {
    id: '20',
    title: 'סלט אבוקדו עם ביצים',
    category: 'סלטים',
    time: '15 דק׳',
    difficulty: 'קל',
    image: 'https://i.postimg.cc/zGW3HdhL/download-(1).jpg',
    description: 'סלט אבוקדו וביצים קשות בתוספת בצל סגול, מלפפון חמוץ, מיונז ומיץ לימון. סלט קל, טעים ומהיר להכנה שכולם אוהבים.',
    ingredients: [
      '2 אבוקדו בינוניים בשלים (מרוסקים)',
      '2 ביצים קשות (קצוצות)',
      '2 מלפפונים חמוצים בינוניים (קצוצים)',
      '1 בצל סגול קטן (קצוץ)',
      '1.5 כפות מיונז',
      'מיץ מחצי לימון סחוט טרי',
      '½ כפית שטוחה פלפל שחור',
      '½ כפית שטוחה מלח (או לפי הטעם)'
    ],
    instructions: [
      'מרתיחים את הביצים במים עד שהן קשות (כ-10 דקות מרתיחה), מצננים וקולפים.',
      'קולפים את האבוקדו ומרסקים אותו בעזרת מזלג בקערה.',
      'קוצצים דק את הביצים הקשות, הבצל הסגול והמלפפון החמוץ ומוסיפים לקערה עם האבוקדו.',
      'מוסיפים את המיונז, מיץ הלימון, המלח והפלפל.',
      'מערבבים הכל היטב עד לקבלת תערובת אחידה ונהדרת.'
    ],
    notes: [
      '311 קלוריות למנה (מתוך 3-4 מנות).',
      'מומלץ להגיש על לחם קלוי או בתוך כריך.'
    ],
    credit: "רוחל'ה - בלוגרית אוכל (פורסם ב-FoodisDictionary)",
    creditLink: 'https://www.foodsdictionary.co.il/Recipes/5252'
  }
];

const RecipeBook: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('הכל');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    document.title = "ספר המתכונים של בין לבין";
  }, []);

  const filteredRecipes = MOCK_RECIPES.filter(recipe => {
    const title = recipe.title || '';
    const description = recipe.description || '';
    const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
    const matchesCategory = selectedCategory === 'הכל' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-brand-cream font-sans selection:bg-brand-beige selection:text-brand-green overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-brand-beige/30">
        <ButterflyIcon size={120} className="absolute top-32 md:top-10 right-[5%] opacity-20 animate-float" />
        <ButterflyIcon size={80} className="absolute bottom-10 left-[10%] opacity-15 animate-drift" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green text-sm font-medium mb-6"
          >
            <BookOpen size={16} />
            <span>השראה למטבח בריא ומזין</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-brand-green mb-6 leading-tight"
          >
            ספר המתכונים של <span className="text-brand-orange">בין לבין</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            אספנו עבורכן את המתכונים האהובים מהסדנא, כאלו שעושים טוב לגוף ולנשמה.
            <br />
            בנוסף, תמצאו פה: סיכום ההרצאה של אנה על תזונה בגיל המעבר ותמונות השראה לעריכת מזנון.
            <br />
            תהנו!
          </motion.p>

          {/* Search and Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-xl shadow-brand-green/5 border border-brand-green/5"
          >
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="חפשי מתכון..." 
                className="w-full pr-12 pl-4 py-3 bg-transparent outline-none text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5 w-full md:w-auto">
              <div className="flex items-center gap-1.5 px-2 md:hidden">
                <ChevronLeft size={14} className="text-brand-orange animate-pulse" />
                <span className="text-sm font-bold text-brand-orange">גללי למתכונים נוספים</span>
              </div>
              <div className="flex gap-2 p-1 bg-brand-cream rounded-xl overflow-x-auto no-scrollbar scroll-smooth">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      selectedCategory === cat 
                        ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' 
                        : 'text-gray-600 hover:bg-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                layout
                key={recipe.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-brand-green/5 flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-green">
                      {recipe.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-brand-green group-hover:text-brand-orange transition-colors">
                        {recipe.title}
                      </h3>
                      <button className="text-gray-300 hover:text-brand-orange transition-colors">
                        <Heart size={20} />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 md:line-clamp-3">
                      {recipe.description}
                    </p>
                    <div className="mt-auto pt-6 border-t border-brand-cream flex items-center justify-between text-xs text-gray-500 font-medium">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Utensils size={14} />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-20">
            <Utensils size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">לא מצאנו מתכונים התואמים את החיפוש שלך...</p>
          </div>
        )}
      </section>

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
          >
            <div 
              className="absolute inset-0 bg-brand-green/20 backdrop-blur-md" 
              onClick={() => setSelectedRecipe(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-brand-cream rounded-[40px] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 h-64 md:h-full relative overflow-hidden">
                <img 
                  src={selectedRecipe.image} 
                  alt={selectedRecipe.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-green shadow-lg hover:bg-brand-green hover:text-white transition-all"
                >
                  <Search size={20} className="rotate-45" />
                </button>
              </div>
              
              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto no-scrollbar">
                <div className="mb-8">
                  <span className="text-brand-orange font-bold text-sm tracking-wider uppercase">{selectedRecipe.category}</span>
                  <h2 className="text-3xl md:text-4xl font-black text-brand-green mt-2 mb-4">{selectedRecipe.title}</h2>
                  <div className="flex gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-brand-green/10">
                    <span className="flex items-center gap-1"><Clock size={16} /> {selectedRecipe.time}</span>
                    <span className="flex items-center gap-1"><Utensils size={16} /> {selectedRecipe.difficulty}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed italic">{selectedRecipe.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-10">
                  {selectedRecipe.isArticle && selectedRecipe.sections ? (
                    <div className="space-y-10">
                      {selectedRecipe.sections.map((section, idx) => (
                        <div key={idx} className="bg-white/50 p-6 rounded-3xl border border-brand-green/5">
                          <h4 className="text-xl font-bold text-brand-green mb-4 border-r-4 border-brand-orange pr-3">
                            {section.title}
                          </h4>
                          {Array.isArray(section.content) ? (
                            <ul className="space-y-3">
                              {section.content.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-700">
                                  {section.isBulletPoints ? (
                                    <>
                                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0" />
                                      <span>{item}</span>
                                    </>
                                  ) : (
                                    <span>{item}</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-700 leading-relaxed">{section.content}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div>
                        <h4 className="text-lg font-bold text-brand-green mb-4 flex items-center gap-2">
                           מצרכים
                        </h4>
                        <ul className="space-y-3">
                          {selectedRecipe.ingredients.map((ing, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-green/30 mt-2 shrink-0" />
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {selectedRecipe.instructions.length > 0 && (
                        <div>
                          <h4 className="text-lg font-bold text-brand-green mb-4 flex items-center gap-2">
                             אופן ההכנה
                          </h4>
                          <ol className="space-y-4">
                            {selectedRecipe.instructions.map((step, i) => (
                              <li key={i} className="flex gap-4 text-gray-700">
                                <span className="text-brand-orange font-black text-xl italic opacity-30">{i + 1}</span>
                                <span className="pt-1">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </>
                  )}

                  {selectedRecipe.notes && selectedRecipe.notes.length > 0 && (
                    <div className="bg-brand-orange/5 p-6 rounded-2xl border-r-4 border-brand-orange">
                      <h4 className="text-lg font-bold text-brand-orange mb-3 flex items-center gap-2">
                        הערות ושדרוגים
                      </h4>
                      <ul className="space-y-2">
                        {selectedRecipe.notes.map((note, i) => (
                          <li key={i} className="text-gray-700 flex items-start gap-2">
                            <span className="text-brand-orange mt-1">•</span>
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedRecipe.credit && (
                    <div className="text-sm text-gray-500 pt-4 border-t border-brand-green/10 flex flex-col gap-3">
                      <div>
                        <span className="font-bold">קרדיט: </span>
                        {selectedRecipe.credit}
                      </div>
                      {selectedRecipe.creditLink && (
                        <a 
                          href={selectedRecipe.creditLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/5 text-brand-green rounded-full hover:bg-brand-green hover:text-white transition-all w-fit font-bold text-xs"
                        >
                          <BookOpen size={14} />
                          <span>למתכון המלא בבלוג</span>
                        </a>
                      )}
                      {selectedRecipe.contactPhone && (
                        <a 
                          href={`https://wa.me/${selectedRecipe.contactPhone}?text=${encodeURIComponent(selectedRecipe.whatsappMessage || '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-full hover:bg-brand-lightGreen transition-all w-fit font-bold text-sm shadow-md"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.197 1.415 4.85 1.416 5.482 0 9.944-4.461 9.947-9.942.001-2.652-1.034-5.147-2.912-7.028-1.879-1.881-4.375-2.917-7.027-2.917-5.483 0-9.944-4.463-9.947 9.945-.001 1.751.459 3.457 1.332 4.962l-.997 3.642 3.754-.984zm11.387-5.464c-.301-.15-1.779-.879-2.053-.979-.275-.099-.475-.149-.675.15-.199.299-.775.979-.95 1.174-.175.195-.349.219-.65.069-.3-.15-1.265-.467-2.41-1.487-.89-.793-1.49-1.773-1.665-2.072-.175-.3-.019-.461.13-.611.135-.134.3-.349.449-.523.151-.174.199-.299.301-.498.101-.199.05-.374-.025-.524-.075-.15-.675-1.623-.925-2.221-.243-.585-.49-.505-.675-.514-.175-.008-.375-.01-.575-.01-.2 0-.524.075-.798.374-.275.299-1.05.1-1.05.348v.003c0 .245.21.78.285 1.39.09.73.495 2.14 1.56 3.3.735.8 1.915 1.485 3.01 1.635l1.245.185c.19.027.35-.015.51-.137.474-.362 1.172-1.397 1.172-1.397.1-.176.012-.469-.143-.59z"/>
                          </svg>
                          <span>דברי עם אנה בוואטסאפ</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default RecipeBook;
