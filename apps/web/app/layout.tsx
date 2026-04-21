import { Analytics } from '@vercel/analytics/next'
import { Roboto } from 'next/font/google'
import { Metadata } from 'next'
import { cn } from '@workspace/ui/lib/utils'
import { Providers } from '@/components/providers'
import { Loading } from '@/components/loader'

import '@workspace/ui/globals.css'

const roboto = Roboto({
  weight: ['100', '400', '500', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Lucas Tostee | Full Stack JavaScript Developer — Freelance',
  description:
    'Lucas Tostee — Full Stack JavaScript developer and freelance engineer. I build native and web applications.',
  openGraph: {
    title: 'Lucas Tostee | Full Stack JavaScript Developer — Freelance',
    description:
      'Lucas Tostee — Full Stack JavaScript developer and freelance engineer. I build native and web applications.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Lucas Tostee | Full Stack JavaScript Developer — Freelance',
    description:
      'Lucas Tostee — Full Stack JavaScript developer and freelance engineer. I build native and web applications.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(roboto.className, 'px-4')}>
        <Providers>
          <Loading>{children}</Loading>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
