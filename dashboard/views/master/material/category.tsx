"use client";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, Card, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/datatable";
import { DataTableColumnHeader } from "@/components/ui/datatable/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/datatable/data-table-row-actions";

import { Master } from "@/views/types/master";
import { createCategory, listCategory } from "../services";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Master>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

const schema = z.object({
  name: z.string().min(2),
});

const Page = () => {
  const [data, setData] = useState<Master[] | []>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true);
      getData();
    }
  }, []);

  const getData = async () => {
    const _data = await listCategory("SUPPLY");
    setData(_data);
    setDataLoading(false);
  };

  const onSubmit = async (data: { name: string }) => {
    setLoading(true);
    let response: Record<string, any> = await createCategory({
      ...data,
      destination: "SUPPLY",
    });
    if (response["status"]) {
      getData();
      toast.success(response["message"]);
      reset();
    } else {
      toast.error(response["message"]);
    }
    setLoading(false);
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Administrativo</BreadcrumbItem>
        <BreadcrumbItem>Maestros</BreadcrumbItem>
        <BreadcrumbItem>Insumos</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Categorias</BreadcrumbItem>
      </Breadcrumbs>
      <div className="grid grid-cols-[1fr_2fr] gap-4 mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Nueva</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="col-span-2 flex flex-col gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    type="text"
                    id="name"
                    {...register("name")}
                    className={cn("peer", {
                      "border-destructive": errors.name,
                    })}
                  />
                  {errors.name && (
                    <div className=" text-destructive mt-2">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <Button
                    className="float-right"
                    type="submit"
                    disabled={loading}
                  >
                    {loading && (
                      <Loader2 className="ltr:mr-2 rtl:ml-2 h-4 w-4 animate-spin" />
                    )}
                    {loading ? "Loading..." : "Guardar"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Registros</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={data} columns={columns} loading={dataLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
