import React from 'react';

export default function CTA({ data }: { data: any }) {
  return (
    <section className="py-32 text-center max-w-6xl mx-auto px-6">
      <div className="bg-[#0f172a]/60 backdrop-blur-3xl rounded-[4rem] p-10 md:p-24 border border-white/5 shadow-[0_0_50px_rgba(0,242,255,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
        
        <h2 className="text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent uppercase italic leading-tight">
          {data.title || 'Waktunya Scale Bisnis YouTube Anda.'}
        </h2>
        <p className="text-[#94a3b8] text-xl max-w-2xl mx-auto mb-12 font-medium italic">
          {data.subtitle || 'Bukan sekadar tools… tapi sistem yang membantu Anda bekerja lebih cepat.'}
        </p>
        <a 
          href={data.ctaLink || '#pricing'}
          className="inline-block px-14 py-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black rounded-full shadow-[0_0_30px_rgba(0,242,255,0.3)] hover:shadow-[0_0_50px_rgba(0,242,255,0.5)] transition-all uppercase tracking-widest text-sm text-center italic"
        >
           {data.ctaText || 'MULAI SEKARANG'}
        </a>
      </div>
    </section>
  );
}
