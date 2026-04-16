import React from 'react';
export default function Features({ data }: { data: any }) {
  return (

    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6 space-y-12">
      <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <h2 className="text-3xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
          {data.title || 'FITUR UTAMA'}
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-medium">
          {data.subtitle || 'Eksplorasi seluruh ekosistem pertumbuhan yang kami siapkan untuk Anda.'}
        </p>
      </div>

      <div className="grid gap-8">
        {(data.items || [
          { t: 'Fitur Unggulan 1', d: 'Analisis mendalam untuk hasil maksimal secara real-time.' },
          { t: 'Fitur Unggulan 2', d: 'Kelola segalanya dalam satu dashboard yang intuitif.' }
        ]).map((f: any, i: number) => {
          return (
            <div key={i} className="bg-white p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-cyan-500/5 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                 <span className="text-9xl font-black text-slate-900 leading-none select-none">{i + 1}</span>
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-20">
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full">
                     <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full"></div>
                     <span className="text-[10px] font-black tracking-widest uppercase">Fitur {i + 1}</span>
                  </div>
                  <h3 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tight">{f.t}</h3>
                  <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">{f.d}</p>
                </div>
                {f.img && (
                   <div className="flex-1 w-full rounded-3xl overflow-hidden border border-slate-100 shadow-xl group-hover:scale-[1.02] transition-transform duration-1000">
                     <img src={f.img} alt={f.t} className="w-full h-auto" />
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
