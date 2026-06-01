'use client';

import { useEffect } from 'react';

export default function ThemeInit() {
  useEffect(() => {
    try {
      const theme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      // Ignore errors in SSR
    }
  }, []);

  return null;
}