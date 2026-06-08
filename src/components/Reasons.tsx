import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../LangContext'

function FlipCard({ icon, num, back, delay }: { icon: string; num: string; back: string; delay: number }) {
  const [flipped, setFlipped] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { t } = useLang()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="h-52 cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="card-face absolute inset-0 glass rounded-2xl flex flex-col items-center justify-center gap-3" style={{ backfaceVisibility: 'hidden' }}>
          <span className="text-3xl">{icon}</span>
          <span className="font-playfair text-4xl font-bold" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{num}</span>
          <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">{t.reasons.hint.split(' ')[0]}</span>
        </div>
        <div className="card-face absolute inset-0 rounded-2xl flex items-center justify-center p-5 text-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, rgba(255,107,157,0.18), rgba(255,208,96,0.10))', border: '1px solid rgba(255,107,157,0.25)' }}>
          <p className="font-playfair italic text-white/90 text-base leading-relaxed">{back}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Reasons() {
  const { t } = useLang()
  const r = t.reasons
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section className="py-28 px-6 relative" style={{ background: '#0d0d18' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(255,107,157,0.04) 0%, transparent 70%)' }} />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div ref={titleRef} initial={{ opacity: 0, y: 30 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }} className="text-center mb-16">
          <p className="text-[#FF6B9D] text-xs tracking-[0.4em] uppercase mb-4">{r.label}</p>
          <h2 className="font-playfair text-5xl md:text-6xl text-white mb-4">{r.title}</h2>
          <p className="text-white/30 font-inter text-sm">{r.hint}</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {r.items.map((back, i) => (
            <FlipCard key={`${i}-${back}`} icon={r.icons[i]} num={`0${i + 1}`} back={back} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
