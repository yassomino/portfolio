'use client'

import { Github, Linkedin, Mail, FileDown, ArrowUp } from 'lucide-react'

const socials = [
  { icon: Github, href: 'https://github.com/yassomino', label: 'GitHub', external: true },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/yassinkoubeisy',
    label: 'LinkedIn',
    external: true,
  },
  { icon: Mail, href: 'mailto:yassinkoubeisy@gmail.com', label: 'Email', external: false },
  { icon: FileDown, href: '/Yassin-Koubeisy-Resume.pdf', label: 'Resume', external: true },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--edge)] py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <span className="font-display text-lg font-extrabold text-white">
            YK<span className="text-accent-cyan">.</span>
          </span>
          <span className="meta">© {new Date().getFullYear()} · Ottawa, ON</span>
        </div>

        <div className="flex items-center gap-2.5">
          {socials.map((s) => {
            const Icon = s.icon
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.external ? '_blank' : undefined}
                rel={s.external ? 'noopener noreferrer' : undefined}
                aria-label={s.label}
                className="w-9 h-9 border border-[color:var(--edge)] flex items-center justify-center
                           text-[color:var(--text-faint)] hover:text-accent-cyan
                           hover:border-[rgba(34,211,238,0.45)] hover:-translate-y-0.5
                           active:translate-y-0 active:scale-90 transition-all duration-200"
              >
                <Icon size={14} />
              </a>
            )
          })}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 border border-[color:var(--edge)] flex items-center justify-center
                       text-[color:var(--text-faint)] hover:text-accent-cyan
                       hover:border-[rgba(34,211,238,0.45)] transition-all duration-200"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
