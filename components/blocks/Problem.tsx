'use client';

import React from 'react';
import { BlockData } from '@/types/lp';
import { getTextStyle } from '@/lib/styles';

export default function Problem({ data }: { data: BlockData }) {
  const isDark = data.textColor === '#ffffff';

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h4 
            className={`text-[10px] font-black tracking-[0.4em] uppercase mb-6 ${isDark ? 'text-pink' : 'text-blue-600'}`}
            style={getTextStyle(data, 'subtitle')}
          >
            {data.subtitle || 'APAKAH INI KAMU?'}
          </h4>
          <h2 
            className={`text-3xl md:text-6xl font-black mb-8 tracking-tight leading-[1.1] ${isDark ? 'font-serif text-white' : 'font-sans text-slate-900 uppercase italic'}`}
            style={getTextStyle(data, 'title')}
          >
            {data.title || 'Pengen cuan dari TikTok, tapi selalu mentok di sini...'}
          </h2>
        </div>

        <div className="grid gap-4 max-w-4xl mx-auto">
          {(data.items || []).map((p: any, i: number) => (
            <div key={i} className={`p-8 md:p-10 rounded-3xl border flex gap-6 items-start group transition-all ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/[0.08]' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${isDark ? 'bg-orange-400/20 border-orange-400/30' : 'bg-blue-50 border-blue-100'}`}>
                 <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]' : 'bg-blue-600'}`}></div>
              </div>
              <div>
                <h4 className={`font-extrabold text-lg md:text-xl mb-2 leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>{p.t}</h4>
                <p className={`text-sm md:text-base leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{p.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
           <p 
             className={`font-bold text-sm md:text-lg mb-4 ${isDark ? 'text-white/60' : 'text-slate-600'}`}
             style={getTextStyle(data, 'closing')}
           >
              {data.closing || 'Kalau minimal 2 dari masalah di atas kamu rasakan...'}
           </p>
           <p 
             className={`inline-block font-black text-xs md:text-sm uppercase tracking-widest border-b-2 pb-1 ${isDark ? 'text-green border-green' : 'text-blue-600 border-blue-600'}`}
             style={getTextStyle(data, 'highlinedClosing')}
           >
              {data.highlinedClosing || 'maka halaman ini ditulis khusus untuk kamu.'}
           </p>
        </div>
      </div>
    </section>
  );
}
