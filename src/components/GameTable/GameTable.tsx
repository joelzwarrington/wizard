import type { Game } from '@/schemas/game'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Badge } from '../ui/badge'
import { NavLink } from 'react-router'

export const columns: ColumnDef<Game>[] = [
  {
    accessorKey: 'completed',
    header: 'Status',
    cell: ({ row }) => {
      const isCompleted = row.getValue<boolean>('completed')

      return isCompleted ? (
        <Badge variant="outline">Completed</Badge>
      ) : (
        <Badge variant="secondary">In progress</Badge>
      )
    }
  },
  {
    accessorKey: 'datetime',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('datetime'))
      const id = row.original.id

      return (
        <NavLink to={`/games/${id}`}>{new Date(date).toLocaleString()}</NavLink>
      )
    }
  }
]

interface GameTableProps {
  data: Game[]
}

export function GameTable({ data }: GameTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
