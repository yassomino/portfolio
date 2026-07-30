'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, FileDown, ChevronDown, Terminal } from 'lucide-react'

/* ─── Typing effect ──────────────────────────────────────────────────── */
function useTypingEffect(words: string[], typingSpeed = 80, deletingSpeed = 40, pause = 2000) {
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    const word = words[idx]
    let t: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), typingSpeed)
      } else {
        t = setTimeout(() => setPhase('deleting'), pause)
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed)
      } else {
        setIdx((i) => (i + 1) % words.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(t)
  }, [text, phase, idx, words, typingSpeed, deletingSpeed, pause])

  return text
}

/* ─── Boot log ───────────────────────────────────────────────────────── */
const bootLines = [
  { prefix: '$', text: 'init stratum-wealth --secure', tone: 'cmd' },
  { prefix: '✓', text: 'auth flows verified', tone: 'ok' },
  { prefix: '✓', text: 'api endpoints protected', tone: 'ok' },
  { prefix: '✓', text: 'secrets loaded from env', tone: 'ok' },
  { prefix: '✓', text: 'pre-market pipeline online', tone: 'ok' },
  { prefix: '→', text: 'report ready before open', tone: 'dim' },
]

const stats = [
  { value: '10.20', label: 'CGPA / 12.00' },
  { value: '03', label: 'Shipped projects' },
  { value: '1YR', label: 'Industry experience' },
]

export default function Hero() {
  const roles = [
    'Software Developer',
    'Co-Founder @ Stratum Wealth',
    'AI & ML Specialization',
    'Cybersecurity @ Carleton',
  ]
  const typed = useTypingEffect(roles)

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Perspective grid floor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh] overflow-hidden"
      >
        <div className="grid-floor absolute inset-0 animate-grid-pan motion-reduce:animate-none" />
      </div>

      {/* Horizon glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[900px] h-[520px] rounded-full blur-[130px] opacity-[0.16]"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, #a855f7 45%, transparent 72%)' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 pt-28 pb-20">
        <div className="grid lg:grid-cols-[1fr_440px] gap-14 lg:gap-16 items-center">
          {/* ── Left ── */}
          <motion.div variants={container} initial="hidden" animate="visible" className="space-y-8">
            {/* Status readout */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-2.5">
              <span className="pill">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-glow motion-reduce:animate-none" />
                Available for co-op
              </span>
              <span className="pill">Ottawa · ON</span>
            </motion.div>

            {/* Name */}
            <motion.h1 variants={item} className="font-display font-extrabold leading-[0.85]">
              <span className="block text-[clamp(3.5rem,11vw,9rem)] grad-text tracking-tight">
                YASSIN
              </span>
              <span className="block text-[clamp(3.5rem,11vw,9rem)] grad-accent tracking-tight">
                KOUBEISY
              </span>
            </motion.h1>

            {/* Typed role */}
            <motion.div variants={item} className="flex items-center gap-3 min-h-[2.25rem]">
              <span className="index-tag">~/role</span>
              <span className="font-display text-lg md:text-2xl font-semibold text-white">
                {typed}
                <span className="caret animate-blink motion-reduce:animate-none" />
              </span>
            </motion.div>

            {/* Blurb */}
            <motion.p
              variants={item}
              className="max-w-measure font-body text-base md:text-lg leading-relaxed text-[color:var(--text-dim)]"
            >
              CS student at Carleton specializing in{' '}
              <span className="text-white">AI &amp; machine learning</span> and{' '}
              <span className="text-white">cybersecurity</span>. Co-founding{' '}
              <span className="text-accent-cyan">Stratum Wealth</span>, an AI platform that
              turns overnight financial news into a pre-market brief. I handle
              authentication, API protection, and access control.
            </motion.p>

            {/* Actions */}
            <motion.div variants={item} className="flex flex-wrap gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn btn-primary"
              >
                View work
                <ArrowRight size={14} />
              </a>
              <a
                href="/Yassin-Koubeisy-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <FileDown size={14} />
                Resume
              </a>
              <a
                href="https://github.com/yassomino"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <Github size={14} />
                GitHub
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-x-10 gap-y-5 pt-6 border-t border-[color:var(--edge)]"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl md:text-3xl font-bold grad-accent">
                    {s.value}
                  </div>
                  <div className="meta mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: terminal ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="panel hud relative overflow-hidden">
              {/* Scan sweep */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-8 opacity-40
                           animate-scan-sweep motion-reduce:hidden"
                style={{
                  background:
                    'linear-gradient(180deg, transparent, rgba(34,211,238,0.16), transparent)',
                }}
              />

              {/* Title bar */}
              <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[color:var(--edge)]">
                <Terminal size={13} className="text-accent-cyan" />
                <span className="meta">stratum / secure boot</span>
                <span className="ml-auto meta text-accent-cyan">live</span>
              </div>

              {/* Body */}
              <div className="p-5 font-mono text-[13px] space-y-2.5">
                {bootLines.map((line, i) => (
                  <motion.div
                    key={line.text}
                    className="flex items-start gap-2.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.14, duration: 0.4 }}
                  >
                    <span
                      className={
                        line.tone === 'ok'
                          ? 'text-accent-cyan'
                          : line.tone === 'dim'
                          ? 'text-[color:var(--text-faint)]'
                          : 'text-accent'
                      }
                    >
                      {line.prefix}
                    </span>
                    <span
                      className={
                        line.tone === 'dim'
                          ? 'text-[color:var(--text-faint)]'
                          : 'text-[color:var(--text-dim)]'
                      }
                    >
                      {line.text}
                    </span>
                  </motion.div>
                ))}

                <motion.div
                  className="flex items-center gap-2.5 pt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  <span className="text-accent">$</span>
                  <span className="caret animate-blink motion-reduce:animate-none" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="meta">Scroll</span>
        <ChevronDown size={14} className="text-accent-cyan animate-float motion-reduce:animate-none" />
      </div>
    </section>
  )
}
