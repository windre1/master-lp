import React from 'react';
import { BlockData } from '@/types/lp';

export default function Hero({ data }: { data: BlockData }) {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-white">
      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8 italic">
            {data.title || 'Scale Your Content'}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mb-12 leading-relaxed">
            {data.subtitle || 'Upload massal & auto posting dalam hitungan detik.'}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
             <button className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 uppercase tracking-widest text-sm">
                {data.ctaText || 'Mulai Sekarang'}
             </button>
             <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                   ))}
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                   Join 10k+ <br/> active users
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
