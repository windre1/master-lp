'use client';

import React, { useEffect, useState } from 'react';
import { getAllLPs } from '@/lib/data';
import { LandingPage } from '@/types/lp';
import { Trash2 } from 'lucide-react';

interface SidebarProps {
  onSelectLP: (lp: LandingPage) => void;
  activeSlug: string;
  onDeleteLP: (slug: string) => void;
}

export default function Sidebar({ onSelectLP, activeSlug, onDeleteLP }: SidebarProps) {
  const [projects, setProjects] = useState<LandingPage[]>([]);

  useEffect(() => {
    getAllLPs().then(setProjects);
  }, []);

  return (
    <div className="w-80 bg-white rounded-[2rem] border border-slate-200 overflow-hidden flex flex-col shadow-sm">
      <div className="p-8 pb-4">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
          LANDING PAGE ({projects.length})
        </h2>
        
      <div className="flex-1 overflow-y-auto px-8 pb-8 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <div className="space-y-3">
          {projects.map((lp) => {
            const isActive = lp.slug === activeSlug;
            return (
              <div 
                key={lp.id}
                onClick={() => onSelectLP(lp)}
                className={`group p-5 rounded-2xl cursor-pointer transition-all relative ${
                  isActive 
                  ? 'bg-slate-900 text-white shadow-xl scale-[1.02] z-10' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100'
                }`}
              >
                <div className="font-bold text-sm mb-1 pr-8">{lp.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
                <div className={`text-[10px] ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>/{lp.slug}</div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteLP(lp.slug);
                  }}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                    isActive 
                    ? 'text-slate-500 hover:text-white hover:bg-white/10' 
                    : 'text-slate-200 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
          
          {projects.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Belum ada halaman</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
