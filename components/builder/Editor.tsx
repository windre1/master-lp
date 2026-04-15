'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import { Block, BlockType } from '@/types/lp';
import { saveLP } from '@/lib/data';
import { Save, LogOut, Eye, Check } from 'lucide-react';

export default function Editor() {
  const [slug, setSlug] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [error, setError] = useState('');

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

  const handleSave = async (showNotification = true) => {
    if (!slug) {
      setError('Slug wajib diisi!');
      return false;
    }
    setSaving(true);
    setError('');
    try {
      await saveLP(slug, { blocks });
      if (showNotification) {
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 3000);
      }
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = async () => {
    const success = await handleSave(false);
    if (success) {
      window.open(`/${slug}`, '_blank');
    }
  };

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = '/login';
  };

  return (
    <div className="flex bg-white h-screen overflow-hidden font-sans">
      <Sidebar onAddBlock={addBlock} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header Toolbar */}
        <div className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="font-black text-2xl tracking-tighter text-slate-900 italic">LP BUILDER <span className="text-indigo-600 font-mono">2.0</span></h1>
            {error && <span className="text-[10px] font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full uppercase tracking-widest border border-red-100">{error}</span>}
            {justSaved && (
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5 animate-in fade-in zoom-in duration-300">
                <Check className="w-3 h-3" /> Berhasil Disimpan
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
             <button 
               onClick={handleLogout}
               className="p-2 text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
             >
                Keluar
             </button>
             
             <div className="w-px h-6 bg-slate-100"></div>

             <button 
               onClick={handlePreview}
               className="px-6 py-2.5 bg-slate-100 text-slate-600 font-black rounded-xl hover:bg-slate-200 transition-all text-[10px] uppercase tracking-widest flex items-center gap-2"
             >
               <Eye className="w-4 h-4" /> Preview
             </button>

             <button 
               onClick={() => handleSave()}
               disabled={saving}
               className="px-8 py-2.5 bg-indigo-600 text-white font-black rounded-xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all text-[10px] uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
             >
               <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Simpan'}
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
