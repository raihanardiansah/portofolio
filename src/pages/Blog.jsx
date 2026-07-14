import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioData, useLanguage } from '../store';

export default function Blog() {
  const data = usePortfolioData();
  const lang = useLanguage();

  useEffect(() => {
    document.title = 'Blog | Raihan';
  }, []);

  const blogs = data.blogs || [];
  const publishedBlogs = blogs.filter(b => !b.draft).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-[760px] mx-auto px-5 py-8 sm:py-14">
        <Link to="/" className="inline-block text-xs font-mono text-zinc-500 hover:text-black dark:text-white transition-colors mb-10 no-underline">
          {lang === 'id' ? '← Kembali' : lang === 'zh' ? '← 返回' : '← Back'}
        </Link>
        <header className="mb-10">
          <h1 className="text-4xl font-mono font-bold text-zinc-900 dark:text-white">Blog.</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 font-mono">
            {lang === 'id' ? 'Tulisan, pemikiran, dan catatan saya.' : lang === 'zh' ? '文章、思考和笔记。' : 'Writings, thoughts, and notes.'}
          </p>
        </header>

        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
          <span className="text-xs font-mono text-zinc-500">{publishedBlogs.length} {lang === 'id' ? 'artikel' : lang === 'zh' ? '篇文章' : 'posts'}</span>
        </div>

        {publishedBlogs.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 dark:text-zinc-400 font-mono text-sm">
            {lang === 'id' ? 'Belum ada tulisan.' : lang === 'zh' ? '暂无文章。' : 'No posts yet.'}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {publishedBlogs.map(b => (
              <article key={b.slug} className="group border-b border-zinc-200/50 dark:border-zinc-800/50 pb-6 last:border-0">
                <Link to={`/blog/${b.slug}`} className="block no-underline">
                  <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">{lang === 'zh' && b.title_zh ? b.title_zh : lang === 'id' && b.title_id ? b.title_id : b.title}</h2>
                  <p className="text-xs text-zinc-400 font-mono mt-1 mb-2">{new Date(b.date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : lang === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {lang === 'zh' && b.excerpt_zh ? b.excerpt_zh : lang === 'id' && b.excerpt_id ? b.excerpt_id : b.excerpt}
                  </p>
                  <span className="text-xs font-mono text-zinc-400 mt-3 inline-block group-hover:text-black dark:group-hover:text-white transition-colors">
                    {lang === 'id' ? 'Baca selengkapnya →' : lang === 'zh' ? '阅读更多 →' : 'Read more →'}
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
