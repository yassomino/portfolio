import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllSlugs } from '@/lib/projects'
import type { Metadata } from 'next'
import ProjectDetailClient from './ProjectDetailClient'

/* ─── Static params for pre-rendering ───────────────────────────────── */
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

/* ─── Dynamic metadata ───────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }

  return {
    title: `${project.title} | Yassin Koubeisy`,
    description: project.tagline,
  }
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return <ProjectDetailClient project={project} />
}
