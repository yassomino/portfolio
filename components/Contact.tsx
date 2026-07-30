'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Mail,
  Github,
  Linkedin,
  FileDown,
  Send,
  CheckCircle2,
  MapPin,
  Globe,
  Copy,
  Check,
} from 'lucide-react'

const EMAIL = 'yassinkoubeisy@gmail.com'

/* Click to copy, with animated confirmation */
function CopyEmail() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      return
    } catch {
      /* Clipboard API unavailable or blocked, fall through */
    }

    /* Fallback for insecure contexts and older browsers */
    try {
      const scratch = document.createElement('textarea')
      scratch.value = EMAIL
      scratch.setAttribute('readonly', '')
      scratch.style.position = 'fixed'
      scratch.style.opacity = '0'
      document.body.appendChild(scratch)
      scratch.select()
      document.execCommand('copy')
      document.body.removeChild(scratch)
      setCopied(true)
    } catch {
      /* Nothing worked, the mailto link beside this still does */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="pill shrink-0"
      style={copied ? { borderColor: 'rgba(34,211,238,0.5)', color: '#22d3ee' } : undefined}
      aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="done"
            initial={{ scale: 0.4, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 520, damping: 24 }}
            className="inline-flex items-center gap-2"
          >
            <Check size={12} />
            Copied
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2"
          >
            <Copy size={12} />
            Copy
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

const channels = [
  {
    label: 'Email',
    value: 'yassinkoubeisy@gmail.com',
    href: 'mailto:yassinkoubeisy@gmail.com',
    icon: Mail,
    accent: '#6366f1',
    external: false,
  },
  {
    label: 'GitHub',
    value: 'github.com/yassomino',
    href: 'https://github.com/yassomino',
    icon: Github,
    accent: '#22d3ee',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/yassinkoubeisy',
    href: 'https://www.linkedin.com/in/yassinkoubeisy',
    icon: Linkedin,
    accent: '#a855f7',
    external: true,
  },
  {
    label: 'Resume',
    value: 'Download PDF',
    href: '/Yassin-Koubeisy-Resume.pdf',
    icon: FileDown,
    accent: '#22d3ee',
    external: true,
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  /* `company` is a honeypot: hidden from people, catnip for bots */
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to send')
      }

      setSent(true)
      setForm({ name: '', email: '', message: '', company: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[320px]
                   rounded-full blur-[120px] opacity-[0.13]"
        style={{ background: 'radial-gradient(circle, #6366f1, #a855f7 50%, transparent 72%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Head */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12 pb-4 border-b border-[color:var(--edge)]">
          <div>
            <p className="index-tag">[ 04 / open channel ]</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="grad-accent">Let&apos;s build something</span>
            </h2>
          </div>
          <p className="meta">Reply within 24h</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_minmax(0,520px)] gap-10 lg:gap-14">
          {/* Left */}
          <div className="space-y-5">
            <div className="panel p-6 border-l-2" style={{ borderLeftColor: '#22d3ee' }}>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-glow motion-reduce:animate-none" />
                <span className="meta text-accent-cyan">Status: available</span>
              </div>
              <p className="font-body text-sm leading-relaxed text-[color:var(--text-dim)]">
                Looking for internship and co-op work, and glad to talk about a project
                either way. Email is fastest.
              </p>
              <div className="mt-4 pt-4 border-t border-[color:var(--edge)] flex flex-wrap gap-x-5 gap-y-2">
                <span className="meta inline-flex items-center gap-1.5">
                  <MapPin size={11} /> Ottawa, ON
                </span>
                <span className="meta inline-flex items-center gap-1.5">
                  <Globe size={11} /> EN · AR · FR
                </span>
              </div>
            </div>

            {channels.map((c) => {
              const Icon = c.icon
              return (
                <div key={c.label} className="panel flex items-center gap-4 p-4 active:scale-[0.995] transition-transform">
                  <a
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-4 min-w-0 flex-1"
                  >
                    <span
                      className="w-10 h-10 flex items-center justify-center border shrink-0
                                 transition-transform duration-200 group-hover:scale-105 group-active:scale-95"
                      style={{
                        borderColor: `${c.accent}55`,
                        background: `${c.accent}12`,
                      }}
                    >
                      <Icon size={15} style={{ color: c.accent }} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="meta block">{c.label}</span>
                      <span className="block font-body text-sm text-[color:var(--text-dim)] group-hover:text-white transition-colors truncate">
                        {c.value}
                      </span>
                    </span>
                  </a>

                  {c.label === 'Email' && <CopyEmail />}
                </div>
              )
            })}
          </div>

          {/* Right: form */}
          <div className="panel hud p-7">
            {sent ? (
              <div className="py-14 flex flex-col items-center text-center gap-4">
                <CheckCircle2 size={34} className="text-accent-cyan" />
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Transmission sent</h3>
                  <p className="mt-1 font-body text-sm text-[color:var(--text-dim)]">
                    I&apos;ll get back to you within a day.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot, hidden from people and from screen readers */}
                <div aria-hidden="true" className="absolute w-px h-px -m-px overflow-hidden opacity-0">
                  <label htmlFor="contact-company">Company</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="meta block mb-2">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="field"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="meta block mb-2">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="field"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="meta block mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="field resize-none"
                    placeholder="What are you building?"
                  />
                </div>

                {error && (
                  <p role="alert" className="font-mono text-xs text-red-400 border border-red-500/30 bg-red-500/10 px-3 py-2">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center">
                  {loading ? (
                    'Sending…'
                  ) : (
                    <>
                      <Send size={13} />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
