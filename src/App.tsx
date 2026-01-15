import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StartPage from './pages/StartPage';
import PhotosPage from './pages/PhotosPage';
import VinylPage from './pages/VinylPage';
import LetterPage from './pages/LetterPage';
import PeonyPage from './pages/PeonyPage';

// Memory images from public/memories/
const memoryImages: string[] = [
  '/memories/IMG_4891.JPG',
  '/memories/IMG_4909.JPG',
  '/memories/IMG_4913.JPG',
  '/memories/IMG_5006.JPG',
  '/memories/IMG_6280.JPG',
  '/memories/IMG_7321.JPG',
  '/memories/IMG_7411.jpg',
  '/memories/a861063c-5a40-4df8-acaf-398ef7aa81a7.JPG',
  '/memories/b8b07275-1668-431c-92da-d582c940a0c7.JPG',
  '/memories/e0618077-191d-4805-b0b2-eeb0b1ca263e.JPG',
  '/memories/e5a59266-912f-4ecf-8ac0-1b8abdcf200c.JPG',
  '/memories/fc90b5e2-bc5b-4ae2-98f4-c14950b61788.JPG',
];

const TOTAL_PAGES = 5;

const pageVariants = {
  enter: { x: '100%', opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 }
};

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const nextPage = () => setCurrentPage(p => Math.min(p + 1, TOTAL_PAGES - 1));
  const prevPage = () => setCurrentPage(p => Math.max(p - 1, 0));

  const handleStart = () => {
    // Start music and go to next page
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play:", e));
    }
    nextPage();
  };

  return (
    <div className="overflow-hidden relative">
      {/* Persistent Audio Element */}
      <audio ref={audioRef} src="/song.mp3" loop />

      <AnimatePresence mode="wait">
        {currentPage === 0 && (
          <motion.div
            key="start"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ position: 'absolute', width: '100%' }}
          >
            <StartPage onStart={handleStart} />
          </motion.div>
        )}

        {currentPage === 1 && (
          <motion.div
            key="photos"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ position: 'absolute', width: '100%' }}
          >
            <PhotosPage
              images={memoryImages}
              currentPage={currentPage}
              totalPages={TOTAL_PAGES}
              onNext={nextPage}
              onPrev={prevPage}
            />
          </motion.div>
        )}

        {currentPage === 2 && (
          <motion.div
            key="vinyl"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ position: 'absolute', width: '100%' }}
          >
            <VinylPage
              currentPage={currentPage}
              totalPages={TOTAL_PAGES}
              onNext={nextPage}
              onPrev={prevPage}
              audioRef={audioRef}
            />
          </motion.div>
        )}

        {currentPage === 3 && (
          <motion.div
            key="letter"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ position: 'absolute', width: '100%' }}
          >
            <LetterPage
              currentPage={currentPage}
              totalPages={TOTAL_PAGES}
              onNext={nextPage}
              onPrev={prevPage}
            />
          </motion.div>
        )}

        {currentPage === 4 && (
          <motion.div
            key="peony"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ position: 'absolute', width: '100%' }}
          >
            <PeonyPage
              currentPage={currentPage}
              totalPages={TOTAL_PAGES}
              onPrev={prevPage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
