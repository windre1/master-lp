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
    <section className="relative pt-32 pb-24 text-center max-w-5xl mx-auto px-6 overflow-hidden">
      <h4 className="text-[#00f2ff] text-xs md:text-sm font-bold tracking-[3px] uppercase mb-8 animate-pulse">
        {data.badge || '🔥 PERHATIAN UNTUK CREATOR YOUTUBE YANG SERIUS MAU GROW'}
      </h4>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-8 bg-gradient-to-br from-white to-indigo-300 bg-clip-text text-transparent uppercase italic">
        {renderTitle(data.title || '')}
      </h1>
      <p className="text-[#94a3b8] text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
        {data.subtitle || 'Berhenti kerja keras. Mulailah kerja cerdas pakai sistem yang terintegrasi.'}
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <a 
          href={data.ctaLink || '#'} 
          className="px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-black text-sm tracking-widest hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all uppercase italic shadow-[0_10px_20px_rgba(0,242,255,0.2)]"
        >
          {data.ctaText || 'BELI SEKARANG'}
        </a>
      </div>

       {data.image && (
        <div className="mt-20 relative max-w-5xl mx-auto rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,242,255,0.1)] group">
           <img 
             src={data.image} 
             alt="Visual" 
             className="w-full transform group-hover:scale-105 transition-transform duration-700" 
           />
        </div>
      )}
    </section>
  );
}
