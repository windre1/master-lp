import Link from 'next/link';
import { Template } from '@/lib/products';

export default function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="group relative flex flex-col overflow-hidden transition-all bg-white border border-slate-200 rounded-2xl hover:shadow-2xl hover:border-indigo-200">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={template.image} 
          alt={template.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link 
            href={`/lp/${template.slug}`}
            className="px-6 py-2 bg-white text-indigo-900 font-bold rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            Preview Template
          </Link>
        </div>
      </div>
      <div className="flex flex-col p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 rounded-md">
            {template.category}
          </span>
        </div>
        <h3 className="mb-1 text-lg font-bold text-slate-900">{template.title}</h3>
        <p className="mb-4 text-xs text-slate-500 line-clamp-2">
          {template.description}
        </p>
        <button className="w-full py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors">
          Gunakan Template Ini
        </button>
      </div>
    </div>
  );
}
