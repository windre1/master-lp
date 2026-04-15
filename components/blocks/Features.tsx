import React from 'react';

export default function Features({ data }: { data: any }) {
  const items = data.items || [
    { t: 'Kecepatan Cahaya', d: 'Sistem cloud-native yang didesain untuk performa tanpa lag.' },
    { t: 'Multi-Akun', d: 'Kelola puluhan aset digital Anda dalam satu dashboard pusat.' }
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-50">
      <div className="container px-6 mx-auto">
        <h3 className="text-3xl font-black text-center mb-16">{data.title || 'Fitur Unggulan'}</h3>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((f: any, i: number) => (
            <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="font-black text-slate-900 mb-3 tracking-tight">{f.t}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
