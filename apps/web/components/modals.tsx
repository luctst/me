'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction, useCallback, MouseEvent, useState, useEffect } from "react"
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

	const onClickClose = (id: string) => setModalsAction(prev => prev.filter(modal => modal.id !== id))
	const bringToFront = (id: string) => setModalsAction(prev => {
		const highestValue = prev.reduce((max, obj) => obj.zIndex > max ? obj.zIndex : max, prev[0]?.zIndex)

		if (highestValue) {
			return prev.map((modal, i) => modal.id === id ? { ...modal, zIndex: highestValue + 1 } : modal)
		}

		return prev
	})

	const onMouseDown = useCallback((e: MouseEvent, modalId: string) => {
		const modal = modals.find(m => m.id === modalId)
		if (!modal) return

		bringToFront(modalId)

		const offset = {
			x: e.clientX - modal.x,
			y: e.clientY - modal.y,
		}

		setDragState({
			isDragging: true,
			modalId,
			offset,
		})

		e.preventDefault()
	}, [modals])
	const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragState.isDragging || !dragState.modalId) return

      const newX = e.clientX - dragState.offset.x
      const newY = e.clientY - dragState.offset.y

      const maxX = window.innerWidth - 400
      const maxY = window.innerHeight - 300
      const boundedX = Math.max(0, Math.min(newX, maxX))
      const boundedY = Math.max(0, Math.min(newY, maxY))

      setModalsAction((prev) =>
        prev.map((modal) => (modal.id === dragState.modalId ? { ...modal, x: boundedX, y: boundedY } : modal)),
      )
    },
    [dragState],
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
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
	}, [dragState.isDragging, handleMouseMove, handleMouseUp])

	return createPortal(modals.map(m => (
		<div className="flex flex-col fixed max-w-max" style={{ left: `${m.x}px`, top: `${m.y}px`, zIndex: m.zIndex }} onClick={() => bringToFront(m.id)} onMouseDown={e => onMouseDown(e, m.id)} key={m.id}>
      <div className="flex justify-between items-center bg-[#FFFCF9] h-[30px] p-0 px-[10px] w-full min-w-64 box-border">
        <div className="text-[#262626] font-normal leading-[14px] text-xs md:text-[13px]">
          {m.metadata.name}
        </div>
        <div className="modal--header--icon flex items-center justify-end h-full w-[5%] hover:cursor-pointer">
					<X className="h-4 w-4 max-h-full max-w-full object-contain" onClick={() => onClickClose(m.id)}/>
        </div>
      </div>
      <div className="bg-[#FFFCF9] relative">
        <Image
					style={{objectFit: 'contain'}}
          src={m.metadata.url} 
          alt="Image Description"
          layout="responsive" 
					fill={true}
        />
      </div>
    </div>
  )), document.body);
}

