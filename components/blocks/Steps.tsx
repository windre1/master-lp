import React from 'react';
import { getTextStyle } from '@/lib/styles';

export default function Steps({ data }: { data: any }) {
  const steps = data.items || [];
  const isDark = data.textColor === '#ffffff' || !data.textColor;

  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6">
      <h3 
        className={`text-3xl md:text-5xl font-black text-center mb-16 uppercase italic ${isDark ? 'text-white' : 'text-slate-900'}`}
        style={{
          color: data.textColor,
          fontSize: data.fontSize ? `${data.fontSize}px` : undefined,
          ...getTextStyle(data, 'title')
        }}
      >
        {data.title || 'ALUR KERJA OTOMATIS'}
      </h3>
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((s: any, i: number) => (
          <div key={i} className={`${isDark ? 'bg-[#0f172a]/40 border-white/5' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'} p-10 rounded-[2.5rem] border text-center relative group hover:border-[#00f2ff]/30 transition-all`}>
            <div 
              className={`w-16 h-16 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} border rounded-full flex items-center justify-center text-xl font-black shadow-[0_0_20px_rgba(0,242,255,0.1)] mx-auto mb-8 group-hover:scale-110 transition-transform`}
              style={data.accentColor ? { color: data.accentColor, borderColor: `${data.accentColor}40`, boxShadow: `0 0 20px ${data.accentColor}20` } : { color: '#00f2ff' }}
            >
              {s.n || (i+1 < 10 ? `0${i+1}` : i+1)}
            </div>
            <h4 className={`font-black text-xl mb-3 uppercase italic ${isDark ? 'text-white' : 'text-slate-800'}`}>{s.t || s.title}</h4>
            <p className={`${isDark ? 'text-[#94a3b8]' : 'text-slate-500'} text-sm leading-relaxed`}>{s.d || s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
