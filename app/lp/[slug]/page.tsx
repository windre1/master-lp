import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTemplates } from '@/lib/products';

// High-Convert Components
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import Steps from '@/components/Steps';
import Demo from '@/components/Demo';
import Testimoni from '@/components/Testimoni';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const templates = await getTemplates();
  const template = templates.find((t) => t.slug === slug);

  if (!template) {
    return { title: 'Template Not Found' };
  }

  return {
    title: `${template.title} | Factory Sales Mode`,
    description: template.description,
  };
}

export default async function DynamicLP({ params }: PageProps) {
  const { slug } = await params;
  const templates = await getTemplates();
  const template = templates.find((t) => t.slug === slug);

  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">404 - NOT FOUND</h1>
        <p className="text-slate-500 mb-8 font-medium">Landing page tidak terdaftar di sistem kami.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <Hero 
        title={template.title}
        subtitle={template.description}
      />
      
      <SocialProof />
      
      <Problem />
      
      <Solution />
      
      {/* Feature Section is integrated within Solution or can be added separately */}
      <section className="py-24 bg-white border-t border-slate-50">
        <div className="container px-6 mx-auto">
           <div className="grid gap-8 md:grid-cols-3">
              {[
                { t: 'Kecepatan Cahaya', d: 'Sistem cloud-native yang didesain untuk performa tanpa lag.' },
                { t: 'Enkripsi Penuh', d: 'Data Anda aman dengan teknologi enkripsi militer terbaru.' },
                { t: 'Multi-Akun', d: 'Kelola puluhan aset digital Anda dalam satu dashboard pusat.' }
              ].map((f, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                   <h4 className="font-black text-slate-900 mb-3 tracking-tight">{f.t}</h4>
                   <p className="text-sm text-slate-500 leading-relaxed font-medium">{f.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <Steps />
      
      <Demo />
      
      <Testimoni />
      
      <Pricing price={template.price} />
      
      <FAQ />
      
      <FinalCTA />

      <footer className="py-12 border-t border-slate-50 bg-white">
        <div className="container px-6 mx-auto text-center">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Powered by Windre LP Factory System</p>
        </div>
      </footer>
    </main>
  );
}
