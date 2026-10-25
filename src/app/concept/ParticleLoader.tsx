'use client';

import { useEffect, useRef } from 'react';
import styles from './concept.module.css';

type Point = { x: number; y: number; angle: number; distance: number; speed: number };
export default function ParticleLoader({ ready, onComplete }: { ready: boolean; onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(ready);
  useEffect(() => { readyRef.current = ready; }, [ready]);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || window.location.hash) { onComplete(); return; }
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) { onComplete(); return; }
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const start = performance.now();
    let width = 0, height = 0, frame = 0, progress = 0;
    let exitTimer: ReturnType<typeof setTimeout> | null = null;
    const sample = document.createElement('canvas');
    sample.width = 260; sample.height = 160;
    const sampleContext = sample.getContext('2d')!;
    sampleContext.fillStyle = '#fff';
    sampleContext.font = '600 140px sans-serif';
    sampleContext.textAlign = 'center';
    sampleContext.fillText('he.', 130, 130);
    const pixels = sampleContext.getImageData(0, 0, 260, 160).data;
    const points: Point[] = [];
    for (let y = 0; y < 160; y += 3) for (let x = 0; x < 260; x += 3) {
      if (pixels[(y * 260 + x) * 4 + 3] < 100) continue;
      const seed = Math.abs(Math.sin(x * 127 + y * 31));
      points.push({ x: x - 130, y: y - 80, angle: seed * Math.PI * 2, distance: 100 + seed * 150, speed: .3 + seed * .5 });
    }
    function resize() {
      width = window.innerWidth; height = window.innerHeight;
      const dpr = Math.min(devicePixelRatio, 1.5);
      canvas!.width = width * dpr; canvas!.height = height * dpr;
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);
    function draw(now: number) {
      const elapsed = now - start;
      const target = readyRef.current ? 100 : 18;
      progress += (target - progress) * .065;
      if (countRef.current) countRef.current.textContent = String(Math.round(progress)).padStart(3, '0');
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress / 100})`;
      context!.clearRect(0, 0, width, height);
      const morph = Math.min(1, Math.max(0, (elapsed - 180) / 1100));
      const ease = 1 - Math.pow(1 - morph, 3);
      const scale = Math.min(width / 580, 1.2);
      context!.fillStyle = '#bbc9b5';
      context!.beginPath();
      for (const p of points) {
        const angle = p.angle + elapsed * .0004 * p.speed;
        const orbitX = Math.cos(angle) * p.distance;
        const orbitY = Math.sin(angle) * p.distance * .65;
        const x = width / 2 + (orbitX * (1 - ease) + p.x * ease) * scale;
        const y = height * .46 + (orbitY * (1 - ease) + p.y * ease) * scale;
        context!.rect(x, y, 1.4, 1.4);
      }
      context!.fill();
      if ((readyRef.current && elapsed > 1450 && progress > 99.5) || elapsed > 5000) {
        canvas!.parentElement!.dataset.exiting = 'true';
        exitTimer = setTimeout(onComplete, 550);
        return;
      }
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => { if (exitTimer) clearTimeout(exitTimer); cancelAnimationFrame(frame); window.removeEventListener('resize', resize); document.body.style.overflow = oldOverflow; };
  }, [onComplete]);
  return <div className={styles.loader} data-intro-loader role="status" aria-label="Preparing portrait and fonts"><canvas ref={canvasRef} aria-hidden="true" /><div className={styles.loaderTop}><span>HASAN EKKERI</span><button onClick={onComplete}>Skip intro ↗</button></div><div className={styles.loaderBottom}><div><span className={styles.loaderCaption}>A little code. A little character.</span><span className={styles.loaderStatus}>{ready ? 'Ready to explore' : 'Preparing the experience'}</span></div><span className={styles.loaderCount} ref={countRef} aria-hidden="true">000</span></div><div className={styles.loaderTrack}><div ref={progressRef} /></div></div>;
}


