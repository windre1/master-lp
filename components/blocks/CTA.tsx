import React from 'react';

export default function CTA({ data }: { data: any }) {
  return (
    <section id="cta-section" className="py-20 md:py-32 text-center max-w-5xl mx-auto px-6">
      <div className="bg-white/5 rounded-[4rem] border border-white/10 p-10 md:p-24 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink/5 rounded-full blur-[100px] -z-10 group-hover:bg-pink/10 transition-colors"></div>
        
        <h2 className="text-3xl md:text-7xl font-serif font-black mb-8 text-white tracking-tight leading-[1.05]">
          {data.title || 'Siap Hasilkan Komisi Tanpa Wajah?'}
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          {data.subtitle || 'Amankan slot kamu sekarang sebelum harga naik.'}
        </p>
        
        <a 
          href={data.ctaLink || '#'}
          style={{ backgroundColor: data.buttonColor || '#FF2D55' }}
          className="inline-block px-14 py-6 text-white font-extrabold rounded-[2rem] shadow-xl hover:scale-105 transition-all pink-glow uppercase tracking-[0.2em] text-[10px] md:text-sm"
        >
           {data.ctaText || 'SAYA MAU BERGABUNG SEKARANG'}
        </a>
      </div>
    </section>
  );
}
