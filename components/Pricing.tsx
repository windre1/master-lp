interface PricingProps {
  price: number;
}

export default function Pricing({ price }: PricingProps) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(price);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">Investasi Terbaik Anda</h2>
           <p className="text-slate-500 font-medium">Pilih paket yang paling sesuai dengan ambisi bisnis Anda.</p>
        </div>

        <div className="max-w-xl mx-auto">
           <div className="bg-indigo-600 rounded-[3rem] p-1 shadow-2xl shadow-indigo-200">
              <div className="bg-white rounded-[2.8rem] p-10 md:p-16 text-center">
                 <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-8 inline-block">Most Popular</span>
                 <h4 className="text-2xl font-black text-slate-900 mb-2">Lifetime Access</h4>
                 <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="text-slate-400 line-through text-lg">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price * 2.5)}</span>
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">{formattedPrice}</span>
                 </div>
                 
                 <ul className="text-left space-y-4 mb-12">
                    {['Akses Selamanya', 'Update Fitur Gratis', 'Support VIP 24/7', 'Cloud Storage 100GB'].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {f}
                      </li>
                    ))}
                 </ul>
                 
                 <button className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 uppercase tracking-widest text-xs">
                    Ambil Penawaran Sekarang
                 </button>
                 <p className="mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    Pembayaran Aman & Terenkripsi
                 </p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
