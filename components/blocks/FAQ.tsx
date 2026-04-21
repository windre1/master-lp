import React from 'react';
import { getTextStyle } from '@/lib/styles';

export default function FAQ({ data }: { data: any }) {
  const faqs = data.items || [];
  const isDark = data.textColor === '#ffffff' || !data.textColor;

  return (
    <section className="py-24 max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 
          className={`text-3xl md:text-5xl font-black mb-4 uppercase italic ${isDark ? 'text-white' : 'text-slate-900'}`}
          style={{
            color: data.textColor,
            fontSize: data.fontSize ? `${data.fontSize}px` : undefined,
            ...getTextStyle(data, 'title')
          }}
        >
          {data.title || 'PERTANYAAN UMUM'}
        </h2>
        <div 
          className="w-20 h-1 mx-auto rounded-full"
          style={{ backgroundColor: data.accentColor || '#0ea5e9' }}
        ></div>
      </div>
      
      <div className="space-y-6">
        {faqs.map((f: any, i: number) => (
          <div key={i} className={`${isDark ? 'bg-[#0f172a]/40 backdrop-blur-xl border-white/5' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'} p-8 rounded-[2rem] border hover:border-[#00f2ff]/20 transition-all`}>
             <h4 className={`font-black text-lg mb-4 uppercase italic flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
               <span style={{ color: data.accentColor || '#00f2ff' }}>?</span> {f.q || f.title}
             </h4>
             <p className={`${isDark ? 'text-[#94a3b8]' : 'text-slate-500'} text-sm leading-relaxed`}>{f.a || f.desc || f.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
