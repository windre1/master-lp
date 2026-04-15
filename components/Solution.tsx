export default function Solution() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-4">The Solution</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
               Ubah Cara Kerja Anda <br/> Menjadi <span className="text-indigo-600 underline decoration-8 decoration-indigo-100 underline-offset-8">Lebih Efisien.</span>
            </h3>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10">
              Kami hadir untuk memberikan solusi digital yang bukan hanya sekadar tool, tapi asisten otomatis untuk bisnis Anda. Fokus pada strategy, biarkan kami urus teknisnya.
            </p>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">✓</div>
               <span className="font-black text-slate-800 tracking-tight">Eksklusif dibuat untuk High-Performance User.</span>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="bg-indigo-600 w-full h-[400px] rounded-3xl rotate-3 absolute inset-0 -z-10 opacity-10"></div>
             <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop" alt="Solution" className="rounded-3xl shadow-2xl relative z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
