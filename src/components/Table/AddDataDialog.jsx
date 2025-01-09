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
import { Input } from "@/components/ui/input"

const AddDataDialog = ({ newRowData, setNewRowData, handleAddData }) => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    Add Data
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Data</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            className="col-span-3"
                            value={newRowData.email}
                            onChange={(e) =>
                                setNewRowData((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Amount
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            className="col-span-3"
                            value={newRowData.amount}
                            onChange={(e) =>
                                setNewRowData((prev) => ({
                                    ...prev,
                                    amount: parseInt(e.target.value),
                                }))
                            }
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                            Status
                        </Label>
                        <select
                            id="status"
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                            value={newRowData.status}
                            onChange={(e) =>
                                setNewRowData((prev) => ({
                                    ...prev,
                                    status: e.target.value,
                                }))
                            }
                        >
                            <option value="success">Success</option>
                            <option value="processing">Processing</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddData}>Add Row</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddDataDialog
