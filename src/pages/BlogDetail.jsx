import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePortfolioData, useLanguage, getLoc } from '../store';
import { Share2 } from 'lucide-react';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = usePortfolioData();
  const lang = useLanguage();
  const [copied, setCopied] = useState(false);

  const blog = (data.blogs || []).find(item => item.slug === slug && !item.draft);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: blog.title, url }); }
      catch (err) { /* user canceled */ }
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (!blog) { navigate('/blog', { replace: true }); return; }
  }, [blog, navigate]);

  if (!blog) return null;

  // FIX #6: Sanitize HTML content before rendering to prevent XSS
  const safeContent = DOMPurify.sanitize(
    getLoc(lang, blog.content, blog.content_id, blog.content_zh, blog.content_ja, blog.content_ko) || ''
  );
  
  // Syntax Highlighting
  useEffect(() => {
    if (safeContent) {
      document.querySelectorAll('pre').forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [safeContent]);

  const title = `${getLoc(lang, blog.title, blog.title_id, blog.title_zh, blog.title_ja, blog.title_ko)} | ${data.profile.name || 'Portfolio'}`;
  const excerpt = getLoc(lang, blog.excerpt, blog.excerpt_id, blog.excerpt_zh, blog.excerpt_ja, blog.excerpt_ko);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const ogImage = blog.coverImage || '/og-image.svg';

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <div className="max-w-[768px] mx-auto px-5 py-8 sm:py-14">
        <Link to="/blog" className="inline-block text-xs font-mono text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors mb-10 no-underline">
          {getLoc(lang, '← Back to blog', '← Kembali ke blog', '← 返回博客', '← ブログに戻る', '← 블로그로 돌아가기')}
        </Link>
        
        {blog.coverImage && (
          <img 
            src={blog.coverImage} 
            alt={blog.title} 
            className="w-full h-48 sm:h-80 object-cover rounded-xl sm:rounded-2xl mb-8 border border-zinc-200/80 dark:border-zinc-700/50" 
          />
        )}

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight mb-4">
            {getLoc(lang, blog.title, blog.title_id, blog.title_zh, blog.title_ja, blog.title_ko)}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
            <time dateTime={blog.date}>{new Date(blog.date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : lang === 'ko' ? 'ko-KR' : lang === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            {blog.tags && blog.tags.length > 0 && (
              <>
                <span>·</span>
                <span>{blog.tags.join(', ')}</span>
              </>
            )}
            <span>·</span>
            <button 
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              title="Share this post"
              aria-label="Share this blog post"
            >
              <Share2 size={14} />
              {copied ? getLoc(lang, 'Copied!', 'Tersalin!', '已复制!', 'コピーしました!', '복사됨!') : getLoc(lang, 'Share', 'Bagikan', '分享', '共有する', '공유하기')}
            </button>
          </div>
        </header>

        {/* FIX #6: safeContent is DOMPurify sanitized */}
        <article 
          className="prose prose-zinc dark:prose-invert prose-sm sm:prose-base max-w-none text-zinc-700 dark:text-zinc-300 break-words"
          dangerouslySetInnerHTML={{ __html: safeContent }}
        />

        <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <Link to="/blog" className="text-sm font-mono text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
            {getLoc(lang, '← All posts', '← Semua tulisan', '← 所有文章', '← すべての記事', '← 모든 게시물')}
          </Link>
          <Link to="/" className="text-sm font-mono text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
            {getLoc(lang, 'Home →', 'Beranda →', '首页 →', 'ホーム →', '홈 →')}
          </Link>
        </div>
      </div>
    </main>
  );
}
