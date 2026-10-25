'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function useSmoothScroll(blocked: boolean) {
  const instance = useRef<Lenis | null>(null);
  const blockedRef = useRef(blocked);
  useEffect(() => {
    blockedRef.current = blocked;
    if (blocked) instance.current?.stop();
    else instance.current?.start();
  }, [blocked]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)');
    function configure() {
      instance.current?.destroy();
      instance.current = null;
      if (reduced.matches || !fine.matches) return;
      const lenis = new Lenis({
        autoRaf: true,
        lerp: .085,
        wheelMultiplier: .85,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -32, duration: 1.2 },
        prevent: node => !!node.closest('[role="dialog"], [data-lenis-prevent]'),
      });
      instance.current = lenis;
      if (blockedRef.current) lenis.stop();
    }
    configure();
    reduced.addEventListener('change', configure);
    fine.addEventListener('change', configure);
    return () => {
      reduced.removeEventListener('change', configure);
      fine.removeEventListener('change', configure);
      instance.current?.destroy();
      instance.current = null;
    };
  }, []);
}
