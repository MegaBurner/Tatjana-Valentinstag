import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import Letter from '../Letter/Letter';
import './Envelope.css';

interface EnvelopeProps {
  onOpen?: () => void;
  onLetterClick?: () => void;
}

const Envelope = ({ onOpen, onLetterClick }: EnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      // Trigger hearts BEFORE opening animation
      if (onOpen) onOpen();
      setIsOpen(true);
    }
  };

  return (
    <div className="envelope-container">
      <motion.div 
        className="envelope-body"
        onClick={handleOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Heart Seal */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="heart-seal"
              initial={{ scale: 1, opacity: 1 }}
              exit={{ 
                scale: 1.5, 
                opacity: 0,
                rotate: 15
              }}
              transition={{ duration: 0.4 }}
            >
              <Heart size={20} fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Klappe */}
        <motion.div
          className="envelope-flap"
          animate={{
            rotateX: isOpen ? 180 : 0,
            zIndex: isOpen ? 5 : 20 
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
        />

        {/* Umschlag-Taschen (Triangles) */}
        <div className="envelope-pocket-left" />
        <div className="envelope-pocket-right" />
        <div className="envelope-pocket-bottom" />

        {/* Brief */}
        <AnimatePresence>
          {isOpen && <Letter onOpenPDF={onLetterClick} />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Envelope;
