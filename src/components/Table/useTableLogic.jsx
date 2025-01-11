import * as React from "react"

export const useTableLogic = (data) => {
    // Thay đổi từ Set sang Map để lưu trữ cặp id -> row data
    const [selectedRows, setSelectedRows] = React.useState(new Map())
    const [checkedItems, setCheckedItems] = React.useState(new Map())
    const [lastSelectedIndex, setLastSelectedIndex] = React.useState(null)
    const [isMouseDown, setIsMouseDown] = React.useState(false)
    const [dragStartIndex, setDragStartIndex] = React.useState(null)
    console.log("selectedRows: " + selectedRows)
    // Convert Map to Array for better console logging
    React.useEffect(() => {
        console.log("Selected Rows as Array:", Array.from(selectedRows, ([id, row]) => row))
        console.log("Selected Rows Map:", {
            size: selectedRows.size,
            entries: Object.fromEntries(selectedRows)
        })
    }, [selectedRows])
    const handleRowClick = React.useCallback(
        (index, event) => {
            if (event.type === "contextmenu") return

            event.preventDefault()
            const newSelectedRows = new Map(selectedRows)
            const currentRow = data[index]
            const currentId = currentRow.id

            // Xử lý chọn nhiều với Shift + Click
            if (event.shiftKey && lastSelectedIndex !== null) {
                const start = Math.min(lastSelectedIndex, index)
                const end = Math.max(lastSelectedIndex, index)
                newSelectedRows.clear()
                for (let i = start; i <= end; i++) {
                    const row = data[i]
                    newSelectedRows.set(row.id, row)
                }
            }
            // Xử lý chọn nhiều với Ctrl/Cmd + Click
            else if (event.ctrlKey || event.metaKey) {
                if (newSelectedRows.has(currentId)) {
                    newSelectedRows.delete(currentId)
                } else {
                    newSelectedRows.set(currentId, currentRow)
                }
            }
            // Click thường - chọn 1 row
            else {
                newSelectedRows.clear()
                newSelectedRows.set(currentId, currentRow)
            }

            setSelectedRows(newSelectedRows)
            setLastSelectedIndex(index)
        },
        [selectedRows, lastSelectedIndex, data]
    )

    const handleMouseDown = React.useCallback(
        (index, event) => {
            if (event.button === 2) return

            setIsMouseDown(true)
            setDragStartIndex(index)

            if (!event.ctrlKey && !event.metaKey) {
                const row = data[index]
                setSelectedRows(new Map([[row.id, row]]))
            }
        },
        [data]
    )

    const handleMouseOver = React.useCallback(
        (index, event) => {
            if (!isMouseDown || dragStartIndex === null) return

            const start = Math.min(dragStartIndex, index)
            const end = Math.max(dragStartIndex, index)
            const newSelectedRows = new Map()

            for (let i = start; i <= end; i++) {
                const row = data[i]
                newSelectedRows.set(row.id, row)
            }

            setSelectedRows(newSelectedRows)
        },
        [isMouseDown, dragStartIndex, data]
    )

    // Sửa handleSelectAll để check tất cả các rows
    const handleSelectAll = React.useCallback(() => {
        const newCheckedItems = new Map()
        data.forEach(row => {
            newCheckedItems.set(row.id, row)
        })
        setCheckedItems(newCheckedItems)
    }, [data])

    // Sửa handleUnselectAll để uncheck tất cả các rows
    const handleUnselectAll = React.useCallback(() => {
        setCheckedItems(new Map())
    }, [])


    // Thêm các hàm mới để xử lý check/uncheck selected rows
    const handleCheckSelected = React.useCallback(() => {
        const newCheckedItems = new Map(checkedItems)
        selectedRows.forEach((row, id) => {
            newCheckedItems.set(id, row)
        })
        setCheckedItems(newCheckedItems)
        setSelectedRows(new Map())
    }, [selectedRows, checkedItems])

    const handleUncheckSelected = React.useCallback(() => {
        const newCheckedItems = new Map(checkedItems)
        selectedRows.forEach((row, id) => {
            newCheckedItems.delete(id)
        })
        setCheckedItems(newCheckedItems)
        setSelectedRows(new Map())
    }, [selectedRows, checkedItems])

    return {
        selectedRows,
        checkedItems,
        setCheckedItems,
        isMouseDown,
        setIsMouseDown,
        setDragStartIndex,
        handleRowClick,
        handleMouseDown,
        handleMouseOver,
        handleCheckSelected,
        handleSelectAll,
        handleUnselectAll,
        handleUncheckSelected
    }
}