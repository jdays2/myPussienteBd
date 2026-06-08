import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../LangContext'

interface Star {
  x: number; y: number; r: number
  alpha: number; speed: number; vx: number; vy: number
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { t } = useLang()
  const h = t.hero

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const stars: Star[] = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.006 + 0.002,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }))

    const handleMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', handleMouse)

    let frame: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach((s) => {
        s.alpha += s.speed
        if (s.alpha > 1 || s.alpha < 0.2) s.speed *= -1
        const dx = (mouseRef.current.x - canvas.width / 2) * 0.00008
        const dy = (mouseRef.current.y - canvas.height / 2) * 0.00008
        s.x += s.vx + dx; s.y += s.vy + dy
        if (s.x < 0) s.x = canvas.width; if (s.x > canvas.width) s.x = 0
        if (s.y < 0) s.y = canvas.height; if (s.y > canvas.height) s.y = 0
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,245,250,${s.alpha})`; ctx.fill()
      })
      stars.slice(0, 12).forEach((s) => {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,107,157,${s.alpha * 0.3})`; ctx.fill()
      })
      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', handleMouse) }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a12]">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,157,0.07) 0%, transparent 70%)' }} />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 text-center px-6 select-none">
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="text-[#FFD060] text-sm tracking-[0.45em] uppercase font-light mb-6"
        >
          {h.for}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-dancing leading-tight mb-4 glow-pink"
          style={{ fontSize: 'clamp(3.8rem, 13vw, 8.5rem)', color: '#fff' }}
        >
          <div>{h.titleLine1}</div>
          <div>
            {h.titleLine2}{' '}
            <span className="text-gradient">{h.name}</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.2 }}
          className="font-playfair italic text-white/40 text-lg"
        >
          {h.tagline}
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }} className="flex flex-col items-center gap-1">
          <span className="text-white/25 text-[10px] tracking-[0.35em] uppercase">{h.scroll}</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
