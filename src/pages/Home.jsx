import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolioData, useLanguage, setLanguage } from '../store';

const i18n = {
  en: {
    available: 'Available for work',
    welcome: 'Welcome to my',
    portfolio: 'portfolio',
    subtitle: 'I build practical websites, applications, and systems for real-world needs.',
    aboutMe: 'About me',
    home: 'Home',
    cv: 'CV coming soon',
    stack: 'Stack',
    experience: 'Experience',
    projects: 'Projects',
    contact: 'Contact',
    navHome: 'home',
    navStack: 'stack',
    navExp: 'exp',
    navProj: 'proj',
    navContact: 'contact',
    navGallery: 'gallery',
    navBlog: 'blog',
    learning: 'Currently learning',
    githubAct: 'GitHub activity',
    viewDetail: 'view detail',
    hideDetail: 'hide detail',
    selectedWork: 'Selected work',
    of: 'of',
    seeAllProj: 'See all projects →',
    idea: 'Have an idea or project in mind?',
    build: "Let's build something useful together.",
    viewProf: 'View profile →',
    ghUnavail: 'GitHub activity unavailable —',
    visitProf: 'visit profile →',
    localTime: 'Local time:',
    collapse: 'collapse',
    expand: 'expand',
    backToTop: 'Back to top ↑'
  },
  id: {
    available: 'Tersedia untuk bekerja',
    welcome: 'Selamat datang di',
    portfolio: 'portofolio saya',
    subtitle: 'Saya membangun situs web, aplikasi, dan sistem praktis untuk kebutuhan dunia nyata.',
    aboutMe: 'Tentang saya',
    home: 'Beranda',
    cv: 'CV segera hadir',
    stack: 'Teknologi',
    experience: 'Pengalaman',
    projects: 'Proyek',
    contact: 'Kontak',
    navHome: 'beranda',
    navStack: 'teknologi',
    navExp: 'pengalaman',
    navProj: 'proyek',
    navContact: 'kontak',
    navGallery: 'galeri',
    navBlog: 'blog',
    learning: 'Sedang dipelajari',
    githubAct: 'Aktivitas GitHub',
    viewDetail: 'lihat detail',
    hideDetail: 'tutup detail',
    selectedWork: 'Karya terpilih',
    of: 'dari',
    seeAllProj: 'Lihat semua proyek →',
    idea: 'Punya ide atau proyek?',
    build: "Mari membangun sesuatu bersama.",
    viewProf: 'Lihat profil →',
    ghUnavail: 'Aktivitas GitHub tidak tersedia —',
    visitProf: 'kunjungi profil →',
    localTime: 'Waktu lokal:',
    collapse: 'tutup',
    expand: 'buka',
    backToTop: 'Kembali ke atas ↑'
  },
  zh: {
    available: '可接受工作机会',
    welcome: '欢迎来到我的',
    portfolio: '作品集',
    subtitle: '我为实际需求构建实用的网站、应用程序和系统。',
    aboutMe: '关于我',
    home: '首页',
    cv: '简历即将推出',
    stack: '技术栈',
    experience: '经验',
    projects: '项目',
    contact: '联系',
    navHome: '首页',
    navStack: '技术栈',
    navExp: '经验',
    navProj: '项目',
    navContact: '联系',
    navGallery: '画廊',
    navBlog: '博客',
    learning: '正在学习',
    githubAct: 'GitHub 动态',
    viewDetail: '查看详情',
    hideDetail: '收起详情',
    selectedWork: '精选作品',
    of: '/',
    seeAllProj: '查看所有项目 →',
    idea: '有想法或项目？',
    build: '让我们一起构建有用的东西。',
    viewProf: '查看资料 →',
    ghUnavail: 'GitHub 动态不可用 —',
    visitProf: '访问资料 →',
    localTime: '当地时间:',
    collapse: '收起',
    expand: '展开',
    backToTop: '返回顶部 ↑'
  }
};

