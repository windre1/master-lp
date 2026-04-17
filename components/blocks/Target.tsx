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
        <h2 className="text-3xl md:text-6xl font-extrabold mb-6 text-slate-900 tracking-[-0.03em] leading-[1.05]">
          {data.title || 'SIAPA YANG COCOK?'}
        </h2>
        <p className="text-blue-500 font-bold text-base md:text-lg uppercase tracking-[0.2em]">
          {data.subtitle || '👉 Bukan untuk semua orang. Tapi WAJIB untuk yang serius mau growth.'}
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
            <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-all group overflow-hidden relative">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-8 group-hover:bg-slate-900 group-hover:text-white transition-all">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-4 tracking-[-0.02em] leading-tight uppercase">{card.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{card.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
