"use client";
import { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, Card, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormItem } from "@/components/ui/form";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/datatable";
import { DataTableColumnHeader } from "@/components/ui/datatable/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/datatable/data-table-row-actions";
import { ColorXSupplier, Master } from "@/views/types/master";
import {
  listSupplier,
  listColor,
  listTypeSupply,
  listCategory,
  listSupplierByTypeService,
} from "@/views/services/master";
import toast from "react-hot-toast";
import { createColorClothSupplier, listColorClothSupplier } from "../services";
import { arrayToReactSelect } from "@/util/arrayToSelect";
import { Loader2 } from "lucide-react";

export const columns: ColumnDef<ColorXSupplier>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
    cell: ({ row }) => <div>{row.getValue("code")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "supplier",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proveedor" />
    ),
    cell: ({ row }) => <div>{row.getValue("supplier")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoria" />
    ),
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => <div>{row.getValue("color")}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

const schema = z.object({
  code: z.string().min(2),
  name: z.string().min(2),
  supply_color_id: z.any(),
  suppliers_id: z.any(),
  supply_categories_id: z.any(),
});

const BlankPage = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      name: "",
      code: "",
      supply_color_id: null,
      suppliers_id: null,
      supply_categories_id: null,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const [data, setData] = useState<ColorXSupplier[] | []>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [suppliers, setSuppliers] = useState<Master[]>([]);
  const [supplyCategories, setSupplyCategories] = useState<Master[]>([]);
  const [supplyColors, setSupplyColors] = useState<Master[]>([]);

  useEffect(() => {
    setDataLoading(true);
    getData();
    fetchData();
  }, []);

  const getData = async () => {
    const _data = await listColorClothSupplier();
    setData(_data);
    setDataLoading(false);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [supplier, typeSupply, colors] = await Promise.all([
        listSupplierByTypeService("telas"),
        listCategory("CLOTH"),
        listColor(),
      ]);

      setSuppliers(supplier);
      setSupplyCategories(typeSupply);
      setSupplyColors(colors);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    setLoading(true);
    let response: Record<string, any> = await createColorClothSupplier({
      ...data,
      supply_color_id: data.supply_color_id.value,
      suppliers_id: data.suppliers_id.value,
      supply_categories_id: data.supply_categories_id.value,
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
        <BreadcrumbItem>Telas</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">
          Colores Proveedor
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="grid grid-cols-[1fr_2fr] gap-4 mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Nuevo</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <div className="col-span-2 flex flex-col gap-2">
                    <Controller
                      control={form.control}
                      name="suppliers_id"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem >
                          <Label htmlFor="name">Proveedor</Label>
                          <FormControl>
                            <Select
                              className="react-select"
                              classNamePrefix="select"
                              placeholder="Seleccione un proveedor"
                              options={arrayToReactSelect(suppliers)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-2 flex flex-col gap-2">
                    <Controller
                      control={form.control}
                      name="supply_categories_id"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem >
                          <Label htmlFor="name">Categorias</Label>
                          <FormControl>
                            <Select
                              className="react-select"
                              classNamePrefix="select"
                              placeholder="Seleccione un tipo de insumo"
                              options={arrayToReactSelect(supplyCategories)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-2 flex flex-col gap-2">
                    <Controller
                      control={form.control}
                      name="supply_color_id"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormItem >
                          <Label htmlFor="name">Color</Label>
                          <FormControl>
                            <Select
                              className="react-select"
                              classNamePrefix="select"
                              placeholder="Seleccione un color"
                              options={arrayToReactSelect(supplyColors)}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-2 flex flex-col gap-2">
                    <Label htmlFor="code">Código</Label>
                    <Input type="text" id="code" {...register("code")} />
                  </div>
                  <div className="col-span-2 flex flex-col gap-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input type="text" id="name" {...register("name")} />
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
            </Form>
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
