import type { ReactNode } from 'react'
import { cn } from '@workspace/ui/lib/utils'

/** The Curtain Rule: text rises through an overflow-hidden wrapper. */
export function Reveal({ delay, children, className }: { delay: number; children: ReactNode; className?: string }) {
  return (
    <span className="block overflow-hidden">
      <span
        className={cn('block animate-[fadeIn_700ms_ease_forwards]', className)}
        style={{ transform: 'translateY(100%)', animationDelay: `${delay}ms` }}
      >
        {children}
      </span>
    </span>
  )
}

export function Cursor({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('animate-[blink_1s_linear_infinite]', className)}>
      _
    </span>
  )
}
