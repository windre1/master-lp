import React from 'react';

export default function Comparison({ data }: { data: any }) {
  const traditional = data.traditional || {
    title: "Alur Kerja Tradisional:",
    items: ["❌ Tool A untuk trend", "❌ Tool B untuk analytics", "❌ Tool C untuk downloader", "❌ Tool D untuk editing", "❌ Tool E untuk upload"],
    footer: "Ribet, Mahal, Tidak Sinkron."
  };
  const spartan = data.spartan || {
    title: "Dengan Spartan Tube:",
    items: ["✔ IDE & RISET Konten", "✔ ANALISA Kompetitor", "✔ PRODUKSI Aset Video", "✔ UPLOAD Otomatis"],
    footer: "SEMUA TERINTEGRASI."
  };

  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black uppercase italic">
          {data.title || '⚡ SEMUA DALAM 1 SYSTEM'}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch gap-8">
        <div className="bg-[#0f172a]/40 backdrop-blur-xl p-10 rounded-[3rem] border border-red-500/10 hover:border-red-500/20 transition-all">
          <h3 className="text-2xl font-black mb-8 text-white uppercase italic">{traditional.title}</h3>
          <ul className="space-y-4 mb-10">
            {traditional.items.map((item: string, i: number) => (
              <li key={i} className="text-[#94a3b8] flex items-center gap-3 text-sm">
                <span className="text-red-500 font-bold shrink-0">✕</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-red-500 font-black text-xl italic drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">{traditional.footer}</p>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center relative px-4">
           <div className="w-px h-full bg-white/5"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#050a15] border-2 border-[#00f2ff] flex items-center justify-center text-[#00f2ff] font-black text-xl z-10 shadow-[0_0_25px_rgba(0,242,255,0.4)] italic">VS</div>
        </div>

        <div className="bg-[#0a1128] p-10 rounded-[3rem] border-2 border-[#00f2ff]/30 shadow-[0_0_50px_rgba(0,242,255,0.05)] hover:border-[#00f2ff] transition-all relative">
          <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#00f2ff] text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Recommended</div>
          <h3 className="text-2xl font-black mb-8 text-[#00f2ff] uppercase italic">{spartan.title}</h3>
          <ul className="space-y-4 mb-10">
            {spartan.items.map((item: string, i: number) => (
              <li key={i} className="text-white font-bold flex items-center gap-3 text-sm">
                <span className="text-[#00f2ff] shrink-0">✓</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-[#00f2ff] font-black text-2xl italic tracking-tight drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]">{spartan.footer}</p>
        </div>
      </div>
    </section>
  );
}
