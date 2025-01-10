// AddDataDialog.jsx
import React from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

const AddDataDialog = ({ tableData, handleAddData }) => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [inputData, setInputData] = React.useState("")
    const [error, setError] = React.useState("")

    // Get all possible fields from table data
    const fields = React.useMemo(() => {
        if (!tableData || !tableData.length) return []
        const fieldSet = new Set()
        tableData.forEach(row => {
            Object.keys(row).forEach(field => fieldSet.add(field))
        })
        return Array.from(fieldSet)
    }, [tableData])

    const formatString = fields.join(' | ')
    const exampleData = fields.map(field => `value_${field}`).join(' | ')

    const handleSubmit = () => {
        try {
            const rows = inputData.trim().split('\n')
            const newData = rows.map(row => {
                const values = row.split('|').map(v => v.trim())
                const newRow = {}

                fields.forEach((field, index) => {
                    newRow[field] = values[index] || ''
                })

                // Generate ID if not provided
                if (!newRow.id) {
                    newRow.id = `id-${Math.random().toString(36).substr(2, 9)}`
                }

                return newRow
            })

            handleAddData(newData)
            setInputData("")
            setError("")
            setIsDialogOpen(false)
        } catch (err) {
            setError("Invalid format. Please use pipe (|) to separate values and match the field format shown above.")
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    Add Data
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Add New Data</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label className="text-sm font-medium">
                            Format: {formatString}
                        </Label>
                        <Textarea
                            className="h-40 font-mono"
                            placeholder={`Example:\n${exampleData}`}
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        <div className="text-sm text-muted-foreground">
                            Enter each row of data separated by | following the format above
                        </div>
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Add Rows</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default AddDataDialog