import { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePortfolioData, useLanguage, getLoc } from '../store';
import { Share2 } from 'lucide-react';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';

function useDark() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const observer = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains('dark'))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return dark;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  useDark(); // keep dark mode reactive
  const data = usePortfolioData();
  const lang = useLanguage();
  const [copied, setCopied] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const project = data.projects.find(item => item.slug === slug);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = useCallback(() => {
    setLightboxIndex(prev => (prev === null || !project?.gallery ? null : (prev + 1) % project.gallery.length));
  }, [project]);

  const prevImage = useCallback(() => {
    setLightboxIndex(prev => (prev === null || !project?.gallery ? null : (prev - 1 + project.gallery.length) % project.gallery.length));
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: project.title, url }); }
      catch (err) { /* user canceled */ }
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (!project) { navigate('/', { replace: true }); return; }
  }, [project, navigate]);

  if (!project) return null;

  // FIX #5: Sanitize HTML content before rendering to prevent XSS
  const safeOverview = DOMPurify.sanitize(
    getLoc(lang, project.overview, project.overview_id, project.overview_zh, project.overview_ja, project.overview_ko) || ''
  );
  
  const title = `${project.title} | ${data.profile.name || 'Portfolio'}`;
  const description = getLoc(lang, project.description, project.description_id, project.description_zh, project.description_ja, project.description_ko) || '';
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const ogImage = project.image || '/og-image.svg';

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <div className="max-w-[760px] mx-auto px-5 py-8 sm:py-14">

        {/* Back link */}
        <Link
          to="/projects"
          className="inline-block text-xs font-mono text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors mb-10 no-underline"
        >
          {getLoc(lang, '← Back to projects', '← Kembali ke proyek', '← 返回项目', '← プロジェクトに戻る', '← 프로젝트로 돌아가기')}
        </Link>

        {/* Header */}
        <header className="mb-12">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-black dark:text-white mb-3">{getLoc(lang, 'Project detail', 'Detail proyek', '项目详情', 'プロジェクト詳細', '프로젝트 세부 정보')}</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-tight">
            {project.title}
          </h1>
          {/* FIX #5: safeOverview is DOMPurify sanitized */}
          <div 
            className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 leading-relaxed break-words"
            dangerouslySetInnerHTML={{ __html: safeOverview }}
          />
          <div className="flex flex-wrap items-center gap-2 mt-5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded text-[11px] text-zinc-600 dark:text-zinc-400 font-mono"
              >
                {tag}
              </span>
            ))}
            <span className="text-zinc-300 dark:text-zinc-600 mx-1">·</span>
            <button 
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
              title="Share this project"
              aria-label="Share this project"
            >
              <Share2 size={12} />
              {copied ? getLoc(lang, 'Copied!', 'Tersalin!', '已复制!', 'コピーしました!', '복사됨!') : getLoc(lang, 'Share', 'Bagikan', '分享', '共有する', '공유하기')}
            </button>
          </div>
        </header>

        {/* Meta + CTA */}
        <section className={`grid gap-5 border-t border-zinc-200 dark:border-zinc-800 pt-6 items-start ${(project.liveUrl || project.githubUrl) ? 'sm:grid-cols-[1fr_auto]' : ''}`}>
          <div className="md:w-1/3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-mono mb-2">{getLoc(lang, 'My role', 'Peran saya', '我的角色', '私の役割', '내 역할')}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{getLoc(lang, project.role, project.role_id, project.role_zh, project.role_ja, project.role_ko)}</p>
          </div>
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-fit rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-4 py-2.5 text-xs font-mono font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors no-underline"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
                Source Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-fit rounded-lg bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 text-xs font-mono font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors no-underline"
              >
                {project.liveLabel || 'Open live project'} ↗
              </a>
            )}
          </div>
        </section>

        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <section aria-labelledby="gallery-title" className="mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <div className="flex items-end justify-between pb-3 mb-6">
              <h2 id="gallery-title" className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{getLoc(lang, 'Gallery', 'Galeri', '画廊', 'ギャラリー', '갤러리')}</h2>
              <span className="text-[11px] font-mono text-zinc-400">{project.gallery.length} {getLoc(lang, project.gallery.length > 1 ? 'previews' : 'preview', 'pratinjau', '张预览', 'プレビュー', '미리보기')}</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.gallery.slice(0, 4).map((image, index) => {
                const isOverlay = index === 3 && project.gallery.length > 4;
                const remaining = project.gallery.length - 3;
                return (
                  <figure
                    key={`${image}-${index}`}
                    className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[var(--surface)] m-0 relative cursor-pointer group aspect-video"
                    onClick={() => openLightbox(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(index); }}
                  >
                    <img
                      src={image}
                      alt={`${project.title} preview ${index + 1}`}
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${isOverlay ? 'blur-[3px] brightness-75' : ''}`}
                      loading="lazy"
                      onError={e => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div
                      className="hidden items-center justify-center h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700"
                      style={{ display: 'none' }}
                    >
                      <span className="text-xs font-mono text-zinc-400">Image unavailable</span>
                    </div>
                    
                    {isOverlay ? (
                      <div className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors flex items-center justify-center">
                        <span className="text-white text-4xl font-mono font-medium">+{remaining}</span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end px-3 py-2">
                        <span className="text-xs font-mono text-zinc-300">
                          {getLoc(lang, 'Preview', 'Pratinjau', '预览', 'プレビュー', '미리보기')} {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    )}
                  </figure>
                );
              })}
            </div>
          </section>
        )}

        {/* Footer nav */}
        <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <Link
            to="/projects"
            className="text-sm font-mono text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
          >
            {getLoc(lang, '← All projects', '← Semua proyek', '← 所有项目', '← すべてのプロジェクト', '← 모든 프로젝트')}
          </Link>
          <Link
            to="/"
            className="text-sm font-mono text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
          >
            {getLoc(lang, 'Home →', 'Beranda →', '首页 →', 'ホーム →', '홈 →')}
          </Link>
        </div>

      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && project.gallery[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button 
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <div className="max-w-[90vw] max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img 
              key={project.gallery[lightboxIndex]}
              src={project.gallery[lightboxIndex]} 
              alt={`${project.title} preview ${lightboxIndex + 1}`}
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
              onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="hidden h-[60vh] w-[80vw] max-w-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl items-center justify-center flex-col gap-4 text-center p-8">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-600"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                <span className="text-sm font-mono text-zinc-400">{getLoc(lang, 'Image unavailable', 'Gambar tidak tersedia', '图片不可用', '画像を利用できません', '이미지를 사용할 수 없습니다')}</span>
            </div>
            <div className="mt-4 text-center">
              <p className="text-white text-lg font-semibold">{project.title}</p>
              <p className="text-zinc-400 text-sm font-mono">{lightboxIndex + 1} / {project.gallery.length} — {getLoc(lang, 'Preview', 'Pratinjau', '预览', 'プレビュー', '미리보기')}</p>
            </div>
          </div>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      )}
    </main>
  );
}
