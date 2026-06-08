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

const HEARTS = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 6.2 + 3) % 95}%`,
  size: 12 + (i % 4) * 7,
  duration: 4.5 + (i % 5) * 1.2,
  delay: (i * 0.45) % 5,
  opacity: 0.10 + (i % 3) * 0.06,
}))

function FloatingHeart({ left, size, duration, delay, opacity }: typeof HEARTS[0]) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none text-[#FF6B9D]"
      style={{ left, bottom: '-5%', fontSize: size, opacity }}
      animate={{ y: '-115vh', opacity: [opacity, opacity * 0.4, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeOut' }}
    >
      ♡
    </motion.div>
  )
}

function Photo({ src, index }: { src: string; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      style={{ breakInside: 'avoid', marginBottom: '6px', display: 'block', borderRadius: '4px', overflow: 'hidden' }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        style={{ width: '100%', display: 'block' }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{ background: 'linear-gradient(135deg, rgba(255,107,157,0.12), transparent)', position: 'absolute', inset: 0 }}
      />
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
      {HEARTS.map((h, i) => <FloatingHeart key={i} {...h} />)}

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

        {/* CSS columns masonry — photos fill naturally, no gaps */}
        <div style={{ columns: '3 260px', columnGap: '6px' }}>
          {PHOTOS.map((src, i) => (
            <Photo key={i} src={src} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
