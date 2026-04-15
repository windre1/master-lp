import Link from 'next/link';
import { Template } from '@/lib/products';

interface TemplateCardProps {
  template: Template;
  onEdit: (template: Template) => void;
}

export default function TemplateCard({ template, onEdit }: TemplateCardProps) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(template.price);

  return (
    <div className="group relative flex flex-col overflow-hidden transition-all bg-white border border-slate-200 rounded-3xl hover:shadow-2xl hover:border-indigo-200">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={template.image} 
          alt={template.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <Link 
            href={`/lp/${template.slug}`}
            className="px-5 py-2 bg-white text-indigo-900 text-xs font-bold rounded-full shadow-lg hover:bg-slate-50 transition-all"
          >
            Live Preview
          </Link>
          <button 
            onClick={() => onEdit(template)}
            className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-all"
          >
            Edit Content
          </button>
        </div>
      </div>
      <div className="flex flex-col p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 rounded-lg">
            {template.category}
          </span>
          <span className="text-sm font-bold text-emerald-600">{formattedPrice}</span>
        </div>
        <h3 className="mb-2 text-xl font-black text-slate-800 tracking-tight">{template.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {template.description}
        </p>
        <div className="flex gap-2">
           <button 
             onClick={() => onEdit(template)}
             className="flex-1 py-3 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl hover:bg-slate-200 transition-all uppercase tracking-wider"
           >
            Settings
           </button>
           <Link 
             href={`/lp/${template.slug}`}
             className="flex-1 py-3 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-all uppercase tracking-wider text-center"
           >
            Gunakan
           </Link>
        </div>
      </div>
    </div>
  );
}
