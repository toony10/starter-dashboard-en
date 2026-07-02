"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

const SKELETON_ROW_COUNT = 10

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  })

  const columnCount = columns.length

  return (
    <div className="overflow-hidden rounded-sm border">
      <Table>
        <TableHeader className="bg-primary">
          { table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={ headerGroup.id } className="border-primary/20 hover:bg-transparent">
              { headerGroup.headers.map((header) => (
                <TableHead key={ header.id } className="text-base font-bold text-primary-foreground">
                  { header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    ) }
                </TableHead>
              )) }
            </TableRow>
          )) }
        </TableHeader>
        <TableBody>
          { isLoading ? (
            Array.from({ length: SKELETON_ROW_COUNT }).map((_, rowIndex) => (
              <TableRow key={ `skeleton-${ rowIndex }` }>
                { Array.from({ length: columnCount }).map((_, colIndex) => (
                  <TableCell key={ `skeleton-${ rowIndex }-${ colIndex }` }>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                )) }
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={ columnCount } className="h-24 text-center">
                <span className="text-muted-foreground">No results.</span>
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={ row.id }>
                { row.getVisibleCells().map((cell) => (
                  <TableCell key={ cell.id }>
                    { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                  </TableCell>
                )) }
              </TableRow>
            ))
          ) }
        </TableBody>
      </Table>
    </div>
  )
}
