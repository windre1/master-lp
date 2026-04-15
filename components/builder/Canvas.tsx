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
    <div className="flex-1 min-h-screen bg-slate-50/50 p-6 md:p-12 pb-40 overflow-y-auto scroll-smooth">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

      <div className="max-w-4xl mx-auto space-y-10">
        {/* URL Header */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-100/20 border border-slate-100 flex flex-col md:flex-row items-center gap-10">
           <div className="flex-1 w-full flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                <Layout className="w-6 h-6" />
              </div>
              <div className="flex-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Published Slug</label>
                 <div className="flex items-center gap-2 bg-slate-50 px-5 py-3 rounded-xl border-2 border-slate-100 focus-within:border-indigo-600 focus-within:bg-white transition-all">
                   <span className="text-slate-300 font-black text-lg">/</span>
                   <input 
                     type="text" 
                     value={slug}
                     onChange={(e) => onUpdateSlug(e.target.value.toLowerCase().replace(/ /g, '-'))}
                     placeholder="landing-page-name"
                     className="bg-transparent outline-none flex-1 font-black text-slate-800 text-lg"
                   />
                 </div>
              </div>
           </div>
           <a href={slug ? `/${slug}` : '#'} target="_blank" className={`px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${slug ? 'bg-slate-900 text-white shadow-xl hover:scale-105 active:scale-95' : 'bg-slate-100 text-slate-300'}`}>
             Preview <ExternalLink className="w-4 h-4" />
           </a>
        </div>

        {/* Builder Container (Droppable) */}
        <div 
          ref={setCanvasRef}
          className={`min-h-[600px] rounded-[3.5rem] transition-all p-4 ${isOver ? 'bg-indigo-50/50 ring-4 ring-indigo-600 ring-dashed shadow-inner' : ''}`}
        >
          <SortableContext 
            items={blocks.map(b => b.id)}
            strategy={verticalListSortingStrategy}
          >
            {blocks.length === 0 ? (
              <div className="py-48 flex flex-col items-center justify-center text-center opacity-40">
                 <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-8 border border-slate-50 rotate-6 border-dashed">
                    <Sparkles className="w-10 h-10 text-slate-200" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 mb-2">Drag Block Ke Sini</h3>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em]">Mulai Rakit Landing Page Anda</p>
              </div>
            ) : (
              <div className="space-y-6">
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
