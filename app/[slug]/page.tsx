import { supabase } from "@/lib/supabase";
import Renderer from "@/components/lp/Renderer";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const { data } = await supabase
    .from("landing_pages")
    .select("*")
    .ilike("slug", slug)
    .single();

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-slate-500">
        <p>Slug "{slug}" tidak ditemukan di database.</p>
        <p className="text-xs mt-2">Pastikan sudah klik 'Simpan' di Editor.</p>
      </div>
    );
  }

  return <Renderer blocks={data?.content?.blocks || []} />;
}