// ── Dark mode hook ──────────────────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved ? saved === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', initial);
    return initial;
  });

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  };

  return [dark, toggle];
}

// ── DarkModeToggle ────────────────────────────────────────────
function DarkModeToggle({ toggleDark, dark }) {
  return (
    <button
      onClick={toggleDark}
      className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer border-0"
      aria-label="Toggle theme"
    >
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

function LangToggle({ lang, toggleLang }) {
  return (
    <button
      onClick={toggleLang}
      className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer border-0 font-mono text-xs font-bold h-[34px] w-[34px] flex items-center justify-center"
      aria-label="Toggle language"
    >
      {lang.toUpperCase()}
    </button>
  );
}

// ── HeaderIcons ─────────────────────────────────────────────────
function HeaderIcons({ github, linkedin }) {
  const linkCls = 'text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors flex items-center';
  return (
    <div className="flex items-center gap-2">
      <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer" className={linkCls} aria-label="GitHub">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>
      <a href={`https://linkedin.com/in/${linkedin}`} target="_blank" rel="noopener noreferrer" className={linkCls} aria-label="LinkedIn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
    </div>
  );
}

function ContactIcon({ type }) {
  const props = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (type === 'mail') return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
  if (type === 'github') return <svg {...props} fill="currentColor" stroke="none"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.9 1.52 2.35 1.08 2.92.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 7.85c.85 0 1.7.12 2.5.37 1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.4.11 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>;
  if (type === 'linkedin') return <svg {...props} fill="currentColor" stroke="none"><path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.1 2.1 0 1 0 4.75 7.2 2.1 2.1 0 0 0 4.75 3ZM21 13.85c0-3.77-2-5.52-4.68-5.52-2.16 0-3.13 1.19-3.67 2.03V8.5H9.15V21h3.5v-6.19c0-1.63.3-3.2 2.32-3.2 2 0 2.03 1.86 2.03 3.3V21H21v-7.15Z"/></svg>;
  if (type === 'whatsapp') return <svg {...props} fill="currentColor" stroke="none"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 0 0 1.333 4.993L2 22l5.233-1.375a9.967 9.967 0 0 0 4.779 1.222h.004c5.504 0 9.988-4.482 9.988-9.989 0-2.666-1.037-5.172-2.92-7.056A9.954 9.954 0 0 0 12.012 2zm.004 16.893c-1.488 0-2.95-.399-4.227-1.154l-.303-.18-3.14.823.839-3.063-.198-.314A8.347 8.347 0 0 1 3.616 11.99c.001-4.633 3.774-8.406 8.411-8.406 2.247 0 4.357.876 5.945 2.466a8.423 8.423 0 0 1 2.463 5.952c-.001 4.635-3.774 8.408-8.407 8.408zm4.61-6.304c-.253-.127-1.496-.739-1.728-.823-.231-.085-.4-.127-.568.127-.168.254-.652.823-.8.992-.147.169-.294.19-.547.063-2.155-1.082-3.374-2.15-4.14-3.447-.146-.248.145-.23.64-.814.084-.105.126-.168.19-.253.063-.085.031-.159 0-.222-.032-.064-.568-1.371-.778-1.879-.205-.494-.413-.427-.568-.435l-.485-.008c-.168 0-.442.064-.674.317-.231.254-.884.864-.884 2.106 0 1.242.905 2.443 1.031 2.612.126.169 1.782 2.718 4.316 3.81 1.637.703 2.235.795 3.01.674.85-.133 2.684-1.096 3.063-2.153.379-1.057.379-1.961.266-2.153-.112-.191-.407-.296-.66-.423z"/></svg>;
  if (type === 'copy') return <svg {...props}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
  if (type === 'check') return <svg {...props}><polyline points="20 6 9 17 4 12"/></svg>;
  return <svg {...props}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
}

function StackIcon({ name, slug, dark }) {
  const [failed, setFailed] = useState(false);
  const color = dark ? 'a1a1aa' : '6b7280';
  if (failed) return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-zinc-200 dark:bg-zinc-700 text-[9px] font-bold text-zinc-500 dark:text-zinc-300 font-mono">
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt="" aria-hidden="true"
      width="20" height="20"
      className="w-5 h-5 object-contain"
      onError={() => setFailed(true)}
    />
  );
}

// ── Section (Accordion) ─────────────────────────────────────────
function Section({ id, label, children, startOpen = false, t }) {
  const [open, setOpen] = useState(startOpen);
  const [maxH, setMaxH] = useState('0px');
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const update = () => {
      setMaxH(open ? (el.scrollHeight + 24) + 'px' : '0px');
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  return (
    <section
      id={id}
      className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 overflow-hidden shadow-sm shadow-zinc-200/30 dark:shadow-black/10"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`${id}-content`}
        className="w-full flex items-center gap-2 px-4 py-4 border-b border-zinc-200/80 dark:border-zinc-800 text-left hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer bg-transparent"
      >
        <span
          className="text-xs text-zinc-400 font-mono transition-transform duration-300"
          style={{ transform: open ? 'rotate(90deg)' : 'none', display: 'inline-block' }}
          aria-hidden="true"
        >▶</span>
        <span className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400">{label}</span>
        <span className="ml-auto text-[10px] font-mono text-zinc-400 dark:text-zinc-500">{open ? t.collapse : t.expand}</span>
      </button>
      <div
        id={`${id}-content`}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: maxH, opacity: open ? 1 : 0 }}
      >
        <div ref={contentRef} className="px-4 pt-3 pb-4">{children}</div>
      </div>
    </section>
  );
}

