# 💌 Letter Component

## 📋 Übersicht

Der Brief gleitet aus dem geöffneten Umschlag heraus. Er ist klickbar und löst beim Klick einen PDF-Download aus. Gleichzeitig werden die Herz-Animationen getriggert.

---

## 🎯 Anforderungen

| Feature | Beschreibung |
|---------|--------------|
| **Animation** | Gleitet von unten nach oben aus dem Umschlag |
| **Aussehen** | Papier-Optik mit Brieftext-Vorschau |
| **Klick** | Öffnet/Downloaded das PDF |
| **Trigger** | Startet Herz-Animation beim Erscheinen |

---

## 🔧 Technische Umsetzung

### Slide-Out Animation

```tsx
import { motion } from 'framer-motion';

interface LetterProps {
  onLetterOpen: () => void;  // Callback für Herz-Animation
}

const Letter = ({ onLetterOpen }: LetterProps) => {
  const handleClick = () => {
    onLetterOpen();  // Trigger Hearts
    downloadPDF();
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/letter.pdf';
    link.download = 'Brief_fuer_Tatjana.pdf';
    link.click();
  };

  return (
    <motion.div
      className="letter"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: '-20%', opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: 0.3  // Nach Klappe öffnen
      }}
      onClick={handleClick}
    >
      <div className="letter-content">
        <h3>Für Dich ❤️</h3>
        <p className="letter-preview">
          Klicke hier um den Brief zu lesen...
        </p>
      </div>
    </motion.div>
  );
};
```

---

## 🎨 CSS Styling

### Papier-Optik

```css
.letter {
  position: absolute;
  width: 90%;
  height: 85%;
  left: 5%;
  bottom: 10%;
  
  /* Papier Look */
  background: linear-gradient(
    to bottom,
    #fffef9 0%,
    #f8f4e8 100%
  );
  
  /* Papier-Textur (optional) */
  background-image: 
    linear-gradient(to bottom, #fffef9, #f8f4e8),
    url('/paper-texture.png');
  
  border-radius: 4px;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 0 20px rgba(0, 0, 0, 0.02);
  
  cursor: pointer;
  z-index: 5;
  
  /* Animation vorbereiten */
  transform-origin: bottom center;
}

.letter-content {
  padding: 20px;
  text-align: center;
  font-family: 'Georgia', serif;
  color: #4a4a4a;
}

.letter-content h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #d4577e;
}

.letter-preview {
  font-style: italic;
  font-size: 0.9rem;
  color: #888;
}

/* Hover Effekt */
.letter:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 8px 20px rgba(0, 0, 0, 0.15);
}
```

---

## 📥 PDF Download Methoden

### Methode 1: Direct Link (Empfohlen)

```tsx
// PDF liegt in /public/letter.pdf
const downloadPDF = () => {
  const link = document.createElement('a');
  link.href = '/letter.pdf';
  link.download = 'Brief_fuer_Tatjana.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
```

### Methode 2: Mit Fetch (für externe URLs)

```tsx
const downloadPDF = async () => {
  try {
    const response = await fetch('/letter.pdf');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Brief_fuer_Tatjana.pdf';
    link.click();
    
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
  }
};
```

---

## 📐 Animations-Details

### Spring Konfiguration

```tsx
// Für natürliches "Pop-out" Gefühl
transition={{
  type: "spring",
  stiffness: 80,    // Weniger steif = weicher
  damping: 12,      // Wenig Dämpfung = mehr Bounce
  mass: 0.8,        // Leichtes Gewicht
  delay: 0.3        // Nach Envelope-Öffnung
}}
```

### Alternative: Tween Animation

```tsx
transition={{
  type: "tween",
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1]  // Custom Easing
}}
```

---

## 🔗 Integration mit HeartParticles

```tsx
// In Envelope.tsx
const [showHearts, setShowHearts] = useState(false);

<Letter onLetterOpen={() => setShowHearts(true)} />

{showHearts && <HeartParticles />}
```

---

## ⚡ UX Verbesserungen

| Feature | Beschreibung |
|---------|--------------|
| **Visual Feedback** | Brief leuchtet kurz beim Hover |
| **Loading State** | Zeige Spinner während Download |
| **Success Toast** | "Download gestartet!" Meldung |
| **Accessibility** | `aria-label` für Screen Readers |

---

## 🔗 Abhängigkeiten

- `framer-motion` für Animationen
- PDF-Datei vom User
- `HeartParticles` Komponente
