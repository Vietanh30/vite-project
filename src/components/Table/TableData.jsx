// components/Table/tableData.js
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

// Helper function để tạo columns động từ data
export const generateColumns = (data) => {
    if (!data || !data.length) return []

    // Lấy tất cả các trường từ data
    const fields = new Set()
    data.forEach(row => {
        Object.keys(row).forEach(key => fields.add(key))
    })

    // Column cố định cho số thứ tự và checkbox
    const fixedColumns = [
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
            accessorKey: "id", // Cột ID cố định
            header: "ID",
        },
    ]

    // Tạo columns động từ fields (bỏ qua cột ID)
    const dynamicColumns = Array.from(fields).filter(field => field !== "id").map(field => ({
        accessorKey: field,
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                {field.charAt(0).toUpperCase() + field.slice(1)} {/* Capitalize first letter */}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        enableSorting: true,
        enableColumnFilter: true,
    }))

    return [...fixedColumns, ...dynamicColumns]
}