import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useLang } from '../LangContext'

function Heart({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute select-none pointer-events-none"
      style={style}
      animate={{ y: [-10, -90], opacity: [0.8, 0] }}
      transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3, ease: 'easeOut' }}
    >♡</motion.div>
  )
}

const hearts = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7.3) % 100}%`, bottom: '10%',
  color: i % 2 === 0 ? '#FF6B9D' : '#FFD060',
  fontSize: `${14 + (i % 4) * 6}px`,
}))

const fireConfetti = () => {
  const fire = (opts: confetti.Options) => confetti({ particleCount: 80, spread: 70, colors: ['#FF6B9D', '#FFD060', '#ffffff', '#FFB3CC', '#FF8CB8'], ...opts })
  fire({ origin: { x: 0.25, y: 0.6 }, angle: 60 })
  fire({ origin: { x: 0.75, y: 0.6 }, angle: 120 })
  setTimeout(() => fire({ origin: { x: 0.5, y: 0.55 }, particleCount: 120, spread: 90 }), 400)
  setTimeout(() => { fire({ origin: { x: 0.2, y: 0.7 }, angle: 75 }); fire({ origin: { x: 0.8, y: 0.7 }, angle: 105 }) }, 900)
}

export default function Finale() {
  const { t } = useLang()
  const f = t.finale
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [fired, setFired] = useState(false)

  useEffect(() => {
    if (!inView || fired) return
    setFired(true)
    const t1 = setTimeout(fireConfetti, 300)
    return () => clearTimeout(t1)
  }, [inView, fired])

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #080810 0%, #0f0820 50%, #0a0a12 100%)' }}>
      {hearts.map((h, i) => <Heart key={i} style={h} />)}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 50% 60%, rgba(255,107,157,0.10) 0%, transparent 70%)' }} />

      <div className="relative z-10 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.2 }} className="text-[#FFD060] text-xs tracking-[0.45em] uppercase mb-6">
          {f.label}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.88 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-dancing glow-pink mb-6"
          style={{ fontSize: 'clamp(3.2rem, 11vw, 7.5rem)', lineHeight: 1.1, color: '#fff' }}
        >
          {f.titleLine1}
          <br />
          <span className="text-gradient">{f.accent}</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.9 }} className="font-playfair italic text-white/40 text-lg mb-14">
          {f.tagline}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
          onClick={fireConfetti}
          className="px-10 py-4 rounded-full font-inter text-sm tracking-widest uppercase text-white"
          style={{ background: 'linear-gradient(135deg, #FF6B9D, #FF8CB8)', boxShadow: '0 0 40px rgba(255,107,157,0.35), 0 0 80px rgba(255,107,157,0.15)' }}
        >
          {f.button}
        </motion.button>
      </div>
    </section>
  )
}
