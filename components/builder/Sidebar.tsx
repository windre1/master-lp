'use client';

import React, { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { BlockType, LandingPage } from '@/types/lp';
import { getAllLPs } from '@/lib/data';
import { 
  Layout, Users, AlertTriangle, Lightbulb, Grid, CheckSquare, 
  PlayCircle, MessageSquare, Tag, HelpCircle, Zap, Folder, Plus, ExternalLink, GripHorizontal
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
  { type: 'cta', label: 'Final CTA', icon: Zap }
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
    <div className="w-80 bg-slate-900 border-r border-slate-800 h-screen sticky top-0 flex flex-col overflow-hidden z-30">
      <div className="flex bg-slate-800/50 p-1 m-4 rounded-xl shrink-0">
        <button 
          onClick={() => setActiveTab('blocks')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'blocks' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <Plus className="w-3 h-3" /> Blocks
        </button>
        <button 
          onClick={() => setActiveTab('projects')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'projects' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <Folder className="w-3 h-3" /> Projects
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8 scrollbar-hide">
        {activeTab === 'blocks' ? (
          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="px-2 mb-6">
              <h2 className="text-white font-black tracking-tight text-xl italic">ELEMENTOR <span className="text-indigo-500 font-mono">PRO</span></h2>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.25em] mt-1 italic">Drag block to canvas</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {blockLibrary.map((item) => (
                <DraggableBlockItem key={item.type} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="px-2 mb-4 flex items-center justify-between">
              <h2 className="text-white font-black tracking-tight text-xl">My Funnels</h2>
              <button 
                onClick={onNewLP} 
                className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 shadow-lg shadow-indigo-900/50 transition-all font-black text-xl"
              >
                +
              </button>
            </div>
            {projects.length === 0 ? (
               <div className="py-20 text-center flex flex-col items-center">
                  <Folder className="w-10 h-10 text-slate-800 mb-4" />
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">No Projects Found</p>
               </div>
            ) : (
              projects.map((lp) => (
                <div 
                  key={lp.id}
                  className="group p-5 bg-slate-800/30 border border-slate-700/30 rounded-2xl hover:bg-slate-800 hover:border-slate-500 transition-all cursor-pointer relative overflow-hidden"
                  onClick={() => onSelectLP(lp)}
                >
                   <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
                         <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest">Published</span>
                      </div>
                      <a href={`/${lp.slug}`} target="_blank" onClick={(e) => e.stopPropagation()} className="w-8 h-8 flex items-center justify-center bg-slate-700/50 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                   </div>
                   <h4 className="text-white font-black text-sm truncate tracking-tight italic">/{lp.slug}</h4>
                   <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-2">{new Date(lp.created_at!).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-800 bg-slate-950 text-center">
         <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em]">POWERED BY WINDRE</p>
      </div>
    </div>
  );
}
