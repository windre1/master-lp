'use client';

import React, { useState } from 'react';
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
  Upload,
  Bold,
  Italic,
  Underline
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

  const TextToolbar = ({ field }: { field: string }) => {
    const isBold = block.data[`${field}Bold`];
    const isItalic = block.data[`${field}Italic`];
    const isUnderline = block.data[`${field}Underline`];

    return (
      <div className="flex items-center gap-1">
        <button 
          onClick={() => updateData(`${field}Bold`, !isBold)}
          className={`p-1.5 rounded-lg transition-all ${isBold ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400 hover:text-slate-600'}`}
          title="Bold"
        >
          <Bold className="w-3 h-3" />
        </button>
        <button 
          onClick={() => updateData(`${field}Italic`, !isItalic)}
          className={`p-1.5 rounded-lg transition-all ${isItalic ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400 hover:text-slate-600'}`}
          title="Italic"
        >
          <Italic className="w-3 h-3" />
        </button>
        <button 
          onClick={() => updateData(`${field}Underline`, !isUnderline)}
          className={`p-1.5 rounded-lg transition-all ${isUnderline ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400 hover:text-slate-600'}`}
          title="Underline"
        >
          <Underline className="w-3 h-3" />
        </button>
      </div>
    );
  };

  const currentAlign = block.data.badge || 'center';

  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const url = await uploadImage(file);
      updateData('image', url);
    } catch (err: any) {
      // Fallback: show image locally via FileReader if upload fails
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) updateData('image', ev.target.result as string);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
      // Reset input value so same file can be re-selected
      e.target.value = '';
    }
  };

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const renderFields = () => {
    switch (block.type) {
      case 'features':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Judul Keunggulan</label>
                  <TextToolbar field="title" />
               </div>
               <input 
                 type="text" 
                 value={block.data.title || ''} 
                 onChange={e => updateData('title', e.target.value)} 
                 className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none font-bold text-slate-800 text-lg"
               />
            </div>
            
            <div className="space-y-4 pt-4 border-t border-slate-50">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Daftar Fitur / Benefit</label>
               <div className="grid gap-3">
                  {(block.data.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                       <div className="flex-1 space-y-2">
                        <input 
                          type="text" 
                          value={item.t || item.title || ''} 
                          onChange={(e) => {
                            const newItems = [...(block.data.items || [])];
                            newItems[idx] = { ...item, t: e.target.value };
                            updateData('items', newItems);
                          }}
                          placeholder="Judul"
                          className="w-full bg-white border border-slate-100 px-3 py-2 rounded-lg font-bold text-xs outline-none"
                        />
                        <textarea 
                          rows={2}
                          value={item.d || item.desc || ''} 
                          onChange={(e) => {
                            const newItems = [...(block.data.items || [])];
                            newItems[idx] = { ...item, d: e.target.value };
                            updateData('items', newItems);
                          }}
                          placeholder="Deskripsi"
                          className="w-full bg-white border border-slate-100 px-3 py-2 rounded-lg text-[10px] outline-none resize-none"
                        />
                       </div>
                       <button onClick={() => updateData('items', (block.data.items || []).filter((_: any, i: number) => i !== idx))} className="p-2 text-slate-300 hover:text-red-500">
                          <Trash2 className="w-3 h-3" />
                       </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => updateData('items', [...(block.data.items || []), { t: 'Fitur Baru', d: 'Keterangan...' }])}
                    className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[9px] font-black text-slate-400 hover:text-slate-600"
                  >
                    + Tambah Fitur
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
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
      case 'hero':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Headline Utama</label>
                  <TextToolbar field="title" />
               </div>
               <textarea 
                rows={2}
                value={block.data.title || ''} 
                onChange={e => updateData('title', e.target.value)} 
                placeholder="Hook yang menarik..."
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none font-bold text-slate-900 placeholder:text-slate-200 text-lg leading-tight"
               />
            </div>
            
            <div className="space-y-4">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sub-Headline</label>
               <textarea 
                rows={2}
                value={block.data.subtitle || ''} 
                onChange={e => updateData('subtitle', e.target.value)} 
                placeholder="Penjelasan singkat..."
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none text-sm text-slate-600 font-medium"
               />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
               <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Teks Tombol</label>
                  <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl">
                    <input 
                      type="text" 
                      value={block.data.ctaText || ''} 
                      onChange={e => updateData('ctaText', e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none font-bold text-[10px]"
                      placeholder="Amankan Slot..."
                    />
                    <input 
                      type="color" 
                      value={block.data.buttonColor || '#0f172a'} 
                      onChange={e => updateData('buttonColor', e.target.value)}
                      className="w-4 h-4 rounded-full overflow-hidden border-none p-0 cursor-pointer"
                    />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Link Tombol</label>
                  <input 
                    type="text" 
                    value={block.data.ctaLink || ''} 
                    onChange={e => updateData('ctaLink', e.target.value)}
                    className="w-full bg-slate-100 px-4 py-2.5 rounded-xl outline-none text-[10px] font-bold"
                    placeholder="#cta-section atau https://..."
                  />
               </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Gambar Hero (Opsional)</label>
               <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={block.data.image || ''} 
                    onChange={e => updateData('image', e.target.value)}
                    className="flex-1 bg-slate-50 px-4 py-2.5 rounded-xl outline-none text-[10px] text-slate-500"
                    placeholder="Paste URL gambar..."
                  />
                  <label 
                    className="p-2.5 bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-slate-800 transition-all"
                    onClick={e => e.stopPropagation()}
                  >
                    <Upload className="w-4 h-4" />
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-2">
                     <Layers className="w-3 h-3 text-slate-400" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Lebar Gambar</span>
                     <input 
                       type="range" min="30" max="100" 
                       value={block.data.imageWidth || 100} 
                       onChange={e => updateData('imageWidth', e.target.value)}
                       className="flex-1 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                     />
                     <span className="text-[9px] font-bold text-slate-600">{block.data.imageWidth || 100}%</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                  <div className="space-y-4">
                     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ukuran Judul</label>
                     <div className="flex items-center gap-2">
                        <Layout className="w-3 h-3 text-slate-500" />
                        <input 
                          type="range" min="20" max="100" 
                          value={block.data.fontSize || 48} 
                          onChange={e => updateData('fontSize', e.target.value)}
                          className="flex-1 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-[9px] font-bold text-slate-600">{block.data.fontSize || 48}px</span>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Warna Text</label>
                     <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-slate-500" />
                        <input 
                          type="color" 
                          value={block.data.textColor || '#0f172a'} 
                          onChange={e => updateData('textColor', e.target.value)}
                          className="w-8 h-8 rounded-xl overflow-hidden border-none p-0 cursor-pointer"
                        />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'heading':
        return (
          <div className="space-y-4">
            <div className="flex justify-end mb-2">
              <TextToolbar field="title" />
            </div>
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
            <div className="flex justify-end mb-2">
              <TextToolbar field="subtitle" />
            </div>
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
              <div 
                className="relative group aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4 overflow-hidden shadow-inner"
                style={{ width: block.data.imageWidth ? `${block.data.imageWidth}%` : '100%' }}
              >
                {block.data.image ? (
                  <>
                    <img src={block.data.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <label 
                         className="p-2 bg-white rounded-full cursor-pointer hover:bg-slate-50 transition-all text-slate-900"
                         onClick={e => e.stopPropagation()}
                       >
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
                  <label 
                    className="flex flex-col items-center text-slate-400 cursor-pointer hover:text-slate-600 transition-all"
                    onClick={e => e.stopPropagation()}
                  >
                    <Layout className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-center">
                      {uploading ? 'Mengupload...' : 'Klik untuk Upload Gambar'}
                    </p>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-4 border-t border-slate-50">
               <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-2">
                     <Layers className="w-3 h-3 text-slate-400" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Lebar Gambar</span>
                     <input 
                       type="range" min="10" max="100" 
                       value={block.data.imageWidth || 100} 
                       onChange={e => updateData('imageWidth', e.target.value)}
                       className="flex-1 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                     />
                     <span className="text-[9px] font-bold text-slate-600">{block.data.imageWidth || 100}%</span>
                  </div>
               </div>
               <div className="flex items-center gap-2 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                  <span className="shrink-0">Atau URL</span>
                  <input 
                    type="text" 
                    value={block.data.image || ''} 
                    onChange={e => updateData('image', e.target.value)}
                    className="flex-1 bg-slate-50 px-3 py-1.5 rounded-lg outline-none text-slate-600 text-[10px]"
                    placeholder="https://..."
                  />
               </div>
            </div>
          </div>
        );
      case 'video_only':
        const videoId = getYouTubeId(block.data.videoUrl || '');
        return (
          <div className="space-y-4">
            <div className={`flex ${currentAlign === 'left' ? 'justify-start' : (currentAlign === 'right' ? 'justify-end' : 'justify-center')}`}>
              <div 
                className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl aspect-video relative flex items-center justify-center border border-slate-800"
                style={{ width: block.data.videoWidth ? `${block.data.videoWidth}%` : '100%' }}
              >
                {videoId ? (
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
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
            <div className={`flex flex-wrap justify-center gap-6`}>
               {(block.data.items || []).map((item, idx) => (
                 <div 
                  key={idx} 
                  className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 relative group/item shadow-sm flex flex-col items-center text-center"
                  style={{ 
                    width: (block.data.items || []).length === 1 && block.data.priceListWidth ? `${block.data.priceListWidth}%` : 'auto',
                    minWidth: '280px',
                    flex: (block.data.items || []).length === 1 ? 'none' : '1 1 280px',
                    maxWidth: (block.data.items || []).length === 3 ? '100%' : '400px'
                  }}
                 >
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

                    <div className="space-y-4 w-full">
                        <div className="flex flex-col items-center gap-2 border-b border-slate-50 pb-4">
                           <div className="flex items-center gap-2 w-full justify-center">
                              <input 
                                type="text" 
                                value={item.title || ''} 
                                onChange={(e) => {
                                  const newItems = [...(block.data.items || [])];
                                  newItems[idx] = { ...item, title: e.target.value };
                                  updateData('items', newItems);
                                }}
                                style={{ color: item.textColor || '#0f172a' }}
                                placeholder="Judul Paket"
                                className="bg-transparent font-black text-sm outline-none placeholder:text-slate-300 text-center flex-1"
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
                        </div>
                        <div className="flex items-center justify-center gap-1 border-b border-slate-50 pb-2">
                           <span className="text-[10px] font-black text-slate-300">Rp</span>
                           <input 
                             type="text" 
                             value={item.price || ''} 
                             onChange={(e) => {
                               const newItems = [...(block.data.items || [])];
                               newItems[idx] = { ...item, price: e.target.value };
                               updateData('items', newItems);
                             }}
                             placeholder="Harga"
                             className="bg-transparent font-black text-xs outline-none text-blue-600 placeholder:text-slate-200 text-center w-24"
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
                         className="w-full bg-slate-50 p-3 rounded-xl text-xs text-slate-800 font-medium outline-none resize-none leading-relaxed text-center"
                       />
                       <div className="pt-4 space-y-3 w-full">
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
                              className="flex-1 bg-transparent font-black text-[9px] uppercase tracking-widest text-slate-900 outline-none text-center"
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
                            className="w-full bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl text-[9px] text-slate-900 font-bold outline-none text-center"
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
                   className="border-2 border-dashed border-slate-300 rounded-[2rem] flex flex-col items-center justify-center p-10 text-slate-500 hover:text-slate-900 hover:border-slate-900 transition-all bg-white shadow-sm min-w-[250px]"
                 >
                    <span className="text-xl font-black">+</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Tambah Kolom</span>
                 </button>
               )}
            </div>
            
            {(block.data.items || []).length === 1 && (
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                 <div className="flex items-center gap-2">
                    <Layers className="w-3 h-3 text-slate-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Lebar Kolom Tunggal</span>
                    <input 
                      type="range" min="30" max="100" 
                      value={block.data.priceListWidth || 100} 
                      onChange={e => updateData('priceListWidth', e.target.value)}
                      className="w-24 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-[9px] font-bold text-slate-600">{block.data.priceListWidth || 100}%</span>
                 </div>
              </div>
            )}
          </div>
        );
      case 'button_only':
      case 'cta':
        return (
          <div className="space-y-6">
            {block.type === 'cta' && (
              <>
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Headline CTA</label>
                      <TextToolbar field="title" />
                   </div>
                   <textarea 
                    rows={2}
                    value={block.data.title || ''} 
                    onChange={e => updateData('title', e.target.value)} 
                    placeholder="Waktunya Scale Bisnis..."
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none font-bold text-slate-900 text-lg leading-tight"
                   />
                </div>
                
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sub-Headline</label>
                      <TextToolbar field="subtitle" />
                   </div>
                   <textarea 
                    rows={2}
                    value={block.data.subtitle || ''} 
                    onChange={e => updateData('subtitle', e.target.value)} 
                    placeholder="Bukan sekadar tools..."
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none text-sm text-slate-600 font-medium"
                   />
                </div>
              </>
            )}

            <div className="pt-4 border-t border-slate-50">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Pengaturan Tombol</label>
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

                <div className="flex items-center justify-between gap-4 border-t border-slate-50 mt-6 pt-4">
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
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Layout className="w-3 h-3 text-slate-400" />
                        <input 
                          type="range" min="12" max="32" 
                          value={block.data.fontSize || 14} 
                          onChange={e => updateData('fontSize', e.target.value)}
                          className="w-16 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
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
            </div>
          </div>
        );
      case 'solution':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Headline Solusi</label>
                  <TextToolbar field="title" />
               </div>
               <textarea 
                rows={2}
                value={block.data.title || ''} 
                onChange={e => updateData('title', e.target.value)} 
                placeholder="IDE → ANALISA → PRODUKSI..."
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none font-bold text-slate-800 text-lg leading-tight text-center"
               />
            </div>
            
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sub-Headline</label>
                  <TextToolbar field="subtitle" />
               </div>
               <textarea 
                rows={2}
                value={block.data.subtitle || ''} 
                onChange={e => updateData('subtitle', e.target.value)} 
                placeholder="Bukan sekadar tools..."
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none text-sm text-slate-600 font-medium text-center"
               />
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Daftar Poin Solusi</label>
               <div className="grid grid-cols-1 gap-3">
                  {(block.data.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                       <div className="flex-1 space-y-2">
                        <input 
                          type="text" 
                          value={item.t || item.title || ''} 
                          onChange={(e) => {
                            const newItems = [...(block.data.items || [])];
                            newItems[idx] = { ...item, t: e.target.value };
                            updateData('items', newItems);
                          }}
                          placeholder="Judul"
                          className="w-full bg-white border border-slate-100 px-3 py-2 rounded-lg font-bold text-[10px] outline-none"
                        />
                        <textarea 
                          rows={2}
                          value={item.d || item.desc || ''} 
                          onChange={(e) => {
                            const newItems = [...(block.data.items || [])];
                            newItems[idx] = { ...item, d: e.target.value };
                            updateData('items', newItems);
                          }}
                          placeholder="Keterangan"
                          className="w-full bg-white border border-slate-100 px-3 py-2 rounded-lg text-[10px] outline-none resize-none"
                        />
                       </div>
                       <button 
                         onClick={() => {
                           const newItems = [...(block.data.items || [])];
                           newItems.splice(idx, 1);
                           updateData('items', newItems);
                         }}
                         className="p-2 text-slate-300 hover:text-red-500"
                       >
                          <Trash2 className="w-3 h-3" />
                       </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => updateData('items', [...(block.data.items || []), { t: 'Solusi Baru', d: 'Keterangan...' }])}
                    className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[9px] font-black text-slate-400 hover:text-slate-600"
                  >
                    + Tambah Solusi
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-50">
               <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Warna Text</label>
                  <input 
                    type="color" 
                    value={block.data.textColor || '#ffffff'} 
                    onChange={e => updateData('textColor', e.target.value)}
                    className="w-full h-8 rounded-xl overflow-hidden border-none p-0 cursor-pointer shadow-sm"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Warna Bag</label>
                  <input 
                    type="color" 
                    value={block.data.bgColor || '#0f172a'} 
                    onChange={e => updateData('bgColor', e.target.value)}
                    className="w-full h-8 rounded-xl overflow-hidden border-none p-0 cursor-pointer shadow-sm"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Aksen</label>
                  <input 
                    type="color" 
                    value={block.data.accentColor || '#22d3ee'} 
                    onChange={e => updateData('accentColor', e.target.value)}
                    className="w-full h-8 rounded-xl overflow-hidden border-none p-0 cursor-pointer shadow-sm"
                  />
               </div>
            </div>
          </div>
        );
      case 'comparison':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Judul Komparasi</label>
                  <TextToolbar field="title" />
               </div>
               <input 
                 type="text" 
                 value={block.data.title || ''} 
                 onChange={e => updateData('title', e.target.value)} 
                 className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none font-bold text-slate-800 text-lg text-center"
               />
               <div className="flex items-center gap-4 pt-2">
                  <div className="flex-1 flex items-center gap-2">
                    <Layout className="w-3 h-3 text-slate-400" />
                    <input 
                      type="range" min="16" max="72" 
                      value={block.data.fontSize || 36} 
                      onChange={e => updateData('fontSize', e.target.value)}
                      className="flex-1 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <input 
                    type="color" 
                    value={block.data.textColor || '#0f172a'} 
                    onChange={e => updateData('textColor', e.target.value)}
                    className="w-4 h-4 rounded-full overflow-hidden border-none p-0 cursor-pointer"
                  />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Kolom Kiri */}
              <div className="space-y-4 p-4 bg-red-50/30 rounded-2xl border border-red-100">
                <label className="text-[8px] font-black text-red-400 uppercase">Sisi Negatif</label>
                <input 
                  type="text"
                  value={block.data.traditional?.title || ''}
                  onChange={e => updateData('traditional', { ...block.data.traditional, title: e.target.value })}
                  placeholder="Judul Kiri"
                  className="w-full bg-white px-3 py-2 rounded-lg font-bold text-[10px] outline-none"
                />
                <textarea 
                  rows={4}
                  value={block.data.traditional?.items?.join('\n') || ''}
                  onChange={e => updateData('traditional', { ...block.data.traditional, items: e.target.value.split('\n') })}
                  placeholder="Item kiri (pisahkan enter)"
                  className="w-full bg-white px-3 py-2 rounded-lg text-[10px] outline-none resize-none font-medium"
                />
              </div>
              {/* Kolom Kanan */}
              <div className="space-y-4 p-4 bg-green-50/30 rounded-2xl border border-green-100">
                <label className="text-[8px] font-black text-green-400 uppercase">Sisi Positif</label>
                <input 
                  type="text"
                  value={block.data.spartan?.title || ''}
                  onChange={e => updateData('spartan', { ...block.data.spartan, title: e.target.value })}
                  placeholder="Judul Kanan"
                  className="w-full bg-white px-3 py-2 rounded-lg font-bold text-[10px] outline-none"
                />
                <textarea 
                  rows={4}
                  value={block.data.spartan?.items?.join('\n') || ''}
                  onChange={e => updateData('spartan', { ...block.data.spartan, items: e.target.value.split('\n') })}
                  placeholder="Item kanan (pisahkan enter)"
                  className="w-full bg-white px-3 py-2 rounded-lg text-[10px] outline-none resize-none font-medium"
                />
              </div>
            </div>
          </div>
        );
      case 'target':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Judul Section</label>
               <input 
                 type="text" 
                 value={block.data.title || ''} 
                 onChange={e => updateData('title', e.target.value)} 
                 className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none font-bold text-slate-800 text-lg text-center"
               />
            </div>
            <div className="space-y-4">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sub-Judul / Deskripsi</label>
               <input 
                 type="text" 
                 value={block.data.subtitle || ''} 
                 onChange={e => updateData('subtitle', e.target.value)} 
                 className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none text-sm text-slate-600 font-medium"
               />
            </div>
            <div className="space-y-4 pt-4 border-t border-slate-50">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Daftar Target User</label>
               <div className="grid gap-3">
                  {(block.data.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-2 items-start">
                       <input 
                         type="text" 
                         value={item.title || ''} 
                         onChange={(e) => {
                           const newItems = [...(block.data.items || [])];
                           newItems[idx] = { ...item, title: e.target.value };
                           updateData('items', newItems);
                         }}
                         className="flex-[2] bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg font-bold text-[10px]"
                         placeholder="Target"
                       />
                       <input 
                         type="text" 
                         value={item.desc || ''} 
                         onChange={(e) => {
                           const newItems = [...(block.data.items || [])];
                           newItems[idx] = { ...item, desc: e.target.value };
                           updateData('items', newItems);
                         }}
                         className="flex-[3] bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg text-[10px]"
                         placeholder="Keterangan"
                       />
                       <button onClick={() => updateData('items', (block.data.items || []).filter((_: any, i: number) => i !== idx))} className="p-2 text-slate-300 hover:text-red-500">
                          <Trash2 className="w-3 h-3" />
                       </button>
                    </div>
                  ))}
                  <button onClick={() => updateData('items', [...(block.data.items || []), { title: 'Target Baru', desc: 'Deskripsi...' }])} className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[9px] font-black text-slate-400 hover:text-slate-600">
                    + Tambah Target
                  </button>
               </div>
            </div>
          </div>
        );
      case 'problem':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Headline Masalah</label>
                  <TextToolbar field="title" />
               </div>
               <textarea 
                rows={2}
                value={block.data.title || ''} 
                onChange={e => updateData('title', e.target.value)} 
                placeholder="Hook masalah..."
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none font-bold text-slate-800 text-lg leading-tight"
               />
            </div>
            
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sub-Headline</label>
                  <TextToolbar field="subtitle" />
               </div>
               <textarea 
                rows={2}
                value={block.data.subtitle || ''} 
                onChange={e => updateData('subtitle', e.target.value)} 
                placeholder="Penjelasan singkat..."
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none text-sm text-slate-600 font-medium"
               />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
               <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Text Highlight</label>
                    <TextToolbar field="closing" />
                  </div>
                  <input 
                    type="text" 
                    value={block.data.closing || ''} 
                    onChange={e => updateData('closing', e.target.value)}
                    className="w-full bg-slate-100 px-4 py-2.5 rounded-xl outline-none text-[10px] font-bold"
                  />
               </div>
               <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Text Miring</label>
                    <TextToolbar field="highlinedClosing" />
                  </div>
                  <input 
                    type="text" 
                    value={block.data.highlinedClosing || ''} 
                    onChange={e => updateData('highlinedClosing', e.target.value)}
                    className="w-full bg-slate-100 px-4 py-2.5 rounded-xl outline-none text-[10px] font-bold"
                  />
               </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Daftar Poin Masalah</label>
               <div className="grid gap-3">
                  {(block.data.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                       <div className="flex-1 space-y-2">
                        <input 
                          type="text" 
                          value={item.t || ''} 
                          onChange={(e) => {
                            const newItems = [...(block.data.items || [])];
                            newItems[idx] = { ...item, t: e.target.value };
                            updateData('items', newItems);
                          }}
                          placeholder="Judul"
                          className="w-full bg-white border border-slate-100 px-3 py-2 rounded-lg font-bold text-[10px] outline-none"
                        />
                        <textarea 
                          rows={2}
                          value={item.d || ''} 
                          onChange={(e) => {
                            const newItems = [...(block.data.items || [])];
                            newItems[idx] = { ...item, d: e.target.value };
                            updateData('items', newItems);
                          }}
                          placeholder="Keterangan"
                          className="w-full bg-white border border-slate-100 px-3 py-2 rounded-lg text-[10px] outline-none resize-none"
                        />
                       </div>
                       <button 
                         onClick={() => {
                           const newItems = [...(block.data.items || [])];
                           newItems.splice(idx, 1);
                           updateData('items', newItems);
                         }}
                         className="p-2 text-slate-300 hover:text-red-500"
                       >
                          <Trash2 className="w-3 h-3" />
                       </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => updateData('items', [...(block.data.items || []), { t: 'Masalah Baru', d: 'Keterangan...' }])}
                    className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[9px] font-black text-slate-400 hover:text-slate-600"
                  >
                    + Tambah Poin
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-50">
               <div className="space-y-3">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Warna Text</label>
                  <input 
                    type="color" 
                    value={block.data.textColor || '#0f172a'} 
                    onChange={e => updateData('textColor', e.target.value)}
                    className="w-full h-8 rounded-xl overflow-hidden border-none p-0 cursor-pointer shadow-sm"
                  />
               </div>
               <div className="space-y-3">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Warna Aksen</label>
                  <input 
                    type="color" 
                    value={block.data.accentColor || '#3b82f6'} 
                    onChange={e => updateData('accentColor', e.target.value)}
                    className="w-full h-8 rounded-xl overflow-hidden border-none p-0 cursor-pointer shadow-sm"
                  />
               </div>
               <div className="space-y-3">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ukuran Judul</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="range" min="16" max="72" 
                      value={block.data.fontSize || 36} 
                      onChange={e => updateData('fontSize', e.target.value)}
                      className="flex-1 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-[9px] font-bold text-slate-600">{block.data.fontSize || 36}px</span>
                  </div>
               </div>
            </div>
          </div>
        );

      case 'socialProof':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Headline Social Proof</label>
                  <TextToolbar field="title" />
               </div>
               <textarea 
                rows={2}
                value={block.data.title || ''} 
                onChange={e => updateData('title', e.target.value)} 
                placeholder="Mereka sudah membuktikan..."
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none font-bold text-slate-800 text-lg leading-tight"
               />
            </div>
            
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sub-Label (Atas)</label>
                  <TextToolbar field="subtitle" />
               </div>
               <input 
                type="text"
                value={block.data.subtitle || ''} 
                onChange={e => updateData('subtitle', e.target.value)} 
                placeholder="BUKTI NYATA"
                className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl outline-none text-[10px] font-black tracking-widest uppercase"
               />
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Daftar Bukti (Screenshots)</label>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(block.data.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3 relative group/card">
                       <button 
                        onClick={() => {
                          const newItems = [...(block.data.items || [])];
                          newItems.splice(idx, 1);
                          updateData('items', newItems);
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all shadow-lg"
                       >
                          <Trash2 className="w-3.5 h-3.5" />
                       </button>
                       
                       <div className="aspect-[9/16] bg-slate-200 rounded-xl overflow-hidden relative group/img">
                          {item.img ? (
                            <img src={item.img} className="w-full h-full object-cover" alt="Proof" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                               <ImageIcon className="w-8 h-8 opacity-20" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center">
                             <label className="p-2 bg-white rounded-full cursor-pointer">
                                <Upload className="w-4 h-4 text-slate-900" />
                                <input 
                                  type="file" className="hidden" accept="image/*" 
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const url = await uploadImage(file);
                                    const newItems = [...(block.data.items || [])];
                                    newItems[idx] = { ...item, img: url };
                                    updateData('items', newItems);
                                  }} 
                                />
                             </label>
                          </div>
                       </div>
                       <textarea 
                        rows={3}
                        value={item.desc || ''} 
                        onChange={(e) => {
                          const newItems = [...(block.data.items || [])];
                          newItems[idx] = { ...item, desc: e.target.value };
                          updateData('items', newItems);
                        }}
                        placeholder="Testimoni / Deskripsi..."
                        className="w-full bg-white border border-slate-100 p-3 rounded-xl text-[10px] font-medium outline-none resize-none"
                       />
                    </div>
                  ))}
               </div>
               <button 
                onClick={() => updateData('items', [...(block.data.items || []), { img: '', desc: 'Ketik testimoni di sini...' }])}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all"
               >
                 + Tambah Bukti Baru
               </button>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Teks Penutup (Footer)</label>
               <input 
                type="text"
                value={block.data.footer || ''} 
                onChange={e => updateData('footer', e.target.value)} 
                placeholder="Ratusan orang sudah membuktikan..."
                className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl outline-none text-[10px] font-bold"
               />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
               <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-slate-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Warna Utama</span>
                  <input 
                    type="color" 
                    value={block.data.textColor || '#ffffff'} 
                    onChange={e => updateData('textColor', e.target.value)}
                    className="w-4 h-4 rounded-full overflow-hidden border-none p-0 cursor-pointer"
                  />
               </div>
               <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-pink" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Warna Aksen</span>
                  <input 
                    type="color" 
                    value={block.data.accentColor || '#ff2d55'} 
                    onChange={e => updateData('accentColor', e.target.value)}
                    className="w-4 h-4 rounded-full overflow-hidden border-none p-0 cursor-pointer"
                  />
               </div>
            </div>
          </div>
        );
      case 'steps':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Judul Langkah</label>
                  <TextToolbar field="title" />
               </div>
               <input 
                 type="text" 
                 value={block.data.title || ''} 
                 onChange={e => updateData('title', e.target.value)} 
                 className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none font-bold text-slate-800 text-lg"
               />
               <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Layout className="w-3 h-3 text-slate-400" />
                    <input 
                      type="range" min="16" max="72" 
                      value={block.data.fontSize || 36} 
                      onChange={e => updateData('fontSize', e.target.value)}
                      className="w-24 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-[9px] font-bold text-slate-500">{block.data.fontSize || 36}px</span>
                  </div>
                  <input 
                    type="color" 
                    value={block.data.accentColor || '#3b82f6'} 
                    onChange={e => updateData('accentColor', e.target.value)}
                    className="w-4 h-4 rounded-full overflow-hidden border-none p-0 cursor-pointer"
                  />
               </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Langkah-Langkah</label>
               <div className="grid gap-3">
                  {(block.data.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-100">
                       <input 
                         type="text" 
                         value={item.t || item.title || ''} 
                         onChange={(e) => {
                           const newItems = [...(block.data.items || [])];
                           newItems[idx] = { ...item, t: e.target.value };
                           updateData('items', newItems);
                         }}
                         placeholder={`Langkah ${idx+1}`}
                         className="flex-1 bg-white border border-slate-100 px-3 py-2 rounded-lg font-bold text-[10px] outline-none"
                       />
                       <button onClick={() => updateData('items', (block.data.items || []).filter((_: any, i: number) => i !== idx))} className="p-2 text-slate-300">
                          <Trash2 className="w-3 h-3" />
                       </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => updateData('items', [...(block.data.items || []), { t: 'Langkah Baru' }])}
                    className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[9px] font-black text-slate-400"
                  >
                    + Tambah Langkah
                  </button>
               </div>
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Judul FAQ</label>
                  <TextToolbar field="title" />
               </div>
               <input 
                 type="text" 
                 value={block.data.title || ''} 
                 onChange={e => updateData('title', e.target.value)} 
                 className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none font-bold text-slate-800 text-lg"
               />
               <div className="flex items-center gap-2 pt-2">
                  <span className="text-[9px] font-black text-slate-400">AKSEN</span>
                  <input 
                    type="color" 
                    value={block.data.accentColor || '#3b82f6'} 
                    onChange={e => updateData('accentColor', e.target.value)}
                    className="w-4 h-4 rounded-full overflow-hidden border-none p-0 cursor-pointer"
                  />
               </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Daftar Pertanyaan</label>
               <div className="grid gap-3">
                  {(block.data.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                       <input 
                         type="text" 
                         value={item.q || item.title || ''} 
                         onChange={(e) => {
                           const newItems = [...(block.data.items || [])];
                           newItems[idx] = { ...item, q: e.target.value };
                           updateData('items', newItems);
                         }}
                         placeholder="Pertanyaan?"
                         className="w-full bg-white border border-slate-100 px-3 py-2 rounded-lg font-bold text-[10px] outline-none"
                       />
                       <textarea 
                         rows={2}
                         value={item.a || item.desc || ''} 
                         onChange={(e) => {
                           const newItems = [...(block.data.items || [])];
                           newItems[idx] = { ...item, a: e.target.value };
                           updateData('items', newItems);
                         }}
                         placeholder="Jawaban..."
                         className="w-full bg-white border border-slate-100 px-3 py-2 rounded-lg text-[10px] outline-none resize-none font-medium"
                       />
                       <div className="flex justify-end">
                          <button onClick={() => updateData('items', (block.data.items || []).filter((_: any, i: number) => i !== idx))} className="text-red-500 text-[9px] font-bold uppercase">Hapus FAQ</button>
                       </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => updateData('items', [...(block.data.items || []), { q: 'Pertanyaan Baru?', a: 'Jawaban...' }])}
                    className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[9px] font-black text-slate-400"
                  >
                    + Tambah FAQ
                  </button>
               </div>
            </div>
          </div>
        );
      case 'testimoni':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Judul Testimoni</label>
                  <TextToolbar field="title" />
               </div>
               <input 
                 type="text" 
                 value={block.data.title || ''} 
                 onChange={e => updateData('title', e.target.value)} 
                 className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none font-bold text-slate-800 text-lg"
               />
               <div className="flex items-center gap-2 pt-2">
                  <span className="text-[9px] font-black text-slate-400">AKSEN</span>
                  <input 
                    type="color" 
                    value={block.data.accentColor || '#3b82f6'} 
                    onChange={e => updateData('accentColor', e.target.value)}
                    className="w-4 h-4 rounded-full overflow-hidden border-none p-0 cursor-pointer"
                  />
               </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Daftar Testimoni</label>
               <div className="grid gap-3">
                  {(block.data.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3 relative group/t">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden relative">
                             {item.avatar && <img src={item.avatar} className="w-full h-full object-cover" alt="" />}
                             <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer">
                                <Upload className="w-3 h-3 text-white" />
                                <input 
                                  type="file" className="hidden" accept="image/*" 
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const url = await uploadImage(file);
                                    const newItems = [...(block.data.items || [])];
                                    newItems[idx] = { ...item, avatar: url };
                                    updateData('items', newItems);
                                  }} 
                                />
                             </label>
                          </div>
                          <div className="flex-1 space-y-1">
                             <input 
                               type="text" 
                               value={item.name || ''} 
                               onChange={(e) => {
                                 const newItems = [...(block.data.items || [])];
                                 newItems[idx] = { ...item, name: e.target.value };
                                 updateData('items', newItems);
                               }}
                               placeholder="Nama"
                               className="w-full bg-white px-2 py-1 rounded text-[10px] font-bold outline-none"
                             />
                             <input 
                               type="text" 
                               value={item.role || ''} 
                               onChange={(e) => {
                                 const newItems = [...(block.data.items || [])];
                                 newItems[idx] = { ...item, role: e.target.value };
                                 updateData('items', newItems);
                               }}
                               placeholder="Jabatan"
                               className="w-full bg-white px-2 py-1 rounded text-[9px] outline-none"
                             />
                          </div>
                       </div>
                       <textarea 
                        rows={2}
                        value={item.text || item.desc || ''} 
                        onChange={(e) => {
                          const newItems = [...(block.data.items || [])];
                          newItems[idx] = { ...item, text: e.target.value };
                          updateData('items', newItems);
                        }}
                        placeholder="Testimoni"
                        className="w-full bg-white border border-slate-100 px-3 py-2 rounded-lg text-[10px] outline-none resize-none"
                       />
                       <button 
                        onClick={() => updateData('items', (block.data.items || []).filter((_: any, i: number) => i !== idx))}
                        className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover/t:opacity-100"
                       >
                          <Trash2 className="w-3 h-3" />
                       </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => updateData('items', [...(block.data.items || []), { name: 'User Baru', role: 'Klien', text: 'Mantap banget!' }])}
                    className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[9px] font-black text-slate-400"
                  >
                    + Tambah Testimoni
                  </button>
               </div>
            </div>
          </div>
        );
      case 'demo':
      case 'specs':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Judul {block.type === 'demo' ? 'Preview' : 'Spesifikasi'}</label>
                  <TextToolbar field="title" />
               </div>
               <input 
                 type="text" 
                 value={block.data.title || ''} 
                 onChange={e => updateData('title', e.target.value)} 
                 className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none font-bold text-slate-800 text-lg"
               />
               <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Layout className="w-3 h-3 text-slate-400" />
                    <input 
                      type="range" min="16" max="72" 
                      value={block.data.fontSize || 36} 
                      onChange={e => updateData('fontSize', e.target.value)}
                      className="w-24 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-[9px] font-bold text-slate-500">{block.data.fontSize || 36}px</span>
                  </div>
                  <input 
                    type="color" 
                    value={block.data.textColor || '#0f172a'} 
                    onChange={e => updateData('textColor', e.target.value)}
                    className="w-4 h-4 rounded-full overflow-hidden border-none p-0 cursor-pointer"
                  />
               </div>
            </div>

            {block.data.items && (
              <div className="space-y-4 pt-4 border-t border-slate-50">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Daftar Poin</label>
                <div className="grid gap-3">
                  {(block.data.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-100">
                       <input 
                         type="text" 
                         value={item.title || item.t || ''} 
                         onChange={(e) => {
                           const newItems = [...(block.data.items || [])];
                           if (item.title !== undefined) newItems[idx] = { ...item, title: e.target.value };
                           else newItems[idx] = { ...item, t: e.target.value };
                           updateData('items', newItems);
                         }}
                         className="flex-1 bg-white px-3 py-2 rounded-lg font-bold text-[10px] outline-none"
                       />
                       <button onClick={() => updateData('items', (block.data.items || []).filter((_: any, i: number) => i !== idx))} className="p-2 text-slate-300">
                          <Trash2 className="w-3 h-3" />
                       </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => updateData('items', [...(block.data.items || []), { title: 'Poin Baru' }])}
                    className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[9px] font-black text-slate-400"
                  >
                    + Tambah Poin
                  </button>
                </div>
              </div>
            )}

            {block.data.image !== undefined && (
              <div className="space-y-4 pt-4 border-t border-slate-50">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Gambar Utama</label>
                 <div className="w-full h-32 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 relative group/img">
                    {block.data.image && <img src={block.data.image} alt="Preview" className="w-full h-full object-cover" />}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center">
                       <label className="p-2 bg-white rounded-full cursor-pointer">
                          <Upload className="w-4 h-4 text-slate-900" />
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                       </label>
                    </div>
                 </div>
              </div>
            )}
          </div>
        );
      case 'disclaimer':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Headline Disclaimer</label>
                  <TextToolbar field="title" />
               </div>
               <input 
                type="text"
                value={block.data.title || ''} 
                onChange={e => updateData('title', e.target.value)} 
                className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl outline-none font-bold text-xs"
               />
            </div>
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Isi Disclaimer</label>
                  <TextToolbar field="subtitle" />
               </div>
               <textarea 
                rows={4}
                value={block.data.subtitle || ''} 
                onChange={e => updateData('subtitle', e.target.value)} 
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none text-[10px] font-medium leading-relaxed"
               />
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Judul Seksi</label>
              <input 
                type="text" 
                value={block.data.title || ''} 
                onChange={e => updateData('title', e.target.value)} 
                placeholder={`Judul ${block.type}...`}
                className={`w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none font-bold text-slate-800 placeholder:text-slate-200 ${currentAlign === 'left' ? 'text-left' : (currentAlign === 'right' ? 'text-right' : 'text-center')}`}
              />
            </div>

            {block.data.subtitle !== undefined && (
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sub-Judul / Deskripsi</label>
                <textarea 
                  rows={2}
                  value={block.data.subtitle || ''} 
                  onChange={e => updateData('subtitle', e.target.value)} 
                  placeholder="Ketik deskripsi singkat..."
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none text-sm text-slate-600 resize-none font-medium"
                />
              </div>
            )}

            {block.data.items && (
              <div className="space-y-4 pt-4 border-t border-slate-50">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Daftar Item / Poin</label>
                 <div className="grid gap-4">
                    {block.data.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-4 items-start bg-slate-50/50 p-4 rounded-2xl border border-slate-100 group/item relative">
                         <div className="flex-1 space-y-3">
                            <input 
                              type="text" 
                              value={item.t || item.title || ''} 
                              onChange={(e) => {
                                const newItems = [...(block.data.items || [])];
                                if (item.t !== undefined) newItems[idx] = { ...item, t: e.target.value };
                                else newItems[idx] = { ...item, title: e.target.value };
                                updateData('items', newItems);
                              }}
                              placeholder="Judul Poin"
                              className="w-full bg-white border border-slate-100 px-3 py-2 rounded-lg font-bold text-xs outline-none focus:border-blue-400"
                            />
                            <textarea 
                              rows={2}
                              value={item.d || item.desc || item.value || ''} 
                              onChange={(e) => {
                                const newItems = [...(block.data.items || [])];
                                if (item.d !== undefined) newItems[idx] = { ...item, d: e.target.value };
                                else if (item.desc !== undefined) newItems[idx] = { ...item, desc: e.target.value };
                                else newItems[idx] = { ...item, value: e.target.value };
                                updateData('items', newItems);
                              }}
                              placeholder="Keterangan Poin"
                              className="w-full bg-white border border-slate-100 px-3 py-2 rounded-lg text-xs outline-none focus:border-blue-400 resize-none font-medium text-slate-500"
                            />
                         </div>
                         <button 
                           onClick={() => {
                             const newItems = [...(block.data.items || [])];
                             newItems.splice(idx, 1);
                             updateData('items', newItems);
                           }}
                           className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                         >
                            <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        const items = block.data.items || [];
                        const firstItem = items[0] || {};
                        const newItem = { ...firstItem };
                        if (newItem.t !== undefined) newItem.t = 'Poin Baru';
                        if (newItem.title !== undefined) newItem.title = 'Poin Baru';
                        if (newItem.d !== undefined) newItem.d = 'Isi keterangan di sini...';
                        if (newItem.desc !== undefined) newItem.desc = 'Isi keterangan di sini...';
                        if (newItem.value !== undefined) newItem.value = 'Keterangan';
                        updateData('items', [...items, newItem]);
                      }}
                      className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all"
                    >
                      + Tambah Item Baru
                    </button>
                 </div>
              </div>
            )}
            
            {block.data.image && (
               <div className="w-full h-32 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 relative group/img">
                  <img src={block.data.image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center">
                     <label 
                       className="p-2 bg-white rounded-full cursor-pointer hover:bg-slate-50 transition-all"
                       onClick={e => e.stopPropagation()}
                     >
                        <Upload className="w-4 h-4 text-slate-900" />
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                     </label>
                  </div>
               </div>
            )}
          </div>
        );
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden group mb-3 hover:border-blue-200 transition-all"
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

      {/* Card Body — data-no-dnd prevents drag from firing inside editor fields */}
      <div className="p-8" data-no-dnd="true">
        {renderFields()}
      </div>
    </div>
  );
}
