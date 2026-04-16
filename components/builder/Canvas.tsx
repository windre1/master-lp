'use client';

import React, { useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Block } from '@/types/lp';
import { ExternalLink, Sparkles, Layout } from 'lucide-react';
import { uploadImage } from '@/lib/data';
import { SortableBlock } from './SortableBlock';

interface CanvasProps {
  blocks: Block[];
  onUpdateBlock: (id: string, data: any) => void;
  onRemoveBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  onSortBlocks: (newBlocks: Block[]) => void;
  slug: string;
  onUpdateSlug: (slug: string) => void;
}

export default function Canvas({ 
  blocks, onUpdateBlock, onRemoveBlock, onMoveBlock, slug, onUpdateSlug 
}: CanvasProps) {
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeBlockId = useRef<string | null>(null);

  // Droppable area for library items
  const { setNodeRef: setCanvasRef, isOver } = useDroppable({
    id: 'canvas-droppable',
  });

  const handleImageClick = (blockId: string) => {
    activeBlockId.current = blockId;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeBlockId.current) return;
    try {
      const imageUrl = await uploadImage(file);
      onUpdateBlock(activeBlockId.current, { 
        ...blocks.find(b => b.id === activeBlockId.current)?.data, 
        image: imageUrl 
      });
    } catch (err) {
      alert("Gagal upload gambar.");
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-[#050a15] p-6 md:p-12 pb-40 overflow-y-auto scroll-smooth">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* URL Header */}
        <div className="bg-[#0a1128]/60 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white/5 flex flex-col md:flex-row items-center gap-10">
           <div className="flex-1 w-full flex items-center gap-8">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                <Layout className="w-7 h-7" />
              </div>
              <div className="flex-1">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Landing Page Slug</label>
                 <div className="flex items-center gap-3 bg-black/20 px-6 py-4 rounded-2xl border-2 border-white/5 focus-within:border-[#00f2ff] focus-within:bg-black/40 transition-all">
                   <span className="text-[#00f2ff] font-black text-xl italic">/</span>
                   <input 
                     type="text" 
                     value={slug}
                     onChange={(e) => onUpdateSlug(e.target.value.toLowerCase().replace(/ /g, '-'))}
                     placeholder="nama-halaman-anda"
                     className="bg-transparent outline-none flex-1 font-black text-white text-xl placeholder:text-slate-700 uppercase italic tracking-tight"
                   />
                 </div>
              </div>
           </div>
           <a href={slug ? `/${slug}` : '#'} target="_blank" className={`px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${slug ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_10px_20px_rgba(0,242,255,0.2)] hover:scale-105 active:scale-95' : 'bg-white/5 text-slate-700'}`}>
             Preview <ExternalLink className="w-4 h-4" />
           </a>
        </div>

        {/* Builder Container (Droppable) */}
        <div 
          ref={setCanvasRef}
          className={`min-h-[700px] rounded-[4rem] transition-all p-6 border-2 border-dashed ${isOver ? 'bg-[#00f2ff]/5 border-[#00f2ff] shadow-[0_0_30px_rgba(0,242,255,0.1)]' : 'border-white/5 hover:border-white/10'}`}
        >
          <SortableContext 
            items={blocks.map(b => b.id)}
            strategy={verticalListSortingStrategy}
          >
            {blocks.length === 0 ? (
              <div className="py-60 flex flex-col items-center justify-center text-center">
                 <div className="w-28 h-28 bg-white/5 rounded-[2.5rem] shadow-2xl flex items-center justify-center mb-10 border border-white/10 rotate-12 group hover:rotate-0 transition-transform duration-500">
                    <Sparkles className="w-12 h-12 text-[#00f2ff] animate-pulse" />
                 </div>
                 <h3 className="text-3xl font-black text-white mb-3 uppercase italic">Canvas Kosong</h3>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Tarik block dari kiri ke sini</p>
              </div>
            ) : (
              <div className="space-y-8">
                {blocks.map((block, index) => (
                  <SortableBlock 
                    key={block.id}
                    id={block.id}
                    block={block}
                    index={index}
                    onUpdateBlock={onUpdateBlock}
                    onRemoveBlock={onRemoveBlock}
                    onMoveBlock={onMoveBlock}
                    onImageClick={handleImageClick}
                  />
                ))}
              </div>
            )}
          </SortableContext>
        </div>
      </div>
    </div>
  );
}
