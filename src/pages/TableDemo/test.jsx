import { generateColumns } from "@/components/Table/TableData"
import TableDemo from "./TableDemo"
import AddDataDialog from "@/components/Table/AddDataDialog"
import { useState } from "react"

function Test() {
  // Function to ensure each item has an ID
  const addIdsToData = (items) => {
    return items.map((item, index) => ({
      ...item,
      id: item.id || String(index + 1)
    }))
  }

  const rawData = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]

  // Process data to ensure IDs exist
  const data = addIdsToData(rawData)
  const columns = generateColumns(data)
  const [tableData, setTableData] = useState(data)

  // Hàm xử lý thêm dữ liệu mới
  const handleAddData = (newRows) => {
    console.log(newRows)
    setTableData(prev => [...prev, ...newRows])
    console.log(tableData)
  }
  return (
    <>
      <AddDataDialog
        tableData={tableData}
        handleAddData={handleAddData}
      />
      <TableDemo data={tableData} columns={columns} />
    </>
  )
}

export default Test