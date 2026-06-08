import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLang } from '../LangContext'

const PHOTOS = [
  '/gallery/us/photo_1_2026-06-08_18-44-49.jpg',
  '/gallery/us/photo_2_2026-06-08_18-44-49.jpg',
  '/gallery/us/photo_3_2026-06-08_18-44-49.jpg',
  '/gallery/us/photo_4_2026-06-08_18-44-49.jpg',
  '/gallery/us/photo_5_2026-06-08_18-44-49.jpg',
  '/gallery/us/photo_6_2026-06-08_18-44-49.jpg',
  '/gallery/us/photo_7_2026-06-08_18-44-49.jpg',
  '/gallery/us/photo_8_2026-06-08_18-44-49.jpg',
  '/gallery/us/photo_9_2026-06-08_18-44-49.jpg',
  '/gallery/us/photo_10_2026-06-08_18-44-49.jpg',
]

const ROTATIONS = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 1, -1, 2.5]

function Polaroid({ src, caption, rotation, delay, index }: {
  src: string; caption: string; rotation: number; delay: number; index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const fromX = index % 2 === 0 ? -60 : 60

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, x: fromX, rotate: rotation - 4 }}
      animate={inView ? { opacity: 1, y: 0, x: 0, rotate: rotation } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
      className="cursor-pointer"
      style={{ transformOrigin: 'center bottom' }}
    >
      <div
        className="bg-white shadow-2xl"
        style={{ padding: '10px 10px 32px', boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)' }}
      >
        <div className="w-48 h-52 overflow-hidden">
          <img
            src={src}
            alt={caption}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <p className="text-center mt-2 text-gray-500 font-dancing" style={{ fontSize: '13px' }}>
          {caption}
        </p>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const { t } = useLang()
  const g = t.gallery
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 place-items-center">
          {PHOTOS.map((src, i) => (
            <Polaroid
              key={i}
              src={src}
              caption={g.captions[i] ?? '♡'}
              rotation={ROTATIONS[i]}
              delay={i * 0.1}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
