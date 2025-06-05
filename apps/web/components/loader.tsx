'use client'
import { useEffect, useRef, useState, ReactNode } from 'react';
import loader from '@/public/loader.json'

export function Loading({children}: { children: ReactNode}) {
	const [showLoader, setShowLoader] = useState(true)
	const [loaderContent, setLoaderContent] = useState(loader[0]?.split('\n').map(content => ({content, active: false, pl: Math.floor(Math.random() * ((50 - 0) - 0 + 1) - 0 + 1)})))

	const loaderContainer = useRef(null)
	const innerLoader = useRef(null)

	const handleLoader = () => {
		const resizer = new ResizeObserver(entries => {
			entries[0]?.target.scrollIntoView({block: "end", inline: "nearest", behavior: 'smooth'})
		})

		resizer.observe(innerLoader.current)

		let timeoutId;
		let iterator = 0;
	
		timeoutId = setInterval(() => {
			if (loaderContent?.length === iterator) {
				clearInterval(timeoutId)

				timeoutId = null
				iterator = 0

				resizer.disconnect()
				loaderContainer.current?.classList.add('animate-[opacity100to0_1400ms_ease_forwards]')
				setTimeout(() => {
					window.scrollTo({top: 0, behavior: 'smooth'})
					setShowLoader(false)
				}, 2000)
				return
			}

			const	newLoaderContent = [...loaderContent]

			newLoaderContent[iterator].active = true
			setLoaderContent(newLoaderContent)

			iterator = iterator + 1
		}, 55)
	}

	useEffect(() => handleLoader(), [])

	if (showLoader === false) return children

  return (
		<main className="box-border mt-10 min-h-screen relative" ref={loaderContainer}>
			<div className="pb-10" ref={innerLoader}>
				{
					loaderContent?.map((c, i) => {
						if (c.active === false) return null	

						return (
						<p key={i} style={{paddingLeft: `${c.pl}px`}} className="text-base font-normal my-1.5 text-[#262626]">
							<span className="block">
								<span className="block animate-[fadeIn_500ms_ease_forwards]" style={{transform: 'translateY(100%)'}}>{c.content}</span>
							</span>
						</p>
					)})
				}
			</div>
		</main>
  );
};

