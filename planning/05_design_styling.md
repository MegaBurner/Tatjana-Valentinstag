# 🎨 Design & Styling Guide

## 📋 Übersicht

Das gesamte Design soll romantisch, soft und elegant wirken. Helles Lila als Hauptfarbe, kombiniert mit warmen Akzenten.

---

## 🎨 Farbpalette

### Primärfarben

| Name | Hex | RGB | Verwendung |
|------|-----|-----|------------|
| **Lavender Light** | `#E6E0F8` | rgb(230, 224, 248) | Hintergrund |
| **Lavender** | `#C4B5E4` | rgb(196, 181, 228) | Akzente |
| **Lavender Dark** | `#9B89C4` | rgb(155, 137, 196) | Hover States |

### Akzentfarben

| Name | Hex | RGB | Verwendung |
|------|-----|-----|------------|
| **Rose** | `#F4A5AE` | rgb(244, 165, 174) | Herzen, Highlights |
| **Rose Deep** | `#E07186` | rgb(224, 113, 134) | CTA Buttons |
| **Cream** | `#F5F0E8` | rgb(245, 240, 232) | Papier, Umschlag |

### Neutralfarben

| Name | Hex | RGB | Verwendung |
|------|-----|-----|------------|
| **Vinyl Black** | `#1A1A1A` | rgb(26, 26, 26) | Schallplatte |
| **Text Dark** | `#4A4A4A` | rgb(74, 74, 74) | Body Text |
| **Text Light** | `#888888` | rgb(136, 136, 136) | Subtitles |

---

## 🖌️ CSS Variablen

```css
:root {
  /* Hintergrund */
  --bg-primary: #E6E0F8;
  --bg-secondary: #F0EBF9;
  
  /* Akzente */
  --accent-rose: #F4A5AE;
  --accent-rose-deep: #E07186;
  --accent-lavender: #C4B5E4;
  
  /* Text */
  --text-primary: #4A4A4A;
  --text-secondary: #888888;
  --text-light: #ffffff;
  
  /* Schatten */
  --shadow-soft: rgba(155, 137, 196, 0.2);
  --shadow-medium: rgba(0, 0, 0, 0.15);
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-full: 50%;
}
```

---

## 🔤 Typografie

### Font Families

```css
/* Google Fonts importieren */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap');

:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;
}
```

### Anwendung

| Element | Font | Gewicht | Größe |
|---------|------|---------|-------|
| **Headlines** | Playfair Display | 600 | 2-3rem |
| **Body** | Inter | 400 | 1rem |
| **Labels** | Inter | 500 | 0.875rem |
| **Brieftexte** | Playfair Display | 400 | 1.125rem |

---

## 📐 Layout

### Zentrale Anordnung

```css
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  padding: var(--space-md);
  background: var(--bg-primary);
}
```

### Visuelle Hierarchie

```
┌────────────────────────────────────────┐
│                                        │
│           ╭──────────────╮             │
│           │    VINYL     │  ← Hauptfokus
│           │   (groß)     │     300-400px
│           ╰──────────────╯             │
│                                        │
│         ┌────────────────┐             │
│         │   ENVELOPE     │  ← Sekundär
│         │   (kleiner)    │     250-300px
│         └────────────────┘             │
│                                        │
│        (Lavender Background)           │
│                                        │
└────────────────────────────────────────┘
```

---

## ✨ Effekte & Animationen

### Hover Transitions

```css
.interactive-element {
  transition: 
    transform 0.3s ease-out,
    box-shadow 0.3s ease-out;
}

.interactive-element:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px var(--shadow-soft);
}
```

### Glow Effekt

```css
.glow-on-hover:hover {
  box-shadow: 
    0 0 20px rgba(244, 165, 174, 0.4),
    0 0 40px rgba(244, 165, 174, 0.2);
}
```

### Gradient Hintergrund

```css
.gradient-bg {
  background: linear-gradient(
    135deg,
    #E6E0F8 0%,
    #F0EBF9 50%,
    #E6E0F8 100%
  );
}

/* Animierter Gradient (optional) */
.animated-gradient {
  background: linear-gradient(
    -45deg,
    #E6E0F8,
    #D5CCE8,
    #F0EBF9,
    #C4B5E4
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First */
:root {
  --vinyl-size: 250px;
  --envelope-width: 220px;
}

/* Tablet */
@media (min-width: 768px) {
  :root {
    --vinyl-size: 350px;
    --envelope-width: 280px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  :root {
    --vinyl-size: 400px;
    --envelope-width: 320px;
  }
}
```

### Flexible Sizing

```css
.vinyl-record {
  width: min(var(--vinyl-size), 90vw);
  height: min(var(--vinyl-size), 90vw);
}
```

---

## 🖼️ Zusätzliche Gestaltungselemente

### Subtile Partikel (Optional)

```css
.floating-particles {
  position: fixed;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(244, 165, 174, 0.1) 1px, transparent 1px),
    radial-gradient(circle at 80% 20%, rgba(196, 181, 228, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
}
```

### Glassmorphism (Optional)

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-lg);
}
```

---

## ⚡ Performance

1. **CSS Custom Properties**: Für konsistente Werte
2. **GPU Layers**: `transform` statt `top/left`
3. **Reduced Motion**: Respektiere User-Präferenzen

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🎯 Design Prinzipien

| Prinzip | Anwendung |
|---------|-----------|
| **Soft** | Abgerundete Ecken, weiche Schatten |
| **Playful** | Hover-Effekte, Micro-Interactions |
| **Clean** | Großzügiges Whitespace, klare Hierarchie |
| **Romantic** | Lila/Rosa Palette, Herz-Elemente |
