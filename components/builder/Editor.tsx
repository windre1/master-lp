'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Toolbox from './Toolbox';
import { Block, BlockType, LandingPage } from '@/types/lp';
import { saveLP, deleteLP } from '@/lib/data';
import { Plus, LogOut } from 'lucide-react';

export default function Editor() {
  const [slug, setSlug] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeLP, setActiveLP] = useState<LandingPage | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');

  const handleUpdateBlock = (id: string, data: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, data } : b));
  };

  const handleRemoveBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const handleAddBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: {
        title: type === 'heading' ? 'Baru' : '',
        subtitle: type === 'text_only' ? 'Isi teks di sini...' : '',
        ctaText: type === 'cta' || type === 'button_only' ? 'Tombol' : '',
        ctaLink: '#',
      }
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleSelectLP = (lp: LandingPage) => {
    setActiveLP(lp);
    setSlug(lp.slug);
    setBlocks(lp.content.blocks || []);
  };

  const confirmNewPage = async () => {
    if (!newSlug) return;
    setSaving(true);
    const initialBlocks = [
      {
        id: 'default-1',
        type: 'heading',
        data: { title: newTitle || 'Halaman Baru', badge: 'center' }
      },
      {
        id: 'default-2',
        type: 'text_only',
        data: { subtitle: 'Mulailah membangun halaman impian Anda dengan elemen di sebelah kanan.', badge: 'center' }
      }
    ];
    try {
      await saveLP(newSlug, { blocks: initialBlocks });
      setSlug(newSlug);
      setBlocks(initialBlocks);
      setShowModal(false);
      setNewTitle('');
      setNewSlug('');
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!slug) { setError('Slug wajib diisi!'); return; }
    setSaving(true);
    try {
      await saveLP(slug, { blocks });
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      setError(err.message);
    } finally {
       setSaving(false);
    }
  };

  const handleDeleteLP = async (targetSlug: string) => {
    if (!confirm(`Hapus landing page "${targetSlug}"?`)) return;
    try {
      await deleteLP(targetSlug);
      if (slug === targetSlug) {
        setSlug('');
        setBlocks([]);
      }
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col bg-white min-h-screen font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Top Header */}
      <header className="h-24 bg-white border-b border-slate-100 px-12 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Landing Page <span className="text-blue-600">Builder</span></h1>
        </div>
        
        <div className="flex items-center gap-6">
           <button 
             onClick={handleLogout}
             className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-[0.2em] transition-all flex items-center gap-2"
           >
             <LogOut className="w-4 h-4" /> Keluar
           </button>
           
           <button 
             onClick={() => setShowModal(true)}
             className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 uppercase tracking-widest text-[10px]"
           >
             <Plus className="w-4 h-4" /> Halaman Baru
           </button>
        </div>
      </header>

      {/* Main Layout 3 Columns */}
      <main className="flex-1 flex p-8 gap-10 overflow-hidden bg-slate-50/30">
        {/* Column 1: Halaman List */}
        <Sidebar 
          onSelectLP={handleSelectLP} 
          activeSlug={slug} 
          key={refreshKey} 
          onDeleteLP={handleDeleteLP}
        />

        {/* Column 2: Editor Canvas */}
        <Canvas 
          blocks={blocks} 
          onUpdateBlock={handleUpdateBlock} 
          onRemoveBlock={handleRemoveBlock} 
          onSortBlocks={setBlocks}
          slug={slug}
          onUpdateSlug={setSlug}
          onSave={handleSave}
          saving={saving}
        />

        {/* Column 3: Toolbox & Preview */}
        <Toolbox onAddBlock={handleAddBlock} blocks={blocks} />
      </main>

      {/* Pop Up Modal Buat Halaman Baru */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="p-10 pb-6 flex items-center justify-between">
                 <h2 className="text-xl font-bold text-slate-800">Buat Halaman Baru</h2>
                 <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>
              
              <div className="px-10 py-6 space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">JUDUL HALAMAN</label>
                    <input 
                      type="text" 
                      placeholder="cth: Panduan Spartan Tube" 
                      value={newTitle}
                      onChange={(e) => {
                        setNewTitle(e.target.value);
                        if (!newSlug) setNewSlug(e.target.value.toLowerCase().replace(/ /g, '-'));
                      }}
                      className="w-full bg-slate-50 border border-slate-200 p-5 rounded-2xl outline-none focus:border-slate-900 transition-all font-medium text-slate-600 placeholder:text-slate-300"
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SLUG URL</label>
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-5 py-5 rounded-2xl focus-within:border-slate-900 transition-all">
                       <span className="text-slate-400 font-medium">/akses/</span>
                       <input 
                         type="text" 
                         placeholder="panduan-spartan-tube" 
                         value={newSlug}
                         onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/ /g, '-'))}
                         className="bg-transparent outline-none flex-1 font-medium text-slate-600 placeholder:text-slate-300" 
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DESKRIPSI (OPSIONAL)</label>
                    <input 
                      type="text" 
                      placeholder="Keterangan singkat" 
                      className="w-full bg-slate-50 border border-slate-200 p-5 rounded-2xl outline-none focus:border-slate-900 transition-all font-medium text-slate-600 placeholder:text-slate-300" 
                    />
                 </div>
              </div>

              <div className="p-10 pt-4 flex gap-4">
                 <button 
                   onClick={() => setShowModal(false)}
                   className="flex-1 py-5 border border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                 >
                   Batal
                 </button>
                 <button 
                   onClick={confirmNewPage}
                   disabled={!newSlug || saving}
                   className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl shadow-slate-200"
                 >
                   {saving ? '...' : 'Buat Halaman'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
