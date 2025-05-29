import {Roboto} from 'next/font/google'
import "@workspace/ui/globals.css"
import {cn} from '@workspace/ui/lib/utils'
import { Providers } from "@/components/providers"

const roboto = Roboto({
	weight: ['100', '400', '500'] 
})

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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
