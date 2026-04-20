import React from 'react';
import { Block } from '@/types/lp';

// Block Components
import Hero from '@/components/blocks/Hero';
import SocialProof from '@/components/blocks/SocialProof';
import Problem from '@/components/blocks/Problem';
import Solution from '@/components/blocks/Solution';
import Features from '@/components/blocks/Features';
import Steps from '@/components/blocks/Steps';
import Demo from '@/components/blocks/Demo';
import Testimoni from '@/components/blocks/Testimoni';
import Pricing from '@/components/blocks/Pricing';
import FAQ from '@/components/blocks/FAQ';
import CTA from '@/components/blocks/CTA';
import Comparison from '@/components/blocks/Comparison';
import Target from '@/components/blocks/Target';
import Specs from '@/components/blocks/Specs';
import Disclaimer from '@/components/blocks/Disclaimer';

interface RendererProps {
  blocks: Block[];
  settings?: {
    globalBg?: string;
  };
}

const blockMap: Record<string, React.FC<any>> = {
  hero: Hero,
  socialProof: SocialProof,
  problem: Problem,
  solution: Solution,
  features: Features,
  steps: Steps,
  demo: Demo,
  testimoni: Testimoni,
  pricing: Pricing,
  faq: FAQ,
  cta: CTA,
  comparison: Comparison,
  target: Target,
  specs: Specs,
  disclaimer: Disclaimer,
  // Atomic Blocks
  heading: ({ data }) => {
    const alignment = data.badge === 'left' ? 'text-left' : (data.badge === 'right' ? 'text-right' : 'text-center');
    return (
      <div className="max-w-4xl px-6 mx-auto py-12">
        <h2 
          className={`font-serif font-black tracking-[-0.03em] ${alignment}`}
          style={{ 
            color: data.textColor || '#ffffff',
            fontSize: data.fontSize ? `${data.fontSize}px` : '3rem',
            lineHeight: '1.05'
          }}
        >
          {data.title || 'Headline'}
        </h2>
      </div>
    );
  },
  text_only: ({ data }) => {
    const alignment = data.badge === 'left' ? 'text-left' : (data.badge === 'right' ? 'text-right' : 'text-center');
    const itemsAlignment = data.badge === 'left' ? 'items-start' : (data.badge === 'right' ? 'items-end' : 'items-center');
    
    return (
      <div className={`max-w-3xl px-6 mx-auto py-6 flex flex-col ${itemsAlignment}`}>
        <p 
          className={`leading-relaxed font-medium whitespace-pre-wrap ${alignment} w-full`}
          style={{ 
            color: data.textColor || '#94a3b8',
            fontSize: data.fontSize ? `${data.fontSize}px` : '1.125rem'
          }}
        >
          {data.subtitle || 'Tulis paragraf di sini...'}
        </p>
      </div>
    );
  },
  image_only: ({ data }) => {
    const alignment = data.badge === 'left' ? 'justify-start' : (data.badge === 'right' ? 'justify-end' : 'justify-center');
    const width = data.imageWidth || 100;
    return (
      <div className={`max-w-5xl px-6 mx-auto py-12 flex ${alignment}`}>
        <div 
          className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5 group pink-glow"
          style={{ width: `${width}%` }}
        >
          {data.image ? (
            <img 
              src={data.image} 
              alt="Visual" 
              className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-1000" 
            />
          ) : (
            <div className="py-20 bg-white/5 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
              Belum ada gambar
            </div>
          )}
        </div>
      </div>
    );
  },
  video_only: ({ data }) => {
    const getYouTubeId = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url?.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };
    const videoId = getYouTubeId(data.videoUrl || '');
    const width = data.videoWidth || 100;
    const alignment = data.badge === 'left' ? 'justify-start' : (data.badge === 'right' ? 'justify-end' : 'justify-center');

    return (
      <div className={`max-w-5xl px-6 mx-auto py-12 flex ${alignment}`}>
        <div 
          className="aspect-video bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-900 ring-1 ring-slate-100"
          style={{ width: `${width}%` }}
        >
          {videoId ? (
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-xs uppercase tracking-widest px-10 text-center">
              Masukkan ID Video / Link YouTube yang Benar
            </div>
          )}
        </div>
      </div>
    );
  },
  price_list: ({ data }) => {
    const items = data.items || [];
    const isSingle = items.length === 1;
    const isDouble = items.length === 2;
    
    return (
      <div className="max-w-5xl px-6 mx-auto py-16">
        <div className={`flex flex-wrap justify-center gap-8`}>
           {items.map((item: any, i: number) => (
              <div 
               key={i} 
               className="bg-white p-10 rounded-[3.5rem] border border-blue-100/50 shadow-2xl shadow-blue-500/5 flex flex-col justify-between hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
               style={{ 
                 width: isSingle ? (data.priceListWidth ? `${data.priceListWidth}%` : '500px') : 'auto',
                 maxWidth: isSingle ? '1000px' : (isDouble ? '450px' : '380px'),
                 flex: isSingle ? 'none' : '1 1 320px',
                 minHeight: '480px'
               }}
              >
                 <div className="flex-1">
                    <h3 
                     className="text-xl font-extrabold mb-4 tracking-[-0.03em] uppercase italic group-hover:text-blue-600 transition-colors"
                     style={{ color: item.textColor || '#0f172a' }}
                    >
                     {item.title}
                    </h3>
                    <div className="w-10 h-1 bg-blue-100 mb-6 rounded-full"></div>
                    <p className="text-slate-500 leading-relaxed mb-8 font-medium text-sm">{item.desc}</p>
                 </div>
                 
                 <div className="mt-8">
                    {item.price && (
                      <div className="flex items-baseline gap-1 mb-6">
                         <span className="text-[10px] font-black text-slate-400 uppercase">Rp</span>
                         <span className="text-4xl font-black text-slate-900 tracking-[-0.05em] leading-none">{item.price}</span>
                      </div>
                    )}
                    <a 
                      href={item.ctaLink || '#'} 
                      className="w-full py-5 text-white text-center rounded-2xl font-extrabold text-[10px] uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-xl shadow-blue-500/10 block"
                      style={{ backgroundColor: item.buttonColor || '#0f172a' }}
                    >
                      {item.ctaText}
                    </a>
                 </div>
              </div>
           ))}
        </div>
      </div>
    );
  },
  button_only: ({ data }) => {
    const alignment = data.badge === 'left' ? 'text-left' : (data.badge === 'right' ? 'text-right' : 'text-center');
    return (
      <div className={`max-w-5xl px-6 mx-auto py-8 ${alignment}`}>
        <a 
          href={data.ctaLink || '#'} 
          className="px-12 py-5 text-white font-extrabold rounded-2xl hover:brightness-110 transition-all shadow-xl uppercase tracking-[0.2em] text-[10px] inline-block"
          style={{ backgroundColor: data.buttonColor || '#4f46e5' }}
        >
          {data.ctaText || 'Klik Di Sini'}
        </a>
      </div>
    );
  }
};

export default function Renderer({ blocks, settings }: RendererProps) {
  if (!blocks) return null;

  const bgGlobal = settings?.globalBg || '#f0f7ff';

  return (
    <div className="font-sans selection:bg-pink selection:text-white min-h-screen w-full relative overflow-x-hidden" style={{ backgroundColor: bgGlobal }}>
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-0">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="flex flex-col w-full relative z-10">
        {blocks.map((block) => {
          const Component = blockMap[block.type];
          if (!Component) return <div key={block.id} className="p-8 text-red-500 text-center">Missing component: {block.type}</div>;
          return (
            <div key={block.id} className="w-full">
              <Component data={block.data} />
            </div>
          );
        })}
        {blocks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 min-h-screen">
             <div className="w-20 h-20 bg-white/50 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mb-6 shadow-xl border border-white/20">
                <span className="text-slate-400 text-4xl">📄</span>
             </div>
             <p className="text-slate-400 font-medium tracking-tight">Halaman ini belum memiliki konten.</p>
          </div>
        )}
      </div>
    </div>
  );
}
