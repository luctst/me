'use client'

import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useState, useEffect } from 'react'
import type { Modal } from '@/components/home'

type DragState = {
  isDragging: boolean
  modalId: string | null
  offset: { x: number; y: number }
}

type UseDragParams = {
  modals: Array<Modal>
  setModals: Dispatch<SetStateAction<Array<Modal>>>
  bringToFront: (id: string) => void
}

export function useDrag({ modals, setModals, bringToFront }: UseDragParams) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    modalId: null,
    offset: { x: 0, y: 0 },
  })

  const onMouseDown = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
      modalId: string,
    ) => {
      const modal = modals.find((m) => m.id === modalId)
      if (!modal) return

      bringToFront(modalId)

      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY

      const offset = {
        x: (clientX ?? 0) - modal.x,
        y: (clientY ?? 0) - modal.y,
      }

      setDragState({
        isDragging: true,
        modalId,
        offset,
      })

      e.preventDefault()
      e.stopPropagation()
    },
    [modals, bringToFront],
  )

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent | TouchEvent) => {
      if (!dragState.isDragging || !dragState.modalId) return

      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY

      const newX = (clientX ?? 0) - dragState.offset.x
      const newY = (clientY ?? 0) - dragState.offset.y

      const boundedX = newX
      const boundedY = newY

      setModals((prev) =>
        prev.map((modal) =>
          modal.id === dragState.modalId
            ? { ...modal, x: boundedX, y: boundedY }
            : modal,
        ),
      )

      e.preventDefault()
      e.stopPropagation()
    },
    [dragState, setModals],
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
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleMouseMove, {
        passive: false,
      })
      document.addEventListener('touchend', handleMouseUp)
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleMouseMove)
      document.removeEventListener('touchend', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleMouseMove)
      document.removeEventListener('touchend', handleMouseUp)
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp])

  return { onMouseDown }
}
