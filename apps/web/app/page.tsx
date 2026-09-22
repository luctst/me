import { Frame } from '@/components/frame'
import { Home, type Row } from '@/components/home'
import { getActivity, relativeTime } from '@/lib/github'

export const revalidate = 3600

export default async function Page() {
  const activity = await getActivity(5)
  const rows: Row[] | null =
    activity?.map((a) => ({
      id: a.id,
      verb: a.verb,
      repo: a.repo,
      repoUrl: a.repoUrl,
      detail: a.detail,
      detailUrl: a.detailUrl,
      when: relativeTime(a.at),
    })) ?? null
  return (
    <Frame>
      <Home rows={rows} />
    </Frame>
  )
}
