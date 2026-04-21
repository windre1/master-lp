import React from 'react';
import { Users, Globe, TrendingUp, Zap, Smartphone } from 'lucide-react';
import { getTextStyle } from '@/lib/styles';

export default function Target({ data }: { data: any }) {
  const isDark = data.textColor === '#ffffff';

  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 
          className={`text-3xl md:text-5xl font-black mb-6 tracking-tight leading-[1.05] ${isDark ? 'font-serif text-white' : 'font-sans text-slate-900 uppercase italic'}`}
          style={{ 
            color: data.textColor,
            fontSize: data.fontSize ? `${data.fontSize}px` : undefined,
            ...getTextStyle(data, 'title') 
          }}
        >
          {data.title || 'SIAPA YANG COCOK?'}
        </h2>
        <p 
          className={`font-bold text-sm md:text-base uppercase tracking-[0.25em] ${isDark ? 'text-pink' : 'text-blue-500'}`}
          style={{
            color: data.accentColor || (isDark ? undefined : data.textColor),
            ...getTextStyle(data, 'subtitle')
          }}
        >
          {data.subtitle || 'Bukan untuk semua orang. Tapi WAJIB untuk yang serius.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(data.items || [
          { title: "Creator yang Mau Scale Up", desc: "Bukan cuma upload… tapi mau punya strategi yang jelas dan berbasis data." },
          { title: "Builder Banyak Channel", desc: "Yang kelola puluhan channel sekaligus dan butuh sistem pusat agar semua terkendali." },
          { title: "Agency & Tim Konten", desc: "Yang butuh sistem untuk mengelola banyak klien secara profesional tanpa ribet." }
        ]).map((card: any, i: number) => {
          return (
            <div key={i} className={`p-10 rounded-[3.5rem] border transition-all group overflow-hidden relative ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:-translate-y-2' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all shadow-sm ${isDark ? 'bg-pink/10 text-pink group-hover:bg-pink group-hover:text-white' : 'bg-blue-50 text-blue-400 group-hover:bg-blue-600 group-hover:text-white'}`} style={data.accentColor ? { color: data.accentColor, backgroundColor: `${data.accentColor}10` } : {}}>
                <Users size={28} strokeWidth={1.5} />
              </div>
              <h3 className={`text-xl font-extrabold mb-4 tracking-[-0.02em] leading-tight uppercase italic ${isDark ? 'text-white' : 'text-slate-800'}`}>{card.title}</h3>
              <p className={`text-sm leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{card.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
