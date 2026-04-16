import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function Problem({ data }: { data: any }) {
  const problems = data.items || [
    { t: "Tidak Punya Arah", d: "Menghabiskan waktu mencari ide namun views tetap stagnan." },
    { t: "Capek Manual", d: "Mengerjakan semuanya secara manual sangat melelahkan." },
    { t: "Workflow Terputus", d: "Alur kerja tidak terhubung, membuat konten jadi rumit." }
  ];

  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase italic">
          {data.title || '💥 MASALAH BESAR CREATOR'}
        </h2>
        <p className="text-[#94a3b8] max-w-2xl mx-auto">
          {data.subtitle || 'Kebanyakan creator gagal bukan karena tidak memiliki skill, melainkan karena tidak memiliki SISTEM.'}
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {problems.map((p: any, i: number) => (
          <div key={i} className="bg-[#0f172a]/60 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5 hover:border-red-500/30 transition-all group">
            <AlertCircle className="w-10 h-10 text-red-500 mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-xl mb-3 text-white uppercase italic">{p.t}</h4>
            <p className="text-[#94a3b8] text-sm leading-relaxed">{p.d}</p>
          </div>
        ))}
      </div>

       <div className="text-center mt-16 animate-pulse">
          <p className="text-xl font-bold text-white italic">Masalahnya bukan di kemampuan Anda…</p>
          <p className="text-3xl font-black text-red-500 uppercase italic mt-2 shadow-red-500/20 drop-shadow-md">Tapi di SISTEM yang Anda gunakan.</p>
      </div>
    </section>
  );
}
