import React from 'react';

export default function Steps({ data }: { data: any }) {
  const steps = data.items || [
    { n: "01", t: "Setup Konten", d: "Siapkan materi digital Anda." },
    { n: "02", t: "Auto Posting", d: "Sistem mendistribusikan otomatis." }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container px-6 mx-auto max-w-5xl">
        <h3 className="text-3xl md:text-5xl font-black text-center mb-16">{data.title || 'Hanya 3 Langkah Simpel'}</h3>
        <div className="grid gap-12 md:grid-cols-2">
          {steps.map((s: any, i: number) => (
            <div key={i} className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-xl font-black text-indigo-600 shadow-xl mb-6">
                {s.n || (i+1)}
              </div>
              <h4 className="font-black text-xl text-slate-900 mb-3 tracking-tight">{s.t}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
