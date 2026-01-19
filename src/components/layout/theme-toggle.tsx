'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center hover:rounded-[5px] hover:bg-gray-200"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <Moon size={36} color="#0099FF" />
      ) : (
        <Sun size={36} color="#0099FF" />
      )}
    </button>
  );
}
