'use client'
import { ArrowRight } from 'lucide-react'

const footerLinks = [
	{
		href: 'https://www.malt.fr/profile/lucastostee',
		content: 'Hire me',
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

export function Mobile() {
	return (
		<section className="flex flex-col justify-between h-[100vh] pt-[31px]">
			<header className="overflow-hidden">
				<h1 className="text-base m-0 font-medium text-[#262626] mb-[5px] leading-[17.09px]">
					<span className="block overflow-hidden">
						<span className="block overflow-hidden animate-[fadeIn_500ms_ease_forwards]" style={{ transform: 'translateY(100%)', animationDelay: '400ms' }}>Lucas Tostée</span>
					</span>
				</h1>
				<h2 className="text-base font-light text-[#262626] m-0">
					<span className="block overflow-hidden">
						<span className="block overflow-hidden animate-[fadeIn_500ms_ease_forwards]" style={{ transform: 'translateY(100%)', animationDelay: '400ms' }}>
							<span className="animate-[blink_1s_linear_infinite]">_</span> Freelance Full Stack Js
						</span>
					</span>
				</h2>
			</header>
			<main className="overflow-hidden">
				<h3 className="animate-[fadeIn_1000ms_ease_forwards] font-normal m-0 text-center text-[#262626]" style={{ transform: 'translateY(100%)', animationDelay: '600ms' }}>
					Scroll to explore some of my <span className="font-normal text-base text-[#A4A4A4]">projects</span> or check my Github
				</h3>
			</main>
			<footer className="flex items-center justify-between overflow-hidden mb-2">
				{
					footerLinks.map((link, i) => (
						<a className="animate-[fadeIn_1000ms_ease_forwards] flex items-center font-medium no-underline text-[#262626]" style={{ animationDelay: '1000ms', transform: 'translateY(100%)' }} href={link.href} target="_blank" key={i}>
							{link.content}
							<ArrowRight size={12} className="ml-2" />
						</a>
					))
				}
			</footer>
		</section>
	)
}

