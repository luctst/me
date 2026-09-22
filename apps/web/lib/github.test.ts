import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pickEvents, collapseMerges, relativeTime, type RawEvent, type Activity } from './github.ts'

const ev = (type: string, payload: RawEvent['payload'], id = String(Math.random())): RawEvent => ({
  id, type, created_at: '2026-09-15T09:11:28Z', repo: { name: 'luctst/tron' }, payload,
})

test('pickEvents keeps shipping events only, in order, capped', () => {
  const out = pickEvents([
    ev('DeleteEvent', { ref_type: 'branch', ref: 'x' }, 'del'),
    ev('CreateEvent', { ref_type: 'branch', ref: 'x' }, 'br'),
    ev('PushEvent', { ref: 'refs/heads/main', head: 'abc' }, 'push-main'),
    ev('PushEvent', { ref: 'refs/heads/feat', head: 'def' }, 'push-feat'),
    ev('PullRequestEvent', { action: 'opened', number: 1, pull_request: { url: 'u' } }, 'pr-open'),
    ev('PullRequestEvent', { action: 'merged', number: 1, pull_request: { url: 'u' } }, 'pr-merged'),
    ev('PullRequestEvent', { action: 'closed', number: 2, pull_request: { url: 'u', merged: true } }, 'pr-closed-merged'),
    ev('PullRequestEvent', { action: 'closed', number: 3, pull_request: { url: 'u', merged: false } }, 'pr-closed-unmerged'),
    ev('ReleaseEvent', { action: 'published', release: { tag_name: 'v1' } }, 'rel'),
    ev('CreateEvent', { ref_type: 'repository' }, 'new-repo'),
    ev('WatchEvent', { action: 'started' }, 'star'),
  ], 4)
  assert.deepEqual(out.map((e) => e.id), ['push-main', 'pr-merged', 'pr-closed-merged', 'rel'])
})

test('relativeTime picks the largest whole unit', () => {
  const now = Date.parse('2026-09-22T12:00:00Z')
  assert.equal(relativeTime('2026-09-22T11:59:30Z', now), 'just now')
  assert.equal(relativeTime('2026-09-22T09:00:00Z', now), '3 hours ago')
  assert.equal(relativeTime('2026-09-21T12:00:00Z', now), 'yesterday')
  assert.equal(relativeTime('2026-09-17T12:00:00Z', now), '5 days ago')
  assert.equal(relativeTime('2026-06-22T12:00:00Z', now), '3 months ago')
}
)

test('collapseMerges drops the push of a merge commit when its PR merge is listed', () => {
  const row = (verb: string, repo: string, detail: string | null): Activity => ({ id: verb + repo + detail, verb, repo, repoUrl: '', detail, detailUrl: null, at: '' })
  const out = collapseMerges([
    row('Pushed to', 'tron', 'Publish releases to npm (#1)'),
    row('Merged #1 in', 'tron', 'Publish releases to npm'),
    row('Pushed to', 'marcdown', 'fix: indents (#37)'),
    row('Pushed to', 'marcdown', 'chore: bump'),
    row('Merged #2 in', 'skilled', 'sync'),
    row('Pushed to', 'skilled', 'hotfix (#2)'),
  ])
  assert.deepEqual(out.map((r) => `${r.verb} ${r.repo}`), ['Merged #1 in tron', 'Pushed to marcdown', 'Pushed to marcdown', 'Merged #2 in skilled'])
})
