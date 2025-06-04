'use client'

export function Mobile() {
	return (
		<section className="flex flex-col justify-between h-[100vh] pt-[31px]">
			<header className="overflow-hidden">
				<h1 className="text-base m-0 font-medium text-[#262626] mb-[5px] leading-[17.09px]">
					<span className="block overflow-hidden">
						<span className="block overflow-hidden animate-[fadeIn_500ms_ease_forwards]" style={{transform: 'translateY(100%)', animationDelay: '400ms'}}>Lucas Tostée</span>
					</span>
				</h1>
				<h2 className="text-base font-light text-[#262626] m-0">
					<span className="block overflow-hidden">
						<span className="block overflow-hidden animate-[fadeIn_500ms_ease_forwards]" style={{transform: 'translateY(100%)', animationDelay: '400ms'}}>
							<span className="animate-[blink_1s_linear_infinite]">_</span> Freelance Full Stack Js
						</span>
					</span>
				</h2>
			</header>
			<main className="overflow-hidden">
				<h3 className="animate-[fadeIn_1000ms_ease_forwards] font-normal m-0 text-center text-[#262626]" style={{transform: 'translateY(100%)', animationDelay: '600ms'}}>
					Scroll to explore some of my <span className="font-normal text-base text-[#A4A4A4]">projects</span> or check my Github
				</h3>
			</main>
			<footer className="flex items-center justify-between overflow-hidden">
			</footer>
		</section>
	)
}

