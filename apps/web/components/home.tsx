'use client'
import { Dispatch, SetStateAction, useMemo, useState, memo } from 'react'
import { cn } from '@workspace/ui/lib/utils'
import projects from '@/public/projects.json'
import { ProjectItems, Assets } from '@/components/projects-items'
import { Modals } from '@/components/modals'

export type Keys = 'projects' | 'experiences'

export type Modal = {
	id: string
	x: number
	y: number
	zIndex: number
	metadata: Assets[number]
}

export function Home() {
	const [active, setActive] = useState<Keys>('projects')
	const [modals, setModals] = useState<Array<Modal>>([])

	const createNewModal = (asset: Assets[number]) => {
		const minX = 10
    const minY = 10
    const maxX = window.innerWidth - 500 - 10
    const maxY = window.innerHeight - 500 - 10
    const x = Math.max(minX, Math.min(minX + Math.random() * (maxX - minX), maxX))
    const y = Math.max(minY, Math.min(minY + Math.random() * (maxY - minY), maxY))

		const newModal = {
			id: Math.random().toString(36).substr(2, 9),
			y,
			x,
			zIndex: modals.length + 100,
			metadata: asset
		}

		setModals(prev => [...prev, newModal])
	}

	return (
		<>
			<Titles action={setActive} keyActive={active} />
			<main className="mt-8">
				<ProjectItems active={active} createNewModalAction={createNewModal} />
			</main>
			<Modals modals={modals} setModalsAction={setModals} />
		</>
	)
}

export const Titles = memo(({ action, keyActive }: { action: Dispatch<SetStateAction<Keys>>, keyActive: Keys }) => {
	const [titles, setTitles] = useState<Array<{ content: Keys, animationDone: boolean }>>([
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
							<button onClick={openMaltProfile} className="bg-[#F1FF4A] hover:cursor-pointer rounded-[2px] text-[#262626] text-sm text-right" style={{ outline: 'none', border: 'none', padding: '7px 11px 8px' }}>
								<span className="animate-[blink_1.3s_step-start_0s_infinite]">_</span> Hire me
							</button>
						</div>
					</>
				) : null
			}
		</header>
	)
}) 

