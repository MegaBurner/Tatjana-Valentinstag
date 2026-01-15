import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import './Letter.css';

interface LetterProps {
  onOpenPDF?: () => void;
}

const Letter = ({ onOpenPDF }: LetterProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenPDF) onOpenPDF();
  };

  return (
    <motion.div
      className="letter"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: -80, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 12,
        delay: 0.6
      }}
      onClick={handleClick}
      whileHover={{ y: -90 }}
    >
      {/* Gradient Header */}
      <div className="letter-header">
        <span className="letter-header-title">Für Dich ❤️</span>
      </div>
      
      <div className="letter-content">
        <h3>Meine liebste Tatjana</h3>
        <p className="letter-preview">
          Klicke hier, um<br/>deinen Brief zu lesen...
        </p>
        <div className="letter-icon">
          <FileText size={24} />
        </div>
      </div>
    </motion.div>
  );
};

export default Letter;
