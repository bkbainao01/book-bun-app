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



export default function TableComponent({
    tableName = '',
    action = {
      isAction: false,
      isEdit: false,
      isDelete: false,
      isPrint: false,
    },
    dataList = [],
    headers = [],
    columns = [],
    onEdit,
    onPrint,
    onDelete,
}) {

  return (
    <div className="table-component">
    <Table className={`table-element ${tableName}`} >
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
                    { item[column.name] || <Badge variant="outline" className={`badge-ready`}>Ready</Badge> }
                </TableCell>
              ))
            }
            { action.isAction &&
              <TableCell className="font-medium">
                  { action.isEdit &&
                    <Button className="button-edit me-2" size="sm" onClick={()=>onEdit(item)} ><FontAwesomeIcon icon={faPen} /></Button>
                  }
                  { action.isPrint &&
                    <Button className="button-print me-2" size="sm" onClick={()=>onPrint(item)} ><FontAwesomeIcon icon={faPrint} /></Button>
                  }
                  { action.isDelete &&
                    <Button className="button-delete" size="sm" onClick={()=>onDelete(item)} ><FontAwesomeIcon icon={faTrash} /></Button>
                  }
              </TableCell>
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
