'use client';

import React from 'react';
import { BlockType } from '@/types/lp';
import { 
  Layout, 
  Users, 
  AlertTriangle, 
  Lightbulb, 
  Grid, 
  CheckSquare, 
  PlayCircle, 
  MessageSquare, 
  Tag, 
  HelpCircle, 
  Zap 
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
}

export default function Sidebar({ onAddBlock }: SidebarProps) {
  return (
    <div className="w-72 bg-slate-900 border-r border-slate-800 h-screen sticky top-0 flex flex-col p-6 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-white font-black tracking-tight text-xl mb-1">Block Library</h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-none">Click to add section</p>
      </div>

      <div className="space-y-3">
        {blockLibrary.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.type}
              onClick={() => onAddBlock(item.type)}
              className="w-full flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-slate-300 hover:bg-slate-800 hover:border-indigo-500 transition-all text-left group"
            >
              <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                 <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-sm tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