// ── Reveal ─────────────────────────────────────────────────────
function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

// ── LiveTime ─────────────────────────────────────────────────────
function LiveTime({ timezone, displayFormat, t }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  let formattedTime = "";
  try {
    if (displayFormat === 'WIB') {
      formattedTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone || 'Asia/Jakarta',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }).format(time) + ' WIB';
    } else {
      formattedTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone || 'Asia/Jakarta',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZoneName: 'shortOffset'
      }).format(time).replace('GMT', 'UTC');
    }
  } catch (e) {
    formattedTime = "00:00:00";
  }

  return <span>{t.localTime} {formattedTime}</span>;
}

// ── ExpCard ──────────────────────────────────────────────────────
function ExpCard({ title, role, role_id, role_zh, period, description, description_id, description_zh, points, points_id, points_zh, tags, logo, t, lang }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="relative pl-6 sm:pl-8 py-3 group">
      {/* Timeline line & dot */}
      <div className="absolute left-[7px] sm:left-[11px] top-10 bottom-[-12px] w-[2px] bg-zinc-200 dark:bg-zinc-800 group-last:hidden"></div>
      <div className="absolute left-[3px] sm:left-[7px] top-[30px] w-[10px] h-[10px] rounded-full bg-zinc-300 dark:bg-zinc-600 outline outline-4 outline-[var(--bg)] transition-colors group-hover:bg-zinc-500 dark:group-hover:bg-zinc-400"></div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-3 text-left hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-all duration-300 rounded-xl p-2.5 -ml-2.5 cursor-pointer bg-transparent border-0 group-hover:translate-x-1"
      >
        <span className="flex items-start gap-3.5 min-w-0">
          <svg className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-300 shrink-0 mt-1.5 ${open ? 'rotate-90 text-zinc-600 dark:text-zinc-200' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
          
          {logo && (
            <img src={logo} alt={`${title} logo`} className="w-10 h-10 rounded-md object-cover border border-zinc-200/50 dark:border-zinc-700/50 bg-[var(--surface)] shrink-0" />
          )}
          <span>
            <span className="block text-sm font-bold text-zinc-800 dark:text-zinc-100">{title}</span>
            <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{lang === 'zh' && role_zh ? role_zh : lang === 'id' && role_id ? role_id : role}</span>
          </span>
        </span>
        <span className="text-right shrink-0">
          <span className="block text-[11px] text-zinc-400 font-mono">{period}</span>
          <span className="block text-[10px] text-zinc-400 mt-1 transition-opacity">{open ? t.hideDetail : t.viewDetail}</span>
        </span>
      </button>
      
      {/* CSS Grid Smooth Accordion */}
      <div 
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="pt-3 pb-1 pl-9 sm:pl-11">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">{lang === 'zh' && description_zh ? description_zh : lang === 'id' && description_id ? description_id : description}</p>
            <ul className="space-y-1.5 mb-3.5">
              {(lang === 'zh' && points_zh ? points_zh : lang === 'id' && points_id ? points_id : points).map((p, i) => (
                <li key={i} className="text-xs text-zinc-500 dark:text-zinc-400 pl-4 relative before:content-['−'] before:absolute before:left-0 before:text-zinc-300 dark:before:text-zinc-600">
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {tags.map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded text-zinc-600 dark:text-zinc-400 font-mono transition-colors hover:border-zinc-300 dark:hover:border-zinc-500">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Splash Screen ────────────────────────────────────────────────
function SplashScreen({ onDone, greetingsData }) {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('in');
  const [tick, setTick] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [ready, setReady] = useState(false);
  const pRef = useRef({ word: 0, phase: 'in', endDelay: false });

  useEffect(() => {
    if (!ready) {
      const t = setTimeout(() => setReady(true), 200);
      return () => clearTimeout(t);
    }
    const p = pRef.current;
    if (p.word >= greetingsData.length) {
      if (!p.endDelay) {
        p.endDelay = true;
        const t = setTimeout(() => { setFadeOut(true); setTimeout(onDone, 300); }, 50);
        return () => clearTimeout(t);
      }
      return;
    }
    const t = setTimeout(() => {
      if (p.phase === 'in') { setText(greetingsData[p.word]); setPhase('show'); p.phase = 'hold'; }
      else if (p.phase === 'hold') { setPhase('out'); p.phase = 'out'; }
      else if (p.phase === 'out') { p.word++; setPhase('in'); p.phase = 'in'; }
      setTick(x => x + 1);
    }, p.phase === 'in' ? 120 : p.phase === 'hold' ? 200 : 80);
    return () => clearTimeout(t);
  }, [tick, onDone, ready, greetingsData]);

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center overflow-hidden px-4 py-8">
        <p
          className="font-mono text-3xl md:text-5xl text-[#e5e5e5] leading-normal"
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

function LiveTimeWidget({ timezone, displayFormat }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  let formattedTime = "";
  try {
    if (displayFormat === 'WIB') {
      formattedTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone || 'Asia/Jakarta',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }).format(time) + ' WIB';
    } else {
      formattedTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone || 'Asia/Jakarta',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZoneName: 'shortOffset'
      }).format(time).replace('GMT', 'UTC');
    }
  } catch (e) {
    formattedTime = "00:00:00";
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-3">
      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{formattedTime}</span>
    </div>
  );
}

function DetailedDottedMap({ profile }) {
  return (
    <div id="world-map-wrapper" className="sticky top-24 -z-10 w-full h-[150px] md:h-[220px] mb-4 mx-auto overflow-hidden opacity-70 will-change-transform">
      {/* Inner wrapper preserves perfect 2:1 aspect ratio for coordinate accuracy */}
      <div className="absolute top-1/2 left-0 w-full aspect-[2/1] -translate-y-1/2">
        
        {/* Scroll Zoom Wrapper */}
        <div 
          id="world-map-zoom"
          className="w-full h-full will-change-transform"
          style={{ transformOrigin: `${profile.mapX || 76.6}% ${profile.mapY || 54}%` }}
        >
          <div 
            className="absolute inset-0 text-zinc-900 dark:text-zinc-300"
            style={{
              backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
              backgroundSize: '6px 6px',
              maskImage: 'url(/world.svg)',
              maskSize: '100% 100%',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: 'url(/world.svg)',
              WebkitMaskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center'
            }}
          />
          
          {/* Dynamic Location Marker */}
          <div 
            className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${profile.mapX || 76.6}%`, top: `${profile.mapY || 54}%` }}
          >
            <div className="absolute inset-0 bg-black dark:bg-white rounded-full animate-ping opacity-100" />
            <div className="absolute inset-0 bg-black dark:bg-white rounded-full" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-10 md:right-4">
        <LiveTimeWidget timezone={profile.timezone} displayFormat={profile.timezoneLabel} />
      </div>
    </div>
  );
}

let hasShownSplash = false;

// ── Main Home Component ───────────────────────────────────────────
export default function Home() {
  const data = usePortfolioData();
  const lang = useLanguage();

  const t = i18n[lang] || i18n.en;
  const toggleLang = () => {
    const next = lang === 'en' ? 'id' : lang === 'id' ? 'zh' : 'en';
    setLanguage(next);
  };

  const [splashDone, setSplashDone] = useState(hasShownSplash);
  
  const finishSplash = () => {
    hasShownSplash = true;
    setSplashDone(true);
  };

  const [dark, toggleDark] = useDarkMode();
  const [activeSection, setActiveSection] = useState('home');
  const [copiedId, setCopiedId] = useState(null);
  const location = useLocation();
  const [chartError, setChartError] = useState(false);

  // Active section handled in combined scroll listener

  // Scroll to hash
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location.hash]);

  // SEO: Update Title and Meta Description
  useEffect(() => {
    if (data.profile.name) {
      document.title = `Portfolio - ${data.profile.name}`;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", data.profile.bio && data.profile.bio.length > 0 ? data.profile.bio[0] : t.subtitle);
    }
  }, [data.profile.name, data.profile.bio, t.subtitle]);

  // Combined scroll listener (Progress + Parallax) optimized with requestAnimationFrame
  useEffect(() => {
    if (!splashDone) return;
    
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // 1. Progress Bar
          const progress = document.getElementById('scroll-progress');
          if (progress) {
            const scrollTop = window.scrollY;
            const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
            progress.style.transform = `scaleX(${scrollTop / docHeight})`;
          }

          // 2. Map Parallax Zoom (Sticky)
          const mapZoom = document.getElementById('world-map-zoom');
          const mapWrapper = document.getElementById('world-map-wrapper');
          if (mapZoom && mapWrapper) {
            const maxScroll = 300; 
            const scrollPct = Math.min(window.scrollY / maxScroll, 1);
            const ease = scrollPct < 0.5 ? 2 * scrollPct * scrollPct : 1 - Math.pow(-2 * scrollPct + 2, 2) / 2;
            const scale = 1 + (ease * 4); // Zooms from 1x to 5x
            const opacity = Math.max(0, 1 - (scrollPct * 2.5)); 
            
            mapZoom.style.transform = `scale(${scale})`;
            mapWrapper.style.opacity = opacity.toString();
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [splashDone]);

  // 3. Scroll Spy (Active Section) optimized with IntersectionObserver
  useEffect(() => {
    if (!splashDone) return;
    const ids = ['home', 'stack', 'exp', 'proj', 'contact'];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 }); // Trigger when section hits top 30%

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [splashDone]);

  const copyToClipboard = async (text, id) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.cssText = 'position:fixed;opacity:0;';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        area.remove();
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch { setCopiedId(null); }
  };

  if (!splashDone) return <SplashScreen onDone={finishSplash} greetingsData={data.greetings} />;

  const sections = ['home', 'stack', 'exp', 'proj', 'contact'];
  const sectionLabels = {
    home: t.navHome,
    stack: t.navStack,
    exp: t.navExp,
    proj: t.navProj,
    contact: t.navContact
  };

  const featuredProjects = data.projects.filter(p => p.featured);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : data.projects.slice(0, 2);

  return (
    <div className="min-h-screen max-md:pb-16 bg-[var(--bg)] text-[var(--text)] antialiased">
      {/* Scroll progress bar */}
      <div id="scroll-progress" aria-hidden="true" />

      {/* Side Nav — desktop only */}
      <nav
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50 max-md:hidden"
        aria-label="Section navigation"
      >
        {sections.map(s => (
          <a
            key={s}
            href={`#${s}`}
            className={`w-2 h-2 rounded-full transition-all duration-200 hover:scale-125 hover:bg-black dark:bg-white text-white dark:text-black ${activeSection === s ? 'bg-black dark:bg-white text-white dark:text-black scale-125 shadow-[0_0_0_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_4px_rgba(255,255,255,0.1)]' : 'bg-zinc-300 dark:bg-zinc-700'}`}
            aria-current={activeSection === s ? 'location' : undefined}
          >
            <span className="sr-only">Go to {sectionLabels[s]}</span>
          </a>
        ))}
      </nav>

      {/* Header */}
      <div className="sticky top-0 z-40 w-full bg-[var(--bg)]/70 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50">
        <header className="max-w-[760px] mx-auto px-5 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold">{data.profile.name}</span>
          <nav className="flex gap-4 max-md:hidden" aria-label="Section links">
            {sections.map(l => (
              <a
                key={l}
                href={`#${l}`}
                className={`text-xs font-mono transition-colors ${activeSection === l ? 'text-black dark:text-white' : 'text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200'}`}
              >
                /{sectionLabels[l]}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            <LangToggle lang={lang} toggleLang={toggleLang} />
            <DarkModeToggle toggleDark={toggleDark} dark={dark} />
            <HeaderIcons github={data.profile.github} linkedin={data.profile.linkedin} />
          </div>
        </header>
      </div>

      {/* Mobile nav */}
      <nav
        className="fixed md:hidden bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[400px] z-50 flex items-center justify-between gap-1 p-1.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/70 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-lg shadow-zinc-300/20 dark:shadow-black/30"
        aria-label="Mobile section navigation"
      >
        {sections.map(s => (
          <a
            key={s}
            href={`#${s}`}
            aria-label={`Go to ${s}`}
            aria-current={activeSection === s ? 'location' : undefined}
            className={`flex-1 min-w-0 text-center truncate px-1.5 py-1.5 rounded-xl text-[10px] font-mono transition-colors ${activeSection === s ? 'bg-black dark:bg-white text-white dark:text-black text-white' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
          >
            /{sectionLabels[s]}
          </a>
        ))}
      </nav>

      {/* Main Content */}
      <div className="animate-page-enter">
        {/* Home */}
        <section id="home" className="max-w-[760px] mx-auto px-5 pt-8 pb-12 max-sm:pt-6 max-sm:pb-[30px] relative">
        <DetailedDottedMap profile={data.profile} />
        <div className="flex gap-6 items-start max-sm:gap-4 max-sm:flex-col max-sm:items-center max-sm:text-center">
          <img
            src={`https://github.com/${data.profile.github}.png?size=400`}
            alt={data.profile.name}
            width="160"
            height="160"
            onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/avatar-fallback.svg'; }}
            className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] shrink-0 rounded-full object-cover bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm"
          />
          <div>
            <div className="mb-4 text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-400 text-left max-sm:text-center">
              {data.profile.availableForWork ? (
                <a href="#contact" className="inline-block text-center text-zinc-400 hover:text-black dark:hover:text-white transition-colors no-underline">
                  <span className="max-sm:block max-sm:mb-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-black dark:bg-white shadow-[0_0_0_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_4px_rgba(255,255,255,0.1)] mr-2 relative -top-0.5" />
                    {t.available}
                  </span>
                  <span className="max-sm:hidden"> · </span>
                  <span className="max-sm:block max-sm:text-[10px] max-sm:text-zinc-500">
                    {data.profile.location}
                  </span>
                </a>
              ) : (
                <a href="#contact" className="text-zinc-400 hover:text-black dark:text-white transition-colors no-underline">
                  {data.profile.location}
                </a>
              )}
            </div>
            <h1 className="font-mono text-xl md:text-2xl text-black dark:text-white mb-4 leading-tight tracking-widest">
              <span className="text-3xl md:text-4xl font-bold">{data.profile.name.split(' ')[0]}</span> {data.profile.name.split(' ').slice(1).join(' ')}
            </h1>
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mb-5 max-w-[430px] leading-relaxed">
              {t.subtitle}
            </p>
            
            {data.profile.cvUrl ? (
              <a
                href={data.profile.cvUrl}
                download
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-lg transition-colors no-underline"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download CV
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-lg cursor-not-allowed">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 6v12M6 12h12"/></svg>
                {t.cv}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Bio */}
      <Reveal className="max-w-[760px] mx-auto px-5 pb-[30px]">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-zinc-400">{t.aboutMe}</span>
          <span className="h-px flex-1 bg-zinc-200/80 dark:bg-zinc-800" />
        </div>
        <ul className="space-y-3">
          {(lang === 'zh' && data.profile.bio_zh ? data.profile.bio_zh : lang === 'id' && data.profile.bio_id ? data.profile.bio_id : data.profile.bio).map((t, i) => (
            <li key={i} className="pl-5 relative text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed before:content-['→'] before:absolute before:left-0 before:text-black dark:before:text-white before:font-mono before:text-xs">
              {t}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Currently learning */}
      <section className="max-w-[760px] mx-auto px-5 pb-[30px]">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-zinc-400">{t.learning}</span>
          <span className="h-px flex-1 bg-zinc-200/80 dark:bg-zinc-800" />
        </div>
        <div className="flex flex-wrap gap-2">
          {data.currentlyLearning.map(item => (
            <span
              key={item}
              className="px-2.5 py-1 text-[11px] font-mono rounded-full border border-zinc-200/70 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 hover:border-black dark:hover:border-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* GitHub Activity */}
      <section className="max-w-[760px] mx-auto px-5 pb-[30px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-zinc-400">{t.githubAct}</span>
          <a
            href={`https://github.com/${data.profile.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-black dark:text-white hover:text-black dark:text-white transition-colors"
          >
            {t.viewProf}
          </a>
        </div>
        <div className="bg-[var(--surface)] dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/50 rounded-xl px-4 py-2 overflow-x-auto flex items-center justify-center">
          {chartError ? (
            <div className="flex items-center justify-center text-xs font-mono text-zinc-400 dark:text-zinc-600 py-6">
              <span>{t.ghUnavail} </span>
              <a href={`https://github.com/${data.profile.github}`} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white ml-1 hover:underline">{t.visitProf}</a>
            </div>
          ) : (
            <img 
              src={`https://ghchart.rshah.org/000000/${data.profile.github}`} 
              alt="GitHub contributions graph" 
              className="max-w-full h-auto dark:invert dark:hue-rotate-180 object-contain" 
              onError={() => setChartError(true)} 
            />
          )}
        </div>
      </section>

      {/* Accordion Sections */}
      <div className="max-w-[760px] mx-auto px-5 pb-12 pt-4 space-y-[30px]">

        {/* Stack */}
        <Section id="stack" label={t.stack} startOpen t={t}>
          {Object.entries(data.stack).map(([cat, items]) => (
            <div key={cat} className="mb-4 last:mb-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2 font-mono">{cat}</p>
              <div className="flex flex-wrap gap-2">
                {items.map(item => (
                  <span
                    key={item.name}
                    className="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/50 rounded-full text-zinc-500 dark:text-zinc-400 hover:border-black dark:hover:border-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 cursor-default"
                  >
                    <StackIcon name={item.name} slug={item.icon} dark={dark} />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* Experience */}
        <Section id="exp" label={t.experience} startOpen t={t}>
          {data.experiences.map((e, i) => <ExpCard key={i} {...e} t={t} lang={lang} />)}
        </Section>

        {/* Projects */}
        <Section id="proj" label={t.projects} startOpen t={t}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.18em]">{t.selectedWork}</span>
            <span className="text-[11px] text-zinc-400">{displayProjects.length} {t.of} {data.projects.length} {t.projects.toLowerCase()}</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {displayProjects.map(p => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="block p-4 border border-zinc-200/80 dark:border-zinc-800 rounded-xl bg-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 hover:border-black dark:hover:border-zinc-500 transition-colors duration-200 no-underline text-inherit"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{p.title}</h3>
                  <span className="text-[11px] font-mono text-black dark:text-white">{t.viewDetail} →</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-2 line-clamp-2">{lang === 'zh' && p.desc_zh ? p.desc_zh : lang === 'id' && p.desc_id ? p.desc_id : p.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-500 dark:text-zinc-400 font-mono">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-700/50 flex justify-end">
            <Link to="/projects" className="text-[11px] font-mono text-black dark:text-white hover:text-black dark:text-white transition-colors">
              {t.seeAllProj}
            </Link>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" label={t.contact} startOpen t={t}>
          <div className="mb-4 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-transparent px-4 py-4 flex flex-col items-center text-center">
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{t.idea}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{t.build}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'email', label: data.profile.email, href: `mailto:${data.profile.email}`, copyText: data.profile.email, icon: 'mail', colorCls: 'text-zinc-400' },
              { id: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${(data.profile.whatsapp || '').replace(/[^0-9]/g, '')}`, copyText: data.profile.whatsapp || '', icon: 'whatsapp', colorCls: 'text-zinc-400' },
              { id: 'github', label: `github.com/${data.profile.github}`, href: `https://github.com/${data.profile.github}`, copyText: `https://github.com/${data.profile.github}`, icon: 'github', colorCls: 'text-zinc-400' },
              { id: 'linkedin', label: `linkedin.com/in/${data.profile.linkedin}`, href: `https://linkedin.com/in/${data.profile.linkedin}`, copyText: `https://linkedin.com/in/${data.profile.linkedin}`, icon: 'linkedin', colorCls: 'text-zinc-400' }
            ].map(c => (
              <div key={c.id} className="flex items-center gap-2 px-3 py-2 bg-transparent border border-zinc-200/80 dark:border-zinc-800 rounded-lg text-xs text-zinc-500 dark:text-zinc-400 font-mono h-11">
                <a href={c.href} target={c.id === 'email' ? undefined : '_blank'} rel={c.id === 'email' ? undefined : 'noopener noreferrer'} className="flex items-center gap-2 min-w-0 flex-1 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors no-underline">
                  <span className={`${c.colorCls} shrink-0`}><ContactIcon type={c.icon} /></span>
                  <span className="truncate">{c.label}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(c.copyText, c.id)}
                  className="shrink-0 p-1.5 rounded-md text-[10px] text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer border-0 bg-transparent font-mono flex items-center justify-center"
                  aria-label={`Copy ${c.id}`}
                  title={`Copy ${c.id}`}
                >
                  {copiedId === c.id ? <ContactIcon type="check" /> : <ContactIcon type="copy" />}
                </button>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Footer */}
      <footer className="max-w-[760px] mx-auto px-5 pt-12 pb-32 md:pb-40 border-t border-zinc-200/60 dark:border-zinc-700/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600 flex flex-col items-center md:items-start gap-1">
            <p>© {new Date().getFullYear()} {data.profile.name}.</p>
            <p><LiveTime timezone={data.profile.timezone} displayFormat={data.profile.timezoneLabel} t={t} /></p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2 md:gap-1">
            <div className="flex items-center gap-4 flex-wrap">
              <Link to="/blog" className="text-[10px] font-mono text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">/{t.navBlog}</Link>
              <Link to="/gallery" className="text-[10px] font-mono text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">/{t.navGallery}</Link>
              <Link to="/projects" className="text-[10px] font-mono text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">/{t.navProj}</Link>
            </div>
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-[10px] font-mono text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer bg-transparent border-0 mt-0 md:mt-1">
              {t.backToTop}
            </button>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
