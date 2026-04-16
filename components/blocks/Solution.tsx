import React from 'react';

export default function Solution({ data }: { data: any }) {
  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <div className="bg-[#0f172a]/60 backdrop-blur-2xl rounded-[4rem] p-10 md:p-20 border border-white/5 shadow-[0_0_50px_rgba(0,242,255,0.05)] text-center">
        <h4 className="text-[#00f2ff] font-bold tracking-[2px] uppercase mb-4">🧠 SOLUSINYA: SPARTAN TUBE</h4>
        <h2 className="text-3xl md:text-6xl font-black mb-8 bg-gradient-to-br from-white to-cyan-400 bg-clip-text text-transparent uppercase italic leading-tight">
          {data.title || 'IDE → ANALISA → PRODUKSI → UPLOAD'}
        </h2>
        <p className="text-[#94a3b8] text-lg max-w-3xl mx-auto mb-16 leading-relaxed">
          {data.subtitle || 'Bukan sekadar tools... Ini adalah mesin pertumbuhan channel YouTube dalam SATU dashboard.'}
        </p>
        
        <div className="relative group max-w-5xl mx-auto">
           <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
           <img 
              src={data.image || "/assets/hero.png"} 
              alt="Dashboard" 
              className="w-full rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(10,11,28,1)] transition-transform duration-700 group-hover:scale-[1.02]"
           />
        </div>
      </div>
    </section>
  );
}
