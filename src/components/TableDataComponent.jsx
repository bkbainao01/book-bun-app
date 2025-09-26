import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPrint,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
} from "@/components/ui/table";
import moment from "moment";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// 🔹 Columns definition

function capitalizeLetter(str) {
  if (!str) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function dynamicColList(col) {
  return col.map((field) => ({
    accessorKey: field.key,
    header: field.title || capitalizeLetter(field.key),
    enableHiding: false,
    cell: ({ row }) => {
      let date = null
      switch (field.type) {
        case 'roles':
          return row.original[field.key]
            .map((item) => `${item.role.name}`)
            .join(", ");
        case 'status':
          return row.getValue(field.key) === true ? "True" : "False";
        case 'date':
          date = moment(row.getValue(field.key)).format('DD/MM/YYYY')
          return date;
        default:
          return row.getValue(field.key);
      }
    },
  }));
};

function filterInput(filters, table) {
  return filters.map((filter, fIndex) => {
    switch (filter.type) {
      case 'string':
        return <Input
          key={filter.key}
          id={`${filter.key}-${fIndex}`}
          placeholder={filter.placeholder}
          value={table.getColumn(filter.key)?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn(filter.key)?.setFilterValue(event.target.value)
          }
          className="w-50 my-1 me-2"
        />
    }
  });
}

function filterPart(filters, table) {
  return (
    <>
      <div className="flex flex-wrap items-center py-4">
        {filterInput(filters, table)}
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
    </>
  )
}

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
  filters = [],
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
              <AlertDialog >
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="button-delete" size="sm">
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>ลบไหม?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(row)} >Confirm</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        );
      },
    },
  ];


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
      {filterPart(filters, table)}

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
