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
    <section className="py-24 max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase italic">
          {data.title || '💻 SPESIFIKASI DEVICE'}
        </h2>
        <p className="text-[#94a3b8]">{data.subtitle || 'Spesifikasi yang disarankan untuk performa maksimal.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0f172a]/30 p-10 rounded-[3rem] border border-white/5">
          <h3 className="text-xl font-black mb-8 text-white/50 uppercase italic tracking-widest">Minimum Specs</h3>
          <ul className="space-y-4">
            {minimum.map((s: any, i: number) => (
              <li key={i} className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</span>
                <span className="text-sm text-[#94a3b8] font-medium">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#00f2ff]/5 p-10 rounded-[3rem] border-2 border-[#00f2ff]/20 relative">
          <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#00f2ff] text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Recommended</div>
          <h3 className="text-xl font-black mb-8 text-[#00f2ff] uppercase italic tracking-widest">Recommended Specs</h3>
          <ul className="space-y-4">
            {recommended.map((s: any, i: number) => (
              <li key={i} className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[10px] font-black text-[#00f2ff] uppercase tracking-widest">{s.label}</span>
                <span className="text-sm text-white font-bold">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-12 p-8 bg-black/20 rounded-[2rem] border border-white/5 opacity-50">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 italic">Catatan Penting:</p>
        <ul className="text-xs text-[#94a3b8] space-y-2 list-disc pl-5 font-medium">
          <li>Fitur rendering dan download akan lebih optimal pada device berspesifikasi tinggi.</li>
          <li>Hindari spesifikasi rendah untuk penggunaan batch processing atau multi-channel.</li>
        </ul>
      </div>
    </section>
  );
}
