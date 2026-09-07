import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioData, useLanguage, getLoc } from '../store';

export default function Gallery() {
  const data = usePortfolioData();
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const lang = useLanguage();

  // FIX #25: Dynamic title from profile name
  useEffect(() => {
    document.title = `Gallery | ${data.profile.name || 'Portfolio'}`;
  }, [data.profile.name]);

  const projectsWithGallery = (data.projects || []).filter(p => p.gallery && p.gallery.length > 0);
  const standaloneGallery = data.gallery || [];

  const allImagesUnshuffled = useMemo(() => [
    ...projectsWithGallery.flatMap(p => 
      p.gallery.map(src => ({ src, caption: p.title, project: p.title }))
    ),
    ...standaloneGallery.map(g => ({ src: g.src, caption: g.caption, alt: g.alt, project: 'Standalone' }))
  ], [data.projects, data.gallery]);

  const allImagesShuffled = useMemo(() => {
    const images = [...allImagesUnshuffled];
    // Fisher-Yates shuffle
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }
    return images;
  }, [allImagesUnshuffled]);

  const categories = ['All', ...projectsWithGallery.map(p => p.title), ...(standaloneGallery.length > 0 ? ['Standalone'] : [])];

  const filteredImages = filter === 'All' 
    ? allImagesShuffled 
    : allImagesUnshuffled.filter(img => img.project === filter);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = useCallback(() => {
    setLightboxIndex(prev => (prev === null ? null : (prev + 1) % filteredImages.length));
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex(prev => (prev === null ? null : (prev - 1 + filteredImages.length) % filteredImages.length));
  }, [filteredImages.length]);

  // Clamp or reset lightboxIndex if filteredImages shrinks
  useEffect(() => {
    setLightboxIndex(prev => {
      if (prev === null) return null;
      if (filteredImages.length === 0) return null;
      return prev >= filteredImages.length ? filteredImages.length - 1 : prev;
    });
  }, [filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  const [visibleCount, setVisibleCount] = useState(9);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFilterChange = (cat) => {
    if (cat === filter) return;
    setIsAnimating(true);
    setTimeout(() => {
      setFilter(cat);
      setLightboxIndex(null);
      setVisibleCount(9);
      setIsAnimating(false);
    }, 200);
  };

  useEffect(() => {
    if (visibleCount >= filteredImages.length) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => Math.min(prev + 6, filteredImages.length));
      }
    }, { threshold: 0.1 });
    const sentinel = document.getElementById('scroll-sentinel');
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, filteredImages.length]);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-[1024px] mx-auto px-5 py-8 sm:py-14">
        <Link to="/" className="inline-block text-xs font-mono text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors mb-10 no-underline">
          {getLoc(lang, '← Back', '← Kembali', '← 返回', '← 戻る', '← 뒤로가기')}
        </Link>
        <header className="mb-10">
          <h1 className="text-4xl font-mono font-bold text-zinc-900 dark:text-white">{getLoc(lang, 'Gallery.', 'Galeri.', '画廊.', 'ギャラリー.', '갤러리.')}</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 font-mono">
            {getLoc(lang, 'Visuals from my projects and environment.', 'Gambar-gambar dari proyek dan lingkungan saya.', '来自我的项目和环境的图像。', 'プロジェクトや環境のビジュアル。', '프로젝트와 환경의 시각 자료입니다.')}
          </p>
        </header>

        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
          <span className="text-xs font-mono text-zinc-500">{filteredImages.length} {getLoc(lang, 'images', 'gambar', '张图片', '枚の画像', '개의 이미지')}</span>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-2 mb-6 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-mono border transition-colors cursor-pointer ${
                filter === cat 
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' 
                  : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-black dark:hover:border-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredImages.length === 0 ? (
           <div className="text-center py-20 text-zinc-500 dark:text-zinc-400 font-mono text-sm">
             {getLoc(lang, 'No images found.', 'Tidak ada gambar yang ditemukan.', '未找到图片。', '画像が見つかりません。', '이미지를 찾을 수 없습니다.')}
           </div>
        ) : (
          <div className={`transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
              {filteredImages.slice(0, visibleCount).map((img, i) => (
                <div 
                  key={`${img.src}-${i}`} 
                  onClick={() => openLightbox(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${img.caption} image ${i + 1}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(i); }}
                  className="rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-700/50 relative group cursor-pointer bg-zinc-100 dark:bg-zinc-800 break-inside-avoid"
                >
                  <img 
                    src={img.src} 
                    alt={img.alt || img.caption}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 items-center justify-center p-4 text-center">
                      <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{img.project}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <div>
                      <p className="text-white text-sm font-semibold">{img.caption}</p>
                      <p className="text-zinc-300 text-xs font-mono">
                        {img.project === 'Standalone' 
                          ? getLoc(lang, 'Standalone', 'Mandiri', '独立', 'スタンドアロン', '독립')
                          : getLoc(lang, 'Project', 'Proyek', '项目', 'プロジェクト', '프로젝트')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {visibleCount < filteredImages.length && (
              <div id="scroll-sentinel" className="h-10 mt-4 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-600 border-t-zinc-800 dark:border-t-zinc-200 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* FIX #28: aria-label on lightbox close/prev/next buttons */}
          <button 
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <div className="max-w-[90vw] max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img 
              key={filteredImages[lightboxIndex].src}
              src={filteredImages[lightboxIndex].src} 
              alt={filteredImages[lightboxIndex].alt || filteredImages[lightboxIndex].caption}
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
              onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.nextElementSibling.style.display = 'flex';
              }}
            />
             <div className="hidden h-[60vh] w-[80vw] max-w-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl items-center justify-center flex-col gap-4 text-center p-8">
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-600"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                 <span className="text-sm font-mono text-zinc-400">{getLoc(lang, 'Image unavailable', 'Gambar tidak tersedia', '图片不可用', '画像を利用できません', '이미지를 사용할 수 없습니다')}</span>
             </div>
            <div className="mt-4 text-center">
              <p className="text-white text-lg font-semibold">{filteredImages[lightboxIndex].caption}</p>
              <p className="text-zinc-400 text-sm font-mono">{lightboxIndex + 1} / {filteredImages.length} — {filteredImages[lightboxIndex].project}</p>
            </div>
          </div>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      )}
    </main>
  );
}