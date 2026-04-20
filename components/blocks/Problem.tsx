'use client';

import React from 'react';
import { BlockData } from '@/types/lp';

export default function Problem({ data }: { data: BlockData }) {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-pink mb-6">{data.subtitle || 'APAKAH INI KAMU?'}</h4>
          <h2 className="text-3xl md:text-6xl font-serif font-black mb-8 text-white tracking-tight leading-[1.1]">
            {data.title || 'Pengen cuan dari TikTok, tapi selalu mentok di sini...'}
          </h2>
        </div>

        <div className="grid gap-4 max-w-4xl mx-auto">
          {(data.items || []).map((p: any, i: number) => (
            <div key={i} className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 flex gap-6 items-start group hover:bg-white/[0.08] transition-all">
              <div className="w-10 h-10 rounded-full bg-orange-400/20 flex items-center justify-center shrink-0 border border-orange-400/30">
                 <div className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]"></div>
              </div>
              <div>
                <h4 className="font-extrabold text-lg md:text-xl mb-2 text-white leading-tight">{p.t}</h4>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">{p.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
           <p className="text-white/60 font-bold text-sm md:text-lg mb-4">
              {data.closing || 'Kalau minimal 2 dari masalah di atas kamu rasakan...'}
           </p>
           <p className="inline-block text-green font-black text-xs md:text-sm uppercase tracking-widest border-b-2 border-green pb-1">
              {data.highlinedClosing || 'maka halaman ini ditulis khusus untuk kamu.'}
           </p>
        </div>
      </div>
    </section>
  );
}
