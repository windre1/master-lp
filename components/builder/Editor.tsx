'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Toolbox from './Toolbox';
import { Block, BlockType, LandingPage } from '@/types/lp';
import { saveLP, deleteLP } from '@/lib/data';
import { Plus, LogOut, Layers, Zap, Smartphone } from 'lucide-react';

export default function Editor() {
  const [slug, setSlug] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeLP, setActiveLP] = useState<LandingPage | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<'blank' | 'komisi' | 'tekotok' | 'tekotok2'>('blank');
  const [settings, setSettings] = useState<{ globalBg?: string }>({ globalBg: '#f0f7ff' });


  const KOMISI_BLOCKS: Block[] = [
    { id: 'k1', type: 'hero', data: { title: '👉 Dapat Komisi 30% Tanpa Punya Produk Sendiri', subtitle: 'Gabung jadi Affiliate di Wakrod Project — cukup share link, komisi jalan otomatis, bahkan bisa terus mengalir selamanya.', ctaText: '👉 Amankan Slot & Join GMeet Sekarang', ctaLink: '#cta-section', badge: 'center' } },
    { id: 'k2', type: 'text_only', data: { subtitle: '⚠️ Detail lengkap sistem akan dibahas eksklusif di GMeet (slot terbatas)', badge: 'center', textColor: '#ef4444', fontSize: '18' } },
    { id: 'k3', type: 'problem', data: { title: 'Capek Jualan Tapi Gak Punya Produk?', subtitle: '👉 Sekarang saatnya ubah cara main.', items: [{ t: 'Bingung Produk Apa', d: 'Mau jualan tapi bingung produk apa.' }, { t: 'Komisi Kecil', d: 'Sudah coba affiliate, tapi komisi kecil.' }, { t: 'Gapunya Produk', d: 'Sekali closing, selesai… gak ada penghasilan lanjutan.' }, { t: 'Mulai dari nol', d: 'Harus mulai dari nol terus.' }] } },
    { id: 'k4', type: 'solution', data: { title: 'Kenalan dengan Wakrod Project', subtitle: '👉 Semua sudah disiapkan, kamu tinggal jalanin.', items: [{ t: 'Affiliate Komisi Besar', d: 'Komisi hingga 30% per transaksi.' }, { t: 'Tanpa Stok', d: 'Bangun income tanpa stok barang.' }, { t: 'Sistem Seller', d: 'Bahkan upgrade jadi seller dengan sistem simpel.' }] } },
    { id: 'k5', type: 'heading', data: { title: '💸 Komisi 30% Tanpa Ribet', badge: 'center' } },
    { id: 'k6', type: 'text_only', data: { subtitle: 'Bayangin kamu cuma share link… ➡️ Ada yang beli → kamu dapat komisi, ➡️ Mereka beli lagi → kamu tetap dapat komisi, ➡️ Bahkan beli produk lain → kamu tetap kebagian. 🔥 Karena sistem kami pakai lifetime cookies', badge: 'center', fontSize: '18', textColor: '#334155' } },
    { id: 'k7', type: 'heading', data: { title: 'Sekali Refer, Dibayar Selamanya', badge: 'center', textColor: '#2563eb' } },
    { id: 'k8', type: 'text_only', data: { subtitle: 'Misalnya: Kamu share link affiliate. Si A daftar dari link kamu. Si A beli produk hari ini → kamu dapat komisi. Besok dia beli lagi → kamu tetap dapat. Bahkan tahun depan → masih dapat.', badge: 'center' } },
    { id: 'k9', type: 'price_list', data: { items: [{ title: 'Income Affiliate', desc: 'Dapatkan komisi 30% dari setiap referral.', ctaText: 'Join Affiliate', ctaLink: '#', textColor: '#0f172a', buttonColor: '#2563eb' }, { title: 'Income Seller', desc: 'Upload produk sendiri, fee hanya 5%.', ctaText: 'Join Seller', ctaLink: '#', textColor: '#0f172a', buttonColor: '#0f172a' }] } },
    { id: 'k10', type: 'features', data: { title: 'Mulai Tanpa Modal', items: [{ t: 'Gratis Daftar', d: 'Tanpa biaya apa pun.' }, { t: 'Tanpa Stok', d: 'Tidak perlu simpan barang.' }, { t: 'Tanpa Ribet', d: 'Semua sistem sudah otomatis.' }] } },
    { id: 'k11', type: 'heading', data: { title: '⚠️ Ini Belum Dibuka Publik', badge: 'center', textColor: '#ef4444' } },
    { id: 'k12', type: 'text_only', data: { subtitle: 'Semua sistem ini akan dijelaskan di GMeet: Strategi closing, Macro recurring income, dan Studi case real.', badge: 'center', fontSize: '18' } },
    { id: 'k13', type: 'cta', data: { title: 'Siap Dapetin Komisi 30% Tanpa Produk?', subtitle: 'Gratis. Tanpa risiko. Slot terbatas.', ctaText: '👉 Daftar Sekarang & Amankan Slot GMeet', buttonColor: '#ef4444' } }
  ];
  
  const TEKOTOK_BLOCKS: Block[] = [
    { id: 't1', type: 'hero', data: { title: 'Scale Konten TikTok Tanpa Batas', subtitle: 'Upload massal, multi akun, auto posting — semua otomatis. Fokus bikin konten, biarkan sistem yang kerja.', ctaText: 'MULAI SEKARANG', ctaLink: '#cta-penutup', badge: 'center' } },
    { id: 't2', type: 'text_only', data: { subtitle: '✔ Upload banyak video sekaligus (batch) \n✔ Auto posting & schedule tanpa ribet \n✔ Bisa handle banyak akun sekaligus \n✔ Cocok untuk affiliate & seller TikTok', badge: 'center', fontSize: '18', textColor: '#10b981' } },
    { id: 't3', type: 'text_only', data: { subtitle: 'Dipakai oleh Affiliate & Seller di TikTok', badge: 'center', fontSize: '14', textColor: '#64748b' } },
    { id: 't4', type: 'problem', data: { title: 'Kenapa Konten Lo Gak Pernah Scale?', subtitle: 'Masalahnya bukan di effort lo… tapi di sistem lo.', items: [{ t: 'Upload Manual Melelahkan', d: 'Bikin banyak konten tapi mental drop pas harus upload satu per satu.' }, { t: 'Ribet Kelola Banyak Akun', d: 'Login logout terus menerus menghabiskan waktu dan energi Anda.' }, { t: 'Gak Konsisten Upload', d: 'Niat awal mau rutin tapi kalah sama rasa capek dan sistem yang ribet.' }], closing: 'Akhirnya growth stuck', highlinedClosing: 'di situ-situ aja.' } },
    { id: 't5', type: 'solution', data: { title: 'Saatnya Ubah Cara Main Anda', subtitle: 'Kenalin… sistem automation dari Wakrod Project: Tekotok Uploader', items: [{ t: 'Scale Konten Lebih Cepat', d: 'Tools yang dirancang khusus untuk pertumbuhan cepat.' }, { t: 'Handle Banyak Akun Tanpa Stress', d: 'Bangun konsistensi tanpa perlu effort berulang.' }, { t: 'Kerja Lebih Cerdas', d: 'Bukan sekadar kerja lebih keras, tapi lebih efisien.' }] } },
    { id: 't6', type: 'heading', data: { title: 'Upload Sekali, Jalan Terus', badge: 'center', fontSize: '32' } },
    { id: 't7', type: 'text_only', data: { subtitle: 'Bayangin ini: Kamu upload puluhan video sekaligus, sistem yang handle posting otomatis, dan semua akun jalan bareng tanpa ribet. 🔥 Ini bukan tools biasa — ini mesin scaling.', badge: 'center', fontSize: '20' } },
    { id: 't8', type: 'features', data: { title: 'Semua Kebutuhan Anda Sudah Siap', items: [{ t: '⚡ Upload Mode Fleksibel', d: 'Single upload atau batch sekaligus sesuai kebutuhan.' }, { t: '🤖 Auto Posting & Schedule', d: 'Upload sekarang atau atur jadwal otomatis kapan saja.' }, { t: '🔐 Multi Akun Support', d: 'Bisa untuk akun regular, seller, atau affiliate.' }, { t: '🔐 No Login Logout Ribet', d: 'Kelola banyak akun dalam satu dashboard pusat.' }, { t: '⚡ Auto Delete Video', d: 'Video otomatis terhapus setelah terposting.' }, { t: '🤖 User Friendly', d: 'Tampilan simpel dan intuitif, tidak bikin pusing.' }] } },
    { id: 't9', type: 'comparison', data: { title: 'Dari Manual ke Auto System', traditional: { title: 'ALUR MANUAL', items: ['Upload satu per satu', 'Capek sebelum konsisten', 'Growth sangat lambat'], footer: 'Gak bakal scale.' }, spartan: { title: 'SISTEM TEKOTOK', items: ['Upload massal otomatis', 'Konsisten tanpa usaha ekstra', 'Peluang viral meningkat drastis'], footer: 'Sistem yang kerja.' } } },
    { id: 't10', type: 'target', data: { title: 'Siapa yang Cocok Pakai Ini?', items: [{ title: 'Affiliate TikTok', desc: 'Scale konten affiliate dengan sangat cepat.' }, { title: 'Seller TikTok Shop', desc: 'Handle puluhan video produk secara otomatis.' }, { title: 'Content Creator', desc: 'Fokus berkreasi, biarkan sistem yang memposting.' }, { title: 'Agency / Jasa Akun', desc: 'Efisiensi waktu untuk menangani banyak klien.' }], subtitle: 'Kalau kamu mau scale di TikTok… ini adalah tools wajib.' } },
    { id: 't11', type: 'cta', data: { title: 'Siap Scale Konten Tanpa Batas?', subtitle: 'Stop capek upload manual. Saatnya pakai sistem automation sekarang.', ctaText: 'MULAI SEKARANG', buttonColor: '#2563eb' } }
  ];

  const TEKOTOK2_BLOCKS: Block[] = [
    { id: 't2-1', type: 'hero', data: { title: 'Scale Konten TikTok Tanpa Batas', subtitle: 'Upload massal, multi akun, auto posting — semua otomatis. Fokus bikin konten, biarkan sistem yang kerja.', ctaText: 'MULAI SEKARANG', ctaLink: '#cta-penutup', badge: 'center', textColor: '#ffffff', buttonColor: '#FF2D55' } },
    { id: 't2-2', type: 'text_only', data: { subtitle: '✔ Upload banyak video sekaligus (batch) \n✔ Auto posting & schedule tanpa ribet \n✔ Bisa handle banyak akun sekaligus \n✔ Cocok untuk affiliate & seller TikTok', badge: 'center', fontSize: '18', textColor: '#00FFC2' } },
    { id: 't2-3', type: 'text_only', data: { subtitle: 'Dipakai oleh Affiliate & Seller di TikTok', badge: 'center', fontSize: '14', textColor: '#94a3b8' } },
    { id: 't2-4', type: 'problem', data: { title: 'Kenapa Konten Lo Gak Pernah Scale?', subtitle: 'Masalahnya bukan di effort lo… tapi di sistem lo.', items: [{ t: 'Upload Manual Melelahkan', d: 'Bikin banyak konten tapi mental drop pas harus upload satu per satu.' }, { t: 'Ribet Kelola Banyak Akun', d: 'Login logout terus menerus menghabiskan waktu dan energi Anda.' }, { t: 'Gak Konsisten Upload', d: 'Niat awal mau rutin tapi kalah sama rasa capek dan sistem yang ribet.' }], closing: 'Akhirnya growth stuck', highlinedClosing: 'di situ-situ aja.', textColor: '#ffffff' } },
    { id: 't2-5', type: 'solution', data: { title: 'Saatnya Ubah Cara Main Anda', subtitle: 'Kenalin… sistem automation dari Wakrod Project: Tekotok Uploader', items: [{ t: 'Scale Konten Lebih Cepat', d: 'Tools yang dirancang khusus untuk pertumbuhan cepat.' }, { t: 'Handle Banyak Akun Tanpa Stress', d: 'Bangun konsistensi tanpa perlu effort berulang.' }, { t: 'Kerja Lebih Cerdas', d: 'Bukan sekadar kerja lebih keras, tapi lebih efisien.' }], textColor: '#ffffff' } },
    { id: 't2-6', type: 'heading', data: { title: 'Upload Sekali, Jalan Terus', badge: 'center', fontSize: '32', textColor: '#ffffff' } },
    { id: 't2-7', type: 'text_only', data: { subtitle: 'Bayangin ini: Kamu upload puluhan video sekaligus, sistem yang handle posting otomatis, dan semua akun jalan bareng tanpa ribet. 🔥 Ini bukan tools biasa — ini mesin scaling.', badge: 'center', fontSize: '20', textColor: '#ffffff' } },
    { id: 't2-8', type: 'features', data: { title: 'Semua Kebutuhan Anda Sudah Siap', items: [{ t: '⚡ Upload Mode Fleksibel', d: 'Single upload atau batch sekaligus sesuai kebutuhan.' }, { t: '🤖 Auto Posting & Schedule', d: 'Upload sekarang atau atur jadwal otomatis kapan saja.' }, { t: '🔐 Multi Akun Support', d: 'Bisa untuk akun regular, seller, atau affiliate.' }, { t: '🔐 No Login Logout Ribet', d: 'Kelola banyak akun dalam satu dashboard pusat.' }, { t: '⚡ Auto Delete Video', d: 'Video otomatis terhapus setelah terposting.' }, { t: '🤖 User Friendly', d: 'Tampilan simpel dan intuitif, tidak bikin pusing.' }], textColor: '#ffffff' } },
    { id: 't2-9', type: 'comparison', data: { title: 'Dari Manual ke Auto System', traditional: { title: 'ALUR MANUAL', items: ['Upload satu per satu', 'Capek sebelum konsisten', 'Growth sangat lambat'], footer: 'Gak bakal scale.' }, spartan: { title: 'SISTEM TEKOTOK', items: ['Upload massal otomatis', 'Konsisten tanpa usaha ekstra', 'Peluang viral meningkat drastis'], footer: 'Sistem yang kerja.' }, textColor: '#ffffff' } },
    { id: 't2-10', type: 'target', data: { title: 'Siapa yang Cocok Pakai Ini?', items: [{ title: 'Affiliate TikTok', desc: 'Scale konten affiliate dengan sangat cepat.' }, { title: 'Seller TikTok Shop', desc: 'Handle puluhan video produk secara otomatis.' }, { title: 'Content Creator', desc: 'Fokus berkreasi, biarkan sistem yang memposting.' }, { title: 'Agency / Jasa Akun', desc: 'Efisiensi waktu untuk menangani banyak klien.' }], subtitle: 'Kalau kamu mau scale di TikTok… ini adalah tools wajib.', textColor: '#ffffff' } },
    { id: 't2-11', type: 'cta', data: { title: 'Siap Scale Konten Tanpa Batas?', subtitle: 'Stop capek upload manual. Saatnya pakai sistem automation sekarang.', ctaText: 'MULAI SEKARANG', buttonColor: '#FF2D55' } }
  ];

  const handleUpdateBlock = (id: string, data: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, data } : b));
  };

  const handleRemoveBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const handleAddBlock = (type: BlockType, index?: number) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: {
        title: type === 'heading' ? 'Judul Baru' : '',
        subtitle: type === 'text_only' ? 'Isi teks di sini...' : '',
        ctaText: type === 'cta' || type === 'button_only' ? 'Tombol' : '',
        ctaLink: '#',
        image: type === 'image_only' ? '' : undefined,
        videoUrl: type === 'video_only' ? '' : undefined,
        videoWidth: '100',
        badge: 'center',
        items: type === 'price_list' ? [
          { title: 'Paket Basic', desc: 'Fitur standar untuk pemula', ctaText: 'Pilih Paket', ctaLink: '#' },
          { title: 'Paket Pro', desc: 'Fitur lengkap untuk bisnis Anda', ctaText: 'Pilih Paket', ctaLink: '#' },
          { title: 'Paket Ultra', desc: 'Solusi total dengan support prioritas', ctaText: 'Pilih Paket', ctaLink: '#' }
        ] : (type === 'specs' ? [{ t: '10+', d: 'MODUL' }, { t: '100%', d: 'BERHASIL' }] : undefined)
      }
    };
    
    if (index !== undefined) {
      const newBlocks = [...blocks];
      newBlocks.splice(index, 0, newBlock);
      setBlocks(newBlocks);
    } else {
      setBlocks([...blocks, newBlock]);
    }
  };

  const handleSelectLP = (lp: LandingPage) => {
    setActiveLP(lp);
    setSlug(lp.slug);
    setBlocks(lp.content.blocks || []);
    setSettings(lp.content.settings || { globalBg: '#f0f7ff' });
  };

  const confirmNewPage = async () => {
    if (!newSlug) return;
    setSaving(true);
    let initialBlocks: Block[] = [];
    let initialSettings = { ...settings };

    if (selectedTemplate === 'komisi') {
      initialBlocks = KOMISI_BLOCKS.map(block => ({
        ...block,
        id: Math.random().toString(36).substr(2, 9)
      }));
      initialSettings = { globalBg: '#f0f7ff' };
    } else if (selectedTemplate === 'tekotok') {
      initialBlocks = TEKOTOK_BLOCKS.map(block => ({
        ...block,
        id: Math.random().toString(36).substr(2, 9)
      }));
      initialSettings = { globalBg: '#f0f7ff' };
    } else if (selectedTemplate === 'tekotok2') {
      initialBlocks = TEKOTOK2_BLOCKS.map(block => ({
        ...block,
        id: Math.random().toString(36).substr(2, 9)
      }));
      initialSettings = { globalBg: '#000000' };
    }
    
    try {
      await saveLP(newSlug, { blocks: initialBlocks, settings: initialSettings });
      setSlug(newSlug);
      setBlocks(initialBlocks);
      setSettings(initialSettings);
      setShowModal(false);
      setNewTitle('');
      setNewSlug('');
      setSelectedTemplate('blank');
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!slug) return;
    setSaving(true);
    try {
      await saveLP(slug, { blocks, settings });
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      setError(err.message);
    } finally {
       setSaving(false);
    }
  };

  const handleDeleteLP = async (targetSlug: string) => {
    if (!confirm(`Hapus landing page "${targetSlug}"?`)) return;
    try {
      await deleteLP(targetSlug);
      if (slug === targetSlug) {
        setSlug('');
        setBlocks([]);
      }
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  // Sync data for the real-time preview iframe
  useEffect(() => {
    localStorage.setItem('lp_preview_data', JSON.stringify({ blocks, settings }));
  }, [blocks, settings]);

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col bg-white h-screen overflow-hidden font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Top Header */}
      <header className="h-20 bg-white border-b border-slate-100 px-12 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">LP <span className="text-blue-600">Builder</span></h1>
        </div>
        
        <div className="flex items-center gap-6">
           <button 
             onClick={handleLogout}
             className="text-[9px] font-black text-slate-400 hover:text-red-500 uppercase tracking-[0.2em] transition-all flex items-center gap-2"
           >
             <LogOut className="w-3.5 h-3.5" /> Keluar
           </button>
           
           <button 
             onClick={() => setShowModal(true)}
             className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-lg uppercase tracking-widest text-[9px]"
           >
             <Plus className="w-3.5 h-3.5" /> Halaman Baru
           </button>
        </div>
      </header>

      {/* Main Layout 3 Columns */}
      <main className="flex-1 flex p-6 gap-6 overflow-hidden bg-slate-50/20">
        {/* Column 1: Halaman List */}
        <Sidebar 
          onSelectLP={handleSelectLP} 
          activeSlug={slug} 
          key={refreshKey} 
          onDeleteLP={handleDeleteLP}
        />

        {/* Column 2: Editor Canvas */}
        <Canvas 
          blocks={blocks} 
          onUpdateBlock={handleUpdateBlock} 
          onRemoveBlock={handleRemoveBlock} 
          onSortBlocks={setBlocks}
          slug={slug}
          onUpdateSlug={setSlug}
          onSave={handleSave}
          saving={saving}
          onAddBlock={handleAddBlock}
        />

        {/* Column 3: Toolbox & Preview */}
        <Toolbox onAddBlock={handleAddBlock} blocks={blocks} slug={slug} settings={settings} onUpdateSettings={setSettings} />
      </main>

      {/* Pop Up Modal Buat Halaman Baru */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="p-10 pb-6 flex items-center justify-between">
                 <h2 className="text-xl font-bold text-slate-800">Buat Halaman Baru</h2>
                 <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>
              
              <div className="px-10 py-6 space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">JUDUL HALAMAN</label>
                    <input 
                      type="text" 
                      placeholder="cth: Panduan Spartan Tube" 
                      value={newTitle}
                      onChange={(e) => {
                        setNewTitle(e.target.value);
                        if (!newSlug) setNewSlug(e.target.value.toLowerCase().replace(/ /g, '-'));
                      }}
                      className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl outline-none focus:border-slate-900 transition-all font-medium text-slate-600 placeholder:text-slate-300"
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SLUG URL</label>
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-5 py-5 rounded-2xl focus-within:border-slate-900 transition-all">
                       <span className="text-slate-400 font-medium whitespace-nowrap">/</span>
                       <input 
                         type="text" 
                         placeholder="panduan-spartan-tube" 
                         value={newSlug}
                         onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/ /g, '-'))}
                         className="bg-transparent outline-none flex-1 font-medium text-slate-600 placeholder:text-slate-300" 
                       />
                    </div>
                 </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PILIH TEMPLATE</label>
                     <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => setSelectedTemplate('blank')}
                          className={`p-6 rounded-3xl border-2 text-left transition-all ${selectedTemplate === 'blank' ? 'border-slate-900 bg-slate-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                        >
                           <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                              <Layers className="w-5 h-5 text-slate-400" />
                           </div>
                           <h3 className="font-bold text-slate-800 text-sm">Blank Canvas</h3>
                           <p className="text-[10px] text-slate-400 mt-1">Mulai halaman dari nol</p>
                        </button>


                        <button 
                          onClick={() => setSelectedTemplate('komisi')}
                          className={`p-6 rounded-3xl border-2 text-left transition-all ${selectedTemplate === 'komisi' ? 'border-orange-600 bg-orange-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                        >
                           <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                              <Zap className="w-5 h-5 text-orange-600" />
                           </div>
                           <h3 className="font-bold text-slate-800 text-sm">Komisi 30%</h3>
                           <p className="text-[10px] text-slate-400 mt-1">Template Project Wakrod</p>
                        </button>

                        <button 
                          onClick={() => setSelectedTemplate('tekotok')}
                          className={`p-6 rounded-3xl border-2 text-left transition-all ${selectedTemplate === 'tekotok' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                        >
                           <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                              <Smartphone className="w-5 h-5 text-blue-600" />
                           </div>
                           <h3 className="font-bold text-slate-800 text-sm">Tekotok V1</h3>
                           <p className="text-[10px] text-slate-400 mt-1">Template Original</p>
                        </button>

                        <button 
                          onClick={() => setSelectedTemplate('tekotok2')}
                          className={`p-6 rounded-3xl border-2 text-left transition-all ${selectedTemplate === 'tekotok2' ? 'border-pink-500 bg-pink-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                        >
                           <div className="w-10 h-10 bg-pink-100 rounded-2xl flex items-center justify-center mb-4">
                              <Smartphone className="w-5 h-5 text-pink-500" />
                           </div>
                           <h3 className="font-bold text-slate-800 text-sm">Tekotok V2 Premium</h3>
                           <p className="text-[10px] text-slate-400 mt-1">Desain Dark & Serif (Ghost Live)</p>
                        </button>
                     </div>
                  </div>
               </div>

              <div className="p-10 pt-4 flex gap-4">
                 <button 
                   onClick={() => setShowModal(false)}
                   className="flex-1 py-5 border border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                 >
                   Batal
                 </button>
                 <button 
                   onClick={confirmNewPage}
                   disabled={!newSlug || saving}
                   className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl shadow-slate-200"
                 >
                   {saving ? '...' : 'Buat Halaman'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
