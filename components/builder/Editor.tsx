'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import { Block, BlockType, LandingPage } from '@/types/lp';
import { saveLP } from '@/lib/data';
import { Save, Eye, Check, Sparkles, LogOut } from 'lucide-react';

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

  const sortBlocks = (newBlocks: Block[]) => {
    setBlocks(newBlocks);
  };

  const handleSelectLP = (lp: LandingPage) => {
    setSlug(lp.slug);
    setBlocks(lp.content.blocks || []);
  };

  const handleNewLP = () => {
    if (blocks.length > 0 && !confirm("Buat project baru? Pastikan project saat ini sudah disimpan.")) return;
    setSlug('');
    setBlocks([]);
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
    <div className="flex bg-white h-screen overflow-hidden font-sans antialiased text-slate-900">
      <Sidebar 
        onAddBlock={addBlock} 
        onSelectLP={handleSelectLP} 
        onNewLP={handleNewLP} 
      />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Superior Top Bar */}
        <div className="h-20 bg-white border-b border-slate-100 px-10 flex items-center justify-between z-10 shrink-0 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
               <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                  <Sparkles className="w-5 h-5 fill-white" />
               </div>
               <h1 className="font-black text-2xl tracking-tighter text-slate-900">FACTORY <span className="text-indigo-600">EDITOR</span></h1>
            </div>
            {error && <span className="text-[10px] font-black text-red-500 bg-red-50 px-4 py-1.5 rounded-full uppercase tracking-widest border border-red-100">{error}</span>}
            {justSaved && (
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100 flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                <Check className="w-3.5 h-3.5" /> CHANGES SAVED
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-6">
             <button onClick={handleLogout} className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Exit
             </button>

             <div className="h-8 w-px bg-slate-100"></div>

             <div className="flex items-center gap-3">
               <button 
                 onClick={handlePreview}
                 className="px-6 py-3 bg-white border-2 border-slate-100 text-slate-600 font-black rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all text-[10px] uppercase tracking-widest flex items-center gap-2 active:scale-95"
               >
                 <Eye className="w-4 h-4" /> Preview
               </button>

               <button 
                 onClick={() => handleSave()}
                 disabled={saving}
                 className="px-10 py-3.5 bg-indigo-600 text-white font-black rounded-2xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center gap-3 disabled:opacity-50"
               >
                 <Save className="w-4 h-4" /> {saving ? 'Publising...' : 'Simpan & Publish'}
               </button>
             </div>
          </div>
        </div>

        <Canvas 
          blocks={blocks} 
          onUpdateBlock={updateBlock} 
          onRemoveBlock={removeBlock} 
          onMoveBlock={moveBlock}
          onSortBlocks={sortBlocks}
          slug={slug}
          onUpdateSlug={setSlug}
        />
      </div>
    </div>
  );
}
