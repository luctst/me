import {ArrowRight} from 'lucide-react'
import { Button } from "@workspace/ui/components/button"
import {SidebarProvider, Sidebar, SidebarFooter, SidebarHeader} from '@workspace/ui/components/sidebar'
import { cn } from "@workspace/ui/lib/utils"


function AppSidebar() {
	const footerContent = [
		'_ Welcome to my website, my',
		'name is Lucas, I live in Paris',
		'I\'m working as a full-stack',
		'JavaScript developer, also mentor in OpenClassrooms',
		'I currently maintain more than 100 projects on Github.',
	]
	const footerLinks = [
    {
      href: 'mailto:lucas.tostee.dev@gmail.com',
      content: 'Mail',
    },
    {
      href: 'https://github.com/luctst',
      content: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/lucas-tost%C3%A9e-97a57711a/',
      content: 'Linkedin'
    }
  ]

	return (
		<Sidebar className="pt-[40px] pl-4">
			<SidebarHeader>
				<h1 className="text-base m-0 mb-[5px] font-bold text-[#262626] leading-[17.09px]">
					<span className="block overflow-hidden">
						<span className="block animate-[fadeIn_500ms_ease_forwards]" style={{transform: 'translateY(100%)', animationDelay: '200ms'}}>
							Lucas Tostée
						</span>
					</span>
				</h1>
				<h2 className="text-base m-0 text-[#262626] font-[100]">
					<span className="block overflow-hidden">
						<span className="block animate-[fadeIn_500ms_ease_forwards]" style={{transform: 'translateY(100%)', animationDelay: '400ms'}}>
							_ Full Stack JS
						</span>
					</span>
				</h2>
			</SidebarHeader>
			<SidebarFooter className="mt-auto">
				{
					footerContent.map((f, i) => <p key={i} className={cn('text-base leading-[16.7px] text-[#262626] m-0', i === footerContent.length - 1 && 'mt-4 mb-12')}>
						<span className="block overflow-hidden">
							<span className='block animate-[fadeIn_500ms_ease_forwards]' style={{transform: 'translateY(100%)', animationDelay: `${400 + i * 200}ms`}}>{f}</span>
						</span>
					</p>)
				}
				<div className="flex items-center justify-between">
					{
						footerLinks.map((link, i) => <a key={i} href={link.href} target="_blank" className="flex items-center text-[#262626] text-[12px] font-[500] no-underline leading-[14.56px] mr-[5px]">
							<span className="block overflow-hidden">
								<span className=' block animate-[fadeIn_500ms_ease_forwards] flex items-center' style={{transform: 'translateY(100%)', animationDelay: `${1200 + i * 200}ms`}}>
									{link.content}
									<ArrowRight className="ml-2 h-[8px] w-[8px]"/>
								</span>
							</span>
						</a>)
					}
				</div>
			</SidebarFooter>
		</Sidebar>
	)
}

export default function Page() {
  return (
		<SidebarProvider>
			<AppSidebar />
			<main></main>
		</SidebarProvider>
  )
}
