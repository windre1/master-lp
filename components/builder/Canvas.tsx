'use client';

import React, { useState } from 'react';
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
  SortableContext, 
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates 
} from '@dnd-kit/sortable';
import { Block, BlockType } from '@/types/lp';
import { SortableBlock } from './SortableBlock';
import { ExternalLink, Link2, Save, Plus, Layout, AlignLeft, Play, Layers, Zap } from 'lucide-react';

interface CanvasProps {
  blocks: Block[];
  onUpdateBlock: (id: string, data: any) => void;
  onRemoveBlock: (id: string) => void;
  onSortBlocks: (newBlocks: Block[]) => void;
  slug: string;
  onUpdateSlug: (slug: string) => void;
  onSave: () => void;
  saving: boolean;
  onAddBlock: (type: BlockType, index?: number) => void;
}

export default function Canvas({ 
  blocks, onUpdateBlock, onRemoveBlock, onSortBlocks, slug, onUpdateSlug, onSave, saving, onAddBlock 
}: CanvasProps) {
  const [showInsertion, setShowInsertion] = useState<number | null>(null);

  const library = [
    { type: 'hero', label: 'Hero', icon: Zap },
    { type: 'heading', label: 'Judul', icon: Layout },
    { type: 'text_only', label: 'Teks Paragraf', icon: AlignLeft },
    { type: 'image_only', label: 'Gambar', icon: Layout },
    { type: 'video_only', label: 'Video YouTube', icon: Play },
    { type: 'price_list', label: 'Price List', icon: Layers },
    { type: 'button_only', label: 'Tombol CTA', icon: Zap },
  ];
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over.id);
      onSortBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${slug}`);
    alert('Link disalin!');
  };

  const renderAddButton = (index: number) => (
    <div className="relative h-6 group/insert z-10 -my-3">
       <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center opacity-0 group-hover/insert:opacity-100 transition-all">
          <div className="relative">
            <button 
              onClick={() => setShowInsertion(showInsertion === index ? null : index)}
              className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
            >
               <Plus className="w-4 h-4" />
            </button>

            {showInsertion === index && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 grid grid-cols-2 gap-1 z-50 min-w-[280px] animate-in fade-in zoom-in-95 duration-200">
                 {library.map((lib) => (
                   <button 
                    key={lib.type}
                    onClick={() => {
                      onAddBlock(lib.type as BlockType, index);
                      setShowInsertion(null);
                    }}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-xl transition-all text-left"
                   >
                     <lib.icon className="w-3.5 h-3.5 text-slate-400" />
                     <span className="text-[10px] font-black text-slate-600 uppercase tracking-tight">{lib.label}</span>
                   </button>
                 ))}
                 <button 
                   onClick={() => setShowInsertion(null)}
                   className="col-span-2 text-[8px] font-black text-slate-300 uppercase py-1 hover:text-slate-500"
                 >
                   Batal
                 </button>
              </div>
            )}
          </div>
       </div>
       <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-blue-200 opacity-0 group-hover/insert:opacity-100 transition-all mx-10"></div>
    </div>
  );

  return (
    <div className="flex-1 bg-white rounded-[2rem] border border-slate-200 overflow-hidden flex flex-col shadow-sm relative">
      {/* Page Header - Sticky */}
      <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Halaman Baru'}</h2>
          <div className="text-xs text-slate-400 mt-1">/{slug || '...'}</div>
        </div>
        
        <div className="flex items-center gap-2">
           <button 
             onClick={() => window.open(`/${slug}`, '_blank')}
             className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
           >
             <ExternalLink className="w-4 h-4" /> Preview
           </button>
           <button 
             onClick={handleCopy}
             className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
           >
             <Link2 className="w-4 h-4" /> Salin Link
           </button>
           <button 
             onClick={onSave}
             disabled={saving}
             className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 disabled:opacity-50 transition-all shadow-lg"
           >
             <Save className="w-4 h-4" /> {saving ? '...' : 'Simpan'}
           </button>
        </div>
      </div>

      {/* Editor Cards Area - Scrollable */}
      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-8 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <div className="max-w-xl mx-auto py-10">
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
                <div className="py-40 text-center flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem]">
                   <p className="text-slate-400 font-bold text-sm">Halaman Kosong</p>
                   <p className="text-xs text-slate-400 mt-2">Tambah elemen dari kolom kanan</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {blocks.map((block, index) => (
                    <React.Fragment key={block.id}>
                      {renderAddButton(index)}
                      <SortableBlock 
                        id={block.id}
                        block={block}
                        index={index}
                        onUpdateBlock={onUpdateBlock}
                        onRemoveBlock={onRemoveBlock}
                      />
                    </React.Fragment>
                  ))}
                  {renderAddButton(blocks.length)}
                </div>
              )}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
