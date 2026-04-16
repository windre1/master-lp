import React from 'react';

export default function SocialProof({ data }: { data: any }) {
  return (
    <section className="py-12 max-w-5xl mx-auto px-6">
      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
        {/* Logo Placeholders */}
        {['GOOGLE', 'NETFLIX', 'SLACK', 'AMAZON', 'YOUTUBE'].map(logo => (
          <span key={logo} className="font-black text-xl md:text-2xl text-white tracking-tighter italic">{logo}</span>
        ))}
      </div>
      <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-[#00f2ff]/60 mt-10">
        {data.title || 'DIPERCAYA OLEH 10,000+ CREATOR SELURUH DUNIA'}
      </p>
    </section>
  );
}
