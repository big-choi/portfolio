'use client';

import { useEffect } from 'react';

/**
 * 다른 페이지에서 해시(#section)로 진입할 때 전역 smooth 스크롤 애니메이션 없이
 * 해당 섹션으로 즉시 이동시킨다. 같은 페이지 내 내비게이션의 부드러운 스크롤은 유지된다.
 */
export function HashScroll() {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) {
      return;
    }

    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) {
      return;
    }

    const html = document.documentElement;
    const previousBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    target.scrollIntoView();

    requestAnimationFrame(() => {
      html.style.scrollBehavior = previousBehavior;
    });
  }, []);

  return null;
}
