'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { BlockData } from '@/types/lp';

export default function Problem({ data }: { data: BlockData }) {
  const problems = [
    { t: 'BURN OUT', d: 'Capek mikir konten tiap hari tapi view gak naik-naik.' },
    { t: 'NO SYSTEM', d: 'Gak punya database ide, aset, dan workflow yang rapi.' },
    { t: 'STUCK', d: 'Channel jalan di tempat karena cuma ngandelin hoki.' }
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-[4rem] p-10 md:p-24 border border-slate-100 text-center mb-16 shadow-2xl shadow-slate-200/50">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full mb-6">
             <AlertCircle className="w-3 h-3" />
             <h4 className="text-[10px] font-black tracking-widest uppercase">{data.badge || 'PERHATIAN'}</h4>
          </div>
          <h2 className="text-3xl md:text-6xl font-black mb-8 text-slate-900 tracking-tight leading-tight">
            {data.title || 'ANDA SEDANG MEMBUANG WAKTU & POTENSI'}
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            {data.subtitle || 'Tanpa sistem yang benar, YouTube hanya akan menjadi hobi yang melelahkan bukan bisnis yang menguntungkan.'}
          </p>
          
          <div className="pt-10 border-t border-slate-100 mt-10">
             <div className="inline-block bg-slate-900 px-6 py-3 rounded-xl shadow-xl transform -rotate-1">
                <p className="text-white font-black text-lg md:text-2xl tracking-tight uppercase">
                   {data.closing || 'MASALAHNYA BUKAN DI ANDA...'} <span className="italic opacity-90">{data.highlinedClosing || 'TAPI DI SISTEM ANDA.'}</span>
                </p>
             </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {(data.items || [
            { t: 'BURN OUT', d: 'Capek mikir konten tiap hari tapi view gak naik-naik.' },
            { t: 'NO SYSTEM', d: 'Gak punya database ide, aset, dan workflow yang rapi.' },
            { t: 'STUCK', d: 'Channel jalan di tempat karena cuma ngandelin hoki.' }
          ]).map((p: any, i: number) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 border border-slate-100">
                 <AlertCircle className="w-6 h-6 text-slate-400 group-hover:text-red-500 transition-colors" />
              </div>
              <h4 className="font-black text-xl mb-4 text-slate-900 uppercase">{p.t}</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
