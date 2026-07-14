import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '../../data';

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = projects.find(item => item.slug === params.slug);
  return project ? { title: `${project.title} | Raihan`, description: project.overview } : { title: 'Project not found | Raihan' };
}

export default function ProjectDetail({ params }) {
  const project = projects.find(item => item.slug === params.slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-[760px] mx-auto px-5 py-8 sm:py-14">
        <Link href="/#proj" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-blue-500 transition-colors mb-10">← Back to projects</Link>
        <header className="mb-10">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-500 mb-3">Project detail</p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white">{project.title}</h1>
          <p className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-500 dark:text-zinc-400">{project.overview}</p>
          <div className="flex flex-wrap gap-2 mt-5">{project.tags.map(tag => <span key={tag} className="px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">{tag}</span>)}</div>
        </header>

        <section aria-labelledby="gallery-title" className="mb-12">
          <div className="flex items-center justify-between mb-4"><h2 id="gallery-title" className="text-sm font-semibold">Gallery</h2><span className="text-[11px] font-mono text-zinc-400">{project.gallery.length} previews</span></div>
          <div className="grid gap-4 sm:grid-cols-2">{project.gallery.map((image, index) => <figure key={image} className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[var(--surface)]"><img src={image} alt={`${project.title} preview ${index + 1}`} className="w-full h-auto block" /><figcaption className="px-3 py-2 text-[11px] font-mono text-zinc-400">Preview {String(index + 1).padStart(2, '0')}</figcaption></figure>)}</div>
        </section>

        <section className="grid gap-5 sm:grid-cols-[1fr_auto] border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <div><p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-mono mb-2">My role</p><p className="text-sm text-zinc-600 dark:text-zinc-300">{project.role}</p></div>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-fit rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-mono font-semibold text-white hover:bg-blue-700 transition-colors">Open live project ↗</a>}
        </section>
      </div>
    </main>
  );
}
