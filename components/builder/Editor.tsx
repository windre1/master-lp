'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import { Block, BlockType, LandingPage } from '@/types/lp';
import { saveLP } from '@/lib/data';
import { Save, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Editor() {
  const [slug, setSlug] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: {
        title: '',
        subtitle: '',
        ctaText: 'Mulai Sekarang',
        ctaLink: '#',
      }
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, data: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, data } : b));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(b => b.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === blocks.length - 1)) return;
    
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const handleSave = async () => {
    if (!slug) {
      setError('Slug wajib diisi!');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await saveLP(slug, { blocks });
      alert('Landing Page Berhasil Disimpan!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = '/login';
  };

  return (
    <div className="flex bg-white h-screen overflow-hidden">
      <Sidebar onAddBlock={addBlock} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header Toolbar */}
        <div className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <h1 className="font-black text-2xl tracking-tighter text-slate-900 italic">LP BUILDER <span className="text-indigo-600">PRO</span></h1>
            {error && <span className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full">{error}</span>}
          </div>
          
          <div className="flex items-center gap-3">
             <button 
               onClick={handleLogout}
               className="px-4 py-2 text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
             >
               <LogOut className="w-4 h-4" /> Keluar
             </button>
             <button 
               onClick={handleSave}
               disabled={saving}
               className="px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
             >
               <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Simpan LP'}
             </button>
          </div>
        </div>

        <Canvas 
          blocks={blocks} 
          onUpdateBlock={updateBlock} 
          onRemoveBlock={removeBlock} 
          onMoveBlock={moveBlock}
          slug={slug}
          onUpdateSlug={setSlug}
        />
      </div>
    </div>
  );
}
