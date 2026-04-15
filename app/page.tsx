'use client';

import { useState, useEffect } from 'react';
import TemplateCard from '@/components/TemplateCard';
import TemplateModal from '@/components/TemplateModal';
import { Template } from '@/lib/products';

export default function Dashboard() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTemplates = async () => {
    setLoading(true);
    const res = await fetch('/api/templates');
    const data = await res.json();
    setTemplates(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingTemplate(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchTemplates(); // Refresh after save
  };

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = '/login';
  };

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white sticky top-0 z-20 shadow-sm">
        <div className="container px-6 mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-indigo-100">W</div>
            <div>
              <span className="block font-black text-slate-900 tracking-tighter text-xl leading-none">WINDRE DATA</span>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">LP Factory System</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:block text-right">
                <p className="text-sm font-black text-slate-800 leading-none mb-1">Administrator Privileges</p>
                <div className="flex items-center justify-end gap-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Online</span>
                </div>
             </div>
             <div className="h-10 w-px bg-slate-100"></div>
             
             <button 
               onClick={handleLogout}
               className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100"
             >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Keluar
             </button>

             <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">W</div>
          </div>
        </div>
      </nav>

      <div className="container px-6 mx-auto py-12 max-w-7xl">
        <header className="mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">
               Manajemen Landing Page <span className="text-indigo-600">Terpusat.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Kustomisasi konten, ubah harga, dan perbarui visual landing page Anda secara langsung tanpa menyentuh kode.
            </p>
          </div>
          
          <button 
            onClick={handleCreate}
            className="group px-8 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center gap-3"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Buat Landing Page Baru
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
             <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mengambil Data Anda...</span>
          </div>
        ) : (
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Daftar Landing Page Aktif</h2>
              <div className="h-px flex-1 bg-slate-200"></div>
              <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-sm text-[10px] font-black text-slate-500">{templates.length} PAGES</div>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <TemplateCard key={template.slug} template={template} onEdit={handleEdit} />
              ))}
            </div>
          </section>
        )}

        {/* System Logs / Info */}
        <div className="grid gap-8 md:grid-cols-3">
           <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </div>
              <h4 className="font-black text-slate-800 mb-3 tracking-tight">Editor Visual</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Klik "Edit Content" pada kartu template untuk mengubah seluruh elemen marketing page secara instan.</p>
           </div>
           
           <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h4 className="font-black text-slate-800 mb-3 tracking-tight">Auto-Deployment</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Setiap perubahan yang Anda simpan akan otomatis melakukan sinkronisasi dengan sistem distribusi utama.</p>
           </div>

           <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              </div>
              <h4 className="font-black text-slate-800 mb-3 tracking-tight">Static Generation</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Halaman landing page dioptimalkan untuk kecepatan loading maksimal untuk meningkatkan konversi iklan Anda.</p>
           </div>
        </div>
      </div>

      <TemplateModal isOpen={isModalOpen} onClose={handleCloseModal} editData={editingTemplate} />

      <footer className="py-20 border-t border-slate-100 mt-24 bg-white">
        <div className="container px-6 mx-auto text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 text-center">Built for Professional Advertising</p>
          <p className="text-sm font-bold text-slate-800">WINDRE DIGITAL SOLUTIONS &copy; 2026. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </main>
  );
}
