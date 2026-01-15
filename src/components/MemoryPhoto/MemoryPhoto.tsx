import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MemoryPhoto.css';

interface MemoryPhotoProps {
  images: string[];
  interval?: number;
}

const MemoryPhoto = ({ images, interval = 4000 }: MemoryPhotoProps) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, images.length, interval]);

  const slideVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  };

  if (images.length === 0) {
    return (
      <div className="memory-container">
        <div className="memory-placeholder">
          Fotos werden geladen...
        </div>
      </div>
    );
  }

  return (
    <div 
      className="memory-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`Memory ${current + 1}`}
          className="memory-image"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <div className="memory-indicators">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`indicator ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryPhoto;
