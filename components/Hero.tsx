import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
}

export default function Hero({ title, subtitle, ctaText = "Mulai Sekarang" }: HeroProps) {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-white">
      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
             {title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 leading-relaxed">
             {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
             <button className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 uppercase tracking-widest text-sm active:scale-95">
                {ctaText}
             </button>
             <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-8 h-8 rounded-full border-2 border-white" />
                   ))}
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                   Join 10k+ <br/> active users
                </p>
             </div>
          </div>
        </div>
      </div>
      
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 -translate-y-[20%] translate-x-[20%] w-[800px] h-[800px] bg-slate-50 rounded-full -z-0 blur-3xl opacity-50"></div>
    </section>
  );
}
