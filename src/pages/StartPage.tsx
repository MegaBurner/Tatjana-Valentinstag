import { useState, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import './StartPage.css';

interface StartPageProps {
  onAccept: () => void;
}

const StartPage = ({ onAccept }: StartPageProps) => {
  const [neinPos, setNeinPos] = useState<{ x: number; y: number } | null>(null);
  const [jaScale, setJaScale] = useState(1);
  const [escapeCount, setEscapeCount] = useState(0);

  const handleNeinEscape = useCallback(() => {
    const padding = 80;
    const btnW = 150;
    const btnH = 60;
    const maxX = window.innerWidth - padding - btnW;
    const maxY = window.innerHeight - padding - btnH;
    const newX = padding + Math.random() * (maxX - padding);
    const newY = padding + Math.random() * (maxY - padding);

    setNeinPos({ x: newX, y: newY });
    setJaScale(prev => Math.min(prev + 0.12, 2.2));
    setEscapeCount(prev => prev + 1);
  }, []);

  return (
    <div className="valentine-page">
      <motion.div
        className="valentine-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.div
          className="main-heart"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.3, stiffness: 200, damping: 12 }}
        >
          <Heart size={80} fill="currentColor" strokeWidth={0} />
        </motion.div>

        <motion.h1
          className="valentine-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Willst du mein
          <br />
          <span className="title-highlight">Valentin</span> sein?
        </motion.h1>

        <motion.div
          className="valentine-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.button
            className="btn-ja"
            onClick={onAccept}
            animate={{ scale: jaScale }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            whileHover={{ scale: jaScale * 1.08, boxShadow: '0 0 60px rgba(255, 45, 85, 0.6)' }}
            whileTap={{ scale: jaScale * 0.95 }}
          >
            Ja
          </motion.button>

          {escapeCount < 10 && (
            <motion.button
              className="btn-nein"
              onMouseEnter={handleNeinEscape}
              onTouchStart={(e) => { e.preventDefault(); handleNeinEscape(); }}
              style={
                neinPos
                  ? {
                      position: 'fixed',
                      left: neinPos.x,
                      top: neinPos.y,
                      zIndex: 1000,
                    }
                  : {}
              }
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              {escapeCount === 0
                ? 'Nein'
                : escapeCount < 3
                  ? 'Nein!'
                  : escapeCount < 6
                    ? 'Nope!'
                    : 'Niemals!'}
            </motion.button>
          )}
        </motion.div>

        {escapeCount >= 3 && (
          <motion.p
            className="hint-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {escapeCount >= 10
              ? 'Der Nein-Button hat aufgegeben...'
              : escapeCount >= 6
                ? 'Er will einfach nicht stillhalten...'
                : 'Haha, erwischt!'}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default StartPage;
