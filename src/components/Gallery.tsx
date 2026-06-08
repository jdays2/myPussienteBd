import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLang } from '../LangContext'

const BASE = import.meta.env.BASE_URL

const PHOTOS = [
  `${BASE}gallery/us/photo_1_2026-06-08_18-44-49.jpg`,
  `${BASE}gallery/us/photo_2_2026-06-08_18-44-49.jpg`,
  `${BASE}gallery/us/photo_3_2026-06-08_18-44-49.jpg`,
  `${BASE}gallery/us/photo_4_2026-06-08_18-44-49.jpg`,
  `${BASE}gallery/us/photo_5_2026-06-08_18-44-49.jpg`,
  `${BASE}gallery/us/photo_6_2026-06-08_18-44-49.jpg`,
  `${BASE}gallery/us/photo_7_2026-06-08_18-44-49.jpg`,
  `${BASE}gallery/us/photo_8_2026-06-08_18-44-49.jpg`,
  `${BASE}gallery/us/photo_9_2026-06-08_18-44-49.jpg`,
  `${BASE}gallery/us/photo_10_2026-06-08_18-44-49.jpg`,
]

const ROTATIONS = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 1, -1, 2.5]

function Polaroid({ src, rotation, delay, index }: {
  src: string; rotation: number; delay: number; index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const fromX = index % 2 === 0 ? -40 : 40

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden:   { opacity: 0, y: 40, x: fromX, rotate: rotation - 4 },
        visible:  { opacity: 1, y: 0, x: 0, rotate: rotation,
                    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] } },
        hover:    { scale: 1.1, rotate: 0,
                    transition: { duration: 0.18, ease: 'easeOut' } },
      }}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover="hover"
      className="cursor-pointer"
      style={{ transformOrigin: 'center center' }}
    >
      <div
        className="bg-white"
        style={{ padding: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)' }}
      >
        <div className="w-40 h-44 overflow-hidden">
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const { t } = useLang()
  const g = t.gallery
  const titleRef = useRef(null)
  const quoteRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const quoteInView = useInView(quoteRef, { once: true, margin: '-60px' })

  return (
    <section className="py-28 px-6 bg-[#0a0a12] relative">
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0a0a12, transparent)' }} />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <p className="text-[#FFD060] text-xs tracking-[0.4em] uppercase mb-4">{g.label}</p>
          <h2 className="font-playfair text-5xl md:text-6xl text-white">{g.title}</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center" style={{ gap: '6px' }}>
          {PHOTOS.map((src, i) => (
            <Polaroid
              key={i}
              src={src}
              rotation={ROTATIONS[i]}
              delay={i * 0.08}
              index={i}
            />
          ))}
        </div>

        {/* Quote below collage */}
        <motion.p
          ref={quoteRef}
          initial={{ opacity: 0, y: 24 }}
          animate={quoteInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-playfair italic text-white/55 text-lg md:text-xl text-center leading-relaxed mt-16 max-w-2xl mx-auto"
          style={{ whiteSpace: 'pre-line' }}
        >
          {g.quote}
        </motion.p>
      </div>
    </section>
  )
}
