'use client';

import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Block } from '@/types/lp';
import { SortableBlock } from './SortableBlock';
import { ExternalLink, Link2, Save } from 'lucide-react';

interface CanvasProps {
  blocks: Block[];
  onUpdateBlock: (id: string, data: any) => void;
  onRemoveBlock: (id: string) => void;
  onSortBlocks: (newBlocks: Block[]) => void;
  slug: string;
  onUpdateSlug: (slug: string) => void;
  onSave: () => void;
  saving: boolean;
}

export default function Canvas({ 
  blocks, onUpdateBlock, onRemoveBlock, slug, onUpdateSlug, onSave, saving 
}: CanvasProps) {
  
  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${slug}`);
    alert('Link disalin!');
  };

  return (
    <div className="flex-1 bg-white rounded-[2rem] border border-slate-200 overflow-hidden flex flex-col shadow-sm">
      {/* Page Header */}
      <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0">
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
             className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 disabled:opacity-50 transition-all"
           >
             <Save className="w-4 h-4" /> {saving ? '...' : 'Simpan'}
           </button>
        </div>
      </div>

      {/* Editor Cards Area */}
      <div className="flex-1 overflow-y-auto bg-white p-8 scrollbar-thin border-t border-slate-50">
        <div className="max-w-xl mx-auto py-10">
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
              <div className="space-y-4">
                {blocks.map((block, index) => (
                  <SortableBlock 
                    key={block.id}
                    id={block.id}
                    block={block}
                    index={index}
                    onUpdateBlock={onUpdateBlock}
                    onRemoveBlock={onRemoveBlock}
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
