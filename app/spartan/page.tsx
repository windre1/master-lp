'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { 
  Check, 
  X, 
  ArrowRight, 
  Youtube, 
  Monitor, 
  Cpu, 
  TrendingUp, 
  Smartphone, 
  Search, 
  Zap, 
  Layers, 
  Database, 
  Download, 
  Play, 
  Upload, 
  ShieldAlert,
  AlertCircle,
  Clock,
  Layout,
  Users,
  Target,
  BarChart3,
  Globe
} from 'lucide-react';

/**
 * =====================================================================
 * DATA TEMPLATE - EDIT KONTEN DI SINI
 * =====================================================================
 */
const LP_CONTENT = {
  navigation: {
    logo: "SPARTAN TUBE",
    links: [
      { name: "Fitur", href: "#features" },
      { name: "Hasil", href: "#hasil" },
      { name: "Harga", href: "#pricing" },
    ],
    cta: {
      text: "COBA GRATIS",
      href: "https://drive.google.com/drive/folders/10vrgOHk6pdcI7jNKO1PpxoylEJUW9tof?usp=sharing"
    }
  },
  hero: {
    badge: "🔥 PERHATIAN UNTUK CREATOR YOUTUBE YANG SERIUS MAU GROW",
    headline: "Berhenti Kerja Keras. Mulailah Kerja Cerdas, Pakai SISTEM yang Terintegrasi dengan AI.",
    description: "Jika Anda masih sering merasa bimbang dalam menentukan konsep konten, melakukan proses unggah tanpa landasan strategi yang terukur, serta menghabiskan seluruh waktu untuk pekerjaan manual yang melelahkan... inilah saatnya mengenal Spartan Tube. Sebuah ekosistem pertumbuhan YouTube otomatis yang dirancang khusus untuk menyederhanakan, mengoptimalkan, dan mengintegrasikan seluruh alur kerja kreatif Anda secara elegan dengan dukungan kecerdasan buatan.",
    cta: {
      text: "BELI SEKARANG",
      href: "#pricing"
    }
  },
  problem: {
    title: "💥 MASALAH BESAR YANG TIDAK DISADARI CREATOR",
    subtitle: "Kebanyakan creator gagal bukan karena tidak memiliki skill, melainkan karena tidak memiliki SISTEM yang mumpuni.",
    cards: [
      {
        title: "Tidak Punya Arah",
        desc: "Menghabiskan waktu mencari ide namun views tetap stagnan karena tidak berlandaskan data yang akurat.",
        icon: <Target className="w-8 h-8 text-red-500" />
      },
      {
        title: "Workflow Terputus",
        desc: "Alur kerja dari ide hingga proses unggah tidak terhubung. Membuat konten menjadi rumit saat akan dipublikasikan.",
        icon: <Layers className="w-8 h-8 text-red-500" />
      },
      {
        title: "Capek Manual",
        desc: "Mengerjakan semuanya secara manual sangat melelahkan dan menyita waktu. Sulit untuk scale.",
        icon: <Clock className="w-8 h-8 text-red-500" />
      },
      {
        title: "Bingung Kelola Banyak Channel",
        desc: "Mengurus 1 channel saja sudah ribet, apalagi banyak channel sekaligus. Tanpa sistem, semuanya jadi berantakan.",
        icon: <Layout className="w-8 h-8 text-red-500" />
      },
      {
        title: "Tidak Konsisten Upload",
        desc: "Sering skip upload karena tidak punya perencanaan konten yang jelas. Akibatnya channel sulit berkembang.",
        icon: <Zap className="w-8 h-8 text-red-500" />
      },
      {
        title: "Tidak Tahu Strategi Kompetitor",
        desc: "Tidak tahu konten apa yang berhasil di market. Akhirnya hanya trial-error tanpa arah yang jelas.",
        icon: <Search className="w-8 h-8 text-red-500" />
      }
    ],
    closing: "Masalahnya bukan di kemampuan Anda…",
    highlinedClosing: "Tapi di SISTEM yang Anda gunakan."
  },
  solutionIntro: {
    badge: "🧠 SOLUSINYA: SPARTAN TUBE",
    title: "IDE → ANALISA → PRODUKSI → UPLOAD",
    description: "Bukan sekadar tools... Ini adalah mesin pertumbuhan channel YouTube dalam SATU dashboard.",
    image: "/assets/hero.png" // Pastikan file ini ada di public/assets/
  },
  demo: {
    title: "SIMAK BAGAIMANA SPARTAN TUBE BEKERJA",
    videoYoutubeId: "EEobrUpwnj4"
  },
  features: {
    title: "⚔️ 12 SENJATA UTAMA SPARTAN TUBE",
    subtitle: "Eksplorasi seluruh ekosistem pertumbuhan YouTube otomatis Anda.",
    items: [
      {
        id: 1,
        title: "Dashboard Intelligence",
        desc: "Analisis channel kompetitor, identifikasi video dengan performa terbaik, dan ambil insight berharga untuk Anda adaptasi secara real-time langsung dari pusat kontrol Anda.",
        image: "/assets/fitur1.png",
        icon: <Layout className="w-8 h-8" />
      },
      {
        id: 2,
        title: "Content Planner",
        desc: "Atur jadwal konten harian, mingguan dan bulanan untuk masing-masing channel. Hilangkan kebingungan \"upload apa hari ini\" dengan sistem perencanaan otomatis.",
        image: "/assets/fitur2.png",
        icon: <Layout className="w-8 h-8" />
      },
      {
        id: 3,
        title: "Multi-Channel Management",
        desc: "Kelola dan pantau perkembangan puluhan hingga ratusan channel sekaligus dalam satu tampilan yang terintegrasi. Skala bisnis Anda tanpa batas.",
        image: "/assets/fitur3.png",
        icon: <Users className="w-8 h-8" />
      },
      {
        id: 4,
        title: "Advanced Analytics",
        desc: "Pantau pertumbuhan views, subscribers, hingga performa video secara mendalam. Biarkan data yang berbicara, bukan sekadar insting creator.",
        image: "/assets/fitur4.png",
        icon: <BarChart3 className="w-8 h-8" />
      },
      {
        id: 5,
        title: "Competitor Checker",
        desc: "Pantau strategi kompetitor secara cepat, lihat konten apa yang berhasil mereka buat, and temukan celah untuk mengungguli performa mereka.",
        image: "/assets/fitur5.png",
        icon: <Search className="w-8 h-8" />
      },
      {
        id: 6,
        title: "Trend Scanner",
        desc: "Dapatkan informasi tren yang sedang naik daun di YouTube secara real-time. Temukan ide viral sebelum orang lain mengetahuinya.",
        image: "/assets/fitur6.png",
        icon: <TrendingUp className="w-8 h-8" />
      },
      {
        id: 7,
        title: "Prompt Extractor",
        desc: "Teknologi ekstraksi prompt AI dari visual untuk membantu Anda menciptakan referensi gambar atau konten yang setara dengan kualitas top global.",
        image: "/assets/fitur7.png",
        icon: <Zap className="w-8 h-8" />
      },
      {
        id: 8,
        title: "AI Command Tools",
        desc: "Eksosistem AI lengkap untuk optimasi metadata, penulisan judul SEO, hingga penghapusan watermark secara otomatis dan massal.",
        image: "/assets/fitur8.png",
        icon: <Cpu className="w-8 h-8" />
      },
      {
        id: 9,
        title: "Prompt Library",
        desc: "Penyimpanan aman untuk seluruh library prompt terbaik Anda. Replikasi alur kerja produksi Anda ke ribuan konten dengan satu klik saja.",
        image: "/assets/fitur9.png",
        icon: <Database className="w-8 h-8" />
      },
      {
        id: 10,
        title: "Video Downloader Pro",
        desc: "Ambil referensi konten, audio, hingga metadata dari ribuan video YouTube secara instan untuk diolah kembali (repurpose) secara cerdas.",
        image: "/assets/fitur10.png",
        icon: <Download className="w-8 h-8" />
      },
      {
        id: 11,
        title: "Video Renderer",
        desc: "Render ribuan konten original secara otomatis tanpa pusing edit manual. Solusi produksi massal untuk pemain multi-channel profesional.",
        image: "/assets/fitur11.png",
        icon: <Play className="w-8 h-8" />
      },
      {
        id: 12,
        title: "Auto-Upload Engine",
        desc: "Sistem pengiriman konten otomatis ke server YouTube lengkap dengan pemilihan judul, deskripsi, tag, and optimasi visibilitas secara massal.",
        image: "/assets/fitur12.png",
        icon: <Upload className="w-8 h-8" />
      }
    ]
  },
  comparison: {
    title: "⚡ SEMUA DALAM 1 SYSTEM",
    traditional: {
      title: "Alur Kerja Tradisional:",
      items: [
        "❌ Tool A untuk trend",
        "❌ Tool B untuk analytics",
        "❌ Tool C untuk downloader",
        "❌ Tool D untuk editing",
        "❌ Tool E untuk upload"
      ],
      footer: "Ribet, Mahal, Tidak Sinkron."
    },
    spartan: {
      title: "Dengan Spartan Tube:",
      items: [
        "✔ IDE & RISET Konten",
        "✔ ANALISA Kompetitor",
        "✔ PRODUKSI Aset Video",
        "✔ UPLOAD Otomatis"
      ],
      footer: "SEMUA TERINTEGRASI."
    }
  },
  pricing: {
    title: "🚀 PILIH PAKET UNTUK MULAI GROW",
    subtitle: "Miliki pusat komando YouTube Anda hari ini dan otomatisasi seluruh alur kerja Anda hingga ke akar-akarnya.",
    plans: [
      {
        name: "PAKET 1 TAHUN",
        price: "147rb",
        period: "/ tahun",
        featured: false,
        features: [
          "Akses Semua Fitur AI",
          "Masa Aktif 1 Tahun",
          "Free Update (1 Tahun)",
          "WhatsApp Group Support",
          "Lisensi 1 Device PC"
        ],
        ctaLink: "https://www.wakrod.my.id/order/f0f52950-2e18-4d47-8692-ddd0a84bec8c"
      },
      {
        name: "PAKET LIFETIME",
        price: "299rb",
        period: "/ selamanya",
        featured: true,
        badge: "TERPOPULER",
        features: [
          "SEMUA Fitur AI",
          "Akses Selamanya",
          "Free Update Selamanya",
          "WhatsApp Group Support",
          "Prioritas Update & Fitur"
        ],
        ctaLink: "https://www.wakrod.my.id/order/d6058735-7573-4ee5-b0c5-5701b146e05f"
      },
      {
        name: "PAKET AGENCY",
        price: "597rb",
        period: "/ tahun",
        featured: false,
        features: [
          "Akses Selamanya",
          "Jual Paket Lisensi Bebas",
          "Marketing Kit Lengkap",
          "Landing Page (LP) Jualan",
          "Group Support Eksklusif",
          "Potensi Penghasilan 100%"
        ],
        ctaLink: "https://www.wakrod.my.id/order/77296187-37d7-4228-a708-ffbb9961a547"
      }
    ]
  },
  target: {
    title: "🔥 SIAPA YANG COCOK PAKAI SPARTAN TUBE?",
    subtitle: "👉 Bukan untuk semua orang. Tapi WAJIB untuk yang serius mau growth.",
    cards: [
      {
        title: "Creator yang Mau Channelnya Naik Level",
        desc: "Bukan cuma upload… tapi mau punya strategi yang jelas dan berbasis data untuk menjangkau audiens lebih luas.",
        icon: <Users className="w-8 h-8 text-cyan-400" />
      },
      {
        title: "Builder Banyak Channel (Multi Channel Player)",
        desc: "Yang kelola 2, 5, bahkan puluhan channel sekaligus dan butuh sistem pusat agar semua tetap terkendali tanpa kekacauan.",
        icon: <Globe className="w-8 h-8 text-cyan-400" />
      },
      {
        title: "Pemburu Konten Viral",
        desc: "Yang ingin selalu selangkah lebih cepat dalam menemukan ide yang sedang naik daun di YouTube sebelum orang lain menyadarinya.",
        icon: <TrendingUp className="w-8 h-8 text-cyan-400" />
      },
      {
        title: "Creator Berbasis AI & Automation",
        desc: "Yang ingin workflow cepat, scalable, and minim kerja manual demi efisiensi produksi konten yang maksimal.",
        icon: <Zap className="w-8 h-8 text-cyan-400" />
      },
      {
        title: "Digital Marketer & Affiliate Player",
        desc: "Yang menggunakan YouTube sebagai mesin traffic dan sumber penghasilan utama, bukan sekadar hobi sampingan.",
        icon: <Smartphone className="w-8 h-8 text-cyan-400" />
      },
      {
        title: "Agency & Tim Konten",
        desc: "Yang butuh sistem untuk mengelola banyak klien secara profesional tanpa ribet dan tetap memegang kendali penuh.",
        icon: <Users className="w-8 h-8 text-cyan-400" />
      }
    ]
  },
  specs: {
    title: "💻 SPESIFIKASI DEVICE YANG DISARANKAN",
    subtitle: "Untuk mendapatkan performa optimal saat menggunakan Spartan Tube, disarankan menggunakan:",
    minimum: [
      { label: "OS", value: "Windows 10 / 11 (64-bit)" },
      { label: "RAM", value: "4 GB" },
      { label: "Storage", value: "2 GB ruang kosong" },
      { label: "Koneksi", value: "Internet stabil" }
    ],
    recommended: [
      { label: "OS", value: "Windows 10 / 11 (64-bit)" },
      { label: "RAM", value: "8 GB atau lebih" },
      { label: "Storage", value: "SSD (rendering lebih cepat)" },
      { label: "Koneksi", value: "Internet cepat & stabil" }
    ],
    note: [
      "Fitur seperti video rendering dan download akan lebih optimal pada device dengan spesifikasi lebih tinggi.",
      "Tidak disarankan menggunakan device dengan spesifikasi rendah untuk penggunaan multi-channel atau batch processing."
    ]
  },
  disclaimer: {
    title: "⚠️ DISCLAIMER",
    content: [
      "Spartan Tube adalah tools berbasis AI dan automation yang dirancang untuk membantu mempercepat workflow dan pengambilan keputusan dalam pengelolaan channel YouTube.",
      "Hasil yang didapatkan setiap pengguna dapat berbeda-beda, tergantung pada konsistensi penggunaan, strategi konten yang diterapkan, serta niche dan kondisi market masing-masing.",
      "Spartan Tube tidak menjamin hasil instan atau viral secara otomatis, namun memberikan sistem dan data yang membantu meningkatkan peluang keberhasilan secara signifikan.",
      "Pengguna tetap bertanggung jawab atas konten yang dibuat dan dipublikasikan sesuai dengan kebijakan platform YouTube."
    ]
  },
  closing: {
    headline: "⚔️ Spartan Tube bukan sekadar tools…",
    subheadline: "tapi sistem yang membantu Anda bekerja lebih cepat, lebih cerdas, dan lebih terarah.",
    cta: "MULAI SEKARANG"
  },
  footer: {
    copy: "© 2026 Spartan Tube - Publikasikan Konten Anda Secara Otomatis Hingga Tuntas. ⚔️"
  }
};

