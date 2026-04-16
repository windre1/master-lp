'use client';

import { useEffect, useState } from 'react';
import Renderer from '@/components/lp/Renderer';
import { Block } from '@/types/lp';

export default function PreviewPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    // Listen to changes from the editor via localStorage
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'lp_preview_data') {
        try {
          const data = JSON.parse(e.newValue || '[]');
          setBlocks(data);
        } catch (err) {
          console.error("Failed to parse preview data", err);
        }
      }
    };

    // Initial load
    const initialData = localStorage.getItem('lp_preview_data');
    if (initialData) {
      try {
        setBlocks(JSON.parse(initialData));
      } catch (err) {}
    }

    window.addEventListener('storage', handleStorage);
    
    // Also check every 500ms as a fallback for the same-window updates
    const interval = setInterval(() => {
      const data = localStorage.getItem('lp_preview_data');
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (JSON.stringify(parsed) !== JSON.stringify(blocks)) {
            setBlocks(parsed);
          }
        } catch (err) {}
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [blocks]);

  return (
    <div className="bg-white min-h-screen">
      <Renderer blocks={blocks} />
    </div>
  );
}
