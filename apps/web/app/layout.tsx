import { Analytics } from '@vercel/analytics/next';
import {Roboto} from 'next/font/google'
import { Metadata } from 'next'
import {cn} from '@workspace/ui/lib/utils'
import { Providers } from "@/components/providers"
import {Loading} from '@/components/loader'

import "@workspace/ui/globals.css"

const roboto = Roboto({
	weight: ['100', '400', '500', '700'],
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Lucas Tostée | Développeur Javascript Full Stack Freelance Paris',
	description: 'Lucas Tostée JS full stack developpeur, Mentor Openclassrooms I create natives and web applications',
  generator: 'NextJs',
  applicationName: 'me',
  referrer: 'origin-when-cross-origin',
  keywords: ['Software Engineer', 'Paris', 'JavaScript', 'React', 'NextJs', 'Full Stack'],
  authors: [{ name: 'Tostee Lucas', url: 'https://lucastostee.com' }],
  verification: {
    google: 'google',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(roboto.className, 'bg-[#F7F4F0]', 'px-4')}
      >
        <Providers>
					<Loading>
						{children}
					</Loading>
				</Providers>
				<Analytics />
      </body>
    </html>
  )
}
