import { ArrowRight, ChevronRight } from 'lucide-react'
import { cn } from '@workspace/ui/lib/utils'
import { Reveal } from '@/components/reveal'

export type Row = {
  id: string
  verb: string
  repo: string
  repoUrl: string
  detail: string | null
  detailUrl: string | null
  when: string
}

const inline = 'text-foreground underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground'
const quiet = 'inline-flex items-center text-sm text-muted-foreground no-underline hover:text-foreground hover:underline underline-offset-4'
const ROWS_AT = 1050
const ROW_STEP = 100
const line = 'flex flex-wrap items-baseline gap-x-4 gap-y-0.5 py-3'

export function Home({ rows }: { rows: Row[] | null }) {
  const afterRows = ROWS_AT + (rows && rows.length > 1 ? 2 : 1) * ROW_STEP
  return (
    <>
      <p className="m-0 max-w-[22ch] text-[2.5rem] leading-12 tracking-tight text-foreground text-balance sm:text-5xl sm:leading-14">
        <Reveal delay={400}>I build software products, end to end.</Reveal>
      </p>
      <p className="mt-8 mb-0 max-w-[60ch] text-lg leading-[1.875rem] text-foreground">
        <Reveal delay={650}>
          Software engineer in a full-time role, with a product engineer&rsquo;s reflex for shipping
          things people actually use. Lately that means{' '}
          <a href="https://apps.apple.com/fr/app/kayu-medicine-finder/id6778128009?l=en-GB" target="_blank" rel="noreferrer" className={inline}>
            Kayu
          </a>
          , a medicine finder for iOS.
        </Reveal>
      </p>
      <p className="mt-4 mb-0 max-w-[60ch] text-lg leading-[1.875rem] text-muted-foreground">
        <Reveal delay={800}>
          Before that I shipped for Linxea, PrestaShop, Localista, and Moonshot Insurance. Since 2021
          I&rsquo;ve mentored developers at OpenClassrooms.
        </Reveal>
      </p>

      <section className="mt-10" aria-labelledby="lately">
        <h3 id="lately" className="m-0 text-sm leading-5 font-medium text-foreground">
          <Reveal delay={950}>Lately on GitHub</Reveal>
        </h3>
        {rows === null ? (
          <p className="mt-2 mb-0 text-sm leading-5 text-muted-foreground">
            <Reveal delay={ROWS_AT}>GitHub is unreachable right now.</Reveal>
          </p>
        ) : rows.length === 0 ? (
          <p className="mt-2 mb-0 text-sm leading-5 text-muted-foreground">
            <Reveal delay={ROWS_AT}>Nothing public in the last 90 days.</Reveal>
          </p>
        ) : (
          <>
            <div className="mt-1 border-b border-border">
              <Reveal delay={ROWS_AT} className={line}>
                <RowLine r={rows[0]!} />
              </Reveal>
            </div>
            {rows.length > 1 ? (
              <details className="group">
                <summary className={cn(quiet, 'cursor-pointer list-none py-2 select-none [&::-webkit-details-marker]:hidden')}>
                  <Reveal delay={ROWS_AT + ROW_STEP} className="flex items-center">
                    <span className="group-open:hidden">{rows.length - 1} more</span>
                    <span className="hidden group-open:inline">Show less</span>
                    <ChevronRight className="ml-1 size-3 transition-transform group-open:rotate-90" aria-hidden="true" />
                  </Reveal>
                </summary>
                <ol className="m-0 list-none border-t border-border p-0">
                  {rows.slice(1).map((r) => (
                    <li key={r.id} className={cn(line, 'border-b border-border last:border-0')}>
                      <RowLine r={r} />
                    </li>
                  ))}
                </ol>
              </details>
            ) : null}
          </>
        )}
        <p className={cn('mb-0', rows?.length ? 'mt-1' : 'mt-2')}>
          <Reveal delay={afterRows}>
            <a href="https://github.com/luctst" target="_blank" rel="noreferrer" className={quiet}>
              All activity on GitHub <ArrowRight className="ml-1 size-3" aria-hidden="true" />
            </a>
          </Reveal>
        </p>
      </section>
    </>
  )
}

function RowLine({ r }: { r: Row }) {
  return (
    <>
      <span className="text-base leading-6 text-foreground">
        {r.verb}{' '}
        <a href={r.repoUrl} target="_blank" rel="noreferrer" className="font-medium text-foreground no-underline hover:underline underline-offset-4">
          {r.repo}
        </a>
      </span>
      <span className="ml-auto text-sm leading-6 text-muted-foreground tabular-nums whitespace-nowrap sm:order-last">{r.when}</span>
      {r.detail ? (
        <span className="min-w-0 basis-full line-clamp-2 text-sm leading-6 text-muted-foreground sm:flex-1 sm:basis-0 sm:line-clamp-1" title={r.detail}>
          {r.detailUrl ? (
            <a href={r.detailUrl} target="_blank" rel="noreferrer" className="no-underline hover:text-foreground hover:underline underline-offset-4">
              {r.detail}
            </a>
          ) : (
            r.detail
          )}
        </span>
      ) : null}
    </>
  )
}
