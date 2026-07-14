'use client';

import { useState, useRef, useEffect } from 'react';
import { greetings, stack, experiences, projects, currentlyLearning } from './data';
import Head from 'next/head';
import Link from 'next/link';

// ── Dark mode hook ──────────────────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved ? saved === 'dark' : prefersDark;
    setDark(initial);
    document.documentElement.classList.toggle('dark', initial);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  };

  if (!mounted) {
    return [false, toggle, false];
  }

  return [dark, toggle, mounted];
}

// ── DarkModeToggle (CSS-based icon toggle, no hydration mismatch) ────
function DarkModeToggle({ toggleDark }) {
  return (
    <button
      onClick={toggleDark}
      className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {/* Sun icon - visible in light mode */}
      <svg className="dark:hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      {/* Moon icon - visible in dark mode */}
      <svg className="hidden dark:block" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    </button>
  );
}

// ── HeaderIcons ─────────────────────────────────────────────────
function HeaderIcons() {
  return (
    <div className="flex items-center gap-2">
      <a href="https://github.com/raihanardiansah" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors" aria-label="GitHub">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.627-5.373-12-12-12z"/></svg>
      </a>
      <a href="https://linkedin.com/in/raihanardiansah" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors" aria-label="LinkedIn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
    </div>
  );
}

function ContactIcon({ type }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (type === 'mail') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
  if (type === 'github') return <svg {...common} fill="currentColor" stroke="none"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.9 1.52 2.35 1.08 2.92.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 7.85c.85 0 1.7.12 2.5.37 1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.4.11 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>;
  if (type === 'linkedin') return <svg {...common} fill="currentColor" stroke="none"><path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.1 2.1 0 1 0 4.75 7.2 2.1 2.1 0 0 0 4.75 3ZM21 13.85c0-3.77-2-5.52-4.68-5.52-2.16 0-3.13 1.19-3.67 2.03V8.5H9.15V21h3.5v-6.19c0-1.63.3-3.2 2.32-3.2 2 0 2.03 1.86 2.03 3.3V21H21v-7.15Z"/></svg>;
  return <svg {...common}><path d="M20 10a8 8 0 1 1-2.34-5.66"/><path d="M20 4v6h-6"/><path d="M12 8v4l3 2"/></svg>;
}

function StackIcon({ name, slug }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-zinc-200 dark:bg-zinc-700 text-[9px] font-bold text-zinc-500 dark:text-zinc-300">{name.slice(0, 2).toUpperCase()}</span>;
  return <img src={`https://cdn.simpleicons.org/${slug}`} alt="" aria-hidden="true" width="20" height="20" className="w-5 h-5 object-contain" onError={() => setFailed(true)} />;
}

// ── Section (Accordion) ─────────────────────────────────────────
function Section({ id, label, children, startOpen = true }) {
  const [open, setOpen] = useState(startOpen);
  const [h, setH] = useState('0px');
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const h2 = ref.current.scrollHeight + 24;
      setH(open ? h2 + 'px' : '0px');
    }
  }, [open]);

  return (
    <section id={id} className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 overflow-hidden shadow-sm shadow-zinc-200/30 dark:shadow-black/10">
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={`${id}-content`} className="w-full flex items-center gap-2 px-4 py-4 border-b border-zinc-200/80 dark:border-zinc-800 text-left group hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors">
        <span className={`text-xs text-zinc-400 font-mono transition-transform duration-300 ${open ? 'rotate-90' : ''}`} aria-hidden="true">▶</span>
        <span className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400">{label}</span>
        <span className="ml-auto text-[10px] font-mono text-zinc-400 dark:text-zinc-500">{open ? 'collapse' : 'expand'}</span>
      </button>
      <div id={`${id}-content`} className="overflow-hidden transition-all duration-400 ease-in-out" style={{ maxHeight: h, opacity: open ? 1 : 0 }}>
        <div ref={ref} className="px-4 pt-3 pb-4">{children}</div>
      </div>
    </section>
  );
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}>{children}</div>;
}

