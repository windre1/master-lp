export default function FinalCTA() {
  return (
    <section className="py-32 bg-indigo-600 relative overflow-hidden">
      <div className="container px-6 mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
          Waktunya Scale Bisnis <br/> Anda Menjadi <span className="text-indigo-200">Luar Biasa.</span>
        </h2>
        <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-12 font-medium">
          Ribuat orang sudah membuktikannya. Jangan biarkan kompetitor mendahului Anda. Mulai sekarang sebelum harga naik!
        </p>
        <button className="px-12 py-6 bg-white text-indigo-600 font-black rounded-full shadow-3xl shadow-indigo-900/40 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm">
           Gabung Sekarang & Dapatkan Akses Instan
        </button>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-400 opacity-20 rounded-full blur-[120px]"></div>
    </section>
  );
}
