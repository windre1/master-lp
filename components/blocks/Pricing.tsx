import React from 'react';

export default function Pricing({ data }: { data: any }) {
  const price = data.price || 99000;
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', maximumFractionDigits: 0
  }).format(price);

  return (
    <section className="py-24 bg-white">
      <div className="container px-6 mx-auto text-center max-w-xl">
        <h3 className="text-3xl font-black mb-8">{data.title || 'Investasi Terbaik Anda'}</h3>
        <div className="bg-indigo-600 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl">
           <h4 className="text-xl font-black mb-4">{data.subtitle || 'Lifetime Access'}</h4>
           <p className="text-5xl font-black tracking-tighter mb-10">{formattedPrice}</p>
           <a 
              href={data.ctaLink || '#'}
              className="w-full block py-5 bg-white text-indigo-600 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase text-xs tracking-widest text-center"
           >
              {data.ctaText || 'Dapatkan Sekarang'}
           </a>
        </div>
      </div>
    </section>
  );
}
