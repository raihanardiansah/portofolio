import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioData, useLanguage } from '../store';

export default function Gallery() {
  const data = usePortfolioData();
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const lang = useLanguage();

  useEffect(() => {
    document.title = 'Gallery | Raihan';
  }, []);

  const projectsWithGallery = (data.projects || []).filter(p => p.gallery && p.gallery.length > 0);
  const standaloneGallery = data.gallery || [];

  const allImages = [
    ...projectsWithGallery.flatMap(p => 
      p.gallery.map(src => ({ src, caption: p.title, project: p.title }))
    ),
    ...standaloneGallery.map(g => ({ src: g.src, caption: g.caption, alt: g.alt, project: 'Standalone' }))
  ];

  const categories = ['All', ...projectsWithGallery.map(p => p.title), ...(standaloneGallery.length > 0 ? ['Standalone'] : [])];

  const filteredImages = filter === 'All' 
    ? allImages 
    : allImages.filter(img => img.project === filter);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = useCallback(() => {
    setLightboxIndex(prev => (prev === null ? null : (prev + 1) % filteredImages.length));
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex(prev => (prev === null ? null : (prev - 1 + filteredImages.length) % filteredImages.length));
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

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-[1024px] mx-auto px-5 py-8 sm:py-14">
        <Link to="/" className="inline-block text-xs font-mono text-zinc-500 hover:text-black dark:text-white transition-colors mb-10 no-underline">
          {lang === 'id' ? '← Kembali' : lang === 'zh' ? '← 返回' : '← Back'}
        </Link>
        <header className="mb-10">
          <h1 className="text-4xl font-mono font-bold text-zinc-900 dark:text-white">{lang === 'id' ? 'Galeri.' : lang === 'zh' ? '画廊.' : 'Gallery.'}</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 font-mono">
            {lang === 'id' ? 'Gambar-gambar dari proyek dan lingkungan saya.' : lang === 'zh' ? '来自我的项目和环境的图像。' : 'Visuals from my projects and environment.'}
          </p>
        </header>

        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
          <span className="text-xs font-mono text-zinc-500">{allImages.length} {lang === 'id' ? 'gambar' : lang === 'zh' ? '张图片' : 'images'}</span>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-2 mb-6 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setLightboxIndex(null); }}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-mono border transition-colors cursor-pointer ${
                filter === cat 
                  ? 'bg-black dark:bg-white text-white dark:text-black text-white border-black dark:border-white' 
                  : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-black dark:border-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredImages.length === 0 ? (
           <div className="text-center py-20 text-zinc-500 dark:text-zinc-400 font-mono text-sm">
             {lang === 'id' ? 'Tidak ada gambar yang ditemukan.' : lang === 'zh' ? '未找到图片。' : 'No images found.'}
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredImages.map((img, i) => (
              <div 
                key={`${img.src}-${i}`} 
                onClick={() => openLightbox(i)}
                className="rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-700/50 relative group cursor-pointer aspect-video bg-zinc-100 dark:bg-zinc-800"
              >
                <img 
                  src={img.src} 
                  alt={img.alt || img.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                    <p className="text-zinc-300 text-xs font-mono">{img.project}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            onClick={closeLightbox}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <div className="max-w-[90vw] max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img 
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
                 <span className="text-sm font-mono text-zinc-400">{lang === 'id' ? 'Gambar tidak tersedia' : lang === 'zh' ? '图片不可用' : 'Image unavailable'}</span>
             </div>
            <div className="mt-4 text-center">
              <p className="text-white text-lg font-semibold">{filteredImages[lightboxIndex].caption}</p>
              <p className="text-zinc-400 text-sm font-mono">{filteredImages[lightboxIndex].project}</p>
            </div>
          </div>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      )}
    </main>
  );
}