'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction, useCallback, useState, useEffect } from "react"
import { X } from "lucide-react"
import { Modal } from "@/components/home"
import { createPortal } from "react-dom"

type DragState = {
	isDragging: boolean
	modalId: string | null
	offset: { x: number; y: number }
}

export function Modals({ modals, setModalsAction }: { modals: Array<Modal>, setModalsAction: Dispatch<SetStateAction<Array<Modal>>> }) {
	const [dragState, setDragState] = useState<DragState>({ isDragging: false, modalId: null, offset: { x: 0, y: 0 } })
	const isMobile = typeof window !== "undefined" && window.innerWidth < 768

	const onClickClose = (id: string) => setModalsAction(prev => prev.filter(modal => modal.id !== id))
	const bringToFront = (id: string) => setModalsAction(prev => {
		const highestValue = prev.reduce((max, obj) => obj.zIndex > max ? obj.zIndex : max, prev[0]?.zIndex ?? 0)

		if (highestValue) {
			return prev.map(modal => modal.id === id ? { ...modal, zIndex: highestValue + 1 } : modal)
		}

		return prev
	})

	const onMouseDown = useCallback((e: any, modalId: string) => {
		const modal = modals.find(m => m.id === modalId)
		if (!modal) return

		bringToFront(modalId)

		const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX
		const clientY = "touches" in e ? e.touches[0]?.clientY : e.clientY

		const offset = {
			x: clientX - modal.x,
			y: clientY - modal.y,
		}

		setDragState({
			isDragging: true,
			modalId,
			offset,
		})

		e.preventDefault()
		e.stopPropagation()
	}, [modals])
	const handleMouseMove = useCallback(
		(e: globalThis.MouseEvent | TouchEvent) => {
			if (!dragState.isDragging || !dragState.modalId) return

			const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX
			const clientY = "touches" in e ? e.touches[0]?.clientY : e.clientY

			const newX = (clientX ?? 0) - dragState.offset.x
			const newY = (clientY ?? 0) - dragState.offset.y

			const boundedX = newX
			const boundedY = newY

			setModalsAction((prev) =>
				prev.map((modal) => (modal.id === dragState.modalId ? { ...modal, x: boundedX, y: boundedY } : modal)),
			)

			e.preventDefault()
			e.stopPropagation()
		},
		[dragState, isMobile],
	)
	const handleMouseUp = useCallback(() => {
		setDragState({
			isDragging: false,
			modalId: null,
			offset: { x: 0, y: 0 },
		})
	}, [])


	useEffect(() => {
		if (dragState.isDragging) {
			document.addEventListener("mousemove", handleMouseMove)
			document.addEventListener("mouseup", handleMouseUp)
			document.addEventListener("touchmove", handleMouseMove, { passive: false })
			document.addEventListener("touchend", handleMouseUp)
		} else {
			document.removeEventListener("mousemove", handleMouseMove)
			document.removeEventListener("mouseup", handleMouseUp)
			document.addEventListener("touchmove", handleMouseMove, { passive: false })
			document.addEventListener("touchend", handleMouseUp)
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove)
			document.removeEventListener("mouseup", handleMouseUp)
			document.removeEventListener("touchmove", handleMouseMove)
			document.removeEventListener("touchend", handleMouseUp)
		}
	}, [dragState.isDragging, handleMouseMove, handleMouseUp])

	return createPortal(modals.map(m => (
		<div className="flex flex-col fixed w-auto max-w-[500px] h-auto max-h-[500px] hover:cursor-move" style={{ left: `${m.x}px`, top: `${m.y}px`, zIndex: m.zIndex }} onClick={() => bringToFront(m.id)} onMouseDown={e => onMouseDown(e, m.id)} key={m.id} onTouchStart={e => onMouseDown(e, m.id)}>
			<div className="flex justify-between items-center bg-[#FFFCF9] h-[30px] min-h-[30px] p-0 px-[10px] w-full min-w-64 box-border">
				<div className="text-[#262626] font-normal leading-[14px] text-xs md:text-[13px]">
					{m.metadata.name}
				</div>
				<div className="modal--header--icon flex items-center justify-end h-full w-[5%] hover:cursor-pointer">
					<X className="h-4 w-4 max-h-full max-w-full object-contain" onClick={() => onClickClose(m.id)} />
				</div>
			</div>
			<div className="bg-[#FFFCF9] relative">
				<Image
					style={{ objectFit: 'contain', maxHeight: 500 }}
					src={m.metadata.url}
					alt="Image Description"
					layout="responsive"
          width={500}
          height={500}
				/>
			</div>
		</div>
	)), document.body);
}

