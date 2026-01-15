# 💕 Heart Particle Animation

## 📋 Übersicht

Wenn der Brief erscheint/geklickt wird, sollen viele Herzen mit einer Animation herausfliegen. Die Herzen bewegen sich nach oben mit zufälligen Pfaden, rotieren und verschwinden langsam.

---

## 🎯 Anforderungen

| Feature | Beschreibung |
|---------|--------------|
| **Trigger** | Beim Öffnen des Briefs |
| **Bewegung** | Aufwärts mit seitlichem Schwanken |
| **Rotation** | Zufällige Rotation während der Bewegung |
| **Fade** | Langsames Ausblenden am Ende |
| **Menge** | 15-30 Herzen pro Burst |

---

## 🔧 Technische Umsetzung

### Mit Framer Motion + AnimatePresence

```tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

const HeartParticles = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generiere 20-30 Herzen beim Mount
    const newHearts: Heart[] = Array.from({ length: 25 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,           // Start X (0-100%)
      size: 0.5 + Math.random() * 1.5,  // Größe (0.5-2rem)
      duration: 2 + Math.random() * 2,   // Dauer (2-4s)
      delay: Math.random() * 0.5,        // Verzögerung (0-0.5s)
      rotation: Math.random() * 720 - 360 // Rotation (-360° bis 360°)
    }));
    
    setHearts(newHearts);

    // Cleanup nach Animation
    const timer = setTimeout(() => {
      setHearts([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hearts-container">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="heart"
            initial={{ 
              x: `${heart.x}vw`, 
              y: '100vh',
              scale: 0,
              rotate: 0,
              opacity: 1
            }}
            animate={{ 
              y: '-20vh',
              scale: heart.size,
              rotate: heart.rotation,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeartParticles;
```

---

## 🎨 CSS Styling

```css
.hearts-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 100;
}

.heart {
  position: absolute;
  font-size: 2rem;
  color: #ff6b6b;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  
  /* Verhindere Textauswahl */
  user-select: none;
}

/* Alternative: SVG Heart */
.heart-svg {
  fill: linear-gradient(135deg, #ff6b6b, #ee5a24);
}
```

---

## 🎯 Animation Varianten

### Variante 1: Wellenförmige Bewegung

```tsx
// Mit Sinus-Schwankung
animate={{
  y: '-100vh',
  x: [
    `${heart.x}vw`,
    `${heart.x + 5}vw`,
    `${heart.x - 5}vw`,
    `${heart.x + 3}vw`
  ],
  opacity: [1, 1, 0.8, 0]
}}
```

### Variante 2: Explosion vom Zentrum

```tsx
initial={{
  x: '50%',
  y: '50%',
  scale: 0
}}
animate={{
  x: `${50 + (Math.random() - 0.5) * 100}%`,
  y: `${(Math.random() - 0.5) * 100}%`,
  scale: heart.size,
  opacity: 0
}}
```

### Variante 3: Springende Herzen

```tsx
transition={{
  type: "spring",
  stiffness: 50,
  damping: 8
}}
```

---

## 📐 Performance Optimierung

### Limitierung der Partikel

```tsx
const MAX_HEARTS = 30;

// Alte Herzen entfernen wenn Limit erreicht
if (hearts.length > MAX_HEARTS) {
  setHearts(prev => prev.slice(-MAX_HEARTS));
}
```

### GPU Beschleunigung

```css
.heart {
  /* Nur transform und opacity animieren */
  will-change: transform, opacity;
  
  /* Eigene Composite Layer */
  transform: translateZ(0);
}
```

### Cleanup

```tsx
useEffect(() => {
  return () => {
    // Alle Herzen beim Unmount entfernen
    setHearts([]);
  };
}, []);
```

---

## 🎨 Herz-Varianten

### Emoji Herzen

```tsx
const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💘'];
const randomHeart = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
```

### SVG Herz

```tsx
const HeartSVG = ({ color = '#ff6b6b' }) => (
  <svg viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
      2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 
      3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 
      3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);
```

---

## 🔗 Integration

### In Letter Component

```tsx
// Letter.tsx
const [showHearts, setShowHearts] = useState(false);

const handleClick = () => {
  setShowHearts(true);
  downloadPDF();
  
  // Reset nach Animation
  setTimeout(() => setShowHearts(false), 5000);
};

{showHearts && <HeartParticles />}
```

### Als eigenständiger Trigger

```tsx
// App.tsx
const [heartsTriggered, setHeartsTriggered] = useState(false);

<button onClick={() => setHeartsTriggered(true)}>
  Trigger Hearts
</button>

{heartsTriggered && <HeartParticles key={Date.now()} />}
```

---

## ⚡ Tipps

1. **Randomisierung**: Jedes Herz braucht einzigartige Werte für natürlichen Look
2. **Staggering**: Verzögerte Starts (0-0.5s) für Burst-Effekt
3. **Größenvariation**: Unterschiedliche Größen erzeugen Tiefe
4. **Z-Index**: Herzen über allem anderen platzieren
5. **Performance**: Maximal 30-50 Partikel für smooth Animation

---

## 🔗 Abhängigkeiten

- `framer-motion` für Animationen
- CSS `pointer-events: none` für Klick-Through
- Emoji Support oder SVG Icons
