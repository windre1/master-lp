import { supabase } from "@/lib/supabase";
import Renderer from "@/components/lp/Renderer";

export default async function Page({ params }) {

  const { data } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("slug", params.slug)
    .single();

  return <Renderer blocks={data?.content?.blocks || []} />;
}