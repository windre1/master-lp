import React from 'react';

export default function Specs({ data }: { data: any }) {
  if (data.items) {
    return (
      <section className="py-12 max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center gap-8 md:gap-4 border-y border-white/10 py-10">
          {data.items.map((item: any, i: number) => (
            <div key={i} className="flex-1 min-w-[150px] text-center border-r last:border-r-0 border-white/10 px-4">
              <h4 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">{item.t}</h4>
              <p className="text-[10px] md:text-sm font-black text-green tracking-[0.2em] uppercase">{item.d}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6">
      <div className="text-center mb-16 animate-in fade-in duration-1000">
        <h2 className="text-3xl md:text-6xl font-serif font-black mb-6 text-white tracking-tight leading-tight uppercase">
          {data.title || 'SPESIFIKASI DEVICE'}
        </h2>
        <p className="text-slate-400 text-lg md:text-xl font-medium">{data.subtitle || 'Performa maksimal membutuhkan alat yang tepat.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 shadow-xl">
          <h3 className="text-xs font-black mb-10 text-slate-500 uppercase tracking-widest">Minimum Specs</h3>
          <ul className="space-y-6">
            {(data.minimum || [
              { label: "OS", value: "Windows 10 / 11 (64-bit)" },
              { label: "RAM", value: "4 GB" },
              { label: "Storage", value: "2 GB ruang kosong" },
              { label: "Koneksi", value: "Internet stabil" }
            ]).map((s: any, i: number) => (
              <li key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</span>
                <span className="text-sm text-white font-bold">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 border border-white/10 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-pink text-white px-6 py-2 rounded-bl-[2rem] text-[10px] font-black uppercase tracking-widest">Recommended</div>
          <h3 className="text-xs font-black mb-10 text-pink uppercase tracking-widest">Recommended Specs</h3>
          <ul className="space-y-6">
            {(data.recommended || [
              { label: "OS", value: "Windows 10 / 11 (64-bit)" },
              { label: "RAM", value: "8 GB atau lebih" },
              { label: "Storage", value: "SSD" },
              { label: "Koneksi", value: "Internet cepat" }
            ]).map((s: any, i: number) => (
              <li key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</span>
                <span className="text-sm text-white font-black">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
