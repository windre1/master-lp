import React from 'react';
import { Check } from 'lucide-react';

export default function Pricing({ data }: { data: any }) {
  const plans = data.items || [
    { name: "PAKET 1 TAHUN", price: "147rb", period: "/ tahun", cta: "https://www.wakrod.my.id/order/f0f52950-2e18-4d47-8692-ddd0a84bec8c", featured: false, features: ["Akses Semua Fitur AI", "Masa Aktif 1 Tahun", "Free Update (1 Tahun)", "WA Group Support"] },
    { name: "PAKET LIFETIME", price: "299rb", period: "/ selamanya", cta: "https://www.wakrod.my.id/order/d6058735-7573-4ee5-b0c5-5701b146e05f", featured: true, features: ["SEMUA Fitur AI", "Akses Selamanya", "Free Update Selamanya", "WA Group Support", "Prioritas Update"] },
    { name: "PAKET AGENCY", price: "597rb", period: "/ tahun", cta: "https://www.wakrod.my.id/order/77296187-37d7-4228-a708-ffbb9961a547", featured: false, features: ["Akses Selamanya", "Jual Paket Lisensi", "Marketing Kit", "LP Jualan", "Group Eksklusif"] }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase italic">
          {data.title || '🚀 PILIH PAKET UNTUK MULAI GROW'}
        </h2>
        <p className="text-[#94a3b8] max-w-2xl mx-auto">
          {data.subtitle || 'Otomatisasi seluruh alur kerja Anda hingga ke akar-akarnya.'}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan: any, i: number) => (
          <div key={i} className={`relative flex flex-col p-10 rounded-[2.5rem] border transition-all ${plan.featured ? 'bg-[#0a1128] border-cyan-500 shadow-[0_0_40px_rgba(0,242,255,0.1)]' : 'bg-[#0f172a]/40 border-white/5'}`}>
            {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Terpopuler
                </div>
            )}
            <h3 className="text-[#00f2ff] font-bold uppercase tracking-widest text-sm mb-4">{plan.name}</h3>
            <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-sm text-[#94a3b8]">{plan.period}</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((f: string, j: number) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-[#94a3b8]">
                        <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                        <span>{f}</span>
                    </li>
                ))}
            </ul>
            <a 
                href={plan.cta || '#'} 
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all ${plan.featured ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg' : 'bg-white/5 text-[#00f2ff] border border-[#00f2ff]/30 hover:bg-[#00f2ff] hover:text-black'}`}
            >
                Beli Sekarang
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
