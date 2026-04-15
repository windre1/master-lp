import React from 'react';

export default function SocialProof({ data }: { data: any }) {
  return (
    <section className="py-8 bg-white border-y border-slate-50">
      <div className="container px-6 mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale">
          {/* Logo Placeholders */}
          {['Google', 'Netflix', 'Slack', 'Amazon'].map(logo => (
            <span key={logo} className="font-black text-xl text-slate-400">{logo}</span>
          ))}
        </div>
        <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 mt-8">
          {data.title || 'Dipercaya oleh 10,000+ Digital Marketer'}
        </p>
      </div>
    </section>
  );
}
