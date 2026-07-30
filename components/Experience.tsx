'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase } from 'lucide-react'

/* ─── Experience data ────────────────────────────────────────────────── */
const experiences = [
  {
    role: 'Co-Founder & Cybersecurity Analyst',
    company: 'Stratum Wealth',
    period: 'Feb 2026 to present',
    type: 'Startup',
    accent: '#22d3ee',
    description:
      'Co-founded an AI-powered financial intelligence platform that generates automated pre-market reports summarizing financial news, sentiment, and trading insights before market open.',
    highlights: [
      'Built automated pre-market reporting from news and sentiment data',
      'Implemented secure authentication flows and API protection',
      'Managed environment variables and access control mechanisms',
      'Secured backend systems, deployment pipelines, and cloud-hosted services',
      'Monitored potential vulnerabilities and improved platform reliability',
    ],
  },
  {
    role: 'AI Program Participant',
    company: 'Kanz AI · Saudi Arabia',
    period: 'Jul 2026',
    type: 'Certificate',
    accent: '#a855f7',
    description:
      'Certificate of Completion. Worked in a team to build a locally-run AI system, then presented the finished work to other participants.',
    highlights: [
      'Built a local AI system collaboratively in a team environment',
      'Presented the completed system to program participants',
      'Managed multiple concurrent tasks with minimal supervision',
    ],
  },
  {
    role: 'Web Developer Intern',
    company: 'Arab Textile Industries Co. · Cairo',
    period: 'Sep 2024 to Sep 2025',
    type: 'Internship',
    accent: '#6366f1',
    description:
      'Designed and implemented a responsive e-commerce storefront in HTML, CSS, and JavaScript, and integrated the front end with backend APIs.',
    highlights: [
      'Built a responsive e-commerce storefront from scratch',
      'Integrated front-end components with backend APIs',
      'Troubleshot production issues and resolved defects independently',
      'Documented system changes and procedures for ongoing maintenance',
    ],
  },
  {
    role: 'B.Sc. Computer Science',
    company: 'Carleton University · Ottawa',
    period: '2024 to 2028 (expected)',
    type: 'Education',
    accent: '#6366f1',
    description:
      'Specialization in AI and machine learning with cybersecurity, minor in business. CGPA 10.20 / 12.00.',
    highlights: [
      'Coursework: data structures, algorithms, OOP, systems programming',
      'Coursework: probability models, discrete structures, linear algebra, web development',
      'Languages: English, Arabic, French',
    ],
  },
]

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10" ref={ref}>
        {/* Head */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12 pb-4 border-b border-[color:var(--edge)]">
          <div>
            <p className="index-tag">[ 02 / trajectory ]</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-extrabold tracking-tight grad-text">
              Where I&apos;ve worked
            </h2>
          </div>
          <p className="meta">2024 to present</p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl">
          {experiences.map((exp, i) => (
            <motion.article
              key={`${exp.company}-${exp.role}`}
              className="relative flex gap-6 md:gap-9"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Rail */}
              <div className="relative flex flex-col items-center shrink-0">
                <div
                  className="w-10 h-10 border flex items-center justify-center bg-bg z-10"
                  style={{
                    borderColor: exp.accent,
                    boxShadow: `0 0 22px -4px ${exp.accent}`,
                  }}
                >
                  <Briefcase size={14} style={{ color: exp.accent }} />
                </div>
                {i < experiences.length - 1 && (
                  <div
                    className="flex-1 w-px mt-2 min-h-[32px]"
                    style={{ background: `linear-gradient(to bottom, ${exp.accent}66, transparent)` }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-10 md:pb-14">
                <div className="panel p-6 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="font-display text-lg md:text-xl font-bold text-white">
                          {exp.role}
                        </h3>
                        <span className="pill" style={{ color: exp.accent }}>
                          {exp.type}
                        </span>
                      </div>
                      <p className="mt-1.5 font-body text-sm text-[color:var(--text-faint)]">
                        {exp.company}
                      </p>
                    </div>
                    <span className="meta" style={{ color: exp.accent }}>
                      {exp.period}
                    </span>
                  </div>

                  <p className="font-body text-sm leading-relaxed text-[color:var(--text-dim)] mb-4">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5">
                        <span
                          className="w-1.5 h-1.5 mt-2 shrink-0 rotate-45"
                          style={{ background: exp.accent }}
                        />
                        <span className="font-body text-sm text-[color:var(--text-dim)]">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
