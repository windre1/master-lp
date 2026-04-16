
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://arqnjfwqsnfqndfriyim.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFycW5qZndxc25mcW5kZnJpeWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjUzNTAsImV4cCI6MjA5MTg0MTM1MH0.h2JhGzem_xru9tkrAh0q2J3g25FVdKTH_EgByNughcw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const blocks = [
  { 
    id: 'hero-1', 
    type: 'hero', 
    data: { 
      title: '👉 Dapat Komisi 30% Tanpa Punya Produk Sendiri',
      subtitle: 'Gabung jadi Affiliate di Wakrod Project — cukup share link, komisi jalan otomatis, bahkan bisa terus mengalir selamanya.',
      ctaText: '👉 Amankan Slot & Join GMeet Sekarang',
      ctaLink: '#',
      badge: 'center'
    } 
  },
  {
    id: 'intro-text',
    type: 'text_only',
    data: {
      subtitle: '⚠️ Detail lengkap sistem akan dibahas eksklusif di GMeet (slot terbatas)',
      badge: 'center',
      textColor: '#ef4444',
      fontSize: '20'
    }
  },
  { 
    id: 'problem-1', 
    type: 'problem', 
    data: { 
      title: 'Capek Jualan Tapi Gak Punya Produk?', 
      subtitle: '👉 Sekarang saatnya ubah cara main.',
      items: [
        { t: 'Bingung Produk Apa', d: 'Mau jualan tapi bingung harus mulai dari produk mana.' },
        { t: 'Komisi Kecil', d: 'Sering coba affiliate tapi hasilnya tipis banget.' },
        { t: 'One-Time Payment', d: 'Sekali closing selesai, gak ada penghasilan lanjutan.' },
        { t: 'Mulai Dari Nol', d: 'Harus terus-terusan cari traffic baru tanpa hasil long-term.' }
      ]
    } 
  },
  { 
    id: 'solution-1', 
    type: 'solution', 
    data: { 
      title: 'Kenalan dengan Wakrod Project', 
      subtitle: '👉 Semua sudah disiapkan, kamu tinggal jalanin.',
      items: [
        { t: 'Affiliate Komisi Besar', d: 'Dapatkan bagi hasil hingga 30% per transaksi.' },
        { t: 'Tanpa Stok Barang', d: 'Bangun income tanpa pusing urusan logistik atau stok.' },
        { t: 'Update Jadi Seller', d: 'Bisa jualan produk sendiri dengan sistem yang simpel.' }
      ]
    } 
  },
  {
    id: 'offer-heading',
    type: 'heading',
    data: { title: '💸 Komisi 30% Tanpa Ribet', badge: 'center', textColor: '#0f172a' }
  },
  {
    id: 'offer-desc',
    type: 'text_only',
    data: {
      subtitle: 'Bayangin kamu cuma share link...\n\n➡️ Ada yang beli → kamu dapat komisi\n➡️ Mereka beli lagi → kamu tetap dapat komisi\n➡️ Bahkan beli produk lain → kamu tetap kebagian\n\n🔥 Karena sistem kami pakai lifetime cookies',
      badge: 'center',
      fontSize: '22',
      textColor: '#334155'
    }
  },
  {
    id: 'recurring-heading',
    type: 'heading',
    data: { title: 'Sekali Refer, Dibayar Selamanya', badge: 'center', textColor: '#2563eb' }
  },
  {
    id: 'recurring-desc',
    type: 'text_only',
    data: {
      subtitle: 'Ini bukan affiliate biasa. Si A daftar dari link kamu, beli hari ini kamu untung. Besok dia beli lagi, kamu tetap untung. Bahkan tahun depan pun masih dapat. Ini sistem income jangka panjang.',
      badge: 'center',
      fontSize: '18'
    }
  },
  {
    id: 'dual-role',
    type: 'price_list',
    data: {
      items: [
        { title: 'Affiliate Income', desc: 'Dapatkan komisi 30% dari setiap referral yang belanja.', ctaText: 'Join Affiliate', ctaLink: '#', textColor: '#0f172a', buttonColor: '#2563eb' },
        { title: 'Seller Income', desc: 'Upload produk sendiri, kena fee hanya 5% saja.', ctaText: 'Join Seller', ctaLink: '#', textColor: '#0f172a', buttonColor: '#0f172a' }
      ]
    }
  },
  {
    id: 'barrier',
    type: 'features',
    data: {
      title: 'Mulai Tanpa Modal',
      items: [
        { t: 'Gratis Daftar', d: 'Tanpa biaya registrasi sama sekali.' },
        { t: 'Tanpa Stok', d: 'Fokus promosi, sisanya kami yang urus.' },
        { t: 'Tanpa Ribet Teknis', d: 'Link sudah siap, sistem sudah matang.' }
      ]
    }
  },
  {
    id: 'gmeet-trigger',
    type: 'heading',
    data: { title: '⚠️ Ini Belum Dibuka Publik', badge: 'center', textColor: '#ef4444' }
  },
  {
    id: 'gmeet-desc',
    type: 'text_only',
    data: {
      subtitle: 'Semua sistem ini akan dijelaskan lengkap di sesi GMeet eksklusif: Cara kerja komisi, Strategi closing, dan Maximizing recurring income.',
      badge: 'center',
      fontSize: '18'
    }
  },
  {
    id: 'final-cta',
    type: 'cta',
    data: {
      title: 'Siap Dapetin Komisi 30% Tanpa Produk?',
      subtitle: 'Gratis. Tanpa risiko. Tapi slot sangat terbatas karena batch awal.',
      ctaText: '👉 Daftar Sekarang & Amankan Slot GMeet',
      ctaLink: '#',
      buttonColor: '#ef4444'
    }
  }
];

async function save() {
  const { error } = await supabase
    .from('landing_pages')
    .upsert({ 
      slug: 'komisi30persen', 
      content: { blocks } 
    }, { onConflict: 'slug' });

  if (error) {
    console.error('Error saving LP:', error);
  } else {
    console.log('Landing page komisi30persen saved successfully!');
  }
}

save();
