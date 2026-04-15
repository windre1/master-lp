export default function Demo() {
  return (
    <section className="py-24 bg-white">
      <div className="container px-6 mx-auto">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-[3rem] p-4 md:p-8 shadow-3xl shadow-indigo-100 border border-slate-800">
           <div className="aspect-video bg-slate-800 rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl relative z-10 cursor-pointer hover:scale-110 transition-transform">
                 <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-indigo-600 border-b-[10px] border-b-transparent ml-1"></div>
              </div>
              <span className="mt-6 text-white text-xs font-black uppercase tracking-widest relative z-10 opacity-60">Lihat Demo Video - 1:45 Min</span>
           </div>
        </div>
        <div className="text-center mt-12 grid gap-4 grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto">
           {[
             { l: 'Uptime', v: '99.9%' },
             { l: 'Kecepatan', v: '0.2s' },
             { l: 'User', v: '10k+' },
             { l: 'Hasil', v: '24/7' }
           ].map((s, i) => (
             <div key={i}>
                <p className="text-2xl font-black text-slate-900">{s.v}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.l}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
