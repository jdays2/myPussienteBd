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

// Hearts scattered around all 4 edges — warm pink palette
const EDGE_HEARTS = [
  // top edge
  { x:'4%',  y:'2%',  s:22, c:'#FF6B9D', d:3.2, delay:0    },
  { x:'14%', y:'1%',  s:14, c:'#FFB3CC', d:2.8, delay:0.4  },
  { x:'27%', y:'3%',  s:18, c:'#FF8CB8', d:3.5, delay:0.8  },
  { x:'41%', y:'1%',  s:12, c:'#FFD4E8', d:2.5, delay:0.2  },
  { x:'55%', y:'3%',  s:20, c:'#FF4D6D', d:3.8, delay:0.6  },
  { x:'68%', y:'1%',  s:16, c:'#FF9A8B', d:3.0, delay:1.0  },
  { x:'80%', y:'2%',  s:24, c:'#FFB3CC', d:2.6, delay:0.3  },
  { x:'92%', y:'1%',  s:13, c:'#FF6B9D', d:3.3, delay:0.7  },
  // bottom edge
  { x:'6%',  y:'92%', s:18, c:'#FF8CB8', d:2.9, delay:0.5  },
  { x:'19%', y:'94%', s:22, c:'#FF6B9D', d:3.6, delay:0.1  },
  { x:'33%', y:'92%', s:14, c:'#FFD4E8', d:2.7, delay:0.9  },
  { x:'47%', y:'94%', s:20, c:'#FF4D6D', d:3.1, delay:0.4  },
  { x:'61%', y:'92%', s:16, c:'#FFB3CC', d:2.4, delay:0.8  },
  { x:'74%', y:'94%', s:12, c:'#FF9A8B', d:3.4, delay:0.2  },
  { x:'87%', y:'93%', s:24, c:'#FF6B9D', d:3.0, delay:0.6  },
  // left edge
  { x:'1%',  y:'20%', s:16, c:'#FFB3CC', d:3.2, delay:0.3  },
  { x:'2%',  y:'38%', s:22, c:'#FF6B9D', d:2.8, delay:0.7  },
  { x:'1%',  y:'56%', s:14, c:'#FF9A8B', d:3.5, delay:0.1  },
  { x:'2%',  y:'74%', s:20, c:'#FFD4E8', d:3.0, delay:0.5  },
  // right edge
  { x:'96%', y:'18%', s:20, c:'#FF4D6D', d:2.6, delay:0.4  },
  { x:'95%', y:'36%', s:14, c:'#FFB3CC', d:3.3, delay:0.8  },
  { x:'96%', y:'54%', s:24, c:'#FF6B9D', d:2.9, delay:0.2  },
  { x:'95%', y:'72%', s:16, c:'#FF8CB8', d:3.6, delay:0.6  },
]

function EdgeHeart({ x, y, s, c, d, delay }: typeof EDGE_HEARTS[0]) {
  return (
    <motion.span
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y, fontSize: s, color: c, lineHeight: 1 }}
      animate={{ scale: [1, 1.25, 1], opacity: [0.55, 0.9, 0.55] }}
      transition={{ duration: d, delay, repeat: Infinity, ease: 'easeInOut' }}
    >♡</motion.span>
  )
}

function Photo({ src, index }: { src: string; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06, transition: { duration: 0.18 } }}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        aspectRatio: '1 / 1',
        boxShadow: '0 4px 20px rgba(255,107,157,0.18), 0 2px 8px rgba(0,0,0,0.45)',
        border: '1.5px solid rgba(255,180,210,0.2)',
        cursor: 'pointer',
      }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
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
        style={{ whiteSpace: 'pre-line' }}>{text}</p>
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
    <section className="py-28 px-8 relative overflow-hidden" style={{ background: '#0d0d18' }}>
      {/* Hearts around all edges */}
      {EDGE_HEARTS.map((h, i) => <EdgeHeart key={i} {...h} />)}

      {/* Warm glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,107,157,0.07) 0%, transparent 70%)' }} />

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

        {/* 2 rows × 5 photos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
          {PHOTOS.slice(0, 10).map((src, i) => <Photo key={i} src={src} index={i} />)}
        </div>

        <NoteBlock text={r.note} />
      </div>
    </section>
  )
}
