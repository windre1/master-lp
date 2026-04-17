'use client';

import { useEffect, useState } from 'react';
import Renderer from '@/components/lp/Renderer';
import { Block } from '@/types/lp';

export default function PreviewPage() {
  const [data, setData] = useState<{ blocks: Block[], settings?: any }>({ blocks: [] });

  useEffect(() => {
    // Listen to changes from the editor via localStorage
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'lp_preview_data') {
        try {
          const parsed = JSON.parse(e.newValue || '{}');
          if (Array.isArray(parsed)) {
            setData({ blocks: parsed });
          } else {
            setData(parsed);
          }
        } catch (err) {
          console.error("Failed to parse preview data", err);
        }
      }
    };

    // Initial load
    const initialData = localStorage.getItem('lp_preview_data');
    if (initialData) {
      try {
        const parsed = JSON.parse(initialData);
        if (Array.isArray(parsed)) {
          setData({ blocks: parsed });
        } else {
          setData(parsed);
        }
      } catch (err) {}
    }

    window.addEventListener('storage', handleStorage);
    
    // Also check every 500ms as a fallback for the same-window updates
    const interval = setInterval(() => {
      const stored = localStorage.getItem('lp_preview_data');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const current = Array.isArray(parsed) ? { blocks: parsed } : parsed;
          if (JSON.stringify(current) !== JSON.stringify(data)) {
            setData(current);
          }
        } catch (err) {}
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [data]);

  return (
    <div className="bg-white min-h-screen">
      <Renderer blocks={data.blocks} settings={data.settings} />
    </div>
  );
}
