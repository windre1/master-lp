import React from 'react';

export default function Demo({ data }: { data: any }) {
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const embedUrl = getEmbedUrl(data.videoUrl);

  return (
    <section className="py-24 bg-white text-center">
      <div className="container px-6 mx-auto">
        <h3 className="text-3xl font-black mb-12">{data.title || 'Lihat Demo Produk'}</h3>
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-4 shadow-2xl">
           <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden flex items-center justify-center">
             {embedUrl ? (
               <iframe className="w-full h-full" src={embedUrl} allowFullScreen title="Demo Video"></iframe>
             ) : (
               <span className="text-slate-500 font-bold italic">Video Demo Placeholder</span>
             )}
           </div>
        </div>
      </div>
    </section>
  );
}
