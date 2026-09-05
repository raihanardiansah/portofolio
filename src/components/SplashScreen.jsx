import { useState, useRef, useEffect } from 'react';

// ── Splash Screen ────────────────────────────────────────────────
export default function SplashScreen({ onDone, greetingsData }) {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('in');
  const [tick, setTick] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [ready, setReady] = useState(false);
  const pRef = useRef({ word: 0, phase: 'in', endDelay: false });

  useEffect(() => {
    if (!ready) {
      const t = setTimeout(() => setReady(true), 200);
      return () => clearTimeout(t);
    }
    const p = pRef.current;
    if (p.word >= greetingsData.length) {
      if (!p.endDelay) {
        p.endDelay = true;
        const t = setTimeout(() => { setFadeOut(true); setTimeout(onDone, 300); }, 50);
        return () => clearTimeout(t);
      }
      return;
    }
    const t = setTimeout(() => {
      if (p.phase === 'in') { setText(greetingsData[p.word]); setPhase('show'); p.phase = 'hold'; }
      else if (p.phase === 'hold') { setPhase('out'); p.phase = 'out'; }
      else if (p.phase === 'out') { p.word++; setPhase('in'); p.phase = 'in'; }
      setTick(x => x + 1);
    }, p.phase === 'in' ? 120 : p.phase === 'hold' ? 200 : 80);
    return () => clearTimeout(t);
  }, [tick, onDone, ready, greetingsData]);

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center overflow-hidden px-4 py-8">
        <p
          className="font-mono text-3xl md:text-5xl text-[#e5e5e5] leading-normal"
          style={{
            transform: phase === 'in' ? 'translateY(-40px)' : 'translateY(0px)',
            opacity: phase === 'show' || phase === 'hold' ? 1 : 0,
            transition: 'transform 0.25s ease, opacity 0.2s ease',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
