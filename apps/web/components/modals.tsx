'use client'

import {Dispatch, SetStateAction, useState} from "react"
import {X} from "lucide-react"
import {Card, CardHeader, CardContent, CardTitle} from "@workspace/ui/components/card"
import {Modal} from "@/components/home"
import { createPortal } from "react-dom"

export function Modals({modals, setModalsAction}: {modals: Array<Modal>, setModalsAction: Dispatch<SetStateAction<Array<Modal>>>}) {
	const onClickClose = (id: string) => setModalsAction(prev => prev.filter(modal => modal.id !== id))
	const bringToFront = (id: string) => setModalsAction(prev => prev.map((modal, i) => modal.id === id ? {...modal, zIndex: modals.length + 100 + 1 + i} : modal))
	
	return createPortal(modals.map((m, i) => (
		<Card className="fixed w-96 hover:cursor-grab shadow-2xl border-2 bg-white/95 backdrop-blur-sm transition-shadow" key={i} style={{left: `${m.x}px`, top: `${m.y}px`, zIndex: m.zIndex}} onClick={() => bringToFront(m.id)}>
			<CardHeader className="flex items-center justify-between">
				<CardTitle>{m.metadata.name}</CardTitle>
				<X onClick={() => onClickClose(m.id)} className="hover:cursor-pointer"/>
			</CardHeader>
		</Card>
	)), document.body)
}

