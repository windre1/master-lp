'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Toolbox from './Toolbox';
import { Block, BlockType, LandingPage } from '@/types/lp';
import { saveLP, deleteLP } from '@/lib/data';
import { Plus } from 'lucide-react';

export default function Editor() {
  const [slug, setSlug] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeLP, setActiveLP] = useState<LandingPage | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

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

  const handleNewLP = () => {
    const newSlug = 'halaman-baru-' + Math.floor(Math.random() * 1000);
    setSlug(newSlug);
    setBlocks([
      {
        id: 'default-1',
        type: 'heading',
        data: { title: 'Selamat Datang di Landing Page Baru', badge: 'center' }
      },
      {
        id: 'default-2',
        type: 'text_only',
        data: { subtitle: 'Mulailah membangun halaman impian Anda dengan elemen di sebelah kanan.', badge: 'center' }
      },
      {
        id: 'default-3',
        type: 'button_only',
        data: { ctaText: 'MULAI SEKARANG', ctaLink: '#', badge: 'center' }
      }
    ]);
    setActiveLP(null);
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

  return (
    <div className="flex flex-col bg-white min-h-screen font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Top Header */}
      <header className="h-24 bg-white border-b border-slate-100 px-12 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Landing Page <span className="text-blue-600">Builder</span></h1>
        </div>
        <button 
          onClick={handleNewLP}
          className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 uppercase tracking-widest text-[10px]"
        >
          <Plus className="w-4 h-4" /> Halaman Baru
        </button>
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
    </div>
  );
}
