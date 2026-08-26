import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePortfolioData, useLanguage, getLoc } from '../store';

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

  const project = data.projects.find(item => item.slug === slug);

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
            className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: getLoc(lang, project.overview, project.overview_id, project.overview_zh, project.overview_ja, project.overview_ko) }}
          />
          <div className="flex flex-wrap gap-2 mt-5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 text-[11px] font-mono text-zinc-500 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
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
        <section className={`grid gap-5 border-t border-zinc-200 dark:border-zinc-800 pt-6 items-start ${project.liveUrl ? 'sm:grid-cols-[1fr_auto]' : ''}`}>
          <div className="md:w-1/3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-mono mb-2">{getLoc(lang, 'My role', 'Peran saya', '我的角色', '私の役割', '내 역할')}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{getLoc(lang, project.role, project.role_id, project.role_zh, project.role_ja, project.role_ko)}</p>
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-fit rounded-lg bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 text-xs font-mono font-semibold text-white hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors no-underline"
            >
              {project.liveLabel || 'Open live project'} ↗
            </a>
          )}
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
