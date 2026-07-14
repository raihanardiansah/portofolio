import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioData, useLanguage } from '../store';

export default function Projects() {
  const data = usePortfolioData();
  const [filter, setFilter] = useState('All');
  const lang = useLanguage();

  useEffect(() => {
    document.title = 'All Projects | Raihan';
  }, []);

  const projects = data.projects || [];
  const allTags = ['All', ...new Set(projects.flatMap(p => p.tags))];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.tags.includes(filter));

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-[760px] mx-auto px-5 py-8 sm:py-14">
        <Link to="/" className="inline-block text-xs font-mono text-zinc-500 hover:text-black dark:text-white transition-colors mb-10 no-underline">
          {lang === 'id' ? '← Kembali' : lang === 'zh' ? '← 返回' : '← Back'}
        </Link>
        <header className="mb-10">
          <h1 className="text-4xl font-mono font-bold text-zinc-900 dark:text-white">{lang === 'id' ? 'Proyek.' : lang === 'zh' ? '项目.' : 'Projects.'}</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 font-mono">
            {lang === 'id' ? 'Kumpulan karya yang telah saya buat.' : lang === 'zh' ? '我创建的作品集合。' : "A collection of things I've built."}
          </p>
        </header>

        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
          <span className="text-xs font-mono text-zinc-500">{projects.length} {lang === 'id' ? 'proyek' : lang === 'zh' ? '个项目' : 'projects'}</span>
          <span className="text-xs font-mono text-zinc-500">{allTags.length - 1} {lang === 'id' ? 'tag unik' : lang === 'zh' ? '个标签' : 'unique tags'}</span>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-2 mb-6 scrollbar-hide">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-mono border transition-colors cursor-pointer ${
                filter === tag 
                  ? 'bg-black dark:bg-white text-white dark:text-black text-white border-black dark:border-white' 
                  : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-black dark:border-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 dark:text-zinc-400 font-mono text-sm">
            {lang === 'id' ? `Tidak ada proyek untuk tag "${filter}".` : lang === 'zh' ? `未找到标签为"${filter}"的项目。` : `No projects found for "${filter}".`}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredProjects.map(p => (
              <div key={p.slug} className="flex flex-col rounded-2xl border border-zinc-200/80 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/50 p-5 hover:border-black dark:border-white/40 hover:shadow-xl hover:scale-[1.01] transition-all duration-200">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-2">{p.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">{lang === 'zh' && p.desc_zh ? p.desc_zh : lang === 'id' && p.desc_id ? p.desc_id : p.desc}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.tags.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-500 dark:text-zinc-400 font-mono">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-700/50 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-zinc-400 font-mono">{lang === 'zh' && p.role_zh ? p.role_zh : lang === 'id' && p.role_id ? p.role_id : p.role}</span>
                  <div className="flex items-center gap-2">
                    <Link to={`/projects/${p.slug}`} className="text-[11px] font-mono text-black dark:text-white hover:text-black dark:text-white">{lang === 'id' ? 'Lihat detail →' : lang === 'zh' ? '查看详情 →' : 'View detail →'}</Link>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">Live ↗</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="mt-20 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <Link to="/admin" className="text-[10px] font-mono text-zinc-300 dark:text-zinc-700 hover:text-zinc-500 transition-colors">Admin</Link>
        </footer>
      </div>
    </main>
  );
}
