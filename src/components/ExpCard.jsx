import { useState } from 'react';
import { getLoc } from '../store';

// ── ExpCard ──────────────────────────────────────────────────────
export default function ExpCard({ title, role, role_id, role_zh, role_ja, role_ko, period, description, description_id, description_zh, description_ja, description_ko, points, points_id, points_zh, points_ja, points_ko, tags, logo, t, lang }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="relative pl-6 sm:pl-8 py-3 group">
      {/* Timeline line & dot */}
      <div className="absolute left-[7px] sm:left-[11px] top-10 bottom-[-12px] w-[2px] bg-zinc-200 dark:bg-zinc-800 group-last:hidden"></div>
      <div className="absolute left-[3px] sm:left-[7px] top-[30px] w-[10px] h-[10px] rounded-full bg-zinc-300 dark:bg-zinc-600 outline outline-4 outline-[var(--bg)] transition-colors group-hover:bg-zinc-500 dark:group-hover:bg-zinc-400"></div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-3 text-left hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-all duration-300 rounded-xl p-2.5 -ml-2.5 cursor-pointer bg-transparent border-0 group-hover:translate-x-1"
      >
        <span className="flex items-start gap-3.5 min-w-0">
          <svg className={`w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 transition-transform duration-300 shrink-0 mt-1.5 ${open ? 'rotate-90 text-zinc-600 dark:text-zinc-200' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
          
          {logo ? (
            logo.startsWith('http') ? (
              <img src={logo} alt={`${title} logo`} className="w-10 h-10 rounded-md object-cover border border-zinc-200/50 dark:border-zinc-700/50 bg-[var(--surface)] shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-md flex items-center justify-center font-mono text-[13px] font-bold border border-zinc-200/50 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white shrink-0">
                {logo}
              </div>
            )
          ) : (
            <div className="w-10 h-10 rounded-md flex items-center justify-center border border-zinc-200/50 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
          )}
          <span>
            <span className="block text-sm font-bold text-zinc-800 dark:text-zinc-100">{title}</span>
            <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{getLoc(lang, role, role_id, role_zh, role_ja, role_ko)}</span>
          </span>
        </span>
        <span className="text-right shrink-0">
          <span className="block text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">{period}</span>
          <span className="block text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 transition-opacity">{open ? t.hideDetail : t.viewDetail}</span>
        </span>
      </button>
      
      {/* CSS Grid Smooth Accordion */}
      <div 
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="pt-3 pb-1 pl-9 sm:pl-11">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">{getLoc(lang, description, description_id, description_zh, description_ja, description_ko)}</p>
            <ul className="space-y-1.5 mb-3.5">
              {(getLoc(lang, points, points_id, points_zh, points_ja, points_ko) || []).map((p, i) => (
                <li key={i} className="flex items-baseline gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="text-zinc-300 dark:text-zinc-600 shrink-0 leading-none">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {(tags || []).map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded text-zinc-600 dark:text-zinc-400 font-mono transition-colors hover:border-zinc-300 dark:hover:border-zinc-500">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
