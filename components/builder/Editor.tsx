'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Toolbox from './Toolbox';
import { Block, BlockType, LandingPage } from '@/types/lp';
import { saveLP } from '@/lib/data';
import { Plus } from 'lucide-react';

export default function Editor() {
  const [slug, setSlug] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeLP, setActiveLP] = useState<LandingPage | null>(null);

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
    const newSlug = 'akses-baru-' + Math.floor(Math.random() * 1000);
    setSlug(newSlug);
    setBlocks([
      {
        id: 'default-1',
        type: 'heading',
        data: { title: 'Selamat, Anda Sudah Punya Akses TEKOTOK', badge: 'center' }
      },
      {
        id: 'default-2',
        type: 'text_only',
        data: { subtitle: 'Semua sistem, tools, dan automasi siap Anda gunakan. Sekarang tinggal satu langkah lagi.', badge: 'center' }
      },
      {
        id: 'default-3',
        type: 'button_only',
        data: { ctaText: 'DOWNLOAD SEKARANG', ctaLink: '#', badge: 'center' }
      }
    ]);
    setActiveLP(null);
  };

  const handleSave = async () => {
    if (!slug) { setError('Slug wajib diisi!'); return; }
    setSaving(true);
    try {
      await saveLP(slug, { blocks });
    } catch (err: any) {
      setError(err.message);
    } finally {
       setSaving(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#f0f2f5] min-h-screen font-sans text-slate-900">
      {/* Top Header */}
      <header className="h-24 bg-white border-b border-slate-200 px-12 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Page Builder</h1>
          <p className="text-sm text-slate-500">Buat halaman akses custom — copy slug-nya ke field Access Link.</p>
        </div>
        <button 
          onClick={handleNewLP}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" /> Halaman Baru
        </button>
      </header>

      {/* Main Layout 3 Columns */}
      <main className="flex-1 flex p-8 gap-8 overflow-hidden">
        {/* Column 1: Halaman List */}
        <Sidebar onSelectLP={handleSelectLP} activeSlug={slug} />

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
