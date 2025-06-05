'use client'
import { memo, useMemo } from 'react'
import { createColumnHelper, getCoreRowModel, getExpandedRowModel, InitialTableState } from '@tanstack/react-table'
import { Folder, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '@workspace/ui/lib/utils'
import { DataTable } from '@/components/data-table'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { Keys } from '@/components/home'
import projects from '@/public/projects.json'

export type Assets = Array<{ name: string, url: string }>
type Props = {
	createNewModalAction: (asset: Assets[number]) => void
	active: Keys
}
type Item = {
	name: string
	date: string
	topics: Array<string>
	description: string
	assets: Assets
}

const columnHelper = createColumnHelper<Item>()

export const ProjectItems = memo(({ active, createNewModalAction }: Props) => {
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
			header: () => <div className="capitalize">{active}</div>,
			cell: ({ row }) => (
				<div className="flex items-center h-8">
					{
						row.getIsExpanded() ? <FolderOpen size={16} /> : <Folder size={16} />
					}
					<div className="text-[#262626] font-normal text-base ml-[4px] mr-6">{row.original.name}</div>
					<div className="flex items-center">
						{
							row.original.topics.map((t, i, array) => <Badge key={i} className={cn("bg-[#F1FF4A] text-[#262626] font-medium py-[4px] px-[5px] text-[10px]", i === array.length - 1 ? null : 'mr-2')} variant="default">{t}</Badge>)
						}
					</div>
				</div>
			),
			size: Number.MAX_SAFE_INTEGER,
		}),
		columnHelper.accessor('date', {
			id: 'date',
			header: 'Date',
			size: 150,
			maxSize: 150,
			cell: ({ getValue }) => getValue(),
			meta: {
				hasBorderLeft: true,
			},
		})
	]), [active])
	const initialState = useMemo<InitialTableState>(() => ({
		columnPinning: {
			right: ['date']
		},
	}), [])

	return <DataTable data={projects[active]} columns={columns} getCoreRowModel={getCoreRowModel()} getExpandedRowModel={getExpandedRowModel()} initialState={initialState} getRowCanExpand={() => true} />
})
