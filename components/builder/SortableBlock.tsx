'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  GripVertical, 
  Trash2, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
} from 'lucide-react';
import { Block } from '@/types/lp';

interface SortableBlockProps {
  id: string;
  block: Block;
  index: number;
  onUpdateBlock: (id: string, data: any) => void;
  onRemoveBlock: (id: string) => void;
}

export function SortableBlock({ 
  id, block, onUpdateBlock, onRemoveBlock 
}: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    opacity: isDragging ? 0.3 : 1
  };

  const updateData = (key: string, value: any) => {
    onUpdateBlock(id, { ...block.data, [key]: value });
  };

  const currentAlign = block.data.badge || 'center';

  const renderFields = () => {
    switch (block.type) {
      case 'heading':
        return (
          <input 
            type="text" 
            value={block.data.title || ''} 
            onChange={e => updateData('title', e.target.value)} 
            placeholder="Ketik judul di sini..."
            className={`w-full bg-transparent border-none outline-none font-bold text-lg text-slate-800 placeholder:text-slate-300 ${currentAlign === 'left' ? 'text-left' : (currentAlign === 'right' ? 'text-right' : 'text-center')}`}
          />
        );
      case 'text_only':
        return (
          <textarea 
            rows={2}
            value={block.data.subtitle || ''} 
            onChange={e => updateData('subtitle', e.target.value)} 
            placeholder="Tulis paragraf di sini..."
            className={`w-full bg-transparent border-none outline-none text-sm text-slate-600 leading-relaxed placeholder:text-slate-300 resize-none ${currentAlign === 'left' ? 'text-left' : (currentAlign === 'right' ? 'text-right' : 'text-center')}`}
          />
        );
      case 'button_only':
      case 'cta':
        return (
          <div className="space-y-4">
            <div className={`flex ${currentAlign === 'left' ? 'justify-start' : (currentAlign === 'right' ? 'justify-end' : 'justify-center')}`}>
              <div className="px-10 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg min-w-[200px] text-center">
                <input 
                  type="text" 
                  value={block.data.ctaText || ''} 
                  onChange={e => updateData('ctaText', e.target.value)}
                  className="bg-transparent border-none outline-none text-center w-full"
                  placeholder="TOMBOL"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
               <span className="shrink-0">URL</span>
               <input 
                 type="text" 
                 value={block.data.ctaLink || ''} 
                 onChange={e => updateData('ctaLink', e.target.value)}
                 className="flex-1 bg-slate-100 px-3 py-1.5 rounded-lg outline-none text-slate-600 text-[10px]"
                 placeholder="https://..."
               />
            </div>
          </div>
        );
      default:
        // Use currentAlign for layout blocks too
        return (
          <div className="space-y-6">
            <input 
              type="text" 
              value={block.data.title || ''} 
              onChange={e => updateData('title', e.target.value)} 
              placeholder={`Judul ${block.type}...`}
              className={`w-full bg-transparent border-none outline-none font-bold text-lg text-slate-800 placeholder:text-slate-200 ${currentAlign === 'left' ? 'text-left' : (currentAlign === 'right' ? 'text-right' : 'text-center')}`}
            />
            {block.data.image && (
               <div className="w-full h-32 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                  <img src={block.data.image} alt="Preview" className="w-full h-full object-cover" />
               </div>
            )}
            <p className="text-[9px] text-slate-400 font-bold uppercase italic text-center">Konten grafis dikelola otomatis</p>
          </div>
        );
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="bg-white rounded-[1.5rem] border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden group mb-4"
    >
      {/* Card Header matching image */}
      <div className="bg-slate-50/50 px-5 py-2.5 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div {...listeners} {...attributes} className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-400 p-1">
             <div className="grid grid-cols-2 gap-0.5">
               <div className="w-0.5 h-0.5 bg-current rounded-full"></div><div className="w-0.5 h-0.5 bg-current rounded-full"></div>
               <div className="w-0.5 h-0.5 bg-current rounded-full"></div><div className="w-0.5 h-0.5 bg-current rounded-full"></div>
               <div className="w-0.5 h-0.5 bg-current rounded-full"></div><div className="w-0.5 h-0.5 bg-current rounded-full"></div>
             </div>
          </div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-2 border-l border-slate-200 leading-none">
            {block.type.replace('_only', '').toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex bg-slate-200/50 p-1 rounded-lg gap-0.5">
            {[
              { val: 'left', icon: AlignLeft },
              { val: 'center', icon: AlignCenter },
              { val: 'right', icon: AlignRight }
            ].map((btn) => (
              <button 
                key={btn.val}
                onClick={() => updateData('badge', btn.val)}
                className={`p-1 rounded transition-all ${currentAlign === btn.val ? 'bg-white shadow-sm text-slate-900 border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <btn.icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
          <button 
            onClick={() => onRemoveBlock(id)}
            className="p-1.5 text-slate-300 hover:text-red-500 transition-colors ml-2"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-8">
        {renderFields()}
      </div>
    </div>
  );
}
