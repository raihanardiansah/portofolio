import { useState, useRef, useEffect } from 'react';

// ── Section (Accordion) ─────────────────────────────────────────
export default function Section({ id, label, children, startOpen = false, t }) {
  const [open, setOpen] = useState(startOpen);
  const [maxH, setMaxH] = useState('0px');
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const update = () => {
      setMaxH(open ? (el.scrollHeight + 24) + 'px' : '0px');
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  return (
    <section
      id={id}
      className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 overflow-hidden shadow-sm shadow-zinc-200/30 dark:shadow-black/10"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`${id}-content`}
        className="w-full flex items-center gap-2 px-4 py-4 border-b border-zinc-200/80 dark:border-zinc-800 text-left hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer bg-transparent"
      >
        <span
          className="text-xs text-zinc-500 dark:text-zinc-400 font-mono transition-transform duration-300"
          style={{ transform: open ? 'rotate(90deg)' : 'none', display: 'inline-block' }}
          aria-hidden="true"
        >▶</span>
        <span className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-zinc-500 dark:text-zinc-400">{label}</span>
        <span className="ml-auto text-[10px] font-mono text-zinc-500 dark:text-zinc-400">{open ? t.collapse : t.expand}</span>
      </button>
      <div
        id={`${id}-content`}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: maxH, opacity: open ? 1 : 0 }}
      >
        <div ref={contentRef} className="px-4 pt-3 pb-4">{children}</div>
      </div>
    </section>
  );
}
