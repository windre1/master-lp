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
      <div className="container px-6 mx-auto py-8">
        <h2 
          className={`font-black tracking-tighter ${alignment}`}
          style={{ 
            color: data.textColor || '#0f172a',
            fontSize: data.fontSize ? `${data.fontSize}px` : undefined,
            lineHeight: '1.1'
          }}
        >
          {data.title || 'Headline'}
        </h2>
      </div>
    );
  },
  text_only: ({ data }) => {
    const alignment = data.badge === 'left' ? 'text-left' : (data.badge === 'right' ? 'text-right' : 'text-center');
    return (
      <div className="container px-6 mx-auto py-6">
        <p 
          className={`leading-relaxed font-medium whitespace-pre-wrap ${alignment}`}
          style={{ 
            color: data.textColor || '#475569',
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
    return (
      <div className="container px-6 mx-auto py-8 flex">
        <div className={`w-full flex ${alignment}`}>
          {data.image ? (
            <img src={data.image} alt="Visual" className="max-w-full rounded-[2rem] shadow-xl h-auto" />
          ) : (
            <div className="w-full aspect-video bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 font-bold italic">
               Image Placeholder
            </div>
          )}
        </div>
      </div>
    );
  },
  video_only: ({ data }) => {
    const alignment = data.badge === 'left' ? 'justify-start' : (data.badge === 'right' ? 'justify-end' : 'justify-center');
    const videoId = data.videoUrl?.split('v=')[1]?.split('&')[0] || data.videoUrl?.split('/').pop();
    return (
      <div className="container px-6 mx-auto py-8">
        <div className={`flex ${alignment}`}>
          <div 
            className="aspect-video rounded-[2rem] overflow-hidden shadow-2xl bg-black border border-slate-100"
            style={{ width: data.videoWidth ? `${data.videoWidth}%` : '100%' }}
          >
            {videoId ? (
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600 font-bold italic">
                YouTube Video Placeholder
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
  price_list: ({ data }) => {
    const items = data.items || [];
    const isSingle = items.length === 1;
    const isDouble = items.length === 2;
    
    return (
      <div className="container px-6 mx-auto py-16">
        <div className={`flex flex-wrap justify-center gap-8`}>
           {items.map((item: any, i: number) => (
             <div 
              key={i} 
              className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300"
              style={{ 
                width: isSingle ? (data.priceListWidth ? `${data.priceListWidth}%` : '500px') : 'auto',
                maxWidth: isSingle ? '1000px' : (isDouble ? '450px' : '380px'),
                flex: isSingle ? 'none' : '1 1 320px'
              }}
             >
                <div>
                   <h3 
                    className="text-2xl font-black mb-4 tracking-tight"
                    style={{ color: item.textColor || '#0f172a' }}
                   >
                    {item.title}
                   </h3>
                   <p className="text-slate-800 leading-relaxed mb-8 font-medium">{item.desc}</p>
                </div>
                <a 
                  href={item.ctaLink || '#'} 
                  className="w-full py-4 text-white text-center rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-lg"
                  style={{ backgroundColor: item.buttonColor || '#0f172a' }}
                >
                  {item.ctaText}
                </a>
             </div>
           ))}
        </div>
      </div>
    );
  },
  button_only: ({ data }) => {
    const alignment = data.badge === 'left' ? 'text-left' : (data.badge === 'right' ? 'text-right' : 'text-center');
    return (
      <div className={`container px-6 mx-auto py-8 ${alignment}`}>
        <a 
          href={data.ctaLink || '#'} 
          className="px-12 py-5 text-white font-black rounded-2xl hover:brightness-110 transition-all shadow-xl uppercase tracking-widest text-xs inline-block"
          style={{ backgroundColor: data.buttonColor || '#4f46e5' }}
        >
          {data.ctaText || 'Klik Di Sini'}
        </a>
      </div>
    );
  }
};

export default function Renderer({ blocks }: RendererProps) {
  if (!blocks) return null;

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white min-h-screen w-full">
      <div className="flex flex-col w-full relative z-10">
        {blocks.map((block) => {
          const Component = blockMap[block.type];
          if (!Component) return <div key={block.id} className="p-8 text-red-500">Missing component: {block.type}</div>;
          return (
            <div key={block.id} className="w-full">
              <Component data={block.data} />
            </div>
          );
        })}
        {blocks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 bg-white">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <span className="text-slate-200 text-4xl">📄</span>
             </div>
             <p className="text-slate-400 font-medium">Halaman ini belum memiliki konten.</p>
          </div>
        )}
      </div>
    </div>
  );
}
