import { useEffect, useMemo, useRef } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import './CelebrationPage.css';

interface CelebrationPageProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const TEXT_COUNT = 70;
const BG_COUNT = 180;

const CelebrationPage = ({ audioRef }: CelebrationPageProps) => {
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const envelopeRef = useRef<Float32Array | null>(null);

  const burstHearts = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => {
      const angle = (i / 30) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const distance = 100 + Math.random() * 250;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 14 + Math.random() * 24,
        delay: Math.random() * 0.35,
        rotation: Math.random() * 360,
      };
    }), []
  );

  const fallingTexts = useMemo(() =>
    Array.from({ length: TEXT_COUNT }, (_, i) => {
      const depth = Math.random();
      return {
        id: i,
        left: -8 + Math.random() * 116,
        delay: Math.random() * 25,
        duration: 18 - depth * 13,
        fontSize: 2 + depth * depth * 34,
        bloom: 4 + depth * 12,
        blur: depth < 0.15 ? 0.8 : 0,
      };
    }), []
  );

  const bgTexts = useMemo(() =>
    Array.from({ length: BG_COUNT }, (_, i) => {
      const size = 2 + Math.random() * 10;
      return {
        id: i,
        left: -5 + Math.random() * 110,
        delay: Math.random() * 30,
        duration: 18 + Math.random() * 18,
        fontSize: size,
        opacity: 0.02 + Math.random() * 0.06,
      };
    }), []
  );

  // Pre-render Audio Envelope
  useEffect(() => {
    const songUrl = `${import.meta.env.BASE_URL}song.mp3`;
    fetch(songUrl)
      .then(res => res.arrayBuffer())
      .then(buf => {
        const offCtx = new OfflineAudioContext(1, 1, 44100);
        return offCtx.decodeAudioData(buf);
      })
      .then(audioBuf => {
        const ch = audioBuf.getChannelData(0);
        const rate = audioBuf.sampleRate;
        const chunk = Math.floor(rate / 20);
        const n = Math.ceil(ch.length / chunk);
        const env = new Float32Array(n);
        let max = 0;
        for (let i = 0; i < n; i++) {
          const s = i * chunk;
          const e = Math.min(s + chunk, ch.length);
          let sq = 0;
          for (let j = s; j < e; j++) sq += ch[j] * ch[j];
          const rms = Math.sqrt(sq / (e - s));
          env[i] = rms;
          if (rms > max) max = rms;
        }
        if (max > 0) for (let i = 0; i < n; i++) env[i] /= max;
        envelopeRef.current = env;
      })
      .catch(e => console.warn('Audio pre-analysis failed:', e));
  }, []);

  // Nur opacity animieren — compositor-only, null Repaints, null Flackern
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    let rafId: number;
    let lastIdx = -1;

    const triggerGlow = (ri: number, isChorus: boolean) => {
      const el = textRefs.current[ri];
      if (!el) return;
      const dur = isChorus ? 2200 : 1800;
      el.animate([
        { opacity: 1,    offset: 0 },
        { opacity: 1,    offset: 0.35 },
        { opacity: 0.15, offset: 0.7 },
        { opacity: 0.03, offset: 1 },
      ], { duration: dur, easing: 'ease-out' });
    };

    const triggerBgGlow = (ri: number) => {
      const el = bgRefs.current[ri];
      if (!el) return;
      el.animate([
        { opacity: 0.35, offset: 0 },
        { opacity: 0.25, offset: 0.3 },
        { opacity: 0.08, offset: 0.7 },
      ], { duration: 1600, easing: 'ease-out' });
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const env = envelopeRef.current;
      if (!env || audio.paused) return;

      const t = audio.currentTime;
      const idx = Math.floor(t * 20);
      if (idx === lastIdx || idx < 0 || idx >= env.length) return;
      lastIdx = idx;

      const delta = env[idx] - (idx > 0 ? env[idx - 1] : 0);
      const isChorus = t >= 36;
      const threshold = isChorus ? 0.015 : 0.03;

      if (delta > threshold) {
        const strength = Math.min(delta / 0.15, 1);
        const count = isChorus
          ? 3 + Math.floor(strength * 7)
          : 1 + Math.floor(strength * 3);

        for (let j = 0; j < count; j++) {
          const ri = Math.floor(Math.random() * TEXT_COUNT);
          triggerGlow(ri, isChorus);
        }

        // BG glow: wenige vor Chorus, viele im Chorus
        const bgCount = isChorus
          ? 4 + Math.floor(strength * 12)
          : Math.random() < 0.4 ? 1 : 0;
        for (let j = 0; j < bgCount; j++) {
          triggerBgGlow(Math.floor(Math.random() * BG_COUNT));
        }
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafId); };
  }, [audioRef]);

  return (
    <div className="celebration-page">
      {/* Heart Burst */}
      <div className="heart-burst">
        {burstHearts.map((h) => (
          <motion.div
            key={h.id}
            className="burst-heart"
            initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0.3],
              x: h.x, y: h.y, rotate: h.rotation,
            }}
            transition={{ duration: 2.2, delay: h.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontSize: h.size }}
          >
            &#10084;
          </motion.div>
        ))}
      </div>

      {/* Background Text Dust */}
      <div className="falling-text-container falling-bg-layer">
        {bgTexts.map((t, i) => (
          <div
            key={t.id}
            ref={el => { bgRefs.current[i] = el; }}
            className="falling-text-bg"
            style={{
              left: `${t.left}%`,
              animationDelay: `${t.delay}s`,
              animationDuration: `${t.duration}s`,
              fontSize: `${t.fontSize}px`,
              opacity: t.opacity,
            }}
          >
            Fall in love again and again
          </div>
        ))}
      </div>

      {/* Falling Text Rain */}
      <div className="falling-text-container">
        {fallingTexts.map((t, i) => (
          <div
            key={t.id}
            ref={el => { textRefs.current[i] = el; }}
            className="falling-text-item"
            style={{
              left: `${t.left}%`,
              animationDelay: `${t.delay}s`,
              animationDuration: `${t.duration}s`,
              fontSize: `${t.fontSize}px`,
              filter: t.blur > 0 ? `blur(${t.blur}px)` : undefined,
              '--bloom': `${t.bloom}px`,
            } as React.CSSProperties}
          >
            Fall in love again and again
          </div>
        ))}
      </div>

      {/* Center Content — Letter */}
      <motion.div
        className="celebration-content"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.2, type: "spring", stiffness: 100 }}
      >
        <motion.div
          className="cel-heart"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.6, stiffness: 150, damping: 10 }}
        >
          <Heart size={60} fill="currentColor" strokeWidth={0} />
        </motion.div>

        <motion.div
          className="cel-letter"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.2 }}
        >
          <p className="cel-letter-greeting">Moja Ljubavi</p>
          <p className="cel-letter-body">
            Am Sonntag gehörst du nur mir, mir ganz alleine.
          </p>
          <p className="cel-letter-body">
            Zieh dich schick an und mach dich schön,
            ich hole dich um 18:00 ab und schenke dir einen
            wunderschönen romantischen Abend, nur für uns zwei.
          </p>
          <p className="cel-letter-body">
            Du bist die Liebe meines Lebens und ich möchte dass du
            weißt, dass ich dich für immer lieben werde.
          </p>
          <p className="cel-letter-sign">dein Melihcan &#10084;</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CelebrationPage;
