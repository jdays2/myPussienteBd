import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../LangContext'

function useTypewriter(fullText: string, started: boolean, speed = 28) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!started) return
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      i++
      setDisplayed(fullText.slice(0, i))
      if (i >= fullText.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [started, fullText, speed])
  return displayed
}

export default function Letter() {
  const { t } = useLang()
  const l = t.letter
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const displayed = useTypewriter(l.body, inView)

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-28 relative" style={{ background: '#080810' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255,208,96,0.05) 0%, transparent 70%)' }} />
      <div className="max-w-2xl w-full relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={inView ? { opacity: 1, scaleX: 1 } : {}} transition={{ duration: 1 }} className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#FFD060]/40" />
          <span className="text-[#FFD060]/60 text-lg">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#FFD060]/40" />
        </motion.div>

        <div className="glass rounded-3xl p-10 md:p-14 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-[#FF6B9D]/20 font-dancing text-5xl select-none" aria-hidden>♡</div>
          <p className="text-white/25 text-xs tracking-[0.35em] uppercase mb-8 font-inter">{l.label}</p>
          <p className="font-playfair text-lg md:text-xl leading-[1.9] text-white/85 whitespace-pre-line min-h-[280px]" style={{ letterSpacing: '0.01em' }}>
            {displayed}
            {displayed.length < l.body.length && (
              <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.7 }} className="inline-block w-0.5 h-5 bg-[#FF6B9D] ml-0.5 align-middle" />
            )}
          </p>
        </div>

        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={inView ? { opacity: 1, scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.3 }} className="flex items-center gap-4 mt-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#FF6B9D]/30" />
          <span className="text-[#FF6B9D]/40 text-sm font-dancing">{l.closing}</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#FF6B9D]/30" />
        </motion.div>
      </div>
    </section>
  )
}
