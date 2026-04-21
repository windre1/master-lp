import React from 'react';
import { getTextStyle } from '@/lib/styles';

export default function Demo({ data }: { data: any }) {
  const isDark = data.textColor === '#ffffff' || !data.textColor;

  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  const embedUrl = getEmbedUrl(data.videoUrl);

  return (
    <section className="py-20 md:py-32 max-w-5xl mx-auto px-6 text-center">
      <div className="mb-12">
        <h2 
          className={`text-3xl md:text-5xl font-black mb-4 uppercase italic ${isDark ? 'text-white' : 'text-slate-900'}`}
          style={{
            color: data.textColor,
            fontSize: data.fontSize ? `${data.fontSize}px` : undefined,
            ...getTextStyle(data, 'title')
          }}
        >
          {data.title || 'LIHAT BAGAIMANA INI BEKERJA'}
        </h2>
        <div 
          className="w-24 h-1 mx-auto rounded-full"
          style={{ backgroundColor: data.accentColor || '#3b82f6' }}
        ></div>
      </div>
      
      <div className={`max-w-4xl mx-auto rounded-[2.5rem] p-2 border ${isDark ? 'bg-white/5 border-white/10 shadow-[0_0_50px_rgba(0,242,255,0.1)]' : 'bg-slate-50 border-slate-200 shadow-xl shadow-slate-200/50'}`}>
         <div className={`aspect-video rounded-[2.2rem] overflow-hidden flex items-center justify-center ${isDark ? 'bg-black/40' : 'bg-slate-900'}`}>
           {embedUrl ? (
             <iframe 
               className="w-full h-full" 
               src={embedUrl} 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen 
               title="Demo Video"
             />
           ) : (
             <div className="flex flex-col items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-white/10'}`}>
                   <div 
                    className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-b-[10px] border-b-transparent ml-1"
                    style={{ borderLeftColor: data.accentColor || '#06b6d4' }}
                   ></div>
                </div>
                <span className="text-[#94a3b8] font-bold uppercase tracking-widest text-[10px]">Video Demo Belum Diisi</span>
             </div>
           )}
         </div>
      </div>
    </section>
  );
}
