'use client'

import { MotionConfig } from 'framer-motion'

/* Framer honours the user's reduced-motion setting internally, so variants stay
   identical between server and client render. Branching on useReducedMotion()
   during render instead produces a hydration mismatch. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
