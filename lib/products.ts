import fs from 'fs/promises';
import path from 'path';

export interface Template {
  slug: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export async function getTemplates(): Promise<Template[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'templates.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading templates:", error);
    return [];
  }
}

export async function saveTemplates(templates: Template[]) {
  const filePath = path.join(process.cwd(), 'data', 'templates.json');
  await fs.writeFile(filePath, JSON.stringify(templates, null, 2), 'utf-8');
}
