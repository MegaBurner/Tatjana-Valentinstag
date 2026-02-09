import { useRef, useEffect } from 'react';

const CanvasBackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let w = 0;
    let h = 0;

    // Parallax rain - typed arrays for zero GC
    const MAX_DROPS = 120;
    const xs       = new Float32Array(MAX_DROPS);
    const ys       = new Float32Array(MAX_DROPS);
    const speeds   = new Float32Array(MAX_DROPS);
    const lengths  = new Float32Array(MAX_DROPS);
    const opacities= new Float32Array(MAX_DROPS);
    const widths   = new Float32Array(MAX_DROPS);
    const depths   = new Float32Array(MAX_DROPS); // 0=far, 1=close

    const resetDrop = (i: number, initial: boolean) => {
      const d = Math.random();
      depths[i] = d;
      xs[i] = Math.random() * w;
      ys[i] = initial ? Math.random() * h : -(Math.random() * 150);
      speeds[i]   = 0.3 + d * 2.5;           // far=slow, close=fast
      lengths[i]  = 5 + d * 30;              // far=short, close=long
      opacities[i]= 0.005 + d * 0.04;       // far=faint, close=slightly visible
      widths[i]   = 0.2 + d * 0.9;           // far=thin, close=thicker
    };

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      for (let i = 0; i < MAX_DROPS; i++) resetDrop(i, true);
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < MAX_DROPS; i++) {
        ys[i] += speeds[i];
        if (ys[i] > h + lengths[i]) resetDrop(i, false);

        ctx.beginPath();
        ctx.moveTo(xs[i], ys[i]);
        ctx.lineTo(xs[i], ys[i] + lengths[i]);
        ctx.strokeStyle = `rgba(255,180,200,${opacities[i]})`;
        ctx.lineWidth = widths[i];
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    let resizeTimer: number;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(init, 150);
    };

    window.addEventListener('resize', onResize, { passive: true });
    init();
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};

export default CanvasBackgroundEffects;
