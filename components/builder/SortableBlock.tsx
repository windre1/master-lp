'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Grip, 
  Trash2, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Layout,
  Zap,
  Play,
  Layout as ImageIcon,
  Layers,
  Upload
} from 'lucide-react';
import { Block } from '@/types/lp';
import { uploadImage } from '@/lib/data';

interface SortableBlockProps {
  id: string;
  block: Block;
  index: number;
  onUpdateBlock: (id: string, data: any) => void;
  onRemoveBlock: (id: string) => void;
}

export function SortableBlock({ 
  id, block, onUpdateBlock, onRemoveBlock 
}: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    opacity: isDragging ? 0.3 : 1
  };

  const updateData = (key: string, value: any) => {
    onUpdateBlock(id, { ...block.data, [key]: value });
  };

  const currentAlign = block.data.badge || 'center';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const url = await uploadImage(file);
      updateData('image', url);
    } catch (err: any) {
      alert("Gagal upload: " + err.message);
    }
  };

  const renderFields = () => {
    switch (block.type) {
      case 'heading':
        return (
          <div className="space-y-4">
            <input 
              type="text" 
              value={block.data.title || ''} 
              onChange={e => updateData('title', e.target.value)} 
              placeholder="Ketik judul di sini..."
              style={{ 
                color: block.data.textColor || '#0f172a',
                fontSize: block.data.fontSize ? `${block.data.fontSize}px` : '1.125rem'
              }}
              className={`w-full bg-transparent border-none outline-none font-bold placeholder:text-slate-400 ${currentAlign === 'left' ? 'text-left' : (currentAlign === 'right' ? 'text-right' : 'text-center')}`}
            />
            <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
               <div className="flex items-center gap-2">
                  <Layout className="w-3 h-3 text-slate-500" />
                  <input 
                    type="range" min="14" max="72" 
                    value={block.data.fontSize || 24} 
                    onChange={e => updateData('fontSize', e.target.value)}
                    className="w-20 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[9px] font-bold text-slate-600">{block.data.fontSize || 24}px</span>
               </div>
               <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-slate-500" />
                  <input 
                    type="color" 
                    value={block.data.textColor || '#0f172a'} 
                    onChange={e => updateData('textColor', e.target.value)}
                    className="w-4 h-4 rounded-full overflow-hidden border-none p-0 cursor-pointer"
                  />
               </div>
            </div>
          </div>
        );
      case 'text_only':
        return (
          <div className="space-y-4">
            <textarea 
              rows={3}
              value={block.data.subtitle || ''} 
              onChange={e => updateData('subtitle', e.target.value)} 
              placeholder="Tulis paragraf di sini..."
              style={{ 
                color: block.data.textColor || '#1e293b',
                fontSize: block.data.fontSize ? `${block.data.fontSize}px` : '0.875rem'
              }}
              className={`w-full bg-transparent border-none outline-none leading-relaxed placeholder:text-slate-400 resize-none ${currentAlign === 'left' ? 'text-left' : (currentAlign === 'right' ? 'text-right' : 'text-center')}`}
            />
            <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
               <div className="flex items-center gap-2">
                  <Layout className="w-3 h-3 text-slate-500" />
                  <input 
                    type="range" min="10" max="24" 
                    value={block.data.fontSize || 14} 
                    onChange={e => updateData('fontSize', e.target.value)}
                    className="w-20 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[9px] font-bold text-slate-600">{block.data.fontSize || 14}px</span>
               </div>
               <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-slate-500" />
                  <input 
                    type="color" 
                    value={block.data.textColor || '#1e293b'} 
                    onChange={e => updateData('textColor', e.target.value)}
                    className="w-4 h-4 rounded-full overflow-hidden border-none p-0 cursor-pointer"
                  />
               </div>
            </div>
          </div>
        );
      case 'image_only':
        return (
          <div className="space-y-4">
            <div className={`flex ${currentAlign === 'left' ? 'justify-start' : (currentAlign === 'right' ? 'justify-end' : 'justify-center')}`}>
              <div className="relative group w-full max-w-sm aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4 overflow-hidden">
                {block.data.image ? (
                  <>
                    <img src={block.data.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <label className="p-2 bg-white rounded-full cursor-pointer hover:bg-slate-50 transition-all text-slate-900">
                          <Upload className="w-4 h-4" />
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                       </label>
                       <button 
                        onClick={() => updateData('image', '')}
                        className="p-2 bg-white rounded-full text-red-500 hover:bg-slate-50 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <label className="flex flex-col items-center text-slate-400 cursor-pointer hover:text-slate-600 transition-all">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-center">Klik untuk Upload Gambar<br/><span className="text-[8px] opacity-60">atau tempel link di bawah</span></p>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
               <Upload className="w-3 h-3 shrink-0" />
               <input 
                 type="text" 
                 value={block.data.image || ''} 
                 onChange={e => updateData('image', e.target.value)}
                 className="flex-1 bg-slate-50 px-3 py-1.5 rounded-lg outline-none text-slate-600 text-[10px]"
                 placeholder="Tempel URL gambar di sini..."
               />
            </div>
          </div>
        );
      case 'video_only':
        return (
          <div className="space-y-4">
            <div className={`flex ${currentAlign === 'left' ? 'justify-start' : (currentAlign === 'right' ? 'justify-end' : 'justify-center')}`}>
              <div 
                className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl aspect-video relative flex items-center justify-center border border-slate-800"
                style={{ width: block.data.videoWidth ? `${block.data.videoWidth}%` : '100%' }}
              >
                {block.data.videoUrl ? (
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${block.data.videoUrl.split('v=')[1]?.split('&')[0] || block.data.videoUrl.split('/').pop()}`}
                    title="YouTube preview"
                  />
                ) : (
                  <div className="flex flex-col items-center text-slate-600">
                    <Play className="w-10 h-10 mb-2 opacity-20" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Video YouTube</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                <Play className="w-3 h-3 shrink-0" />
                <input 
                  type="text" 
                  value={block.data.videoUrl || ''} 
                  onChange={e => updateData('videoUrl', e.target.value)}
                  className="flex-1 bg-slate-50 px-3 py-1.5 rounded-lg outline-none text-slate-600 text-[10px]"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <Layers className="w-3 h-3 text-slate-400" />
                    <input 
                      type="range" min="30" max="100" 
                      value={block.data.videoWidth || 100} 
                      onChange={e => updateData('videoWidth', e.target.value)}
                      className="w-24 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-[9px] font-bold text-slate-400">{block.data.videoWidth || 100}%</span>
                 </div>
              </div>
            </div>
          </div>
        );
      case 'price_list':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {(block.data.items || []).map((item, idx) => (
                 <div key={idx} className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 relative group/item shadow-sm">
                    <button 
                      onClick={() => {
                        const newItems = [...(block.data.items || [])];
                        newItems.splice(idx, 1);
                        updateData('items', newItems);
                      }}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-all z-10"
                    >
                       <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-4">
                       <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                          <input 
                            type="text" 
                            value={item.title || ''} 
                            onChange={(e) => {
                              const newItems = [...(block.data.items || [])];
                              newItems[idx] = { ...item, title: e.target.value };
                              updateData('items', newItems);
                            }}
                            style={{ color: item.textColor || '#0f172a' }}
                            placeholder="Judul"
                            className="w-full bg-transparent font-black text-sm outline-none placeholder:text-slate-300"
                          />
                          <input 
                            type="color" 
                            value={item.textColor || '#0f172a'} 
                            onChange={(e) => {
                              const newItems = [...(block.data.items || [])];
                              newItems[idx] = { ...item, textColor: e.target.value };
                              updateData('items', newItems);
                            }}
                            className="w-4 h-4 rounded-full overflow-hidden border-none p-0 cursor-pointer shrink-0"
                          />
                       </div>
                       <textarea 
                         rows={2}
                         value={item.desc || ''} 
                         onChange={(e) => {
                           const newItems = [...(block.data.items || [])];
                           newItems[idx] = { ...item, desc: e.target.value };
                           updateData('items', newItems);
                         }}
                         placeholder="Keterangan..."
                         className="w-full bg-transparent text-xs text-slate-800 font-medium outline-none resize-none leading-relaxed"
                       />
                       <div className="pt-4 space-y-3">
                          <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl">
                            <input 
                              type="text" 
                              value={item.ctaText || ''} 
                              onChange={(e) => {
                                const newItems = [...(block.data.items || [])];
                                newItems[idx] = { ...item, ctaText: e.target.value };
                                updateData('items', newItems);
                              }}
                              placeholder="Teks Tombol"
                              className="flex-1 bg-transparent font-black text-[9px] uppercase tracking-widest text-slate-900 outline-none"
                            />
                            <input 
                              type="color" 
                              value={item.buttonColor || '#0f172a'} 
                              onChange={(e) => {
                                const newItems = [...(block.data.items || [])];
                                newItems[idx] = { ...item, buttonColor: e.target.value };
                                updateData('items', newItems);
                              }}
                              className="w-4 h-4 rounded-full overflow-hidden border-none p-0 cursor-pointer"
                            />
                          </div>
                          <input 
                            type="text" 
                            value={item.ctaLink || ''} 
                            onChange={(e) => {
                              const newItems = [...(block.data.items || [])];
                              newItems[idx] = { ...item, ctaLink: e.target.value };
                              updateData('items', newItems);
                            }}
                            placeholder="Link URL (https://...)"
                            className="w-full bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl text-[9px] text-slate-900 font-bold outline-none"
                          />
                       </div>
                    </div>
                 </div>
               ))}
               {(block.data.items || []).length < 3 && (
                 <button 
                   onClick={() => {
                     const newItems = [...(block.data.items || []), { title: 'Paket Baru', desc: 'Keterangan paket...', ctaText: 'Pilih', ctaLink: '#', textColor: '#0f172a', buttonColor: '#0f172a' }];
                     updateData('items', newItems);
                   }}
                   className="border-2 border-dashed border-slate-300 rounded-[2rem] flex flex-col items-center justify-center py-10 text-slate-500 hover:text-slate-900 hover:border-slate-900 transition-all bg-white shadow-sm"
                 >
                    <span className="text-xl font-black">+</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Tambah Kolom</span>
                 </button>
               )}
            </div>
          </div>
        );
      case 'button_only':
      case 'cta':
        return (
          <div className="space-y-4">
            <div className={`flex ${currentAlign === 'left' ? 'justify-start' : (currentAlign === 'right' ? 'justify-end' : 'justify-center')}`}>
              <div 
                className="px-10 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg min-w-[200px] text-center"
                style={{ backgroundColor: block.data.buttonColor || '#0f172a', color: '#ffffff' }}
              >
                <input 
                  type="text" 
                  value={block.data.ctaText || ''} 
                  onChange={e => updateData('ctaText', e.target.value)}
                  className="bg-transparent border-none outline-none text-center w-full"
                  placeholder="TOMBOL"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-slate-50 pt-4">
              <div className="flex-1 flex items-center gap-2 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                 <span className="shrink-0">URL</span>
                 <input 
                   type="text" 
                   value={block.data.ctaLink || ''} 
                   onChange={e => updateData('ctaLink', e.target.value)}
                   className="flex-1 bg-slate-100 px-3 py-1.5 rounded-lg outline-none text-slate-600 text-[10px]"
                   placeholder="https://..."
                 />
              </div>
              <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-slate-400" />
                  <input 
                    type="color" 
                    value={block.data.buttonColor || '#0f172a'} 
                    onChange={e => updateData('buttonColor', e.target.value)}
                    className="w-4 h-4 rounded-full overflow-hidden border-none p-0 cursor-pointer"
                  />
               </div>
            </div>
          </div>
        );
      default:
        // Use currentAlign for layout blocks too
        return (
          <div className="space-y-6">
            <input 
              type="text" 
              value={block.data.title || ''} 
              onChange={e => updateData('title', e.target.value)} 
              placeholder={`Judul ${block.type}...`}
              className={`w-full bg-transparent border-none outline-none font-bold text-lg text-slate-800 placeholder:text-slate-200 ${currentAlign === 'left' ? 'text-left' : (currentAlign === 'right' ? 'text-right' : 'text-center')}`}
            />
            {block.data.image && (
               <div className="w-full h-32 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                  <img src={block.data.image} alt="Preview" className="w-full h-full object-cover" />
               </div>
            )}
            <p className="text-[9px] text-slate-400 font-bold uppercase italic text-center">Konten grafis dikelola otomatis</p>
          </div>
        );
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden group mb-6 hover:border-blue-200 transition-all"
    >
      {/* Card Header matching image */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div {...listeners} {...attributes} className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-400 p-1">
             <Grip className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-2 border-l border-slate-200 leading-none">
            {block.type.replace('_only', '').toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex bg-slate-200/50 p-1 rounded-lg gap-0.5">
            {[
              { val: 'left', icon: AlignLeft },
              { val: 'center', icon: AlignCenter },
              { val: 'right', icon: AlignRight }
            ].map((btn) => (
              <button 
                key={btn.val}
                onClick={() => updateData('badge', btn.val)}
                className={`p-1 rounded transition-all ${currentAlign === btn.val ? 'bg-white shadow-sm text-slate-900 border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <btn.icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
          <button 
            onClick={() => onRemoveBlock(id)}
            className="p-1.5 text-slate-300 hover:text-red-500 transition-colors ml-2"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-8">
        {renderFields()}
      </div>
    </div>
  );
}
