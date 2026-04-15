export default function FAQ() {
  const faqs = [
    { q: "Apakah ini aman untuk akun saya?", a: "Sangat aman. Kami menggunakan official API dan sistem yang sudah teruji untuk menjaga akun Anda tetap dalam batas wajar." },
    { q: "Apakah ada biaya langganan bulanan?", a: "Tidak ada. Cukup sekali bayar dan Anda mendapatkan akses selamanya (Lifetime Access)." },
    { q: "Bagaimana jika saya butuh bantuan?", a: "Tim support kami stand-by 24/7 melalui WhatsApp dan Email untuk membantu kendala teknis Anda." }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container px-6 mx-auto max-w-3xl">
        <h2 className="text-3xl font-black text-slate-900 mb-12 tracking-tighter text-center">Tanya Jawab (FAQ)</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
               <h4 className="font-black text-slate-900 mb-3 text-lg leading-tight tracking-tight">{f.q}</h4>
               <p className="text-sm text-slate-500 leading-relaxed font-medium">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
