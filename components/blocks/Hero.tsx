import React from 'react';
import { BlockData } from '@/types/lp';

export default function Hero({ data }: { data: BlockData }) {
  return (
    <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white">
      <div className="container px-6 mx-auto relative z-10">
        <div className={`grid gap-16 items-center ${data.image ? 'lg:grid-cols-2' : ''}`}>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8 italic">
              {data.title || 'Scale Your Content'}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mb-12 leading-relaxed">
              {data.subtitle || 'Upload massal & auto posting dalam hitungan detik.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
               <a 
                 href={data.ctaLink || '#'}
                 className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 uppercase tracking-widest text-sm text-center"
               >
                  {data.ctaText || 'Mulai Sekarang'}
               </a>
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

          {data.image && (
            <div className="relative group">
               <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] rotate-3 -z-10 opacity-5 group-hover:rotate-6 transition-transform"></div>
               <img 
                 src={data.image} 
                 alt="Hero Visual" 
                 className="w-full rounded-[3rem] shadow-2xl border border-slate-100 relative z-10"
               />
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px] -z-0 opacity-40"></div>
    </section>
  );
}
