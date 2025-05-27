import localFont from 'next/font/local'
import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"

const helvetica = localFont({
	src: '../public/fonts/helvmn.ttf',
	variable: '--font-helvetica-medium'
})
console.log(helvetica)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        //className={helvetica.className}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
