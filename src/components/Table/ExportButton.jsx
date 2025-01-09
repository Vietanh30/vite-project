import React from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const ExportButton = ({ tableData }) => {
    const handleExportToTxt = () => {
        // Tạo nội dung cho file txt
        let content = "Table Data Export\n\n"
        content += "ID\tEmail\tAmount\tStatus\n"
        content += "----------------------------------------\n"

        tableData.forEach((row) => {
            content += `${row.id}\t${row.email}\t${row.amount}\t${row.status}\n`
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
