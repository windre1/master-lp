export default function Problem() {
  const problems = [
    { t: "Capek Upload Manual", d: "Habis waktu berjam-jam cuma buat satu-satu konten." },
    { t: "Kelihatannya Ribet", d: "Banyak akun sosial media bikin pusing manage-nya." },
    { t: "Growth Stuck", d: "Udah rajin posting tapi followers & sales gak naik-naik." }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="container px-6 mx-auto max-w-4xl text-center">
        <h2 className="text-indigo-400 font-black uppercase tracking-widest text-xs mb-4">The Pain Point</h2>
        <h3 className="text-3xl md:text-5xl font-black mb-16 tracking-tighter">Apakah Anda Merasakan Ini?</h3>
        
        <div className="grid gap-8 md:grid-cols-3">
          {problems.map((p, i) => (
            <div key={i} className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50 text-left hover:border-indigo-500/50 transition-all group">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6 font-black group-hover:scale-110 transition-transform">!</div>
              <h4 className="font-black text-xl mb-3 tracking-tight">{p.t}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
