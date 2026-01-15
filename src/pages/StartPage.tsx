import { Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './StartPage.css';

interface StartPageProps {
  onStart: () => void;
}

const StartPage = ({ onStart }: StartPageProps) => {
  return (
    <div className="start-page">
      {/* Ambient Floating Particles */}
      <div className="particles-container">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
      </div>

      {/* Breathing Heart Icon */}
      <motion.div 
        className="breathing-heart"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Heart size={48} fill="currentColor" strokeWidth={1} />
      </motion.div>

      <motion.h1 
        className="start-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        moja ljubavi
      </motion.h1>

      <motion.p
        className="start-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        A vinyl love letter for Tatjana
      </motion.p>

      <motion.button 
        className="start-btn"
        onClick={onStart}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Journey
        <ArrowRight size={20} />
      </motion.button>

      {/* Peony SVG Decoration */}
      <div className="peony-decoration">
        <svg 
          viewBox="0 0 200 150" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="peony-svg"
        >
          <path d="M100 140C100 140 80 120 70 100C60 80 65 60 80 50C95 40 100 60 100 60C100 60 105 40 120 50C135 60 140 80 130 100C120 120 100 140 100 140Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5"/>
          <path d="M100 140C100 140 60 130 40 100C20 70 30 40 50 30C70 20 80 50 80 50" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5"/>
          <path d="M100 140C100 140 140 130 160 100C180 70 170 40 150 30C130 20 120 50 120 50" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5"/>
          <path d="M80 50C80 50 70 30 80 20C90 10 100 30 100 30" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5"/>
          <path d="M120 50C120 50 130 30 120 20C110 10 100 30 100 30" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5"/>
          <path d="M100 140V150" stroke="currentColor" strokeWidth="0.5"/>
          <path d="M50 30C40 20 50 10 60 15" stroke="currentColor" strokeLinecap="round" strokeWidth="0.3"/>
          <path d="M150 30C160 20 150 10 140 15" stroke="currentColor" strokeLinecap="round" strokeWidth="0.3"/>
        </svg>
      </div>
    </div>
  );
};

export default StartPage;
