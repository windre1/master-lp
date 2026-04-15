export default function Steps() {
  const steps = [
    { n: "01", t: "Setup Konten", d: "Siapkan video atau materi digital Anda dalam satu folder." },
    { n: "02", t: "Pilih Akun", d: "Hubungkan akun-akun Anda dengan sekali klik." },
    { n: "03", t: "Auto Posting", d: "Sistem akan mendistribusikan konten Anda secara otomatis 24/7." }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container px-6 mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">Hanya 3 Langkah Simpel</h2>
        </div>
        
        <div className="grid gap-12 md:grid-cols-3 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-slate-200 -z-0"></div>
          
          {steps.map((s, i) => (
            <div key={i} className="relative z-10 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center text-2xl font-black text-indigo-600 shadow-xl mb-6">
                {s.n}
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
