import { useEffect } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useBookStore } from "@/stores/bookStore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faPlus, faPrint, faTrash } from "@fortawesome/free-solid-svg-icons"

const onEdit = ()=>{
  console.log("OnEdit")
}
const onPrint = ()=>{
  console.log("OnPrint")
}
const onDelete = ()=>{
  console.log("OnDelete")
}


export default function TableComponent({
    tableName = '',
    isEdit = false,
    isDelete = false,
    isPrint = false,
    dataList = [],
    headers = [],
    columns = [],
}) {

  return (
    <div className="w-full">
    <Table className="w-full" >
      <TableHeader>
        <TableRow>
          { headers.map((header, index) => (
                <TableHead className={``} key={index}>{ header.name || '' }</TableHead>
            ))
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        { dataList.map((item, index) => (
          <TableRow key={index} className="">
            { columns.map((column, colIndex) => (
                <TableCell className="font-medium" key={colIndex}>
                    { item[column.name] }
                </TableCell>
            ))
          }
          </TableRow>
         ))}
      </TableBody>
      <TableFooter>
        {/* <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell >{totalPrice}</TableCell>
        </TableRow> */}
      </TableFooter>
    </Table>
    </div>
  )
}
