'use client';

import React from 'react';
import { Block } from '@/types/lp';
import { Trash2, ChevronUp, ChevronDown, Edit3, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface CanvasProps {
  blocks: Block[];
  onUpdateBlock: (id: string, data: any) => void;
  onRemoveBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  slug: string;
  onUpdateSlug: (slug: string) => void;
}

export default function Canvas({ blocks, onUpdateBlock, onRemoveBlock, onMoveBlock, slug, onUpdateSlug }: CanvasProps) {
  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-8 pb-32 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Slug Header */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6">
           <div className="flex-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Landing Page Slug</label>
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-medium">/</span>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => onUpdateSlug(e.target.value.toLowerCase().replace(/ /g, '-'))}
                  placeholder="my-cool-landing-page"
                  className="bg-transparent outline-none flex-1 font-bold text-slate-800"
                />
              </div>
           </div>
           {slug && (
              <a 
                href={`/${slug}`} 
                target="_blank" 
                className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-100 transition-all"
              >
                <LinkIcon className="w-4 h-4" /> View Live
              </a>
           )}
        </div>

        {/* Blocks Area */}
        <div className="space-y-6">
          {blocks.length === 0 ? (
            <div className="py-24 border-4 border-dashed border-slate-200 rounded-[3rem] text-center flex flex-col items-center justify-center">
               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                  <LayoutIcon className="w-10 h-10" />
               </div>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Canvas Kosong. Klik library untuk menambah kontent.</p>
            </div>
          ) : (
            blocks.map((block, index) => (
              <div key={block.id} className="group relative bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all overflow-hidden">
                {/* Control Header */}
                <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                         {block.type}
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Block #{index + 1}</span>
                   </div>
                   <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onMoveBlock(block.id, 'up')} className="p-2 text-slate-400 hover:text-indigo-600"><ChevronUp className="w-4 h-4" /></button>
                      <button onClick={() => onMoveBlock(block.id, 'down')} className="p-2 text-slate-400 hover:text-indigo-600"><ChevronDown className="w-4 h-4" /></button>
                      <div className="w-px h-4 bg-slate-200 mx-1"></div>
                      <button onClick={() => onRemoveBlock(block.id)} className="p-2 text-red-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                   </div>
                </div>

                {/* Edit Form */}
                <div className="p-8 space-y-4">
                   <div className="grid gap-4 md:grid-cols-2">
                      <input 
                        type="text" 
                        placeholder="Judul / Headline"
                        value={block.data.title || ''}
                        onChange={(e) => onUpdateBlock(block.id, { ...block.data, title: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 focus:border-indigo-600 outline-none text-sm font-bold text-slate-800"
                      />
                      <input 
                        type="text" 
                        placeholder="Subtitle / Penjelas"
                        value={block.data.subtitle || ''}
                        onChange={(e) => onUpdateBlock(block.id, { ...block.data, subtitle: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 focus:border-indigo-600 outline-none text-sm font-medium text-slate-600"
                      />
                   </div>

                   {block.type === 'pricing' && (
                      <input 
                        type="number" 
                        placeholder="Harga (IDR)"
                        value={block.data.price || 0}
                        onChange={(e) => onUpdateBlock(block.id, { ...block.data, price: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 focus:border-indigo-600 outline-none text-sm font-black text-indigo-600"
                      />
                   )}

                   {block.type === 'demo' && (
                      <input 
                        type="text" 
                        placeholder="YouTube Video URL"
                        value={block.data.videoUrl || ''}
                        onChange={(e) => onUpdateBlock(block.id, { ...block.data, videoUrl: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 focus:border-indigo-600 outline-none text-sm text-slate-500"
                      />
                   )}
                   
                   <div className="flex items-center gap-4">
                      <input 
                        type="text" 
                        placeholder="CTA Button Text"
                        value={block.data.ctaText || ''}
                        onChange={(e) => onUpdateBlock(block.id, { ...block.data, ctaText: e.target.value })}
                        className="flex-1 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 focus:border-indigo-600 outline-none text-xs font-black uppercase tracking-widest text-slate-500"
                      />
                      <button className="px-4 py-3 bg-slate-100 text-slate-400 rounded-xl hover:text-indigo-600 transition-all"><ImageIcon className="w-5 h-5" /></button>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function LayoutIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
  )
}
