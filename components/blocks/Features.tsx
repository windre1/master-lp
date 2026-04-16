import React from 'react';
import { Layout, Calendar, Users, Database } from 'lucide-react';

export default function Features({ data }: { data: any }) {
  const items = data.items || [
    { t: 'Dashboard Intelligence', d: 'Analisis channel kompetitor dan ambil insight berharga secara real-time.', icon: Layout, img: '/assets/fitur1.png' },
    { t: 'Content Planner', d: 'Atur jadwal konten harian untuk masing-masing channel tanpa bingung.', icon: Calendar, img: '/assets/fitur2.png' },
    { t: 'Multi-Channel Management', d: 'Kelola puluhan hingga ratusan channel sekaligus dalam satu tampilan.', icon: Users, img: '/assets/fitur3.png' }
  ];

  return (
    <section className="py-24 max-w-5xl mx-auto px-6 space-y-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase italic">
          {data.title || '⚔️ SENJATA UTAMA SPARTAN TUBE'}
        </h2>
        <p className="text-[#94a3b8] max-w-2xl mx-auto">
          {data.subtitle || 'Eksplorasi seluruh ekosistem pertumbuhan YouTube otomatis Anda.'}
        </p>
      </div>

      {items.map((f: any, i: number) => {
        const Icon = f.icon || Database;
        return (
          <div key={i} className="bg-[#0f172a]/60 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] border border-white/5 hover:border-[#00f2ff]/20 transition-all text-center group">
            <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(0,242,255,0.1)] group-hover:scale-110 transition-transform">
               <Icon className="w-8 h-8 text-[#00f2ff]" />
            </div>
            <h4 className="text-[#00f2ff] font-bold text-xs tracking-widest uppercase mb-3">Fitur {i + 1}</h4>
            <h3 className="text-2xl md:text-4xl font-black text-white mb-6 uppercase italic bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">{f.t}</h3>
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto mb-12">{f.d}</p>
            {f.img && (
               <div className="relative mt-12 rounded-3xl overflow-hidden border border-white/10 group-hover:border-[#00f2ff]/30 transition-colors shadow-2xl">
                 <img src={f.img} alt={f.t} className="w-full transform group-hover:scale-[1.02] transition-transform duration-700" />
               </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
