import { motion } from 'framer-motion';
import Peony from '../components/Peony/Peony';
import PageNavigation from '../components/Navigation/PageNavigation';
import './ContentPage.css';
import './PeonyPage.css';

interface PeonyPageProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
}

const PeonyPage = ({ currentPage, totalPages, onPrev }: PeonyPageProps) => {
  // Generate multiple flower positions
  const flowers = [
    { size: 280, x: 0, y: 0, delay: 0 },       // Center main
    { size: 120, x: -180, y: -60, delay: 0.2 }, // Top left
    { size: 100, x: 200, y: -40, delay: 0.3 },  // Top right
    { size: 90, x: -220, y: 80, delay: 0.4 },   // Bottom left
    { size: 110, x: 180, y: 100, delay: 0.5 },  // Bottom right
    { size: 70, x: -100, y: -120, delay: 0.6 }, // Far top left
    { size: 80, x: 120, y: -130, delay: 0.7 },  // Far top right
    { size: 60, x: -260, y: 20, delay: 0.8 },   // Far left
    { size: 65, x: 280, y: 30, delay: 0.9 },    // Far right
  ];

  return (
    <div className="content-page peony-page">
      <div className="flower-garden">
        {flowers.map((flower, idx) => (
          <motion.div
            key={idx}
            className="flower-item"
            style={{
              transform: `translate(${flower.x}px, ${flower.y}px)`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: flower.delay, ease: "easeOut" }}
          >
            <Peony size={flower.size} />
          </motion.div>
        ))}
        
        {/* Label specifically under the flowers */}
        <motion.div
           style={{
             position: 'absolute',
             bottom: '-20px', /* Closer to flowers */
             left: '50%',
             transform: 'translateX(-50%)',
             fontFamily: "'Playfair Display', serif",
             fontStyle: 'italic',
             fontSize: '0.9rem', /* Smaller */
             color: '#e07186',
             width: '100%',
             textAlign: 'center'
           }}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.2 }}
        >
          kleine pfingstrose
        </motion.div>
      </div>

      <motion.p
        className="love-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        Volim te ❤️
      </motion.p>

      <PageNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={onPrev}
        showNext={false}
      />
    </div>
  );
};

export default PeonyPage;
