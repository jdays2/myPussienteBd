import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../LangContext'

export default function Goodbye() {
  const { t } = useLang()
  const g = t.goodbye
  const ref = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (inView) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [inView])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#0a0a12', minHeight: '140svh' }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src="/video/IMG_3610.MOV"
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.75, objectPosition: 'center 40%' }}
      />

      {/* Top fade only — less aggressive */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0a0a12 0%, transparent 12%, transparent 82%, #0a0a12 100%)',
        }}
      />

      {/* Light vignette on sides */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 55%, rgba(10,10,18,0.4) 100%)',
        }}
      />

      {/* Text — pinned to top so video of people shows below */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center gap-5 pt-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-inter text-white/30 text-xs tracking-[0.4em] uppercase"
        >
          {g.label}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-playfair text-white/90 text-3xl md:text-4xl max-w-xl"
          style={{ textShadow: '0 2px 32px rgba(0,0,0,0.9)' }}
        >
          {g.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.85 }}
          className="font-dancing text-[#FF6B9D] text-2xl md:text-3xl leading-relaxed max-w-lg"
          style={{ whiteSpace: 'pre-line', textShadow: '0 2px 24px rgba(0,0,0,0.9)' }}
        >
          {g.sub}
        </motion.p>

        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
          className="font-inter text-white/20 text-xs tracking-widest uppercase mt-2"
        >
          {g.caption}
        </motion.span>
      </div>
    </section>
  )
}
