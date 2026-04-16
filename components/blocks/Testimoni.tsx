import React from 'react';
import { Quote } from 'lucide-react';

export default function Testimoni({ data }: { data: any }) {
  const testimonials = data.items || [
    { n: "Budi Santoso", c: "View channel saya naik drastis setelah pakai sistem otomatisasi Spartan Tube. Kerja jadi lebih cerdas!" },
    { n: "Linda Wijaya", c: "Dulu pusing kelola 5 channel, sekarang 20 channel pun terasa ringan. Sangat worth it!" }
  ];

  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6">
      <div className="text-center mb-16 animate-in fade-in duration-1000">
        <h2 className="text-3xl md:text-6xl font-black mb-4 text-slate-900 tracking-tight leading-tight uppercase">
          {data.title || 'APA KATA MEREKA?'}
        </h2>
        <p className="text-blue-600 font-bold tracking-widest uppercase text-[10px] md:text-xs">Review Dari Pengguna Kami</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        {(data.items || [
          { n: "Budi Santoso", c: "View channel saya naik drastis setelah pakai sistem otomatisasi ini. Kerja jadi lebih cerdas!" },
          { n: "Linda Wijaya", c: "Dulu pusing kelola 5 channel, sekarang 20 channel pun terasa ringan. Sangat worth it!" }
        ]).map((t: any, i: number) => (
          <div key={i} className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all relative overflow-hidden group">
             <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100">
                <Quote className="w-6 h-6 text-slate-300 group-hover:text-blue-600 transition-colors" />
             </div>
             <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed relative z-10">"{t.c}"</p>
             <div className="mt-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center font-black text-white text-xs">
                  {t.n.charAt(0)}
                </div>
                <h5 className="font-bold text-slate-900 uppercase tracking-tight text-sm">{t.n}</h5>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}
