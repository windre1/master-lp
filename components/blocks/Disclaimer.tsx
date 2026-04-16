import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function Disclaimer({ data }: { data: any }) {
  const content = data.content || [
    "Spartan Tube adalah tools berbasis AI and automation yang dirancang untuk membantu mempercepat workflow.",
    "Hasil yang didapatkan setiap pengguna dapat berbeda-beda, tergantung pada konsistensi dan strategi.",
    "Spartan Tube tidak menjamin hasil instan, namun memberikan sistem data untuk meningkatkan peluang sukses.",
    "Pengguna tetap bertanggung jawab atas konten yang dipublikasikan sesuai kebijakan YouTube."
  ];

  return (
    <section className="py-20 bg-black/40 border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10 text-orange-500">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
            <ShieldAlert size={28} />
          </div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter">
            {data.title || '⚠️ DISCLAIMER'}
          </h3>
        </div>
        
        <div className="grid gap-6">
          {content.map((p: string, i: number) => (
            <div key={i} className="flex gap-4 group">
               <span className="text-orange-500/30 font-black text-xl italic group-hover:text-orange-500 transition-colors">{String(i + 1).padStart(2, '0')}.</span>
               <p className="text-[#94a3b8] text-sm leading-relaxed font-medium group-hover:text-[#e2e8f0] transition-colors">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
