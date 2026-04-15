import Link from 'next/link';

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function CTA({ title, description, buttonText, buttonLink }: CTAProps) {
  return (
    <section className="py-20 bg-indigo-600">
      <div className="container px-4 mx-auto text-center">
        <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
          {title}
        </h2>
        <p className="max-w-2xl mx-auto mb-10 text-indigo-100 italic">
          {description}
        </p>
        <Link 
          href={buttonLink}
          className="inline-block px-10 py-4 text-lg font-bold text-indigo-600 transition-all bg-white rounded-full hover:bg-slate-100 hover:shadow-xl active:scale-95"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
