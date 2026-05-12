'use client'
import { memo, useEffect, useMemo, useState } from 'react'
import {
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  InitialTableState,
} from '@tanstack/react-table'
import { Folder, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '@workspace/ui/lib/utils'
import { DataTable } from '@/components/data-table'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { Keys } from '@/components/home'
import projects from '@/public/projects.json'

export type Assets = Array<{ name: string; url: string }>
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
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'expand',
        size: 30,
        maxSize: 30,
        header: () => null,
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="icon"
            className="w-auto hover:cursor-pointer"
            onClick={row.getToggleExpandedHandler()}
            aria-expanded={row.getIsExpanded()}
            aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
          >
            {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
          </Button>
        ),
        meta: {
          children: ({ original }) => (
            <div className="ml-8 my-4 flex items-start justify-center flex-col">
              <div
                className="leading-7 [&:not(:first-child)]:mt-6 text-foreground"
                dangerouslySetInnerHTML={{ __html: original.description }}
              />
              <div className="flex items-center gap-2 mt-2">
                {original.assets.map((a, i) => (
                  <Badge
                    key={i}
                    className="hover:cursor-pointer"
                    onClick={() => createNewModalAction(a)}
                  >
                    {a.name}
                  </Badge>
                ))}
              </div>
            </div>
          ),
        },
      }),
      columnHelper.accessor('name', {
        id: 'name',
        header: () => <div className="capitalize">{active}</div>,
        cell: ({ row }) => (
          <div className="flex items-center h-8">
            {row.getIsExpanded() ? (
              <FolderOpen size={16} />
            ) : (
              <Folder size={16} />
            )}
            <div className="text-foreground font-normal text-base ml-[4px] mr-6">
              {row.original.name}
            </div>
            <div className="flex items-center">
              {row.original.topics.map((t, i, array) => (
                <Badge
                  key={i}
                  className={cn(
                    'bg-accent-badge text-accent-badge-foreground font-medium py-[4px] px-[5px] text-[10px]',
                    i === array.length - 1 ? null : 'mr-2',
                  )}
                  variant="default"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        ),
        size: Number.MAX_SAFE_INTEGER,
      }),
      columnHelper.accessor('date', {
        id: 'date',
        header: 'Date',
        size: 200,
        maxSize: 200,
        cell: ({ getValue }) => getValue(),
        meta: {
          hasBorderLeft: true,
        },
      }),
    ],
    [active],
  )
  const initialState = useMemo<InitialTableState>(
    () => ({
      columnPinning: {
        right: ['date'],
      },
    }),
    [],
  )

  return (
    <>
      <DataTable
        data={projects[active]}
        columns={columns}
        getCoreRowModel={getCoreRowModel()}
        getExpandedRowModel={getExpandedRowModel()}
        initialState={initialState}
        getRowCanExpand={() => true}
      />
      <div
        className={cn(
          'mt-6 flex justify-center overflow-hidden',
          active === 'projects' ? 'visible' : 'invisible',
        )}
      >
        <a
          href="https://github.com/luctst"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'block rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            isMounted ? 'animate-[fadeIn_500ms_ease_forwards]' : null,
          )}
          style={{
            transform: 'translateY(100%)',
            animationDelay: `${4000 + 700}ms`,
          }}
        >
          See more on GitHub →
        </a>
      </div>
    </>
  )
})
