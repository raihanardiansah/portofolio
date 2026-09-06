import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const wrapperRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsDesktop(true);
      document.body.classList.add('custom-cursor-enabled');
    }
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onMouseMove = (e) => {
      wrapper.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const onMouseOver = (e) => {
      const isClickable = e.target.closest('a, button, input, select, textarea, [role="button"]');
      setHovered(!!isClickable);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  const cx = 18;
  const cy = 18;
  const size = 36;

  // Normal: arms close to center
  // Hover: arms pushed outward slightly, circle appears in center
  const gap = hovered ? 5.5 : 3;
  const armLen = hovered ? 6 : 7;

  return (
    <div
      ref={wrapperRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ marginLeft: -cx, marginTop: -cy, overflow: 'visible' }}
        className="dark:text-white text-black"
      >
        {/* Top arm */}
        <line
          x1={cx} y1={cy - gap}
          x2={cx} y2={cy - gap - armLen}
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          style={{ transition: 'all 200ms cubic-bezier(0.34,1.56,0.64,1)' }}
        />
        {/* Bottom arm */}
        <line
          x1={cx} y1={cy + gap}
          x2={cx} y2={cy + gap + armLen}
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          style={{ transition: 'all 200ms cubic-bezier(0.34,1.56,0.64,1)' }}
        />
        {/* Left arm */}
        <line
          x1={cx - gap} y1={cy}
          x2={cx - gap - armLen} y2={cy}
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          style={{ transition: 'all 200ms cubic-bezier(0.34,1.56,0.64,1)' }}
        />
        {/* Right arm */}
        <line
          x1={cx + gap} y1={cy}
          x2={cx + gap + armLen} y2={cy}
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          style={{ transition: 'all 200ms cubic-bezier(0.34,1.56,0.64,1)' }}
        />
        {/* Center: small dot normally, filled smaller circle on hover */}
        <circle
          cx={cx} cy={cy}
          r={hovered ? 2.5 : 1.2}
          fill="currentColor"
          stroke="none"
          style={{ transition: 'all 200ms cubic-bezier(0.34,1.56,0.64,1)' }}
        />
      </svg>
    </div>
  );
}
