# 📸 Memory Photo Component

## 📋 Übersicht

Eine automatische Foto-Slideshow die Erinnerungsfotos nacheinander anzeigt. Die Bilder werden aus einem Ordner geladen und mit sanften Übergängen gewechselt.

---

## 🎯 Anforderungen

| Feature | Beschreibung |
|---------|--------------|
| **Bilder** | Aus `public/memories/` Ordner |
| **Timer** | 3-5 Sekunden pro Bild |
| **Animation** | Fade oder Slide Übergang |
| **Kontrollen** | Pause/Play, optional Vor/Zurück |

---

## 🔧 Technische Umsetzung

### Komponenten-Struktur

```tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemoryPhotoProps {
  images: string[];
  interval?: number; // ms, default 4000
}

const MemoryPhoto = ({ images, interval = 4000 }: MemoryPhotoProps) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, images.length, interval]);

  const slideVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  };

  return (
    <div className="memory-container">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`Memory ${current + 1}`}
          className="memory-image"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      
      {/* Optional: Indicators */}
      <div className="memory-indicators">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`indicator ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryPhoto;
```

---

## 🎨 CSS Styling

```css
.memory-container {
  width: min(400px, 90vw);
  height: min(300px, 70vw);
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.memory-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

.memory-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}

.indicator.active {
  background: white;
}
```

---

## 📂 Bilder-Ordner Setup

```
public/
└── memories/
    ├── photo1.jpg
    ├── photo2.jpg
    ├── photo3.jpg
    └── ...
```

### In App.tsx verwenden:

```tsx
const memoryImages = [
  '/memories/photo1.jpg',
  '/memories/photo2.jpg',
  '/memories/photo3.jpg'
];

<MemoryPhoto images={memoryImages} interval={4000} />
```

---

## 🔗 Abhängigkeiten

- `framer-motion` für Animationen
- Bilder vom User in `public/memories/`
