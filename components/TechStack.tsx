'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Boxes, Wrench, BrainCircuit } from 'lucide-react'

/* ─── Stack data ─────────────────────────────────────────────────────── */
const categories = [
  {
    title: 'Languages',
    icon: Code2,
    accent: '#6366f1',
    skills: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'],
  },
  {
    title: 'Frameworks',
    icon: Boxes,
    accent: '#22d3ee',
    skills: [
      'Spring Boot',
      'Spring Data JPA',
      'Next.js',
      'React',
      'Node.js',
      'JavaFX',
      'Pygame',
      'SQLite',
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    accent: '#a855f7',
    skills: [
      'Git',
      'GitHub',
      'VS Code',
      'IntelliJ',
      'Linux (Ubuntu)',
      'VirtualBox',
      'OpenStack',
      'SPSS',
    ],
  },
  {
    title: 'Concepts',
    icon: BrainCircuit,
    accent: '#22d3ee',
    skills: [
      'RAG pipelines',
      'Embeddings',
      'REST APIs',
      'Microservices',
      'Authentication',
      'Access control',
      'OOP',
      'Algorithms',
    ],
  },
]

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="stack" className="relative py-24 md:py-32 overflow-hidden">
      <div className="dot-field absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10" ref={ref}>
        {/* Head */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12 pb-4 border-b border-[color:var(--edge)]">
          <div>
            <p className="index-tag">[ 03 / toolkit ]</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-extrabold tracking-tight grad-text">
              Tech stack
            </h2>
          </div>
          <p className="meta">What I reach for</p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.title}
                className="panel hud p-6"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 flex items-center justify-center border"
                    style={{
                      borderColor: `${cat.accent}55`,
                      background: `${cat.accent}12`,
                      boxShadow: `0 0 20px -6px ${cat.accent}`,
                    }}
                  >
                    <Icon size={16} style={{ color: cat.accent }} />
                  </div>
                  <h3 className="font-display text-sm font-bold tracking-wide text-white">
                    {cat.title}
                  </h3>
                </div>

                <div className="h-px w-full bg-[color:var(--edge)] mb-5" />

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="pill text-[10px] py-1 px-2.5">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
