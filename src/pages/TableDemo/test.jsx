import { columns, data } from "@/components/Table/TableData";
import TableDemo from "./TableDemo";

function Test() {
  console.log(data, columns)
  return (
    <>
      <TableDemo data={data} columns={columns} />
    </>
  );
}

export default Test;