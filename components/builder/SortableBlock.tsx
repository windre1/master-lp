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

      default:
        return <p className="text-slate-400 italic">No specific settings for this block.</p>;
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`group relative bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all overflow-hidden ${isDragging ? 'z-50 scale-[1.02] shadow-2xl' : ''}`}
    >
      {/* Control Header */}
      <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div {...attributes} {...listeners} className="p-1 px-2 -ml-2 text-slate-300 hover:text-indigo-600 cursor-grab active:cursor-grabbing">
               <GripVertical className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-[10px]">
                 {index + 1}
               </div>
               <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] italic">{block.type}</span>
            </div>
         </div>
         <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
            <button onClick={() => onRemoveBlock(id)} className="p-2.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100"><Trash2 className="w-4 h-4" /></button>
         </div>
      </div>

      {/* Editor Content */}
      <div className="p-10">
         {renderFields()}
      </div>

      <style jsx>{`
        .input-p {
          width: 100%;
          padding: 0.8rem 1.2rem;
          background: #f8fafc;
          border-radius: 1rem;
          border: 1px solid #f1f5f9;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }
        .input-p:focus {
          border-color: #4f46e5;
          background: white;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
      `}</style>
    </div>
  );
}

function Field({ label, icon, children }: { label: string, icon: any, children: any }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2 italic">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}

function ImageField({ onImageClick, image }: { onImageClick: () => void, image?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2 italic">
        <ImageIcon className="w-3 h-3" /> Visual Asset
      </label>
      <div 
        onClick={onImageClick}
        className="aspect-video bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white hover:border-indigo-500 hover:shadow-lg transition-all group overflow-hidden relative"
      >
          {image ? (
            <>
              <img src={image} alt="Block" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-indigo-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                 <span className="bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase text-indigo-600">Ganti Gambar</span>
              </div>
            </>
          ) : (
            <>
               <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-indigo-600 transition-all">
                  <ImageIcon className="w-5 h-5" />
               </div>
               <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Upload Asset</span>
            </>
          )}
      </div>
    </div>
  );
}
