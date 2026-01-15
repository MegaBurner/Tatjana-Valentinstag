# 🏗️ Version 3: Multi-Page Architecture

## 📋 Übersicht

Komplette Neugestaltung der Website als sequentielle Multi-Page-Erfahrung mit sanften Übergängen und romantischen Titeln.

---

## 🎯 Seitenfluss

| Seite | Titel | Inhalt |
|-------|-------|--------|
| 0 | **moja ljubavi** | Start-Button (startet Musik) |
| 1 | **All die schönen Bilder seitdem ich dich kenne** | Foto-Slideshow |
| 2 | **Dieser Song erinnert mich an dich** | Vinyl + Audio Controls |
| 3 | **Ein Brief nur für dich** | Umschlag mit Brief |
| 4 | *(Dekorativ)* | Pfingstrose + "Mit Liebe ❤️" |

---

## 🔀 Navigation

- **Weiter →**: Nächste Seite
- **← Zurück**: Vorherige Seite
- Start-Seite hat nur "Start" Button
- Letzte Seite hat nur "Zurück" Button

---

## 🔧 Technische Umsetzung

### State-basierte Seiten

```tsx
const [currentPage, setCurrentPage] = useState(0);

const pages = [
  <StartPage />,
  <PhotosPage />,
  <VinylPage />,
  <LetterPage />,
  <PeonyPage />
];
```

### Framer Motion Transitions

```tsx
const slideVariants = {
  enter: { x: '100%', opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 }
};

<AnimatePresence mode="wait">
  <motion.div
    key={currentPage}
    variants={slideVariants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {pages[currentPage]}
  </motion.div>
</AnimatePresence>
```

---

## 📁 Ordnerstruktur

```
src/
├── pages/
│   ├── StartPage.tsx
│   ├── PhotosPage.tsx
│   ├── VinylPage.tsx
│   ├── LetterPage.tsx
│   └── PeonyPage.tsx
├── components/
│   ├── Navigation/
│   │   └── PageNavigation.tsx
│   └── ... (bestehende Komponenten)
└── App.tsx
```

---

## 🎵 Audio-Handling

- Audio-Element in `App.tsx` (persistiert über Seitenwechsel)
- Start-Button: `audioRef.current.play()` + `setCurrentPage(1)`
- Controls auf Vinyl-Seite steuern dasselbe Audio-Element

---

## 🐛 Bug Fix: Herz-Siegel Position

**Aktuell**: Mitte des Umschlags
**Korrekt**: Spitze der Klappe (Siegelpunkt)

```css
.heart-seal {
  top: 48%;  /* Angepasst */
}
```

---

## 🔗 Abhängigkeiten

- `framer-motion` für Seitenübergänge
- Bestehende Komponenten werden in Seiten eingebettet
