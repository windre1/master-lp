/**
 * PRODUCTION TEMPLATE DATA
 * 
 * Untuk membuat Landing Page baru:
 * Tambahkan objek baru ke dalam array 'templates' di bawah ini 
 * dengan 'slug' yang unik.
 */

export interface Template {
  slug: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export const templates: Template[] = [
  {
    slug: "digital-sales-pro",
    title: "Digital Sales Pro",
    category: "Tools & Software",
    description: "Template premium untuk penjualan software, tools digital, atau aplikasi SaaS. Fokus pada konversi tinggi.",
    price: 149000,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "masterclass-elite",
    title: "Masterclass Elite",
    category: "E-Course & Kelas",
    description: "Khusus untuk kursus online, e-course, atau webinar. Dilengkapi section kurikulum dan profil pengajar.",
    price: 299000,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "agency-service-v1",
    title: "Agency Service V1",
    category: "Jasa & Agency",
    description: "Template profesional untuk jasa pembuatan website, landing page, atau jasa kreatif lainnya.",
    price: 499000,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
  }
];
