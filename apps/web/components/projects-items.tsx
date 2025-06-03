'use client'
import { useMemo } from 'react'
import { createColumnHelper, getCoreRowModel, getExpandedRowModel, InitialTableState} from '@tanstack/react-table'
import { Folder, ChevronRight, ChevronDown } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import { ScrollArea } from '@workspace/ui/components/scroll-area'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'

export type Assets = Array<{name: string, url: string}>
type Props = {
	data: []
	createNewModalAction: (asset: Assets[number]) => void
}
type Item = {
	name: string
	date: string
	topics: Array<string>
	description: string
	assets: Assets 
}

const columnHelper = createColumnHelper<Item>()

export function ProjectItems({ data, createNewModalAction }: Props) {
	const columns = useMemo(() => ([
		columnHelper.display({
			id: 'expand',
			size: 30,
			maxSize: 30,
			header: () => null,
			cell: ({ row }) => (
				<Button variant="ghost" size="icon" className="w-auto hover:cursor-pointer" onClick={row.getToggleExpandedHandler()}>
					{
						row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />
					}
				</Button>
			),
			meta: {
				children: ({ original }) => (
					<div className="ml-8 my-4 flex items-start justify-center flex-col">
						<p className="leading-7 [&:not(:first-child)]:mt-6 text-[#262626]">{original.description}</p>
						<div className="flex items-center mt-2">
							{
								original.assets.map((a, i) => <Badge key={i} className="odd:mr-2 hover:cursor-pointer" onClick={() => createNewModalAction(a)}>{a.name}</Badge>)
							}
						</div>
					</div>
				)
			},
		}),
		columnHelper.accessor('name', {
			id: 'name',
			header: 'Project',
			cell: ({ row }) => (
				<div className="flex items-center h-8">
					<Folder className="h-4 w-4" />
					<div className="text-[#262626] font-light text-lg ml-[4px] mr-6">{row.original.name}</div>
					<ScrollArea className="w-full whitespace-nowrap">
						<div className="flex items-center">
							{
								row.original.topics.map((t, i) => <Badge key={i} className="bg-[#F1FF4A] text-[#262626] font-medium py-[4px] px-[5px] text-[10px] odd:mr-2" variant="default">{t}</Badge>)
							}
						</div>
					</ScrollArea>
				</div>
			),
			size: Number.MAX_SAFE_INTEGER,
			meta: {
				hasBorder: true,
			},
		}),
		columnHelper.accessor('date', {
			id: 'date',
			header: 'Date',
			size: 150,
			maxSize: 150,
			cell: ({ getValue }) => getValue(),
		})
	]), [])
	const initialState = useMemo<InitialTableState>(() => ({
		columnPinning: {
			right: ['date']
		},
	}), [])

	return <DataTable data={data} columns={columns} getCoreRowModel={getCoreRowModel()} getExpandedRowModel={getExpandedRowModel()} initialState={initialState} getRowCanExpand={() => true} />
}
