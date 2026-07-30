'use client'

import { useEffect, useRef } from 'react'

/* Global click feedback.
   Rings are appended into a layer this component owns and React never renders
   into, so we are not mutating React managed DOM. Every node removes itself
   when its animation ends. */
export default function ClickFX() {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    const onPointerDown = (e: PointerEvent) => {
      if (reduce.matches || e.button !== 0) return

      const interactive = Boolean(
        (e.target as HTMLElement | null)?.closest('a, button, .btn, .pill, input, textarea')
      )

      const spawn = (className: string, delay: number) => {
        const node = document.createElement('span')
        node.className = className
        node.style.left = `${e.clientX}px`
        node.style.top = `${e.clientY}px`
        node.style.animationDelay = `${delay}ms`
        node.addEventListener('animationend', () => node.remove(), { once: true })
        layer.appendChild(node)
      }

      spawn(interactive ? 'fx-ring fx-ring-hot' : 'fx-ring', 0)
      if (interactive) {
        spawn('fx-ring fx-ring-echo', 90)
        spawn('fx-dot', 0)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9997] overflow-hidden"
    />
  )
}
