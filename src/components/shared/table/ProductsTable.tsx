"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/table/DataTable"
import { Button } from "@/components/ui/button"
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react"

export type Product = {
  id: string
  name: string
  category: string
  price: number
  status: "active" | "draft" | "archived"
}

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Product",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue<number>("price")
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<Product["status"]>("status")
      return <span className="capitalize">{ status }</span>
    },
  },
  {
    id: "actions",
    header: "",
    cell: () => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <EditIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <TrashIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <EyeIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

interface ProductsTableProps {
  data: Product[]
  isLoading?: boolean
}

export function ProductsTable({ data, isLoading }: ProductsTableProps) {
  return <DataTable columns={ columns } data={ data } isLoading={ isLoading } />
}
