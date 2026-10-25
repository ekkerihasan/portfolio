'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './concept.module.css';

export default function ConceptCursor({ enabled }: { enabled: boolean }) {
  const cursor = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = cursor.current;
    if (!element || !enabled) return;
    const eligible = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let hitFrame = 0;
    let visible = false;
    let target = { x: -100, y: -100 };
    let position = { x: -100, y: -100 };
    function hide() {
      visible = false;
      element!.dataset.visible = 'false';
      document.documentElement.removeAttribute('data-concept-cursor');
    }
    function updateMode(hovered: Element | null) {
      const interactive = hovered?.closest('a, button, summary, [data-cursor]');
      const mode = interactive?.getAttribute('data-cursor') || (interactive ? 'link' : 'default');
      if (element!.dataset.mode !== mode) element!.dataset.mode = mode;
      const text = interactive?.getAttribute('data-cursor-label') || 'Explore';
      if (label.current && label.current.textContent !== text) label.current.textContent = text;
    }
    function scrolled() {
      if (!visible || hitFrame) return;
      hitFrame = requestAnimationFrame(() => { hitFrame = 0; updateMode(document.elementFromPoint(target.x, target.y)); });
    }
    function kick() { if (!frame) frame = requestAnimationFrame(animate); }
    function move(event: PointerEvent) {
      if (!eligible.matches || event.pointerType !== 'mouse' || !(event.target instanceof Element) || !event.target.closest('[data-concept-root]') || event.target.closest('[role="dialog"]')) { hide(); return; }
      target = { x: event.clientX, y: event.clientY };
      if (!visible) position = { ...target };
      visible = true;
      element!.dataset.visible = 'true';
      document.documentElement.setAttribute('data-concept-cursor', '');
      updateMode(event.target);
      kick();
    }
    // Runs only while the ring is catching up to the pointer, then sleeps until the next move.
    function animate() {
      frame = 0;
      if (!visible) return;
      position.x += (target.x - position.x) * .24;
      position.y += (target.y - position.y) * .24;
      element!.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      if (Math.abs(target.x - position.x) > .1 || Math.abs(target.y - position.y) > .1) kick();
    }
    function keyboard(event: KeyboardEvent) { if (event.key === 'Tab') hide(); }
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', hide);
    window.addEventListener('scroll', scrolled, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    document.addEventListener('keydown', keyboard);
    eligible.addEventListener('change', hide);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(hitFrame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', hide);
      window.removeEventListener('scroll', scrolled);
      document.documentElement.removeEventListener('pointerleave', hide);
      document.removeEventListener('keydown', keyboard);
      eligible.removeEventListener('change', hide);
      hide();
    };
  }, [enabled]);
  return <div ref={cursor} className={styles.cursor} data-visible="false" aria-hidden="true"><span className={styles.cursorDot} /><span className={styles.cursorRing}><ArrowUpRight size={19} /><span ref={label}>Explore</span></span></div>;
}


