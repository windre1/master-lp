'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTemplateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Digital Product',
    description: '',
    price: 0,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan');

      setIsOpen(false);
      router.refresh();
      setFormData({ title: '', slug: '', category: 'Digital Product', description: '', price: 0, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all text-sm"
      >
        + Tambah Template Baru
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Buat Template Baru</h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
                  {error}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Template</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-indigo-600 text-sm text-slate-900"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Slug (URL)</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-indigo-600 text-sm text-slate-900"
                    placeholder="misal: tools-seo"
                    value={formData.slug}
                    onChange={e => setFormData({...formData, slug: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori</label>
                <select 
                  className="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-indigo-600 text-sm text-slate-900"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option>Tools & Software</option>
                  <option>E-Course & Kelas</option>
                  <option>Jasa & Agency</option>
                  <option>Digital Product</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deskripsi Singkat</label>
                <textarea 
                  required rows={3}
                  className="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-indigo-600 text-sm text-slate-900"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Harga (IDR)</label>
                  <input 
                    type="number" required
                    className="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-indigo-600 text-sm text-slate-900"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">URL Gambar</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-indigo-600 text-sm text-slate-900"
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 mt-4"
              >
                {loading ? 'Menyimpan...' : 'Simpan & Publikasikan'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
