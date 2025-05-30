'use client'
import { cn } from '@workspace/ui/lib/utils'
import { useMemo, useState } from 'react'

export function Titles() {
	const [titles, setTitles] = useState([
		{ content: 'Projects', active: true, animationDone: false },
		{ content: 'Experiences', active: false, animationDone: false, }
	])

	const isAllAnimationDone = useMemo(() => titles.every(item => item.animationDone), [titles])

	const onAnimationEnd = (mainIndex: number, index: number, length: number) => {
		if (index !== length - 1) return
		
		const newTitles = [...titles]

		if (newTitles[mainIndex]) {
			newTitles[mainIndex].animationDone = true
			setTitles(newTitles)
		}
	} 
	const switchItem = (index: number) => {
		const newTitles = [...titles]

		if (newTitles[index]?.active) return

		const elementIndex = index ? 0 : 1

		if (newTitles[index] && newTitles[elementIndex]) {
			newTitles[index].active = true
			newTitles[elementIndex].active = false
		}

		setTitles(newTitles)
	}

	return (
		<header className="flex items-start flex-wrap justify-between sticky top-0 w-full bg-[#F7F4F0]">
			<div>
				{
					titles.map((t, i) => (
						<h3 key={i} onClick={() => switchItem(i)} className={cn(t.active ? 'text-[#262626]' : 'text-[#A4A4A4] no-underline', 'text-5xl tracking-tight flex items-start font-normal m-0 leading-[3.5rem] flex-wrap w-fit hover:cursor-pointer')}>
							{
								t.content.split('').map((l, y, array) => (
									<span key={y} className="block overflow-hidden">
										<span className="block animate-[fadeInX_500ms_ease_forwards]" style={{ transform: 'translateX(-100%)', animationDelay: `${1200 + y * 250}ms` }} onAnimationEnd={() => onAnimationEnd(i, y, array.length)}>
											{l}
										</span>
									</span>
								))
							}
							{
								t.animationDone ? (
									<>
										<span className="animate-[fadeInX_500ms_ease_forwards] font-normal leading-[11.93px] text-sm ml-[5.48px] no-underline">
											10
										</span>
										<div className={cn(t.active ? 'animate-[widthLeftToRight_500ms_ease_forwards] bg-[#262626]' : 'bg-[#F7F4F0]', 'h-[3px]')} style={{ flex: '0 0 calc(100% - 10px)' }} />
									</>
								) : null
							}
						</h3>
					))
				}
			</div>
			{
				isAllAnimationDone ? (
					<div className="animate-[opacity0to100_400ms_ease_forwards]">
						<button className="hover:cursor-pointer bg-[#FFFCF9] rounded-[2px] text-[#262626] text-sm text-right" style={{outline: 'none', border: 'none', padding: '7px 11px 8px'}}>
							<span className="animate-[blink_1.3s_step-start_0s_infinite]">_</span> activity
						</button>
					</div>
				) : null
			}
		</header>
	)
}

