import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../LangContext'

const BASE = import.meta.env.BASE_URL

const PHOTOS = [
  `${BASE}gallery/solo/photo_1_2026-06-08_18-45-35.jpg`,
  `${BASE}gallery/solo/photo_2_2026-06-08_18-45-35.jpg`,
  `${BASE}gallery/solo/photo_3_2026-06-08_18-45-35.jpg`,
  `${BASE}gallery/solo/photo_4_2026-06-08_18-45-35.jpg`,
  `${BASE}gallery/solo/photo_5_2026-06-08_18-45-35.jpg`,
  `${BASE}gallery/solo/photo_6_2026-06-08_18-45-35.jpg`,
  `${BASE}gallery/solo/photo_7_2026-06-08_18-45-35.jpg`,
  `${BASE}gallery/solo/photo_8_2026-06-08_18-45-35.jpg`,
  `${BASE}gallery/solo/photo_9_2026-06-08_18-45-35.jpg`,
  `${BASE}gallery/solo/photo_10_2026-06-08_18-45-35.jpg`,
  `${BASE}gallery/solo/photo_11_2026-06-08_18-45-35.jpg`,
]

const ROTATIONS = [-3, 1.5, -2, 2.5, -1, 3, -2.5, 1, -1.5, 2, -0.5]

// Background hearts — rise from bottom, behind photos
const BG_HEARTS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7.1 + 3) % 95}%`,
  size: 10 + (i % 4) * 6,
  duration: 5 + (i % 5) * 1.3,
  delay: (i * 0.5) % 5,
  opacity: 0.08 + (i % 3) * 0.05,
}))

// Foreground hearts — float over the grid, more visible
const FG_HEARTS = Array.from({ length: 8 }, (_, i) => ({
  left: `${10 + i * 11}%`,
  top: `${25 + (i % 3) * 22}%`,
  size: 14 + (i % 3) * 8,
  duration: 3 + (i % 4) * 0.8,
  delay: i * 0.6,
  opacity: 0.18 + (i % 3) * 0.08,
}))

function BgHeart({ left, size, duration, delay, opacity }: typeof BG_HEARTS[0]) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none text-[#FF6B9D]"
      style={{ left, bottom: '-5%', fontSize: size, opacity, zIndex: 0 }}
      animate={{ y: '-115vh', opacity: [opacity, opacity * 0.4, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeOut' }}
    >♡</motion.div>
  )
}

function FgHeart({ left, top, size, duration, delay, opacity }: typeof FG_HEARTS[0]) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none text-[#FF6B9D]"
      style={{ left, top, fontSize: size, zIndex: 20 }}
      animate={{
        y: [0, -18, 0],
        opacity: [opacity, opacity * 1.4, opacity],
        scale: [1, 1.15, 1],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >♡</motion.div>
  )
}

function Polaroid({ src, rotation, delay, index }: {
  src: string; rotation: number; delay: number; index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const fromX = index % 2 === 0 ? -30 : 30

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden:  { opacity: 0, y: 36, x: fromX, rotate: rotation - 4 },
        visible: { opacity: 1, y: 0, x: 0, rotate: rotation,
                   transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] } },
        hover:   { scale: 1.1, rotate: 0,
                   transition: { duration: 0.18, ease: 'easeOut' } },
      }}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover="hover"
      className="cursor-pointer relative z-10"
      style={{ transformOrigin: 'center center' }}
    >
      <div
        className="bg-white"
        style={{ padding: '7px', boxShadow: '0 6px 28px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)' }}
      >
        <div className="w-36 h-40 overflow-hidden">
          <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      </div>
    </motion.div>
  )
}

function NoteBlock({ text }: { text: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="mt-20 max-w-2xl mx-auto text-center"
    >
      <div className="w-12 h-px bg-white/10 mx-auto mb-8" />
      <p className="font-playfair italic text-white/60 text-lg md:text-xl leading-relaxed"
        style={{ whiteSpace: 'pre-line' }}
      >{text}</p>
      <div className="w-12 h-px bg-white/10 mx-auto mt-8" />
    </motion.div>
  )
}

export default function Reasons() {
  const { t } = useLang()
  const r = t.reasons
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section className="py-28 px-6 relative overflow-hidden" style={{ background: '#0d0d18' }}>
      {/* Background hearts — behind everything */}
      {BG_HEARTS.map((h, i) => <BgHeart key={i} {...h} />)}

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,107,157,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <p className="text-[#FF6B9D] text-xs tracking-[0.4em] uppercase mb-4">{r.label}</p>
          <h2 className="font-playfair text-5xl md:text-6xl text-white mb-3">{r.title}</h2>
          <p className="font-playfair italic text-white/30 text-lg">{r.sub}</p>
        </motion.div>

        {/* Photo grid with foreground hearts over it */}
        <div className="relative">
          {/* Foreground hearts — float over photos */}
          {FG_HEARTS.map((h, i) => <FgHeart key={i} {...h} />)}

          <div className="flex flex-wrap justify-center" style={{ gap: '5px' }}>
            {PHOTOS.map((src, i) => (
              <Polaroid key={i} src={src} rotation={ROTATIONS[i]} delay={i * 0.07} index={i} />
            ))}
          </div>
        </div>

        <NoteBlock text={r.note} />
      </div>
    </section>
  )
}
