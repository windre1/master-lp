import React from 'react';
import { Quote } from 'lucide-react';

export default function Testimoni({ data }: { data: any }) {
  const testimonials = data.items || [
    { n: "Budi Santoso", c: "View channel saya naik drastis setelah pakai sistem otomatisasi Spartan Tube. Kerja jadi lebih cerdas!" },
    { n: "Linda Wijaya", c: "Dulu pusing kelola 5 channel, sekarang 20 channel pun terasa ringan. Sangat worth it!" }
  ];

  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase italic">
          {data.title || 'APA KATA MEREKA?'}
        </h2>
        <p className="text-[#94a3b8] tracking-widest uppercase text-[10px] font-black">Testimoni Pengguna Sukses</p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 max-w-5xl mx-auto">
        {testimonials.map((t: any, i: number) => (
          <div key={i} className="bg-[#0f172a]/60 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 relative group hover:border-cyan-500/20 transition-all">
             <Quote className="w-10 h-10 text-[#00f2ff]/10 absolute top-8 right-10" />
             <p className="text-lg text-white italic font-medium leading-relaxed relative z-10">"{t.c}"</p>
             <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-black text-white italic">
                  {t.n.charAt(0)}
                </div>
                <h5 className="font-black text-[#00f2ff] uppercase italic tracking-tight">{t.n}</h5>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}
