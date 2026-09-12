import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ExternalLink, Copy, Check, FileCode, Sparkles, Clock, AlertCircle, Eye, ArrowLeft } from 'lucide-react';
import { AlchemyOfElementsPage } from './AlchemyOfElementsPage';
import { MidlifeMiniPage } from './MidlifeMiniPage';
import { UpTo180MiniPage } from './UpTo180MiniPage';
import { HighlightsMiniPage } from './HighlightsMiniPage';
import { TheTentMiniPage } from './TheTentMiniPage';
import { AheadOfYouMiniPage } from './AheadOfYouMiniPage';

interface ProductMeta {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  filePath: string;
  status: 'ready' | 'pending';
  component: React.ComponentType;
}

export const MiniPagesManager: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "מרכז ניהול מיני-דפי מוצרים | בין לבין (תפעולי פנימי)";
  }, []);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<string>('alchemy');

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  const getFullUrl = (slug: string) => `${origin}${pathname}#${slug}`;

  const openInNewTab = (slug: string) => {
    const fullUrl = getFullUrl(slug);
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };

  const products: ProductMeta[] = [
    {
      id: 'alchemy',
      name: 'אלכימיה של יסודות',
      subtitle: 'יום שיא בטבע לנשים: רוח, מים, אש, אדמה',
      slug: '/p/alchemy',
      filePath: 'pages/mini/AlchemyOfElementsPage.tsx',
      status: 'ready',
      component: AlchemyOfElementsPage
    },
    {
      id: 'midlife',
      name: 'אמצע החיים',
      subtitle: 'סדנת הדגל לנשים בגילאי 45-60',
      slug: '/p/midlife',
      filePath: 'pages/mini/MidlifeMiniPage.tsx',
      status: 'ready',
      component: MidlifeMiniPage
    },
    {
      id: 'up-to-180',
      name: 'עד 180°',
      subtitle: 'ארבעה מפגשים שמניעים שינוי',
      slug: '/p/up-to-180',
      filePath: 'pages/mini/UpTo180MiniPage.tsx',
      status: 'ready',
      component: UpTo180MiniPage
    },
    {
      id: 'highlights',
      name: 'היילייטס',
      subtitle: 'מניסיון ונוכחות להובלה והשפעה בארגונים',
      slug: '/p/highlights',
      filePath: 'pages/mini/HighlightsMiniPage.tsx',
      status: 'ready',
      component: HighlightsMiniPage
    },
    {
      id: 'the-tent',
      name: 'האוהל',
      subtitle: 'תוכנית למנהיגות, יוזמה והשפעה נשית',
      slug: '/p/the-tent',
      filePath: 'pages/mini/TheTentMiniPage.tsx',
      status: 'ready',
      component: TheTentMiniPage
    },
    {
      id: 'ahead-of-you',
      name: 'עוד לפנייך',
      subtitle: 'תוכנית לנשים 60+',
      slug: '/p/ahead-of-you',
      filePath: 'pages/mini/AheadOfYouMiniPage.tsx',
      status: 'ready',
      component: AheadOfYouMiniPage
    }
  ];

  const copyLink = (product: ProductMeta) => {
    const full = getFullUrl(product.slug);
    navigator.clipboard.writeText(full);
    setCopiedId(product.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const activeProduct = products.find(p => p.id === selectedPreview) || products[0];
  const ActiveComponent = activeProduct.component;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans" dir="rtl">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-brand-orange text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                תפעול פנימי בלבד
              </span>
              <span className="text-xs text-slate-500 font-bold">
                אינו גלוי לגולשות
              </span>
            </div>
            <h1 className="text-2xl font-black text-brand-green mt-1">
              קובץ עבודה מרכזי: מיני דפי מוצרים | בין לבין
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#/"
              className="text-xs font-bold text-slate-600 hover:text-brand-green bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-all"
            >
              ← חזרה לדף הנחיתה הראשי
            </a>
          </div>
        </div>
      </header>

      {/* Operational Dashboard Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Architecture & Separation Notice */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-8 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-emerald-900 mb-1">
              הפרדה מוחלטת ובטוחה בין הדפים
            </h2>
            <p className="text-sm text-emerald-800 leading-relaxed">
              כל מיני-דף בנוי כקובץ עצמאי ונפרד לחלוטין. שינוי, עריכה או עדכון טקסט בדף אחד (למשל באלכימיה של יסודות) מתבצע בקובץ שלו בלבד ולעולם אינו משפיע על דפים אחרים.
              הגולשת המקבלת קישור ישיר רואה <strong>רק את הדף שלה</strong>, ללא שום ניווט בין שאר המוצרים.
            </p>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mb-10">
          <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
            <span>רשימת מיני דפי המוצרים</span>
            <span className="text-xs font-normal text-slate-500">({products.length} מוצרים במערכת)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => {
              const isSelected = selectedPreview === product.id;
              const isReady = product.status === 'ready';

              return (
                <div
                  key={product.id}
                  className={`bg-white rounded-2xl p-5 border transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-brand-green shadow-md ring-2 ring-brand-green/20'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div>
                    {/* Status Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-black px-2.5 py-1 rounded-full ${
                          isReady
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {isReady ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>טקסט מאושר ומוכן</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5 h-3.5" />
                            <span>ממתין לטקסט מאושר</span>
                          </>
                        )}
                      </span>

                      <span className="text-[11px] font-mono text-slate-400">
                        {product.slug}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-brand-green mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mb-4">
                      {product.subtitle}
                    </p>

                    {/* File path info */}
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4 text-[11px] text-slate-600 flex items-center gap-2">
                      <span className="text-slate-400 font-bold">קובץ:</span>
                      <code className="font-mono text-brand-green truncate" dir="ltr">
                        {product.filePath}
                      </code>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5 pt-3 border-t border-slate-100">
                    {/* Primary Action: Navigate to Product Page */}
                    <button
                      type="button"
                      onClick={() => navigate(product.slug)}
                      className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-orange text-white py-2.5 px-4 rounded-xl text-xs font-black transition-all shadow-xs hover:shadow cursor-pointer group"
                      title="כניסה ישירה לדף המלא של המוצר"
                    >
                      <span>כניסה לדף המוצר</span>
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    </button>

                    {/* Secondary Actions: Copy Link & Open in New Window */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => copyLink(product)}
                        className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-black py-2 px-3 rounded-xl transition-all border cursor-pointer ${
                          copiedId === product.id
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
                        }`}
                        title="העתקת הקישור הישיר לשתילה בדפי נחיתה או שליחה בוואטסאפ"
                      >
                        {copiedId === product.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>הקישור הועתק!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>העתקת קישור ישיר</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => openInNewTab(product.slug)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl transition-all cursor-pointer"
                        title="פתיחת דף המוצר בלשונית נפרדת"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Inline Preview Toggle */}
                    <button
                      type="button"
                      onClick={() => setSelectedPreview(product.id)}
                      className={`w-full flex items-center justify-center gap-1.5 text-[11px] font-bold py-1.5 rounded-xl transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-200 text-slate-800'
                          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isSelected ? 'מוצג בתצוגה מקדימה למטה' : 'תצוגה מקדימה מהירה למטה'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Preview Area inside Internal Manager */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-black text-slate-800">
                תצוגה מקדימה פנימית: {activeProduct.name}
              </span>
              <span className="text-xs bg-white px-2.5 py-0.5 rounded-full border border-slate-200 font-mono text-slate-500">
                {activeProduct.slug}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate(activeProduct.slug)}
                className="inline-flex items-center gap-1.5 text-xs font-black bg-brand-green hover:bg-brand-orange text-white px-3.5 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>כניסה לדף זה במסך מלא</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => openInNewTab(activeProduct.slug)}
                className="inline-flex items-center gap-1.5 text-xs font-black bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer"
                title="פתיחה בלשונית נפרדת"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Render the Active Product Component */}
          <div className="p-2 sm:p-6 bg-slate-200/50">
            <div className="max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden border border-slate-300">
              <ActiveComponent />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MiniPagesManager;
