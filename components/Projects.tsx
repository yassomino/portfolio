'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { projects } from '@/lib/projects'

/* ─── Card ───────────────────────────────────────────────────────────── */
function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="panel hud group relative block overflow-hidden hover:-translate-y-1.5
                 active:translate-y-0 active:scale-[0.985] transition-transform"
      style={{ '--accent': project.ink } as React.CSSProperties}
    >
      {/* Visual header */}
      <div
        className="relative h-48 overflow-hidden"
        style={{
          background: `linear-gradient(150deg, ${project.gradientFrom}, ${project.gradientTo})`,
        }}
      >
        <div className="dot-field absolute inset-0 opacity-50" />

        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-56 h-40 rounded-full blur-[70px]
                     opacity-50 transition-opacity duration-500 group-hover:opacity-90"
          style={{ background: project.ink }}
        />

        {/* Boot log preview */}
        <div className="absolute inset-x-4 bottom-4">
          <div className="border border-[color:var(--edge)] bg-[#04060d]/80 backdrop-blur-sm p-3">
            {project.terminalLines.slice(0, 3).map((line) => (
              <div key={line} className="font-mono text-[10px] leading-5 flex items-center gap-1.5">
                <span style={{ color: project.ink }}>{line.split(' ')[0]}</span>
                <span className="text-[color:var(--text-dim)] truncate">
                  {line.split(' ').slice(1).join(' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Corner meta */}
        <span className="absolute top-4 left-4 meta" style={{ color: project.ink }}>
          {project.category}
        </span>
        <span className="absolute top-4 right-4 meta">{project.year}</span>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-bold text-white leading-tight">
            {project.title}
          </h3>
          <span
            className="shrink-0 w-8 h-8 border border-[color:var(--edge)] flex items-center justify-center
                       text-[color:var(--text-faint)] transition-all duration-200
                       group-hover:text-white group-hover:border-[color:var(--accent)]
                       group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <ArrowUpRight size={14} />
          </span>
        </div>

        <p className="font-body text-sm leading-relaxed text-[color:var(--text-dim)]">
          {project.tagline}
        </p>

        {/* Facts */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {project.facts.slice(0, 2).map((f) => (
            <div key={f.label} className="border border-[color:var(--edge)] p-2.5">
              <div className="font-display text-sm font-bold" style={{ color: project.ink }}>
                {f.value}
              </div>
              <div className="meta mt-1 text-[9px]">{f.label}</div>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="pill text-[10px] py-1 px-2.5">
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="pill text-[10px] py-1 px-2.5">+{project.stack.length - 4}</span>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${project.ink}, transparent)` }}
      />
    </Link>
  )
}

/* ─── Section ────────────────────────────────────────────────────────── */
export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10" ref={ref}>
        {/* Head */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12 pb-4 border-b border-[color:var(--edge)]">
          <div>
            <p className="index-tag">[ 01 / selected work ]</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-extrabold tracking-tight grad-text">
              Things I&apos;ve built
            </h2>
          </div>
          <p className="meta">{String(projects.length).padStart(2, '0')} case studies</p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
