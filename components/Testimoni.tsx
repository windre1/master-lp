export default function Testimoni() {
  const testimonials = [
    { n: "Budi Santoso", r: "CEO TechIn", c: "Dulu pusing manage 10 akun TikTok, sekarang ditinggal tidur pun konten jalan terus. Omzet naik 300%!", a: "https://i.pravatar.cc/150?u=budi" },
    { n: "Sari Wijaya", r: "Digital Creator", c: "Tools paling gila yang pernah saya coba. User interfacenya gampang banget dipahami bahkan buat pemula.", a: "https://i.pravatar.cc/150?u=sari" }
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container px-6 mx-auto">
        <h2 className="text-center text-3xl md:text-5xl font-black text-slate-900 mb-16 tracking-tighter">Apa Kata Mereka?</h2>
        
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 relative">
               <div className="absolute top-10 right-10 text-slate-100">
                  <svg className="w-16 h-16 fill-current" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2262 3 23.017 4.79086 23.017 7V15C23.017 17.2091 21.2262 19 19.017 19H17.517C17.2408 19 17.017 21.2386 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C1.91243 8 1.017 7.10457 1.017 6V5C1.017 3.89543 1.91243 3 3.017 3H6.017C8.22614 3 10.017 4.79086 10.017 7V15C10.017 17.2091 8.22614 19 6.017 19H4.517C4.24086 19 4.017 21.2386 4.017 21H1.017Z"/></svg>
               </div>
               <p className="text-xl text-slate-700 italic leading-relaxed mb-10 relative z-10 font-medium">"{t.c}"</p>
               <div className="flex items-center gap-4">
                  <img src={t.a} alt={t.n} className="w-14 h-14 rounded-2xl object-cover" />
                  <div>
                    <h5 className="font-black text-slate-900 leading-none mb-1">{t.n}</h5>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t.r}</p>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
