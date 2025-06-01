'use client'
import { useMemo } from 'react'
import { createColumnHelper, getCoreRowModel, getExpandedRowModel, InitialTableState } from '@tanstack/react-table'
import { Folder, ChevronRight, ChevronDown } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import { ScrollArea } from '@workspace/ui/components/scroll-area'
import { Badge } from '@workspace/ui/components/badge'

type Props = {
	data: []
}
type Item = {
	name: string
	date: string
	topics: Array<string>
}

const columnHelper = createColumnHelper<Item>()

export function ProjectItems({ data }: Props) {
	const columns = useMemo(() => ([
		columnHelper.accessor('name', {
			id: 'name',
			header: 'Project',
			cell: ({ row }) => (
				<div className="flex items-center h-8 hover:cursor-pointer">
					{
						row.getCanExpand() ? (
							row.getIsExpanded() ? <ChevronDown className="text-[#262626] h-4 w-4" onClick={row.getToggleExpandedHandler()} /> : <ChevronRight className="text-[#262626] h-4 w-4" onClick={row.getToggleExpandedHandler()} />
						) : null
					}
					<Folder className="h-4 w-4" />
					<div className="text-[#262626] font-light text-lg ml-2 mr-6">{row.original.name}</div>
					<ScrollArea className="w-full whitespace-nowrap">
						<div className="flex items-center">
							{
								row.original.topics.map((t, i) => <Badge key={i} className="bg-[#F1FF4A] text-[#262626] font-medium py-[4px] px-[5px] text-[10px]" variant="default">{t}</Badge>)
							}
						</div>
					</ScrollArea>
				</div>
			),
			minSize: 500,
		}),
		columnHelper.accessor('date', {
			id: 'date',
			header: 'Date',
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
