import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  isHeart: boolean;
  scale: number;
  rotation: number;
}

const BackgroundEffects = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Spawn new particles periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const isHeart = Math.random() > 0.4; // 60% hearts, 40% stars
      
      // Safe Zone Logic: Spawn mainly on sides and bottom, avoiding center
      // Zones: 
      // 1. Left Strip: 0-15% width
      // 2. Right Strip: 85-100% width
      // 3. Bottom Strip: 0-100% width, 85-100% height (spawning low to float up)
      
      if (zone < 0.4) {
        // Left (40% chance)
        x = Math.random() * 10; // 0-10% (Reduced to ensure no overflow)
        y = Math.random() * 100;
      } else if (zone < 0.8) {
        // Right (40% chance)
        x = 85 + Math.random() * 5; // 85-90% (Strictly avoids 100% edge which triggers scrollbar)
        y = Math.random() * 100;
      } else {
        // Bottom Area (20% chance)
        x = Math.random() * 90; // Limit width to 90%
        y = 100 + Math.random() * 5; // Just below screen
      }

      setParticles(prev => [...prev, {
        id,
        x,
        y,
        isHeart,
        scale: 0.5 + Math.random() * 0.8,
        rotation: Math.random() * 360
      }].slice(-20));
    }, 1500); // Slightly faster spawn to fill gaps, but smoother

    return () => clearInterval(interval);
  }, []);

  // Filter out particles that have finished their animation
  useEffect(() => {
    const cleanup = setInterval(() => {
        setParticles(prev => prev.filter(p => Date.now() - p.id < 15000));
    }, 2000);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ maxWidth: '100vw', maxHeight: '100vh' }}>
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ 
              opacity: 0, 
              x: `${particle.x}vw`, 
              y: `${particle.y}vh`,
              scale: 0,
              rotate: particle.rotation
            }}
            animate={{ 
              opacity: [0, 0.6, 0.6, 0], // Lower max opacity for softness, smoother fade
              y: [
                `${particle.y}vh`, 
                `${particle.y - 40 - Math.random() * 30}vh` // Float up
              ],
              x: [
                `${particle.x}vw`,
                `${particle.x + (Math.random() * 10 - 5)}vw`
              ],
              scale: particle.scale,
              rotate: particle.rotation + (Math.random() > 0.5 ? 45 : -45)
            }}
            transition={{ 
              duration: 10 + Math.random() * 5, // 10-15s (Very slow and smooth)
              ease: "linear", // Linear is smoother for continuous float
              times: [0, 0.2, 0.8, 1] // Long fade in/out
            }}
            style={{
              position: 'absolute',
              willChange: 'transform, opacity', // Performance optimization
              filter: particle.isHeart 
                ? 'drop-shadow(0 0 10px rgba(255, 100, 150, 0.6))' 
                : 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))',
              color: particle.isHeart ? '#ffb7b2' : '#fff59d'
            }}
          >
            {particle.isHeart ? (
              <Heart size={40 * particle.scale} fill="currentColor" strokeWidth={0} />
            ) : (
              <Star size={32 * particle.scale} fill="currentColor" strokeWidth={0} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BackgroundEffects;
