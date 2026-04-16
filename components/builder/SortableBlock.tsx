'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Trash2, ChevronUp, ChevronDown, ImageIcon, GripVertical, 
  Type, AlignLeft, Play, Link as LinkIcon, DollarSign, List 
} from 'lucide-react';
import { BlockType } from '@/types/lp';

interface SortableBlockProps {
  id: string;
  block: any;
  index: number;
  onUpdateBlock: (id: string, data: any) => void;
  onRemoveBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  onImageClick: (id: string) => void;
}

export function SortableBlock({ id, block, index, onUpdateBlock, onRemoveBlock, onMoveBlock, onImageClick }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  const updateData = (key: string, value: any) => {
    onUpdateBlock(id, { ...block.data, [key]: value });
  };

  const renderFields = () => {
    const type = block.type as BlockType;

    switch (type) {
      case 'heading':
        return (
          <Field label="Headline Text" icon={<Type className="w-3 h-3" />}>
            <input type="text" value={block.data.title || ''} onChange={e => updateData('title', e.target.value)} className="input-p text-2xl font-black" placeholder="Tulis judul di sini..." />
          </Field>
        );

      case 'text_only':
        return (
          <Field label="Paragraph Text" icon={<AlignLeft className="w-3 h-3" />}>
            <textarea rows={5} value={block.data.subtitle || ''} onChange={e => updateData('subtitle', e.target.value)} className="input-p leading-relaxed" placeholder="Tulis konten teks Anda..." />
          </Field>
        );

      case 'image_only':
        return <ImageField onImageClick={() => onImageClick(id)} image={block.data.image} />;

      case 'button_only':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Field label="Button Text" icon={<Type className="w-3 h-3" />}>
              <input type="text" value={block.data.ctaText || ''} onChange={e => updateData('ctaText', e.target.value)} className="input-p uppercase font-black tracking-widest text-xs" />
            </Field>
            <Field label="Button Link" icon={<LinkIcon className="w-3 h-3" />}>
              <input type="text" value={block.data.ctaLink || ''} onChange={e => updateData('ctaLink', e.target.value)} className="input-p font-mono text-xs text-indigo-600" />
            </Field>
          </div>
        );

      case 'hero':
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <Field label="Main Headline" icon={<Type className="w-3 h-3" />}>
                <input type="text" value={block.data.title || ''} onChange={e => updateData('title', e.target.value)} className="input-p" />
              </Field>
              <Field label="Description" icon={<AlignLeft className="w-3 h-3" />}>
                <textarea rows={3} value={block.data.subtitle || ''} onChange={e => updateData('subtitle', e.target.value)} className="input-p" />
              </Field>
            </div>
            <div className="space-y-4">
              <ImageField onImageClick={() => onImageClick(id)} image={block.data.image} />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="Button Text" value={block.data.ctaText || ''} onChange={e => updateData('ctaText', e.target.value)} className="input-p text-xs" />
                <input type="text" placeholder="Button URL" value={block.data.ctaLink || ''} onChange={e => updateData('ctaLink', e.target.value)} className="input-p text-xs" />
              </div>
            </div>
          </div>
        );

      case 'socialProof':
        return (
          <Field label="Social Proof Text" icon={<List className="w-3 h-3" />}>
            <input type="text" value={block.data.title || ''} onChange={e => updateData('title', e.target.value)} className="input-p" />
          </Field>
        );

      case 'problem':
      case 'solution':
      case 'testimoni':
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <Field label="Section Title" icon={<Type className="w-3 h-3" />}>
                <input type="text" value={block.data.title || ''} onChange={e => updateData('title', e.target.value)} className="input-p font-bold" />
              </Field>
              <Field label="Content Text" icon={<AlignLeft className="w-3 h-3" />}>
                <textarea rows={3} value={block.data.subtitle || ''} onChange={e => updateData('subtitle', e.target.value)} className="input-p" />
              </Field>
            </div>
            <ImageField onImageClick={() => onImageClick(id)} image={block.data.image} />
          </div>
        );

      case 'features':
      case 'steps':
      case 'faq':
        return (
          <div className="space-y-4">
             <Field label="Section Title" icon={<Type className="w-3 h-3" />}>
                <input type="text" value={block.data.title || ''} onChange={e => updateData('title', e.target.value)} className="input-p font-black" />
             </Field>
             <p className="text-[10px] text-slate-400 font-bold uppercase italic">Isi list dikelola secara otomatis mengikuti template.</p>
          </div>
        );

      case 'demo':
        return (
          <div className="grid gap-6 md:grid-cols-2">
             <Field label="Video Title" icon={<Type className="w-3 h-3" />}>
                <input type="text" value={block.data.title || ''} onChange={e => updateData('title', e.target.value)} className="input-p" />
             </Field>
             <Field label="YouTube URL" icon={<Play className="w-3 h-3" />}>
                <input type="text" value={block.data.videoUrl || ''} onChange={e => updateData('videoUrl', e.target.value)} className="input-p font-mono text-indigo-500" />
             </Field>
          </div>
        );

      case 'pricing':
        return (
          <div className="grid gap-6 md:grid-cols-3">
             <Field label="Plan Name" icon={<Type className="w-3 h-3" />}>
                <input type="text" value={block.data.title || ''} onChange={e => updateData('title', e.target.value)} className="input-p" />
             </Field>
             <Field label="Price (IDR)" icon={<DollarSign className="w-3 h-3" />}>
                <input type="number" value={block.data.price || 0} onChange={e => updateData('price', Number(e.target.value))} className="input-p font-black" />
             </Field>
             <Field label="Button Text" icon={<LinkIcon className="w-3 h-3" />}>
                <input type="text" value={block.data.ctaText || ''} onChange={e => updateData('ctaText', e.target.value)} className="input-p" />
             </Field>
          </div>
        );

      case 'cta':
        return (
          <div className="grid gap-6 md:grid-cols-2">
             <div className="space-y-4">
               <Field label="Final Headline" icon={<Type className="w-3 h-3" />}>
                  <input type="text" value={block.data.title || ''} onChange={e => updateData('title', e.target.value)} className="input-p" />
               </Field>
               <Field label="Closing Subtitle" icon={<AlignLeft className="w-3 h-3" />}>
                  <input type="text" value={block.data.subtitle || ''} onChange={e => updateData('subtitle', e.target.value)} className="input-p" />
               </Field>
             </div>
             <div className="space-y-4">
                <Field label="Button Text" icon={<LinkIcon className="w-3 h-3" />}>
                   <input type="text" value={block.data.ctaText || ''} onChange={e => updateData('ctaText', e.target.value)} className="input-p" />
                </Field>
                <Field label="Button URL" icon={<LinkIcon className="w-3 h-3" />}>
                   <input type="text" value={block.data.ctaLink || ''} onChange={e => updateData('ctaLink', e.target.value)} className="input-p" />
                </Field>
             </div>
          </div>
        );

      case 'target':
      case 'specs':
      case 'disclaimer':
      case 'comparison':
        return (
          <div className="space-y-4">
             <Field label="Section Title" icon={<Type className="w-3 h-3" />}>
                <input type="text" value={block.data.title || ''} onChange={e => updateData('title', e.target.value)} className="input-p font-black" />
             </Field>
             <p className="text-[10px] text-slate-500 font-bold uppercase italic border-l-2 border-cyan-500 pl-4 py-2 bg-white/5 rounded-r-xl">
               Isi konten detail (grid/list) untuk bagian ini dikelola otomatis mengikuti gaya desain Spartan Tube. Anda hanya perlu menyesuaikan judul bagian di atas jika perlu.
             </p>
          </div>
        );

      default:
        return <p className="text-slate-400 italic">No specific settings for this block.</p>;
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`group relative bg-[#0a1128]/40 backdrop-blur-xl border border-white/5 rounded-[3rem] shadow-2xl hover:border-[#00f2ff]/30 transition-all overflow-hidden ${isDragging ? 'z-50 scale-[1.02] shadow-cyan-500/20' : ''}`}
    >
      {/* Control Header */}
      <div className="px-10 py-5 bg-black/20 border-b border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-5">
            <div {...attributes} {...listeners} className="p-1 px-2 -ml-2 text-slate-600 hover:text-[#00f2ff] cursor-grab active:cursor-grabbing transition-colors">
               <GripVertical className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-3">
               <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-[#00f2ff] flex items-center justify-center font-black text-xs shadow-[0_0_10px_rgba(0,242,255,0.1)]">
                 {index + 1}
               </div>
               <span className="text-xs font-black text-white uppercase tracking-[0.25em] italic">{block.type}</span>
            </div>
         </div>
         <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
            <button onClick={() => onRemoveBlock(id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"><Trash2 className="w-5 h-5" /></button>
         </div>
      </div>

      {/* Editor Content */}
      <div className="p-10 space-y-8">
         {renderFields()}
      </div>

      <style jsx>{`
        .input-p {
          width: 100%;
          padding: 1rem 1.5rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 1.25rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.875rem;
          color: #e2e8f0;
          outline: none;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .input-p:focus {
          border-color: #00f2ff;
          background: rgba(0, 242, 255, 0.02);
          box-shadow: 0 0 20px rgba(0, 242, 255, 0.05);
        }
        .input-p::placeholder {
           color: #475569;
        }
      `}</style>
    </div>
  );
}

function Field({ label, icon, children }: { label: string, icon: any, children: any }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 italic">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}

function ImageField({ onImageClick, image }: { onImageClick: () => void, image?: string }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 italic">
        <ImageIcon className="w-3 h-3" /> Visual Asset
      </label>
      <div 
        onClick={onImageClick}
        className="aspect-video bg-black/20 rounded-[2.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-black/40 hover:border-[#00f2ff] hover:shadow-[0_0_30px_rgba(0,242,255,0.05)] transition-all group overflow-hidden relative"
      >
          {image ? (
            <>
              <img src={image} alt="Block" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-cyan-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                 <span className="bg-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase text-cyan-700 shadow-2xl">Update Asset</span>
              </div>
            </>
          ) : (
            <>
               <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-slate-600 group-hover:text-[#00f2ff] group-hover:border-[#00f2ff]/30 transition-all">
                  <ImageIcon className="w-6 h-6" />
               </div>
               <span className="text-[9px] font-black text-slate-600 group-hover:text-slate-400 uppercase tracking-widest transition-colors">Upload Asset</span>
            </>
          )}
      </div>
    </div>
  );
}
