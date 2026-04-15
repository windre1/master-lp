import React from 'react';

export default function Testimoni({ data }: { data: any }) {
  const testimonials = data.items || [
    { n: "Budi Santoso", c: "Omzet naik 300% setelah pakai tools ini!" }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container px-6 mx-auto">
        <h3 className="text-center text-3xl font-black mb-16">{data.title || 'Apa Kata Mereka?'}</h3>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {testimonials.map((t: any, i: number) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
               <p className="text-lg text-slate-700 italic font-medium">"{t.c}"</p>
               <h5 className="font-black text-slate-900 mt-6">{t.n}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
