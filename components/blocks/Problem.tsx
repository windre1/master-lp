import React from 'react';

export default function Problem({ data }: { data: any }) {
  const problems = data.items || [
    { t: "Capek Upload Manual", d: "Habis waktu berjam-jam cuma buat satu-satu konten." },
    { t: "Kelihatannya Ribet", d: "Banyak akun sosial media bikin pusing manage-nya." }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="container px-6 mx-auto max-w-4xl text-center">
        <h3 className="text-3xl md:text-5xl font-black mb-16 tracking-tighter">
          {data.title || 'Apakah Anda Merasakan Ini?'}
        </h3>
        <div className="grid gap-8 md:grid-cols-2">
          {problems.map((p: any, i: number) => (
            <div key={i} className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50 text-left">
              <h4 className="font-black text-xl mb-3 tracking-tight">{p.t}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
