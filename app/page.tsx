import TemplateCard from '@/components/TemplateCard';
import { templates } from '@/lib/products';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-white">
      {/* Sidebar/Navigation Simulation */}
      <nav className="border-b border-slate-100 bg-white sticky top-0 z-10">
        <div className="container px-6 mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">W</div>
            <span className="font-bold text-slate-800 tracking-tight text-lg">Windre Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-none">Windre</p>
              <p className="text-[10px] text-slate-400 font-medium">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
          </div>
        </div>
      </nav>

      <div className="container px-6 mx-auto py-12 max-w-6xl">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">Production Mode</div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Landing Page Factory</h1>
            <p className="text-slate-500 max-w-md">Kelola dan gunakan template landing page profesional untuk produk digital Anda.</p>
          </div>
          <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all text-sm">
            + Tambah Template Baru
          </button>
        </header>

        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-xl font-bold text-slate-900">Base Templates</h2>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <TemplateCard key={template.slug} template={template} />
            ))}
          </div>
        </section>

        {/* Quick Tips */}
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1 text-v-4h1m-1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Panduan Penggunaan
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="text-sm text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-900 block mb-1">Preview Template</span>
              Klik pada gambar template untuk melihat tampilan penuh (preview) yang akan dilihat oleh pengunjung.
            </div>
            <div className="text-sm text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-900 block mb-1">Gunakan Template</span>
              Setiap template yang digunakan akan memiliki link unik berdasarkan slug yang didaftarkan di sistem.
            </div>
          </div>
        </div>
      </div>

      <footer className="py-12 border-t border-slate-50 mt-12 bg-white">
        <div className="container px-6 mx-auto text-center text-slate-400 text-[11px] font-bold uppercase tracking-widest">
          <p>© 2026 WINDRE DIGITAL SOLUTIONS • VERSION 2.1.0-PROD</p>
        </div>
      </footer>
    </main>
  );
}
