import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePortfolioData, useLanguage } from '../store';

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = usePortfolioData();
  const lang = useLanguage();

  const blog = (data.blogs || []).find(item => item.slug === slug);

  useEffect(() => {
    if (!blog) { navigate('/blog', { replace: true }); return; }
    document.title = `${lang === 'zh' && blog.title_zh ? blog.title_zh : lang === 'id' && blog.title_id ? blog.title_id : blog.title} | Raihan`;
    return () => { document.title = 'Raihan | Web Developer & Tech Enthusiast'; };
  }, [blog, lang, navigate]);

  if (!blog) return null;

  const content = lang === 'zh' && blog.content_zh ? blog.content_zh : lang === 'id' && blog.content_id ? blog.content_id : blog.content;
  const title = lang === 'zh' && blog.title_zh ? blog.title_zh : lang === 'id' && blog.title_id ? blog.title_id : blog.title;

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-[760px] mx-auto px-5 py-8 sm:py-14">
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-black dark:text-white transition-colors mb-10 no-underline">
          {lang === 'id' ? '← Kembali ke blog' : lang === 'zh' ? '← 返回博客' : '← Back to blog'}
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight mb-4">
            {title}
          </h1>
          <div className="flex items-center flex-wrap gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <time>{new Date(blog.date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : lang === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            {blog.tags && blog.tags.length > 0 && (
              <>
                <span>·</span>
                <span>{blog.tags.join(', ')}</span>
              </>
            )}
          </div>
        </header>

        <article className="prose prose-zinc dark:prose-invert prose-sm sm:prose-base max-w-none text-zinc-700 dark:text-zinc-300">
          {content.split('\n').map((paragraph, idx) => (
             paragraph.trim() ? <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p> : <br key={idx} />
          ))}
        </article>

        <div className="mt-16 pt-6 border-t border-zinc-200/60 dark:border-zinc-700/50 flex items-center justify-between">
          <Link to="/blog" className="text-xs font-mono text-zinc-400 hover:text-black dark:text-white transition-colors no-underline">
            {lang === 'id' ? '← Semua tulisan' : lang === 'zh' ? '← 所有文章' : '← All posts'}
          </Link>
          <Link to="/" className="text-xs font-mono text-zinc-400 hover:text-black dark:text-white transition-colors no-underline">
            {lang === 'id' ? 'Beranda →' : lang === 'zh' ? '首页 →' : 'Home →'}
          </Link>
        </div>
      </div>
    </main>
  );
}
