// components/Table/tableData.js
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export const data = [
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@yahoo.com",
    },
    {
        id: "3u1reuv4",
        amount: 242,
        status: "success",
        email: "Abe45@gmail.com",
    },
    {
        id: "derv1ws0",
        amount: 837,
        status: "processing",
        email: "Monserrat44@gmail.com",
    },
    {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@gmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    }
]

export const columns = [
    {
        accessorKey: "id",
        header: "No.",
        cell: ({ row }) => row.index + 1,
    },
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row, table, checkedItems }) => (
            <Checkbox
                checked={row.getIsSelected() || checkedItems?.has(row.original.id)}
                onCheckedChange={(value) => {
                    row.toggleSelected(!!value)
                    if (checkedItems?.has(row.original.id)) {
                        const newCheckedItems = new Set(checkedItems)
                        newCheckedItems.delete(row.original.id)
                        table.options.meta?.setCheckedItems(newCheckedItems)
                    }
                }}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
]

// Mock data generator function if you need more data
export function generateMockData(count = 20) {
    const mockData = []
    const statuses = ['success', 'processing', 'failed']

    for (let i = 0; i < count; i++) {
        mockData.push({
            id: `id-${i}`,
            amount: Math.floor(Math.random() * 1000),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            email: `user${i}@example.com`
        })
    }

    return mockData
}

// Optional: Use this to generate more mock data
// export const data = generateMockData(50)