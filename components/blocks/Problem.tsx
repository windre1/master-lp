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
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-red-50/50 rounded-[4rem] p-12 md:p-24 border border-red-100 text-center mb-16">
          <h4 className="text-red-500 font-black tracking-widest uppercase mb-6">{data.badge || '⚠️ PERINGATAN KERAS'}</h4>
          <h2 className="text-3xl md:text-6xl font-black mb-8 text-slate-900 uppercase italic leading-tight">
            {data.title || 'ANDA SEDANG MEMBUANG WAKTU & POTENSI'}
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            {data.subtitle || 'Tanpa sistem yang benar, YouTube hanya akan menjadi hobi yang melelahkan bukan bisnis yang menguntungkan.'}
          </p>
          
          <div className="pt-8 border-t border-red-100 mt-12">
             <p className="text-slate-900 font-black text-xl italic uppercase">
                {data.closing || 'MASALAHNYA BUKAN DI ANDA...'} <span className="text-red-600 animate-pulse">{data.highlinedClosing || 'TAPI DI SISTEM ANDA.'}</span>
             </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {problems.map((p, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all group">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-8">
                 <AlertCircle className="w-8 h-8 text-red-600 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="font-black text-2xl mb-4 text-slate-900 uppercase italic">{p.t}</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
