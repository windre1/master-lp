import React from 'react';

export default function Solution({ data }: { data: any }) {
  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6">
      <div className="bg-slate-900 rounded-[4rem] p-10 md:p-24 shadow-2xl shadow-slate-200 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        
        <h4 className="text-cyan-400 font-black tracking-widest uppercase mb-6 text-xs md:text-sm">{data.badge || 'WAKROD PROJECT'}</h4>
        <h2 className="text-3xl md:text-6xl font-black mb-8 text-white tracking-tight leading-tight">
          {data.title || 'IDE → ANALISA → PRODUKSI → UPLOAD'}
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
          {data.subtitle || 'Bukan sekadar tools... Ini adalah mesin pertumbuhan channel YouTube dalam SATU dashboard.'}
        </p>
        
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {(data.items || []).map((p: any, i: number) => (
             <div key={i} className="text-left p-8 bg-white/5 rounded-3xl border border-white/10">
                <h4 className="text-white font-bold text-lg mb-2">{p.t}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{p.d}</p>
             </div>
          ))}
        </div>

        {data.image && (
          <div className="relative group max-w-5xl mx-auto">
             <img 
                src={data.image} 
                alt="Process Visual" 
                className="w-full rounded-[2rem] border border-white/10 shadow-2xl transition-transform duration-1000 group-hover:scale-[1.01]"
             />
          </div>
        )}
      </div>
    </section>
  );
}
