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
    <section className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-[4.5rem] p-10 md:p-24 border border-blue-100/50 text-center mb-16 shadow-2xl shadow-blue-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -z-0"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full mb-6">
               <AlertCircle className="w-3 h-3" />
               <h4 className="text-[10px] font-black tracking-[0.2em] uppercase">{data.badge || 'PERHATIAN'}</h4>
            </div>
            <h2 className="text-3xl md:text-6xl font-extrabold mb-8 text-slate-900 tracking-[-0.03em] leading-[1.05]">
              {data.title || 'ANDA SEDANG MEMBUANG WAKTU & POTENSI'}
            </h2>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              {data.subtitle || 'Tanpa sistem yang benar, YouTube hanya akan menjadi hobi yang melelahkan bukan bisnis yang menguntungkan.'}
            </p>
            
            <div className="pt-10 border-t border-slate-100 mt-10">
               <div className="inline-block bg-slate-900 px-8 py-4 rounded-2xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform cursor-default">
                  <p className="text-white font-extrabold text-lg md:text-2xl tracking-tight uppercase">
                     {data.closing || 'MASALAHNYA BUKAN DI ANDA...'} <span className="italic opacity-90 text-red-400">{data.highlinedClosing || 'TAPI DI SISTEM ANDA.'}</span>
                  </p>
               </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {(data.items || [
            { t: 'BURN OUT', d: 'Capek mikir konten tiap hari tapi view gak naik-naik.' },
            { t: 'NO SYSTEM', d: 'Gak punya database ide, aset, dan workflow yang rapi.' },
            { t: 'STUCK', d: 'Channel jalan di tempat karena cuma ngandelin hoki.' }
          ]).map((p: any, i: number) => (
            <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-blue-100/50 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 hover:-translate-y-2 transition-all group overflow-hidden relative">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 border border-blue-100">
                 <AlertCircle className="w-6 h-6 text-blue-300 group-hover:text-red-500 transition-colors" />
              </div>
              <h4 className="font-extrabold text-xl mb-4 text-slate-800 tracking-[-0.02em] uppercase leading-tight">{p.t}</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
