import React from 'react';

export default function FAQ({ data }: { data: any }) {
  const faqs = data.items || [
    { q: "Apakah tool ini aman digunakan?", a: "Sangat aman. Sistem kami menggunakan API resmi dan metode yang sesuai dengan kebijakan platform." },
    { q: "Apakah ada biaya langganan bulanan?", a: "Tergantung paket yang Anda pilih. Paket Lifetime hanya memerlukan satu kali pembayaran saja." }
  ];

  return (
    <section className="py-24 max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase italic">
          {data.title || 'PERTANYAAN UMUM'}
        </h2>
        <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
      </div>
      
      <div className="space-y-6">
        {faqs.map((f: any, i: number) => (
          <div key={i} className="bg-[#0f172a]/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 hover:border-[#00f2ff]/20 transition-all">
             <h4 className="font-black text-white text-lg mb-4 uppercase italic flex items-center gap-3">
               <span className="text-[#00f2ff]">?</span> {f.q}
             </h4>
             <p className="text-[#94a3b8] text-sm leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
