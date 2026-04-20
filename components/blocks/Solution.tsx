import React from 'react';
import { getTextStyle } from '@/lib/styles';

export default function Solution({ data }: { data: any }) {
  const isDark = data.textColor === '#ffffff';

  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6">
      <div 
        className={`${isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-900'} rounded-[4rem] p-10 md:p-24 shadow-2xl text-center relative overflow-hidden`}
        style={{ backgroundColor: data.bgColor }}
      >
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-${isDark ? 'pink' : 'cyan-500'}/50 to-transparent`}></div>
        
        <h4 
          className={`${isDark ? 'text-pink' : 'text-cyan-400'} font-bold tracking-[0.2em] uppercase mb-6 text-[10px] md:text-xs`}
          style={{ color: data.accentColor }}
        >
          {data.badge || 'WAKROD PROJECT'}
        </h4>
        <h2 
          className={`text-3xl md:text-6xl font-black mb-8 text-white tracking-[-0.03em] leading-[1.05] ${isDark ? 'font-serif' : 'font-sans uppercase italic'}`}
          style={{ color: data.textColor, ...getTextStyle(data, 'title') }}
        >
          {data.title || 'IDE → ANALISA → PRODUKSI → UPLOAD'}
        </h2>
        <p 
          className={`text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed font-medium ${isDark ? 'opacity-70' : ''}`}
          style={{ color: isDark ? undefined : data.textColor, ...getTextStyle(data, 'subtitle') }}
        >
          {data.subtitle || 'Bukan sekadar tools... Ini adalah mesin pertumbuhan dalam SATU dashboard.'}
        </p>
        
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {(data.items || []).map((p: any, i: number) => (
             <div key={i} className={`text-left p-8 bg-white/5 rounded-3xl border border-white/10 group hover:bg-white/10 transition-all ${isDark ? '' : 'border-slate-800'}`}>
                <h4 
                  className="text-white font-extrabold text-lg mb-2 tracking-tight"
                  style={{ color: data.itemTitleColor }}
                >
                  {p.t || p.title}
                </h4>
                <p 
                  className="text-slate-500 text-sm leading-relaxed font-medium"
                  style={{ color: data.itemDescColor }}
                >
                  {p.d || p.desc}
                </p>
             </div>
          ))}
        </div>

        {data.image && (
          <div className="relative group max-w-5xl mx-auto">
             <img 
                src={data.image} 
                alt="Process Visual" 
                className="w-full rounded-[2rem] border border-white/10 shadow-2xl transition-transform duration-1000 group-hover:scale-[1.01]"
             />
          </div>
        )}
      </div>
    </section>
  );
}
