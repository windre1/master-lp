export interface Template {
  slug: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export const templates: Template[] = [
  {
    slug: "saas-automation-tool",
    title: "SaaS Automation Tool",
    category: "Tools",
    description: "Template landing page untuk tools automation atau software as a service dengan fitur pricing table dan integrasi API.",
    price: 0,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "masterclass-online-course",
    title: "Masterclass & E-Course",
    category: "E-Course",
    description: "Desain khusus untuk menjual kelas online, lengkap dengan kurikulum modul dan testimonial alumni.",
    price: 0,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "premium-web-agency",
    title: "Premium Web Agency",
    category: "Service",
    description: "Landing page jasa pembuatan website profesional yang menonjolkan portfolio dan paket harga.",
    price: 0,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "digital-product-bundle",
    title: "Digital Product Bundle",
    category: "Digital Product",
    description: "Gunakan template ini untuk menjual e-book, aset digital, atau bundle template desain.",
    price: 0,
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "seo-optimization-expert",
    title: "SEO Optimization Expert",
    category: "Service",
    description: "Landing page jasa SEO yang fokus pada data, grafik kenaikan traffic, dan hasil nyata.",
    price: 0,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c1d9?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "trading-signals-app",
    title: "Trading Signals & Tools",
    category: "Tools",
    description: "Landing page untuk aplikasi trading atau tool finansial dengan dark mode yang canggih.",
    price: 0,
    image: "https://images.unsplash.com/photo-1611974714400-98565b93d395?q=80&w=1000&auto=format&fit=crop"
  }
];
