import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { templates } from '@/lib/products';
import CTA from '@/components/CTA';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = templates.find((t) => t.slug === slug);

  if (!template) {
    return {
      title: 'Template Not Found',
    };
  }

  return {
    title: `${template.title} | Preview Template`,
    description: template.description,
  };
}

export default async function DynamicLP({ params }: PageProps) {
  const { slug } = await params;
  const template = templates.find((t) => t.slug === slug);

  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Waduh! Produk Tidak Ditemukan</h1>
        <p className="text-slate-600 mb-8">Maaf, link yang kamu tuju sepertinya salah atau produk sudah tidak tersedia.</p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(template.price);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Product Hero Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src={template.image} 
                alt={template.title}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="flex flex-col">
              <nav className="mb-6 flex gap-2 text-sm font-medium text-slate-400">
                <Link href="/" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
                <span>/</span>
                <span className="text-slate-900">{template.title}</span>
              </nav>

              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                {template.title}
              </h1>
              
              <div className="mb-8">
                <span className="text-3xl font-bold text-indigo-600">{formattedPrice}</span>
                <span className="ml-2 text-slate-400 line-through text-lg">
                   {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(template.price * 1.5)}
                </span>
              </div>

              <p className="mb-10 text-xl leading-relaxed text-slate-600">
                {template.description}
              </p>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-10">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Stok Terbatas (Sisa 5 lagi!)
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Pengiriman Seluruh Indonesia
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Bisa Bayar di Tempat (COD)
                  </li>
                </ul>
              </div>

              <button className="w-full py-5 text-xl font-bold text-white transition-all bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-2xl active:scale-[0.98]">
                BELI SEKARANG JUGA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-12">Kenapa Kamu Harus Punya?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { t: 'Kualitas Premium', d: 'Bahan pilihan terbaik yang awet dan tahan lama.' },
              { t: 'Desain Modern', d: 'Tampil percaya diri dengan tren gaya terbaru.' },
              { t: 'Harga Terbaik', d: 'Kualitas bintang lima dengan harga sangat terjangkau.' }
            ].map((f, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-lg mb-2">{f.t}</h3>
                <p className="text-slate-500 text-sm">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA 
        title={`Penawaran Spesial ${template.title}`}
        description="Dapatkan diskon khusus hanya untuk pembelian hari ini. Jangan lewatkan kesempatan langka ini sebelum kehabisan stok!"
        buttonText="Dapatkan Sekarang"
        buttonLink="#"
      />

      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="container px-4 mx-auto text-center">
          <p>© 2026 {template.title} Official Store.</p>
        </div>
      </footer>
    </main>
  );
}
