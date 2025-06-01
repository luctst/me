'use client'

import { CSSProperties } from 'react'

import {
	flexRender,
	TableOptions,
	useReactTable,
	Column
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@workspace/ui/components/table"

type Props<TData> = TableOptions<TData>

export function DataTable<TData>(props: Props<TData>) {
	const table = useReactTable(props)

	const getCommonPinningStyles = (column: Column<TData>): CSSProperties => {
		const isPinned = column.getIsPinned()
		const isLastLeftPinnedColumn =
			isPinned === 'left' && column.getIsLastColumn('left')
		const isFirstRightPinnedColumn =
			isPinned === 'right' && column.getIsFirstColumn('right')

		return {
			left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
			right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
			opacity: isPinned ? 0.95 : 1,
			position: isPinned ? 'sticky' : 'relative',
			width: column.getSize(),
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
								<TableHead key={header.id} style={{ ...getCommonPinningStyles(header.column) }} className="odd:border-r-1">
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
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
							{
								row.getIsExpanded() ? (
									<TableRow>
										<TableCell colSpan={row.getAllCells().length}>
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

