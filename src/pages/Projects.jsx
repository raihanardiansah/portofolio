import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioData, useLanguage, getLoc } from '../store';

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
          {getLoc(lang, '← Back', '← Kembali', '← 返回', '← 戻る', '← 뒤로가기')}
        </Link>
        <header className="mb-10">
          <h1 className="text-4xl font-mono font-bold text-zinc-900 dark:text-white">{getLoc(lang, 'Projects.', 'Proyek.', '项目.', 'プロジェクト.', '프로젝트.')}</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 font-mono">
            {getLoc(lang, "A collection of things I've built.", 'Kumpulan karya yang telah saya buat.', '我创建的作品集合。', '私が構築した作品のコレクション。', '제가 만든 작업물 모음입니다.')}
          </p>
        </header>

        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
          <span className="text-xs font-mono text-zinc-500">{projects.length} {getLoc(lang, 'projects', 'proyek', '个项目', 'プロジェクト', '프로젝트')}</span>
          <span className="text-xs font-mono text-zinc-500">{allTags.length - 1} {getLoc(lang, 'unique tags', 'tag unik', '个标签', 'ユニークなタグ', '고유 태그')}</span>
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
            {getLoc(lang, `No projects found for "${filter}".`, `Tidak ada proyek untuk tag "${filter}".`, `未找到标签为"${filter}"的项目。`, `"${filter}" のプロジェクトは見つかりません。`, `"${filter}" 태그에 대한 프로젝트가 없습니다.`)}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredProjects.map(p => (
              <div key={p.slug} className="flex flex-col rounded-2xl border border-zinc-200/80 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/50 p-5 hover:border-black dark:border-white/40 hover:shadow-xl hover:scale-[1.01] transition-all duration-200">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-2">{p.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">{getLoc(lang, p.desc, p.desc_id, p.desc_zh, p.desc_ja, p.desc_ko)}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.tags.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-500 dark:text-zinc-400 font-mono">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-700/50 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-zinc-400 font-mono">{getLoc(lang, p.role, p.role_id, p.role_zh, p.role_ja, p.role_ko)}</span>
                  <div className="flex items-center gap-2">
                    <Link to={`/projects/${p.slug}`} className="text-[11px] font-mono text-black dark:text-white hover:text-black dark:text-white">{getLoc(lang, 'View detail →', 'Lihat detail →', '查看详情 →', '詳細を見る →', '세부 정보 보기 →')}</Link>
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1 text-[11px] font-mono px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
                        Code
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-[11px] font-mono px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">Live ↗</a>
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
