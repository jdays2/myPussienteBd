import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLang } from '../LangContext'

const GHOSTS = [
  'haha nope', "can't catch me 😏", 'whoosh!', 'hehehehe',
  'try again', "i'm faster", 'no no no', 'not a chance',
  'miss~', 'too slow', 'ha!', 'gone!',
]

const PAD_X  = 14   // % from sides
const Y_MIN  = 54   // % from top
const Y_MAX  = 86   // % from bottom
const TRIGGER  = 90  // px — distance to trigger teleport
const COOLDOWN = 320 // ms between teleports

const randomPos = (exclude: { x: number; y: number }) => {
  let x: number, y: number
  let attempts = 0
  do {
    x = PAD_X + Math.random() * (100 - PAD_X * 2)
    y = Y_MIN  + Math.random() * (Y_MAX - Y_MIN)
    attempts++
    // Retry until new pos is far enough on both axes (or we give up after 20 tries)
  } while (attempts < 20 && (Math.abs(x - exclude.x) < 25 || Math.abs(y - exclude.y) < 15))
  return { x, y }
}

interface Ghost { id: number; text: string; x: number; y: number }

export default function BreakUp() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const titleRef    = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const { t } = useLang()
  const b = t.breakup

  const [pos, setPos]       = useState({ x: 50, y: 68 })
  const [ghosts, setGhosts] = useState<Ghost[]>([])

  // posRef mirrors pos state so onMouseMove reads current value without stale closure
  const posRef       = useRef({ x: 50, y: 68 })
  const ghostIdx     = useRef(0)
  const msgIdx       = useRef(0)
  const lastTeleport = useRef(0)
  const timers       = useRef<ReturnType<typeof setTimeout>[]>([])

  // Clear all pending ghost timers on unmount
  useEffect(() => () => { timers.current.forEach(clearTimeout) }, [])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const section = sectionRef.current
    if (!section) return

    // Cooldown check before any expensive work
    const now = Date.now()
    if (now - lastTeleport.current < COOLDOWN) return

    const rect = section.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top

    // Use ref to get current position — avoids stale closure in callback
    const prev = posRef.current
    const bx   = (prev.x / 100) * rect.width
    const by   = (prev.y / 100) * rect.height
    const dist = Math.sqrt((mx - bx) ** 2 + (my - by) ** 2)

    if (dist > TRIGGER) return

    lastTeleport.current = now

    const newPos = randomPos(prev)
    posRef.current = newPos
    setPos(newPos)

    // Ghost at old position — all side effects here, NOT inside a state updater
    const text = GHOSTS[msgIdx.current % GHOSTS.length]
    msgIdx.current++
    const id = ++ghostIdx.current

    setGhosts(g => [...g, { id, text, x: prev.x, y: prev.y }])

    const timer = setTimeout(
      () => setGhosts(g => g.filter(gh => gh.id !== id)),
      1200,
    )
    timers.current.push(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative overflow-hidden select-none"
      style={{ background: '#0a0a12', height: '520px' }}
    >
      {/* Top fade */}
      <div
        className="absolute top-0 inset-x-0 h-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #0a0a12, transparent)' }}
      />

      {/* Divider */}
      <div className="absolute top-0 inset-x-0 flex items-center px-12 pt-10 gap-4 z-10 pointer-events-none">
        <div className="flex-1 h-px bg-white/5" />
        <motion.span
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="font-dancing text-white/25 text-xl"
        >
          {b.label}
        </motion.span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Text */}
      <div
        ref={titleRef}
        className="absolute top-16 inset-x-0 flex flex-col items-center gap-4 px-6 z-10 pointer-events-none"
      >
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-playfair text-white/75 text-3xl md:text-4xl text-center"
        >
          {b.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-inter text-white/40 text-base text-center max-w-md"
        >
          {b.sub}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="font-inter text-white/25 text-sm tracking-widest uppercase"
        >
          {b.hint}
        </motion.p>
      </div>

      {/* Button
          Outer div: handles position only (plain CSS, no framer-motion interference)
          Inner motion.div: handles entrance opacity/scale only              */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left:      `${pos.x}%`,
          top:       `${pos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={titleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{
            opacity: { duration: 0.5, delay: 1 },
            scale:   { duration: 0.5, delay: 1 },
          }}
          className="px-7 py-3.5 rounded-full font-inter text-base tracking-wide whitespace-nowrap"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border:     '1px solid rgba(255,255,255,0.12)',
            color:      'rgba(255,255,255,0.45)',
          }}
        >
          {b.btn}
        </motion.div>
      </div>

      {/* Ghost messages */}
      <AnimatePresence>
        {ghosts.map(gh => (
          <motion.span
            key={gh.id}
            initial={{ opacity: 0.9, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -28, scale: 0.85 }}
            exit={{}}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute font-dancing text-[#FF6B9D] text-lg pointer-events-none z-20 whitespace-nowrap"
            style={{
              left:      `${gh.x}%`,
              top:       `${gh.y}%`,
              transform: 'translate(-50%, -120%)',
            }}
          >
            {gh.text}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Spoiler */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={titleInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 inset-x-0 text-center font-inter text-white/20 text-sm pointer-events-none"
      >
        {b.spoiler}
      </motion.p>
    </section>
  )
}
