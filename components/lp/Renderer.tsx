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
    <div className="flex flex-col w-full selection:bg-indigo-100 selection:text-indigo-900">
      {blocks.map((block) => {
        const Component = blockMap[block.type];
        if (!Component) return <div key={block.id}>Unknown block: {block.type}</div>;
        return <Component key={block.id} data={block.data} />;
      })}
    </div>
  );
}
