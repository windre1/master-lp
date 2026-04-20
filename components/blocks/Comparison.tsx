import React from 'react';

export default function Comparison({ data }: { data: any }) {
  const isDark = data.textColor === '#ffffff';
  
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
        <h4 className={`text-[10px] font-black tracking-[0.4em] uppercase mb-6 ${isDark ? 'text-pink' : 'text-blue-600'}`}>TAHAPAN BERBEDA</h4>
        <h2 className={`text-3xl md:text-6xl font-black tracking-tight leading-tight ${isDark ? 'font-serif text-white' : 'font-sans text-slate-900 uppercase italic'}`}>
          {data.title || 'Alur Manual vs. Sistem Otomatis'}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Sisi Kiri: Masalah */}
        <div className={`p-8 md:p-14 rounded-[3.5rem] border flex flex-col justify-between transition-all ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/[0.08]' : 'bg-white border-slate-100 shadow-xl'}`}>
          <div>
            <h3 className={`text-xs font-black mb-10 uppercase tracking-widest text-center border-b pb-6 ${isDark ? 'text-slate-500 border-white/5' : 'text-slate-400 border-slate-50'}`}>{traditional.title}</h3>
            <ul className="space-y-6">
              {(traditional.items || []).map((item: string, i: number) => (
                <li key={i} className={`flex items-center justify-between gap-3 text-sm md:text-base font-bold ${isDark ? 'text-white' : 'text-slate-600'}`}>
                  <span className={`${isDark ? 'text-pink' : 'text-red-500'} text-xs font-black`}>✕ {item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sisi Kanan: Solusi */}
        <div className={`p-8 md:p-14 rounded-[3.5rem] border flex flex-col justify-between transition-all relative overflow-hidden group ${isDark ? 'bg-white/5 border-green/20 hover:bg-green/[0.05]' : 'bg-slate-900 border-slate-800 shadow-2xl'}`}>
          <div className={`absolute top-0 right-10 -translate-y-1/2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl z-20 ${isDark ? 'bg-green text-black' : 'bg-blue-600 text-white'}`}>Recommended</div>
          
          <div>
            <h3 className={`text-xs font-black mb-10 uppercase tracking-widest text-center border-b pb-6 ${isDark ? 'text-green border-white/5' : 'text-blue-400 border-white/5'}`}>{spartan.title}</h3>
            <ul className="space-y-6">
              {(spartan.items || []).map((item: string, i: number) => (
                <li key={i} className="text-white font-bold flex items-center justify-between gap-4 text-sm md:text-base">
                  <span className={`${isDark ? 'text-green' : 'text-blue-400'} text-xs font-black`}>✓ {item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
