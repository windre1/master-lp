import { supabase } from "@/lib/supabase";
import Renderer from "@/components/lp/Renderer";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {

  const { data } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("slug", params.slug)
    .single();

  return <Renderer blocks={data?.content?.blocks || []} />;
}