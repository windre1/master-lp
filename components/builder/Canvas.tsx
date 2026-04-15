'use client';

import React, { useRef } from 'react';
import { Block } from '@/types/lp';
import { Layout, ExternalLink, Sparkles } from 'lucide-react';
import { uploadImage } from '@/lib/data';

// DND Kit
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
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
  blocks, onUpdateBlock, onRemoveBlock, onMoveBlock, onSortBlocks, slug, onUpdateSlug 
}: CanvasProps) {
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeBlockId = useRef<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Allows clicking buttons without starting drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over?.id);
      onSortBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  };

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
        {/* URL Management Page */}
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-indigo-100/20 border border-slate-100 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-100/50 transition-colors"></div>
           
           <div className="flex-1 w-full order-2 md:order-1">
              <div className="flex items-center gap-2 mb-3">
                 <Sparkles className="w-4 h-4 text-indigo-500 fill-indigo-500" />
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Link Management</label>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 px-6 py-5 rounded-2xl border-2 border-slate-100 focus-within:border-indigo-600 focus-within:bg-white transition-all">
                <span className="text-slate-300 font-black text-xl">/</span>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => onUpdateSlug(e.target.value.toLowerCase().replace(/ /g, '-'))}
                  placeholder="marketing-funnel-slug"
                  className="bg-transparent outline-none flex-1 font-black text-slate-900 text-xl placeholder:text-slate-200"
                />
              </div>
           </div>
           
           <div className="shrink-0 order-1 md:order-2 w-full md:w-auto">
             <a 
               href={slug ? `/${slug}` : '#'} 
               target="_blank" 
               className={`w-full md:w-auto px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${slug ? 'bg-slate-900 text-white shadow-3xl shadow-slate-300 hover:scale-105 active:scale-95' : 'bg-slate-100 text-slate-300'}`}
             >
               Live Preview <ExternalLink className="w-4 h-4" />
             </a>
           </div>
        </div>

        {/* Builder Area */}
        <div className="space-y-8">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={blocks.map(b => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {blocks.length === 0 ? (
                <div className="py-48 border-4 border-dashed border-slate-100 rounded-[4rem] text-center flex flex-col items-center justify-center bg-white/40 backdrop-blur-md">
                   <div className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center text-slate-200 mb-10 border border-slate-50 rotate-3 font-black text-4xl">?</div>
                   <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter">Mulai Rakit Landing Page Anda</h3>
                   <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Pilih element dari sidebar</p>
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
          </DndContext>
        </div>
      </div>
    </div>
  );
}
