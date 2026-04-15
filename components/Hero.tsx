import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function Hero({ title, subtitle, ctaText = "Lihat Produk", ctaLink = "#products" }: HeroProps) {
  return (
    <section className="relative py-20 overflow-hidden bg-slate-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
            {title}
          </h1>
          <p className="mb-10 text-xl text-slate-600">
            {subtitle}
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href={ctaLink}
              className="px-8 py-4 text-white transition-all bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-lg active:scale-95"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
    </section>
  );
}
