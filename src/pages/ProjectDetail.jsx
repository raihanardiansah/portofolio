import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePortfolioData, useLanguage } from '../store';

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
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-black dark:text-white transition-colors mb-10 no-underline"
        >
          {lang === 'id' ? '← Kembali ke proyek' : lang === 'zh' ? '← 返回项目' : '← Back to projects'}
        </Link>

        {/* Header */}
        <header className="mb-10">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-black dark:text-white mb-3">{lang === 'id' ? 'Detail proyek' : lang === 'zh' ? '项目详情' : 'Project detail'}</p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-tight">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            {lang === 'zh' && project.overview_zh ? project.overview_zh : lang === 'id' && project.overview_id ? project.overview_id : project.overview}
          </p>
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
          <section aria-labelledby="gallery-title" className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 id="gallery-title" className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{lang === 'id' ? 'Galeri' : lang === 'zh' ? '画廊' : 'Gallery'}</h2>
              <span className="text-[11px] font-mono text-zinc-400">{project.gallery.length} {lang === 'id' ? 'pratinjau' : lang === 'zh' ? '张预览' : (project.gallery.length > 1 ? 'previews' : 'preview')}</span>
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
                  <figcaption className="px-3 py-2 text-[11px] font-mono text-zinc-400">
                    {lang === 'id' ? 'Pratinjau' : lang === 'zh' ? '预览' : 'Preview'} {String(index + 1).padStart(2, '0')}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Meta + CTA */}
        <section className={`grid gap-5 border-t border-zinc-200 dark:border-zinc-800 pt-6 items-start ${project.liveUrl ? 'sm:grid-cols-[1fr_auto]' : ''}`}>
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-mono mb-2">{lang === 'id' ? 'Peran saya' : lang === 'zh' ? '我的角色' : 'My role'}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{lang === 'zh' && project.role_zh ? project.role_zh : lang === 'id' && project.role_id ? project.role_id : project.role}</p>
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
        <div className="mt-12 pt-6 border-t border-zinc-200/60 dark:border-zinc-700/50 flex items-center justify-between">
          <Link
            to="/projects"
            className="text-xs font-mono text-zinc-400 hover:text-black dark:text-white transition-colors no-underline"
          >
            {lang === 'id' ? '← Semua proyek' : lang === 'zh' ? '← 所有项目' : '← All projects'}
          </Link>
          <Link
            to="/"
            className="text-xs font-mono text-zinc-400 hover:text-black dark:text-white transition-colors no-underline"
          >
            {lang === 'id' ? 'Beranda →' : lang === 'zh' ? '首页 →' : 'Home →'}
          </Link>
        </div>

      </div>
    </main>
  );
}
