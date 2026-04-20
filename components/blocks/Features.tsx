import React from 'react';
export default function Features({ data }: { data: any }) {
  const items = data.items || [];
  const isGrid = items.length > 2;

  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6 space-y-12">
      <div className="text-center mb-20">
        <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-pink mb-6">BAYANGKAN INI</h4>
        <h2 className="text-3xl md:text-6xl font-serif font-black text-white tracking-tight leading-tight">
          {data.title || 'FITUR UTAMA'}
        </h2>
        {data.subtitle && (
          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed mt-6">
            {data.subtitle}
          </p>
        )}
      </div>

      <div className={isGrid ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "grid gap-8"}>
        {items.map((f: any, i: number) => {
          return (
            <div key={i} className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10 hover:bg-white/[0.08] transition-all group relative overflow-hidden">
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink/10 rounded-2xl flex items-center justify-center border border-pink/20">
                     <span className="text-pink text-xl font-black">{i + 1}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{f.t}</h3>
                </div>
                <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">{f.d}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