// ── ExpCard ──────────────────────────────────────────────────────
function ExpCard({ title, role, period, description, points, tags }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="border-b border-zinc-200/60 dark:border-zinc-700/50 last:border-b-0">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="w-full flex items-start justify-between gap-3 py-4 text-left hover:bg-zinc-50/70 dark:hover:bg-zinc-800/20 transition-colors">
        <span className="flex items-start gap-2 min-w-0">
          <span className={`mt-1 text-[10px] text-zinc-400 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} aria-hidden="true">▶</span>
          <span><span className="block text-sm font-semibold text-zinc-800 dark:text-zinc-100">{title}</span><span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{role}</span></span>
        </span>
        <span className="text-right shrink-0"><span className="block text-[11px] text-zinc-400 font-mono">{period}</span><span className="block text-[10px] text-zinc-400 mt-1">{open ? 'hide detail' : 'view detail'}</span></span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '520px' : '0px', opacity: open ? 1 : 0 }}>
        <div className="pb-4 pl-6">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-2.5">{description}</p>
          <ul className="space-y-1 mb-2.5">{points.map((p, i) => <li key={i} className="text-xs text-zinc-500 dark:text-zinc-400 pl-3.5 relative before:content-['−'] before:absolute before:left-0 before:text-zinc-300 dark:before:text-zinc-600">{p}</li>)}</ul>
          <div className="flex flex-wrap gap-1">{tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-500 dark:text-zinc-400 font-mono">{t}</span>)}</div>
        </div>
      </div>
    </article>
  );
}

// ── Splash Screen ──
function SplashScreen({ onDone }) {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('in');
  const [tick, setTick] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [ready, setReady] = useState(false);
  const pRef = useRef({ word: 0, phase: 'in' });

  useEffect(() => {
    if (!ready) {
      const t = setTimeout(() => setReady(true), 200);
      return () => clearTimeout(t);
    }

    const p = pRef.current;

    if (p.word >= greetings.length) {
      if (!pRef.endDelay) {
        pRef.endDelay = true;
        const t = setTimeout(() => { setFadeOut(true); setTimeout(onDone, 800); }, 600);
        return () => clearTimeout(t);
      }
      return;
    }

    const t = setTimeout(() => {
      if (p.phase === 'in') {
        setText(greetings[p.word]);
        setPhase('show');
        p.phase = 'hold';
      } else if (p.phase === 'hold') {
        setPhase('out');
        p.phase = 'out';
      } else if (p.phase === 'out') {
        p.word++;
        setPhase('in');
        p.phase = 'in';
      }
      setTick(x => x + 1);
    }, p.phase === 'in' ? 200 : (p.phase === 'hold' ? 300 : 100));

    return () => clearTimeout(t);
  }, [tick, onDone, ready]);

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center overflow-hidden">
        <p
          className="font-mono text-3xl md:text-5xl text-[#e5e5e5]"
          style={{
            transform: phase === 'in' ? 'translateY(-40px)' : 'translateY(0px)',
            opacity: phase === 'show' || phase === 'hold' ? 1 : 0,
            transition: 'transform 0.25s ease, opacity 0.2s ease',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  const [dark, toggleDark, darkMounted] = useDarkMode();
  const [activeSection, setActiveSection] = useState('stack');
  const [copied, setCopied] = useState(false);

  // Active section indicator
  useEffect(() => {
    const ids = ['stack', 'exp', 'proj', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0.05, 0.2, 0.5] });
    ids.forEach(id => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, [splashDone]);

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText('raihan@gmail.com');
      } else {
        const area = document.createElement('textarea');
        area.value = 'raihan@gmail.com';
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        area.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  // Scroll progress - MUST be before early return (Rules of Hooks)
  useEffect(() => {
    const onScroll = () => {
      const progress = document.getElementById('scroll-progress');
      if (!progress) return;
      const scrollTop = window.scrollY;
      const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      progress.style.transform = `scaleX(${scrollTop / docHeight})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!splashDone) {
    return <SplashScreen onDone={() => setSplashDone(true)} />;
  }

  return (
    <div className="min-h-screen max-md:pb-16 bg-[var(--bg)] text-[var(--text)] font-['Inter',sans-serif] antialiased selection:bg-blue-500/20 transition-colors duration-300">
      {/* Scroll progress bar */}
      <div id="scroll-progress" aria-hidden="true" />
      <Head>
        <title>Raihan | Web Developer & Tech Enthusiast</title>
        <meta name="description" content="Portfolio pribadi Raihan — Web Developer dan Tech Enthusiast dari Semarang, Indonesia." />
        <meta property="og:title" content="Raihan | Web Developer & Tech Enthusiast" />
        <meta property="og:description" content="Membangun website, aplikasi, dan sistem yang praktis untuk kebutuhan nyata." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Raihan | Tech Enthusiast" />
        <meta name="twitter:description" content="Student & Tech Enthusiast exploring technology, building digital things, and learning something new every day." />
        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
      </Head>
      {/* Side Nav */}
      <nav className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50 max-md:hidden" aria-label="Section navigation">
        {['stack','exp','proj','contact'].map(s => (
          <a key={s} href={`#${s}`} className={`w-2 h-2 rounded-full ${activeSection === s ? 'bg-blue-500 scale-125 shadow-[0_0_0_4px_rgba(59,130,246,0.14)]' : 'bg-zinc-300 dark:bg-zinc-700'} hover:bg-blue-500 transition-all duration-200 hover:scale-125`}
            aria-current={activeSection === s ? 'location' : undefined} />
        ))}
      </nav>

      {/* Header */}
      <header className="max-w-[640px] mx-auto px-5 pt-6 flex items-center justify-between relative z-10">
        <span className="text-sm font-semibold">Raihan</span>
        <nav className="flex gap-4 max-md:hidden">
          {['stack','exp','proj','contact'].map(l => (
            <a key={l} href={`#${l}`} className="text-xs text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors font-mono">/{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          {/* Dark mode toggle */}
          <DarkModeToggle toggleDark={toggleDark} />
          <HeaderIcons />
        </div>
      </header>

      {/* Mobile navigation */}
      <nav className="fixed md:hidden bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-1.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/70 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-lg shadow-zinc-300/20 dark:shadow-black/30" aria-label="Mobile section navigation">
        {['stack', 'exp', 'proj', 'contact'].map(s => (
          <a key={s} href={`#${s}`} aria-label={`Go to ${s}`} aria-current={activeSection === s ? 'location' : undefined} className={`px-2.5 py-1.5 rounded-xl text-[10px] font-mono transition-colors ${activeSection === s ? 'bg-blue-500 text-white' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>/{s}</a>
        ))}
      </nav>

      {/* Hero */}
      <section id="hero" className="max-w-[640px] mx-auto px-5 pt-20 pb-12 max-sm:pt-14 max-sm:pb-10">
        <div className="flex gap-6 items-start max-sm:gap-4 max-sm:flex-col max-sm:items-center max-sm:text-center">
          {/* Avatar */}
          <img
            src="https://github.com/raihanardiansah.png?size=160"
            alt="Raihan"
            width="80"
            height="80"
            onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/avatar-fallback.svg'; }}
            className="w-[80px] h-[80px] shrink-0 rounded-full object-cover bg-gradient-to-br from-blue-50 to-indigo-100"
          />
          <div>
            <div className="flex items-center justify-center gap-2 mb-4 text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-400 max-sm:w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
              Based in Semarang, Indonesia
            </div>
            <h2 className="font-mono text-xl md:text-2xl text-blue-500 mb-4 leading-tight">
              Welcome to my <span className="text-3xl md:text-4xl font-bold tracking-tight">portfolio</span>
            </h2>
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mb-5 max-w-[430px] leading-relaxed">I build practical websites, applications, and systems for real-world needs.</p>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-lg cursor-not-allowed" aria-label="CV coming soon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 6v12M6 12h12"/></svg>
              CV coming soon
            </span>
          </div>
        </div>
      </section>

      {/* Bio */}
      <Reveal className="max-w-[640px] mx-auto px-5 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-zinc-400">About me</span>
          <span className="h-px flex-1 bg-zinc-200/80 dark:bg-zinc-800" />
        </div>
        <ul className="space-y-3">
          {[
            'Building practical websites and full-stack applications beyond the demo stage.',
            'Connecting design, code, and deployment into products people can actually use.',
            'Solving problems end to end — from understanding context to iterating on feedback.',
            'Open to opportunities in software engineering, web development, and tech roles.',
          ].map((t, i) => (
            <li key={i} className="pl-5 relative text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed before:content-['→'] before:absolute before:left-0 before:text-blue-400 before:font-mono before:text-xs">{t}</li>
          ))}
        </ul>
      </Reveal>

      {/* What I build */}
      <section className="max-w-[640px] mx-auto px-5 pb-10">
        <div className="flex items-center gap-3 mb-3"><span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-zinc-400">What I build</span><span className="h-px flex-1 bg-zinc-200/80 dark:bg-zinc-800" /></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[['01', 'Websites', 'Portfolio, landing page, dan website bisnis yang responsif.'], ['02', 'Web apps', 'Aplikasi dengan frontend, backend, database, dan auth.'], ['03', 'Systems', 'Deployment, service Linux, automation, dan workflow yang rapi.']].map(([number, title, text]) => <article key={title} className="rounded-xl border border-zinc-200/80 dark:border-zinc-700/50 bg-[var(--surface)] px-3 py-3"><span className="text-[10px] font-mono text-blue-500">{number}</span><h2 className="text-xs font-semibold mt-2 text-zinc-800 dark:text-zinc-100">{title}</h2><p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400 mt-1">{text}</p></article>)}
        </div>
      </section>

      {/* Currently learning */}
      <section className="max-w-[640px] mx-auto px-5 pb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-zinc-400">Currently learning</span>
          <span className="h-px flex-1 bg-zinc-200/80 dark:bg-zinc-800" />
        </div>
        <div className="flex flex-wrap gap-2">
          {currentlyLearning.map(item => <span key={item} className="px-2.5 py-1 text-[11px] font-mono rounded-full border border-blue-200/80 dark:border-blue-900/70 bg-blue-50/70 dark:bg-blue-950/30 text-blue-600 dark:text-blue-300">{item}</span>)}
        </div>
      </section>

      {/* GitHub Contributions */}
      <section className="max-w-[640px] mx-auto px-5 pb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-zinc-400">GitHub activity</span>
          <a href="https://github.com/raihanardiansah" target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-blue-500 hover:text-blue-600 transition-colors">View profile →</a>
        </div>
        <div className="bg-[var(--surface)] dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/50 rounded-xl p-4 overflow-x-auto">
          <img
            src="https://ghchart.rshah.org/raihanardiansah"
            alt="GitHub contributions graph for raihanardiansah"
            className="max-w-full h-auto"
          />
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-[640px] mx-auto px-5 pb-12 pt-4 space-y-3">
        <Section id="stack" label="Stack" startOpen>
          {Object.entries(stack).map(([cat, items]) => (
            <div key={cat} className="mb-4 last:mb-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2 font-mono">{cat}</p>
              <div className="flex flex-wrap gap-2">
                {items.map(item => <span key={item.name} className="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/50 rounded-full text-zinc-500 dark:text-zinc-400 hover:border-blue-400/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 cursor-default"><StackIcon name={item.name} slug={item.icon} />{item.name}</span>)}
              </div>
            </div>
          ))}
        </Section>

        <Section id="exp" label="Experience">
          {experiences.map((e, i) => <ExpCard key={i} {...e} />)}
        </Section>

        <Section id="proj" label="Projects" startOpen>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.18em]">Selected work</span>
            <span className="text-[11px] text-zinc-400">{projects.length} projects</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {projects.map(p => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="block p-4 border border-zinc-200/80 dark:border-zinc-700/50 rounded-xl bg-[var(--surface)] dark:bg-zinc-800/50 hover:border-blue-400/40 hover:shadow-lg dark:hover:shadow-blue-500/10 hover:scale-[1.01] transition-all duration-200">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{p.title}</h3>
                  <span className="text-[11px] font-mono text-blue-500">View detail →</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-2">{p.desc}</p>
                <div className="flex flex-wrap gap-1">{p.tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-500 dark:text-zinc-400 font-mono">{t}</span>)}</div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Contact links */}
        <Section id="contact" label="Contact">
          <div className="mb-4 rounded-xl border border-blue-200/70 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/20 px-4 py-3">
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Have an idea or project in mind?</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Let&apos;s build something useful together.</p>
            <a href="mailto:raihan@gmail.com" className="inline-flex mt-3 items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-[11px] font-mono font-semibold text-white hover:bg-blue-700 transition-colors">Get in touch <span aria-hidden="true">→</span></a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 rounded-lg text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              <a href="mailto:raihan@gmail.com" className="flex items-center gap-2 min-w-0 flex-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="text-zinc-400 shrink-0"><ContactIcon type="mail" /></span><span className="truncate">raihan@gmail.com</span>
              </a>
              <button type="button" onClick={copyEmail} className="shrink-0 px-2 py-1 rounded-md text-[10px] text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors" aria-label="Copy email">{copied ? 'Copied!' : 'Copy'}</button>
            </div>
            <a href="https://github.com/raihanardiansah" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 rounded-lg text-xs text-zinc-500 dark:text-zinc-400 font-mono hover:border-blue-400/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
              <span className="text-zinc-400"><ContactIcon type="github" /></span><span>github.com/raihanardiansah</span>
            </a>
            <a href="https://linkedin.com/in/raihanardiansah" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 rounded-lg text-xs text-zinc-500 dark:text-zinc-400 font-mono hover:border-blue-400/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
              <span className="text-zinc-400"><ContactIcon type="linkedin" /></span><span>linkedin.com/in/raihanardiansah</span>
            </a>
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 rounded-lg text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              <span className="text-zinc-400"><ContactIcon type="location" /></span><span>Semarang, ID</span>
            </div>
          </div>
        </Section>
      </div>

      {/* Footer */}
      <footer className="max-w-[640px] mx-auto px-5 py-12 text-center border-t border-zinc-200/60 dark:border-zinc-700/50">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">Building useful things with code and curiosity.</p>
        <div className="flex items-center justify-center gap-4 mb-2.5">
          {['stack','exp','proj','contact'].map(l => <a key={l} href={`#${l}`} className="text-xs text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors font-mono">{l}</a>)}
        </div>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-600">© {new Date().getFullYear()} Raihan</p>
      </footer>
    </div>
  );
}