import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { flexRender } from "@tanstack/react-table"

export const TableContent = ({
    table,
    handleRowClick,
    handleMouseDown,
    handleMouseOver,
    selectedRows
}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {table.getHeaderGroups().map((headerGroup) => (
                        headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                                {flexRender(
                                    header.column.columnDef.header,
                                    {
                                        ...header.getContext(),
                                        checkedItems: table.options.meta?.checkedItems
                                    }
                                )}
                            </TableHead>
                        ))
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map((row, index) => (
                    <TableRow
                        key={row.id}
                        onClick={(e) => handleRowClick(index, e)}
                        onMouseDown={(e) => handleMouseDown(index, e)}
                        onMouseOver={(e) => handleMouseOver(index, e)}
                        className={`
                            ${selectedRows.has(row.original.id) ? "bg-blue-200 hover:bg-blue-200" : ""}
                            data-[state=selected]:bg-muted 
                          `}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell
                                key={cell.id}
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    {
                                        ...cell.getContext(),
                                        checkedItems: table.options.meta?.checkedItems
                                    }
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}