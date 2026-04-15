import Link from 'next/link';
import Hero from '@/components/Hero';
import CTA from '@/components/CTA';

export default function MainLP() {
  return (
    <main className="min-h-screen bg-white">
      <Hero 
        title="Template Landing Page Profesional"
        subtitle="Optimalkan konversi penjualan Anda dengan landing page yang responsif dan menarik. Siap pakai untuk berbagai produk."
        ctaText="Mulai Sekarang"
        ctaLink="/"
      />

      <section className="py-20">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="space-y-12">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Kenapa Memilih Kami?</h2>
                <p className="text-slate-600 leading-relaxed">
                  Kami menyediakan infrastruktur landing page yang super cepat dan mudah digunakan. 
                  Anda tidak perlu pusing memikirkan coding, cukup fokus pada penjualan produk Anda.
                </p>
              </div>
              <div className="bg-indigo-50 rounded-2xl aspect-video flex items-center justify-center border-2 border-dashed border-indigo-200">
                <span className="text-indigo-400 font-medium">Preview Image</span>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 items-center md:flex-row-reverse">
              <div className="md:order-2">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Siap Tayang dalam Menit</h2>
                <p className="text-slate-600 leading-relaxed">
                  Dengan sistem dynamic routes kami, landing page produk Anda langsung aktif seketika setelah data dimasukkan ke sistem.
                </p>
              </div>
              <div className="bg-indigo-50 rounded-2xl aspect-video flex items-center justify-center border-2 border-dashed border-indigo-200 md:order-1">
                <span className="text-indigo-400 font-medium">Quick Deploy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA 
        title="Siap Melejitkan Penjualan Anda?"
        description="Pilih template terbaik dan mulai buat landing page produk Anda hari ini juga. Proses mudah, hasil maksimal."
        buttonText="Lihat Koleksi Produk"
        buttonLink="/"
      />

      <footer className="py-12 border-t border-slate-100 bg-slate-50">
        <div className="container px-4 mx-auto text-center text-slate-500 text-sm">
          <nav className="mb-6 flex justify-center gap-6">
            <Link href="/" className="hover:text-indigo-600">Home</Link>
            <Link href="/lp" className="hover:text-indigo-600">Templates</Link>
          </nav>
          <p>© 2026 LP Factory Template System.</p>
        </div>
      </footer>
    </main>
  );
}
