import React from 'react';

export default function Specs({ data }: { data: any }) {
  const minimum = data.minimum || [
    { label: "OS", value: "Windows 10 / 11 (64-bit)" },
    { label: "RAM", value: "4 GB" },
    { label: "Storage", value: "2 GB ruang kosong" },
    { label: "Koneksi", value: "Internet stabil" }
  ];
  const recommended = data.recommended || [
    { label: "OS", value: "Windows 10 / 11 (64-bit)" },
    { label: "RAM", value: "8 GB atau lebih" },
    { label: "Storage", value: "SSD (rendering lebih cepat)" },
    { label: "Koneksi", value: "Internet cepat & stabil" }
  ];

  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6">
      <div className="text-center mb-16 animate-in fade-in duration-1000">
        <h2 className="text-3xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight leading-tight uppercase">
          {data.title || 'SPESIFIKASI DEVICE'}
        </h2>
        <p className="text-slate-600 text-lg md:text-xl font-medium">{data.subtitle || 'Performa maksimal membutuhkan alat yang tepat.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <h3 className="text-xs font-black mb-10 text-slate-300 uppercase tracking-widest">Minimum Specs</h3>
          <ul className="space-y-6">
            {(data.minimum || [
              { label: "OS", value: "Windows 10 / 11 (64-bit)" },
              { label: "RAM", value: "4 GB" },
              { label: "Storage", value: "2 GB ruang kosong" },
              { label: "Koneksi", value: "Internet stabil" }
            ]).map((s: any, i: number) => (
              <li key={i} className="flex justify-between items-center border-b border-slate-50 pb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</span>
                <span className="text-sm text-slate-900 font-bold">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 p-12 rounded-[4rem] shadow-2xl shadow-blue-500/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-[2rem] text-[10px] font-black uppercase tracking-widest">Recommended</div>
          <h3 className="text-xs font-black mb-10 text-blue-400 uppercase tracking-widest">Recommended Specs</h3>
          <ul className="space-y-6">
            {(data.recommended || [
              { label: "OS", value: "Windows 10 / 11 (64-bit)" },
              { label: "RAM", value: "8 GB atau lebih" },
              { label: "Storage", value: "SSD" },
              { label: "Koneksi", value: "Internet cepat" }
            ]).map((s: any, i: number) => (
              <li key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</span>
                <span className="text-sm text-white font-black">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-12 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 opacity-60">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Catatan Penting:</p>
        <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5 font-medium">
          <li>Fitur rendering dan download akan lebih optimal pada device berspesifikasi tinggi.</li>
          <li>Hindari spesifikasi rendah untuk penggunaan batch processing.</li>
        </ul>
      </div>
    </section>
  );
}
