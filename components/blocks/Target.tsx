import React from 'react';
import { Users, Globe, TrendingUp, Zap, Smartphone } from 'lucide-react';

export default function Target({ data }: { data: any }) {
  const cards = data.items || [
    { title: "Creator yang Mau Channelnya Naik Level", desc: "Bukan cuma upload… tapi mau punya strategi yang jelas dan berbasis data.", icon: Users },
    { title: "Builder Banyak Channel", desc: "Yang kelola puluhan channel sekaligus dan butuh sistem pusat agar semua terkendali.", icon: Globe },
    { title: "Pemburu Konten Viral", desc: "Yang ingin selalu selangkah lebih cepat dalam menemukan ide yang sedang naik daun.", icon: TrendingUp },
    { title: "Creator Berbasis AI & Automation", desc: "Yang ingin workflow cepat, scalable, and minim kerja manual demi efisiensi.", icon: Zap },
    { title: "Digital Marketer & Affiliate Player", desc: "Yang menggunakan YouTube sebagai mesin traffic dan sumber penghasilan utama.", icon: Smartphone },
    { title: "Agency & Tim Konten", desc: "Yang butuh sistem untuk mengelola banyak klien secara profesional tanpa ribet.", icon: Users }
  ];

  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6">
      <div className="text-center mb-16 animate-in fade-in duration-1000">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-slate-900 tracking-[-0.035em] leading-[1.05]">
          {data.title || 'SIAPA YANG COCOK?'}
        </h2>
        <p className="text-blue-500 font-bold text-sm md:text-base uppercase tracking-[0.25em] opacity-80">
          {data.subtitle || 'Bukan untuk semua orang. Tapi WAJIB untuk yang serius.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(data.items || [
          { title: "Creator yang Mau Scale Up", desc: "Bukan cuma upload… tapi mau punya strategi yang jelas dan berbasis data.", icon: Users },
          { title: "Builder Banyak Channel", desc: "Yang kelola puluhan channel sekaligus dan butuh sistem pusat agar semua terkendali.", icon: Globe },
          { title: "Agency & Tim Konten", desc: "Yang butuh sistem untuk mengelola banyak klien secara profesional tanpa ribet.", icon: Users }
        ]).map((card: any, i: number) => {
          const Icon = card.icon || Users;
          return (
            <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-blue-100/50 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 hover:-translate-y-2 transition-all group overflow-hidden relative">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-4 tracking-[-0.02em] leading-tight uppercase italic">{card.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{card.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
