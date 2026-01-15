import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PolaroidPhoto.css';

interface PolaroidPhotoProps {
  images: string[];
  caption?: string;
  interval?: number;
  rotation?: number;
}

const PolaroidPhoto = ({ 
  images, 
  caption = "Unser erstes Date... ♥", 
  interval = 4000,
  rotation = -2 
}: PolaroidPhotoProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, isHovered]);

  if (!images.length) return null;

  return (
    <motion.div 
      className="polaroid-frame"
      initial={{ rotate: rotation, scale: 0.9, opacity: 0 }}
      animate={{ rotate: rotation, scale: 1, opacity: 1 }}
      whileHover={{ 
        rotate: 0, 
        scale: 1.05,
        zIndex: 10,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="polaroid-image-container">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Memory ${currentIndex + 1}`}
            className="polaroid-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>
      
      {caption && (
        <div className="polaroid-caption">
          {caption}
        </div>
      )}
    </motion.div>
  );
};

export default PolaroidPhoto;
