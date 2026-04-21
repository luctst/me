'use client'

import Image from 'next/image'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useEffect } from 'react'
import { X } from 'lucide-react'
import { Modal } from '@/components/home'
import { createPortal } from 'react-dom'
import { useDrag } from '@/hooks/use-drag'

export function Modals({
  modals,
  setModalsAction,
}: {
  modals: Array<Modal>
  setModalsAction: Dispatch<SetStateAction<Array<Modal>>>
}) {
  const onClickClose = (id: string) =>
    setModalsAction((prev) => prev.filter((modal) => modal.id !== id))

  const bringToFront = useCallback(
    (id: string) =>
      setModalsAction((prev) => {
        const highestValue = prev.reduce(
          (max, obj) => (obj.zIndex > max ? obj.zIndex : max),
          prev[0]?.zIndex ?? 0,
        )

        if (highestValue) {
          return prev.map((modal) =>
            modal.id === id ? { ...modal, zIndex: highestValue + 1 } : modal,
          )
        }

        return prev
      }),
    [setModalsAction],
  )

  const { onMouseDown } = useDrag({
    modals,
    setModals: setModalsAction,
    bringToFront,
  })

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modals.length > 0) {
        const topmost = modals.reduce((max, modal) =>
          modal.zIndex > max.zIndex ? modal : max,
        )
        onClickClose(topmost.id)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [modals])

  return createPortal(
    modals.map((m) => (
      <div
        className="flex flex-col fixed max-w-max hover:cursor-move"
        style={{ left: `${m.x}px`, top: `${m.y}px`, zIndex: m.zIndex }}
        onClick={() => bringToFront(m.id)}
        onMouseDown={(e) => onMouseDown(e, m.id)}
        key={m.id}
        onTouchStart={(e) => onMouseDown(e, m.id)}
        role="dialog"
        aria-modal="true"
        aria-label={m.metadata.name}
      >
        <div className="flex justify-between items-center bg-surface-elevated h-[30px] p-0 px-[10px] w-full min-w-64 box-border">
          <div className="text-foreground font-normal leading-[14px] text-xs md:text-[13px]">
            {m.metadata.name}
          </div>
          <div
            className="modal--header--icon flex items-center justify-end h-full w-[5%] hover:cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => onClickClose(m.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClickClose(m.id)
              }
            }}
          >
            <X className="h-4 w-4 max-h-full max-w-full object-contain" />
          </div>
        </div>
        <div className="bg-surface-elevated relative w-[500px] h-[350px]">
          <Image
            style={{ objectFit: 'contain' }}
            src={m.metadata.url}
            alt="Image Description"
            fill={true}
          />
        </div>
      </div>
    )),
    document.body,
  )
}

