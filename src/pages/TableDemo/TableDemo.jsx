import * as React from "react"

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "@/components/ui/context-menu"

import { TableHeader } from "@/components/Table/TableHeader"
import { TableContent } from "@/components/Table/TableContent"
import { TablePagination } from "@/components/Table/TablePagination"
// import { columns, data } from "@/components/Table/TableData"
import { useTableLogic } from "@/components/Table/useTableLogic"
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import AddDataDialog from "@/components/Table/AddDataDialog"
import ExportButton from "@/components/Table/ExportButton"


const TableDemo = ({ data, columns }) => {
    const {
        selectedRows,
        checkedItems,
        setCheckedItems,
        setIsMouseDown,
        setDragStartIndex,
        handleRowClick,
        handleMouseDown,
        handleMouseOver,
        handleCheckSelected,
        handleUncheckSelected,
        handleSelectAll,
        handleUnselectAll,
        handleInvertSelection
    } = useTableLogic(data)
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [tableData, setTableData] = React.useState(data)
    const [newRowData, setNewRowData] = React.useState({
        email: '',
        amount: '',
        status: 'pending'
    })
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        meta: {
            checkedItems,
            setCheckedItems
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    // Hàm xử lý thêm dữ liệu mới
    const handleAddData = () => {
        const newRow = {
            id: `id-${Math.random().toString(36).substr(2, 9)}`,
            ...newRowData,
        }
        console.log("newRow", newRow);
        setTableData((prev) => [...prev, newRow])
        setNewRowData({ email: "", amount: "", status: "pending" })
        setIsDialogOpen(false)

    }

    return (
        <>
            <div className="w-2/3 justify-center mx-auto">
                <div className="container mx-auto p-4 relative select-none"
                    onMouseUp={() => {
                        setIsMouseDown(false)
                        setDragStartIndex(null)
                    }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Enhanced Table</h1>

                        <div className="flex gap-2">
                            <TableHeader table={table} />
                            <ExportButton tableData={tableData} />

                            <AddDataDialog
                                newRowData={newRowData}
                                setNewRowData={setNewRowData}
                                handleAddData={handleAddData}
                            />
                        </div>
                    </div>
                    <div className="border rounded">

                        <ContextMenu>
                            <ContextMenuTrigger>
                                <TableContent
                                    table={table}
                                    handleRowClick={handleRowClick}
                                    handleMouseDown={handleMouseDown}
                                    handleMouseOver={handleMouseOver}
                                    selectedRows={selectedRows}
                                />
                            </ContextMenuTrigger>
                            <ContextMenuContent className="w-64">
                                {/* Selection Controls */}
                                <ContextMenuItem onClick={handleSelectAll}>
                                    Select All Rows
                                    <ContextMenuShortcut>⌘A</ContextMenuShortcut>
                                </ContextMenuItem>

                                <ContextMenuItem onClick={handleUnselectAll}>
                                    Unselect All Rows
                                    <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                                </ContextMenuItem>

                                <ContextMenuItem onClick={handleInvertSelection}>
                                    Invert Selection
                                    <ContextMenuShortcut>⌘I</ContextMenuShortcut>
                                </ContextMenuItem>

                                {selectedRows.size > 0 && (
                                    <>
                                        <ContextMenuSeparator />
                                        <ContextMenuItem onClick={handleCheckSelected}>
                                            Check Selected Rows ({selectedRows.size})
                                            <ContextMenuShortcut>⌘K</ContextMenuShortcut>
                                        </ContextMenuItem>

                                        <ContextMenuItem onClick={handleUncheckSelected}>
                                            Uncheck Selected Rows ({selectedRows.size})
                                            <ContextMenuShortcut>⌘U</ContextMenuShortcut>
                                        </ContextMenuItem>
                                    </>
                                )}
                            </ContextMenuContent>
                        </ContextMenu>
                    </div>
                    {/* Rest of your table code */}
                </div>
                <TablePagination table={table} checkedItems={checkedItems} />

            </div>
        </>
    )
}

export default TableDemo