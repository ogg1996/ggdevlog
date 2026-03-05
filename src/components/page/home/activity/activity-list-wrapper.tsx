'use client';

import { useLayoutEffect, useRef } from 'react';

interface props {
  children: React.ReactNode;
}

export default function ActivityListWrapper({ children }: props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth;
    });
  }, []);

  return (
    <div className="flex max-w-150 overflow-x-auto" ref={scrollRef}>
      {children}
    </div>
  );
}
