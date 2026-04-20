import React from 'react';

export default function Comparison({ data }: { data: any }) {
  const traditional = data.traditional || {
    title: "BELAJAR SENDIRI:",
    items: ["Belajar berbulan-bulan", "Cari sendiri", "Tahu setelah kena", "Ngomong asal", "Beli sendiri", "Sangat tinggi"],
    footer: "Gak bakal scale."
  };
  const spartan = data.spartan || {
    title: "METODE GHOST LIVE:",
    items: ["Praktik hari ini", "Dikasih langsung", "Dicegah dari awal", "Template siap pakai", "Cara gratis", "Diminimalkan"],
    footer: "Sistem yang kerja."
  };

  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-pink mb-6">TAHAPAN BERBEDA</h4>
        <h2 className="text-3xl md:text-6xl font-serif font-black text-white tracking-tight leading-tight">
          {data.title || 'Belajar Sendiri vs. Metode Ghost Live'}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Sisi Kiri: Masalah */}
        <div className="bg-white/5 p-8 md:p-14 rounded-[3.5rem] border border-white/10 flex flex-col justify-between hover:bg-white/[0.08] transition-all">
          <div>
            <h3 className="text-xs font-black mb-10 text-slate-500 uppercase tracking-widest text-center border-b border-white/5 pb-6">{traditional.title}</h3>
            <ul className="space-y-6">
              {(traditional.items || []).map((item: string, i: number) => (
                <li key={i} className="text-white flex items-center justify-between gap-3 text-sm md:text-base font-bold">
                  <span className="text-pink text-xs">✕ {item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sisi Kanan: Solusi */}
        <div className="bg-white/5 p-8 md:p-14 rounded-[3.5rem] border border-green/20 flex flex-col justify-between hover:bg-green/[0.05] transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-10 -translate-y-1/2 bg-green text-black px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl z-20">The Best Way</div>
          
          <div>
            <h3 className="text-xs font-black mb-10 text-green uppercase tracking-widest text-center border-b border-white/5 pb-6">{spartan.title}</h3>
            <ul className="space-y-6">
              {(spartan.items || []).map((item: string, i: number) => (
                <li key={i} className="text-white font-bold flex items-center justify-between gap-4 text-sm md:text-base">
                  <span className="text-green text-xs">✓ {item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
