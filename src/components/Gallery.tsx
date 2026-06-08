import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLang } from '../LangContext'

function Polaroid({ caption, rotation, delay, index }: { caption: string; rotation: number; delay: number; index: number }) {
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
      <div className="bg-white shadow-2xl" style={{ padding: '10px 10px 32px', boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)' }}>
        <div className="w-48 h-52 relative overflow-hidden" style={{ background: `linear-gradient(135deg, hsl(${(index * 47 + 300) % 360},40%,25%), hsl(${(index * 47 + 340) % 360},50%,35%))` }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-30">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="4" stroke="white" strokeWidth="1.5" />
            </svg>
            <span className="text-white text-[10px] tracking-widest uppercase">your photo</span>
          </div>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)' }} />
        </div>
        <p className="text-center mt-2 text-gray-500 font-dancing" style={{ fontSize: '13px' }}>{caption}</p>
      </div>
    </motion.div>
  )
}

const rotations = [-3, 2, -1.5, 3, -2, 1.5]

export default function Gallery() {
  const { t } = useLang()
  const g = t.gallery
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section className="py-28 px-6 bg-[#0a0a12] relative">
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #0a0a12, transparent)' }} />
      <div className="max-w-5xl mx-auto">
        <motion.div ref={titleRef} initial={{ opacity: 0, y: 30 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }} className="text-center mb-20">
          <p className="text-[#FFD060] text-xs tracking-[0.4em] uppercase mb-4">{g.label}</p>
          <h2 className="font-playfair text-5xl md:text-6xl text-white">{g.title}</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 place-items-center">
          {g.captions.map((caption, i) => (
            <Polaroid key={i} caption={caption} rotation={rotations[i]} delay={i * 0.1} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
