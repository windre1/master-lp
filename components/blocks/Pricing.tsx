import React from 'react';
import { Check } from 'lucide-react';

export default function Pricing({ data }: { data: any }) {
  return (

    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6">
      <div className="text-center mb-16 animate-in fade-in duration-1000">
        <h2 className="text-3xl md:text-6xl font-black mb-4 text-slate-900 tracking-tight leading-tight">
          {data.title || 'PILIH PAKET TERBAIK'}
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-medium">
          {data.subtitle || 'Otomatisasi seluruh alur kerja Anda hingga ke akar-akarnya.'}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {(data.items || [
          { name: "PAKET 1 TAHUN", price: "147rb", period: "/ tahun", cta: "#", featured: false, features: ["Akses Semua Fitur", "Masa Aktif 1 Tahun", "Free Update", "Support Group"] },
          { name: "PAKET LIFETIME", price: "299rb", period: "/ selamanya", cta: "#", featured: true, features: ["Akses Selamanya", "Free Update Selamanya", "Support Group", "Prioritas Akses"] },
          { name: "PAKET AGENCY", price: "597rb", period: "/ tahun", cta: "#", featured: false, features: ["Jual Lisensi", "Marketing Kit", "Landing Page Jualan", "Group Eksklusif"] }
        ]).map((plan: any, i: number) => (
          <div key={i} className={`relative flex flex-col p-10 rounded-[3rem] border transition-all duration-500 overflow-hidden ${plan.featured ? 'bg-slate-900 border-slate-900 shadow-2xl shadow-blue-500/10 scale-105 z-10' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:border-slate-200'}`}>
            {plan.featured && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-8 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest">
                    Best Value
                </div>
            )}
            <h3 className={`font-black uppercase tracking-widest text-xs mb-6 ${plan.featured ? 'text-blue-400' : 'text-slate-400'}`}>{plan.name}</h3>
            <div className="flex items-baseline gap-2 mb-10">
                <span className={`text-5xl font-black tracking-tighter ${plan.featured ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                <span className={`text-sm font-medium ${plan.featured ? 'text-slate-400' : 'text-slate-500'}`}>{plan.period}</span>
            </div>
            <ul className="space-y-5 mb-12 flex-1">
                {plan.features?.map((f: string, j: number) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-medium">
                        <Check className={`w-4 h-4 shrink-0 ${plan.featured ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={plan.featured ? 'text-slate-300' : 'text-slate-600'}>{f}</span>
                    </li>
                ))}
            </ul>
            <a 
                href={plan.cta || '#'} 
                className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest text-center transition-all ${plan.featured ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40 hover:bg-blue-500' : 'bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100'}`}
            >
                Amankan Sekarang
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
