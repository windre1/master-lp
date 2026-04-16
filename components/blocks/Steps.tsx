import React from 'react';

export default function Steps({ data }: { data: any }) {
  const steps = data.items || [
    { n: "01", t: "Setup Konten", d: "Siapkan materi digital Anda langsung di dashboard." },
    { n: "02", t: "Analisa AI", d: "Sistem memberikan rekomendasi perbaikan konten." },
    { n: "03", t: "Auto Publish", d: "Distribusi otomatis ke seluruh channel Anda." }
  ];

  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6">
      <h3 className="text-3xl md:text-5xl font-black text-center mb-16 uppercase italic">
        {data.title || 'ALUR KERJA OTOMATIS'}
      </h3>
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((s: any, i: number) => (
          <div key={i} className="bg-[#0f172a]/40 p-10 rounded-[2.5rem] border border-white/5 text-center relative group hover:border-[#00f2ff]/30 transition-all">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-xl font-black text-[#00f2ff] shadow-[0_0_20px_rgba(0,242,255,0.1)] mx-auto mb-8 group-hover:scale-110 transition-transform">
              {s.n || (i+1)}
            </div>
            <h4 className="font-black text-xl text-white mb-3 uppercase italic">{s.t}</h4>
            <p className="text-[#94a3b8] text-sm leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
