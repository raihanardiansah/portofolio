import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolioData, useLanguage, setLanguage, getLoc } from '../store';
import Section from '../components/Section';
import ExpCard from '../components/ExpCard';
import SplashScreen from '../components/SplashScreen';

const i18n = {
  en: {
    available: 'Available for work',
    welcome: 'Welcome to my',
    portfolio: 'portfolio',
    subtitle: 'I design and build digital products focusing on function and user convenience.',
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
    ghUnavail: 'GitHub activity unavailable.',
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
    subtitle: 'Saya merancang dan membangun produk digital yang berfokus pada fungsi dan kemudahan pengguna.',
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
    ghUnavail: 'Aktivitas GitHub tidak tersedia.',
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
    subtitle: '我设计并构建专注于功能和用户便利性的数字产品。',
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
    ghUnavail: 'GitHub 动态不可用。',
    visitProf: '访问资料 →',
    localTime: '当地时间:',
    collapse: '收起',
    expand: '展开',
    backToTop: '返回顶部 ↑'
  },
  ja: {
    available: '就業可能',
    welcome: 'ようこそ、私の',
    portfolio: 'ポートフォリオへ',
    subtitle: '機能とユーザーの利便性に焦点を当てたデジタル製品を設計、構築しています。',
    aboutMe: '私について',
    home: 'ホーム',
    cv: '履歴書準備中',
    stack: '技術スタック',
    experience: '経歴',
    projects: 'プロジェクト',
    contact: '連絡先',
    navHome: 'ホーム',
    navStack: 'スタック',
    navExp: '経歴',
    navProj: 'プロジェクト',
    navContact: '連絡先',
    navGallery: 'ギャラリー',
    navBlog: 'ブログ',
    learning: '現在学習中',
    githubAct: 'GitHub アクティビティ',
    viewDetail: '詳細を見る',
    hideDetail: '詳細を隠す',
    selectedWork: '厳選された作品',
    of: '/',
    seeAllProj: 'すべてのプロジェクトを見る →',
    idea: 'アイデアやプロジェクトはありますか？',
    build: '一緒に役立つものを作りましょう。',
    viewProf: 'プロフィールを見る →',
    ghUnavail: 'GitHub アクティビティは利用できません。',
    visitProf: 'プロフィールにアクセス →',
    localTime: '現地時間:',
    collapse: '折りたたむ',
    expand: '展開する',
    backToTop: 'トップへ戻る ↑'
  },
  ko: {
    available: '업무 가능',
    welcome: '환영합니다, 저의',
    portfolio: '포트폴리오에',
    subtitle: '기능과 사용자 편의성에 중점을 둔 디지털 제품을 설계하고 구축합니다.',
    aboutMe: '내 소개',
    home: '홈',
    cv: '이력서 준비 중',
    stack: '기술 스택',
    experience: '경력',
    projects: '프로젝트',
    contact: '연락처',
    navHome: '홈',
    navStack: '스택',
    navExp: '경력',
    navProj: '프로젝트',
    navContact: '연락처',
    navGallery: '갤러리',
    navBlog: '블로그',
    learning: '현재 학습 중',
    githubAct: 'GitHub 활동',
    viewDetail: '자세히 보기',
    hideDetail: '자세히 숨기기',
    selectedWork: '선택된 작업',
    of: '/',
    seeAllProj: '모든 프로젝트 보기 →',
    idea: '아이디어나 프로젝트가 있으신가요?',
    build: '함께 유용한 것을 만들어 봅시다.',
    viewProf: '프로필 보기 →',
    ghUnavail: 'GitHub 활동을 사용할 수 없음.',
    visitProf: '프로필 방문 →',
    localTime: '현지 시간:',
    collapse: '접기',
    expand: '펼치기',
    backToTop: '맨 위로 ↑'
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
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
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

// ── HeaderIcons ─────────────────────────────────────────────────
function HeaderIcons({ github, linkedin }) {
  const linkCls = 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors flex items-center';
  return (
    <div className="flex items-center gap-2">
      <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer" className={linkCls} aria-label="GitHub profile">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>
      <a href={`https://linkedin.com/in/${linkedin}`} target="_blank" rel="noopener noreferrer" className={linkCls} aria-label="LinkedIn profile">
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
  if (type === 'github') return <svg {...props} fill="currentColor" stroke="none"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.627-5.373-12-12-12z"/></svg>;
  if (type === 'linkedin') return <svg {...props} fill="currentColor" stroke="none"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
  if (type === 'whatsapp') return <svg {...props} fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.297-.347.446-.521c.149-.174.198-.298.297-.496c.099-.198.05-.371-.025-.52c-.074-.149-.67-1.615-.918-2.21c-.237-.574-.477-.496-.67-.535c-.173-.035-.371-.035-.57-.035c-.198 0-.52.074-.792.371c-.273.297-1.04 1.016-1.04 2.479c0 1.463 1.065 2.875 1.213 3.073c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.851 9.851 0 0 1-5.035-1.383l-.361-.214l-3.741.982l.998-3.648l-.235-.387a9.852 9.852 0 0 1 1.51-11.838c3.844-3.844 10.05-3.844 13.895 0c3.844 3.844 3.844 10.05 0 13.895c-1.922 1.922-4.456 2.972-7.158 2.972z"/></svg>;
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

// ── LiveTime (footer, with i18n) ─────────────────────────────────
function LiveTime({ timezone, displayFormat, t }) {
  const lang = useLanguage();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  let formattedTime = '';
  try {
    const locale = lang === 'en' ? 'en-GB' : lang;
    if (displayFormat === 'WIB') {
      formattedTime = new Intl.DateTimeFormat(locale, {
        timeZone: timezone || 'Asia/Jakarta',
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }).format(time).replace(',', '') + ' WIB';
    } else {
      formattedTime = new Intl.DateTimeFormat(locale, {
        timeZone: timezone || 'Asia/Jakarta',
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZoneName: 'shortOffset'
      }).format(time).replace('GMT', 'UTC');
    }
  } catch (e) {
    formattedTime = '00:00:00';
  }

  return <span>{t.localTime} {formattedTime}</span>;
}

// ── LiveTimeWidget (map overlay, compact) ────────────────────────
function LiveTimeWidget({ timezone, displayFormat }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  let formattedTime = '';
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
    formattedTime = '00:00:00';
  }

  return (
    <div className="flex items-center justify-center mt-3 bg-[var(--bg)] px-1">
      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{formattedTime}</span>
    </div>
  );
}
// ── CertList (Certificates with show more/less) ──────────────────
const CERT_LIMIT = 3;
function CertList({ certs, lang, getLoc }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? certs : certs.slice(0, CERT_LIMIT);
  const hasMore = certs.length > CERT_LIMIT;

  return (
    <div>
      <div className="flex flex-col gap-3">
        {visible.map((cert, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl border border-zinc-200/70 dark:border-zinc-700/50 bg-zinc-50/50 dark:bg-zinc-800/30 hover:border-black dark:hover:border-zinc-500 transition-colors duration-200"
          >
            {cert.icon && cert.icon.startsWith('http') ? (
              <img src={cert.icon} alt={cert.title} className="shrink-0 w-9 h-9 rounded-lg object-cover border border-zinc-200/80 dark:border-zinc-700/50" />
            ) : cert.icon ? (
              <div className="shrink-0 w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/50 flex items-center justify-center font-mono text-[11px] font-bold text-black dark:text-white">
                {cert.icon}
              </div>
            ) : (
              <div className="shrink-0 w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/50 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6"/>
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                </svg>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 leading-snug">
                {getLoc(lang, cert.title, cert.title_id, cert.title_zh, cert.title_ja, cert.title_ko) || cert.title}
              </p>
              <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
                {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
              </p>
            </div>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors no-underline mt-1"
                aria-label={`View credential for ${cert.title}`}
              >
                Verify ↗
              </a>
            )}
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setShowAll(v => !v)}
          className="mt-3 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
        >
          {showAll
            ? getLoc(lang, 'Show less ↑', 'Tampilkan lebih sedikit ↑', '显示更少 ↑', '少なく表示 ↑', '간략히 보기 ↑')
            : getLoc(lang, `Show all ${certs.length} →`, `Lihat semua ${certs.length} →`, `显示全部 ${certs.length} →`, `すべて表示 ${certs.length} →`, `전체 ${certs.length}개 보기 →`)}
        </button>
      )}
    </div>
  );
}

function DetailedDottedMap({ profile }) {
  return (
    <div id="world-map-wrapper" className="sticky top-24 -z-10 w-full h-[150px] md:h-[220px] mt-2 mb-4 mx-auto overflow-hidden opacity-70 will-change-transform">
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

// ── Module-level splash guard ────────────────────────────────────
let hasShownSplash = false;

// ── Main Home Component ───────────────────────────────────────────
export default function Home() {
  const data = usePortfolioData();
  const lang = useLanguage();

  const t = i18n[lang] || i18n.en;
  const toggleLanguage = () => {
    const next = lang === 'en' ? 'id' : lang === 'id' ? 'zh' : lang === 'zh' ? 'ja' : lang === 'ja' ? 'ko' : 'en';
    setLanguage(next);
  };

  const [splashDone, setSplashDone] = useState(hasShownSplash);
  
  const finishSplash = () => {
    hasShownSplash = true;
    setSplashDone(true);
  };

  const [dark, toggleDark] = useDarkMode();
  const [activeSection, setActiveSection] = useState('home');
  const [avatarFlipped, setAvatarFlipped] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const location = useLocation();
  // FIX #4: chartError resets when github username changes
  const [chartError, setChartError] = useState(false);
  const prevGithub = useRef(data.profile.github);

  useEffect(() => {
    if (prevGithub.current !== data.profile.github) {
      setChartError(false);
      prevGithub.current = data.profile.github;
    }
  }, [data.profile.github]);

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
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', data.profile.bio && data.profile.bio.length > 0 ? data.profile.bio[0] : t.subtitle);
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
            const scale = 1 + (ease * 4);
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
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

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

  // FIX #25: Build contact list conditionally — skip whatsapp if empty
  const contactItems = [
    { id: 'email', label: data.profile.email, href: `mailto:${data.profile.email}`, copyText: data.profile.email, icon: 'mail', colorCls: 'text-zinc-500 dark:text-zinc-400' },
    ...(data.profile.whatsapp ? [{ id: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${(data.profile.whatsapp || '').replace(/[^0-9]/g, '')}`, copyText: data.profile.whatsapp, icon: 'whatsapp', colorCls: 'text-zinc-500 dark:text-zinc-400' }] : []),
    { id: 'github', label: `github.com/${data.profile.github}`, href: `https://github.com/${data.profile.github}`, copyText: `https://github.com/${data.profile.github}`, icon: 'github', colorCls: 'text-zinc-500 dark:text-zinc-400' },
    { id: 'linkedin', label: `linkedin.com/in/${data.profile.linkedin}`, href: `https://linkedin.com/in/${data.profile.linkedin}`, copyText: `https://linkedin.com/in/${data.profile.linkedin}`, icon: 'linkedin', colorCls: 'text-zinc-500 dark:text-zinc-400' }
  ];

  // Language labels for aria-label
  const langNames = { en: 'English', id: 'Indonesian', zh: 'Chinese', ja: 'Japanese', ko: 'Korean' };

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
            className={`w-2 h-2 rounded-full transition-all duration-200 hover:scale-125 hover:bg-black dark:hover:bg-white ${activeSection === s ? 'bg-black dark:bg-white scale-125 shadow-[0_0_0_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_4px_rgba(255,255,255,0.1)]' : 'bg-zinc-300 dark:bg-zinc-700'}`}
            aria-current={activeSection === s ? 'location' : undefined}
            aria-label={`Go to ${sectionLabels[s]}`}
          >
            <span className="sr-only">Go to {sectionLabels[s]}</span>
          </a>
        ))}
      </nav>

      {/* Header */}
      <div className="sticky top-0 z-40 w-full bg-[var(--bg)]/70 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50">
        <header className="max-w-[760px] mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <span className="text-sm font-semibold shrink-0">{data.profile.name.split(' ')[0]}</span>
          <nav className="flex gap-4 max-md:hidden" aria-label="Section links">
            {sections.map(l => (
              <a
                key={l}
                href={`#${l}`}
                className={`text-xs font-mono transition-colors ${activeSection === l ? 'text-black dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'}`}
              >
                /{sectionLabels[l]}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            {/* FIX #26: aria-label on language buttons */}
            <div className="flex gap-4">
              {['en', 'id', 'zh', 'ja', 'ko'].map(l => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  aria-label={`Switch to ${langNames[l]}`}
                  aria-pressed={lang === l}
                  className={`font-mono text-xs uppercase ${lang === l ? 'text-black dark:text-white font-bold' : 'text-zinc-500 hover:text-black dark:hover:text-white'}`}
                >
                  {l}
                </button>
              ))}
            </div>
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
            aria-label={`Go to ${sectionLabels[s]}`}
            aria-current={activeSection === s ? 'location' : undefined}
            className={`flex-1 min-w-0 text-center truncate px-1.5 py-1.5 rounded-xl text-[10px] font-mono transition-colors ${activeSection === s ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
          >
            /{sectionLabels[s]}
          </a>
        ))}
      </nav>

      {/* Main Content */}
      <div className="animate-page-enter">
        {/* Home */}
        <section id="home" className="max-w-[760px] mx-auto px-5 pt-2 pb-12 max-sm:pt-1 max-sm:pb-[30px] relative">
        <DetailedDottedMap profile={data.profile} />
        <div className="flex gap-6 items-start mt-8 max-sm:mt-6 max-sm:gap-4 max-sm:flex-col max-sm:items-center max-sm:text-center">
          {/* Profile avatar with pixel art flip Easter egg */}
          <div
            onClick={() => setAvatarFlipped(f => !f)}
            title={avatarFlipped ? 'Click to go back' : 'Click me!'}
            style={{ perspective: '600px', cursor: 'pointer' }}
            className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] shrink-0 relative"
          >
            <div
              style={{
                width: '100%', height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.55s cubic-bezier(0.4,0.2,0.2,1)',
                transform: avatarFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front: real GitHub photo */}
              <img
                src={`https://github.com/${data.profile.github}.png?size=400`}
                alt={data.profile.name}
                width="160" height="160"
                onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/avatar-fallback.svg'; }}
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                className="absolute inset-0 w-full h-full rounded-full object-cover bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm"
              />
              {/* Back: DiceBear pixel art avatar */}
              <img
                src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(data.profile.name)}&size=160&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                alt="Pixel art avatar"
                width="160" height="160"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
                className="absolute inset-0 w-full h-full rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shadow-sm"
              />
            </div>
          </div>
          <div>
            <div className="mb-4 text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400 text-left max-sm:text-center">
              {data.profile.availableForWork ? (
                <a href="#contact" className="inline-block text-center text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors no-underline">
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
                <a href="#contact" className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors no-underline">
                  {data.profile.location}
                </a>
              )}
            </div>
            <h1 className="font-mono text-3xl md:text-4xl font-bold text-black dark:text-white mb-4 leading-tight tracking-widest">
              {data.profile.name}
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
          <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-zinc-500 dark:text-zinc-400">{t.aboutMe}</span>
          <span className="h-px flex-1 bg-zinc-200/80 dark:bg-zinc-800" />
        </div>
        <ul className="space-y-3">
          {/* FIX #2 & #25: use getLoc from store (with proper empty check) */}
          {(getLoc(lang, data.profile.bio, data.profile.bio_id, data.profile.bio_zh, data.profile.bio_ja, data.profile.bio_ko) || []).map((item, i) => (
            <li key={i} className="flex items-baseline gap-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              <span className="text-black dark:text-white shrink-0 text-xs leading-none">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Currently learning */}
      <section className="max-w-[760px] mx-auto px-5 pb-[30px]">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-zinc-500 dark:text-zinc-400">{t.learning}</span>
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

      {/* Certificates & Awards — only shown if data exists */}
      {(data.certificates || []).length > 0 && (
        <section className="max-w-[760px] mx-auto px-5 pb-[30px]">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-zinc-500 dark:text-zinc-400">
              {getLoc(lang, 'Certificates & Awards', 'Sertifikat & Penghargaan', '证书与奖项', '資格・受賞', '자격증 및 수상')}
            </span>
            <span className="h-px flex-1 bg-zinc-200/80 dark:bg-zinc-800" />
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">{(data.certificates || []).length}</span>
          </div>
          <CertList certs={data.certificates || []} lang={lang} getLoc={getLoc} />
        </section>
      )}

      {/* GitHub Activity */}
      <section className="max-w-[760px] mx-auto px-5 pb-[30px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-zinc-500 dark:text-zinc-400">{t.githubAct}</span>
          <a
            href={`https://github.com/${data.profile.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            {t.viewProf}
          </a>
        </div>
        <div className="bg-[var(--surface)] dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/50 rounded-xl px-4 py-2 overflow-x-auto flex items-center justify-center">
          {chartError ? (
            <div className="flex items-center justify-center text-xs font-mono text-zinc-500 dark:text-zinc-600 py-6">
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
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 font-mono">{cat}</p>
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

        {/* Experience — FIX #24: use title as key instead of index */}
        <Section id="exp" label={t.experience} startOpen t={t}>
          {data.experiences.map((exp) => <ExpCard key={exp.title} {...exp} t={t} lang={lang} />)}
        </Section>

        {/* Projects — FIX #25: variable shadowing fixed (tag instead of t) */}
        <Section id="proj" label={t.projects} startOpen t={t}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.18em]">{t.selectedWork}</span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{displayProjects.length} {t.of} {data.projects.length} {t.projects.toLowerCase()}</span>
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
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-2 line-clamp-2">{getLoc(lang, p.desc, p.desc_id, p.desc_zh, p.desc_ja, p.desc_ko)}</p>
                <div className="flex flex-wrap gap-1">
                  {/* FIX #25: renamed loop var from t to tag to avoid shadowing i18n t */}
                  {p.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-500 dark:text-zinc-400 font-mono">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-700/50 flex justify-end">
            <Link to="/projects" className="text-[11px] font-mono text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
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
            {contactItems.map(c => (
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
          <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-600 flex flex-col items-center md:items-start gap-1">
            <p>© {new Date().getFullYear()} {data.profile.name}.</p>
            <p><LiveTime timezone={data.profile.timezone} displayFormat={data.profile.timezoneLabel} t={t} /></p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2 md:gap-1">
            <div className="flex items-center gap-4 flex-wrap">
              <Link to="/blog" className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">/{t.navBlog}</Link>
              <Link to="/gallery" className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">/{t.navGallery}</Link>
              <Link to="/projects" className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">/{t.navProj}</Link>
            </div>
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer bg-transparent border-0 mt-0 md:mt-1">
              {t.backToTop}
            </button>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
