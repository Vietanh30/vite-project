import React from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const ExportButton = ({ tableData }) => {
    // Lấy tất cả các trường có trong data
    const fields = React.useMemo(() => {
        if (!tableData || !tableData.length) return []
        const fieldSet = new Set()
        tableData.forEach(row => {
            Object.keys(row).forEach(field => fieldSet.add(field))
        })
        return Array.from(fieldSet)
    }, [tableData])

    const handleExportToTxt = () => {
        // Tạo header
        let content = "Table Data Export\n\n"

        // Thêm tên các trường
        content += fields.join('\t') + '\n'

        // Thêm dấu gạch ngang ngăn cách
        content += fields.map(() => '---').join('\t') + '\n'

        // Thêm dữ liệu từng dòng
        tableData.forEach((row) => {
            const rowContent = fields.map(field => {
                // Đảm bảo giá trị không undefined/null
                const value = row[field] ?? ''
                // Chuyển đổi giá trị thành string an toàn
                return String(value).replace(/\t/g, ' ') // Thay thế tab bằng space để tránh lỗi format
            })
            content += rowContent.join('\t') + '\n'
        })

        // Tạo và tải file
        const blob = new Blob([content], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "table-export.txt"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    return (
        <Button
            onClick={handleExportToTxt}
            variant="outline"
            className="flex items-center gap-2"
        >
            <Download className="h-4 w-4" />
            Export to TXT
        </Button>
    )
}

export default ExportButton