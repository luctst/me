const USER = 'luctst'

export type Activity = {
  id: string
  verb: string
  repo: string
  repoUrl: string
  detail: string | null
  detailUrl: string | null
  at: string
}

export type RawEvent = {
  id: string
  type: string
  created_at: string
  repo: { name: string }
  payload: {
    ref?: string
    head?: string
    action?: string
    number?: number
    ref_type?: string
    pull_request?: { url: string; title?: string; html_url?: string; merged?: boolean }
    release?: { name?: string; tag_name?: string; html_url?: string }
  }
}

async function gh<T>(path: string): Promise<T> {
  const token = process.env.GITHUB_TOKEN
  const res = await fetch(path.startsWith('http') ? path : `https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`GitHub ${res.status} ${path}`)
  return res.json() as Promise<T>
}

const firstLine = (s: string) => s.split('\n')[0]?.trim() ?? ''

/** Keep what reads as shipping: pushes to main, merged PRs, published releases, new repositories. */
export function pickEvents(raw: RawEvent[], limit = 5): RawEvent[] {
  return raw
    .filter((e) => {
      const p = e.payload
      if (e.type === 'PushEvent') return /^refs\/heads\/(main|master)$/.test(p.ref ?? '')
      if (e.type === 'PullRequestEvent') return p.action === 'merged' || (p.action === 'closed' && !!p.pull_request?.merged)
      if (e.type === 'ReleaseEvent') return p.action === 'published'
      if (e.type === 'CreateEvent') return p.ref_type === 'repository'
      return false
    })
    .slice(0, limit)
}

/** A push whose head commit is a PR's merge commit "(#N)" says the same thing as that PR's merge; keep the merge. */
export function collapseMerges(rows: Activity[]): Activity[] {
  const merged = new Set(rows.filter((r) => r.verb.startsWith('Merged #')).map((r) => `${r.repo}#${r.verb.match(/#(\d+)/)?.[1]}`))
  return rows.filter((r) => {
    if (r.verb !== 'Pushed to') return true
    const n = r.detail?.match(/\(#(\d+)\)\s*$/)?.[1]
    return !(n && merged.has(`${r.repo}#${n}`))
  })
}

/** Five newest public activities. `[]` when the 90-day feed is empty, `null` when GitHub is unreachable. */
export async function getActivity(limit = 5): Promise<Activity[] | null> {
  let raw: RawEvent[]
  try {
    raw = await gh<RawEvent[]>(`/users/${USER}/events/public?per_page=100`)
  } catch {
    return null
  }
  const safe = <T,>(p: Promise<T>) => p.catch(() => null)
  const rows = await Promise.all(
    pickEvents(raw, limit * 2).map(async (e): Promise<Activity> => {
      const repo = e.repo.name.replace(`${USER}/`, '')
      const base = { id: e.id, repo, repoUrl: `https://github.com/${e.repo.name}`, at: e.created_at }
      const p = e.payload
      if (e.type === 'PushEvent') {
        const c = await safe(gh<{ commit: { message: string }; html_url: string }>(`/repos/${e.repo.name}/commits/${p.head}`))
        return { ...base, verb: 'Pushed to', detail: c ? firstLine(c.commit.message) : null, detailUrl: c?.html_url ?? null }
      }
      if (e.type === 'PullRequestEvent') {
        const pr = p.pull_request?.title ? p.pull_request : await safe(gh<{ title: string; html_url: string }>(p.pull_request?.url ?? ''))
        return {
          ...base,
          verb: `Merged #${p.number} in`,
          detail: pr?.title ?? null,
          detailUrl: pr?.html_url ?? `${base.repoUrl}/pull/${p.number}`,
        }
      }
      if (e.type === 'ReleaseEvent') {
        return { ...base, verb: 'Released', detail: p.release?.name || p.release?.tag_name || null, detailUrl: p.release?.html_url ?? null }
      }
      const r = await safe(gh<{ description: string | null }>(`/repos/${e.repo.name}`))
      return { ...base, verb: 'Created', detail: r?.description ?? null, detailUrl: null }
    }),
  )
  return collapseMerges(rows).slice(0, limit)
}

export function relativeTime(iso: string, now = Date.now()): string {
  const seconds = (new Date(iso).getTime() - now) / 1000
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit)
  }
  return 'just now'
}
