'use client'

import { CSSProperties, Fragment, useEffect, useState } from 'react'

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
import { cn } from '@workspace/ui/lib/utils'

type Props<TData> = TableOptions<TData>

declare module '@tanstack/react-table' {
	interface ColumnMeta<TData, TValue> {
		children?: (rox: Row<TData>) => Renderable<any>
		cellCustomClass?: string
		headerCustomClass?: string
		hasBorderLeft?: boolean
	}
}

export function DataTable<TData>(props: Props<TData>) {
	const table = useReactTable(props)
	const [isMounted, setIsMounted] = useState(false)

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

	useEffect(() => {
		setIsMounted(true)
		return () => setIsMounted(false)
	}, [])

	const innerRow = (row: Row<TData>, i: number) => {
		const cells = row.getVisibleCells();
		const firstCell = cells[0];
		const childrenFunction = firstCell?.column.columnDef.meta?.children;
		const context = cells[i]?.getContext();

		if (childrenFunction) {
			return flexRender(childrenFunction(row), context);
		}

		return null;
	}

	return (
		<Table className={cn(isMounted ? 'animate-[fadeIn_500ms_ease_forwards]' : null)} style={{ transform: 'translateY(100%)', animationDelay: `${4000 + 250}ms` }}>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<TableHead key={header.id} style={{ ...getCommonPinningStyles(header.column) }} className={cn(header.column.columnDef.meta?.headerCustomClass)}>
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
					table.getRowModel().rows.map((row, i) => (
						<Fragment key={row.id}>
							<TableRow
								data-state={row.getIsSelected() && "selected"}
								className={cn("transition-colors group")}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className={cn("group-hover:bg-[#F7F4F0] hover:bg-[#F7F4F0] bg-[#F7F4F0]", cell.column.columnDef.meta?.cellCustomClass)} style={{ ...getCommonPinningStyles(cell.column) }}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
							{
								row.getIsExpanded() ? (
									<TableRow className="bg-transparent" key={`${row.id}-expanded`}>
										<TableCell colSpan={row.getVisibleCells().length} className="p-0 relative whitespace-normal">
											{innerRow(row, i)}
										</TableCell>
									</TableRow>
								) : null
							}
						</Fragment>
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

