import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePortfolioData, useLanguage, getLoc } from '../store';
import { Share2 } from 'lucide-react';

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
    document.title = `${getLoc(lang, blog.title, blog.title_id, blog.title_zh, blog.title_ja, blog.title_ko)} | Raihan`;
    return () => { document.title = 'Raihan | Web Developer & Tech Enthusiast'; };
  }, [blog, lang, navigate]);

  if (!blog) return null;

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-[680px] mx-auto px-5 py-8 sm:py-14">
        <Link to="/blog" className="inline-block text-xs font-mono text-zinc-500 hover:text-black dark:text-white transition-colors mb-10 no-underline">
          {getLoc(lang, '← Back to blog', '← Kembali ke blog', '← 返回博客', '← ブログに戻る', '← 블로그로 돌아가기')}
        </Link>

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight mb-4">
            {getLoc(lang, blog.title, blog.title_id, blog.title_zh, blog.title_ja, blog.title_ko)}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
            <time>{new Date(blog.date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : lang === 'ko' ? 'ko-KR' : lang === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
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
            >
              <Share2 size={14} />
              {copied ? getLoc(lang, 'Copied!', 'Tersalin!', '已复制!', 'コピーしました!', '복사됨!') : getLoc(lang, 'Share', 'Bagikan', '分享', '共有する', '공유하기')}
            </button>
          </div>
        </header>

        <article 
          className="prose prose-zinc dark:prose-invert prose-sm sm:prose-base max-w-none text-zinc-700 dark:text-zinc-300 break-words"
          dangerouslySetInnerHTML={{ __html: getLoc(lang, blog.content, blog.content_id, blog.content_zh, blog.content_ja, blog.content_ko) }}
        />

        <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <Link to="/blog" className="text-sm font-mono text-zinc-500 hover:text-black dark:text-white transition-colors">
            {getLoc(lang, '← All posts', '← Semua tulisan', '← 所有文章', '← すべての記事', '← 모든 게시물')}
          </Link>
          <Link to="/" className="text-sm font-mono text-zinc-500 hover:text-black dark:text-white transition-colors">
            {getLoc(lang, 'Home →', 'Beranda →', '首页 →', 'ホーム →', '홈 →')}
          </Link>
        </div>
      </div>
    </main>
  );
}
