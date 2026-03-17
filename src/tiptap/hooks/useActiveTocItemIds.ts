'use client';

import { useEffect, useRef, useState } from 'react';

export function useActiveTocItemIds(ids: string[], offset = 80) {
  const [activeTocItemIds, setActiveTocItemIds] = useState<string[]>([]);
  const sectionsRef = useRef<{ id: string; start: number; end: number }[]>([]);

  useEffect(() => {
    const updateSections = () => {
      const headings = ids
        // ids 배열에 해당하는 DOM 요소를 찾음
        .map(id => document.getElementById(id))
        // 찾지 못한 요소(null)를 제거
        .filter((el): el is HTMLElement => el !== null)
        .map(el => ({
          // 요소의 id
          id: el.id,
          // 문서 기준 요소의 상단 Y 좌표
          top: window.scrollY + el.getBoundingClientRect().top
        }));

      if (headings.length === 0) {
        sectionsRef.current = [];
        return;
      }

      sectionsRef.current = headings.map((heading, index) => ({
        // section의 id
        id: heading.id,
        // section의 문서 기준 상단 Y 좌표
        start: heading.top,
        // section의 문서 기준 하단 Y 좌표
        end: headings[index + 1]?.top ?? document.documentElement.scrollHeight
      }));
    };

    const updateActiveIds = () => {
      const sections = sectionsRef.current;

      if (sections.length === 0) {
        setActiveTocItemIds([]);
        return;
      }

      // 뷰포트의 문서 기준 상단 Y 좌표
      const viewportStart = window.scrollY + offset;
      // 뷰포트의 문서 기준 하단 Y 좌표
      const viewportEnd = window.scrollY + window.innerHeight;

      // 현재 뷰포트와 겹치는 section의 id를 추출
      const viewportInIds = sections
        .filter(section => {
          return section.end > viewportStart && section.start < viewportEnd;
        })
        .map(section => section.id);

      setActiveTocItemIds(prev => {
        // 새로운 상태가 이전 상태와 같으면 기존 배열을 재사용해 불필요한 리렌더링 방지
        const isSame =
          prev.length === viewportInIds.length &&
          prev.every((id, index) => id === viewportInIds[index]);

        return isSame ? prev : viewportInIds;
      });
    };

    const updateAll = () => {
      updateSections();
      updateActiveIds();
    };

    updateAll();

    window.addEventListener('scroll', updateActiveIds, { passive: true });
    window.addEventListener('resize', updateAll);

    return () => {
      window.removeEventListener('scroll', updateActiveIds);
      window.removeEventListener('resize', updateAll);
    };
  }, [ids, offset]);

  return activeTocItemIds;
}
