import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LangProvider } from './LangContext'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Reasons from './components/Reasons'
import Letter from './components/Letter'
import Finale from './components/Finale'
import Goodbye from './components/Goodbye'
import BreakUp from './components/BreakUp'
import { playlist } from './playlist'

// ── localStorage helpers ────────────────────────────────────────────────────
const ls = {
  get<T>(key: string, fallback: T): T {
    try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) as T : fallback }
    catch { return fallback }
  },
  set(key: string, value: unknown) {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  },
}

function ControlBar() {
  const audioRef  = useRef<HTMLAudioElement>(null)

  const [volume,   setVolume]   = useState(() => ls.get('bd_volume',   0.35))
  const [muted,    setMuted]    = useState(() => ls.get('bd_muted',    false))
  const [trackIdx, setTrackIdx] = useState(() => ls.get('bd_track',    0))
  const [started,  setStarted]  = useState(false)
  const [playing,  setPlaying]  = useState(false)

  // Persist to localStorage
  useEffect(() => { ls.set('bd_volume',   volume)   }, [volume])
  useEffect(() => { ls.set('bd_muted',    muted)    }, [muted])
  useEffect(() => { ls.set('bd_track',    trackIdx) }, [trackIdx])
  useEffect(() => { ls.set('bd_paused',   !playing) }, [playing])

  const currentTrack = playlist[trackIdx] ?? playlist[0]
  const hasMultiple  = playlist.length > 1

  const startAudio = useCallback(() => {
    const audio = audioRef.current
    if (!audio || started) return
    const wasPaused = ls.get('bd_paused', false)
    audio.volume = muted ? 0 : volume
    if (!wasPaused) {
      audio.play().then(() => { setStarted(true); setPlaying(true) }).catch(() => {})
    } else {
      setStarted(true)
    }
  }, [started, volume, muted])

  useEffect(() => {
    window.addEventListener('click',  startAudio, { once: true })
    window.addEventListener('scroll', startAudio, { once: true })
    return () => {
      window.removeEventListener('click',  startAudio)
      window.removeEventListener('scroll', startAudio)
    }
  }, [startAudio])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume
  }, [volume, muted])

  // When track changes — reload and resume if playing
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.load()
    if (started && playing) audio.play().then(() => setPlaying(true)).catch(() => {})
  }, [trackIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (!started) { startAudio(); return }
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}) }
  }

  const nextTrack = () => setTrackIdx(i => (i + 1) % playlist.length)
  const prevTrack = () => setTrackIdx(i => (i - 1 + playlist.length) % playlist.length)

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    setMuted(v === 0)
  }

  const toggleMute = () => { setMuted(m => !m); startAudio() }

  const volumeIcon = muted || volume === 0 ? '🔇' : volume < 0.4 ? '🔉' : '🔊'

  return (
    <>
      <audio ref={audioRef} src={currentTrack.src} preload="auto" onEnded={nextTrack} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
        }}
      >
        {hasMultiple && (
          <motion.button onClick={prevTrack} whileTap={{ scale: 0.85 }}
            className="text-white/30 hover:text-white/60 transition-colors leading-none px-0.5"
          >‹</motion.button>
        )}

        <motion.button onClick={togglePlay} whileTap={{ scale: 0.85 }}
          className="flex items-center justify-center w-5 h-5 select-none"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={playing ? 'pause' : 'play'}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="block text-sm leading-none"
            >
              {playing ? '⏸' : '▶'}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.span
            key={trackIdx}
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.2 }}
            className="font-inter text-[10px] max-w-[90px] truncate"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            {currentTrack.label}
          </motion.span>
        </AnimatePresence>

        {hasMultiple && (
          <motion.button onClick={nextTrack} whileTap={{ scale: 0.85 }}
            className="text-white/30 hover:text-white/60 transition-colors leading-none px-0.5"
          >›</motion.button>
        )}

        <div className="w-px h-3.5 bg-white/15 mx-0.5" />

        <motion.button onClick={toggleMute} whileTap={{ scale: 0.88 }}
          className="text-sm leading-none select-none"
          style={{ color: muted ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)' }}
        >
          {volumeIcon}
        </motion.button>

        <input
          type="range" min={0} max={1} step={0.01}
          value={muted ? 0 : volume}
          onChange={handleVolume}
          className="volume-slider"
        />
      </motion.div>
    </>
  )
}

function Site() {
  return (
    <main>
      <Hero />
      <Gallery />
      <Reasons />
      <Letter />
      <Finale />
      <Goodbye />
      <BreakUp />
      <ControlBar />
    </main>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  )
}
