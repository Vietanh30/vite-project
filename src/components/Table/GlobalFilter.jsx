import React from "react"
import { Input } from "@/components/ui/input"

const GlobalFilter = ({ table }) => {
    const [globalFilter, setGlobalFilter] = React.useState("")

    // Lấy tất cả các trường từ columns
    const columns = React.useMemo(() => {
        return table.getAllColumns()
            .filter(column => column.getCanFilter())
            .map(column => column.id)
    }, [table])

    // Xử lý thay đổi giá trị tìm kiếm
    const handleFilterChange = (event) => {
        const value = event.target.value;
        setGlobalFilter(value);

        // Log giá trị để kiểm tra
        console.log("Global Filter Value: ", value);

        // Áp dụng filter cho tất cả các cột
        columns.forEach(columnId => {
            const column = table.getColumn(columnId);
            if (column) {
                column.setFilterValue(value);
                console.log(`Setting filter for ${columnId} to ${value}`);
            }
        });
    };
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