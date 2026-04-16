'use client';

import React, { useEffect, useState } from 'react';
import { Type, AlignLeft, ImageIcon, Play } from "lucide-react";
import { useDraggable } from '@dnd-kit/core';
import { BlockType, LandingPage } from '@/types/lp';
import { getAllLPs } from '@/lib/data';
import { 
  Layout, Users, AlertTriangle, Lightbulb, Grid, CheckSquare, 
  PlayCircle, MessageSquare, Tag, HelpCircle, Zap, Folder, Plus, ExternalLink, GripHorizontal,
  ArrowLeftRight, ShieldAlert, Cpu
} from 'lucide-react';

const blockLibrary: { type: BlockType; label: string; icon: any }[] = [
  { type: 'heading', label: 'Headline', icon: Type },
  { type: 'text_only', label: 'Text Editor', icon: AlignLeft },
  { type: 'image_only', label: 'Image', icon: ImageIcon },
  { type: 'button_only', label: 'Button', icon: Play },
  { type: 'hero', label: 'Hero Hook', icon: Layout },
  { type: 'socialProof', label: 'Social Proof', icon: Users },
  { type: 'problem', label: 'Problem Section', icon: AlertTriangle },
  { type: 'solution', label: 'Solution Block', icon: Lightbulb },
  { type: 'features', label: 'Price Features', icon: Grid },
  { type: 'steps', label: 'Steps', icon: CheckSquare },
  { type: 'demo', label: 'Video Meta', icon: PlayCircle },
  { type: 'testimoni', label: 'Testimonials', icon: MessageSquare },
  { type: 'pricing', label: 'Price Table', icon: Tag },
  { type: 'faq', label: 'FAQ Accordion', icon: HelpCircle },
  { type: 'cta', label: 'Final CTA', icon: Zap },
  { type: 'comparison', label: 'VS System', icon: ArrowLeftRight },
  { type: 'target', label: 'Target Market', icon: Users },
  { type: 'specs', label: 'System Specs', icon: Cpu },
  { type: 'disclaimer', label: 'Disclaimer', icon: ShieldAlert }
];

function DraggableBlockItem({ item }: { item: any }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `library-${item.type}`,
    data: {
      type: 'library',
      blockType: item.type
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const Icon = item.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative w-full flex flex-col items-center justify-center p-4 bg-slate-800/30 border border-slate-700/30 rounded-2xl text-slate-400 hover:bg-slate-800 hover:border-indigo-600 hover:text-white transition-all text-center cursor-grab active:cursor-grabbing z-50 ${isDragging ? 'opacity-50 ring-2 ring-indigo-500 shadow-2xl' : ''}`}
    >
      <div className="w-10 h-10 bg-slate-700/50 rounded-xl flex items-center justify-center mb-2">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="font-bold text-[10px] uppercase tracking-widest">{item.label}</span>
      <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-100 italic">
        <GripHorizontal className="w-3 h-3" />
      </div>
    </div>
  );
}

interface SidebarProps {
  onSelectLP: (lp: LandingPage) => void;
  onNewLP: () => void;
}

export default function Sidebar({ onSelectLP, onNewLP }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'blocks' | 'projects'>('blocks');
  const [projects, setProjects] = useState<LandingPage[]>([]);

  useEffect(() => {
    if (activeTab === 'projects') {
      getAllLPs().then(setProjects);
    }
  }, [activeTab]);

  return (
    <div className="w-80 bg-[#0a1128] border-r border-white/5 h-screen sticky top-0 flex flex-col overflow-hidden z-30">
      <div className="flex bg-white/5 p-1.5 m-5 rounded-2xl shrink-0 border border-white/5">
        <button 
          onClick={() => setActiveTab('blocks')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'blocks' ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white'}`}
        >
          <Plus className="w-3.5 h-3.5" /> Blocks
        </button>
        <button 
          onClick={() => setActiveTab('projects')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'projects' ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white'}`}
        >
          <Folder className="w-3.5 h-3.5" /> Projects
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 scrollbar-hide">
        {activeTab === 'blocks' ? (
          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="px-2 mb-6">
              <h2 className="text-white font-black tracking-tight text-xl uppercase italic">Design <span className="text-[#00f2ff]">Blocks</span></h2>
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1">Drag and drop to build</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {blockLibrary.map((item) => (
                <DraggableBlockItem key={item.type} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="px-2 mb-4 flex items-center justify-between">
              <h2 className="text-white font-black tracking-tight text-xl italic uppercase">Funnels</h2>
              <button 
                onClick={onNewLP} 
                className="w-10 h-10 bg-white/5 text-[#00f2ff] border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#00f2ff] hover:text-black transition-all font-black text-xl"
              >
                +
              </button>
            </div>
            {projects.length === 0 ? (
               <div className="py-20 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Folder className="w-8 h-8 text-slate-700" />
                  </div>
                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">No Projects Found</p>
               </div>
            ) : (
              projects.map((lp) => (
                <div 
                  key={lp.id}
                  className="group p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-[#00f2ff]/30 transition-all cursor-pointer relative overflow-hidden"
                  onClick={() => onSelectLP(lp)}
                >
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse"></div>
                         <span className="text-[#94a3b8] text-[9px] font-black uppercase tracking-widest">Active</span>
                      </div>
                      <a href={`/${lp.slug}`} target="_blank" onClick={(e) => e.stopPropagation()} className="w-9 h-9 flex items-center justify-center bg-white/5 rounded-xl text-slate-400 hover:text-[#00f2ff] border border-white/5 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                   </div>
                   <h4 className="text-white font-black text-sm truncate tracking-tight uppercase italic mb-1 group-hover:text-[#00f2ff] transition-colors">/{lp.slug}</h4>
                   <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{new Date(lp.created_at!).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="p-8 border-t border-white/5 bg-[#050a15] text-center">
         <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.6em]">SPARTAN ENGINE ALPHA</p>
      </div>
    </div>
  );
}