/**
 * =====================================================================
 * KOMPONEN UTAMA
 * =====================================================================
 */
export default function SpartanTemplate() {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-reveal');
        }
      });
    }, { threshold: 0.15 });

    revealRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="bg-[#050a15] text-[#e2e8f0] font-sans selection:bg-cyan-500 selection:text-white">
      {/* Background Animation */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-[#3d5afe]/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[60%] left-[70%] w-[400px] h-[400px] bg-[#00f2ff]/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <style jsx global>{`
        .reveal-element {
          opacity: 0;
          transform: translateY(40px);
          transition: 0.8s all cubic-bezier(0.23, 1, 0.32, 1);
        }
        .active-reveal {
          opacity: 1;
          transform: translateY(0);
        }
        .glass-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .text-glow {
          text-shadow: 0 0 15px rgba(0, 242, 255, 0.4);
        }
        .neon-border {
          border-color: #00f2ff;
          box-shadow: 0 0 15px rgba(0, 242, 255, 0.3);
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-[1000] bg-black/80 backdrop-blur-md border-b border-white/10 py-4 transition-all duration-300">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-extrabold text-[#00f2ff] tracking-[2px]">{LP_CONTENT.navigation.logo}</div>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {LP_CONTENT.navigation.links.map((link, i) => (
              <a key={i} href={link.href} className="text-sm font-semibold hover:text-[#00f2ff] transition-colors">
                {link.name}
              </a>
            ))}
            <a 
              href={LP_CONTENT.navigation.cta.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 border-2 border-[#00f2ff] text-[#00f2ff] rounded-full text-xs font-bold hover:bg-[#00f2ff] hover:text-black transition-all shadow-[0_0_15px_rgba(0,242,255,0.2)]"
            >
              {LP_CONTENT.navigation.cta.text}
            </a>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pb-20">
        
        {/* Hero Section */}
        <section className="reveal-element pt-32 pb-24 text-center max-w-5xl mx-auto" ref={addToRefs}>
          <h4 className="text-[#00f2ff] text-xs md:text-sm font-bold tracking-[3px] uppercase mb-6">{LP_CONTENT.hero.badge}</h4>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-8 bg-gradient-to-br from-white to-indigo-300 bg-clip-text text-transparent">
            {LP_CONTENT.hero.headline.split('SISTEM').map((t, i, arr) => (
              <React.Fragment key={i}>
                {t}
                {i < arr.length - 1 && <span className="text-[#00f2ff] shadow-[#00f2ff] active:text-glow"> SISTEM </span>}
              </React.Fragment>
            ))}
          </h1>
          <p className="text-[#94a3b8] text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            {LP_CONTENT.hero.description}
          </p>
          <div className="flex justify-center">
            <a href={LP_CONTENT.hero.cta.href} className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold uppercase tracking-wider shadow-[0_10px_25px_rgba(0,242,255,0.3)] hover:scale-105 transition-transform">
              {LP_CONTENT.hero.cta.text}
            </a>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="reveal-element py-20" ref={addToRefs}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{LP_CONTENT.problem.title}</h2>
            <p className="text-[#94a3b8]">{LP_CONTENT.problem.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LP_CONTENT.problem.cards.map((card, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl hover:border-[#00f2ff] hover:-translate-y-2 transition-all group">
                <div className="mb-6 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-[#94a3b8] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <p className="text-xl font-bold">{LP_CONTENT.problem.closing}</p>
            <p className="text-3xl md:text-4xl font-extrabold text-red-500 mt-2 text-glow">{LP_CONTENT.problem.highlinedClosing}</p>
          </div>
        </section>

        {/* Solution Intro */}
        <section className="reveal-element py-20" ref={addToRefs}>
          <div className="glass-card p-8 md:p-16 rounded-[40px] text-center max-w-5xl mx-auto border border-white/5">
            <h4 className="text-[#00f2ff] font-bold tracking-[2px] mb-4">{LP_CONTENT.solutionIntro.badge}</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8">{LP_CONTENT.solutionIntro.title}</h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto">{LP_CONTENT.solutionIntro.description}</p>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,242,255,0.2)] group">
              <img 
                src={LP_CONTENT.solutionIntro.image} 
                alt="Dashboard" 
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>
        </section>

        {/* Video Demo */}
        <section className="reveal-element py-20" ref={addToRefs}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase">{LP_CONTENT.demo.title}</h2>
          </div>
          <div className="max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${LP_CONTENT.demo.videoYoutubeId}`}
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 mt-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{LP_CONTENT.features.title}</h2>
            <p className="text-[#94a3b8]">{LP_CONTENT.features.subtitle}</p>
          </div>

          <div className="space-y-24">
            {LP_CONTENT.features.items.map((item, i) => (
              <div 
                key={item.id} 
                className={`reveal-element flex flex-col items-center text-center glass-card p-8 md:p-16 rounded-[40px] max-w-5xl mx-auto border border-white/10 hover:border-[#00f2ff]/30 transition-all`}
                ref={addToRefs}
              >
                 <div className="w-16 h-16 bg-[#00f2ff]/10 rounded-full flex items-center justify-center border border-[#00f2ff]/50 text-[#00f2ff] mb-6">
                  {item.icon}
                </div>
                <h4 className="text-[#00f2ff] font-bold text-sm tracking-[3px] uppercase mb-4">Fitur {item.id}</h4>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">{item.title}</h3>
                <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto mb-12 leading-relaxed">{item.desc}</p>
                <div className="w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                   <img src={item.image} alt={item.title} className="w-full hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section id="hasil" className="reveal-element py-20" ref={addToRefs}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">{LP_CONTENT.comparison.title}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch gap-12 max-w-6xl mx-auto">
            <div className="glass-card p-10 rounded-3xl opacity-80 border-red-500/20">
              <h3 className="text-2xl font-bold mb-6">{LP_CONTENT.comparison.traditional.title}</h3>
              <ul className="space-y-4 mb-8">
                {LP_CONTENT.comparison.traditional.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-red-100/70">{item}</li>
                ))}
              </ul>
              <p className="text-red-500 font-bold text-xl">{LP_CONTENT.comparison.traditional.footer}</p>
            </div>

            <div className="hidden lg:flex flex-col items-center justify-center relative">
               <div className="w-px h-full bg-white/10"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#050a15] border-2 border-[#00f2ff] flex items-center justify-center text-[#00f2ff] font-black text-xl z-10 shadow-[0_0_20px_rgba(0,242,255,0.4)]">VS</div>
            </div>

            <div className="glass-card p-10 rounded-3xl neon-border border-2">
              <h3 className="text-2xl font-bold mb-6 text-[#00f2ff]">{LP_CONTENT.comparison.spartan.title}</h3>
              <ul className="space-y-4 mb-8">
                {LP_CONTENT.comparison.spartan.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-medium">{item}</li>
                ))}
              </ul>
              <p className="text-[#00f2ff] font-extrabold text-2xl tracking-wide">{LP_CONTENT.comparison.spartan.footer}</p>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section id="pricing" className="reveal-element py-32 bg-blue-600/5 rounded-[60px] my-20" ref={addToRefs}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{LP_CONTENT.pricing.title}</h2>
            <p className="text-[#94a3b8] max-w-2xl mx-auto px-4">{LP_CONTENT.pricing.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {LP_CONTENT.pricing.plans.map((plan, i) => (
              <div key={i} className={`flex flex-col justify-between p-8 md:p-12 rounded-[40px] transition-all relative ${plan.featured ? 'bg-[#0a1128] border-2 border-[#00f2ff] shadow-[0_0_40px_rgba(0,242,255,0.1)] scale-105 z-10' : 'bg-[#0a1128] border border-white/10'}`}>
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00f2ff] text-[#050a15] px-6 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                    {plan.badge}
                  </div>
                )}
                <div>
                  <h3 className={`text-xl font-bold mb-6 ${plan.featured ? 'text-[#00f2ff]' : ''}`}>{plan.name}</h3>
                  <div className="text-4xl font-black mb-1">{plan.price} <span className="text-sm text-[#94a3b8] font-normal">{plan.period}</span></div>
                  <ul className="space-y-4 my-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        <Check className="w-5 h-5 text-[#00f2ff]" /> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <a 
                  href={plan.ctaLink} 
                  className={`w-full py-4 rounded-full font-bold text-center transition-all ${plan.featured ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg' : 'border-2 border-[#00f2ff] text-[#00f2ff] hover:bg-[#00f2ff] hover:text-[#050a15]'}`}
                >
                  BELI SEKARANG
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Target Audience */}
        <section id="target-audience" className="reveal-element py-20" ref={addToRefs}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{LP_CONTENT.target.title}</h2>
            <p className="text-[#ff4444] font-bold text-xl">{LP_CONTENT.target.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LP_CONTENT.target.cards.map((card, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border-white/5 hover:border-cyan-500/30 transition-all">
                <div className="mb-6">{card.icon}</div>
                <h3 className="text-lg font-bold mb-4">{card.title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specs Section */}
        <section className="reveal-element py-20" ref={addToRefs}>
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{LP_CONTENT.specs.title}</h2>
            <p className="text-[#94a3b8] max-w-2xl mx-auto">{LP_CONTENT.specs.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-10 rounded-[30px] border-white/5">
              <h3 className="text-xl font-bold mb-8 text-white/70">Minimum</h3>
              <ul className="space-y-4">
                {LP_CONTENT.specs.minimum.map((spec, i) => (
                  <li key={i} className="text-sm flex justify-between border-b border-white/5 pb-2">
                    <span className="font-bold opacity-60 tracking-wider text-[10px] uppercase">{spec.label}</span>
                    <span className="text-[#94a3b8]">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-10 rounded-[30px] border-[#00f2ff]/20 bg-[#00f2ff]/5">
              <h3 className="text-xl font-bold mb-8 text-[#00f2ff]">Rekomendasi</h3>
              <ul className="space-y-4">
                {LP_CONTENT.specs.recommended.map((spec, i) => (
                  <li key={i} className="text-sm flex justify-between border-b border-white/5 pb-2">
                    <span className="font-bold text-[#00f2ff] tracking-wider text-[10px] uppercase">{spec.label}</span>
                    <span>{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-8 px-4 opacity-50 text-[11px] leading-relaxed">
            <p className="font-bold uppercase tracking-widest mb-2">Catatan:</p>
            <ul className="list-disc pl-5 space-y-1">
              {LP_CONTENT.specs.note.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </div>
        </section>

        {/* Disclaimer */}
        <section id="disclaimer" className="reveal-element py-20 border-y border-white/5 bg-white/[0.02]" ref={addToRefs}>
          <div className="max-w-3xl mx-auto px-4">
             <h3 className="text-orange-500 font-bold text-lg mb-8 flex items-center gap-3">
               <ShieldAlert className="w-6 h-6" /> {LP_CONTENT.disclaimer.title}
             </h3>
             <div className="space-y-4 text-sm text-[#94a3b8] leading-relaxed">
                {LP_CONTENT.disclaimer.content.map((p, i) => <p key={i}>{p}</p>)}
             </div>
          </div>
        </section>

        {/* Closing Final */}
        <section className="reveal-element py-32 text-center" ref={addToRefs}>
           <h2 className="text-3xl md:text-5xl font-extrabold mb-12 leading-tight">
             {LP_CONTENT.closing.headline} <br/>
             <span className="text-[#00f2ff] text-xl md:text-2xl font-bold tracking-widest">{LP_CONTENT.closing.subheadline}</span>
           </h2>
           <a href="#pricing" className="px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-black text-lg tracking-widest hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all uppercase">
             {LP_CONTENT.closing.cta}
           </a>
        </section>

      </main>

      <footer className="py-12 border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-4 text-center">
            <div className="text-2xl font-black text-[#00f2ff] tracking-[4px] mb-6">{LP_CONTENT.navigation.logo}</div>
            <p className="text-[#94a3b8] text-xs uppercase tracking-widest font-medium">
              {LP_CONTENT.footer.copy}
            </p>
        </div>
      </footer>
    </div>
  );
}
