import { supabase } from './supabase';
import { LandingPage } from '@/types/lp';

export async function getLP(slug: string): Promise<LandingPage | null> {
  const { data, error } = await supabase
    .from('landing_pages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching LP:', error);
    return null;
  }

  return data;
}

export async function saveLP(slug: string, content: any) {
  const { data, error } = await supabase
    .from('landing_pages')
    .upsert({ slug, content }, { onConflict: 'slug' })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAllLPs(): Promise<LandingPage[]> {
  const { data, error } = await supabase
    .from('landing_pages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all LPs:', error);
    return [];
  }

  return data;
}

export async function uploadImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('lp-assets')
    .upload(fileName, file);

  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('lp-assets')
    .getPublicUrl(data.path);

  return publicUrl;
}
