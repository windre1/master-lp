'use client';

import React, { useState } from 'react';
import { Layout } from "lucide-react";
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import { Block, BlockType, LandingPage } from '@/types/lp';
import { saveLP } from '@/lib/data';
import { Save, Eye, Check, Sparkles, LogOut } from 'lucide-react';

// DND Kit
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

export default function Editor() {
  const [slug, setSlug] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [error, setError] = useState('');
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);

    // Case 1: Dropping from Sidebar to Canvas
    if (active.data.current?.type === 'library' && over?.id === 'canvas-droppable') {
      const blockType = active.data.current.blockType as BlockType;
      const newBlock: Block = {
        id: Math.random().toString(36).substr(2, 9),
        type: blockType,
        data: {
          title: '',
          subtitle: '',
          ctaText: 'Mulai Sekarang',
          ctaLink: '#',
        }
      };
      setBlocks((prev) => [...prev, newBlock]);
      return;
    }

    // Case 2: Sorting within Canvas
    if (over && active.id !== over.id && active.data.current?.type !== 'library') {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over.id);
      setBlocks((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleUpdateBlock = (id: string, data: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, data } : b));
  };

  const handleRemoveBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const handleMoveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(b => b.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === blocks.length - 1)) return;
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const handleSelectLP = (lp: LandingPage) => {
    setSlug(lp.slug);
    setBlocks(lp.content.blocks || []);
  };

  const handleNewLP = () => {
    if (blocks.length > 0 && !confirm("Buat baru? Semua perubahan belum tersimpan akan hilang.")) return;
    setSlug('');
    setBlocks([
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'hero',
        data: {
          badge: '🔥 PERHATIAN UNTUK CREATOR YOUTUBE YANG SERIUS MAU GROW',
          title: 'Berhenti Kerja Keras. Mulailah Kerja Cerdas, Pakai SISTEM yang Terintegrasi dengan AI.',
          subtitle: 'Jika Anda masih sering merasa bimbang dalam menentukan konsep konten, melakukan proses unggah tanpa landasan strategi yang terukur, serta menghabiskan seluruh waktu untuk pekerjaan manual yang melelahkan... inilah saatnya mengenal Spartan Tube. Sebuah ekosistem pertumbuhan YouTube otomatis yang dirancang khusus untuk menyederhanakan, mengoptimalkan, dan mengintegrasikan seluruh alur kerja kreatif Anda secara elegan dengan dukungan kecerdasan buatan.',
          ctaText: 'BELI SEKARANG',
          ctaLink: '#pricing',
        }
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'problem',
        data: {
          title: '💥 MASALAH BESAR YANG TIDAK DISADARI CREATOR',
          subtitle: 'Kebanyakan creator gagal bukan karena tidak memiliki skill, melainkan karena tidak memiliki SISTEM yang mumpuni.',
          closing: 'Masalahnya bukan di kemampuan Anda…',
          highlinedClosing: 'Tapi di SISTEM yang Anda gunakan.'
        }
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'solution',
        data: {
          title: 'IDE → ANALISA → PRODUKSI → UPLOAD',
          subtitle: 'Bukan sekadar tools... Ini adalah mesin pertumbuhan channel YouTube dalam SATU dashboard.',
          image: '/assets/hero.png'
        }
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'demo',
        data: {
          title: 'SIMAK BAGAIMANA SPARTAN TUBE BEKERJA',
          videoUrl: 'https://www.youtube.com/watch?v=EEobrUpwnj4'
        }
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'features',
        data: {
          title: '⚔️ 12 SENJATA UTAMA SPARTAN TUBE',
          subtitle: 'Eksplorasi seluruh ekosistem pertumbuhan YouTube otomatis Anda.'
        }
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'comparison',
        data: {
          title: '⚡ SEMUA DALAM 1 SYSTEM'
        }
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'pricing',
        data: {
          title: '🚀 PILIH PAKET UNTUK MULAI GROW',
          subtitle: 'Miliki pusat komando YouTube Anda hari ini.'
        }
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'target',
        data: {
          title: '🔥 SIAPA YANG COCOK PAKAI SPARTAN TUBE?',
          subtitle: '👉 Bukan untuk semua orang. Tapi WAJIB untuk yang serius mau growth.'
        }
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'specs',
        data: {
          title: '💻 SPESIFIKASI DEVICE'
        }
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'disclaimer',
        data: {
          title: '⚠️ DISCLAIMER'
        }
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'cta',
        data: {
          title: 'Waktunya Scale Bisnis YouTube Anda.',
          subtitle: 'Mulai sekarang sebelum harga naik!',
          ctaText: 'MULAI SEKARANG',
          ctaLink: '#pricing'
        }
      }
    ]);
  };

  const handleSave = async (showNotify = true) => {
    if (!slug) { setError('Slug wajib diisi!'); return false; }
    setSaving(true);
    try {
      await saveLP(slug, { blocks });
      if (showNotify) { setJustSaved(true); setTimeout(() => setJustSaved(false), 3000); }
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally { setSaving(false); }
  };

  const handlePreview = async () => {
    if (await handleSave(false)) window.open(`/${slug}`, '_blank');
  };

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = '/login';
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex bg-[#050a15] h-screen overflow-hidden font-sans antialiased text-[#e2e8f0]">
        <Sidebar onSelectLP={handleSelectLP} onNewLP={handleNewLP} />
        
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <div className="h-20 bg-[#050a15]/80 backdrop-blur-xl border-b border-white/10 px-10 flex items-center justify-between z-10 shrink-0 shadow-[0_0_15px_rgba(0,242,255,0.1)]">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                 <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,242,255,0.4)]">
                    <Sparkles className="w-6 h-6 fill-white" />
                 </div>
                 <h1 className="font-black text-2xl tracking-tighter text-white uppercase italic">SPARTAN<span className="text-[#00f2ff]">FACTORY</span></h1>
              </div>
              {justSaved && (
                <span className="text-[10px] font-black text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full uppercase tracking-widest border border-cyan-400/20 flex items-center gap-2 animate-in fade-in zoom-in">
                  <Check className="w-3.5 h-3.5" /> SAVED
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-6">
               <button onClick={handleLogout} className="text-[10px] font-black text-slate-500 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Exit
               </button>
               <div className="flex items-center gap-3">
                 <button onClick={handlePreview} className="px-6 py-3 bg-transparent border-2 border-white/10 text-slate-300 font-black rounded-2xl hover:border-[#00f2ff] hover:text-[#00f2ff] transition-all text-[10px] uppercase tracking-widest flex items-center gap-2">
                   <Eye className="w-4 h-4" /> Preview
                 </button>
                 <button onClick={() => handleSave()} disabled={saving} className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black rounded-2xl shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center gap-3 disabled:opacity-50">
                   <Save className="w-4 h-4" /> {saving ? '...' : 'Publish'}
                 </button>
               </div>
            </div>
          </div>

          <Canvas 
            blocks={blocks} 
            onUpdateBlock={handleUpdateBlock} 
            onRemoveBlock={handleRemoveBlock} 
            onMoveBlock={handleMoveBlock}
            onSortBlocks={setBlocks}
            slug={slug}
            onUpdateSlug={setSlug}
          />
        </div>
      </div>

      <DragOverlay>
        {activeDragId && activeDragId.startsWith('library-') ? (
          <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-2xl opacity-90 scale-110 flex items-center gap-3 border-2 border-white/20">
             <Layout className="w-5 h-5" />
             <span className="font-black text-xs uppercase tracking-widest">{activeDragId.replace('library-', '')}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
