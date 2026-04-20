import React from 'react';
export default function Features({ data }: { data: any }) {
  const items = data.items || [];
  const isGrid = items.length > 2;
  const isDark = data.textColor === '#ffffff' || !data.textColor; // Defaulting to dark for this component since it was requested heavily, but let's be safer.

  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6 space-y-12">
      <div className="text-center mb-20">
        <h4 className={`text-[10px] font-black tracking-[0.4em] uppercase mb-6 ${isDark ? 'text-pink' : 'text-blue-600'}`}>TAHAPAN KERJA</h4>
        <h2 className={`text-3xl md:text-6xl font-black tracking-tight leading-tight ${isDark ? 'font-serif text-white' : 'font-sans text-slate-900 uppercase italic'}`}>
          {data.title || 'FITUR UTAMA'}
        </h2>
        {data.subtitle && (
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed mt-6`}>
            {data.subtitle}
          </p>
        )}
      </div>

      <div className={isGrid ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "grid gap-8"}>
        {items.map((f: any, i: number) => {
          return (
            <div key={i} className={`p-8 md:p-12 rounded-[2.5rem] border transition-all group relative overflow-hidden ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/[0.08]' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1'}`}>
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${isDark ? 'bg-pink/10 border-pink/20' : 'bg-blue-50 border-blue-100'}`}>
                     <span className={`text-xl font-black ${isDark ? 'text-pink' : 'text-blue-600'}`}>{i + 1}</span>
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>{f.t}</h3>
                </div>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-sm md:text-base font-medium leading-relaxed`}>{f.d}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
