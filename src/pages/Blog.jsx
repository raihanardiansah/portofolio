import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioData, useLanguage, getLoc } from '../store';

export default function Blog() {
  const data = usePortfolioData();
  const lang = useLanguage();

  // FIX #25: Dynamic title from profile name
  useEffect(() => {
    document.title = `Blog | ${data.profile.name || 'Portfolio'}`;
  }, [data.profile.name]);

  const blogs = data.blogs || [];
  const publishedBlogs = blogs.filter(b => !b.draft).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-[760px] mx-auto px-5 py-8 sm:py-14">
        <Link to="/" className="inline-block text-xs font-mono text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors mb-10 no-underline">
          {getLoc(lang, '← Back', '← Kembali', '← 返回', '← 戻る', '← 뒤로가기')}
        </Link>
        <header className="mb-10">
          <h1 className="text-4xl font-mono font-bold text-zinc-900 dark:text-white">Blog.</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 font-mono">
            {getLoc(lang, 'Writings, thoughts, and notes.', 'Tulisan, pemikiran, dan catatan saya.', '文章、思考和笔记。', '文章、思考、そしてメモ。', '글, 생각, 그리고 메모.')}
          </p>
        </header>

        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
          <span className="text-xs font-mono text-zinc-500">{publishedBlogs.length} {getLoc(lang, 'posts', 'artikel', '篇文章', '記事', '게시물')}</span>
        </div>

        {publishedBlogs.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 dark:text-zinc-400 font-mono text-sm">
            {getLoc(lang, 'No posts yet.', 'Belum ada tulisan.', '暂无文章。', 'まだ記事はありません。', '아직 게시물이 없습니다.')}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {publishedBlogs.map(b => (
              <article key={b.slug} className="group border-b border-zinc-200/50 dark:border-zinc-800/50 pb-6 last:border-0">
                <Link to={`/blog/${b.slug}`} className="block h-full no-underline group">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    {getLoc(lang, b.title, b.title_id, b.title_zh, b.title_ja, b.title_ko)}
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono mt-1 mb-2">
                    <time dateTime={b.date}>{new Date(b.date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : lang === 'ko' ? 'ko-KR' : lang === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3 mb-4">{getLoc(lang, b.excerpt, b.excerpt_id, b.excerpt_zh, b.excerpt_ja, b.excerpt_ko)}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[11px] font-mono text-black dark:text-white group-hover:underline underline-offset-4">{getLoc(lang, 'Read more →', 'Baca selengkapnya →', '阅读更多 →', '続きを読む →', '더 읽기 →')}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
