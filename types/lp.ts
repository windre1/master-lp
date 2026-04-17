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
  | 'button_only'
  | 'comparison'
  | 'target'
  | 'specs'
  | 'video_only'
  | 'price_list'
  | 'disclaimer';

export interface BlockData {
  title?: string;
  subtitle?: string;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  videoUrl?: string;
  price?: number;
  items?: any[]; // for features, list, faq
  testimonials?: any[];
  closing?: string;
  highlinedClosing?: string;
  fontSize?: string;
  textColor?: string;
  buttonColor?: string;
  videoWidth?: string;
  imageWidth?: string;
  priceListWidth?: string;
  traditional?: {
    title: string;
    items: string[];
    footer: string;
  };
  spartan?: {
    title: string;
    items: string[];
    footer: string;
  };
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
