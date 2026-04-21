'use client';

import React from 'react';
import { BlockData } from '@/types/lp';
import { getTextStyle } from '@/lib/styles';

export default function Problem({ data }: { data: BlockData }) {
  const isDark = data.textColor === '#ffffff' || !data.textColor;

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h4 
            className={`text-[10px] font-black tracking-[0.4em] uppercase mb-6 ${isDark ? 'text-pink' : 'text-blue-600'}`}
            style={{
              color: data.subtitleColor || data.accentColor,
              ...getTextStyle(data, 'subtitle')
            }}
          >
            {data.subtitle || 'APAKAH INI KAMU?'}
          </h4>
          <h2 
            className={`text-3xl md:text-6xl font-black mb-8 tracking-tight leading-[1.1] ${isDark ? 'font-serif text-white' : 'font-sans text-slate-900 uppercase italic'}`}
            style={{ 
              color: data.titleColor || data.textColor, 
              fontSize: data.fontSize ? `${data.fontSize}px` : undefined,
              ...getTextStyle(data, 'title') 
            }}
          >
            {data.title || 'Pengen cuan dari TikTok, tapi selalu mentok di sini...'}
          </h2>
        </div>

        <div className="grid gap-4 max-w-4xl mx-auto">
          {(data.items || []).map((p: any, i: number) => (
            <div key={i} className={`p-8 md:p-10 rounded-3xl border flex gap-6 items-start group transition-all ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/[0.08]' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1'}`}>
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${isDark ? 'bg-orange-400/20 border-white/10' : 'bg-slate-50 border-slate-100'}`}
                style={{ borderColor: data.accentColor ? `${data.accentColor}40` : undefined }}
              >
                 <div 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ 
                    backgroundColor: data.accentColor || (isDark ? '#fb923c' : '#2563eb'),
                    boxShadow: data.accentColor ? `0 0 10px ${data.accentColor}` : undefined
                  }}
                 ></div>
              </div>
              <div>
                <h4 
                  className={`font-extrabold text-lg md:text-xl mb-2 leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}
                  style={{ color: data.itemsColor || data.textColor }}
                >
                  {p.t}
                </h4>
                <p 
                  className={`text-sm md:text-base leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                  style={{ color: data.itemsColor ? `${data.itemsColor}CC` : (isDark ? undefined : data.textColor ? `${data.textColor}CC` : undefined) }}
                >
                  {p.d}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
           <p 
             className={`font-bold text-sm md:text-lg mb-4 ${isDark ? 'text-white/60' : 'text-slate-600'}`}
             style={{
               color: data.closingColor || (data.textColor ? `${data.textColor}99` : undefined),
               ...getTextStyle(data, 'closing')
             }}
           >
              {data.closing || 'Kalau minimal 2 dari masalah di atas kamu rasakan...'}
           </p>
           <p 
             className={`inline-block font-black text-xs md:text-sm uppercase tracking-widest border-b-2 pb-1 ${isDark ? 'text-green border-green' : 'text-blue-600 border-blue-600'}`}
             style={{
               color: data.accentColor,
               borderColor: data.accentColor,
               ...getTextStyle(data, 'highlinedClosing')
             }}
           >
              {data.highlinedClosing || 'maka halaman ini ditulis khusus untuk kamu.'}
           </p>
        </div>
      </div>
    </section>
  );
}
