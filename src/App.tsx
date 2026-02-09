import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StartPage from './pages/StartPage';
import CelebrationPage from './pages/CelebrationPage';
import CanvasBackgroundEffects from './components/Effects/CanvasBackgroundEffects';

const resolvePath = (path: string) => {
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
};

function App() {
  const [accepted, setAccepted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAccept = () => {
    setAccepted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play:", e));
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Song - upload your song as song.mp3 in public/ */}
      <audio
        ref={audioRef}
        src={resolvePath('/song.mp3')}
        loop
        crossOrigin="anonymous"
      />

      {/* Rain particle background */}
      <CanvasBackgroundEffects />

      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="valentine"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            style={{ position: 'absolute', width: '100%', minHeight: '100vh' }}
          >
            <StartPage onAccept={handleAccept} />
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ position: 'absolute', width: '100%', minHeight: '100vh' }}
          >
            <CelebrationPage audioRef={audioRef} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
