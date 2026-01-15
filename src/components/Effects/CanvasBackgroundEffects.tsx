import { useRef, useEffect } from 'react';

const CanvasBackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // --- 1. Pre-render Glowing Shapes to Off-screen Canvases ---
    // This avoids calling shadowBlur (expensive) 50 times per frame.
    const createShapeBuffer = (type: 'heart' | 'star') => { 
      const size = 100; // Large enough source for scaling
      const buffer = document.createElement('canvas');
      buffer.width = size;
      buffer.height = size;
      const bCtx = buffer.getContext('2d');
      if (!bCtx) return buffer;
      
      const center = size / 2;
      const glowSize = 15;
      
      bCtx.shadowBlur = 20;
      bCtx.shadowColor = type === 'heart' ? 'rgba(255, 100, 150, 0.9)' : 'rgba(255, 215, 0, 0.9)';
      bCtx.fillStyle = type === 'heart' ? '#ffb7b2' : '#fff59d';
      
      bCtx.translate(center, center);
      
      if (type === 'heart') {
        const s = (size - glowSize * 2) / 3.5; 
        bCtx.beginPath();
        // SVG-like Heart Path
        bCtx.moveTo(0, -s/2);
        bCtx.bezierCurveTo(-s, -s, -s*2, s/3, 0, s*1.5);
        bCtx.bezierCurveTo(s*2, s/3, s, -s, 0, -s/2);
        bCtx.fill();
      } else {
        const s = (size - glowSize * 2) / 4;
        bCtx.beginPath();
        // Star Path
        for(let i=0; i<5; i++){
          bCtx.lineTo(Math.cos((18+i*72)/180*Math.PI)*s*2, -Math.sin((18+i*72)/180*Math.PI)*s*2);
          bCtx.lineTo(Math.cos((54+i*72)/180*Math.PI)*s, -Math.sin((54+i*72)/180*Math.PI)*s);
        }
        bCtx.fill();
        bCtx.closePath();
      }
      return buffer;
    };

    const heartBuffer = createShapeBuffer('heart');
    const starBuffer = createShapeBuffer('star');

    // --- 2. Particle Logic ---
    class Particle {
      type: 'heart' | 'star';
      buffer: HTMLCanvasElement;
      x: number;
      y: number;
      speed: number;
      drift: number;
      size: number;
      opacity: number;
      fadeIn: boolean;
      rotation: number;
      rotationSpeed: number;

      constructor(w: number, h: number, initial = false) {
        // Initialize immediately
        this.type = Math.random() > 0.4 ? 'heart' : 'star';
        this.buffer = this.type === 'heart' ? heartBuffer : starBuffer;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.drift = 0;
        this.size = 0;
        this.opacity = 0;
        this.fadeIn = true;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;

        this.reset(w, h, initial);
      }

      reset(w: number, h: number, initial = false) {
        this.type = Math.random() > 0.4 ? 'heart' : 'star';
        this.buffer = this.type === 'heart' ? heartBuffer : starBuffer;
        
        // SAFE ZONES: Only spawn in Left 15% or Right 15%
        // We override the center zone completely to ensure safety.
        const zone = Math.random();
        if (zone < 0.5) {
          this.x = Math.random() * (w * 0.15); // Left 0-15%
        } else {
          this.x = w - Math.random() * (w * 0.15); // Right 85-100%
        }

        // On initial load, scatter everywhere vertically. 
        // Afterwards, spawn strictly below screen.
        if (initial) {
          this.y = Math.random() * h;
          this.opacity = Math.random(); 
          this.fadeIn = Math.random() > 0.5;
        } else {
          this.y = h + Math.random() * 100;
          this.opacity = 0;
          this.fadeIn = true;
        }

        // Configuration
        this.speed = 0.3 + Math.random() * 1.0; // Slower, smoother float
        this.drift = (Math.random() - 0.5) * 0.3; // Gentle horizontal drift
        this.size = 0.4 + Math.random() * 0.6; // Scale 0.4 - 1.0
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update(w: number, h: number) {
        this.y -= this.speed;
        this.x += this.drift;
        this.rotation += this.rotationSpeed;

        // Fade In/Out Logic
        if (this.fadeIn) {
          this.opacity += 0.005;
          if (this.opacity >= 0.8) this.fadeIn = false;
        } else {
          // If we are high up, start fading out? Or just let it go off screen?
          // Let's fade out if near top
          if (this.y < h * 0.2) {
             this.opacity -= 0.005;
          }
        }
        
        // Clamp opacity
        if (this.opacity < 0) this.opacity = 0;
        if (this.opacity > 0.8) this.opacity = 0.8; // Max opacity 0.8

        // Reset check
        if (this.y < -100 || (this.opacity <= 0 && this.y < h/2)) {
          this.reset(w, h);
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.opacity <= 0) return;
        
        ctx.globalAlpha = this.opacity;
        
        // Drawing the pre-rendered buffer
        const drawSize = 50 * this.size;
        
        // Rotate
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.buffer, -drawSize/2, -drawSize/2, drawSize, drawSize);
        ctx.restore();
        
        ctx.globalAlpha = 1;
      }
    }

    // --- 3. Init & Loop ---
    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-create particles on resize
      particles = [];
      const particleCount = 40; // 40 is enough visually, extremely performant
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height, true));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const w = canvas.width;
      const h = canvas.height;

      particles.forEach(p => {
        p.update(w, h);
        p.draw(ctx);
      });

      animationFrameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0" 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%' 
      }} 
    />
  );
};

export default CanvasBackgroundEffects;
