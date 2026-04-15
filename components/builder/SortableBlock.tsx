'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, ChevronUp, ChevronDown, ImageIcon, GripVertical, Type, AlignLeft, Play } from 'lucide-react';

interface SortableBlockProps {
  id: string;
  block: any;
  index: number;
  onUpdateBlock: (id: string, data: any) => void;
  onRemoveBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  onImageClick: (id: string) => void;
}

export function SortableBlock({ id, block, index, onUpdateBlock, onRemoveBlock, onMoveBlock, onImageClick }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`group relative bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all overflow-hidden ${isDragging ? 'shadow-2xl scale-105' : ''}`}
    >
      {/* Control Header */}
      <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div 
              {...attributes} 
              {...listeners} 
              className="p-1.5 text-slate-300 hover:text-indigo-600 cursor-grab active:cursor-grabbing transition-colors"
            >
               <GripVertical className="w-5 h-5" />
            </div>
            <div className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black text-[9px] uppercase shadow-lg shadow-indigo-100">
               {index + 1}
            </div>
            <span className="text-[9px] font-black text-slate-900 uppercase tracking-[0.2em]">{block.type}</span>
         </div>
         <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
            <button onClick={() => onMoveBlock(id, 'up')} className="p-2 text-slate-400 hover:text-indigo-600 focus:outline-none"><ChevronUp className="w-4 h-4" /></button>
            <button onClick={() => onMoveBlock(id, 'down')} className="p-2 text-slate-400 hover:text-indigo-600 focus:outline-none"><ChevronDown className="w-4 h-4" /></button>
            <div className="w-px h-4 bg-slate-200 mx-1"></div>
            <button onClick={() => onRemoveBlock(id)} className="p-2 text-red-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
         </div>
      </div>

      {/* Editor Content */}
      <div className="p-10 grid gap-8 md:grid-cols-2">
         {/* Left Side: Text Fields */}
         <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2 italic"><Type className="w-3 h-3" /> Headline Content</label>
              <input 
                type="text" 
                value={block.data.title || ''}
                onChange={(e) => onUpdateBlock(id, { ...block.data, title: e.target.value })}
                className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-200 focus:border-indigo-600 focus:bg-white outline-none text-sm font-black text-slate-900 transition-all"
                placeholder="Main Headline..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2 italic"><AlignLeft className="w-3 h-3" /> Subheadline / Description</label>
              <textarea 
                rows={3}
                value={block.data.subtitle || ''}
                onChange={(e) => onUpdateBlock(id, { ...block.data, subtitle: e.target.value })}
                className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-200 focus:border-indigo-600 focus:bg-white outline-none text-sm font-medium text-slate-600 leading-relaxed transition-all"
                placeholder="Marketing words go here..."
              />
            </div>
            
            {block.type === 'pricing' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price Amount (IDR)</label>
                <input 
                  type="number" 
                  value={block.data.price || 0}
                  onChange={(e) => onUpdateBlock(id, { ...block.data, price: Number(e.target.value) })}
                  className="w-full px-5 py-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 focus:border-indigo-600 outline-none text-2xl font-black text-indigo-600"
                />
              </div>
            )}
         </div>

         {/* Right Side: Media & CTA */}
         <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic flex items-center gap-2"><ImageIcon className="w-3 h-3" /> Visual Element</label>
              <div 
                onClick={() => onImageClick(id)}
                className="aspect-video bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white hover:border-indigo-500 hover:shadow-lg transition-all group overflow-hidden relative"
              >
                  {block.data.image ? (
                    <>
                      <img src={block.data.image} alt="Block" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-indigo-600/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
                         <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 mb-2 scale-50 group-hover:scale-100 transition-transform">
                            <ImageIcon className="w-6 h-6" />
                         </div>
                         <span className="text-white text-[9px] font-black uppercase tracking-widest">Ganti Gambar</span>
                      </div>
                    </>
                  ) : (
                    <>
                       <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:scale-110 transition-all">
                          <ImageIcon className="w-5 h-5" />
                       </div>
                       <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Upload Asset</span>
                    </>
                  )}
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic flex items-center gap-2"><Play className="w-3 h-3" /> Action Button / Meta</label>
               <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder={block.type === 'demo' ? 'Embed Video URL...' : 'Tombol Text...'}
                    value={block.type === 'demo' ? (block.data.videoUrl || '') : (block.data.ctaText || '')}
                    onChange={(e) => onUpdateBlock(id, block.type === 'demo' ? { ...block.data, videoUrl: e.target.value } : { ...block.data, ctaText: e.target.value })}
                    className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:border-indigo-600 text-xs font-black uppercase tracking-widest text-slate-600"
                  />
                  {block.type !== 'demo' && (
                    <input 
                      type="text" 
                      placeholder="Redirect Link (WA / Page)..."
                      value={block.data.ctaLink || ''}
                      onChange={(e) => onUpdateBlock(id, { ...block.data, ctaLink: e.target.value })}
                      className="w-full px-5 py-3 text-[9px] bg-slate-50 rounded-xl border border-slate-200 text-indigo-500 font-bold"
                    />
                  )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
