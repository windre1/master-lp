import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { getTextStyle } from '@/lib/styles';

export default function Disclaimer({ data }: { data: any }) {
  const isDark = data.textColor === '#ffffff' || !data.textColor;
  const content = data.subtitle ? [data.subtitle] : (data.content || []);

  return (
    <section className={`py-20 border-y ${isDark ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className={`flex items-center gap-4 mb-10 ${isDark ? 'text-orange-500' : 'text-orange-600'}`}>
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
            <ShieldAlert size={28} />
          </div>
          <h3 
            className="text-2xl font-black uppercase italic tracking-tighter"
            style={{
              color: data.textColor,
              fontSize: data.fontSize ? `${data.fontSize}px` : undefined,
              ...getTextStyle(data, 'title')
            }}
          >
            {data.title || '⚠️ DISCLAIMER'}
          </h3>
        </div>
        
        <div className="grid gap-6">
          {content.map((p: string, i: number) => (
            <div key={i} className="flex gap-4 group">
               <span 
                className="font-black text-xl italic transition-colors"
                style={{ color: data.accentColor || '#f97316' }}
               >
                {String(i + 1).padStart(2, '0')}.
               </span>
               <p 
                className={`text-sm leading-relaxed font-medium transition-colors ${isDark ? 'text-[#94a3b8] group-hover:text-[#e2e8f0]' : 'text-slate-600 group-hover:text-slate-900'}`}
                style={getTextStyle(data, 'subtitle')}
               >
                {p}
               </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
