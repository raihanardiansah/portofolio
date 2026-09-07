import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioData, useLanguage, getLoc } from '../store';

export default function Blog() {
  const data = usePortfolioData();
  const lang = useLanguage();
  const [selectedTag, setSelectedTag] = useState('All');

  // FIX #25: Dynamic title from profile name
  useEffect(() => {
    document.title = `Blog | ${data.profile.name || 'Portfolio'}`;
  }, [data.profile.name]);

  const blogs = data.blogs || [];
  const publishedBlogs = blogs.filter(b => !b.draft).sort((a, b) => new Date(b.date) - new Date(a.date));

  const allTags = useMemo(() => {
    const tags = new Set();
    publishedBlogs.forEach(b => (b.tags || []).forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags).sort()];
  }, [publishedBlogs]);

  const filteredBlogs = selectedTag === 'All' 
    ? publishedBlogs 
    : publishedBlogs.filter(b => (b.tags || []).includes(selectedTag));

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

        <div className="flex overflow-x-auto gap-2 pb-2 mb-6 scrollbar-hide">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-mono border transition-colors cursor-pointer ${
                selectedTag === tag 
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' 
                  : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-black dark:hover:border-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
          <span className="text-xs font-mono text-zinc-500">{filteredBlogs.length} {getLoc(lang, 'posts', 'artikel', '篇文章', '記事', '게시물')}</span>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 dark:text-zinc-400 font-mono text-sm">
            {getLoc(lang, 'No posts found.', 'Belum ada tulisan yang cocok.', '未找到文章。', '記事が見つかりません。', '게시물을 찾을 수 없습니다.')}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {filteredBlogs.map(b => (
              <article key={b.slug} className="group pb-8 border-b border-zinc-200/50 dark:border-zinc-800/50 last:border-0">
                <Link to={`/blog/${b.slug}`} className="block h-full no-underline group">
                  {b.coverImage && (
                    <div className="w-full h-48 sm:h-64 overflow-hidden rounded-xl mb-5 border border-zinc-200/80 dark:border-zinc-700/50">
                      <img 
                        src={b.coverImage} 
                        alt={b.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                        loading="lazy" 
                      />
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    {getLoc(lang, b.title, b.title_id, b.title_zh, b.title_ja, b.title_ko)}
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono mt-1 mb-3">
                    <time dateTime={b.date}>{new Date(b.date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : lang === 'ko' ? 'ko-KR' : lang === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3 mb-4">{getLoc(lang, b.excerpt, b.excerpt_id, b.excerpt_zh, b.excerpt_ja, b.excerpt_ko)}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[11px] font-mono text-black dark:text-white group-hover:underline underline-offset-4">{getLoc(lang, 'Read more →', 'Baca selengkapnya →', '阅读更多 →', '続きを読む →', '더 읽기 →')}</span>
                    {b.tags && b.tags.length > 0 && (
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 px-2 py-0.5 rounded">
                        {b.tags[0]}
                      </span>
                    )}
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
