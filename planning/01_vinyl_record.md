# 🎵 Vinyl Record Component

## 📋 Übersicht

Die drehende Schallplatte ist das zentrale visuelle Element. Sie dreht sich kontinuierlich und spielt dabei ein Lied ab. Die Animation soll realistisch und smooth wirken.

---

## 🎯 Anforderungen

| Feature | Beschreibung |
|---------|--------------|
| **Rotation** | Kontinuierliches Drehen im Uhrzeigersinn |
| **Audio** | Musik startet beim Laden oder auf Click |
| **Styling** | Realistischer Vinyl-Look mit Grooves |
| **Interaktion** | Optional: Play/Pause bei Click |

---

## 🔧 Technische Umsetzung

### Animation mit Framer Motion

```tsx
import { motion } from "framer-motion";

<motion.div
  animate={{ rotate: 360 }}
  transition={{
    duration: 3,           // 3 Sekunden pro Umdrehung
    repeat: Infinity,      // Endlos wiederholen
    ease: "linear"         // Konstante Geschwindigkeit (wichtig!)
  }}
  className="vinyl-record"
>
  {/* Vinyl Inhalt */}
</motion.div>
```

> [!TIP]
> **`ease: "linear"`** ist entscheidend für realistische Plattendrehung! 
> Andere Easing-Funktionen verursachen Beschleunigung/Abbremsung.

### CSS Styling für Realismus

```css
.vinyl-record {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  
  /* Tiefeneffekt mit Schatten */
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.5),
    inset 0 0 20px rgba(0, 0, 0, 0.3);
  
  /* Grooves als Gradient */
  background: 
    radial-gradient(
      circle at center,
      #333 0%,
      #1a1a1a 40%,
      #000 100%
    );
}

/* Center Label */
.vinyl-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
}

/* Center Hole */
.vinyl-hole {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #1a1a1a;
}
```

---

## 🎵 Audio Integration

### Mit useRef und State

```tsx
import { useRef, useState } from 'react';

const VinylRecord = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <motion.div 
        onClick={togglePlay}
        animate={{ 
          rotate: isPlaying ? 360 : 0 
        }}
        transition={{
          duration: 3,
          repeat: isPlaying ? Infinity : 0,
          ease: "linear"
        }}
      >
        {/* Vinyl Content */}
      </motion.div>
      
      <audio ref={audioRef} src="/song.mp3" loop />
    </>
  );
};
```

---

## 🎨 Visuelle Details

### Schichtaufbau der Vinyl

```
┌─────────────────────────────┐
│    Outer Ring (schwarz)     │
│  ╭─────────────────────╮    │
│  │  Grooves (Gradient) │    │
│  │  ╭─────────────╮    │    │
│  │  │    Label    │    │    │
│  │  │   (bunt)    │    │    │
│  │  │   ╭───╮     │    │    │
│  │  │   │ ○ │     │    │    │  ← Center Hole
│  │  │   ╰───╯     │    │    │
│  │  ╰─────────────╯    │    │
│  ╰─────────────────────╯    │
└─────────────────────────────┘
```

### Zusätzliche Effekte (Optional)

- **Lichtreflexion**: Subtiler weißer Gradient als Overlay
- **Schatten**: Drop-shadow unter der Platte
- **Groove-Textur**: Wiederholende radiale Linien

---

## ⚡ Performance Tipps

1. **GPU Acceleration**: Nur `transform: rotate()` und `opacity` animieren
2. **will-change**: CSS `will-change: transform` setzen
3. **Lazy Audio**: Audio erst nach User-Interaktion laden (Browser Policy)

---

## 🔗 Abhängigkeiten

- `framer-motion` für Animation
- Audio-Datei vom User (`.mp3` oder `.wav`)
- Optional: Custom Label-Bild
