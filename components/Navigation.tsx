'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, FileDown } from 'lucide-react'

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Trajectory', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* Scroll spy: the indicator follows whichever section owns the viewport.
     Measured on scroll rather than with IntersectionObserver so it behaves the
     same in every environment, throttled to one read per frame. */
  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let current = ''

      for (const link of navLinks) {
        const el = document.querySelector(link.href)
        if (!el) continue
        const { top, bottom } = el.getBoundingClientRect()
        if (top <= line && bottom > line) {
          current = link.href
          break
        }
      }

      /* Past the last section (footer in view), keep the final link lit */
      if (!current) {
        const last = document.querySelector(navLinks[navLinks.length - 1].href)
        if (last && last.getBoundingClientRect().bottom <= line) {
          current = navLinks[navLinks.length - 1].href
        }
      }

      setActive(current)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const go = (href: string) => {
    setOpen(false)
    setActive(href)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-[#06070c]/85 backdrop-blur-xl border-b border-[color:var(--edge)]'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between gap-6">
        {/* Mark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="font-display text-xl font-extrabold tracking-tight text-white hover:text-accent-cyan transition-colors"
        >
          YK<span className="text-accent-cyan">.</span>
        </a>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => {
            const isActive = active === l.href
            return (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault()
                  go(l.href)
                }}
                aria-current={isActive ? 'true' : undefined}
                className={`meta relative py-1 transition-colors duration-200 ${
                  isActive ? 'text-accent-cyan' : 'hover:text-accent-cyan'
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent-cyan"
                    style={{ boxShadow: '0 0 10px rgba(34,211,238,0.9)' }}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/Yassin-Koubeisy-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="pill"
          >
            <FileDown size={12} />
            Resume
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              go('#contact')
            }}
            className="pill"
            style={{ borderColor: 'rgba(34,211,238,0.4)', color: '#22d3ee' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-glow motion-reduce:animate-none" />
            Available
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-[color:var(--text-dim)] hover:text-white transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#06070c]/97 backdrop-blur-xl border-b border-[color:var(--edge)]">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault()
                  go(l.href)
                }}
                className="font-body text-base text-[color:var(--text-dim)] hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/Yassin-Koubeisy-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="pill self-start"
            >
              <FileDown size={12} />
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
