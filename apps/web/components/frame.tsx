import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Reveal, Cursor } from '@/components/reveal'
import { ThemeToggle } from '@/components/theme-toggle'

const links = [
  { href: 'mailto:lucas.tostee@gmail.com', label: 'Mail' },
  { href: 'https://github.com/luctst', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/lucas-tost%C3%A9e-97a57711a/', label: 'LinkedIn' },
]

export function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col pt-10 pb-10">
      <header>
        <h1 className="m-0 mb-1 text-base leading-5 font-bold text-foreground">
          <Reveal delay={100}>Lucas Tostée</Reveal>
        </h1>
        <h2 className="m-0 text-base leading-5 font-normal text-muted-foreground">
          <Reveal delay={300}>
            <Cursor /> Software engineer
          </Reveal>
        </h2>
      </header>
      <main className="mt-10">{children}</main>
      <footer className="mt-12 flex items-center">
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="mr-4 text-xs leading-4 font-medium text-foreground no-underline hover:underline underline-offset-4"
          >
            <Reveal delay={1700 + i * 150} className="flex items-center">
              {l.label}
              <ArrowRight className="ml-[5px] size-2" aria-hidden="true" />
            </Reveal>
          </a>
        ))}
        <Reveal delay={2150} className="ml-auto">
          <ThemeToggle />
        </Reveal>
      </footer>
    </div>
  )
}
