'use client';

import React, { useEffect, useState } from 'react';
import { BlockType, LandingPage } from '@/types/lp';
import { getAllLPs } from '@/lib/data';
import { 
  Layout, Users, AlertTriangle, Lightbulb, Grid, CheckSquare, 
  PlayCircle, MessageSquare, Tag, HelpCircle, Zap, Folder, Plus, ExternalLink
} from 'lucide-react';

const blockLibrary: { type: BlockType; label: string; icon: any }[] = [
  { type: 'hero', label: 'Hero Hook', icon: Layout },
  { type: 'socialProof', label: 'Social Proof', icon: Users },
  { type: 'problem', label: 'Pain Point', icon: AlertTriangle },
  { type: 'solution', label: 'The Solution', icon: Lightbulb },
  { type: 'features', label: 'Key Features', icon: Grid },
  { type: 'steps', label: 'Steps (H-I-W)', icon: CheckSquare },
  { type: 'demo', label: 'Visual Demo', icon: PlayCircle },
  { type: 'testimoni', label: 'Testimonials', icon: MessageSquare },
  { type: 'pricing', label: 'Pricing Plan', icon: Tag },
  { type: 'faq', label: 'Objection (FAQ)', icon: HelpCircle },
  { type: 'cta', label: 'Final Push (CTA)', icon: Zap }
];

interface SidebarProps {
  onAddBlock: (type: BlockType) => void;
  onSelectLP: (lp: LandingPage) => void;
  onNewLP: () => void;
}

export default function Sidebar({ onAddBlock, onSelectLP, onNewLP }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'blocks' | 'projects'>('blocks');
  const [projects, setProjects] = useState<LandingPage[]>([]);

  useEffect(() => {
    if (activeTab === 'projects') {
      getAllLPs().then(setProjects);
    }
  }, [activeTab]);

  return (
    <div className="w-80 bg-slate-900 border-r border-slate-800 h-screen sticky top-0 flex flex-col overflow-hidden z-30">
      {/* Tab Switcher */}
      <div className="flex bg-slate-800/50 p-1 m-4 rounded-xl">
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
          <div className="space-y-2.5">
            <div className="px-2 mb-4">
              <h2 className="text-white font-black tracking-tight text-xl">Elementor <span className="text-indigo-500 italic">Style</span></h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1 leading-none">Pilih & Rakit Komponen Anda</p>
            </div>
            {blockLibrary.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.type}
                  onClick={() => onAddBlock(item.type)}
                  className="w-full flex items-center gap-4 p-3.5 bg-slate-800/30 border border-slate-700/30 rounded-2xl text-slate-400 hover:bg-slate-800 hover:border-indigo-600 hover:text-white transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-slate-700/50 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors group-hover:scale-110 duration-300">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
             <div className="px-2 mb-4 flex items-center justify-between">
              <h2 className="text-white font-black tracking-tight text-xl">My Projects</h2>
              <button onClick={onNewLP} className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"><Plus className="w-4 h-4" /></button>
            </div>
            {projects.length === 0 ? (
               <p className="text-slate-500 text-xs text-center py-8">Belum ada project yang disimpan.</p>
            ) : (
              projects.map((lp) => (
                <div 
                  key={lp.id}
                  className="group p-4 bg-slate-800/30 border border-slate-700/30 rounded-2xl hover:bg-slate-800 hover:border-slate-600 transition-all cursor-pointer"
                  onClick={() => onSelectLP(lp)}
                >
                   <div className="flex items-center justify-between mb-2">
                      <span className="bg-indigo-600/20 text-indigo-400 text-[9px] font-black px-2 py-0.5 rounded-md uppercase">Live LP</span>
                      <a href={`/${lp.slug}`} target="_blank" onClick={(e) => e.stopPropagation()} className="p-1 text-slate-500 hover:text-white"><ExternalLink className="w-3 h-3" /></a>
                   </div>
                   <h4 className="text-white font-bold text-sm truncate">/{lp.slug}</h4>
                   <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Created: {new Date(lp.created_at!).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="p-6 border-t border-slate-800 bg-slate-900/50 backdrop-blur-xl">
         <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] text-center">WINDRE LP FACTORY v2.1</p>
      </div>
    </div>
  );
}
