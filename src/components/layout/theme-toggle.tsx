'use client';
import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      className={clsx(
        'h-11 w-11 cursor-pointer',
        'flex items-center justify-center',
        'hover:rounded-sm hover:bg-gray-200'
      )}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <Moon size={36} color="#0099ff" />
      ) : (
        <Sun size={36} color="#0099ff" />
      )}
    </button>
  );
}
