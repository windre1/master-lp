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
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black uppercase italic">
          {data.title || '⚡ SEMUA DALAM 1 SYSTEM'}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch gap-6 md:gap-8">
        {/* Sisi Kiri: Masalah / Tradisional */}
        <div className="bg-slate-50 p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
          <h3 className="text-xl md:text-2xl font-black mb-8 text-slate-800 uppercase italic tracking-tight">{traditional.title}</h3>
          <ul className="space-y-4 mb-10">
            {(traditional.items || []).map((item: string, i: number) => (
              <li key={i} className="text-slate-500 flex items-start gap-3 text-sm md:text-base font-medium leading-relaxed">
                <span className="text-red-500 font-bold shrink-0 mt-1">✕</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-red-500 font-black text-xl md:text-2xl italic tracking-tight">{traditional.footer}</p>
        </div>

        {/* Separator VS */}
        <div className="flex lg:flex-col items-center justify-center relative py-4 lg:py-0 px-4">
           <div className="hidden lg:block w-px h-full bg-slate-100"></div>
           <div className="lg:hidden w-full h-px bg-slate-100"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-4 border-slate-50 shadow-xl flex items-center justify-center text-slate-900 font-black text-lg md:text-xl z-10 italic">VS</div>
        </div>

        {/* Sisi Kanan: Solusi / Tekotok */}
        <div className="bg-[#0f172a] p-8 md:p-12 rounded-[3.5rem] border-2 border-blue-500/20 shadow-2xl shadow-blue-500/10 hover:border-blue-500/40 transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-lg shadow-blue-500/40 z-20">Recommended</div>
          
          {/* Subtle Glow Effect */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-all"></div>
          
          <h3 className="text-xl md:text-2xl font-black mb-8 text-white uppercase italic tracking-tight relative z-10">{spartan.title}</h3>
          <ul className="space-y-4 mb-10 relative z-10">
            {(spartan.items || []).map((item: string, i: number) => (
              <li key={i} className="text-slate-300 font-semibold flex items-start gap-3 text-sm md:text-base leading-relaxed">
                <span className="text-blue-400 shrink-0 mt-1 font-black">✓</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-blue-400 font-black text-2xl md:text-3xl italic tracking-tighter relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">{spartan.footer}</p>
        </div>
      </div>
    </section>
  );
}
