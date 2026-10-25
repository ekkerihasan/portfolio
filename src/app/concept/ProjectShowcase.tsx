'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { ArrowDown, ArrowUpRight, Plus } from 'lucide-react';
import { projects } from '@/lib/projects';
import styles from './concept.module.css';

export default function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const panels = useRef<(HTMLElement | null)[]>([]);
  const tablist = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const update = () => tablist.current?.setAttribute('aria-orientation', desktop.matches ? 'vertical' : 'horizontal');
    update(); desktop.addEventListener('change', update);
    return () => desktop.removeEventListener('change', update);
  }, []);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const details = useRef<(HTMLDetailsElement | null)[]>([]);
  useEffect(() => {
    let frame = 0;
    let offsets: number[] = [];
    // Panel positions only change when the page resizes, so measure then rather than on every scroll.
    const measure = () => { offsets = panels.current.map(panel => panel ? panel.getBoundingClientRect().top + window.scrollY : Infinity); };
    const update = () => {
      frame = 0;
      const marker = window.scrollY + window.innerHeight * .35;
      let next = 0;
      offsets.forEach((top, index) => { if (top <= marker) next = index; });
      setActive(next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = () => { measure(); schedule(); };
    measure();
    update();
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', resize); };
  }, []);
  function select(index: number, focus = false) {
    const next = (index + projects.length) % projects.length;
    setActive(next);
    panels.current[next]?.scrollIntoView({ block: 'start', behavior: 'instant' });
    if (focus) {
      tabs.current[next]?.focus({ preventScroll: true });
      tabs.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
    }
  }
  function navigate(event: KeyboardEvent<HTMLButtonElement>) {
    const keys: Record<string, number> = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: projects.length - 1 };
    if (event.key in keys) { event.preventDefault(); select(keys[event.key], true); }
  }
  function move(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width - .5) * 8}px`);
    event.currentTarget.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height - .5) * 8}px`);
  }
  return <section className={styles.work} id="concept-work" aria-labelledby="concept-work-title">
    <div className={styles.sectionTop}><span className={styles.eyebrow}>Selected work / 2025—2026</span><span>06 explorations. Always building.</span></div>
    <div className={styles.showcaseLayout}>
      <div className={styles.projectIndex}>
        <div className={styles.showcaseHeading}><h2 id="concept-work-title">Built to be<br /><em>experienced.</em></h2><p>Explore the work.<br />There’s a story behind every build.</p></div>
        <div ref={tablist} className={styles.projectTabs} role="tablist" aria-label="Select a project">{projects.map((item, index) => <button ref={element => { tabs.current[index] = element; }} id={`project-tab-${index}`} key={item.title} role="tab" type="button" aria-selected={active === index} aria-controls={`project-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={navigate}><span className={styles.tabNumber}>0{index + 1}</span><span>{item.title}</span><ArrowUpRight size={15} /></button>)}</div>
        <a href="https://github.com/ekkerihasan" target="_blank" rel="noreferrer" className={styles.indexGithub}>More experiments on GitHub <ArrowUpRight size={14} /></a>
      </div>
      <div className={styles.projectPanel}>
        {projects.map((project, index) => <div ref={element => { panels.current[index] = element; }} id={`project-panel-${index}`} role="tabpanel" aria-labelledby={`project-tab-${index}`} tabIndex={0} key={project.title} data-active={active === index} className={styles.activeProject}>
          <button className={`${styles.showcaseVisual} ${styles[`tone${index % 3}`]}`} onClick={() => { const detail = details.current[index]; if (detail) detail.open = !detail.open; }} onPointerMove={move} onPointerLeave={event => { event.currentTarget.style.setProperty('--mx', '0px'); event.currentTarget.style.setProperty('--my', '0px'); }} data-cursor="view" data-cursor-label="Explore" aria-label={`Explore ${project.title} build story`}>
            <span className={styles.showcaseVisualTop}><span>{project.category}</span><span>{project.year} ↗</span></span>
            <span className={styles.showcaseImage} data-loaded={!!loadedImages[project.image]}><span className={styles.previewPlaceholder} aria-hidden="true">{failedImages[project.image] ? 'Preview unavailable' : 'Loading preview…'}</span><Image onLoad={() => setLoadedImages(previous => ({ ...previous, [project.image]: true }))} onError={() => setFailedImages(previous => ({ ...previous, [project.image]: true }))} src={project.image} alt={project.imageAlt} fill sizes="(min-width: 1024px) 60vw, 90vw" className="object-contain" loading={index === 0 ? 'eager' : 'lazy'} /></span>
            <span className={styles.showcaseVisualBottom}><span>DESIGN / DEVELOPMENT</span><span>Explore project <ArrowDown size={13} /></span></span>
          </button>
          <div className={styles.showcaseMeta}><div><span className={styles.eyebrow}>{project.category}</span><h3>{project.title}</h3></div><span className={styles.projectCounter}>0{index + 1}<span> / 0{projects.length}</span></span></div>
          <p className={styles.showcaseDescription}>{project.problem}</p>
          <div className={styles.showcaseTools}>{project.stack.map(tool => <span key={tool}>{tool}</span>)}</div>
          <div className={styles.showcaseActions}><div className={styles.projectLinks}>{project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}>Live site <ArrowUpRight size={15} /></a>}{project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source code`}>Source code <ArrowUpRight size={15} /></a>}</div></div>
          <details ref={element => { details.current[index] = element; }} className={styles.details}><summary>Behind the build <Plus size={16} /></summary><div><section><h4>The idea</h4><p>{project.why}</p></section><section><h4>My contribution</h4><p>{project.focus}</p></section></div></details>
        </div>)}
      </div>
    </div>
  </section>;
}




