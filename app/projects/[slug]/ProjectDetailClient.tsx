'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, Github, Terminal } from 'lucide-react'
import Link from 'next/link'
import ClickFX from '@/components/ClickFX'
import type { Project } from '@/lib/projects'

/* ─── Case study block ───────────────────────────────────────────────── */
function Block({
  tag,
  title,
  body,
  accent,
  delay,
}: {
  tag: string
  title: string
  body: string
  accent: string
  delay: number
}) {
  return (
    <motion.section
      className="panel p-6 md:p-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="meta" style={{ color: accent }}>
          {tag}
        </span>
        <span className="h-px flex-1 bg-[color:var(--edge)]" />
      </div>
      <h2 className="font-display text-lg font-bold text-white mb-3">{title}</h2>
      <p className="max-w-measure font-body text-sm md:text-base leading-relaxed text-[color:var(--text-dim)]">
        {body}
      </p>
    </motion.section>
  )
}

/* ─── Project Detail ─────────────────────────────────────────────────── */
export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <main className="min-h-screen">
      <ClickFX />

      {/* Masthead */}
      <header
        className="relative overflow-hidden pt-28 pb-14 md:pt-32 md:pb-20"
        style={{
          background: `linear-gradient(160deg, ${project.gradientFrom}, ${project.gradientTo} 70%)`,
        }}
      >
        <div className="dot-field absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[620px] h-[320px]
                     rounded-full blur-[110px] opacity-40"
          style={{ background: project.ink }}
        />

        <div className="relative mx-auto max-w-5xl px-6 md:px-10">
          <Link
            href="/#projects"
            className="meta inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <ArrowLeft size={13} />
            All work
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="pill" style={{ color: project.ink, borderColor: `${project.ink}55` }}>
              {project.category}
            </span>
            <span className="meta">{project.year}</span>
          </div>

          <h1 className="mt-5 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-white">
            {project.title}
          </h1>

          <p className="mt-5 max-w-measure font-body text-lg md:text-xl leading-relaxed text-[color:var(--text-dim)]">
            {project.tagline}
          </p>

          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  View live
                  <ExternalLink size={13} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                >
                  <Github size={13} />
                  GitHub
                </a>
              )}
            </div>
          )}

          {/* Boot log */}
          <div className="mt-9 max-w-md panel hud overflow-hidden">
            <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-[color:var(--edge)]">
              <Terminal size={12} style={{ color: project.ink }} />
              <span className="meta">{project.slug}</span>
            </div>
            <div className="p-4 space-y-1.5">
              {project.terminalLines.map((line) => (
                <div key={line} className="font-mono text-[11px] leading-5 flex items-center gap-2">
                  <span style={{ color: project.ink }}>{line.split(' ')[0]}</span>
                  <span className="text-[color:var(--text-dim)]">
                    {line.split(' ').slice(1).join(' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-5xl px-6 md:px-10 py-14 md:py-20">
        <p className="max-w-measure font-body text-base md:text-lg leading-relaxed text-[color:var(--text-dim)]">
          {project.description}
        </p>

        {/* Facts */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {project.facts.map((f) => (
            <div key={f.label} className="panel p-4">
              <div className="font-display text-sm font-bold" style={{ color: project.ink }}>
                {f.value}
              </div>
              <div className="meta mt-1.5 text-[9px]">{f.label}</div>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span key={t} className="pill">
              {t}
            </span>
          ))}
        </div>

        {/* Case study */}
        <div className="mt-12 space-y-5">
          <Block tag="[ 01 ]" title="The problem" body={project.problem} accent={project.ink} delay={0.05} />
          <Block tag="[ 02 ]" title="What I built" body={project.solution} accent={project.ink} delay={0.1} />
          <Block tag="[ 03 ]" title="Architecture" body={project.architecture} accent={project.ink} delay={0.15} />
          <Block tag="[ 04 ]" title="Where it landed" body={project.impact} accent={project.ink} delay={0.2} />
        </div>

        {/* Foot */}
        <div className="mt-12 pt-6 border-t border-[color:var(--edge)] flex flex-wrap items-center justify-between gap-4">
          <Link href="/#projects" className="btn btn-ghost">
            <ArrowLeft size={13} />
            All work
          </Link>
          <Link href="/#contact" className="btn btn-primary">
            Get in touch
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </main>
  )
}
