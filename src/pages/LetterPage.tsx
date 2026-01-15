import { useState } from 'react';
import { motion } from 'framer-motion';
import Envelope from '../components/Envelope/Envelope';
import HeartParticles from '../components/HeartParticles/HeartParticles';
import PDFModal from '../components/PDFModal/PDFModal';
import PageNavigation from '../components/Navigation/PageNavigation';
import './ContentPage.css';

interface LetterPageProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const LetterPage = ({ currentPage, totalPages, onNext, onPrev }: LetterPageProps) => {
  const [showHearts, setShowHearts] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Trigger when envelope opens
  const handleEnvelopeOpen = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 3000);
  };

  // Open PDF modal when letter is clicked
  const handleOpenPDF = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="content-page">
      <motion.h2 
        className="page-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
      >
        Ein Brief nur für dich
      </motion.h2>

      <motion.p
        className="page-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Klicke auf den Umschlag um ihn zu öffnen
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Envelope 
          onOpen={handleEnvelopeOpen}
          onLetterClick={handleOpenPDF}
        />
      </motion.div>

      {/* Radial Heart Burst on Envelope Open */}
      {showHearts && <HeartParticles />}

      {/* PDF Modal */}
      <PDFModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pdfUrl="/notiz.pdf"
      />

      <PageNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  );
};

export default LetterPage;
