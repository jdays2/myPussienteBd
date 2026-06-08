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

function ControlBar({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) {
  const [volume,   setVolume]   = useState(() => ls.get('bd_volume',   0.35))
  const [muted,    setMuted]    = useState(() => ls.get('bd_muted',    false))
  const [trackIdx, setTrackIdx] = useState(() => ls.get('bd_track',    0))
  const [playing,  setPlaying]  = useState(true)

  // Persist to localStorage
  useEffect(() => { ls.set('bd_volume',   volume)   }, [volume])
  useEffect(() => { ls.set('bd_muted',    muted)    }, [muted])
  useEffect(() => { ls.set('bd_track',    trackIdx) }, [trackIdx])
  useEffect(() => { ls.set('bd_paused',   !playing) }, [playing])

  const currentTrack = playlist[trackIdx] ?? playlist[0]
  const hasMultiple  = playlist.length > 1

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume
  }, [volume, muted]) // eslint-disable-line react-hooks/exhaustive-deps

  // When track changes — reload src and resume
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = currentTrack.src
    audio.load()
    if (playing) audio.play().then(() => {}).catch(() => {})
  }, [trackIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}) }
  }

  const nextTrack = () => setTrackIdx(i => (i + 1) % playlist.length)
  const prevTrack = () => setTrackIdx(i => (i - 1 + playlist.length) % playlist.length)

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    setMuted(v === 0)
    if (audioRef.current) audioRef.current.volume = v
  }

  const toggleMute = () => {
    const next = !muted
    setMuted(next)
    if (audioRef.current) audioRef.current.volume = next ? 0 : volume
  }

  const volumeIcon = muted || volume === 0 ? '🔇' : volume < 0.4 ? '🔉' : '🔊'

  // Wire onEnded to advance track
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.addEventListener('ended', nextTrack)
    return () => audio.removeEventListener('ended', nextTrack)
  }, [trackIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
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

const BIRTHDAY_DAYS = [{ month: 6, day: 8 }, { month: 6, day: 9 }]

const OTHER_MESSAGES = [
  { label: '✦  hey you  ✦',  q: 'Came to check\nsomething?',          sub: 'Do you still love your silly boyfriend?',        btn: 'Obviously yes 🙄' },
  { label: '✦  hi  ✦',       q: 'Did this dummy\ndo something again?', sub: 'Come on... do you still love him?',              btn: 'Fine, yes 💔' },
  { label: '✦  tell me  ✦',  q: 'Missing him\na little?',              sub: '...it\'s okay if you are.',                      btn: 'Maybe... yes 🥺' },
  { label: '✦  be honest  ✦',q: 'He\'s annoying\nsometimes, right?',   sub: 'But you still love him, don\'t you?',            btn: 'Ugh, yes 😤' },
  { label: '✦  needed a reminder?  ✦', q: 'Just checking\nthat you like this guy?', sub: 'No shame in that.', btn: '...yes ♡' },
  { label: '✦  really?  ✦',  q: 'Not tired\nof him yet?',              sub: 'Somehow he\'s still here.',                      btn: 'Not yet 🤍' },
  { label: '✦  psst  ✦',     q: 'Want to feel\nsomething today?',      sub: 'Open it. You know you want to.',                 btn: 'Yes, open it ✦' },
]

function SplashBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="px-10 py-3 rounded-full font-inter text-sm tracking-widest uppercase"
      style={{
        background: 'linear-gradient(135deg, rgba(255,107,157,0.25), rgba(255,107,157,0.1))',
        border: '1px solid rgba(255,107,157,0.4)',
        color: 'rgba(255,255,255,0.8)',
      }}
    >
      {children}
    </motion.button>
  )
}

function Splash({ onEnter }: { onEnter: () => void }) {
  const now = new Date()
  const isBirthday = BIRTHDAY_DAYS.some(d => d.month === now.getMonth() + 1 && d.day === now.getDate())
  const [msg] = useState(() => OTHER_MESSAGES[Math.floor(Math.random() * OTHER_MESSAGES.length)])

  const label = isBirthday ? '✦  today is the day  ✦' : msg.label

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center px-6"
      style={{ background: '#0a0a12' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,157,0.07) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center select-none relative z-10 max-w-lg"
      >
        <p className="text-[#FFD060] text-xs tracking-[0.45em] uppercase mb-10">{label}</p>

        {isBirthday ? (
          <>
            <p className="font-dancing text-white mb-3" style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)' }}>
              Is this <span className="text-gradient font-playfair italic">Mariel</span>?
            </p>
            <p className="font-playfair italic text-white/50 text-lg md:text-xl mb-12">
              Does she love her boyfriend?
            </p>
            <SplashBtn onClick={onEnter}>Yes, so much ♡</SplashBtn>
          </>
        ) : (
          <>
            <p className="font-dancing text-white mb-3" style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)', whiteSpace: 'pre-line' }}>
              {msg.q}
            </p>
            <p className="font-playfair italic text-white/50 text-lg md:text-xl mb-12">{msg.sub}</p>
            <SplashBtn onClick={onEnter}>{msg.btn}</SplashBtn>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

function Site({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) {
  return (
    <main>
      <Hero />
      <Gallery />
      <Reasons />
      <Letter />
      <Finale />
      <Goodbye />
      <BreakUp />
      <ControlBar audioRef={audioRef} />
    </main>
  )
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleEnter = () => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = ls.get('bd_volume', 0.35)
      audio.play().catch(() => {})
    }
    setEntered(true)
  }

  return (
    <LangProvider>
      <audio ref={audioRef} src={playlist[ls.get('bd_track', 0)]?.src ?? playlist[0].src} preload="auto" />
      <AnimatePresence>
        {!entered && <Splash key="splash" onEnter={handleEnter} />}
      </AnimatePresence>
      {entered && <Site audioRef={audioRef} />}
    </LangProvider>
  )
}
