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
};

export default function Renderer({ blocks }: RendererProps) {
  if (!blocks) return null;

  return (
    <div className="flex flex-col w-full">
      {blocks.map((block) => {
        const Component = blockMap[block.type];
        if (!Component) return <div key={block.id}>Unknown block: {block.type}</div>;
        return <Component key={block.id} data={block.data} />;
      })}
    </div>
  );
}
