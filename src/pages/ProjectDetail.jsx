import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePortfolioData, useLanguage, getLoc } from '../store';
import { Share2 } from 'lucide-react';

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
  const dark = useDark();
  const data = usePortfolioData();
  const lang = useLanguage();
  const [copied, setCopied] = useState(false);

  const project = data.projects.find(item => item.slug === slug);

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
    document.title = `${project.title} | Raihan`;
    return () => { document.title = 'Raihan | Web Developer & Tech Enthusiast'; };
  }, [project, navigate]);

  if (!project) return null;

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-[760px] mx-auto px-5 py-8 sm:py-14">

        {/* Back link */}
        <Link
          to="/projects"
          className="inline-block text-xs font-mono text-zinc-500 hover:text-black dark:text-white transition-colors mb-10 no-underline"
        >
          {getLoc(lang, '← Back to projects', '← Kembali ke proyek', '← 返回项目', '← プロジェクトに戻る', '← 프로젝트로 돌아가기')}
        </Link>

        {/* Header */}
        <header className="mb-12">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-black dark:text-white mb-3">{getLoc(lang, 'Project detail', 'Detail proyek', '项目详情', 'プロジェクト詳細', '프로젝트 세부 정보')}</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-tight">
            {project.title}
          </h1>
          <div 
            className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 leading-relaxed break-words"
            dangerouslySetInnerHTML={{ __html: getLoc(lang, project.overview, project.overview_id, project.overview_zh, project.overview_ja, project.overview_ko) }}
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
            >
              <Share2 size={12} />
              {copied ? getLoc(lang, 'Copied!', 'Tersalin!', '已复制!', 'コピーしました!', '복사됨!') : getLoc(lang, 'Share', 'Bagikan', '分享', '共有する', '공유하기')}
            </button>
          </div>
        </header>

        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <section aria-labelledby="gallery-title" className="mt-16">
            <div className="flex items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-6">
              <h2 id="gallery-title" className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{getLoc(lang, 'Gallery', 'Galeri', '画廊', 'ギャラリー', '갤러리')}</h2>
              <span className="text-[11px] font-mono text-zinc-400">{project.gallery.length} {getLoc(lang, project.gallery.length > 1 ? 'previews' : 'preview', 'pratinjau', '张预览', 'プレビュー', '미리보기')}</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((image, index) => (
                <figure
                  key={`${image}-${index}`}
                  className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[var(--surface)] m-0"
                >
                  <img
                    src={image}
                    alt={`${project.title} preview ${index + 1}`}
                    className="w-full h-auto block"
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div
                    className="hidden items-center justify-center h-32 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700"
                    style={{ display: 'none' }}
                  >
                    <span className="text-xs font-mono text-zinc-400">Image unavailable</span>
                  </div>
                  <div className="mt-3 flex justify-between items-center px-1">
                    <span className="text-xs font-mono text-zinc-500">
                      {getLoc(lang, 'Preview', 'Pratinjau', '预览', 'プレビュー', '미리보기')} {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </figure>
              ))}
            </div>
          </section>
        )}

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

        {/* Footer nav */}
        <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <Link
            to="/projects"
            className="text-sm font-mono text-zinc-500 hover:text-black dark:text-white transition-colors"
          >
            {getLoc(lang, '← All projects', '← Semua proyek', '← 所有项目', '← すべてのプロジェクト', '← 모든 프로젝트')}
          </Link>
          <Link
            to="/"
            className="text-sm font-mono text-zinc-500 hover:text-black dark:text-white transition-colors"
          >
            {getLoc(lang, 'Home →', 'Beranda →', '首页 →', 'ホーム →', '홈 →')}
          </Link>
        </div>

      </div>
    </main>
  );
}
