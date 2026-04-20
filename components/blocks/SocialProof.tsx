import React from 'react';

export default function SocialProof({ data }: { data: any }) {
  const screenshots = data.items || [
    { img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000&auto=format&fit=crop', title: 'Bukti Komisi Masuk', desc: 'Baru 5 hari praktek, udah closing 60 produk. Balik modal di hari pertama!' },
    { img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000&auto=format&fit=crop', title: 'Tanpa Tampil Wajah', desc: 'Sambil kerja kantoran, cuma malam hari. Sebulan tembus 25jt!' },
    { img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000&auto=format&fit=crop', title: 'Pelajar Juga Bisa', desc: 'Bulan pertama 3.2jt, bulan kedua 9.8jt. Tanpa perlu beli sample!' },
    { img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000&auto=format&fit=crop', title: 'Full Otomatis', desc: 'Mulai Desember GMV tembus 100jt lebih, gak pernah nunjukin muka sama sekali!' }
  ];

  return (
    <section className="py-20 md:py-32 max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-pink mb-6">{data.subtitle || 'BUKTI NYATA'}</h4>
        <h2 className="text-3xl md:text-6xl font-serif font-black text-white tracking-tight leading-tight">
          {data.title || 'Mereka sudah membuktikan'}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {screenshots.map((s: any, i: number) => (
          <div key={i} className="group">
            <div className="bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden mb-6 shadow-2xl hover:border-pink/30 transition-all">
              <div className="aspect-[9/16] bg-slate-900 overflow-hidden relative">
                <img 
                  src={s.img} 
                  alt={s.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <p className="text-white text-xs md:text-sm font-medium leading-relaxed italic opacity-80 line-clamp-3">
                  "{s.desc}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-green font-black text-xs md:text-sm uppercase tracking-widest mt-12 border-t border-white/5 pt-12">
        Ratusan orang sudah membuktikan. Sekarang giliran kamu.
      </p>
    </section>
  );
}
