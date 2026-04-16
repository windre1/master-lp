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
    <div className="w-[380px] flex flex-col gap-6 shrink-0 overflow-hidden h-full">
      {/* Add Elements Card */}
      <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm shrink-0">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
          TAMBAH ELEMEN
        </h2>
        
        <div className="grid grid-cols-2 gap-2">
           {library.map((item) => (
            <button
              key={item.type}
              onClick={() => onAddBlock(item.type as BlockType)}
              className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 hover:border-slate-900 hover:bg-white transition-all group"
            >
              <item.icon className="w-3 h-3 text-slate-400 group-hover:text-slate-900" />
              <span className="font-bold text-[10px] tracking-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Preview Real-size Mockup */}
      <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm flex-1 flex flex-col overflow-hidden min-h-0 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4 shrink-0">
           <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
             LIVE PREVIEW
           </h2>
           <button 
             onClick={handleFullPreview}
             className="text-[10px] font-black text-blue-600 uppercase hover:underline"
           >
             Full View →
           </button>
        </div>

        {/* Realistic Phone Frame */}
        <div className="flex-1 flex justify-center items-start overflow-hidden">
           <div className="relative w-full max-w-[280px] aspect-[9/19] bg-slate-900 rounded-[2.5rem] border-[10px] border-slate-900 shadow-2xl flex flex-col overflow-hidden ring-4 ring-slate-100">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-b-2xl z-30 flex items-center justify-center">
                 <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
              </div>

              {/* Status Bar Mock */}
              <div className="h-6 bg-slate-900 shrink-0 z-20 flex justify-between px-6 pt-1">
                 <span className="text-[8px] text-white font-bold">9:41</span>
                 <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full border border-white/20"></div>
                    <div className="w-2 h-2 rounded-full bg-white/40"></div>
                 </div>
              </div>

              {/* Scrollable Content inside Phone */}
              <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
                 <div className="w-full origin-top transform scale-[0.38] md:scale-100">
                    <Renderer blocks={blocks} />
                 </div>
              </div>

              {/* Home Indicator */}
              <div className="h-5 bg-slate-900 shrink-0 flex items-center justify-center z-20">
                 <div className="w-16 h-1 bg-white/20 rounded-full"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
