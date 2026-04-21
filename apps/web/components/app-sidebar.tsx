'use client'

import { Fragment } from 'react'
import { ArrowRight, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@workspace/ui/lib/utils'
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
} from '@workspace/ui/components/sidebar'

export function AppSidebar() {
  const { theme, setTheme } = useTheme()
  const footerContent = [
    '_ Welcome to my website, my',
    'name is Lucas, I work remotely',
    "I'm working as a full-stack",
    'JS freelancer, also mentor at OpenClassrooms',
    "If you're interested, feel free to explore some of my works.",
  ]
  const footerLinks = [
    {
      href: 'mailto:lucas.tostee@gmail.com',
      content: 'Mail',
    },
    {
      href: 'https://github.com/luctst',
      content: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/lucas-tost%C3%A9e-97a57711a/',
      content: 'Linkedin',
    },
  ]

  return (
    <Sidebar className="pt-[40px] px-6 border-none" variant="sidebar">
      <SidebarHeader className="p-0">
        <h1 className="text-base m-0 mb-[5px] font-bold text-foreground leading-[17.09px]">
          <span className="block overflow-hidden">
            <span
              className="block animate-[fadeIn_500ms_ease_forwards]"
              style={{ transform: 'translateY(100%)', animationDelay: '200ms' }}
            >
              Lucas Tostée
            </span>
          </span>
        </h1>
        <h2 className="text-base m-0 text-foreground font-thin">
          <span className="block overflow-hidden">
            <span
              className="block animate-[fadeIn_500ms_ease_forwards]"
              style={{ transform: 'translateY(100%)', animationDelay: '400ms' }}
            >
              <span className="animate-[blink_1s_linear_infinite]">_</span> Full
              Stack JS
            </span>
          </span>
        </h2>
      </SidebarHeader>
      <SidebarFooter className="mt-auto p-0 mb-[40px] max-w-[69%]">
        {footerContent.map((f, i) => (
          <p
            key={i}
            className={cn(
              'text-base font-normal leading-[16.7px] text-foreground m-0',
              i === footerContent.length - 1 && 'mt-4 mb-12',
            )}
          >
            <span className="block overflow-hidden">
              <span
                className="block animate-[fadeIn_500ms_ease_forwards]"
                style={{
                  transform: 'translateY(100%)',
                  animationDelay: `${400 + i * 200}ms`,
                }}
              >
                {f.split('_').map((char, idx, array) => (
                  <Fragment key={idx}>
                    {char}
                    {idx < array.length - 1 && (
                      <span className="animate-[blink_1s_linear_infinite]">
                        _
                      </span>
                    )}
                  </Fragment>
                ))}
              </span>
            </span>
          </p>
        ))}
        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="mb-4 text-foreground hover:cursor-pointer bg-transparent border-none outline-none p-0"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
        <div className="flex items-center">
          {footerLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              className="flex items-center text-foreground text-[12px] font-medium no-underline leading-[14.56px] mr-[5px]"
              rel="noreferrer"
            >
              <span className="block overflow-hidden">
                <span
                  className=" block animate-[fadeIn_500ms_ease_forwards] flex items-center"
                  style={{
                    transform: 'translateY(100%)',
                    animationDelay: `${1200 + i * 200}ms`,
                  }}
                >
                  {link.content}
                  <ArrowRight className="ml-[5px] h-[8px] w-[8px]" />
                </span>
              </span>
            </a>
          ))}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
