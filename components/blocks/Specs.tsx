import React from 'react';
import { getTextStyle } from '@/lib/styles';

export default function Specs({ data }: { data: any }) {
  const isDark = data.textColor === '#ffffff' || !data.textColor;

  if (data.items) {
    return (
      <section className="py-12 max-w-5xl mx-auto px-6">
        <div className={`flex flex-wrap justify-between items-center gap-8 md:gap-4 border-y py-10 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
          {data.items.map((item: any, i: number) => (
            <div key={i} className={`flex-1 min-w-[150px] text-center border-r last:border-r-0 px-4 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
              <h4 
                className={`text-3xl md:text-5xl font-black mb-2 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}
                style={{ color: data.accentColor, ...getTextStyle(data, 'title') }}
              >
                {item.t || item.title}
              </h4>
              <p className={`text-[10px] md:text-sm font-black tracking-[0.2em] uppercase ${isDark ? 'text-green' : 'text-blue-500'}`} style={data.accentColor ? { color: data.accentColor } : {}}>{item.d || item.desc || item.value}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 
          className={`text-3xl md:text-6xl font-black mb-6 tracking-tight leading-tight uppercase ${isDark ? 'text-white font-serif' : 'text-slate-900 font-sans italic'}`}
          style={{
            color: data.textColor,
            fontSize: data.fontSize ? `${data.fontSize}px` : undefined,
            ...getTextStyle(data, 'title')
          }}
        >
          {data.title || 'SPESIFIKASI DEVICE'}
        </h2>
        <p 
          className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-lg md:text-xl font-medium`}
          style={getTextStyle(data, 'subtitle')}
        >
          {data.subtitle || 'Performa maksimal membutuhkan alat yang tepat.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} p-12 rounded-[4rem] border shadow-xl`}>
          <h3 className="text-xs font-black mb-10 text-slate-500 uppercase tracking-widest">Minimum Specs</h3>
          <ul className="space-y-6">
            {(data.minimum || [
              { label: "OS", value: "Windows 10 / 11 (64-bit)" },
              { label: "RAM", value: "4 GB" },
              { label: "Storage", value: "2 GB ruang kosong" },
              { label: "Koneksi", value: "Internet stabil" }
            ]).map((s: any, i: number) => (
              <li key={i} className={`flex justify-between items-center border-b pb-4 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</span>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${isDark ? 'bg-slate-900 border-white/10 shadow-2xl' : 'bg-slate-800 border-slate-700 shadow-xl'} p-12 rounded-[4rem] border relative overflow-hidden group`}>
          <div 
            className="absolute top-0 right-0 px-6 py-2 rounded-bl-[2rem] text-[10px] font-black uppercase tracking-widest text-white"
            style={{ backgroundColor: data.accentColor || '#ff2d55' }}
          >
            Recommended
          </div>
          <h3 
            className="text-xs font-black mb-10 uppercase tracking-widest"
            style={{ color: data.accentColor || '#ff2d55' }}
          >
            Recommended Specs
          </h3>
          <ul className="space-y-6">
            {(data.recommended || [
              { label: "OS", value: "Windows 10 / 11 (64-bit)" },
              { label: "RAM", value: "8 GB atau lebih" },
              { label: "Storage", value: "SSD" },
              { label: "Koneksi", value: "Internet cepat" }
            ]).map((s: any, i: number) => (
              <li key={i} className={`flex justify-between items-center border-b pb-4 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</span>
                <span className="text-sm text-white font-black">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
