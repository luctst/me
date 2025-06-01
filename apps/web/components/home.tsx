'use client'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { cn } from '@workspace/ui/lib/utils'
import projects from '@/public/projects.json'
import {ProjectItems} from '@/components/projects-items'

type Keys = 'projects' | 'experiences'

export function Home() {
	const [active, setActive] = useState<Keys>('projects')

	return (
		<>
			<Titles action={setActive} keyActive={active}/>
			<section className="will-change-[filter] overflow-hidden blur-0">
				<div className="animate-[opacity0to100_1000ms_ease_forwards]">
					<ProjectItems data={projects[active]}/>
				</div>
			</section>
		</>
	)
}

export function Titles({action, keyActive}: {action: Dispatch<SetStateAction<Keys>>, keyActive: Keys}) {
	const [titles, setTitles] = useState<Array<{content: Keys, animationDone: boolean}>>([
		{ content: 'projects', animationDone: false },
		{ content: 'experiences', animationDone: false, }
	])

	const isAllAnimationDone = useMemo(() => titles.every(item => item.animationDone), [titles])

	const parseNumber = (key: Keys) => projects[key].length
	const openMaltProfile = () => window.open('https://www.malt.fr/profile/lucastostee')
	const onAnimationEnd = (mainIndex: number, index: number, length: number) => {
		if (index !== length - 1) return
		
		const newTitles = [...titles]

		if (newTitles[mainIndex]) {
			newTitles[mainIndex].animationDone = true
			setTitles(newTitles)
		}
	} 
	const switchItem = (index: number) => {
		if (titles[index]) {
			if (keyActive === titles[index].content) return
			action(titles[index].content)
		}
	}

	return (
		<header className="flex items-start flex-wrap justify-between sticky top-0 w-full bg-[#F7F4F0]">
			<div>
				{
					titles.map((t, i) => (
						<h3 key={i} onClick={() => switchItem(i)} className={cn(keyActive === t.content ? 'text-[#262626]' : 'text-[#A4A4A4] no-underline', 'text-5xl tracking-tight flex items-start font-normal m-0 leading-[3.5rem] flex-wrap w-fit hover:cursor-pointer')}>
							{
								t.content.split('').map((l, y, array) => (
									<span key={y} className="block overflow-hidden">
										<span className={cn("block animate-[fadeInX_500ms_ease_forwards]", y === 0 ? 'capitalize' : null)} style={{ transform: 'translateX(-100%)', animationDelay: `${1200 + y * 250}ms` }} onAnimationEnd={() => onAnimationEnd(i, y, array.length)}>
											{l}
										</span>
									</span>
								))
							}
							{
								t.animationDone ? (
									<>
										<span className="animate-[fadeInX_500ms_ease_forwards] font-normal leading-[11.93px] text-sm ml-[5.48px] no-underline">
											{parseNumber(t.content)}
										</span>
										<div className={cn(keyActive === t.content ? 'animate-[widthLeftToRight_500ms_ease_forwards] bg-[#262626]' : 'bg-[#F7F4F0]', 'h-[3px]')} style={{ flex: '0 0 calc(100% - 10px)' }} />
									</>
								) : null
							}
						</h3>
					))
				}
			</div>
			{
				isAllAnimationDone ? (
					<>
						<div className="animate-[opacity0to100_400ms_ease_forwards]">
							<button onClick={openMaltProfile} className="hover:cursor-pointer bg-[#FFFCF9] rounded-[2px] text-[#262626] text-sm text-right" style={{outline: 'none', border: 'none', padding: '7px 11px 8px'}}>
								<span className="animate-[blink_1.3s_step-start_0s_infinite]">_</span> Hire me
							</button>
						</div>
					</>
				) : null
			}
		</header>
	)
}

