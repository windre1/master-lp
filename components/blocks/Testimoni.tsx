import React from 'react';
import { Quote } from 'lucide-react';
import { getTextStyle } from '@/lib/styles';

export default function Testimoni({ data }: { data: any }) {
  const testimonials = data.items || [];
  const isDark = data.textColor === '#ffffff' || !data.textColor;

  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 
          className={`text-3xl md:text-6xl font-black mb-4 tracking-tight leading-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}
          style={{
            color: data.textColor,
            fontSize: data.fontSize ? `${data.fontSize}px` : undefined,
            ...getTextStyle(data, 'title')
          }}
        >
          {data.title || 'APA KATA MEREKA?'}
        </h2>
        <p 
          className={`font-bold tracking-widest uppercase text-[10px] md:text-xs ${isDark ? 'text-pink' : 'text-blue-600'}`}
          style={{ color: data.accentColor, ...getTextStyle(data, 'subtitle') }}
        >
          {data.subtitle || 'Review Dari Pengguna Kami'}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        {testimonials.map((t: any, i: number) => (
          <div key={i} className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'} p-10 md:p-14 rounded-[3.5rem] border hover:shadow-2xl transition-all relative overflow-hidden group`}>
             <div className={`w-12 h-12 ${isDark ? 'bg-white/10 border-white/10' : 'bg-slate-50 border-slate-100'} rounded-full flex items-center justify-center mb-8 border`}>
                <Quote className={`w-6 h-6 transition-colors ${isDark ? 'text-white/20 group-hover:text-pink' : 'text-slate-300 group-hover:text-blue-600'}`} style={data.accentColor ? { color: data.accentColor } : {}} />
             </div>
             <p className={`text-lg md:text-xl font-medium leading-relaxed relative z-10 ${isDark ? 'text-white' : 'text-slate-600'}`}>"{t.text || t.desc || t.c}"</p>
             <div className="mt-10 flex items-center gap-4">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-xs overflow-hidden ${isDark ? 'bg-pink' : 'bg-slate-900'}`}
                  style={data.accentColor ? { backgroundColor: data.accentColor } : {}}
                >
                  {t.avatar ? <img src={t.avatar} className="w-full h-full object-cover" alt="" /> : (t.name?.charAt(0) || 'U')}
                </div>
                <div>
                  <h5 className={`font-bold uppercase tracking-tight text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.name}</h5>
                  {t.role && <p className={`text-[10px] uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>{t.role}</p>}
                </div>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}
