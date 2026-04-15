import React from 'react';

export default function Solution({ data }: { data: any }) {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
              {data.title || 'Ubah Cara Kerja Anda Lebih Efisien.'}
            </h3>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10">
              {data.subtitle || 'Kami hadir untuk memberikan solusi digital yang asisten otomatis untuk bisnis Anda.'}
            </p>
          </div>
          <div className="lg:w-1/2">
             <div className="bg-indigo-600 rounded-3xl aspect-video w-full flex items-center justify-center text-white italic font-bold">
               {data.image ? <img src={data.image} alt="Solution" className="w-full h-full object-cover rounded-3xl"/> : 'Product Visual'}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
