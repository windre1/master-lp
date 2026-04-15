'use client';

import React, { useRef } from 'react';
import { Block } from '@/types/lp';
import { Trash2, ChevronUp, ChevronDown, ImageIcon, ExternalLink, Play, Type, AlignLeft } from 'lucide-react';
import { uploadImage } from '@/lib/data';

interface CanvasProps {
  blocks: Block[];
  onUpdateBlock: (id: string, data: any) => void;
  onRemoveBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  slug: string;
  onUpdateSlug: (slug: string) => void;
}

export default function Canvas({ blocks, onUpdateBlock, onRemoveBlock, onMoveBlock, slug, onUpdateSlug }: CanvasProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeBlockId = useRef<string | null>(null);

  const handleImageClick = (blockId: string) => {
    activeBlockId.current = blockId;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeBlockId.current) return;

    try {
      // Simulating loading state could be added here
      const imageUrl = await uploadImage(file);
      const block = blocks.find(b => b.id === activeBlockId.current);
      if (block) {
        onUpdateBlock(activeBlockId.current, { ...block.data, image: imageUrl });
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Gagal upload gambar. Cek koneksi Supabase Anda.");
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-8 pb-32 overflow-y-auto">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Project Setup Panel */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           
           <div className="flex-1 w-full">
              <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 block">Project Endpoint (URL)</label>
              <div className="flex items-center gap-2 bg-slate-50 px-5 py-4 rounded-2xl border border-slate-200 focus-within:border-indigo-600 transition-colors">
                <span className="text-slate-400 font-bold font-mono">/</span>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => onUpdateSlug(e.target.value.toLowerCase().replace(/ /g, '-'))}
                  placeholder="marketing-page-slug"
                  className="bg-transparent outline-none flex-1 font-black text-slate-800 placeholder:text-slate-300"
                />
              </div>
           </div>
           
           <div className="shrink-0">
             <a 
               href={slug ? `/${slug}` : '#'} 
               target="_blank" 
               className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all ${slug ? 'bg-slate-900 text-white hover:bg-black shadow-lg shadow-slate-200' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
             >
               <ExternalLink className="w-4 h-4" /> Preview Live
             </a>
           </div>
        </div>

        {/* Editor Canvas */}
        <div className="space-y-8">
          {blocks.length === 0 ? (
            <div className="py-40 border-4 border-dashed border-slate-200 rounded-[3.5rem] text-center flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm">
               <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-slate-200 mb-8 border border-slate-50 animate-bounce">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
               </div>
               <h3 className="text-xl font-black text-slate-800 mb-2">Editor Masih Kosong</h3>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Pilih block dari library di sebelah kiri</p>
            </div>
          ) : (
            blocks.map((block, index) => (
              <div key={block.id} className="group relative bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Block Toolbelt */}
                <div className="px-8 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-[10px] uppercase shadow-lg shadow-indigo-100">
                         {index + 1}
                      </div>
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">{block.type} section</span>
                   </div>
                   <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      <div className="flex bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <button onClick={() => onMoveBlock(block.id, 'up')} className="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-colors border-r border-slate-100"><ChevronUp className="w-4 h-4" /></button>
                        <button onClick={() => onMoveBlock(block.id, 'down')} className="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-colors"><ChevronDown className="w-4 h-4" /></button>
                      </div>
                      <button onClick={() => onRemoveBlock(block.id)} className="p-2.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100"><Trash2 className="w-4 h-4" /></button>
                   </div>
                </div>

                {/* Content Configuration */}
                <div className="p-10 grid gap-8 md:grid-cols-2">
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><Type className="w-3 h-3" /> Main Title</label>
                        <input 
                          type="text" 
                          value={block.data.title || ''}
                          onChange={(e) => onUpdateBlock(block.id, { ...block.data, title: e.target.value })}
                          className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:border-indigo-600 outline-none text-sm font-black text-slate-800 tracking-tight"
                          placeholder="Headline Menarik Anda..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><AlignLeft className="w-3 h-3" /> Description</label>
                        <textarea 
                          rows={3}
                          value={block.data.subtitle || ''}
                          onChange={(e) => onUpdateBlock(block.id, { ...block.data, subtitle: e.target.value })}
                          className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:border-indigo-600 outline-none text-sm font-medium text-slate-600 leading-relaxed"
                          placeholder="Penjelasan produk atau masalah..."
                        />
                      </div>

                      {block.type === 'pricing' && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Offer Price (IDR)</label>
                          <input 
                            type="number" 
                            value={block.data.price || 0}
                            onChange={(e) => onUpdateBlock(block.id, { ...block.data, price: Number(e.target.value) })}
                            className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:border-indigo-600 outline-none text-xl font-black text-indigo-600"
                          />
                        </div>
                      )}
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Visual Asset</label>
                        <div 
                          onClick={() => handleImageClick(block.id)}
                          className="aspect-video bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-100 hover:border-indigo-300 transition-all group overflow-hidden relative"
                        >
                           {block.data.image ? (
                             <>
                               <img src={block.data.image} alt="Visual" className="w-full h-full object-cover" />
                               <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase text-indigo-600">Ganti Gambar</span>
                               </div>
                             </>
                           ) : (
                             <>
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:scale-110 transition-all">
                                   <ImageIcon className="w-6 h-6" />
                                </div>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Upload Image</span>
                             </>
                           )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><Play className="w-3 h-3" /> Button CTA / Video / Link</label>
                        <div className="flex flex-col gap-2">
                           <input 
                            type="text" 
                            placeholder={block.type === 'demo' ? 'YouTube Link...' : 'Text Tombol...'}
                            value={block.type === 'demo' ? (block.data.videoUrl || '') : (block.data.ctaText || '')}
                            onChange={(e) => onUpdateBlock(block.id, block.type === 'demo' ? { ...block.data, videoUrl: e.target.value } : { ...block.data, ctaText: e.target.value })}
                            className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:border-indigo-600 outline-none text-xs font-black uppercase tracking-widest text-slate-600"
                          />
                          {block.type !== 'demo' && (
                             <input 
                              type="text" 
                              placeholder="Link URL (e.g. https://wa.me/...)"
                              value={block.data.ctaLink || ''}
                              onChange={(e) => onUpdateBlock(block.id, { ...block.data, ctaLink: e.target.value })}
                              className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:border-indigo-600 outline-none text-[10px] font-bold text-indigo-500"
                            />
                          )}
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
