import { NextResponse } from 'next/server';
import { getTemplates, saveTemplates, Template } from '@/lib/products';
import { simpleGit } from 'simple-git';

export async function GET() {
  const templates = await getTemplates();
  return NextResponse.json(templates);
}

export async function POST(request: Request) {
  try {
    const newTemplate: Template = await request.json();
    const templates = await getTemplates();
    
    // Check if slug already exists
    if (templates.find(t => t.slug === newTemplate.slug)) {
      return NextResponse.json({ error: 'Slug sudah digunakan!' }, { status: 400 });
    }

    const updatedTemplates = [...templates, newTemplate];
    await saveTemplates(updatedTemplates);

    // AUTO-PUSH TO REPO (Only works if local git is configured)
    if (process.env.NODE_ENV === 'development') {
      try {
        const git = simpleGit();
        await git.add('data/templates.json');
        await git.commit(`Add template: ${newTemplate.title}`);
        // await git.push(); // Uncommented for real push
        console.log("Git commit successful");
      } catch (gitError) {
        console.warn("Git integration failed (maybe not a repo yet?):", gitError);
      }
    }

    return NextResponse.json({ success: true, template: newTemplate });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menambah template' }, { status: 500 });
  }
}
