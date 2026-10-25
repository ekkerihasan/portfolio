'use client';

import { useEffect, useRef, useState } from 'react';

type Particle = { x: number; y: number; z: number; light: number; phaseSin: number; phaseCos: number; scatterX: number; scatterY: number };

const shades = ['#434a48', '#5b6461', '#747e7a', '#8e9893', '#a8b1ab', '#c2cac3', '#dbe1d8', '#f3f6ec'];

export default function ParticlePortrait({ paused, className }: { paused: boolean; className: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const [failed, setFailed] = useState(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Without a mouse the only idle motion is a sub-pixel shimmer, so touch devices keep the assembled frame.
    const touch = window.matchMedia('(hover: none)');
    let settled = false;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let disposed = false;
    let particles: Particle[][] = shades.map(() => []);
    let pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let time = 0;
    let last = 0;
    let ready = false;
    let forceDraw = true;
    let assemblyStart: number | null = null;
    // Bottom fade drawn into the canvas; a CSS mask would add a full compositing pass every frame.
    let fade: CanvasGradient | null = null;
    let fadeTop = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const [start, end] = window.innerWidth < 1024 ? [.7, 1] : [.8, .99];
      fadeTop = height * start;
      fade = context.createLinearGradient(0, fadeTop, 0, height * end);
      fade.addColorStop(0, 'rgba(0,0,0,0)');
      fade.addColorStop(1, '#000');
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
      if (!sampleContext) return;
      sampleContext.drawImage(source, 0, 0, sampleWidth, sampleHeight);
      const pixels = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
      const step = window.innerWidth < 768 ? 2.25 : 1.55;
      for (let y = 0; y < sampleHeight; y += step) {
        for (let x = 0; x < sampleWidth; x += step) {
          const pixel = (Math.floor(y) * sampleWidth + Math.floor(x)) * 4;
          if (pixels[pixel + 3] < 100) continue;
          const light = (pixels[pixel] * .2126 + pixels[pixel + 1] * .7152 + pixels[pixel + 2] * .0722) / 255;
          const seed = Math.sin(x * 127.1 + y * 311.7) * 43758.5453 % 1;
          // Shadows keep at least half their dots so they read as dim, not empty.
          if (Math.abs(seed) > .5 + .5 * Math.pow(light, .8)) continue;
          const shade = Math.pow(light, .9);
          particles[Math.min(shades.length - 1, Math.floor(shade * shades.length))].push({ x: ((x + seed * .9) / sampleWidth - .5), y: (y + Math.cos(x * 47.1 + y * 91.7) * .9) / sampleHeight - .5, z: (light - .4) * .08, light: shade, phaseSin: Math.sin(seed * 8), phaseCos: Math.cos(seed * 8), scatterX: Math.sin(seed * 13) * .5, scatterY: Math.cos(seed * 19) * .4 });
        }
      }
      ready = true;
      forceDraw = true;
      canvas.dataset.ready = 'true';
    };
    source.onerror = () => { if (!disposed) setFailed(true); };
    source.src = '/portrait-particles.webp';

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
      if ((stationary || (settled && touch.matches)) && !forceDraw) { last = now; return; }
      const delta = Math.min(now - (last || now), 40);
      last = now;
      if (!stationary) time += delta * .001;
      forceDraw = false;
      eased.x += ((stationary ? 0 : pointer.x) - eased.x) * .045;
      eased.y += ((stationary ? 0 : pointer.y) - eased.y) * .045;
      context.clearRect(0, 0, width, height);
      // Cap by width too, so a wide photo keeps both hands in frame.
      const aspect = source.width / source.height;
      const portraitHeight = Math.min(height * .92, width * (width < 600 ? 1 : .84) / aspect);
      const portraitWidth = portraitHeight * aspect;
      if (assemblyStart === null) assemblyStart = now;
      const entrance = stationary ? 1 : assemblyStart === null ? 0 : Math.min(1, (now - assemblyStart) / 1300);
      const scatter = Math.pow(1 - entrance, 3);
      settled = entrance >= 1;
      const rotation = eased.x * .09;
      const breathing = stationary ? 1 : 1 + Math.sin(time * .55) * .008;
      const rotationCos = Math.cos(rotation), rotationSin = Math.sin(rotation);
      const driftSin = Math.sin(time * .65) * .65, driftCos = Math.cos(time * .65) * .65;
      const baseSize = width < 600 ? .7 : .75;
      for (let band = 0; band < shades.length; band++) {
        context.fillStyle = shades[band];
        context.beginPath();
        for (const particle of particles[band]) {
          const drift = stationary ? 0 : driftSin * particle.phaseCos + driftCos * particle.phaseSin;
          const x = width * .5 + (particle.x * rotationCos + particle.z * rotationSin) * portraitWidth * breathing + drift + eased.x * particle.z * 150 + particle.scatterX * width * scatter;
          const y = height * .54 + particle.y * portraitHeight * breathing + eased.y * particle.z * 90 + drift + particle.scatterY * height * scatter;
          const size = baseSize + particle.light * .8;
          context.rect(x, y, size, size);
        }
        context.fill();
      }
      if (fade) {
        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = fade;
        context.fillRect(0, fadeTop, width, height - fadeTop);
        context.globalCompositeOperation = 'source-over';
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
  }, []);

  return failed ? <div className={className} role="img" aria-label="Portrait of Hasan Ekkeri" style={{ background: 'url(/hasan-ekkeri.webp) center bottom / contain no-repeat', opacity: .55 }} /> : <canvas ref={canvasRef} className={className} aria-label="Animated particle portrait of Hasan Ekkeri" role="img" />;
}




