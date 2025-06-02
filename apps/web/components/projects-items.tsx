'use client'
import { useMemo } from 'react'
import { createColumnHelper, getCoreRowModel, getExpandedRowModel, InitialTableState } from '@tanstack/react-table'
import { Folder, ChevronRight, ChevronDown } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import { ScrollArea } from '@workspace/ui/components/scroll-area'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'

type Props = {
	data: []
}
export type Item = {
	name: string
	date: string
	topics: Array<string>
	description: string
	assets: Array<string>
}

const columnHelper = createColumnHelper<Item>()

export function ProjectItems({ data }: Props) {
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
								row.original.topics.map((t, i) => <Badge key={i} className="bg-[#F1FF4A] text-[#262626] font-medium py-[4px] px-[5px] text-[10px]" variant="default">{t}</Badge>)
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
			size: 100,
			maxSize: 100,
			cell: ({ getValue }) => getValue(),
		})
	]), [])
	const initialState = useMemo<InitialTableState>(() => ({
		columnPinning: {
			right: ['date']
		},
	}), [])

	return <DataTable data={data} columns={columns} getCoreRowModel={getCoreRowModel()} getExpandedRowModel={getExpandedRowModel()} initialState={initialState} getRowCanExpand={() => true}/>
}
