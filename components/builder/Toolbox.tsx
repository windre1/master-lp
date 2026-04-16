'use client';

import React from 'react';
import { Layout, AlignLeft, Send, Play, Zap } from 'lucide-react';
import Renderer from '../lp/Renderer';
import { Block, BlockType } from '@/types/lp';

interface ToolboxProps {
  onAddBlock: (type: BlockType) => void;
  blocks: Block[];
  slug: string;
}

export default function Toolbox({ onAddBlock, blocks, slug }: ToolboxProps) {
  const library = [
    { type: 'heading', label: 'Judul', icon: Layout },
    { type: 'text_only', label: 'Teks', icon: AlignLeft },
    { type: 'image_only', label: 'Gambar', icon: Layout },
    { type: 'video_only', label: 'Video YouTube', icon: Play },
    { type: 'price_list', label: 'Price List (3 Kolom)', icon: Layout },
    { type: 'button_only', label: 'Tombol', icon: Zap },
  ];

  const handleFullPreview = () => {
    if (!slug) return;
    window.open(`/${slug}`, '_blank');
  };

  return (
    <div className="w-80 flex flex-col gap-8 shrink-0 pb-20 overflow-y-auto scrollbar-hide">
      {/* Add Elements Card */}
      <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
          TAMBAH ELEMEN
        </h2>
        
        <div className="space-y-3">
          {library.map((item) => (
            <button
              key={item.type}
              onClick={() => onAddBlock(item.type as BlockType)}
              className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl text-slate-600 hover:border-slate-900 hover:bg-slate-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
                <span className="font-bold text-sm tracking-tight">{item.label}</span>
              </div>
              <span className="text-slate-200 group-hover:text-slate-900 font-bold">+</span>
            </button>
          ))}
          
          <div className="pt-4 border-t border-slate-50 mt-4">
             <p className="text-[10px] text-slate-400 font-bold uppercase italic text-center">Blok desain premium dikelola secara otomatis di template.</p>
          </div>
        </div>
      </div>

      {/* Mobile Preview Card */}
      <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex-1 flex flex-col min-h-[500px]">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
             PREVIEW
           </h2>
           <button 
             onClick={handleFullPreview}
             className="text-[10px] font-black text-blue-600 uppercase hover:underline"
           >
             Full →
           </button>
        </div>

        {/* Mobile Device Frame */}
        <div className="flex-1 rounded-[2.5rem] border-[6px] border-slate-100 overflow-hidden relative shadow-inner bg-slate-900 group">
           <div className="absolute inset-0 overflow-y-auto no-scrollbar transform scale-95 origin-top group-hover:scale-100 transition-transform duration-500">
             <div className="min-h-full w-full">
                <Renderer blocks={blocks} />
             </div>
           </div>
           
           {/* Notch */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-100 rounded-b-2xl z-20"></div>
        </div>
      </div>
    </div>
  );
}
