# 🌸 Pfingstrose (Peony) Illustration Component

## 📋 Übersicht

Eine elegante SVG-Illustration einer Pfingstrose (Peony), platziert unter dem Brief/Umschlag. Die Blume soll romantisch und weich wirken, passend zum Gesamtdesign mit subtilen Animationen.

---

## 🎯 Anforderungen

| Feature | Beschreibung |
|---------|--------------|
| **Position** | Unterhalb des Envelope/Letter Bereichs |
| **Format** | SVG (inline in React) |
| **Stil** | Romantisch, soft, layered Petals |
| **Farben** | Pink, Lavender, passend zur Palette |
| **Animation** | Subtiles "Atmen" oder sanftes Schwanken |

---

## 🔧 Technische Umsetzung

### SVG Struktur mit Layered Petals

```tsx
// Peony.tsx
import React from 'react';
import './Peony.css';

interface PeonyProps {
  size?: number;
}

const Peony = ({ size = 200 }: PeonyProps) => (
  <svg
    className="peony"
    viewBox="0 0 200 200"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Radial Gradient für Petals: Soft Pink-Lavender */}
      <radialGradient id="petalGrad" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#F8C8DC" />   {/* Light Pink Core */}
        <stop offset="50%" stopColor="#E6B8D7" />  {/* Lavender Mid */}
        <stop offset="100%" stopColor="#D4A7C8" /> {/* Soft Edge */}
      </radialGradient>
      
      {/* Gradient für innere Petals */}
      <radialGradient id="innerPetalGrad" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#FDD5E5" />
        <stop offset="100%" stopColor="#F4A5AE" />
      </radialGradient>
      
      {/* Center Gradient */}
      <radialGradient id="centerGrad" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#FFE4B5" />  {/* Warm Yellow */}
        <stop offset="100%" stopColor="#F4A5AE" /> {/* Rose */}
      </radialGradient>
    </defs>
    
    {/* Outer Petals Layer */}
    <g className="outer-petals">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="60"
          rx="25"
          ry="45"
          fill="url(#petalGrad)"
          transform={`rotate(${angle} 100 100)`}
          opacity="0.9"
        />
      ))}
    </g>
    
    {/* Middle Petals Layer */}
    <g className="middle-petals">
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="70"
          rx="18"
          ry="35"
          fill="url(#innerPetalGrad)"
          transform={`rotate(${angle} 100 100)`}
          opacity="0.95"
        />
      ))}
    </g>
    
    {/* Inner Petals Layer */}
    <g className="inner-petals">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="80"
          rx="12"
          ry="22"
          fill="url(#innerPetalGrad)"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
    </g>
    
    {/* Blütenzentrum */}
    <circle
      cx="100"
      cy="100"
      r="15"
      fill="url(#centerGrad)"
    />
    
    {/* Stamen/Fringe Details */}
    <g className="stamens" stroke="#F4A5AE" strokeWidth="1" fill="none">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={angle}
          x1="100"
          y1="100"
          x2="100"
          y2="88"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
    </g>
  </svg>
);

export default Peony;
```

---

## 🎨 CSS Animationen

### Peony.css

```css
.peony {
  display: block;
  margin: 0 auto;
  
  /* GPU Acceleration */
  will-change: transform;
  transform-origin: center center;
  
  /* Soft Drop Shadow */
  filter: drop-shadow(0 4px 12px rgba(212, 167, 200, 0.4));
}

/* Breathing Animation */
.peony {
  animation: breathe 4s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Alternative: Swaying Animation */
.peony.sway {
  animation: sway 6s ease-in-out infinite alternate;
}

@keyframes sway {
  0% {
    transform: rotate(-2deg) translateY(0);
  }
  100% {
    transform: rotate(2deg) translateY(-3px);
  }
}

/* Layered Petal Animation (Optional) */
.outer-petals {
  animation: breathe 4s ease-in-out infinite;
}

.middle-petals {
  animation: breathe 3.5s ease-in-out infinite;
  animation-delay: 0.2s;
}

.inner-petals {
  animation: breathe 3s ease-in-out infinite;
  animation-delay: 0.4s;
}
```

---

## 📐 Farbpalette für Peony

| Element | Farbe | Hex |
|---------|-------|-----|
| **Outer Petals Core** | Light Pink | `#F8C8DC` |
| **Outer Petals Mid** | Lavender | `#E6B8D7` |
| **Outer Petals Edge** | Soft Purple | `#D4A7C8` |
| **Inner Petals** | Warm Pink | `#FDD5E5` → `#F4A5AE` |
| **Center** | Warm Yellow → Rose | `#FFE4B5` → `#F4A5AE` |
| **Stamens** | Rose | `#F4A5AE` |

---

## 📐 Layout Integration

### Position im Gesamtlayout

```
┌──────────────────────────────────────┐
│                                      │
│          ╭──────────────╮            │
│          │    VINYL     │            │
│          ╰──────────────╯            │
│                                      │
│          ┌──────────────┐            │
│          │   ENVELOPE   │            │
│          │   + LETTER   │            │
│          └──────────────┘            │
│                                      │
│             🌸 PEONY 🌸              │  ← Neue Komponente
│          (subtil animiert)           │
│                                      │
│        (Lavender Background)         │
└──────────────────────────────────────┘
```

### CSS für Positionierung

```css
.peony-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
```

---

## ✨ Erweiterte Features (Optional)

### 1. Mehrere Blumen

```tsx
<div className="peony-arrangement">
  <Peony size={150} className="left" />
  <Peony size={200} className="center" />
  <Peony size={150} className="right" />
</div>
```

### 2. Blätter hinzufügen

```tsx
{/* Leaf SVG Path */}
<path
  d="M100,180 Q80,220 100,260 Q120,220 100,180"
  fill="url(#leafGrad)"
  stroke="#7FB069"
  strokeWidth="0.5"
/>
```

### 3. Interaktiver Hover-Effekt

```css
.peony:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 8px 20px rgba(244, 165, 174, 0.5));
}
```

---

## 🎯 Design Varianten

### Variante 1: Soft & Minimal
- Nur Ellipsen
- Dezente Farben
- Breathing Animation

### Variante 2: Detailliert & Realistisch
- Bézier Curves für organische Formen
- Mehr Petal-Layer
- Vein-Details auf Blättern

### Variante 3: Stylized / Illustrativ
- Cleane Linien
- Flat Design mit Schatten
- Bold Farben

---

## ⚡ Performance

1. **Inline SVG**: Beste Performance + Styling-Kontrolle
2. **GPU Animation**: Nur `transform` und `opacity`
3. **Reduced Motion**: User-Präferenzen respektieren

```css
@media (prefers-reduced-motion: reduce) {
  .peony {
    animation: none;
  }
}
```

---

## 🔗 Abhängigkeiten

- React für Komponente
- CSS für Animationen
- Keine externen Libraries nötig

---

## ✅ Nächste Schritte

1. [ ] Basiskomponente implementieren
2. [ ] Animation feintunen
3. [ ] In App.tsx unter Envelope einbinden
4. [ ] Responsive Größe anpassen
