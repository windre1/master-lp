import React from 'react';

export default function CTA({ data }: { data: any }) {
  return (
    <section className="py-20 md:py-32 text-center max-w-6xl mx-auto px-6">
      <div className="bg-slate-900 rounded-[4rem] p-10 md:p-24 shadow-2xl shadow-slate-200 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] -z-10 group-hover:bg-cyan-500/10 transition-colors"></div>
        
        <h2 className="text-3xl md:text-6xl font-black mb-8 text-white tracking-tight leading-tight animate-in fade-in duration-1000">
          {data.title || 'Waktunya Scale Bisnis YouTube Anda.'}
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
          {data.subtitle || 'Bukan sekadar tools… tapi sistem yang membantu Anda bekerja lebih cepat.'}
        </p>
        <a 
          href={data.ctaLink || '#'}
          style={{ backgroundColor: data.buttonColor || '#2563eb' }}
          className="inline-block px-14 py-6 text-white font-black rounded-[2rem] shadow-xl hover:scale-105 transition-all uppercase tracking-widest text-xs md:text-sm"
        >
           {data.ctaText || 'MULAI SEKARANG'}
        </a>
      </div>
    </section>
  );
}
