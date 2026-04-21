import { BlockData } from '@/types/lp';
import { getTextStyle } from '@/lib/styles';

export default function Hero({ data }: { data: BlockData }) {
  const alignment = data.badge === 'left' ? 'text-left' : (data.badge === 'right' ? 'text-right' : 'text-center');
  const itemsAlignment = data.badge === 'left' ? 'items-start' : (data.badge === 'right' ? 'items-end' : 'items-center');
  const isDark = data.textColor === '#ffffff' || !data.textColor;

  return (
    <section className={`relative py-16 md:py-24 ${alignment} max-w-5xl mx-auto px-6 overflow-hidden flex flex-col ${itemsAlignment}`}>
      <h1 
        className={`text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] md:leading-[1.05] mb-8 tracking-[-0.05em] max-w-4xl ${isDark ? 'font-serif' : 'font-sans uppercase italic'}`}
        style={{ 
          color: data.textColor || '#0f172a', 
          fontSize: data.fontSize ? `${data.fontSize}px` : undefined,
          ...getTextStyle(data, 'title') 
        }}
      >
        {data.title || 'Judul Landing Page Anda'}
      </h1>
      
      <p 
        className={`text-lg md:text-xl max-w-3xl mb-12 leading-relaxed font-medium ${isDark ? 'opacity-70' : 'text-slate-600'}`}
        style={{ 
          color: isDark ? '#ffffff' : (data.textColor || '#64748b'), 
          ...getTextStyle(data, 'subtitle') 
        }}
      >
        {data.subtitle || 'Tuliskan penjelasan singkat yang menarik di sini untuk meyakinkan pengunjung Anda.'}
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16 w-full sm:w-auto">
        <a 
          href={data.ctaLink || '#'} 
          className={`px-12 py-5 text-white rounded-2xl font-black text-xs md:text-sm tracking-widest hover:scale-105 transition-all uppercase shadow-xl ${isDark ? 'pink-glow' : ''}`}
          style={{ 
            backgroundColor: data.buttonColor || data.accentColor || '#2563eb', 
            ...getTextStyle(data, 'cta') 
          }}
        >
          {data.ctaText || 'MULAI SEKARANG'}
        </a>
      </div>

       {data.image && (
        <div 
          className={`relative rounded-[2.5rem] overflow-hidden border shadow-2xl group ring-1 ${isDark ? 'border-white/10 ring-white/5' : 'border-slate-100 ring-slate-900/5'}`}
          style={{ width: data.imageWidth ? `${data.imageWidth}%` : '100%' }}
        >
           <img 
             src={data.image} 
             alt="Hero Content" 
             className="w-full transform group-hover:scale-[1.02] transition-transform duration-1000" 
           />
           {isDark && <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>}
        </div>
      )}
    </section>
  );
}
