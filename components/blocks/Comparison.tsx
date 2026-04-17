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
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch gap-6 md:gap-8 relative">
        {/* Sisi Kiri: Masalah / Tradisional */}
        <div className="bg-white p-8 md:p-14 rounded-[3.5rem] border border-blue-100/50 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold mb-8 text-slate-800 uppercase italic tracking-tight">{traditional.title}</h3>
            <ul className="space-y-5 mb-10">
              {(traditional.items || []).map((item: string, i: number) => (
                <li key={i} className="text-slate-500 flex items-start gap-3 text-sm md:text-base font-medium leading-relaxed">
                  <span className="text-red-400 font-bold shrink-0 mt-1">✕</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-red-500 font-extrabold text-xl md:text-2xl italic tracking-tight">{traditional.footer}</p>
        </div>

        {/* Separator VS */}
        <div className="flex lg:flex-col items-center justify-center relative py-8 lg:py-0 px-4">
           <div className="hidden lg:block w-px h-[80%] bg-blue-100"></div>
           <div className="lg:hidden w-full h-px bg-blue-100"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-20 md:h-20 rounded-full bg-white border-[6px] border-[#f0f7ff] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-center text-slate-900 font-black text-xl md:text-2xl z-10 italic">VS</div>
        </div>

        {/* Sisi Kanan: Solusi / Tekotok */}
        <div className="bg-slate-900 p-8 md:p-14 rounded-[3.5rem] border-2 border-blue-500/20 shadow-2xl shadow-blue-900/40 hover:border-blue-500/40 transition-all relative overflow-hidden group flex flex-col justify-between">
          <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 z-20">Recommended</div>
          
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold mb-8 text-white uppercase italic tracking-tight relative z-10">{spartan.title}</h3>
            <ul className="space-y-5 mb-10 relative z-10">
              {(spartan.items || []).map((item: string, i: number) => (
                <li key={i} className="text-slate-300 font-semibold flex items-start gap-4 text-sm md:text-base leading-relaxed">
                  <span className="text-blue-400 shrink-0 mt-1 font-black">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-blue-400 font-extrabold text-2xl md:text-4xl italic tracking-tighter relative z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">{spartan.footer}</p>
        </div>
      </div>
    </section>
  );
}
