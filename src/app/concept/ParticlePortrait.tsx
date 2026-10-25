'use client';

import { useEffect, useRef, useState } from 'react';

type Particle = { x: number; y: number; z: number; light: number; phaseSin: number; phaseCos: number; scatterX: number; scatterY: number };

export default function ParticlePortrait({ paused, className, assemble, onReady }: { paused: boolean; className: string; assemble: boolean; onReady: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const assembleRef = useRef(assemble);
  useEffect(() => { assembleRef.current = assemble; }, [assemble]);
  const [failed, setFailed] = useState(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) { onReady(); return; }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let disposed = false;
    let particles: Particle[][] = Array.from({ length: 5 }, () => []);
    let pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let time = 0;
    let last = 0;
    let ready = false;
    let forceDraw = true;
    let assemblyStart: number | null = null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      forceDraw = true;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      forceDraw = true;
    });
    intersection.observe(canvas);

    const source = new window.Image();
    source.onload = () => {
      if (disposed) return;
      const sample = document.createElement('canvas');
      const sampleWidth = 320;
      const sampleHeight = Math.round(sampleWidth * source.height / source.width);
      sample.width = sampleWidth;
      sample.height = sampleHeight;
      const sampleContext = sample.getContext('2d', { willReadFrequently: true });
      if (!sampleContext) { onReady(); return; }
      sampleContext.drawImage(source, 0, 0, sampleWidth, sampleHeight);
      const pixels = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
      const step = window.innerWidth < 768 ? 2.6 : 1.8;
      for (let y = 0; y < sampleHeight; y += step) {
        for (let x = 0; x < sampleWidth; x += step) {
          const pixel = (Math.floor(y) * sampleWidth + Math.floor(x)) * 4;
          if (pixels[pixel + 3] < 100) continue;
          const light = (pixels[pixel] * .2126 + pixels[pixel + 1] * .7152 + pixels[pixel + 2] * .0722) / 255;
          const seed = Math.sin(x * 127.1 + y * 311.7) * 43758.5453 % 1;
          particles[Math.min(4, Math.floor(light * 5))].push({ x: ((x + seed * .9) / sampleWidth - .5), y: (y + Math.cos(x * 47.1 + y * 91.7) * .9) / sampleHeight - .5, z: (light - .4) * .08, light, phaseSin: Math.sin(seed * 8), phaseCos: Math.cos(seed * 8), scatterX: Math.sin(seed * 13) * .5, scatterY: Math.cos(seed * 19) * .4 });
        }
      }
      ready = true;
      forceDraw = true;
      canvas.dataset.ready = 'true';
      onReady();
    };
    source.onerror = () => { if (!disposed) { setFailed(true); onReady(); } };
    source.src = '/portrait-particles.png';

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer = { x: event.clientX / window.innerWidth * 2 - 1, y: event.clientY / window.innerHeight * 2 - 1 };
    };
    const reset = () => { pointer = { x: 0, y: 0 }; };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', reset);

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (!ready || !visible || document.hidden) { last = now; return; }
      const stationary = pausedRef.current || reduced.matches;
      if (stationary && !forceDraw) { last = now; return; }
      const delta = Math.min(now - (last || now), 40);
      last = now;
      if (!stationary) time += delta * .001;
      forceDraw = false;
      eased.x += ((stationary ? 0 : pointer.x) - eased.x) * .045;
      eased.y += ((stationary ? 0 : pointer.y) - eased.y) * .045;
      context.clearRect(0, 0, width, height);
      const portraitHeight = Math.min(height * 1.04, width * (width < 600 ? 1.85 : 1.12));
      const portraitWidth = portraitHeight * source.width / source.height;
      if (assembleRef.current && assemblyStart === null) assemblyStart = now;
      const entrance = stationary ? 1 : assemblyStart === null ? 0 : Math.min(1, (now - assemblyStart) / 1300);
      const scatter = Math.pow(1 - entrance, 3);
      const rotation = eased.x * .09;
      const breathing = stationary ? 1 : 1 + Math.sin(time * .55) * .008;
      const rotationCos = Math.cos(rotation), rotationSin = Math.sin(rotation);
      const driftSin = Math.sin(time * .65) * .65, driftCos = Math.cos(time * .65) * .65;
      for (let band = 0; band < 5; band++) {
        context.fillStyle = ['#7b8583', '#929e99', '#acb6af', '#c3cbc2', '#e0e4d9'][band];
        context.beginPath();
        for (const particle of particles[band]) {
          const drift = stationary ? 0 : driftSin * particle.phaseCos + driftCos * particle.phaseSin;
          const x = width * .5 + (particle.x * rotationCos + particle.z * rotationSin) * portraitWidth * breathing + drift + eased.x * particle.z * 150 + particle.scatterX * width * scatter;
          const y = height * .54 + particle.y * portraitHeight * breathing + eased.y * particle.z * 90 + drift + particle.scatterY * height * scatter;
          const size = (width < 600 ? .85 : .9) + particle.light * .55;
          context.rect(x, y, size, size);
        }
        context.fill();
      }
    };
    frame = requestAnimationFrame(draw);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', reset);
      particles = [];
      source.onload = null;
      source.onerror = null;
    };
  }, [onReady]);

  return failed ? <div className={className} role="img" aria-label="Portrait of Hasan Ekkeri" style={{ background: 'url(/hasan.png) center 20% / contain no-repeat', opacity: .55 }} /> : <canvas ref={canvasRef} className={className} aria-label="Animated particle portrait of Hasan Ekkeri" role="img" />;
}




