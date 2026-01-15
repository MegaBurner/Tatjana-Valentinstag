# 🎵 Audio Controls Update

## 📋 Übersicht

Erweiterung der VinylRecord-Komponente mit vollständigen Audio-Kontrollen: Autoplay (muted), Rewind, Play/Pause Toggle und Lautstärke-Slider.

---

## 🎯 Anforderungen

| Feature | Beschreibung |
|---------|--------------|
| **Autoplay** | Musik startet automatisch (muted wegen Browser-Policy) |
| **Rewind** | Zurück zum Anfang des Tracks |
| **Play/Pause** | Toggle-Button |
| **Volume** | Slider für Lautstärke (0-100%) |
| **Unmute** | Button oder erster Klick aktiviert Ton |

---

## ⚠️ Browser Autoplay Policy

> [!CAUTION]
> Moderne Browser blockieren Audio-Autoplay MIT Ton. Die Musik startet IMMER muted. Der User muss:
> - Auf einen "Enable Sound" Button klicken, ODER
> - Irgendwo auf die Seite klicken (erster Klick aktiviert Audio)

---

## 🔧 Technische Umsetzung

### Aktualisierte VinylRecord.tsx

```tsx
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import './VinylRecord.css';

const VinylRecord = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Autoplay
  const [isMuted, setIsMuted] = useState(true);     // Start muted
  const [volume, setVolume] = useState(0.7);

  // Autoplay on mount (muted)
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = true;
      audio.volume = volume;
      audio.play().catch(e => console.log("Autoplay blocked:", e));
    }
  }, []);

  // Handle first page interaction to unmute
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, [isMuted]);

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

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="vinyl-wrapper">
      {/* Vinyl Disc */}
      <motion.div 
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        className="vinyl-record"
      >
        <div className="vinyl-label">
          <div className="vinyl-hole" />
        </div>
      </motion.div>

      {/* Audio Controls */}
      <div className="audio-controls">
        <button onClick={handleRewind} className="control-btn">
          <RotateCcw size={20} />
        </button>
        <button onClick={togglePlay} className="control-btn play-btn">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={toggleMute} className="control-btn">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>

      <audio ref={audioRef} src="/song.mp3" loop />
    </div>
  );
};

export default VinylRecord;
```

---

## 🎨 CSS für Controls

```css
.vinyl-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.audio-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 999px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.control-btn {
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.2s;
}

.control-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.play-btn {
  background: var(--accent-rose-deep);
  color: white;
  padding: 0.75rem;
}

.play-btn:hover {
  background: var(--accent-rose);
}

.volume-slider {
  width: 80px;
  accent-color: var(--accent-rose-deep);
}
```

---

## 🔗 Abhängigkeiten

- `lucide-react` für Icons
- CSS Custom Properties aus `index.css`
