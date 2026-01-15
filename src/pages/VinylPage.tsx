import { motion } from 'framer-motion';
import VinylRecord from '../components/VinylRecord/VinylRecord';
import PageNavigation from '../components/Navigation/PageNavigation';
import './VinylPage.css';

interface VinylPageProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const VinylPage = ({ currentPage, totalPages, onNext, onPrev, audioRef }: VinylPageProps) => {
  return (
    <div className="vinyl-page">
      {/* Decorative Blur Blobs */}
      <div className="ambient-blob blob-1" />
      <div className="ambient-blob blob-2" />

      <motion.h2 
        className="vinyl-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Dieser Song erinnert mich an dich
      </motion.h2>

      <motion.p
        className="vinyl-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Mein wunderschönes jahr mit dir
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <VinylRecord audioRef={audioRef} />
      </motion.div>

      <PageNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  );
};

export default VinylPage;
