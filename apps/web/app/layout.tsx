import { Analytics } from '@vercel/analytics/next'
import { Roboto } from 'next/font/google'
import { Metadata } from 'next'
import { cn } from '@workspace/ui/lib/utils'
import { Providers } from '@/components/providers'
import { Loading } from '@/components/loader'

import '@workspace/ui/globals.css'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

const title = 'Lucas Tostée | Software engineer'
const description =
  'Lucas Tostée, software engineer. I build software products end to end: web apps, native apps, and developer tools.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website' },
  twitter: { card: 'summary', title, description },
}

const contract = `<!-- impeccable direction contract
THESIS: One typed statement answers "who is Lucas and what is he shipping", then five live lines of GitHub activity prove it on the same page. Refuses the portfolio grid, the hand-maintained project list, and a second route.
OWN-WORLD: The Quiet Terminal. Warm Paper ground, Soft Ink text, Pencil Grey for the past, one Highlighter Yellow on text selection only, Roboto only, curtain reveals, one blinking underscore, no shadows, square panels.
STORY: Read the statement, see that the last push or merge happened days ago, click a repository or a commit on GitHub.
FIRST VIEWPORT: One column, max 42rem, name and role top-left, a 48px statement, two short paragraphs, then "Lately on GitHub": five hairline-separated rows of verb, repository, one grey line of detail, and a relative time, closed by a quiet "All activity on GitHub" link; contact links follow.
FORM: Single-column typed statement, first of the ordered list; no roll, composition delegated to the build by the user.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(roboto.className, 'px-4 selection:bg-accent-badge selection:text-accent-badge-foreground')}>
        <div hidden dangerouslySetInnerHTML={{ __html: contract }} />
        <Providers>
          <Loading>{children}</Loading>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
