import TemplateCard from '@/components/TemplateCard';
import { templates } from '@/lib/products';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-white">
      {/* Sidebar/Navigation Simulation */}
      <nav className="border-b border-slate-100 bg-white sticky top-0 z-10">
        <div className="container px-6 mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
            <span className="font-bold text-slate-900">LP Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">Hello, Admin</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200"></div>
          </div>
        </div>
      </nav>

      <div className="container px-6 mx-auto py-10">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Builder</h1>
          <p className="text-slate-500">Pilih salah satu template di bawah untuk mulai membuat landing page baru.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {[
            { label: 'Total LP', value: '12', color: 'text-indigo-600' },
            { label: 'Active Pages', value: '8', color: 'text-emerald-600' },
            { label: 'Total Views', value: '1.2k', color: 'text-blue-600' },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">Template Gallery</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg">All Products</button>
              <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 rounded-lg">Tools</button>
              <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 rounded-lg">E-Course</button>
              <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 rounded-lg">Services</button>
            </div>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <TemplateCard key={template.slug} template={template} />
            ))}
          </div>
        </section>
      </div>

      <footer className="py-10 border-t border-slate-50 mt-20">
        <div className="container px-6 mx-auto text-center text-slate-400 text-sm">
          <p>© 2026 Admin Landing Page Factory v2.0</p>
        </div>
      </footer>
    </main>
  );
}
