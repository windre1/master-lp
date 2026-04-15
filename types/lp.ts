export type BlockType = 
  | 'hero' 
  | 'socialProof' 
  | 'problem' 
  | 'solution' 
  | 'features' 
  | 'steps' 
  | 'demo' 
  | 'testimoni' 
  | 'pricing' 
  | 'faq' 
  | 'cta'
  | 'heading'
  | 'image_only'
  | 'text_only'
  | 'button_only';

export interface BlockData {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  videoUrl?: string;
  price?: number;
  items?: any[]; // for features, list, faq
  testimonials?: any[];
}

export interface Block {
  id: string;
  type: BlockType;
  data: BlockData;
}

export interface LandingPage {
  id?: string;
  slug: string;
  content: {
    blocks: Block[];
  };
  created_at?: string;
}
