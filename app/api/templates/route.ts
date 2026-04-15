import { NextResponse } from 'next/server';
import { getTemplates, saveTemplates, Template } from '@/lib/products';
import { simpleGit } from 'simple-git';

export async function GET() {
  const templates = await getTemplates();
  return NextResponse.json(templates);
}

export async function POST(request: Request) {
  try {
    const data: Template = await request.json();
    const templates = await getTemplates();
    
    // Check if it's an update (by slug) or new
    const existingIndex = templates.findIndex(t => t.slug === data.slug);
    
    let updatedTemplates;
    let isNew = false;

    if (existingIndex > -1) {
      // UPDATE
      updatedTemplates = [...templates];
      updatedTemplates[existingIndex] = data;
    } else {
      // NEW
      updatedTemplates = [...templates, data];
      isNew = true;
    }

    await saveTemplates(updatedTemplates);

    // GIT SYNC (Dev Only)
    if (process.env.NODE_ENV === 'development') {
      try {
        const git = simpleGit();
        await git.add('data/templates.json');
        await git.commit(`${isNew ? 'New' : 'Update'} Template: ${data.title}`);
        console.log("Git sync successful");
      } catch (e) {
        console.warn("Git failed:", e);
      }
    }

    return NextResponse.json({ success: true, isNew });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memproses data' }, { status: 500 });
  }
}
