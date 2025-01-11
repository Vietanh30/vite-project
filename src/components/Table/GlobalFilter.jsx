import React from "react"
import { Input } from "@/components/ui/input"

const GlobalFilter = ({ table }) => {
    // Use the table's built-in globalFilter state
    const globalFilter = table.getState().globalFilter

    // Use setGlobalFilter from table instance
    const handleFilterChange = (event) => {
        table.setGlobalFilter(event.target.value)
    }
    return (
        <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={handleFilterChange}
            className="max-w-sm"
        />
    )
}

export default GlobalFilter