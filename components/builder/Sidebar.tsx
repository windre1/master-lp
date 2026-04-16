'use client';

import React, { useEffect, useState } from 'react';
import { getAllLPs } from '@/lib/data';
import { LandingPage } from '@/types/lp';

interface SidebarProps {
  onSelectLP: (lp: LandingPage) => void;
  activeSlug: string;
}

export default function Sidebar({ onSelectLP, activeSlug }: SidebarProps) {
  const [projects, setProjects] = useState<LandingPage[]>([]);

  useEffect(() => {
    getAllLPs().then(setProjects);
  }, []);

  return (
    <div className="w-80 bg-white rounded-[2rem] border border-slate-200 overflow-hidden flex flex-col shadow-sm">
      <div className="p-8 pb-4">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
          HALAMAN ({projects.length})
        </h2>
        
        <div className="space-y-2">
          {projects.map((lp) => {
            const isActive = lp.slug === activeSlug;
            return (
              <div 
                key={lp.id}
                onClick={() => onSelectLP(lp)}
                className={`p-5 rounded-2xl cursor-pointer transition-all ${
                  isActive 
                  ? 'bg-slate-900 text-white shadow-lg' 
                  : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-sm mb-1">{lp.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
                <div className={`text-[10px] ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>/akses/{lp.slug}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
