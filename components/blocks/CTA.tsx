import React from 'react';

export default function CTA({ data }: { data: any }) {
  const isDark = data.buttonColor === '#FF2D55' || !data.buttonColor; // Heuristic based on pink color or default
  const titleColor = isDark ? 'text-white' : 'text-slate-900';

  return (
    <section id="cta-section" className="py-20 md:py-32 text-center max-w-5xl mx-auto px-6">
      <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-900 border-slate-800'} rounded-[4rem] border p-10 md:p-24 shadow-2xl relative overflow-hidden group`}>
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] -z-10 group-hover:opacity-20 transition-opacity ${isDark ? 'bg-pink/5' : 'bg-blue-500/10'}`}></div>
        
        <h2 className={`text-3xl md:text-7xl font-black mb-8 tracking-tight leading-[1.05] ${isDark ? 'font-serif text-white' : 'font-sans text-white uppercase italic'}`}>
          {data.title || 'Siap Scale Konten Tanpa Batas?'}
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          {data.subtitle || 'Amankan akses Anda sekarang sebelum harga naik.'}
        </p>
        
        <a 
          href={data.ctaLink || '#'}
          style={{ backgroundColor: data.buttonColor || '#2563eb' }}
          className={`inline-block px-14 py-6 text-white font-extrabold rounded-[2rem] shadow-xl hover:scale-105 transition-all uppercase tracking-[0.2em] text-[10px] md:text-sm ${isDark ? 'pink-glow' : ''}`}
        >
           {data.ctaText || 'DAFTAR SEKARANG'}
        </a>
      </div>
    </section>
  );
}
