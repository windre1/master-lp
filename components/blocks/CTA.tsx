import React from 'react';

export default function CTA({ data }: { data: any }) {
  return (
    <section className="py-32 bg-indigo-600 text-white text-center">
      <div className="container px-6 mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
          {data.title || 'Waktunya Scale Bisnis Anda.'}
        </h2>
        <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-12 font-medium">
          {data.subtitle || 'Mulai sekarang sebelum harga naik!'}
        </p>
        <button className="px-12 py-6 bg-white text-indigo-600 font-black rounded-full shadow-2xl uppercase tracking-widest text-sm">
           {data.ctaText || 'Gabung Sekarang'}
        </button>
      </div>
    </section>
  );
}
