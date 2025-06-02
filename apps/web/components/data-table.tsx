'use client'

import { CSSProperties } from 'react'

import {
	flexRender,
	TableOptions,
	useReactTable,
	Column,
	Row,
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@workspace/ui/components/table"
import {ScrollArea} from '@workspace/ui/components/scroll-area'
import {Badge} from '@workspace/ui/components/badge'
import { cn } from '@workspace/ui/lib/utils'

type Props<TData> = TableOptions<TData>

declare module '@tanstack/react-table' {
	interface ColumnMeta<TData, TValue> {
		cellCustomClass?: string
		headerCustomClass?: string
		hasBorder?: boolean
	}
}

export function DataTable<TData>(props: Props<TData>) {
	const table = useReactTable(props)

	const getCommonPinningStyles = (column: Column<TData>): CSSProperties => {
		const isPinned = column.getIsPinned()

		return {
			left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
			right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
			opacity: isPinned ? 0.95 : 1,
			position: isPinned ? 'sticky' : 'relative',
			width: column.getSize() === Number.MAX_SAFE_INTEGER ? 'auto' : column.getSize(),
			maxWidth: column.columnDef.maxSize,
			minWidth: column.getSize() === Number.MAX_SAFE_INTEGER ? 0 : undefined,
			zIndex: isPinned ? 1 : 0,
		}
	}

	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<TableHead key={header.id} style={{ ...getCommonPinningStyles(header.column) }} className={cn(header.column.columnDef.meta?.hasBorder && 'border-r-1', header.column.columnDef.meta?.headerCustomClass)}>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
								</TableHead>
							)
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<>
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
								className="transition-colors group"
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className={cn("group-hover:bg-accent", cell.column.columnDef.meta?.cellCustomClass)} style={{ ...getCommonPinningStyles(cell.column) }}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
							{
								row.getIsExpanded() ? (
									<TableRow className="bg-transparent" key={`${row.id}-expanded`}>
										<TableCell colSpan={row.getVisibleCells().length} className="p-0 relative whitespace-normal">
											<div className="ml-4 mt-2 flex items-start justify-center flex-col">
												<p className="leading-7 [&:not(:first-child)]:mt-6 text-[#262626]">{row.original.description}</p>
												<div className="flex items-center mt-2">
													{
														row.original.assets.map((a, i) => <Badge key={i} className="odd:mr-2 hover:cursor-pointer">{a}</Badge>)
													}
												</div>
											</div>
										</TableCell>
									</TableRow>
								) : null
							}
						</>
					))
				) : (
					<TableRow>
						<TableCell colSpan={props.columns.length} className="h-24 text-center">
							No results.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}

