import { motion } from 'framer-motion';
import './FilmStrip.css';

interface FilmStripProps {
  images: string[];
  rotation?: number;
}

const FilmStrip = ({ images, rotation = 5 }: FilmStripProps) => {
  // Ensure we have exactly 3 slots for the single strip
  // We'll fill with provided images or placeholders/repeat
  const slots = Array.from({ length: 3 }, (_, i) => {
    return images[i % images.length] || ''; 
  });

  return (
    <motion.div 
      className="film-strip"
      initial={{ rotate: rotation, x: 50, opacity: 0 }}
      animate={{ rotate: rotation, x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.3 } }}
    >
      <div className="film-holes-left"></div>
      
      <div className="film-content">
        {slots.map((src, index) => (
          <div key={index} className="film-slot-wrapper">
             {/* Ensure 2 columns layout logic via CSS grid */}
             <div className="film-slot">
               {src && <img src={src} alt="Film memory" />}
             </div>
          </div>
        ))}
      </div>
      
      <div className="film-holes-right"></div>
    </motion.div>
  );
};

export default FilmStrip;
