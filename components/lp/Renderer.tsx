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
  heading: ({ data }) => (
    <div className="container px-6 mx-auto py-8">
      <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
        {data.title || 'Headline'}
      </h2>
    </div>
  ),
  text_only: ({ data }) => (
    <div className="container px-6 mx-auto py-6">
      <p className="text-lg text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
        {data.subtitle || 'Tulis paragraf di sini...'}
      </p>
    </div>
  ),
  image_only: ({ data }) => (
    <div className="container px-6 mx-auto py-8">
      {data.image ? (
        <img src={data.image} alt="Visual" className="w-full rounded-[2rem] shadow-xl" />
      ) : (
        <div className="w-full aspect-video bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 font-bold italic">
           Image Placeholder
        </div>
      )}
    </div>
  ),
  button_only: ({ data }) => (
    <div className="container px-6 mx-auto py-8 text-center">
      <a 
        href={data.ctaLink || '#'} 
        className="px-12 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 uppercase tracking-widest text-xs inline-block"
      >
        {data.ctaText || 'Klik Di Sini'}
      </a>
    </div>
  )
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
