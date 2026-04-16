import React from 'react';
import { BlockData } from '@/types/lp';

export default function Hero({ data }: { data: BlockData }) {
  const badge = data.subtitle?.includes('PERHATIAN') ? data.subtitle : (data.title?.includes('PERHATIAN') ? data.title : '🔥 PERHATIAN UNTUK CREATOR YOUTUBE');
  
  // Logic to highlight "SISTEM" if present
  const renderTitle = (title: string) => {
    if (!title) return 'Scale Your YouTube Empire with AI';
    const parts = title.split(/(SISTEM)/g);
    return parts.map((part, i) => 
      part === 'SISTEM' ? <span key={i} className="text-[#00f2ff] drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]">SISTEM</span> : part
    );
  };

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 text-center max-w-5xl mx-auto px-6 overflow-hidden">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-8 border border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
        <h4 className="text-[10px] md:text-xs font-black tracking-widest uppercase">
          {data.badge || 'PROJEK AFILIASI WAKROD'}
        </h4>
      </div>
      
      <h1 className="text-4xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-8 text-slate-900 tracking-tight">
        {renderTitle(data.title || '')}
      </h1>
      
      <p className="text-slate-600 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
        {data.subtitle || 'Berhenti kerja keras. Mulailah kerja cerdas pakai sistem yang terintegrasi.'}
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-20">
        <a 
          href={data.ctaLink || '#'} 
          className="w-full sm:w-auto px-14 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-sm tracking-widest hover:scale-105 transition-all uppercase shadow-2xl shadow-slate-200"
        >
          {data.ctaText || 'DAFTAR SEKARANG'}
        </a>
      </div>

       {data.image && (
        <div className="relative max-w-5xl mx-auto rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-2xl group ring-1 ring-slate-900/5">
           <img 
             src={data.image} 
             alt="Visual Content" 
             className="w-full transform group-hover:scale-[1.02] transition-transform duration-1000" 
           />
        </div>
      )}
    </section>
  );
}
