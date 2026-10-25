
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ArrowUp, Pause, Play, Copy, Check, Menu, X } from 'lucide-react';
import ProjectShowcase from './ProjectShowcase';
import ConceptCursor from './ConceptCursor';
import ParticleLoader from './ParticleLoader';
import useSmoothScroll from './useSmoothScroll';
import ResumePreview from '@/components/ResumePreview';
import ParticlePortrait from './ParticlePortrait';
import styles from './concept.module.css';

const email = 'hassanekkeri2@gmail.com';
const navigation = [{ label: 'Work', href: '#concept-work' }, { label: 'About', href: '#concept-about' }, { label: 'Contact', href: '#concept-contact' }, { label: 'Classic portfolio ↗', href: '/' }];
const toolbox = [
  ['Frontend', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  ['Design', 'Figma', 'UI design', 'Responsive layouts', 'Interaction design'],
  ['Behind the scenes', 'Node.js', 'Python', 'Django', 'PostgreSQL'],
];

export default function Concept() {
  const root = useRef<HTMLDivElement>(null);
  const journey = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [portraitReady, setPortraitReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const finishLoading = useCallback(() => {
    const skippedWithFocus = document.activeElement?.closest('[data-intro-loader]');
    setLoading(false);
    if (skippedWithFocus) requestAnimationFrame(() => root.current?.querySelector<HTMLElement>('[aria-label="Hasan Ekkeri home"]')?.focus({ preventScroll: true }));
  }, []);
  const markPortraitReady = useCallback(() => setPortraitReady(true), []);
  const [paused, setPaused] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeResume = useCallback(() => setResumeOpen(false), []);
  useSmoothScroll(loading || resumeOpen);
  useEffect(() => {
    let alive = true;
    document.fonts.ready.then(() => { if (alive) setFontsReady(true); });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!journey.current) return;
      const rect = journey.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      journey.current.style.setProperty('--progress', String(progress));
      const intro = journey.current.querySelector<HTMLElement>('[data-intro]');
      const foot = journey.current.querySelector<HTMLElement>('[data-hero-foot]');
      if (foot) foot.inert = window.innerWidth >= 1024 && progress > .22 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (intro) intro.inert = window.innerWidth >= 1024 && progress < .48 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add(styles.revealed); observer.unobserve(entry.target); } });
    }, { threshold: .08 });
    root.current?.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', scroll); };
  }, []);

  useEffect(() => {
    function keydown(event: KeyboardEvent) { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); } }
    function resize() { if (window.innerWidth >= 768) setMenuOpen(false); }
    document.addEventListener('keydown', keydown);
    window.addEventListener('resize', resize);
    return () => { document.removeEventListener('keydown', keydown); window.removeEventListener('resize', resize); };
  }, [menuOpen]);

  useEffect(() => () => { if (copyTimeout.current) clearTimeout(copyTimeout.current); }, []);

  async function copyEmail() {
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    try { await navigator.clipboard.writeText(email); setCopyState('copied'); }
    catch { setCopyState('failed'); }
    copyTimeout.current = setTimeout(() => setCopyState('idle'), 2500);
  }

  return <div className={styles.concept} ref={root} id="concept-top" data-concept-root aria-busy={loading}>
    {loading && <ParticleLoader ready={portraitReady && fontsReady} onComplete={finishLoading} />}
    <ConceptCursor enabled={!loading && !resumeOpen} />
    <div className={styles.siteContent} inert={loading}>
    <a href="#concept-work" className={styles.skip}>Skip to selected work</a>
    <header className={styles.header}>
      <a href="#concept-top" className={styles.wordmark} aria-label="Hasan Ekkeri home">he<span>↗</span></a>
      <span className={styles.headerNote}>Independent mind. Thoughtful work.</span>
      <nav aria-label="Portfolio navigation" className={styles.nav} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setMenuOpen(false); }}>
        <div className={styles.desktopNav}>{navigation.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</div>
        <button ref={menuButton} className={styles.menuToggle} aria-controls="concept-menu" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        <div id="concept-menu" hidden={!menuOpen} className={styles.mobileNav}>{navigation.map(link => <a href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={20} /></a>)}</div>
      </nav>
    </header>

    <section className={styles.journey} ref={journey} aria-labelledby="concept-title">
      <div id="concept-about" className={styles.aboutAnchor} aria-hidden="true" />
      <div className={styles.heroSticky}>
        <div className={styles.portraitStage}><ParticlePortrait paused={paused} className={styles.particles} assemble={!loading} onReady={markPortraitReady} /></div>
        <div className={styles.heroNames}><h1 id="concept-title">Hasan Ekkeri</h1><p>Creative frontend<br />developer & UI enthusiast.</p></div>
        <div className={styles.heroFoot} data-hero-foot><span className={styles.available}><i /> Open to internships & collaborations</span><a href="#concept-about">Scroll to discover <ArrowDown size={15} /></a></div>
        <div className={styles.intro} data-intro><p className={styles.eyebrow}>A little about me</p><h2>Interfaces that<br />feel as good<br />as they <em>look.</em></h2><p>I’m a frontend developer with an eye for UI and UX. I bring design and code together to build thoughtful web experiences, from the first impression to the smallest interaction.</p><button onClick={() => setResumeOpen(true)} className={styles.inlineLink}>A little more about me <span>— View résumé <ArrowUpRight size={15} /></span></button></div>
        <button className={styles.motionToggle} onClick={() => setPaused(!paused)} aria-label={paused ? 'Play portrait animation' : 'Pause portrait animation'} aria-pressed={paused}>{paused ? <Play size={13} /> : <Pause size={13} />}<span>{paused ? 'Play motion' : 'Pause motion'}</span></button>
      </div>
    </section>

    <ProjectShowcase />

    <section className={styles.approach} id="concept-toolbox" aria-labelledby="toolbox-title">
      <div className={styles.approachIntro} data-reveal><p className={styles.eyebrow}>How I work</p><h2 id="toolbox-title">Design with intent.<br />Build with <em>care.</em></h2><p>I start with how something should feel, then work through how it should function. Clear interfaces, practical systems, and details that make the whole thing click.</p><p>Frontend is my focus. When a project calls for it, I work through the API and data layer too.</p></div>
      <div className={styles.toolbox}>{toolbox.map(([title, ...tools]) => <div key={title} data-reveal><h3>{title}</h3><ul>{tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div>)}</div>
    </section>

    <section className={styles.contact} id="concept-contact" aria-labelledby="contact-title">
      <div className={styles.contactTop}><span className={styles.available}><i /> Open for the right opportunity</span><span>Have a project or a role in mind?</span></div>
      <h2 id="contact-title" data-reveal><span>Let’s make</span><a href={`mailto:${email}`}><span>something</span><em>good.</em><ArrowUpRight strokeWidth={1} /></a></h2>
      <p className={styles.contactDescription}>Have a project or a role in mind? I’d love to hear about it.</p>
      <a className={styles.contactCta} href={`mailto:${email}`}>Start a conversation <ArrowUpRight size={20} /></a>
      <div className={styles.contactBottom}><div className={styles.contactEmail}><a className={styles.email} href={`mailto:${email}`}>{email}<ArrowUpRight size={19} /></a><button className={styles.copy} onClick={copyEmail} title={copyState === 'copied' ? 'Email copied' : 'Copy email address'}>{copyState === 'copied' ? <Check size={14} /> : <Copy size={14} />}<span aria-live="polite">{copyState === 'copied' ? 'Email copied' : copyState === 'failed' ? 'Select the email above to copy' : 'Copy email address'}</span></button></div><div className={styles.socials}><a href="https://www.linkedin.com/in/hasan-ekkeri-0a3a042b9/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a><a href="https://github.com/ekkerihasan" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a><button onClick={() => setResumeOpen(true)}>Résumé <ArrowUpRight size={15} /></button></div></div>
    </section>
    <footer className={styles.footer}><span>Hasan Ekkeri © {new Date().getFullYear()}</span><span>Designed with intention. Built with Next.js.</span><a href="#concept-top">Back to top <ArrowUp size={14} /></a></footer>
    </div>
    <ResumePreview open={resumeOpen} onClose={closeResume} />
  </div>;
}




