import { BlockData } from '@/types/lp';

export default function Hero({ data }: { data: BlockData }) {
  const alignment = data.badge === 'left' ? 'text-left' : (data.badge === 'right' ? 'text-right' : 'text-center');
  const itemsAlignment = data.badge === 'left' ? 'items-start' : (data.badge === 'right' ? 'items-end' : 'items-center');

  return (
    <section className={`relative py-16 md:py-24 ${alignment} max-w-5xl mx-auto px-6 overflow-hidden flex flex-col ${itemsAlignment}`}>
      
      <h1 
        className="text-4xl md:text-5xl lg:text-7xl font-serif font-black leading-[1.05] mb-8 tracking-[-0.035em] max-w-4xl"
        style={{ color: data.textColor || '#0f172a' }}
      >
        {data.title || 'Judul Landing Page Anda'}
      </h1>
      
      <p 
        className="text-lg md:text-xl max-w-3xl mb-12 leading-relaxed font-medium opacity-80"
        style={{ color: data.textColor || '#64748b' }}
      >
        {data.subtitle || 'Tuliskan penjelasan singkat yang menarik di sini untuk meyakinkan pengunjung Anda.'}
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16 w-full sm:w-auto">
        <a 
          href={data.ctaLink || '#'} 
          className="px-12 py-5 text-white rounded-2xl font-black text-xs md:text-sm tracking-widest hover:scale-105 transition-all uppercase shadow-xl pink-glow"
          style={{ backgroundColor: data.buttonColor || '#0f172a' }}
        >
          {data.ctaText || 'Amankan Slot Sekarang →'}
        </a>
      </div>

       {data.image && (
        <div 
          className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group ring-1 ring-white/5"
          style={{ width: data.imageWidth ? `${data.imageWidth}%` : '100%' }}
        >
           <img 
             src={data.image} 
             alt="Hero Content" 
             className="w-full transform group-hover:scale-[1.02] transition-transform duration-1000" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}
    </section>
  );
}
