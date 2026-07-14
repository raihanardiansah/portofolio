import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const wrapperRef = useRef(null);
  const dotRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsDesktop(true);
      // Hide default cursor
      document.body.classList.add('custom-cursor-enabled');
    }
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const wrapper = wrapperRef.current;
    const dot = dotRef.current;
    if (!wrapper || !dot) return;

    const onMouseMove = (e) => {
      wrapper.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const onMouseOver = (e) => {
      const isClickable = e.target.closest('a, button, input, select, textarea, [role="button"]');
      if (isClickable) {
        dot.classList.add('scale-[3.5]', 'opacity-20');
      } else {
        dot.classList.remove('scale-[3.5]', 'opacity-20');
      }
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

  return (
    <div
      ref={wrapperRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      <div 
        ref={dotRef}
        className="w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-black dark:bg-white transition-all duration-300 ease-out" 
      />
    </div>
  );
}
