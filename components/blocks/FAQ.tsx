import React from 'react';

export default function FAQ({ data }: { data: any }) {
  const faqs = data.items || [
    { q: "Aman gak?", a: "Sangat aman." }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container px-6 mx-auto max-w-3xl text-center">
        <h3 className="text-3xl font-black mb-12">{data.title || 'FAQ'}</h3>
        <div className="space-y-4 text-left">
          {faqs.map((f: any, i: number) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
               <h4 className="font-black text-slate-800 mb-3">{f.q}</h4>
               <p className="text-sm text-slate-500 font-medium">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
