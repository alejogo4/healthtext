"use client";
import { Fragment } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CardContent, CardHeader, Card, CardTitle } from "@/components/ui/card";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/datatable";
import { data, labels, priorities, statuses } from "./data";
import { DataTableColumnHeader } from "@/components/ui/datatable/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/datatable/data-table-row-actions";

interface Task {
  id: string;
  description?: string;
  status?: string;
}
export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex items-center">
          {status.icon && (
            <status.icon className="ltr:mr-2 rtl:ml-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

const BlankPage = () => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Maestros</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Presentación</BreadcrumbItem>
      </Breadcrumbs>
      <div className="grid grid-cols-[1fr_2fr] gap-4 mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Nuevo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="col-span-2 flex flex-col gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input type="text" id="name" />
              </div>
              <div className="col-span-2">
                <Button className="float-right" type="submit">
                  Guardar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Registros</CardTitle>
          </CardHeader>
          <CardContent>
            <Fragment>
              <DataTable data={data} columns={columns} />
            </Fragment>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlankPage;
