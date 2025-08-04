import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useBookStore } from "@/stores/bookStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPlus,
  faPrint,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
  TableFooter,
} from "@/components/ui/table";

// export default function TableDataComponent({
//     tableName = '',
//     action = {
//       isAction: false,
//       isEdit: false,
//       isDelete: false,
//       isPrint: false,
//     },
//     dataList = [],
//     headers = [],
//     columns = [],
//     onEdit,
//     onPrint,
//     onDelete,
// }) {

//   return (
//     <div className="table-component">
//     <Table className={`table-element ${tableName}`} >
//       <TableHeader>
//         <TableRow>
//           { headers.map((header, index) => (
//                 <TableHead className={``} key={index}>{ header.name || '' }</TableHead>
//             ))
//           }
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         { dataList.map((item, index) => (
//           <TableRow key={index} className="">
//             { columns.map((column, colIndex) => (
//                 <TableCell className="font-medium" key={colIndex}>
//                     { item[column.name] || <Badge variant="outline" className={`badge-ready`}>Ready</Badge> }
//                 </TableCell>
//               ))
//             }
//             { action.isAction &&
//               <TableCell className="font-medium">
//                   { action.isEdit &&
//                     <Button className="button-edit me-2" size="sm" onClick={()=>onEdit(item)} ><FontAwesomeIcon icon={faPen} /></Button>
//                   }
//                   { action.isPrint &&
//                     <Button className="button-print me-2" size="sm" onClick={()=>onPrint(item)} ><FontAwesomeIcon icon={faPrint} /></Button>
//                   }
//                   { action.isDelete &&
//                     <Button className="button-delete" size="sm" onClick={()=>onDelete(item)} ><FontAwesomeIcon icon={faTrash} /></Button>
//                   }
//               </TableCell>
//             }
//           </TableRow>
//          ))}
//       </TableBody>
//       <TableFooter>
//         {/* <TableRow>
//           <TableCell colSpan={2}>Total</TableCell>
//           <TableCell >{totalPrice}</TableCell>
//         </TableRow> */}
//       </TableFooter>
//     </Table>
//     </div>
//   )
// }

// 🔹 Columns definition

function capitalizeLetter(str) {
  if (!str) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const dynamicColList = (col) => {
  return col.map((field) => ({
    accessorKey: field.key,
    header: capitalizeLetter(field.key),
    enableHiding: false,
    cell: ({ row }) => {
      if (field.key == "roles") {
        return row.original[field.key]
          .map((item) => `${item.role.name}`)
          .join(", ");
      } else if (field.key == "status") {
        return row.getValue(field.key) === true ? "True" : "False";
      } else {
        return row.getValue(field.key);
      }
    },
  }));
};

// 🔹 Main table component
export default function TableDataComponent({
  tableName = "",
  action = {
    isAction: false,
    isEdit: false,
    isDelete: false,
    isPrint: false,
  },
  dataList = [],
  tableColumns = [],
  onEdit,
  onPrint,
  onDelete,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const columns = [
    // Dynamically columns
    ...dynamicColList(tableColumns),
    {
      id: "actions",
      enableHiding: !action.isAction,
      cell: ({ row }) => {
        return (
          <div>
            {action.isEdit && (
              <Button
                className="button-edit me-2"
                size="sm"
                onClick={() => onEdit(row.original)}
              >
                <FontAwesomeIcon icon={faPen} />
              </Button>
            )}
            {action.isPrint && (
              <Button
                className="button-print me-2"
                size="sm"
                onClick={() => onPrint(row)}
              >
                <FontAwesomeIcon icon={faPrint} />
              </Button>
            )}
            {action.isDelete && (
              <Button
                className="button-delete"
                size="sm"
                onClick={() => onDelete(row)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    console.log("dataList  >> ", dataList);
  }, [dataList]);

  const table = useReactTable({
    data: dataList ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className={`${tableName} tableData w-full`} id="TableData">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
