import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  size: number;
  rotation: number;
  emoji: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💘'];

interface HeartParticlesProps {
  centerX?: number;
  centerY?: number;
}

const HeartParticles = ({ centerX, centerY }: HeartParticlesProps) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Calculate center - move origin DOWN by 120px from center
    const cx = centerX ?? window.innerWidth / 2;
    const cy = (centerY ?? window.innerHeight / 2) + 120; // Origin much lower

    // Generate 60 hearts with RANDOM angles
    const count = 60;
    const newHearts: Heart[] = Array.from({ length: count }, (_, i) => {
      // Completely random angle
      const angle = Math.random() * 2 * Math.PI;
      
      // Radius: 200-600px
      const radius = 200 + Math.random() * 400;
      
      return {
        id: i,
        size: 1.2 + Math.random() * 1.2,
        rotation: Math.random() * 360 - 180,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        startX: cx - 12,
        startY: cy - 12,
        endX: cx + Math.cos(angle) * radius - 12,
        endY: cy + Math.sin(angle) * radius - 12,
      };
    });
    
    setHearts(newHearts);
    
    // Trigger visibility
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    // Cleanup after animation (longer duration)
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setHearts([]), 100);
    }, 3500);

    return () => clearTimeout(timer);
  }, [centerX, centerY]);

  if (hearts.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ overflow: 'visible' }}
    >
      <AnimatePresence>
        {isVisible && hearts.map((heart) => (
          <motion.span
            key={heart.id}
            style={{ 
              position: 'absolute',
              fontSize: `${heart.size}rem`,
              left: heart.startX,
              top: heart.startY,
              display: 'inline-block',
            }}
            initial={{ 
              x: 0,
              y: 0,
              scale: 0.3,
              opacity: 1,
            }}
            animate={{ 
              x: heart.endX - heart.startX,
              y: heart.endY - heart.startY,
              scale: [0.3, 1.5, 1.2, 0],
              rotate: heart.rotation,
              opacity: [1, 1, 1, 0],
            }}
            transition={{
              duration: 2.5, // Slower animation
              ease: [0.15, 0.5, 0.25, 1], // Slower ease-out
            }}
          >
            {heart.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeartParticles;
