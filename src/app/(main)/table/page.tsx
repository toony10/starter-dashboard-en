import { Pagination } from "@/components/shared/filters/Pagination"
import { ProductsTable, type Product } from "@/components/shared/table/ProductsTable"
import { MainH } from "@/components/shared/text/Headings"

const products: Product[] = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    status: "active",
  },
  {
    id: "PRD-002",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 349.0,
    status: "active",
  },
  {
    id: "PRD-003",
    name: "Stainless Water Bottle",
    category: "Accessories",
    price: 24.5,
    status: "draft",
  },
  {
    id: "PRD-004",
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 89.99,
    status: "active",
  },
  {
    id: "PRD-005",
    name: "Desk Lamp",
    category: "Furniture",
    price: 45.0,
    status: "archived",
  },
  {
    id: "PRD-006",
    name: "Laptop Stand",
    category: "Accessories",
    price: 59.99,
    status: "active",
  },
  {
    id: "PRD-007",
    name: "USB-C Hub",
    category: "Electronics",
    price: 39.99,
    status: "draft",
  },
  {
    id: "PRD-008",
    name: "Monitor Arm",
    category: "Furniture",
    price: 79.0,
    status: "active",
  },
]

export default function TablePage() {
  return (
    <div className="flex flex-col gap-6">
      <MainH
        title="Table"
        description="A reusable DataTable component powered by TanStack Table and shadcn/ui."
      />
      <ProductsTable data={ products } />
      <Pagination pages={ 10 } />
    </div>
  )
}
